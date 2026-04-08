+++
title = 'Binarna regresja logistyczna'
date = 2026-04-04T23:03:40+02:00
+++

Prezentuję tutaj moje wyprowadzenie wzorów związanych z binarną regresją logistyczną.

<!--more-->

## Pochodne

Pochodna logarytmu naturalnego:

$$
\frac{d}{dx} \ln(x) = \frac{1}{x}
$$

Pochodna logarytmu o podstawie a:

$$
\frac{d}{dx} \log _a (x) = \frac{d}{dx} \left[\frac{\ln(x)}{\ln(a)}\right]
$$

$$
= \frac{d}{dx} \left[\frac{1}{\ln(a)} \ln(x)\right] = \frac{1}{x \ln(a)}
$$

Użycie logarytmu o innej podstawie przy stracie logarytmicznej wpływa jedynie na ten stały współczynnik $\frac{1}{\ln(a)}$, więc w sumie nie ma to znaczenia. Dlatego w literaturze można spotkać $\log$ oznaczające logarytm naturalny. W tym wpisie będę używać oznaczenia $\ln$ dla jasności.

Pochodna ilorazu:

$$
\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{\frac{df}{dx} g(x) - f(x)\frac{dg}{dx}}{g^2(x)}
$$

Pochodna $e^x$:

$$
\frac{d}{dx}(e^x) = e^x
$$

## Sigmoid

Funkcja sigmoid przyjmuje surowe wartości z regresji liniowej i zwraca prawdopodobieństwa w przedziale $[0,1]$. Jej nazwa pochodzi od kształtu wykresu funkcji, który przypomina literkę „S”.

$$
\sigma(z) = \frac{1}{1 + e^{-z}} = \frac{e^z}{e^z + 1}
$$

$$
\frac{d \sigma}{dz} = \frac{e^z(e^z + 1) - (e^z)^2}{(e^z + 1)^2}
$$

$$
= \frac{e^z}{e^z + 1} - \left[\frac{e^z}{e^z + 1}\right]^2 = \sigma - \sigma^2
$$

$$
= \sigma(1 - \sigma)
$$

## Logit

Funkcja logitowa to odwrotność funkcji sigmoidalnej. Tym określeniem nazywamy też surowe predykcje modeli w uczeniu maszynowym przed zastosowaniem funkcji aktywacyjnej.

$$
\mathrm{logit}(p) = \ln \frac{p}{1 - p} = \ln(p) - \ln(1 - p)
$$

### Dowód odwrotności

$$
\sigma(z) = p
$$

$$
p = \frac{1}{1 + e^{-z}}
$$

$$
e^{-z} = \frac{1}{p} - 1 = \frac{1 - p}{p}
$$

$$
z = \ln \frac{p}{1 - p}
$$

## Funkcje straty

$$
y \in \{0, 1\}
$$

$$
z = \underline{x} \underline{w}
$$

$$
p = \sigma(z)
$$

$y$ — etykieta próbki $\underline{x}$

$z$ — logit próbki $\underline{x}$

$p$ — prawdopodobieństwo przynależności próbki $\underline{x}$ do klasy $1$

$$
\underline{z} = [z_1, z_2, \ldots, z_n]^\top
$$

$$
\underline{p} = [p_1, p_2, \ldots, p_n]^\top
$$

$\underline{z}$ — wektor logitów

$\underline{p}$ — wektor prawdopodobieństw

Niestety ponieważ sigmoid zdefiniowałem jako funkcję, która przyjmuje skalar oraz zwraca skalar, to będę musiał wyprowadzić metodę gradientu prostego na skalarach. Pochodną funkcji straty obliczam dla jednej próbki.

### Błąd kwadratowy

$$
L = \frac{1}{2} (p - y)^2
$$

$$
\frac{\partial L}{\partial \underline{w}} = \frac{\partial L}{\partial p} \frac{\partial p}{\partial \underline{w}}
$$

Pochodna $p$ po $\underline{w}$:

$$
\frac{\partial p}{\partial \underline{w}} = \frac{\partial \sigma}{\partial z} \frac{\partial z}{\underline{w}}
$$

$$
= \sigma(z)(1 - \sigma(z)) \frac{\partial}{\partial \underline{w}}(\underline{x} \underline{w})
$$

$$
= p(1 - p) \underline{x} \\
$$

Pochodna $L$ po $p$:

$$
\frac{\partial L}{\partial p} = \frac{1}{2} \cdot 2 (p - y) \cdot 1
$$

$$
\frac{\partial L}{\partial p} = p - y
$$

Pochodna $L$ po $\underline{w}$:

$$
\frac{\partial L}{\partial \underline{w}} = \frac{\partial L}{\partial p} \frac{\partial p}{\partial \underline{w}}
$$

$$
\frac{\partial L}{\partial \underline{w}} = (p - y) p (1 - p)\underline{x}
$$

Metoda gradientu prostego:

$$
\Delta \underline{w} = - \eta \underline{x}^\top (p - y) p (1 - p)
$$

Postać macierzowa (dla całego zbioru próbek):

$$
\Delta \underline{w} = -\eta X^\top (\underline{p} - \underline{y})\underline{p}^\top(1 - \underline{p}) \\
\tiny{{(d, 1) = (d, n)(n, 1)(1, n)(n, 1)}}
$$

### Binarna entropia krzyżowa

$$
L = -[y \ln(p) + (1 - y) \ln(1 - p)]
$$

$$
\frac{\partial L}{\partial \underline{w}} = \frac{\partial L}{\partial p} \frac{\partial p}{\partial \underline{w}}
$$

Pochodna $p$ po $\underline{w}$:

$$
\frac{\partial p}{\partial \underline{w}} = p(1 - p) \underline{x} \\
$$

Pochodna $L$ po $p$:

$$
\frac{\partial L}{\partial p} = -\left[\frac{y}{p} + \frac{y - 1}{1 - p}\right]
$$

Pochodna $L$ po $\underline{w}$:

$$
\frac{\partial L}{\partial \underline{w}} = -\left[\frac{y}{p} + \frac{y - 1}{1 - p}\right] p(1 - p) \underline{x}
$$

$$
= -[y(1 - p)  + (y - 1) p] \underline{x}
$$

$$
= (p - y) \underline{x}
$$

Metoda gradientu prostego:

$$
\Delta \underline{w} = -\eta \underline{x}^\top (p - y)
$$

Postać macierzowa (dla całego zbioru próbek):

$$
\Delta \underline{w} = -\eta X^\top (\underline{p} - \underline{y}) \\
\tiny{(d, 1) = (d, n)(n, 1)}
$$