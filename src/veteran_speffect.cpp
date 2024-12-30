#pragma once

#include "veteran_speffect.hpp"

#include <elden-x/utils/modutils.hpp>
#include <elden-x/gamedata/game_data_man.hpp>
#include <spdlog/spdlog.h>


static int *clearcount = nullptr;

// Special effects applied and cleared from event scripts
static int (*apply_speffect)(from::CS::ChrIns *chrins, unsigned int speffect_id, bool unk);
static int (*clear_speffect)(from::CS::ChrIns *chrins, unsigned int speffect_id);
static int apply_speffect_detour(from::CS::ChrIns *chrins, unsigned int speffect_id, bool unk) 
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

// Unused for now
// static void (*spawn_one_shot_sfx_on_chr)(from::CS::ChrIns *, int dummy_poly_id, int sfx_id, void *unk);

void veteran::setup_speffects()
{
    spdlog::info("Waiting for GameDataMan...");
    while (!from::CS::GameDataMan::instance())
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    spdlog::info("Waiting for WorldChrMan...");
    while (!from::CS::WorldChrManImp::instance())
    {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    auto game_data_man = reinterpret_cast<uintptr_t>(from::CS::GameDataMan::instance());
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

    // ChrIns::ClearSpEffect hooks
    // modutils::hook(
    //     {
    //     .address = disable_enable_grace_warp_address + 35,
    //     .relative_offsets = {{1, 5}},
    //     },
    //     clear_speffect_detour, clear_speffect
    // );

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

bool veteran::has_speffect(from::CS::ChrIns *player, int speffect_id)
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
