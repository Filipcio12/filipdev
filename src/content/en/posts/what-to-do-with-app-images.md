+++
title = 'What to do with AppImages?'
date = 2026-03-07T18:28:02+01:00
+++

AppImages are technically the easiest Linux apps to install. You simply download them and run them, so where's the problem? Well, despite that convenience you can't immediately run them from any path in the command line and app launcher can't find them either.

<!--more-->

So what am I to do? Do I have to remember where I put every AppImage? Or store them all in one directory? Yea... That's the simplest solution. For organizational purposes I created ~/AppImages/ directory. Luckily, that's not where I have to end this. There are two types of apps that AppImages can replace: terminal and desktop apps. But first, AppImage needs to have execute permissions to work at all.

```bash {style=gruvbox}
chmod +x love-11.5-x86_64.AppImage
```

## For terminal apps

I can create a symlink in the /usr/local/bin/ or ~/.local/bin directory. The first one is for system-wide programs installed by the user and not package manager and the second is for user-only apps.

```bash {style=gruvbox}
sudo ln -s /home/filip/AppImages/love-11.5-x86_64.AppImage /usr/local/bin/love
```

For example, this is how I _installed_ [**LÖVE**](https://www.love2d.org/) with an AppImage. It's worth noting that when using **ln** command you should use absolute paths.

## Dla graficznych

For desktop apps I create .desktop file which lets app launcher to detect the program. Desktop entry files have to be placed in the /usr/share/applications (system-wide) or ~/.local/share/applications/ (user only) directory.

```bash {style=gruvbox}
./Tiled-1.11.2_Linux_Qt-6_x86_64.AppImage --appimage-extract
```

Using the command above you can _unpack_ the AppImage and create squashfs-root/ folder in which you can potentially find the icon of the app. You can copy it to a shared directory in the ~/AppImages/ and reference it in .desktop.

```bash {style=gruvbox}
[Desktop Entry]
Type=Application
Name=Tiled
Exec=/home/filip/AppImages/Tiled/Tiled-1.11.2_Linux_Qt-6_x86_64.AppImage
Icon=/home/filip/AppImages/Tiled/tiled.svg
```

The contents above I put in the ~/.local/share/applications/tiled.desktop file to easily tell apart .desktop files created by me specifically from AppImages. That's how I *installed* [**Tiled**](https://www.mapeditor.org/).

Thanks for reading!
