+++
title = 'SSH for dummies'
date = 2026-03-10T14:08:58+01:00
+++

Not gonna lie, I only recently discovered why I couldn't connect to my remote server over SSH. Most guides online correctly state that you can use **ssh** command by simply providing the hostname and then the interactive shell will ask you for the password but it's not always the case.

<!--more-->

If you try to connect with ssh to the wrong port, the connection will hang and eventually timeout. That's precisely why I couldn't connect to my server because it listened to SSH at a port other than 22. Moreover, the ssh command uses your own local login as the server login and these don't necessarily have to match. That's why I believe that below is the best way to use the ssh command.

```bash {style=gruvbox}
ssh -l <login> -p <port> <host>
```

Many guides suggest this form: ssh username@hostname. But what if the username also contains the "@" sign? Then, you can face some strange problems as well.

I think it's worth configuring ssh with ~/.ssh/config file.

```bash {style=gruvbox}
Host *
  SendEnv TERM
  SetEnv TERM=xterm
  ServerAliveInterval 15
  ServerAliveCountMax 3

Host <alias>
    HostName <host>
    User <login>
    Port <port>
    IdentityFile <ssh-key>
```

The first block with "*" sign is supposed to send the environment variable TERM=xterm. Thanks to that, the remote terminal will use the same interpretation of keys (so the BACKSPACE will definitely work). The "ServerAliveInterval" checks every 15 seconds if the connection is alive and with "ServerAliveCountMax" if it gets no response after 3 tries it kicks the user out of the session. Otherwise I have to kill the terminal session each time the connection times out.

## SFTP

You can also send files over ssh with the command **sftp**. This command uses the same configuration as ssh so you can use the same alias as with ssh. When you use sftp, it opens an interactive shell and so here are some of the most important commands that can be used from within it.

- ls, cd, pwd: they work normally but on the remote host.
- lls, lcd, lpwd: equivalent commands but on the local computer.
- get: download file from the host.
- get -r: download directory from the host.
- mget: download many files from the host.
- put: send file to the host.
- put -r: send directory to the host.
- mput: send many files to the host.
- reget, reput: retry canceled transfer.