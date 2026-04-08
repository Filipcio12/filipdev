+++
title = 'Wieloklasowa regresja logistyczna'
date = 2026-04-07T13:49:31+02:00
+++

Prezentuję tutaj moje wyprowadzenie wzorów związanych z wieloklasową regresją logistyczną.

<!--more-->

## Softmax

Softmax to generalizacja sigmoida dla więcej niż dwóch klas albo raczej na odwrót; sigmoid jest szczególnym przypadkiem funkcji softmax.

$$
\sigma(\underline{z})_i = \frac{e^{z_i}}{\sum_{j=1}^{c} e^{z_j}} = p_i
$$

$$
\sigma(\underline{z}) = \underline{p}
$$

Softmax zwraca wektor i we wzorze indeksujemy ten wektor.

$$
\underline{z} = [z_1, z_2, \ldots, z_c]
$$

$$
\underline{p} = [p_1, p_2, \ldots, p_c]
$$

$\underline{z}$ — wektor $c$-elementowy logitów

$\underline{p}$ — wektor $c$-elementowy prawdopodobieństw

### Sigmoid to softmax dla klasy $1$ i $c = 2$

Jeśli $\underline{z} = [z_1, z_2]$:

$$
\sigma(\underline{z})_1 = \frac{e^{z_1}}{e^{z_1} + e^{z_2}}
$$

Dzielimy licznik i mianownik przez $e^{z_1}$.

$$
\sigma(\underline{z})_1 = \frac{1}{1 + e^{z_2 - z_1}}
$$

Dla $z = z_1 - z_2$:

$$
\sigma(\underline{z})_1 = \frac{1}{1 + e^{-z}}
$$

### Pochodna

Ponieważ softmax to funkcja przyjmująca wektor i zwracająca wektor, to pochodną tej funkcji jest macierz Jacobiego.

$$
\frac{\partial \sigma}{\partial \underline{z}} = J
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
\frac{\partial}{\partial z_i}(\sum_{k=1}^{c} e^{z_k})
$$

$$
= \frac{\partial}{\partial z_i}(e^{z_1} + \ldots + e^{z_i} + \ldots + e^{z_c})
$$

$$
= e^{z_i}
$$

Tutaj musimy użyć inną zmienną (w tym przypadku $k$) do iteracji sumy, ponieważ licząc pochodną po $z_j$, chcemy policzyć pochodną po $j$-tym elemencie wektora $\underline{z}$, a nie po wszystkich elementach.

Kiedy $i = j$ (na przekątnej):

$$
\frac{\partial \sigma _i}{\partial z_i} = \frac{\partial}{\partial z_i}(\frac{e^{z_i}}{ \sum_{k=1}^{c} e^{z_k}})
$$

$$
= \frac{e^{z_i} \sum_{k=1}^{c} e^{z_k} - (e^{z_i})^2}{(\sum_{k=1}^{c} e^{z_k})^2}
$$

$$
= \frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}} - (\frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}})^2
$$

$$
= \sigma(\underline{z})_i - \sigma^2(\underline{z})_i
$$

$$
= \sigma(\underline{z})_i(1 - \sigma(\underline{z})_i)
$$

Widać tutaj jasną analogię do sigmoida.

Kiedy $i \ne j$ (nie na przekątnej):

$$
\frac{\partial \sigma _i}{\partial z_j} = e^{z_i} \frac{\partial}{\partial z_j}(\frac{1}{\sum_{k=1}^{c} e^{z_k}})
$$

$$
= -\frac{e^{z_i} e^{z_j}}{(\sum_{k=1}^{c} e^{z_k})^2} 
$$

$$
= -\frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}} \frac{e^{z_j}}{\sum_{k=1}^{c} e^{z_k}} 
$$

$$
= -\sigma(\underline{z})_i \sigma(\underline{z})_j
$$

Zatem cała macierz Jacobiego będzie wyglądać:

$$J = \left[\begin{smallmatrix}
\sigma_1(1 - \sigma_1) & -\sigma_1 \sigma_2 & \cdots & -\sigma_1 \sigma_c \\
-\sigma_2 \sigma_1 & \sigma_2(1 - \sigma_2) & \cdots & -\sigma_2 \sigma_c \\
\vdots & \vdots & \ddots & \vdots \\
-\sigma _c \sigma_1 & -\sigma _c \sigma_2 & \cdots & \sigma _c(1 - \sigma _c)
\end{smallmatrix}\right]$$

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
\underline{y} = [0, 0, \ldots, 1, \ldots, 0]
$$

$$
\underline{z} = \underline{x} W
$$

$$
p_i = \sigma(\underline{z})_i
$$

$\underline{y}$ — one-hot etykieta dla próbki $\underline{x}$

$\underline{z}$ — wektor logitów dla próbki $\underline{x}$

$p_i$ — prawdopodobieństwo przynależności próbki $\underline{x}$ do klasy $i$

Pochodną funkcji straty obliczam dla jednej próbki.

$$
L = \sum_{i=1}^{c} L_i
$$

$$
L_i = -y_i \ln(p_i)
$$

$$
\frac{\partial L_i}{\partial \underline{w}_j} = \frac{\partial L_i}{\partial p_i} \frac{\partial p_i}{\partial z_j} \frac{\partial z_j}{\partial \underline{w}_j}
$$

Pochodna $z_j$ po $\underline{w}_j$:

$$
\frac{\partial z_j}{\partial \underline{w}_j} = \frac{\partial}{\partial \underline{w}_j}(\underline{x} \underline{w}_j) = \underline{x}
$$

Pochodna $p_i$ po $z_j$:

$$
\frac{\partial p_i}{\partial z_j} = \frac{\partial}{\partial z_j}(\sigma(\underline{z})_i)
$$

Jeśli $i = j$:

$$
\frac{\partial p_i}{\partial z_j} = \sigma(\underline{z})_j (1 - \sigma(\underline{z})_j)
$$

$$
= p_j(1 - p_j)
$$

Jeśli $i \ne j$:

$$
\frac{\partial p_i}{\partial z_j} = - \sigma(\underline{z})_i \sigma(\underline{z})_j
$$

$$
= - p_i p_j
$$

Pochodna $L_i$ po $p_i$:

$$
\frac{\partial L_i}{\partial p_i} = - \frac{y_i}{p_i}
$$

Teraz pora policzyć wszystko razem dla dwóch różnych przypadków.

$$
\frac{\partial L_i}{\partial \underline{w}_j} = \frac{\partial L_i}{\partial p_i} \frac{\partial p_i}{\partial z_j} \frac{\partial z_j}{\partial \underline{w}_j}
$$

$$
= - \frac{y_i}{p_i} \frac{\partial p_i}{\partial z_j} \underline{x}
$$

Jeśli $i = j$:

$$
\frac{\partial L_i}{\partial \underline{w}_j} = - \frac{y_j}{p_j} [p_j(1 - p_j)] \underline{x}
$$

$$
= (y_j p_j - y_j)\underline{x}
$$

Jeśli $i \ne j$:

$$
\frac{\partial L_i}{\partial \underline{w}_j} = - \frac{y_i}{p_i} [-p_i p_j] \underline{x}
$$

$$
= y_i p_j \underline{x}
$$

Teraz sumujemy wszystko po klasach, żeby dostać pochodną $L$ po $\underline{w}_j$:

$$
\frac{\partial L}{\partial \underline{w}_j} = (y_j p_j - y_j)\underline{x} + \sum_{\substack{i=1 \\ i \neq j}}^{c} (y_i p_j \underline{x})
$$

$$
= (y_j p_j - y_j)\underline{x} + p_j \underline{x} \sum_{\substack{i=1 \\ i \neq j}}^{c} y_i
$$

$$
= (y_j p_j - y_j)\underline{x} + p_j \underline{x} ((\sum_{i = 1}^{c} y_i )- y_j)
$$

$$
= (y_j p_j - y_j)\underline{x} + p_j \underline{x} (1 - y_j)
$$

$$
= (y_j p_j - y_j + p_j - y_j p_j)\underline{x}
$$

$$
= (p_j - y_j) \underline{x}
$$

Metoda gradientu prostego:

$$
\Delta \underline{w}_j = - \eta \underline{x}^{\top} (p_j - y_j)
$$

Postać macierzowa (dla całego zbioru próbek):

$$
\Delta W = -\eta X^\top (P - Y) \\
\tiny{(d, c) = (d, n)(n, c)}
$$