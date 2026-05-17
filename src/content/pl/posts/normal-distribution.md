+++
title = 'Wyprowadzenie wzoru na rozkład normalny'
date = 2026-05-11T22:08:41+02:00
+++

<!--more-->

## Pochodne

Pochodna funkcji złożonej:

$$
\frac{d}{dx} f(g(x)) = \frac{df}{dg} \frac{dg}{dx}
$$

Pochodna iloczynu:

$$
\frac{d}{dx}(fg) = \frac{df}{dx}g + f\frac{dg}{dx}
$$

## Średnia

Średnia arytmetyczna była stosowane przez ludzi już od czasów starożytnych do określania wartości typowych (oczekiwanych), mimo że nie mieli wtedy formalnego uzasadnienia. Średnią arytmetyczną post-hoc można zdefiniować jako wartość, która minimalizuje błąd kwadratowy.

Przykład: $\underline{x} = [-5,\, 5,\, 3,\, 4,\, 2,\, -3]$

![Arithmetic mean](/posts/normal-distribution/arithmetic_mean.png)

Jeśli przesuniemy wszystkie punkty w dół o wartość średniej arytmetycznej, to wtedy $\mu = 0$ i dane są scentrowane.

$$
L(\mu) = \sum_{i=1}^{n}(x_i - \mu)^2
$$

$$
\frac{\partial L}{\partial \mu} = 0
$$

Pochodna funkcji złożonej:

$$
-2\sum_{i=1}^{n} (x_i - \mu) = 0
$$

$$
\sum_{i=1}^{n} x_i = \sum_{i=1}^{n} \mu
$$

Z definicji mnożenia:

$$
\sum_{i=1}^{n} x_i = n \mu
$$

$$
\mu = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

## Wariancja

Wariancja jest miarą zmienności zmiennej losowej. Wikipedia podaje:

$$
\mathrm{Var}[X] = E[(X - \mu)^2]
$$

$X$ — zbiór próbek

$E$ — funkcja, która zwraca wartość oczekiwaną

$\mu$ — wartość oczekiwana dla zbioru próbek $X$

Jeżeli wartością oczekiwaną jest średnia arytmetyczna, to wtedy wariancja to błąd kwadratowy średniokwadratowy (MSE) dla średniej.

$$
\mathrm{Var}[X] = \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2
$$

## Rozkład normalny

Jeżeli wartość próbek zależy od wielu różnych czynników, to rozkład prawdopodobieństwa tych próbek będzie zbliżał się do rozkładu normalnego. Dowodzi o tym centralne twierdzenie graniczne. Dlatego rozkład normalny jest tak powszechny na świecie.

### Funkcja Gaussa

![Gaussian function](/posts/normal-distribution/gaussian_function.png)

$$
f(x) = e^{-x^2}
$$

Tak naprawdę to każda funkcja wykładnicza, której wykładnik należy wyłącznie do liczb niedodatnich, będzie miała kształt krzywej Gaussa. Matematycy mają taki nawyk, żeby zastępować każdą podstawę funkcji wykładniczej literką $e$, na przykład:

$$
b^x = e^{\ln (b) x} = e^{cx}
$$

Uogólniona postać funkcji Gaussa może wyglądać tak:

$$
f(x) = a \cdot e^{-c(x - b)^2}
$$

Wtedy $a$ skaluje wysokość krzywej, $c$ jej stromość, a $b$ pozycję jej wierzchołka. Warto zauważyć, że krzywa Gaussa jest symetryczna względem wierzchołka oraz bardzo szybko spada do wartości bliskiej $0$.

#### Dlaczego krzywa Gaussa jest w rozkładzie normalnym?

Tutaj dam trochę bardziej formalne uzasadnienie, ale osobiście wytłumaczenie, że funkcja, gdzie podnosimy dodatnią liczbę do ujemnej potęgi daje taki kształt, mnie zupełnie satysfakcjonuje.

Takie są założenia:

1. Zjawisko złożone jest z kilku niezależnych od siebie czynników (np. $x$ i $y$).
2. Rozkład prawdopodobieństwa jest symetryczny.
3. Im bardziej skrajne wartości tym mniejsze prawdopodobieństwo.

Wyobraźmy sobie, że losowo dobieramy punkty na płaszczyźnie $xy$ i rysujemy wektory łączące środek układu współrzędnych z tymi punktami. Nasza funkcja rozkładu prawdopodobieństwa $p(r)$ niech zwraca prawdopodobieństwo dobrania wektora o długości $r$.

$$
r = \sqrt{x^2 + y^2}
$$

Współrzędne biegunowe:

$$
x = r \cos \theta
$$

$$
y = r \sin \theta
$$

Trzeba zauważyć, że prawdopodobieństwo dobrania wektora o długości $r$ jest proporcjonalne do dobrania wektora o długości $x$, a potem wektora o długości $y$ (ponieważ rozkład jest symetryczny, można dowolnie obrócić wektor). Potem już idą rachunki.

$$
p(r) \propto p(x) p(y)
$$

Żeby dać znak równości, wymyślam jakąś stałą $\alpha$.

$$
\alpha p(r) = p(x) p(y)
$$

Liczymy pochodną po $\theta$ obustronnie:

$$
0 = \frac{\partial p(x)}{\partial x} \frac{\partial x}{\partial \theta} p(y) + p(x) \frac{\partial p(y)}{\partial y} \frac{\partial y}{\partial \theta}
$$

$$
-\frac{\partial p(x)}{\partial x} \frac{\partial x}{\partial \theta} p(y) = p(x) \frac{\partial p(y)}{\partial y} \frac{\partial y}{\partial \theta}
$$

Długość wektora $r$ nie zależy od jego rotacji $\theta$ i prawdopobieństwo też nie, bo takie jest założenie.

Pochodna $x$ po $\theta$:

$$
\frac{\partial x}{\partial \theta} = \frac{\partial}{\partial \theta} (r \cos \theta ) = -r \sin \theta = -y
$$

Pochodna $y$ po $\theta$:

$$
\frac{\partial y}{\partial \theta} = \frac{\partial}{\partial \theta} (r \sin \theta ) = r \cos \theta = x
$$

Równanie:

$$
y p(y) \frac{\partial p(x)}{\partial x} = xp(x) \frac{\partial p(y)}{\partial y}
$$

$$
\frac{p'(x)}{xp(x)} = \frac{p'(y)}{yp(y)} = C
$$

Całkujemy obustronnie dla $x$:

$$
\int \frac{p'(x)}{p(x)}\,dx = \int Cx\,dx
$$

$$
\ln |p(x)| + K_1 = \frac{1}{2}Cx^2 + K_2
$$

Stałe całkowania można połączyć w jedną:

$$
K_2 - K_1 = K
$$

$$
p(x) = e^{\frac{1}{2}Cx^2 + K} = e^Ke^{\frac{1}{2}Cx^2}
$$

$e^K$ to $A$:

$$
p(x) = Ae^{\frac{1}{2}Cx^2}
$$

$C$ musi być ujemne, żeby prawdopobieństwo było mniejsze dla coraz bardziej skrajnych wartości.

$$
p(x) = Ae^{-\frac{1}{2}cx^2}
$$

### Pole pod wykresem

Żeby uzyskać funkcję rozkładu prawdopodobieństwo, to wartość pola powierzchni pod wykresem musi być równa $1$.

$$
\int_{-\infty}^{\infty} Ae^{-\frac{1}{2}cx^2}\,dx = 1
$$

$$
\int_{-\infty}^{\infty} e^{-\frac{1}{2}cx^2}\,dx = \frac{1}{A}
$$

Dlatego że wykres funkcji jest symetryczny:

$$
\int_{0}^{\infty} e^{-\frac{1}{2}cx^2}\,dx = \frac{1}{2A}
$$

Tego się nie da rozwiązać. Trzeba przekształcić do problemu w trzecim wymiarze.

$$
\int_{0}^{\infty} e^{-\frac{1}{2}cx^2}\,dx \int_{0}^{\infty} e^{-\frac{1}{2}cy^2}\,dy = \frac{1}{4A^2}
$$

Można przekształcić do postaci podwójnej całki:

$$
\int_{0}^{\infty} \int_{0}^{\infty} e^{-\frac{1}{2}cx^2-\frac{1}{2}cy^2}\,dxdy = \frac{1}{4A^2}
$$

$$
\int_{0}^{\infty} \int_{0}^{\infty} e^{-\frac{1}{2}c(x^2+y^2)}\,dxdy = \frac{1}{4A^2}
$$

Zamieniamy na współrzędne biegunowe. Z twierdzenia Pitagorasa $x^2 + y^2 = r^2$.

$$
dxdy = |\det (J)| \,drd\theta
$$

$$
J = \begin{bmatrix}
\frac{\partial x}{\partial r}
& \frac{\partial x}{\partial \theta} \\[4pt]
\frac{\partial y}{\partial r}
& \frac{\partial y}{\partial \theta} \\
\end{bmatrix}
$$

Dla współrzędnych biegunowych:

$$
J = \begin{bmatrix}
\cos \theta
& -r\sin \theta \\
\sin \theta
& r\cos \theta \\
\end{bmatrix}
$$

$$
\det(J) = r\cos^2\theta + r\sin^2\theta
$$

$$
= r(\cos^2\theta + \sin^2\theta) = r
$$

$r$ jest zawsze dodatnie bo to długość wektora:

$$
dxdy = r \,drd\theta
$$

Wracając do całki:

$$
\int_{0}^{\frac{\pi}{2}} \int_{0}^{\infty} e^{-\frac{1}{2}c(r^2)}r\,drd\theta = \frac{1}{4A^2}
$$

$$
u = -\frac{1}{2}c(r^2)
$$

$$
du = -cr\,dr
$$

$$
dr = -\frac{1}{cr}\,du
$$

$$
\int_{0}^{\frac{\pi}{2}} \int_{0}^{-\infty} e^ur(-\frac{1}{cr})\,dud\theta = \frac{1}{4A^2}
$$

$$
-\frac{1}{c}\int_{0}^{\frac{\pi}{2}}[e^{-\infty} - e^0]\,d\theta = \frac{1}{4A^2}
$$

$$
\frac{1}{c}\int_{0}^{\frac{\pi}{2}}d\theta = \frac{1}{4A^2}
$$

$$
\frac{1}{c}\cdot\frac{\pi}{2} = \frac{1}{4A^2}
$$

$$
\frac{2\pi}{c} = \frac{1}{A^2}
$$

$$
A = \sqrt{\frac{c}{2\pi}}
$$

Wybieramy $+$ pierwiastek, bo chcemy, żeby pole pod wykresem było $1$, a nie $-1$.

### Definicja wariancji

Jeśli średnia $\mu = 0$ oraz wariancja oznaczona jest sybolem $\sigma^2$:

$$
\int_{-\infty}^{\infty} x^2 p(x)\,dx = \sigma^2
$$

Funkcja jest symetryczna:

$$
2\int_{0}^{\infty} x^2 p(x)\,dx = \sigma^2
$$

$$
2\int_{0}^{\infty} x^2 Ae^{-\frac{1}{2}cx^2}\,dx = \sigma^2
$$

$$
2A\int_{0}^{\infty} x^2 e^{-\frac{1}{2}cx^2}\,dx = \sigma^2
$$

Całkowanie na części:

$$
\int u\,dv = uv - \int v\,du
$$

$$
u = x
$$

$$
dv = xe^{-\frac{1}{2}cx^2}
$$

$$
v = \int xe^{-\frac{1}{2}cx^2}\,dx
$$

$$
m = -\frac{1}{2}cx^2
$$

$$
dm = -cx\,dx
$$

$$
dx = -\frac{1}{cx}\,dm
$$

$$
v = -\frac{1}{c}\int e^m\,dm
$$

$$
= -\frac{1}{c}e^m = -\frac{1}{c}e^{-\frac{1}{2}cx^2}
$$

Najpierw policzymy całkę nieoznaczoną:

$$
\int x^2 e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= -\frac{x}{c}e^{-\frac{1}{2}cx^2} - \int -\frac{1}{c}e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= -\frac{x}{c}e^{-\frac{1}{2}cx^2} + \frac{1}{c}\int e^{-\frac{1}{2}cx^2}\,dx
$$

Następnie całkę oznaczoną:

$$
\int_{0}^{\infty} x^2 e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= \left[-\frac{\infty}{c}e^{-\frac{1}{2}c\infty^2} - 0\right] + \frac{1}{c}\int_{0}^{\infty} e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= \frac{1}{c}\int_{0}^{\infty} e^{-\frac{1}{2}cx^2}\,dx = \frac{1}{c} \cdot \frac{1}{2A}
$$

Wracając do początku:

$$
2A\int_{0}^{\infty} x^2 e^{-\frac{1}{2}cx^2}\,dx = \sigma^2
$$

$$
= 2A\int_{0}^{\infty} x^2 e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= 2A\frac{1}{c} \cdot \frac{1}{2A} = \frac{1}{c}
$$

$$
\frac{1}{c} = \sigma^2
$$

$$
c = \frac{1}{\sigma^2}
$$

### Podsumowanie

Wzór na A:

$$
A = \sqrt{\frac{c}{2\pi}} = \sqrt{\frac{1}{2\pi\sigma^2}}
$$

$$
A = \frac{1}{\sqrt{2\pi\sigma^2}}
$$

Kompletny wzór:

$$
p(x) = Ae^{-\frac{1}{2}cx^2} = A\exp \left(-\frac{x^2}{2\sigma^2}\right)
$$

$$
p(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp \left(-\frac{x^2}{2\sigma^2}\right)
$$

Teraz wystarczy przesunąć wierzchołek o $\mu$:

$$
p(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp \left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$
