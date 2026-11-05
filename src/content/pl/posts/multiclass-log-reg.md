+++
title = 'Wieloklasowa regresja logistyczna'
date = 2026-04-07T13:49:31+02:00
+++

W tym artykule przedstawiam rozszerzenie regresji logistycznej na problemy wieloklasowe. Polega ono na przekształceniu surowych wyników liniowych (tzw. logitów) w unormowany rozkład prawdopodobieństwa za pomocą funkcji softmax, a następnie na ocenie błędu modelu przy użyciu funkcji straty entropii krzyżowej.

<!--more-->

## Softmax

Softmax to generalizacja sigmoida dla więcej niż dwóch klas albo raczej na odwrót; sigmoid jest szczególnym przypadkiem funkcji softmax.

$$
\sigma(\mathbf{z})_i = \frac{e^{z_i}}{\sum_{j=1}^{c} e^{z_j}} = p_i
$$

$$
\sigma(\mathbf{z}) = \mathbf{p}
$$

Softmax zwraca wektor i we wzorze indeksujemy ten wektor.

$$
\mathbf{z} = [z_1, z_2, \ldots, z_c]
$$

$$
\mathbf{p} = [p_1, p_2, \ldots, p_c]
$$

$\mathbf{z}$ — wektor $c$-elementowy logitów

$\mathbf{p}$ — wektor $c$-elementowy prawdopodobieństw

### Sigmoid to softmax dla klasy $1$ i $c = 2$

Jeśli $\mathbf{z} = [z_1, z_2]$:

$$
\sigma(\mathbf{z})_1 = \frac{e^{z_1}}{e^{z_1} + e^{z_2}}
$$

Dzielimy licznik i mianownik przez $e^{z_1}$.

$$
\sigma(\mathbf{z})_1 = \frac{1}{1 + e^{z_2 - z_1}}
$$

Dla $z = z_1 - z_2$:

$$
\sigma(\mathbf{z})_1 = \frac{1}{1 + e^{-z}}
$$

### Pochodna

Ponieważ softmax to funkcja przyjmująca wektor i zwracająca wektor, to pochodną tej funkcji jest macierz Jacobiego.

$$
\frac{\partial \sigma}{\partial \mathbf{z}} = J
$$

$$
J = \begin{bmatrix}
\dfrac{\partial \sigma_1}{\partial z_1} 
& \dfrac{\partial \sigma_1}{\partial z_2} 
& \cdots 
& \dfrac{\partial \sigma_1}{\partial z_c} \\[8pt]
\dfrac{\partial \sigma_2}{\partial z_1}
& \dfrac{\partial \sigma_2}{\partial z_2}
& \cdots 
& \dfrac{\partial \sigma_2}{\partial z_c} \\[2pt]
\vdots  & \vdots  & \ddots & \vdots  \\[2pt]
\dfrac{\partial \sigma _c}{\partial z_1}
& \dfrac{\partial \sigma _c}{\partial z_2}
& \cdots 
& \dfrac{\partial \sigma _c}{\partial z_c}
\end{bmatrix}_{ij}
$$

Poniższa pochodna przyda się przy obliczeniach później.

$$
\frac{\partial}{\partial z_j}\left[\sum_{k=1}^{c} e^{z_k}\right]
$$

$$
= \frac{\partial}{\partial z_j}(e^{z_1} + \ldots + e^{z_j} + \ldots + e^{z_c})
$$

$$
= e^{z_j}
$$

Kiedy $i = j$ (na przekątnej):

$$
\frac{\partial \sigma _i}{\partial z_i} = \frac{\partial}{\partial z_i}\left[\frac{e^{z_i}}{ \sum_{k=1}^{c} e^{z_k}}\right]
$$

$$
= \frac{e^{z_i} \sum_{k=1}^{c} e^{z_k} - (e^{z_i})^2}{(\sum_{k=1}^{c} e^{z_k})^2}
$$

$$
= \frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}} - \left[\frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}}\right]^2
$$

$$
= \sigma_i - \sigma^2_i
$$

$$
= \sigma_i(1 - \sigma_i)
$$

Widać tutaj jasną analogię do sigmoida.

Kiedy $i \ne j$ (nie na przekątnej):

$$
\frac{\partial \sigma _i}{\partial z_j} = e^{z_i} \frac{\partial}{\partial z_j}\left[\frac{1}{\sum_{k=1}^{c} e^{z_k}}\right]
$$

$$
= -\frac{e^{z_i} e^{z_j}}{(\sum_{k=1}^{c} e^{z_k})^2} 
$$

$$
= -\frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}} \frac{e^{z_j}}{\sum_{k=1}^{c} e^{z_k}} 
$$

$$
= -\sigma_i \sigma_j
$$

Zatem cała macierz Jacobiego będzie wyglądać:

$$J = \left[\begin{smallmatrix}
\sigma_1(1 - \sigma_1) & -\sigma_1 \sigma_2 & \cdots & -\sigma_1 \sigma_c \\
-\sigma_2 \sigma_1 & \sigma_2(1 - \sigma_2) & \cdots & -\sigma_2 \sigma_c \\
\vdots & \vdots & \ddots & \vdots \\
-\sigma _c \sigma_1 & -\sigma _c \sigma_2 & \cdots & \sigma _c(1 - \sigma _c)
\end{smallmatrix}\right]$$

### Delta Kroneckera

\[
\delta_{ij} =
\begin{cases}
1 & \text{dla } i = j \\
0 & \text{dla } i \ne j
\end{cases}
\]

Delta Kroneckera to funkcja, której używa się do uproszczenia zapisu złożonych wzorów.

\[
\frac{\partial \sigma _i}{\partial z_j} =
\begin{cases}
\sigma_i(1 - \sigma_i) & \text{dla } i = j \\
-\sigma_i \sigma_j & \text{dla } i \ne j
\end{cases}
\]

$$
= \delta_{ij}(\sigma_i(1 - \sigma_i)) + (1 - \delta_{ij})(-\sigma_i \sigma_j)
$$

$$
= \delta_{ij}\sigma_i - \delta_{ij}\sigma^2_i - \sigma_i \sigma_j + \delta_{ij}\sigma_i \sigma_j
$$

Wyrażenia, przy których jest $\delta_{ij}$ będą w wyniku tylko jeśli $i = j$.

$$
= \delta_{ij}\sigma_i - \delta_{ij}\sigma^2_i - \sigma_i \sigma_j + \delta_{ij}\sigma^2_i
$$

$$
\frac{\partial \sigma _i}{\partial z_j} = \sigma_i (\delta_{ij} - \sigma_j)
$$

## Wieloklasowa entropia krzyżowa

Żeby zastosować regresję logistyczną dla wielu klas, trzeba stworzyć zestaw wag dla każdej z klas z osobna.

$$
W = \begin{bmatrix}
w_{1 1} & w_{1 2} & \cdots & w_{1 c} \\
w_{2 1} & w_{2 2} & \cdots & w_{2 c} \\
\vdots  & \vdots  & \ddots & \vdots  \\
w_{d 1} & w_{d 2} & \cdots & w_{d c}
\end{bmatrix}
$$

$W$ — macierz wag o wymiarach $(d, c)$

$d$ — liczba cech (wejść)

$c$ — liczba klas (wyjść)

$$
Y = \begin{bmatrix}
y_{1 1} & y_{1 2} & \cdots & y_{1 c} \\
y_{2 1} & y_{2 2} & \cdots & y_{2 c} \\
\vdots  & \vdots  & \ddots & \vdots  \\
y_{n 1} & y_{n 2} & \cdots & y_{n c}
\end{bmatrix}
$$

$Y$ — macierz one-hot etykiet o wymiarach $(n, c)$

$n$ — liczba próbek

$$
\mathbf{y} = [0, 0, \ldots, 1, \ldots, 0]
$$

$$
\mathbf{z} = \mathbf{x} W
$$

$$
p_i = \sigma(\mathbf{z})_i
$$

$\mathbf{y}$ — one-hot etykieta dla próbki $\mathbf{x}$

$\mathbf{z}$ — wektor logitów dla próbki $\mathbf{x}$

$p_i$ — prawdopodobieństwo przynależności próbki $\mathbf{x}$ do klasy $i$

Pochodną funkcji straty obliczam dla jednej próbki.

$$
L = \sum_{i=1}^{c} L_i
$$

$$
L_i = -y_i \ln(p_i)
$$

$$
\frac{\partial L_i}{\partial \mathbf{w}_j} = \frac{\partial L_i}{\partial p_i} \frac{\partial p_i}{\partial z_j} \frac{\partial z_j}{\partial \mathbf{w}_j}
$$

Pochodna $z_j$ po $\mathbf{w}_j$:

$$
\frac{\partial z_j}{\partial \mathbf{w}_j} = \frac{\partial}{\partial \mathbf{w}_j}(\mathbf{x} \mathbf{w}_j) = \mathbf{x}
$$

Pochodna $p_i$ po $z_j$:

$$
\frac{\partial p_i}{\partial z_j} = p_i (\delta_{ij} - p_j)
$$

Pochodna $L_i$ po $p_i$:

$$
\frac{\partial L_i}{\partial p_i} = - \frac{y_i}{p_i}
$$

Pochodna $L_i$ po $\mathbf{w}_j$:

$$
\frac{\partial L_i}{\partial \mathbf{w}_j} = \frac{\partial L_i}{\partial p_i} \frac{\partial p_i}{\partial z_j} \frac{\partial z_j}{\partial \mathbf{w}_j}
$$

$$
= - \frac{y_i}{p_i} (p_i (\delta_{ij} - p_j)) \mathbf{x}
$$

$$
= (p_j y_i - y_j \delta_{ij}) \mathbf{x}
$$

Pochodna $L$ po $\mathbf{w}_j$:

$$
\frac{\partial L}{\partial \mathbf{w}_j} = \sum_{i=1}^{c} (p_j y_i - y_j \delta_{ij}) \mathbf{x}
$$

$$
= \left[p_j \sum_{i=1}^{c} y_i - y_j \sum_{i=1}^{c} \delta_{ij} \right] \mathbf{x}
$$

$$
= (p_j - y_j) \mathbf{x}
$$

Ponieważ $\mathbf{y}$ jest one-hot, to suma jego elementów jest równa $1$. Natomiast $\delta_{ij}$ jest równa jeden tylko dla $i = j$, ale dla reszty jest równa $0$, więc ta suma również musi być równa $1$.

Metoda gradientu prostego:

$$
\Delta \mathbf{w}_j = - \eta \mathbf{x}^{\top} (p_j - y_j)
$$

Postać macierzowa (dla całego zbioru próbek):

$$
\Delta W = -\eta X^\top (P - Y) \\
\tiny{(d, c) = (d, n)(n, c)}
$$