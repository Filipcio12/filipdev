+++
title = 'SSH dla początkujących'
date = 2026-03-10T14:08:58+01:00
+++

Nie ukrywam, że dopiero ostatnio dowiedziałem się, dlaczego nie mogłem połączyć się z moim serwerem poprzez SSH. Większość poradników w sieci poprawnie stwierdza, że korzystając z komendy **ssh** wystarczy podać nazwę hosta, a następnie interaktywna powłoka sama zapyta Cię o hasło, jednak nie jest do końca prawda.

<!--more-->

Jeśli będziesz próbować połączyć się na niewłaściwym porcie, to połączenie będzie zawieszone i po jakimś czasie wygaśnie. Właśnie przez to nie mogłem się połączyć z serwerem, ponieważ serwer SSH nasłuchiwał na inny port niż 22. Poza tym ssh przyjmuje login taki sam, jaki masz na swoim lokalnym systemie, a on nie musi się pokrywać z loginem na serwerze. Dlatego moim zdaniem najprościej korzystać z ssh w poniższy sposób.

```bash {style=gruvbox}
ssh -l <login> -p <port> <host>
```

Niektóre poradniki sugerują zapis: ssh username@hostname. Ale co jeśli nazwa użytkownika również zawiera "@", wtedy również można napotkać problem.

Warto też skonfigurować ssh za pomocą pliku ~/.ssh/config.

```bash {style=gruvbox}
Host *
  SendEnv TERM
  SetEnv TERM=xterm

Host <alias>
    HostName <host>
    User <login>
    Port <port>
    IdentityFile <ssh-key>
```

Pierwszy blok z "*" służy po to, żeby dla każdego hosta przesyłać zmienną środowiskową TERM=xterm. Dzięki niej zdalny terminal będzie na pewno korzystał z tej samej interpretacji klawiszy (dzięki temu BACKSPACE będzie na pewno działać).

## SFTP

Za pomocą ssh można również przesyłać pliki, używając komendy **sftp**. Polecenie sftp również wykorzystuje tą samą konfigurację, co ssh, więc można po prostu podać sftp oraz alias i uzyskać to samo połączenie. Komenda sftp uruchamia interaktywną powłokę, a oto najważniejsze polecenia z jakich można w niej korzystać.

- ls, cd, pwd: działają tak samo jak normalnie, tylko dla zdalnego hosta.
- lls, lcd, lpwd: to odpowiedniki operacji, ale na lokalnym urządzeniu.
- get: pobranie pliku z hosta.
- get -r: pobranie katalogu z hosta.
- mget: pobranie kilku plików z hosta.
- put: wysłanie pliku do hosta.
- put -r: wysłanie katalogu do hosta.
- mput: wysłanie kilku plików do hosta.
- reget, reput: ponowne rozpoczęcie zawieszonego transferu.
