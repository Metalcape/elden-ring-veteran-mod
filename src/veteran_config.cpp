#define MINI_CASE_SENSITIVE

#include "veteran_config.hpp"
// #include "veteran_local_player.hpp"

#include <codecvt>
#include <locale>
#include <mini/ini.h>
#include <spdlog/spdlog.h>

#ifdef _DEBUG
bool veteran::config::debug = true;
#else
bool veteran::config::debug = false;
#endif

unsigned int veteran::config::initialize_delay = 5000;

void veteran::load_config(const std::filesystem::path &ini_path)
{
    spdlog::info("Loading config from {}", ini_path.string());

    mINI::INIFile file(ini_path.string());

    mINI::INIStructure ini;
    if (!file.read(ini))
    {
        spdlog::warn("Failed to read config");
        return;
    }

    if (ini.has("veteran"))
    {
        auto &veteran_config = ini["veteran"];

        if (veteran_config.has("debug") && veteran_config["debug"] != "false")
        {
            veteran::config::debug = true;
        }

        if (veteran_config.has("initialize_delay"))
            veteran::config::initialize_delay =
                std::stoi(veteran_config["initialize_delay"], nullptr, 10);
    }
}
