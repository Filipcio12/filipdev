+++
title = "Basic guide to Linux customization"
date = 2025-08-31T14:47:49+02:00
+++

If you know a little bit about Linux and you've used the command line
and package managers before but haven't really gotten into customizing
your system, then this article might be for you.

<!--more-->

## Distro

Firstly, on the choice of distribution, I'm currently running **Ubuntu 24**
and I distro-hopped to Arch and Fedora a bunch before settling on it
and, to be honest, I'm yet to find a truly meaningful difference between
distros. Use whatever works for you. To check your distro, you can run:

```bash {style=gruvbox}
cat /etc/os-release
```

In terms of managing your ISO files on your USB drive, I heard of an interesting
tool called [**Ventoy**](https://www.ventoy.net/en/index.html). Apparently, you just
need to install Ventoy once on your USB drive
and then you don't need to format the disk over and over,
you just need to copy the ISO files to the USB and boot them directly. You can also
use it as a plain USB drive to store files and this will not affect Ventoy's function.
Although up until now, I only used [**Rufus**](https://rufus.ie/en/) on Windows
and [**Balena Etcher**](https://etcher.balena.io/) on Linux.

## Dotfiles

The way you typically customize your Linux setup is by downloading a bunch of
applications and editing their configuration files which start with the "."
character, the so-called "dotfiles". You can find my dotfiles in my
[**Github repository**](https://github.com/Filipcio12/dotfiles).

## i3

[**i3**](https://i3wm.org) is a window manager.
It manages windows created by the X11 window system.
It's pretty barebones initially as it replaces a Dekstop
Environment which is basically the entire graphical user interface.

I recommend i3 because it's simple (relatively speaking) and has
great [**documentation**](https://i3wm.org/docs).

Let's download i3 then. You can check available packages in your Linux distribution
on this [**website**](https://pkgs.org).

```bash {style=gruvbox}
sudo apt-get install i3-wm
```

Use your default login manager and select i3 from available sessions.

### DPI

If you're using a higher resolution monitor,
the first thing you will notice after logging
into i3, is that everything is extremely tiny.
To fix that, you have to add this line
to ~/.Xresources file.

```bash {style=gruvbox}
Xft.dpi: 120
```

Of course, you can adjust this number to your liking.

### Internet connection

Second thing you will notice is that you have no internet and no GUI tool for
setting up the connection. To connect to Internet, you have to use nmcli
(Network Manager CLI).

```bash {style=gruvbox}
nmcli dev wifi connect <SSID> password <password>
```

If that didn't work, try deleting the connection and reconnecting.

```bash {style=gruvbox}
nmcli con delete <SSID>
```

### i3 config

Now that we can use the Internet and read text comfortably, we can
start configuring i3 proper. The path to i3 configuration file:
~/.config/i3/config. It is a plain text file.
In my mind, i3 configuration consists of three simple parts:

- Startup programs/commands
- Keybindings
- Styling

### Startup programs

- i3-lock – comes with the default i3 config.
I just change the background color. Locks the screen on suspend.
- nitrogen – simple GUI program for setting wallpapers.
- picom – window compositor, adds transparency and animations to windows.
- redshift – blue light blocker for use late in the day.
- greenclip – clipboard manager.

```bash {style=gruvbox}
exec --no-startup-id dex --autostart --environment i3
exec --no-startup-id xss-lock --transfer-sleep-lock -- i3lock --nofork --color=303446
exec --no-startup-id nitrogen --restore
exec --no-startup-id picom
exec --no-startup-id redshift -l 51.52:20.03 &
exec --no-startup-id setxkbmap -layout pl
exec --no-startup-id setxkbmap -option caps:escape
exec --no-startup-id xinput set-prop "{touchpad-name}" 'libinput Natural Scrolling Enabled' 1
exec --no-startup-id xinput set-prop "{touchpad-name}" 'libinput Tapping Enabled' 1
exec --no-startup-id greenclip daemon
```

If you want natural scrolling on the touchpad you need to
replace {touchpad-name} with your
device name. You can find it by using *xinput* command.

I'm Polish so I use the Polish keyboard layout
and I use Neovim as my main coding editor, so
I set CapsLock key to Esc to easily exit insert mode.
I suggest putting these lines:

```bash {style=gruvbox}
exec --no-startup-id setxkbmap -layout pl
exec --no-startup-id setxkbmap -option caps:escape
```

in the ~/.xsession file as well. i3 has a tendency to not execute exec commands
on start-up for some reason.

### Keybindings

```bash {style=gruvbox}
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ +5%
bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ -5%
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute @DEFAULT_SINK@ toggle
bindsym XF86AudioMicMute exec --no-startup-id pactl set-source-mute @DEFAULT_SOURCE@ toggle && $refresh_i3status
bindsym XF86MonBrightnessUp exec --no-startup-id brightnessctl set +10%
bindsym XF86MonBrightnessDown exec --no-startup-id brightnessctl set 10%-
```

These are important keybindings for system stuff like volume and brightness.
These work if you are using PulseAudio for audio and have brightnessctl installed.

```bash {style=gruvbox}
sudo chmod 666 /sys/class/backlight/intel_backlight/brightness
```

You need to run this to be able to execute brightnessctl without sudo.

#### Rofi

[**Rofi**](https://github.com/davatorium/rofi) is an application launcher.
But it can be used as the frontend menu
for many different scripts and apps. It works pretty much out of the box.
The only things I changed are: the font, turning on icons and color scheme.
Path for the Rofi config file: ~/.config/rofi/config.rasi.

```bash {style=gruvbox}
configuration {
  font: "AtkynsonMono Nerd Font 15";
  show-icons: true;
}
```

To use Rofi, you have to add keybinds to your i3 config.
Otherwise, you can only access Rofi through the command line.

```bash {style=gruvbox}
bindsym $mod+Return exec --no-startup-id wezterm
bindsym $mod+w kill
bindsym $mod+d exec --no-startup-id rofi -show drun
bindsym $mod+r exec --no-startup-id rofi -show window
bindsym $mod+n exec --no-startup-id rofi-wifi-menu.sh
bindsym $mod+c exec --no-startup-id rofi -modi \"clipboard:greenclip print\" -show clipboard -run-command '{cmd}'
```

The option -show drun runs Rofi with only with apps that have .desktop file.
These tend to be standalone applications that would open a new window.
They don't include terminal applications.
The option -show window runs Rofi with currently open apps. It will also show
on which workspaces they are open.
With Rofi, I also use a [**script**](https://github.com/ericmurphyxyz/rofi-wifi-menu/)
by Eric Murphy to display a Wi-Fi menu in case
I need to connect to Wi-Fi somewhere and Greenclip for system clipboard history.

Here, you have to download these scripts/binaries and then give them
execute permissions and move them to /usr/local/bin directory.

```bash {style=gruvbox}
chmod +x rofi-wifi-menu.sh greenclip
sudo mv rofi-wifi-menu.sh greenclip /usr/local/bin
```

I don't use Rofi for the logout menu. Instead I use the following
keybindings to shutdown, suspend and logout from my system.
The restart option doesn't restart the PC. It just reloads the i3 config.

```bash {style=gruvbox}
bindsym $mod+Control+s exec --no-startup-id systemctl suspend
bindsym $mod+Control+Shift+s exec --no-startup-id systemctl poweroff
bindsym $mod+Control+q exec --no-startup-id i3-msg exit 
bindsym $mod+Shift+r restart

```

### Styling

You can create custom status bars with tools
like [**polybar**](https://github.com/polybar/polybar).
I just use the built-in i3-bar.
For styling I use the [**Catppuccin**](https://catppuccin.com) theme
because of its wide support for many application. I also recommend
repository called [**tinted-theming**](https://github.com/tinted-theming)
because it has configuration
files for many themes using the **base16** template.
For i3 you can find the themes in this [**repository**](https://github.com/tinted-theming/base16-i3).
For Rofi there's also a [**repository**](https://github.com/tinted-theming/base16-rofi).

For the font, I like AtkynsonMono from NerdFonts. To use fonts,
you need to place them in the correct folder and then
refresh the font cache.

```bash {style=gruvbox}
sudo cp *.ttf  ~/.local/share/fonts/
fc-cache -f -v

```

Here are some other options I have in i3.

```bash {style=gruvbox}
default_border pixel
hide_edge_borders both
gaps inner 2
smart_gaps on
```

This turns off window titles and adds gaps between windows.

## Conclusion

Hope you learned something useful about customizing i3 and some Linux utils.
Thank you for reading!

<!-- base16 code block -->
