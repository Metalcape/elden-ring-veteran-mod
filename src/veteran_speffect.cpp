#pragma once

#include "veteran_speffect.hpp"

#include <elden-x/utils/modutils.hpp>
#include <elden-x/gamedata/game_data_man.hpp>
#include <spdlog/spdlog.h>

static er::CS::PlayerIns *player = nullptr;
static er::CS::FieldArea *field_area = nullptr;
static er::CS::FloatVector4 *player_pos = nullptr;
static er::CS::FloatVector4 *debug_cam_pos = nullptr;
static er::CS::FloatVector4 last_freecam_pos;

static std::vector<unsigned char> freecam_code_original(sizeof(veteran::freecam_patch));
static void do_freecam_patch(bool is_apply);
static bool (*can_debug_cam_activate)();
static bool is_first_activation = true;

static int *clearcount = nullptr;

// Special effects applied and cleared from event scripts
static int (*apply_speffect)(er::CS::ChrIns *chrins, unsigned int speffect_id, bool unk);
static int (*clear_speffect)(er::CS::ChrIns *chrins, unsigned int speffect_id);
static int apply_speffect_detour(er::CS::ChrIns *chrins, unsigned int speffect_id, bool unk) 
{
    auto retval = apply_speffect(chrins, speffect_id, unk);

    // Emblem of Regression
    // Revert to original game cycle (1 - 8)
    if(speffect_id > veteran::ng_speffect_base_id && speffect_id < veteran::ng_speffect_base_id + 9)
    {
        auto ng_lv = speffect_id - veteran::ng_speffect_base_id;
        *clearcount = ng_lv;
        spdlog::info("Reverted character to NG+{}", ng_lv);
    }
    // Reset to NG+0
    else if(speffect_id == veteran::ng_speffect_base_id + 10) {
        *clearcount = 0;
        spdlog::info("Set character to NG");
    }

    return retval;
}

// Generic function called to apply any SpEffect from any source
static int (*special_effect_apply)(er::CS::SpecialEffect *obj, unsigned int sp_effect_id, er::CS::ChrIns *target, er::CS::ChrIns *source, er::CS::FloatVector4 *unk0, unsigned char unk1, bool is_for_object, unsigned char unk2);
int special_effect_apply_detour(er::CS::SpecialEffect *obj, unsigned int sp_effect_id, er::CS::ChrIns *target, er::CS::ChrIns *source, er::CS::FloatVector4 *unk0, unsigned char unk1, bool is_for_object, unsigned char unk2)
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

// Unused for now
// static void (*spawn_one_shot_sfx_on_chr)(er::CS::ChrIns *, int dummy_poly_id, int sfx_id, void *unk);

void veteran::setup_speffects()
{
    spdlog::info("Waiting for GameDataMan...");
    while (!er::CS::GameDataMan::instance())
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    spdlog::info("Waiting for WorldChrMan...");
    while (!er::CS::WorldChrManImp::instance())
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    auto game_data_man = reinterpret_cast<uintptr_t>(er::CS::GameDataMan::instance());
    clearcount = reinterpret_cast<int*>(game_data_man + 0x120);

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

    // ChrIns::ApplySpEffect hooks
    modutils::hook(
        {
        .address = disable_enable_grace_warp_address + 11,
        .relative_offsets = {{1, 5}},
        },
        apply_speffect_detour, apply_speffect
    );

    // ChrIns::ClearSpEffect
    auto clear_speffect_addr = modutils::scan<unsigned char>(
        {
        .address = disable_enable_grace_warp_address + 35,
        .relative_offsets = {{1, 5}},
        }
    );

    clear_speffect = reinterpret_cast<int(*)(er::CS::ChrIns *, unsigned int)>(clear_speffect_addr);

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

    // EMEVD::SpawnOneShotSFXOnChr hooks
    // modutils::hook({
    //     .aob = "45 8b 46 04"    // mov r8d, [r14 + 0x4]
    //            "41 8b 16"       // mov edx, [r14]
    //            "48 8b 0b"       // mov rcx, [rbx]
    //            "e8 ?? ?? ?? ??" // call EMEVD::SpawnOneShotSFXOnChr
    //            "48 8d 5b 08"    // lea rbx, [rbx + 0x8]
    //            "48 ff c7"       // inc rdi
    //            "48 3b fe"       // cmp rdi, rsi
    //            "75 e5",         // jnz start
    //     .offset = 10,
    //     .relative_offsets = {{1, 5}},
    //     },
    //     spawn_one_shot_sfx_on_chr_detour, spawn_one_shot_sfx_on_chr
    // );
}

static void do_freecam_patch(bool is_apply)
{
    // Find memory addresses
    // Must be done every time to avoid crashing after quitout
    player = er::CS::WorldChrManImp::instance()->main_player;
    auto field_area_ptr = modutils::scan<er::CS::FieldArea *>(
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

    // _CanDebugCamActivate trampoline
    auto can_debug_cam_activate_addr = modutils::scan<unsigned char>({
        .aob = "E8 ?? ?? ?? ?? 84 C0 0F 85 ?? ?? ?? ?? 38 03",
        .relative_offsets = {{1, 5}},
    });

    can_debug_cam_activate = reinterpret_cast<bool(*)()>(can_debug_cam_activate_addr);
    debug_cam_pos = &(field_area->game_rend->debug_cam->camera_pos);
    player_pos = &(player->modules->physics_module->position);

    // Read contents of memory at function address
    std::vector<unsigned char> buffer(sizeof(veteran::freecam_patch));
    modutils::read(buffer, can_debug_cam_activate, sizeof(veteran::freecam_patch));

    if(is_apply)
    {
        // Check for original instruction
        if(buffer[0] == 0xEB)
        {
            freecam_code_original = buffer;
            modutils::write(veteran::freecam_patch, can_debug_cam_activate, sizeof(veteran::freecam_patch));

            if(is_first_activation)
            {
                debug_cam_pos->x = player_pos->x;
                debug_cam_pos->y = player_pos->y + 1.7f;  // Adjust to player's head
                debug_cam_pos->z = player_pos->z;

                last_freecam_pos = *debug_cam_pos;
                is_first_activation = false;
            }
            else
            {
                *debug_cam_pos = last_freecam_pos;
            }
            
            field_area->game_rend->is_debug_cam_active = 1;
        }
    }
    else
    {
        // Check for modified instruction
        if(buffer[0] == veteran::freecam_patch[0])
        {
            modutils::write(freecam_code_original.data(), can_debug_cam_activate, sizeof(veteran::freecam_patch));
            field_area->game_rend->is_debug_cam_active = 0;

            last_freecam_pos = *debug_cam_pos;
        }
    }
}

bool veteran::has_speffect(er::CS::ChrIns *player, int speffect_id)
{
    // OR short-circuit used here
    if (player == nullptr || player->special_effects == nullptr)
    {
        return false;
    }

    for (auto entry = player->special_effects->head; entry != nullptr; entry = entry->next)
    {
        if (entry->param_id == speffect_id)
        {
            return true;
        }
    }

    return false;
}
