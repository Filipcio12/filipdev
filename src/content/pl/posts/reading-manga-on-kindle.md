+++
title = 'Jak czytać mangi na Kindle?'
date = 2026-03-03T22:04:53+01:00
+++

Od kiedy kupiłem Amazon Kindle, ciągle zastanawiałem się, czy nie można byłoby też czytać na nim mang, w końcu są czarno-białe, więc E-Ink powinien sobie z nimi poradzić. Ostatecznie udało mi się znaleźć rozwiązanie, które jest proste, nie wymaga pobierania KindleGen, ani korzystania z żadnych narzędzi Amazonu.

<!--more-->

Używam programu **Calibre** do zarządzania ebookami oraz do konwersji plików EPUB na AZW3, który jest formatem Amazonu. Kiedy przesyłasz pliki EPUB na Kindle przy użyciu aplikacji mobilnej albo strony internetowej, Amazon po cichu zamienia pliki EPUB na AZW3. Kindle sam w sobie nie rozpoznaje EPUB w ogóle, dlatego jeśli przerzucisz pliki EPUB za pomocą kabla USB, to nie znajdziesz swoich książek na czytniku.

Dzięki Calibre oraz jednej wtyczki można również dowolnie łączyć pliki EPUB w jeden plik. Jest to niezwykle przydatne, kiedy posiadasz wiele plików EPUB (oczywiście pozyskanych w pełni legalny sposób), każdy z nich odpowiadający jednemu z rozdziałów interesującej Cię mangi.

Calibre można pobrać ze strony internetowej: https://calibre-ebook.com/. Dla przykładu chciałbym przeczytać mangę **Vagabond** Takehiko Inoue i akurat pobrałem 327 plików EPUB dla każdego rozdziału mangi, które znajdują się w katalogu:

/home/filip/Documents/Mangas/Vagabond/

Instaluję wtyczkę **EpubMerge** bezpośrednio z Calibre. Po otworzeniu programu najpierw klikam strzałeczkę w dół na prawo od **Preferences**, a następnie **Get plugins to enhance calibre**. W okienku do wyszukiwania wpisuję EpubMerge i pojawia się wtyczka autorstwa Jima Millera. Klikam wtyczkę dwa razy i instaluję.

![Wtyczka EpubMerge Jima Millera](/posts/reading-manga-on-kindle/epub_merge.png)

Następnie naciskam małą strzałeczkę obok **Add books** po lewej i wybieram **Add from folders and subfolders**.

![Okienko dialogowe](/posts/reading-manga-on-kindle/add_books_from_folders_and_subfolders_dialog.png)

Wybieram **No**, ponieważ każdy plik odpowiada innemu rozdziałowi i zaznaczam wymieniony wyżej katalog. Po wczytaniu wszystkich plików, sortuję książki po tytule, aby później je scalić w odpowiedniej kolejności. Ponieważ nazwy rozdziałów są ponumerowane, to poprawnie się sortują. Następnie zaznaczam wszystkie rozdziały i klikam strzałeczkę obok **EpubMerge** a potem **Merge Epubs**. W okienku usuwam opis, który zawiera tytuły wszystkich scalonych plików, zmieniam tytuł oraz autora oraz ustawiam zdjęcie okładki.

![Okienko scalowania](/posts/reading-manga-on-kindle/merge_dialog.png)

Po scalowaniu usuwam pojedyncze rozdziały, ponieważ nie będą mi już potrzebne (zostają one usunięte z **Calibre Library**, więc wciąż istnieją w moim katalogu ~/Documents/Mangas/Vagabond/). Ostatnie co trzeba zrobić, to przekonwertować plik EPUB na AZW3, żeby to zrobić, wystarczy zaznaczyć książkę, a następnie kliknąć **Convert books**. Otworzy się okienko, gdzie po lewej będzie można wybrać input format (EPUB) a po prawej output format (AZW3). Klikam **Ok** i konwertuję.

![Okienko konwertowania](/posts/reading-manga-on-kindle/convert_vagabond.png)

Na koniec należy podłączyć Kindle do laptopa za pomocą USB. Calibre automatycznie wykryje czytnik. Wybieram książkę, a potem klikam **Send to device**. Czekam, aż pliki nie zostaną przesłane i tyle.

Dzięki za uwagę!
