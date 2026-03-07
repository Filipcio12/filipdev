+++
title = "Podstawowy poradnik do personalizowania Linuksa"
date = 2025-08-31T14:47:49+02:00
+++

Jeżeli wiesz już trochę na temat systemu operacyjnego GNU/Linux i potrafisz korzystać z wiersza poleceń oraz menedżerów paczek, ale jeszcze nigdy nie zająłeś się personalizowaniem systemu, to ten wpis może jest dla ciebie. 

<!--more-->

## Dystrybucja

Jeżeli chodzi o dystybucję, to w momencie pisania tego artykułu korzystałem z **Ubuntu 24** i nie miałem żadnych problemów. Korzystałem z kilku innych dystrybucji, ale poza różnymi wersjami paczek w repozytoriach nie widziałem większych różnic. Korzystaj z tego, co Ci pasuje. Możesz sprawdzić swoją dystrybucję, wpisując poniższe polecenie do terminala.

```bash {style=gruvbox}
cat /etc/os-release
```
Do zarządzania plikami ISO na swoim pendrive'ie można posłużyć się fascynującym narzędziem o nazwie [**Ventoy**](https://www.ventoy.net/en/index.html). Wystarczy zainstalować Ventoya raz na pendrive'a, a później nie trzeba ciągle formatować dysku. Zamiast tego można tylko skopiować pliki ISO bezpośrednio na pendrive'a. Ventoy nie przeszkadza też w normalnym przechowywaniu plików na pendrive'ie. Należy tylko trzymać je z dala od katalogu ISO. Do instalowania systemu operacyjnego można też skorzystać z takich narzędzi jak [**Rufus**](https://rufus.ie/en/) na Windowsie oraz [**Balena Etcher**](https://etcher.balena.io/) na Linuksie.

Zazwyczaj system GNU/Linux personalizuje się, poprzez instalowanie różnych aplikacji, a następnie edytowanie ich plików konfiguracyjnych, których nazwy zaczynają się od kropki. Są to tak zwane "dotfiles". Moje pliki konfiguracyjne możesz znaleźć w poniższym repozytorium na [**Githubie**](https://github.com/Filipcio12/dotfiles).

## i3

[**i3**](https://i3wm.org) to menedżer okien. Zarządza on oknami stworzonymi przez system okien X11. Menedżer zastępuje, tzw. środowisko graficzne, tj. GNOME czy KDE Plasma. Polecam i3, ponieważ ten mendżer jest relatywnie prosty w obsłudze oraz ma doskonałą [**dokumentację**](https://i3wm.org/docs).

Pobierzmy zatem i3. Możesz sprawdzić dostępne paczki na swojej dystrybucji Linuksa na poniższej [**stronie**](https://pkgs.org). Na Ubuntu skorzystałem z następującego polecenia.

```bash {style=gruvbox}
sudo apt-get install i3-wm
```

Następnie korzystając ze swojego domyślnego menedżera logowania, wybierz i3 z dostępnych sesji.

### DPI

Jeśli używasz monitora o wyższej rozdzielczości, pierwszą rzeczą, jaką zauważysz po zalogowaniu się do i3, jest to, że wszystko jest niezwykle małe. Aby to naprawić, musisz dodać poniższy wiersz do pliku ~/.Xresources.

```bash {style=gruvbox}
Xft.dpi: 120
```

Oczywiście możesz dostosować tę wartość do swoich upodobań.

### Połączenie internetowe

Drugą rzeczą, którą zauważysz, jest brak internetu i brak narzędzia graficznego do konfiguracji połączenia. Aby połączyć się z internetem, możesz użyć polecenia nmcli (Network Manager CLI).

```bash {style=gruvbox}
nmcli dev wifi connect <SSID> password <password>
```

Jeżeli to nie zadziałało, spróbuj usunąć połączenie i połączyć się ponownie.

```bash {style=gruvbox}
nmcli con delete <SSID>
```

### i3 config

Teraz, gdy możemy wygodnie czytać tekst i korzystać z Internetu, możemy rozpocząć właściwą konfigurację i3. Ścieżka do pliku konfiguracyjnego i3: ~/.config/i3/config. Jest to zwykły plik tekstowy. Moim zdaniem konfiguracja i3 składa się z trzech prostych części:
- Programy/polecenia startowe
- Skróty klawiszowe
- Stylizacja

### Programy startowe

- i3-lock – znajduje się w domyślnej konfigurację i3.
Zmieniam tylko kolor tła. Blokuje ekran w trybie uśpienia.
- nitrogen – prosty program z graficznym interfejsem użytkownika do ustawiania tapet.
- picom – kompozytor okien, dodaje przezroczystość i animacje do okien.
- redshift – bloker niebieskiego światła do użytku późnym popołudniem.
- greenclip – menedżer schowka.

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

Aby uzyskać naturalne przewijanie na touchpadzie, musisz zastąpić {nazwa-touchpada} nazwą urządzenia. Możesz ją znaleźć za pomocą polecenia *xinput*.

Poniższe wiersze ustawiają polski układ klawiatury oraz CapsLock na dodatkowy klawisz Escape, co jest przydatne przy korzystaniu z Vima.

```bash {style=gruvbox}
exec --no-startup-id setxkbmap -layout pl
exec --no-startup-id setxkbmap -option caps:escape
```
Polecenia *setxkbmap* umieszczam również w pliku ~/.xsession, ponieważ czasami i3 nie wykonuje poleceń startowych.

### Skróty klawiszowe

```bash {style=gruvbox}
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ +5%
bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume @DEFAULT_SINK@ -5%
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute @DEFAULT_SINK@ toggle
bindsym XF86AudioMicMute exec --no-startup-id pactl set-source-mute @DEFAULT_SOURCE@ toggle && $refresh_i3status
bindsym XF86MonBrightnessUp exec --no-startup-id brightnessctl set +10%
bindsym XF86MonBrightnessDown exec --no-startup-id brightnessctl set 10%-
```

Są to ważne skróty klawiszowe do ustawień systemowych, takich jak głośność i jasność. Działają one, jeśli używasz PulseAudio do dźwięku i masz zainstalowany brightnessctl.

```bash {style=gruvbox}
sudo chmod 666 /sys/class/backlight/intel_backlight/brightness
```

Musisz wpisać to polecenie, aby móc korzystać z brightnessctl bez sudo.

#### Rofi

[**Rofi**](https://github.com/davatorium/rofi) to program uruchamiający aplikacje. Można go jednak używać jako frontend dla wielu różnych skryptów i aplikacji. Działa praktycznie od razu. Jedyne, co zmieniłem, to: czcionka, paleta kolorów oraz włączyłem ikonki. Ścieżka do pliku konfiguracyjnego Rofi: ~/.config/rofi/config.rasi.

```bash {style=gruvbox}
configuration {
  font: "AtkynsonMono Nerd Font 15";
  show-icons: true;
}
```

Aby korzystać z Rofi, musisz dodać skróty klawiszowe do konfiguracji i3. W przeciwnym razie dostęp do Rofi będzie możliwy tylko za pośrednictwem wiersza poleceń.

```bash {style=gruvbox}
bindsym $mod+Return exec --no-startup-id wezterm
bindsym $mod+w kill
bindsym $mod+d exec --no-startup-id rofi -show drun
bindsym $mod+r exec --no-startup-id rofi -show window
bindsym $mod+n exec --no-startup-id rofi-wifi-menu.sh
bindsym $mod+c exec --no-startup-id rofi -modi \"clipboard:greenclip print\" -show clipboard -run-command '{cmd}'
```

Opcja -show drun uruchamia Rofi tylko z aplikacjami, które mają plik .desktop. Zwykle są to samodzielne aplikacje, które otwierają nowe okno. Nie obejmują aplikacji terminalowych. Opcja -show window uruchamia Rofi z aktualnie otwartymi aplikacjami. Wyświetla również, w których obszarach roboczych są one otwarte. W przypadku Rofi używam również [**skryptu**](https://github.com/ericmurphyxyz/rofi-wifi-menu/) autorstwa Erica Murphy'ego do wyświetlania menu Wi-Fi na wypadek, gdybym musiał połączyć się z Wi-Fi w jakimś miejscu, oraz Greenclip do historii schowka systemowego.

Aby korzystać z wifi-menu oraz Greenclipa, musisz pobrać te skrypty/pliki binarne, a następnie nadać im uprawnienia do wykonywania i przenieść je do katalogu /usr/local/bin.

```bash {style=gruvbox}
chmod +x rofi-wifi-menu.sh greenclip
sudo mv rofi-wifi-menu.sh greenclip /usr/local/bin
```

Nie używam Rofi do menu wylogowania. Zamiast tego używam następujących skrótów klawiszowych do wyłączania, usypiania i wylogowywania z systemu. Opcja restartu nie uruchamia ponownie komputera. Po prostu przeładowuje konfigurację i3.

```bash {style=gruvbox}
bindsym $mod+Control+s exec --no-startup-id systemctl suspend
bindsym $mod+Control+Shift+s exec --no-startup-id systemctl poweroff
bindsym $mod+Control+q exec --no-startup-id i3-msg exit 
bindsym $mod+Shift+r restart

```

### Stylizacja

Możesz tworzyć spersonalizowane paski statusu za pomocą narzędzi, takich jak [**polybar**](https://github.com/polybar/polybar). Ja używam wbudowanego paska i3. Do stylizacji używam motywu [**Catppuccin**](https://catppuccin.com), ze względu na jego szerokie wsparcie dla wielu aplikacji. Polecam również repozytorium o nazwie [**tinted-theming**](https://github.com/tinted-theming), ponieważ zawiera ono pliki konfiguracyjne dla wielu motywów korzystających z szablonu **base16** dla wielu aplikacji. Motywy dla i3 znajdziesz w tym [**repozytorium**](https://github.com/tinted-theming/base16-i3). Dla Rofi istnieje również [**repozytorium**](https://github.com/tinted-theming/base16-rofi).

Jeśli chodzi o czcionkę, polecam AtkynsonMono z NerdFonts. Aby używać czcionek, należy je umieścić w odpowiednim folderze, a następnie odświeżyć pamięć podręczną czcionek.

```bash {style=gruvbox}
sudo cp *.ttf  ~/.local/share/fonts/
fc-cache -f -v

```

Oto kilka innych opcji, które mam w i3.

```bash {style=gruvbox}
default_border pixel
hide_edge_borders both
gaps inner 2
smart_gaps on
```

Wyłącza tytuły okien i dodaje przerwy między oknami.

## Wnioski

Mam nadzieję, że dowiedziałeś się czegoś przydatnego o konfiguracji i3 i niektórych narzędzi Linuksa. Dziękuję za uwagę!

<!-- base16 code block -->
