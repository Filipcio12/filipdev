+++
title = 'Reading Manga on Kindle'
date = 2026-03-03T22:04:53+01:00
+++

Ever since I bought Amazon Kindle I've been wondering if I could read manga on it. Since they're black and white, E-Ink should be able to handle them no problem. Finally, I managed to find a solution which does not involve KindleGen or any proprietary tools whatsoever.

<!--more-->

I use **Calibre** for managing ebooks and converting EPUB files to AZW3 which is an Amazon format. When you send EPUB files to your Kindle with the mobile app or the webpage, Amazon secretely changes EPUB files to AZW3. Kindle doesn't really recognize EPUB format on its own, that's why when you transfer EPUB files over USB, you won't find them on you e-reader.

Thanks to Calibre and one extension you can easily merge many EPUB files into one. It's very useful when you have tons of EPUB files (obtained fully legally of course), for example, when you have one EPUB for each chapter of your favorite manga.

You can download Calibre from their official website: https://calibre-ebook.com/. To demonstrate Calibre, let's say I would like to read Vagabond by Takehiko Inoue and I just happen to have 327 EPUB files each corresponding to one manga chapter in the following directory:

/home/filip/Documents/Mangas/Vagabond/

I install **EpubMerge** extension directly from Calibre. After I open the program I click a small down arrow next to **Preferences** and then **Get plugins to enhance calibre**. In the search box I type in EpubMerge and an extension by Jim Miller shows up. I click the plugin twice and install it.

![Extension EpubMerge by Jim Miller](/posts/reading-manga-on-kindle/epub_merge.png)

Next, I click the small arrow next to **Add books** on the left and choose **Add from folders and subfolders**.

![Dialog window](/posts/reading-manga-on-kindle/add_books_from_folders_and_subfolders_dialog.png)

I select **No**, because every file corresponds to a different chapter and select the directory I mentioned before. After loading all the files, I sort the e-books by title so that they can be merged in the proper order. Because names of chapters are numbered, they can be easily ordered. Then, I select all the chapter and click the arrow next to **EpubMerge** and then pick **Merge Epubs**. In the dialog, I delete the automatically generated description which contains names of all original files, I change the title of the e-book as well as the author and the cover image. 

![Merge dialog](/posts/reading-manga-on-kindle/merge_dialog.png)

After merging, I delete all the individual chapters because I won't need them anymore (they're only deleted from **Calibre Library** folder so they still exist in ~/Documents/Mangas/Vagabond/). The last thing to do is to convert the file from EPUB to AZW3. To do this, I just select the e-book and click **Convert books**. A dialog opens where on the left I can choose the input format (EPUB) and on the right the output format (AZW3). I click **Ok** and it converts.

![Okienko konwertowania](/posts/reading-manga-on-kindle/convert_vagabond.png)

Lastly, I need to connect my Kindle with my laptop over USB cable. Calibre automatically detects my e-reader. I select the book, then I click **Send to device**. I wait until the file is transferred and I'm done.

Thanks for reading!
