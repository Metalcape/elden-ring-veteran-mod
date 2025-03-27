# Veteran mod

As seen in Sabaku No Maiku and Cydonia's Shadow of the Erdtree "Veteran Run" streams.

I consider this repository to be an archive for the work I've done on this mod, but I don't plan to update it further. Please note that the new quest does not have a progression system (all events are available from the start) so it's possible to trigger the NPC to appear out-of-order.

## Installation

To use the hardcoded functionalities of the mod (mainly the freecam), you will need to have the [Visual C++ redistributable](https://aka.ms/vs/17/release/vc_redist.x64.exe) libraries installed. Otherwise Mod Engine won't be able to load the .dll file, as it depends on these libraries.

1) Unpack the archive in a new directory
2) Open the `mod` directory and double click the `Setup UI Images` link (this is needed to view custom UI icons ingame)
3) Launch the game from the `launchmod_eldenring.bat` file.

## Building
If you wish to build the .dll from source, you can do so with CMake. You will need CMake 3.28.1 or greater and the MSVC compiler.

## Credits
- Sabaku No Maiku for designing, planning and writing the quest
- Emdy for the UI icon artworks
- This DLL mod is based on [Tom Clark](https://github.com/ThomasJClark)'s [elden-x](https://github.com/ThomasJClark/elden-x) and his other mods.
- [libER](https://github.com/Dasaav-dsv/libER/) and [ERtool](https://github.com/kh0nsu/EldenRingTool) for general information about the game's code.
- [Souls Modding Wiki](http://soulsmodding.wikidot.com/) and the ?ServerName? discord server for various resources on modding.
- [Gideon](https://github.com/ividyon/Gideon) by ividyon for a way to distribute custom icons more easily.
- iota09 for helping me with testing and for sharing his PvP knowledge.
- Axd1x8a and Endathelion for allowing me to adapt DENmaps to our use case.
