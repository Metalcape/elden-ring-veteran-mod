#define WIN32_LEAN_AND_MEAN
#include <filesystem>
#include <memory>
#include <spdlog/sinks/daily_file_sink.h>
#include <spdlog/sinks/stdout_color_sinks.h>
#include <spdlog/spdlog.h>
#include <thread>
#include <windows.h>

#include <elden-x/params/params.hpp>
#include <elden-x/utils/modutils.hpp>
#include <elden-x/game_man.hpp>
#include <elden-x/singletons.hpp>

#include "veteran_speffect.hpp"
#include "veteran_config.hpp"


static std::thread mod_thread;

static void setup_mod()
{
    modutils::initialize();
    std::this_thread::sleep_for(std::chrono::seconds(1));
    er::FD4::find_singletons();
    
    er::CS::SoloParamRepository::wait_for_params();

    spdlog::info("Sleeping for {}ms...", veteran::config::initialize_delay);
    std::this_thread::sleep_for(std::chrono::milliseconds(veteran::config::initialize_delay));
    
    spdlog::info("Hooking speffects...");
    veteran::setup_speffects();

    modutils::enable_hooks();
    spdlog::info("Initialized mod");
}

static std::shared_ptr<spdlog::logger> make_logger(const std::filesystem::path &path)
{
    auto logger = std::make_shared<spdlog::logger>("veteran");
    logger->set_pattern("[%Y-%m-%d %H:%M:%S.%e] [%n] %^[%l]%$ %v");
    logger->sinks().push_back(
        std::make_shared<spdlog::sinks::daily_file_sink_st>(path.string(), 0, 0, false, 5));
    spdlog::set_default_logger(logger);
    return logger;
}

static void enable_debug_logging(std::shared_ptr<spdlog::logger> logger)
{
    AllocConsole();
    FILE *stream;
    freopen_s(&stream, "CONOUT$", "w", stdout);
    freopen_s(&stream, "CONOUT$", "w", stderr);
    freopen_s(&stream, "CONIN$", "r", stdin);
    logger->sinks().push_back(std::make_shared<spdlog::sinks::stdout_color_sink_st>());
    logger->flush_on(spdlog::level::info);
    logger->set_level(spdlog::level::trace);
}

bool WINAPI DllMain(HINSTANCE dll_instance, unsigned int fdw_reason, void *lpv_reserved)
{
    if (fdw_reason == DLL_PROCESS_ATTACH)
    {
        wchar_t dll_filename[MAX_PATH] = {0};
        GetModuleFileNameW(dll_instance, dll_filename, MAX_PATH);
        auto folder = std::filesystem::path(dll_filename).parent_path();

        auto logger = make_logger(folder / "logs" / "veteranmod.log");

#ifdef _DEBUG
        enable_debug_logging(logger);
#endif

#ifdef PROJECT_VERSION
        spdlog::info("Veteran run mod version {}", PROJECT_VERSION);
#endif

        veteran::load_config(folder / "veteran_config.ini");

#ifndef _DEBUG
        if (veteran::config::debug)
        {
            enable_debug_logging(logger);
        }
#endif

        mod_thread = std::thread([]() {
            try
            {
                setup_mod();
            }
            catch (std::runtime_error const &e)
            {
                spdlog::error("Error initializing mod: {}", e.what());
                modutils::deinitialize();
            }
        });
    }
    else if (fdw_reason == DLL_PROCESS_DETACH && lpv_reserved != nullptr)
    {
        try
        {
            mod_thread.join();
            modutils::deinitialize();
            spdlog::info("Deinitialized mod");
        }
        catch (std::runtime_error const &e)
        {
            spdlog::error("Error deinitializing mod: {}", e.what());
            spdlog::shutdown();
            return false;
        }
        spdlog::shutdown();
    }
    return true;
}