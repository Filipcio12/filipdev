+++
title = 'Wieloklasowa regresja logistyczna'
date = 2026-04-07T13:49:31+02:00
+++

Prezentuję tutaj moje wyprowadzenie wzorów związanych z wieloklasową regresją logistyczną.

<!--more-->

## Softmax

Softmax to generalizacja sigmoida dla więcej niż dwóch klas albo raczej na odwrót; sigmoid jest szczególnym przypadkiem funkcji softmax.

$$
\sigma(\underline{z})_j = \frac{e^{z_j}}{\sum_{k=1}^{c} e^{z_k}} = p_j
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
J = \begin{pmatrix}
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
\end{pmatrix}_{ij}
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

$$J = \left(\begin{smallmatrix}
\sigma_1(1 - \sigma_1) & -\sigma_1 \sigma_2 & \cdots & -\sigma_1 \sigma_c \\
-\sigma_2 \sigma_1 & \sigma_2(1 - \sigma_2) & \cdots & -\sigma_2 \sigma_c \\
\vdots & \vdots & \ddots & \vdots \\
-\sigma _c \sigma_1 & -\sigma _c \sigma_2 & \cdots & \sigma _c(1 - \sigma _c)
\end{smallmatrix}\right)$$

## Wieloklasowa entropia krzyżowa

Żeby zastosować regresję logistyczną dla wielu klas, trzeba stworzyć zestaw wag dla każdej z klas z osobna.

$$
W = \begin{pmatrix}
w^1_1 & w^1_2 & \cdots & w^1_c \\
w^2_1 & w^2_2 & \cdots & w^2_c \\
\vdots  & \vdots  & \ddots & \vdots  \\
w^d_1 & w^d_2 & \cdots & w^d_c
\end{pmatrix}
$$

$W$ — macierz wag o wymiarach $(d, c)$

$d$ — liczba cech (wejść)

$c$ — liczba klas (wyjść)

$$
T = \begin{pmatrix}
t^1_1 & t^1_2 & \cdots & t^1_c \\
t^2_1 & t^2_2 & \cdots & t^2_c \\
\vdots  & \vdots  & \ddots & \vdots  \\
t^n_1 & t^n_2 & \cdots & t^n_c
\end{pmatrix}
$$

$T$ — macierz one-hot etykiet o wymiarach $(n, c)$

$n$ — liczba próbek

$$
\underline{t}^i = [0, 0, \ldots, 1, \ldots, 0]
$$

$$
\underline{z^i} = \underline{x}^i W
$$

$$
p^i_j = \sigma(\underline{z^i})_j
$$

$\underline{t}^i$ — one-hot etykieta dla próbki $\underline{x}^i$

$\underline{z^i}$ — wektor logitów dla próbki $\underline{x}^i$

$p^i_j$ — prawdopodobieństwo przynależności próbki $\underline{x}^i$ do klasy $j$

$$
L = \sum_{i=1}^{n} \sum_{j=1}^{c} L^i_j
$$

$$
L^i_j = -t^i_j \ln(p^i_j)
$$

$$
\frac{\partial L^i_j}{\partial \underline{w}_k} = \frac{\partial L^i_j}{\partial p^i_j} \frac{\partial p^i_j}{\partial z^i_k} \frac{\partial z^i_k}{\partial \underline{w}_k}
$$

Pochodna $z^i_k$ po $\underline{w}_k$:

$$
\frac{\partial z^i_k}{\partial \underline{w}_k} = \frac{\partial}{\partial \underline{w}_k}(\underline{x}^i \underline{w}_k) = \underline{x}^i
$$

Pochodna $p^i_j$ po $z^i_k$:

$$
\frac{\partial p^i_j}{\partial z^i_k} = \frac{\partial}{\partial z^i_k}(\sigma(\underline{z^i})_j)
$$

Jeśli $j = k$:

$$
\frac{\partial p^i_j}{\partial z^i_k} = \sigma(\underline{z^i})_k (1 - \sigma(\underline{z^i})_k)
$$

$$
= p^i_k(1 - p^i_k)
$$

Jeśli $j \ne k$:

$$
\frac{\partial p^i_j}{\partial z^i_k} = - \sigma(\underline{z}^i)_j \sigma(\underline{z}^i)_k
$$

$$
= - p^i_j p^i_k
$$

Pochodna $L^i_j$ po $p^i_j$:

$$
\frac{\partial L^i_j}{\partial p^i_j} = - \frac{t^i_j}{p^i_j}
$$

Teraz pora policzyć wszystko razem dla dwóch różnych przypadków.

$$
\frac{\partial L^i_j}{\partial \underline{w}_k} = \frac{\partial L^i_j}{\partial p^i_j} \frac{\partial p^i_j}{\partial z^i_k} \frac{\partial z^i_k}{\partial \underline{w}_k}
$$

$$
= - \frac{t^i_j}{p^i_j} \frac{\partial p^i_j}{\partial z^i_k} \underline{x}^i
$$

Jeśli $j = k$:

$$
\frac{\partial L^i_j}{\partial \underline{w}_k} = - \frac{t^i_k}{p^i_k} [p^i_k(1 - p^i_k)] \underline{x}^i
$$

$$
= (t^i_k p^i_k - t^i_k)\underline{x}^i
$$

Jeśli $j \ne k$:

$$
\frac{\partial L^i_j}{\partial \underline{w}_k} = - \frac{t^i_j}{p^i_j} [-p^i_j p^i_k] \underline{x}^i
$$

$$
= t^i_j p^i_k \underline{x}^i
$$

Teraz sumujemy wszystko po klasach, żeby dostać pochodną $L^i$ po $\underline{w}_k$:

$$
\frac{\partial L^i}{\partial \underline{w}_k} = (t^i_k p^i_k - t^i_k)\underline{x}^i + \sum_{\substack{j=1 \\ j \neq k}}^{c} (t^i_j p^i_k \underline{x}^i)
$$

$$
= (t^i_k p^i_k - t^i_k)\underline{x}^i + p^i_k \underline{x}^i \sum_{\substack{j=1 \\ j \neq k}}^{c} t^i_j
$$

$$
= (t^i_k p^i_k - t^i_k)\underline{x}^i + p^i_k \underline{x}^i (\sum_{j = 1}^{c} (t^i_j )- t^i_k)
$$

$$
= (t^i_k p^i_k - t^i_k)\underline{x}^i + p^i_k \underline{x}^i (1 - t^i_k)
$$

$$
= (t^i_k p^i_k - t^i_k + p^i_k - t^i_k p^i_k)\underline{x}^i
$$

$$
= (p^i_k - t^i_k) \underline{x}^i
$$