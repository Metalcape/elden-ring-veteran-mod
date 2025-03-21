#pragma once

#include <filesystem>

namespace veteran
{

/**
 * Load user preferences from an .ini file
 */
void load_config(const std::filesystem::path &ini_path);

namespace config
{

// Enables console output
extern bool debug;

// Delay (in milliseconds) before enabling the mod. Changing this might help work around rare
// compatibility issues with other DLL mods.
extern unsigned int initialize_delay;

}
};
