<p align="center">
  <img src="https://github.com/ividyon/Gideon/blob/main/logo.png?raw=true" />
</p>

# Gideon - ELDEN RING UI Texture Deployer

Gideon Ofnir, the All-Knowing, is here to carefully handle your MENU_Knowledge (and other UI files) for you.

A tool for bundling loose DDS and layout files with your ELDEN RING mods, and letting the mod's users merge them with their own game files.

Focus on ease of use for both modders and users; a friendly configuration wizard for modders, and a one-click install for users.

## License

This project is licensed under [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)](https://creativecommons.org/licenses/by-nc-nd/4.0/).

You may **not** alter it, or distribute it as part of commercial products or in products even ""temporarily"" behind paywalls (such as Patreon).

You may distribute Gideon as part of your free mod installs, as intended. I have no claim over libraries or code snippets by people credited below.

## What's this for?

You need to know what the ``00_Solo.tpfbhd`, `01_common.tpf.dcx` or `01_common.slytbnd.dcx` archives do, to use this tool.

If you don't know, just open them up using [Yabber](https://github.com/sekirodubi/YabberPlus) and have a look around.

Gideon manages the files that go *inside* those archives, so once you know, you know.

----

Gideon lets you add elements like high-resolution "MENU_KNOWLEDGE" icons, UI textures and UI layouts to your mod while causing as little conflict as possible with other mods.

For content mods, it also saves your users from downloading a 1.1GB archive just so that you can add a few high-resolution icons for your items.

Gideon is configured by you - the modder - then bundled with your mod and executed by your users, whereupon your files will be merged with the existing game archives, which automatically get pulled from the user's game folder.

As a bonus, Gideon also lets the user pick PS4 button prompts! Much love for Dualshock.

Gideon does **not** support other FromSoftware games.

## Preparations

To use Gideon you need to prepare the following:

### 00_Solo.tpfbdt files (High-resolution icons, loading screens)
Make a folder somewhere OUTSIDE of your mod, where you will dump the DDS files you wish to override/add with the mod.

If you want an idea of what files to bundle and how they should be named, open the 00_Solo archive yourself and look inside. File names should match, but the files only need to be DDS, not packed into TPFs.

Save the DDS as BC7_UNORM without mipmaps. MENU_KNOWLEDGE icons must be 1024x1024.

### 01_common.tpf.dcx files (UI elements)
Same story as above, but in a separate folder.

### 01_common.slytbnd.dcx files (Layout files)
Make a folder OUTSIDE of your mod where you put the layout files you wish to override.

## Usage

### Initial deployment

Extract Gideon to a folder of your choice, then run `Gideon.exe`.

The wizard will lead you every step of the way. The steps are:

* Choose your project name (will be shown to users, and determines folder name of project)
* Choose your mod folder (the one where `regulation.bin` and folders like `menu` and `chr` are)
* Choose the categories of file you wish to deploy (Solo, Common and/or Layout) and point at the respective folders you prepared
* (Optional) Create a shortcut so that you can update your deploy folders with one click whenever you add new files.

Following the steps will deploy a copy of Gideon inside your mod's `menu\deploy` folder, and generate a friendly shortcut for your users to click.

Rename the shortcut if you wish (but don't touch the inner workings), and write instructions for your users to run the shortcut if they want your changes to be applied.

That's it!

### Update the deployment

* If you generated a shortcut in the optional step above, just run that shortcut after you added new files to your folders. Everything will be updated accordingly.
* If not, run the instance of `Gideon.exe` that is now inside your mod's `menu\deploy` folder. (Not the shortcut) You will have a chance to set up a shortcut again.

### As a mod user

If you're using a mod that comes with a Gideon deployment, just run the provided shortcut in the mod's base folder.

You may be prompted to install the .NET runtime (see Requirements); just do that.

If everything goes well, you should be able to launch the mod and get the new elements in-game. One click is all it took!

If it doesn't go well, do your due diligence to make sure **you** didn't mess it up, then leave a message in the issue queue if it's unresolved.

## I still don't understand...

This tool exists to solve a specific problem. If you haven't had to deal with icons and UI elements in your mod yet, don't worry I guess?

Once you do, you'll quickly realize that 1) your UI mod conflicts with every other and 2) you need to bundle HUGE archives just to add a couple files. That's what Gideon exists to solve.

## Where source code?

To prevent bad actors in the community from not giving due diligence to the people who made this possible, the source code for this updated version is in a separate, private repository. I'm not particularly happy with this and might revisit it at some point.

If you're a regular in the Souls modding community with a good track record, you can freely request access to the source.

## Credits

 * Thanks to [TKGP](https://github.com/JKAnderson) for his [SoulsFormats library](https://github.com/JKAnderson/SoulsFormats) which is the only reason this even exists.
 * Thanks to [Nordgaren](https://github.com/Nordgaren) for his code in [Yabber+](https://github.com/sekirodubi/YabberPlus) and [UXM Selective Unpack](https://github.com/Nordgaren/UXM-Selective-Unpack) which allows retrieving files from the user's game archives.
 * Thanks to Kirnifr for [ELDEN RING Reforged](https://www.nexusmods.com/eldenring/mods/541). Check out the mod!