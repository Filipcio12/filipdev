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
\frac{d}{dx} \log _a (x) = \frac{d}{dx} (\frac{\ln(x)}{\ln(a)})
$$

$$
= \frac{d}{dx} (\frac{1}{\ln(a)} \ln(x)) = \frac{1}{x \ln(a)}
$$

Użycie logarytmu o innej podstawie przy stracie logarytmicznej wpływa jedynie na ten stały współczynnik $\frac{1}{\ln(a)}$, więc w sumie nie ma to znaczenia. Dlatego w literaturze można spotkać $\log$ oznaczające logarytm naturalny. W tym wpisie będę używać oznaczenia $\ln$ dla jasności.

Pochodna ilorazu:

$$
\frac{d}{dx}(\frac{f(x)}{g(x)}) = \frac{\frac{df}{dx} g(x) - f(x)\frac{dg}{dx}}{g^2(x)}
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
= \frac{e^z}{e^z + 1} - (\frac{e^z}{e^z + 1})^2 = \sigma(z) - \sigma^2(z)
$$

$$
= \sigma(z)(1 - \sigma(z))
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
t^i \in \{0, 1\}
$$

$$
z^i = \underline{x}^i \underline{w}
$$

$$
p^i = \sigma(z^i)
$$

$t^i$ — etykieta próbki $\underline{x}^i$

$z^i$ — logit próbki $\underline{x}^i$

$p^i$ — prawdopodobieństwo przynależności próbki $\underline{x}^i$ do klasy $1$

$$
\underline{z} = [z^1, z^2, \ldots, z^n]^T
$$

$$
\underline{p} = [p^1, p^2, \ldots, p^n]^T
$$

$\underline{z}$ — wektor logitów

$\underline{p}$ — wektor prawdopodobieństw

Niestety ponieważ sigmoid zdefiniowałem jako funkcję, która przyjmuje skalar oraz zwraca skalar, to będę musiał wyprowadzić metodę gradientu prostego na skalarach.

### Błąd kwadratowy

$$
L = \sum_{i=1}^{n} L^i
$$

$$
L^i = \frac{1}{2} (p^i - t^i)^2
$$

$$
\frac{\partial L^i}{\partial \underline{w}} = \frac{\partial L^i}{\partial p^i} \frac{\partial p^i}{\partial \underline{w}}
$$

Pochodna $p^i$ po $\underline{w}$:

$$
\frac{\partial p^i}{\partial \underline{w}} = \frac{\partial \sigma}{\partial z^i} \frac{\partial z^i}{\underline{w}}
$$

$$
= \sigma(z^i)(1 - \sigma(z^i)) \frac{\partial}{\partial \underline{w}}(\underline{x}^i \underline{w})
$$

$$
= p^i(1 - p^i) \underline{x}^{(i)T} \\
$$

Pochodna $L^i$ po $p^i$:

$$
\frac{\partial L^i}{\partial p^i} = \frac{1}{2} \cdot 2 (p^i - t^i) \cdot 1
$$

$$
\frac{\partial L^i}{\partial p^i} = p^i - t^i
$$

Pochodna $L^i$ po $\underline{w}$:

$$
\frac{\partial L^i}{\partial \underline{w}} = \frac{\partial L^i}{\partial p^i} \frac{\partial p^i}{\partial \underline{w}}
$$

$$
\frac{\partial L^i}{\partial \underline{w}} = (p^i - t^i) p^i (1 - p^i)\underline{x}^{(i)T}
$$

Metoda gradientu prostego

$$
\frac{\partial L}{\partial \underline{w}} = \sum_{i=1}^{n} (p^i - t^i) p^i (1 - p^i)\underline{x}^{(i)T}
$$

$$
\Delta \underline{w} = - \eta \sum_{i=1}^{n} (p^i - t^i) p^i (1 - p^i)\underline{x}^{(i)T}
$$

Postać macierzowa:

$$
\Delta \underline{w} = -\eta X^T (\underline{p} - \underline{t})\underline{p}^T(1 - \underline{p}) \\
\tiny{{(d, 1) = (d, n)(n, 1)(1, n)(n, 1)}}
$$

### Binarna entropia krzyżowa

$$
L = \sum_{i=1}^{n} L^i
$$

$$
L^i = -[t^i \ln(p^i) + (1 - t^i) \ln(1 - p^i)]
$$

$$
\frac{\partial L^i}{\partial \underline{w}} = \frac{\partial L^i}{\partial p^i} \frac{\partial p^i}{\partial \underline{w}}
$$

Pochodna $p^i$ po $\underline{w}$:

$$
\frac{\partial p^i}{\partial \underline{w}} = p^i(1 - p^i) \underline{x}^{(i)T} \\
$$

Pochodna $L^i$ po $p^i$:

$$
\frac{\partial L^i}{\partial p^i} = -[\frac{t^i}{p^i} + \frac{t^i - 1}{1 - p^i}]
$$

Pochodna $L^i$ po $\underline{w}$:

$$
\frac{\partial L^i}{\partial \underline{w}} = -[\frac{t^i}{p^i} + \frac{t^i - 1}{1 - p^i}] p^i(1 - p^i) \underline{x}^{(i)T}
$$

$$
= -\underline{x}^{(i)T}[t^i(1 - p^i)  + (t^i - 1) p^i]
$$

$$
= \underline{x}^{(i)T} (p^i - t^i)
$$

Metoda gradientu prostego

$$
\frac{\partial L}{\partial \underline{w}} = \sum_{i=1}^{n} \underline{x}^{(i)T} (p^i - t^i)
$$

$$
\Delta \underline{w} = -\eta \sum_{i=1}^{n} \underline{x}^{(i)T} (p^i - t^i)
$$

Postać macierzowa

$$
\Delta \underline{w} = -\eta X^T (\underline{p} - \underline{t}) \\
\tiny{(d, 1) = (d, n)(n, 1)}
$$