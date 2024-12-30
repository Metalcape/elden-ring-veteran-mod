#pragma once

#include <cstdint>

#include <elden-x/chr/world_chr_man.hpp>

namespace veteran
{
static constexpr int freecam_speffect_id = 3241;
static constexpr unsigned char freecam_patch[] = {0xB0, 0x01, 0xC3};    // mov al,1; ret

void setup_binoculars();
};