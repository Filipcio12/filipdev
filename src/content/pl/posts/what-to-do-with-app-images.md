+++
title = 'Co mam robić z plikami AppImage?'
date = 2026-03-07T18:28:02+01:00
+++

Pliki AppImage są poniekąd najprostszymi w instalacji aplikacjami na Linuksie. Wystarczy przecież je pobrać i uruchomić, w czym problem? Ale właśnie mimo to, po pobraniu nie można ich używać z dowolnej ścieżki w wierszu poleceń, ani nie wyszukują ich launchery aplikacji.

<!--more-->

Zatem co? Mam pamiętać, gdzie zostawiłem każdy plik AppImage? Albo trzymać je wszystkie w jednym katalogu. Tak... To jest najprostsze rozwiązanie. Dla organizacji stworzyłem katalog ~/AppImages/. Ale całe szczęście nie musi się to na tym skończyć. Są dwa rodzaje aplikacji, które AppImage zastępują: aplikacje terminalowe oraz graficzne. Najpierw trzeba jednak dać plikowi uprawnienia do wykonywania.

```bash {style=gruvbox}
chmod +x love-11.5-x86_64.AppImage
```

## Dla terminalowych

Można stworzyć odnośnik w katalogu /usr/local/bin/ (systemowo lub ~/.local/bin/ dla użytkownika). On jest przeznaczony dla programów systemowych zainstalowanych przez użytkownika, a nie menedżera paczek (to byłby /usr/bin/).

```bash {style=gruvbox}
sudo ln -s /home/filip/AppImages/love-11.5-x86_64.AppImage /usr/local/bin/love
```

Dla przykładu pokazuję jak *zainstalowałem* [**LÖVE**](https://www.love2d.org/) za pomocą pliku AppImage. Warto zwrócić uwagę, że korzystając z polecenia **ln** powinno się używać ścieżek absolutnych.

## Dla graficznych

Tutaj warto stworzyć plik .desktop, dzięki któremu launchery aplikacji będą w stanie wykryć program. Plik .desktop należy umieścić w katalogu /usr/share/applications/ systemowo albo ~/.local/share/applications/ dla danego użytkownika.

```bash {style=gruvbox}
./Tiled-1.11.2_Linux_Qt-6_x86_64.AppImage --appimage-extract
```

Korzystając z powyższej komendy, można rozpakować AppImage i wtedy powstanie folder squashfs-root/, w którym będzie można znaleźć ikonkę aplikacji. Potem można ją skopiować, wrzucić do wspólnego katalogu w ~/AppImages/ i umieścić ścieżkę w .desktop.

```bash {style=gruvbox}
[Desktop Entry]
Type=Application
Name=Tiled
Exec=/home/filip/AppImages/Tiled/Tiled-1.11.2_Linux_Qt-6_x86_64.AppImage
Icon=/home/filip/AppImages/Tiled/tiled.svg
```

Powyższą treść umieszczam w pliku ~/.local/share/applications/tiled.desktop, żeby łatwo rozróżnić pliki .desktop stworzone dla aplikacji AppImage. Tak *zainstalowałem* [**Tiled**](https://www.mapeditor.org/).

Dziękuję za uwagę!