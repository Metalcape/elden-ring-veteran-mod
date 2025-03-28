#pragma once

#include <cstdint>

#include <elden-x/chr/world_chr_man.hpp>

namespace veteran
{
// static constexpr size_t net_player_max = 6;
static constexpr int ng_speffect_base_id = 42000010;
static constexpr int freecam_speffect_id = 3241;

static constexpr unsigned char freecam_patch[] = {0xB0, 0x01, 0xC3};    // mov al,1; ret

// typedef int apply_speffect_fn(er::CS::ChrIns *chrins, unsigned int speffect_id, bool unk);
// typedef int clear_speffect_fn(er::CS::ChrIns *chrins, unsigned int speffect_id);
// typedef int spawn_one_shot_sfx_on_chr_fn(er::CS::ChrIns *, int dummy_poly_id, int sfx_id, void *unk);

void setup_speffects();
bool has_speffect(er::CS::ChrIns *, int speffect_id);
};