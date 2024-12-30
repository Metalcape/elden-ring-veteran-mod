#pragma once

#include "veteran_binoculars.hpp"
#include "veteran_speffect.hpp"

#include <elden-x/utils/modutils.hpp>
#include <elden-x/gamedata/game_data_man.hpp>
#include <elden-x/chr/chr.hpp>

#include <spdlog/spdlog.h>
#include <spdlog/fmt/bin_to_hex.h>

static from::CS::PlayerIns *player = nullptr;
static from::CS::FieldArea *field_area = nullptr;
static from::CS::FloatVector4 *player_pos = nullptr;
static from::CS::FloatVector4 *debug_cam_pos = nullptr;
static bool is_first_activation = true;

static int (*clear_speffect)(from::CS::ChrIns *chrins, unsigned int speffect_id);

static void do_freecam_patch(bool is_apply);
static bool (*can_debug_cam_activate)();

static std::vector<unsigned char> freecam_code_original(sizeof(veteran::freecam_patch));

// Generic function called to apply any SpEffect from any source
static int (*special_effect_apply)(from::CS::SpecialEffect *obj, unsigned int sp_effect_id, from::CS::ChrIns *target, from::CS::ChrIns *source, from::CS::FloatVector4 *unk0, unsigned char unk1, bool is_for_object, unsigned char unk2);
int special_effect_apply_detour(from::CS::SpecialEffect *obj, unsigned int sp_effect_id, from::CS::ChrIns *target, from::CS::ChrIns *source, from::CS::FloatVector4 *unk0, unsigned char unk1, bool is_for_object, unsigned char unk2)
{
    // Binoculars of the Veteran
    if(sp_effect_id == veteran::freecam_speffect_id)
    {
        if(veteran::has_speffect(target, veteran::freecam_speffect_id)) {
            spdlog::info("Freecam off");
            do_freecam_patch(false);
            return clear_speffect(target, veteran::freecam_speffect_id);
        }
        else
        {
            spdlog::info("Freecam on");
            do_freecam_patch(true);
        }
    }

    return special_effect_apply(obj, sp_effect_id, target, source, unk0, unk1, is_for_object, unk2);
}

void veteran::setup_binoculars()
{
    auto game_data_man = reinterpret_cast<uintptr_t>(from::CS::GameDataMan::instance());

    spdlog::info("Waiting for main player...");
    while (!from::CS::WorldChrManImp::instance()->main_player)
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    player = from::CS::WorldChrManImp::instance()->main_player;

    spdlog::info("Waiting for player modules...");
    while (!player->modules)
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    spdlog::info("Waiting for physics module...");
    while (!player->modules->physics_module)
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    
    // FieldArea global pointer
    auto field_area_ptr = modutils::scan<from::CS::FieldArea *>(
        {
            .aob = "48 8B 3D ?? ?? ?? ??"
                   "49 8B D8"
                   "48 8B F2"
                   "4C 8B F1"
                   "48 85 FF",
            .relative_offsets = {{3, 7}},
        }
    );
    field_area = *field_area_ptr;

    spdlog::info("Waiting for FieldArea...");
    while (!field_area)
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    spdlog::info("Waiting for GameRend...");
    while (!field_area->game_rend)
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }


    // Locate both ChrIns::ApplyEffect() and ChrIns::ClearSpEffect() from this snippet that manages
    // speffect 4270 (Disable Grace Warp)
    auto disable_enable_grace_warp_address = modutils::scan<unsigned char>({
        .aob = "45 33 c0"        // xor r8d, r8d
               "ba ae 10 00 00"  // mov edx, 4270 ; Disable Grace Warp
               "48 8b cf"        // mov rcx, rdi
               "e8 ?? ?? ?? ??"  // call ChrIns::ApplyEffect
               "eb 16"           // jmp end_label
               "e8 ?? ?? ?? ??"  // call HasSpEffect
               "84 c0"           // test al, al
               "74 0d"           // jz end_label
               "ba ae 10 00 00"  // mov edx, 4270 ; Disable Grace Warp
               "48 8b cf"        // mov rcx, rdi
               "e8 ?? ?? ?? ??", // call ChrIns::ClearSpEffect});
    });
    if (!disable_enable_grace_warp_address)
    {
        throw std::runtime_error("Failed to find ChrIns::ApplyEffect and ChrIns::ClearSpEffect");
    }

    // ChrIns::ClearSpEffect hooks
    auto clear_speffect_addr = modutils::scan<unsigned char>(
        {
        .address = disable_enable_grace_warp_address + 35,
        .relative_offsets = {{1, 5}},
        }
    );

    clear_speffect = reinterpret_cast<int(*)(from::CS::ChrIns *, unsigned int)>(clear_speffect_addr);

    // SpecialEffect::Apply
    modutils::hook(
        {
            .aob = "e8 ?? ?? ?? ??"     // call 0x4FC5B0
                   "84 c0"              // test al, al
                   "0f 84 ?? ?? ?? ??"  // jz return
                   "48 83 cf ff",       // or rdi, -1
            .offset = -42
        },
        special_effect_apply_detour, special_effect_apply
    );

    // _CanDebugCamActivate trampoline
    auto can_debug_cam_activate_addr = modutils::scan<unsigned char>({
        .aob = "E8 ?? ?? ?? ?? 84 C0 0F 85 ?? ?? ?? ?? 38 03",
        .relative_offsets = {{1, 5}},
    });

    can_debug_cam_activate = reinterpret_cast<bool(*)()>(can_debug_cam_activate_addr);

    debug_cam_pos = &(field_area->game_rend->debug_cam->camera_pos);
    player_pos = &(player->modules->physics_module->position);

    #ifdef _DEBUG
        spdlog::info("GameDataMan address: 0x{:x}", game_data_man);
        spdlog::info("is debug cam active: {}", field_area->game_rend->is_debug_cam_active);
        spdlog::info("FieldArea address: 0x{:x}", reinterpret_cast<ptrdiff_t>(field_area));
        spdlog::info("GameRend address: 0x{:x}", reinterpret_cast<ptrdiff_t>(field_area->game_rend));
        spdlog::info("debugCam address: 0x{:x}", reinterpret_cast<ptrdiff_t>(field_area->game_rend->debug_cam));
        spdlog::info("debug cam position address: 0x{:x}", reinterpret_cast<ptrdiff_t>(debug_cam_pos));
        spdlog::info("player coordinates address: 0x{:x}", reinterpret_cast<ptrdiff_t>(player_pos));
        spdlog::info("player pos: X:{} Y:{} Z:{}", player_pos->x, player_pos->y, player_pos->z);
        spdlog::info("debug cam pos: X:{} Y:{} Z:{}", debug_cam_pos->x, debug_cam_pos->y, debug_cam_pos->z);

        auto can_debug_cam_activate_code = reinterpret_cast<unsigned char*>(can_debug_cam_activate);
        spdlog::info("CanDebugCamActivate address: {:x}", reinterpret_cast<ptrdiff_t>(can_debug_cam_activate));
        spdlog::info("CanDebugCamActivate trampoline code: {:x} {:x} {:x}", can_debug_cam_activate_addr[0], can_debug_cam_activate_addr[1], can_debug_cam_activate_addr[2]);
    #endif
}

static void do_freecam_patch(bool is_apply)
{
    // Read contents of memory at function address
    std::vector<unsigned char> buffer(sizeof(veteran::freecam_patch));
    modutils::read(buffer, can_debug_cam_activate, sizeof(veteran::freecam_patch));

    #ifdef _DEBUG
        spdlog::info("Original code: 0x{:x} 0x{:x} ", buffer[0], buffer[1]);
    #endif

    if(is_apply)
    {
        // Check for original instruction
        if(buffer[0] == 0xEB)
        {
            #ifdef _DEBUG
                spdlog::info("Writing 0x{:x} 0x{:x} to {:x}", veteran::freecam_patch[0], veteran::freecam_patch[1], reinterpret_cast<ptrdiff_t>(can_debug_cam_activate));
            #endif
            freecam_code_original = buffer;
            modutils::write(veteran::freecam_patch, can_debug_cam_activate, sizeof(veteran::freecam_patch));

            if(is_first_activation)
            {
                debug_cam_pos->x = player_pos->x;
                debug_cam_pos->y = player_pos->y + 1.7f;  // Adjust to player's head
                debug_cam_pos->z = player_pos->z;

                is_first_activation = false;
            }
            
            field_area->game_rend->is_debug_cam_active = 1;
        }
    }
    else
    {
        // Check for modified instruction
        if(buffer[0] == veteran::freecam_patch[0])
        {
            #ifdef _DEBUG
                spdlog::info("Writing 0x{:x} 0x{:x} to {:x}", freecam_code_original[0], freecam_code_original[1], reinterpret_cast<ptrdiff_t>(can_debug_cam_activate));
            #endif
            modutils::write(freecam_code_original.data(), can_debug_cam_activate, sizeof(veteran::freecam_patch));
            field_area->game_rend->is_debug_cam_active = 0;
        }
    }
}