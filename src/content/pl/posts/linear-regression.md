+++
title = 'Regresja liniowa'
date = 2026-04-04T11:47:43+02:00
+++

Prezentuję tutaj moje wyprowadzenie wzorów związanych z regresją liniową.

<!--more-->

## Mnożenie macierzy

$$
A = \begin{bmatrix}
a_{1 1} & a_{1 2} & \cdots & a_{1 n} \\
a_{2 1} & a_{2 2} & \cdots & a_{2 n} \\
\vdots  & \vdots  & \ddots & \vdots  \\
a_{p 1} & a_{p 2} & \cdots & a_{p n}
\end{bmatrix}
$$

$$
B = \begin{bmatrix}
b_{1 1} & b_{1 2} & \cdots & b_{1 m} \\
b_{2 1} & b_{2 2} & \cdots & b_{2 m} \\
\vdots  & \vdots  & \ddots & \vdots  \\
b_{n 1} & b_{n 2} & \cdots & b_{n m}
\end{bmatrix}
$$

$$
C = AB = \begin{bmatrix}
c_{1 1} & c_{1 2} & \cdots & c_{1 m} \\
c_{2 1} & c_{2 2} & \cdots & c_{2 m} \\
\vdots  & \vdots  & \ddots & \vdots  \\
c_{p 1} & c_{p 2} & \cdots & c_{p m}
\end{bmatrix}
$$

$$
c_{i j} = a_{i 1} b_{1 j} + a_{i 2} b_{2 j} + \ldots + a_{i n} b_{n j}
$$

Macierze można mnożyć jeśli są o wymiarach $(p, n) (n, m)$. Wtedy wynik ma wymiary $(p, m)$. Czyli środkowe wymiary muszą być równe i w wyniku się zjadają.

Za pomocą indeksu górnego numeruję wiersze a dolnego — kolumny.

## Odwracanie macierzy

## Macierz jednostkowa

$$
I_n = \begin{bmatrix}
1 & 0 & 0 & \cdots & 0 \\
0 & 1 & 0 & \cdots & 0 \\
0 & 0 & 1 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots  \\
0 & 0 & 0 & \cdots & 1 \\
\end{bmatrix}
$$

## Pochodne

$$
\frac{d}{dx} x^r = r x^{r - 1}
$$

pochodna wielomianu

$$
\frac{d}{dx} f(g(x)) = \frac{df}{dg} \frac{dg}{dx}
$$

pochodna funkcji złożonej

### Przykład

$$
\frac{\partial}{\partial x} (ax + b)^2 = 2x(ax + b)
$$

## Próbki, etykiety i wagi

$$
X = \begin{bmatrix}
x_{1 1} & x_{1 2} & \cdots & x_{1 d} \\
x_{2 1} & x_{2 2} & \cdots & x_{2 d} \\
\vdots  & \vdots  & \ddots & \vdots  \\
x_{n 1} & x_{n 2} & \cdots & x_{n d}
\end{bmatrix}
$$

$$
\underline{y} = [y_1, y_2, \ldots, y_n]^\top
$$

$X$ — macierz próbek o wymiarach $(n, d)$

$n$ — liczba próbek

$d$ — liczba cech w próbce

$\underline{y}$ — wektor wartości docelowych o wymiarach $(n, 1)$

Dla nieznanej próbki $\underline{x}$ chcielibyśmy przewidzieć wartość $\hat{y}$, która najlepiej pasuje do pozostałych próbek.

$$
\hat{y} = w_1 x_1 + w_2 x_2 + \ldots + w_d x_d
$$

$$
\underline{x} = [x_1, x_2, \ldots, x_d]
$$

$$\underline{w} = [w_1, w_2, \ldots, w_d]^\top$$

$$
\hat{y} = \underline{x} \underline{w} \\
{\tiny (1, 1) = (1, d) (d, 1)}
$$

Wtedy wektor predykcji $\underline{\hat{y}}$ można zdefiniować następująco:

$$
\underline{\hat{y}} = X \underline{w}
$$

Następnie należy ustalić funkcję straty.

$$
L = \frac{1}{2} \sum_{i=1}^{n} (\hat{y}_i - y_i)^2
$$

$$
L = \frac{1}{2}[\underline{\hat{y}} - \underline{y}]^\top [\underline{\hat{y}} - \underline{y}]
$$

$$
L = \frac{1}{2}[X \underline{w} - \underline{y}]^\top [X \underline{w} - \underline{y}] \\
{\tiny (1, 1) = (1, n) (n, 1)}
$$

Zarówno współczynnik $\frac{1}{2}$, jak i podnoszenie różnicy między predykcją a wartością docelową jest po to, żeby ułatwić liczenie pochodnej.

$$
\frac{\partial L}{\partial \underline{w}} = \frac{1}{2} \cdot 2 \cdot (\frac{\partial}{\partial \underline{w}}[X \underline{w} - \underline{y}])^\top [X \underline{w} - \underline{y}]
$$

$$
\frac{\partial L}{\partial \underline{w}} = X^\top [X \underline{w} - \underline{y}]
$$

$$
X^\top X \underline{w} - X^\top \underline{y} = 0
$$

$$
\underline{w} = (X^\top X)^{-1} X^\top \underline{y}
$$

Metoda gradientu prostego

$$
\Delta \underline{w} = - \eta \frac{\partial L}{\partial \underline{w}}
$$

$$
\Delta \underline{w} = - \eta X^\top [X \underline{w} - \underline{y}]
$$

$$
\Delta \underline{w} = - \eta X^\top [\underline{\hat{y}} - \underline{y}]
$$

Odejmuję wartość docelową od predykcji, ponieważ jeśli predykcja jest większa od wartości docelowej, to należy obniżyć wagę. Mogę równie dobrze odwrócić te wartości.

$$
\Delta \underline{w} = \eta X^\top [\underline{y} - \underline{\hat{y}}]
$$

Teraz jeśli predykcja jest większa, to wartość $\Delta$ jest już ujemna, więc nie potrzeba minusa na początku.

Zarówno odejmowanie gradientu od wag, jak i liczenie funkcji straty, a nie korzyści, jest powszechną konwencją w uczeniu maszynowym.

## Regularyzacja L2

$$
\|\underline{w}\|_2 = \sqrt{(w_1)^2 + (w_2)^2 + \ldots + (w_d)^2}
$$

$$
\|\underline{w}\|_2^2 = (w_1)^2 + (w_2)^2 + \ldots + (w_d)^2
$$

$$
\|\underline{w}\|_2^2 = \underline{w}^\top \underline{w}
$$

$$
L = \frac{1}{2}([X \underline{w} - \underline{y}]^\top [X \underline{w} - \underline{y}] + \lambda \underline{w}^\top \underline{w})
$$

$$
\frac{\partial L}{\partial \underline{w}} = \frac{1}{2}(2 \cdot [X^\top X \underline{w} - X^\top \underline{y}] + 2 \cdot \lambda \underline{w})
$$

$$
X^\top X \underline{w} - X^\top \underline{y} + \lambda \underline{w} = 0
$$

Żeby dodać współczynnik regularyzacji $\lambda$ do macierzy kwadratowej, korzystamy z macierzy jednostkowej $I$.

$$
(X^\top X + \lambda I) \underline{w} = X^\top \underline{y}
$$

$$
\underline{w} = (X^\top X + \lambda I)^{-1} X^\top \underline{y}
$$

Metoda gradientu prostego

$$
\Delta \underline{w} = - \eta \frac{\partial L}{\partial \underline{w}}
$$

$$
\Delta \underline{w} = - \eta X^\top [\underline{\hat{y}} - \underline{y}] + \lambda \underline{w}
$$

## Regularyzacja L1

$$
\|\underline{w}\|_1 = |w^1|+ |w^2|+ \ldots + |w^d|
$$

$$
\Delta \underline{w} = - \eta X^\top [\underline{\hat{y}} - \underline{y}] + \lambda \frac{\partial}{\partial \underline{w}} (\|\underline{w}\|_1)
$$

Ponieważ nie ma wygodnej pochodnej dla wartości absolutnej, to stosujemy jedynie metodę gradientu prostego.

## Cechy wielomianowe

$$
\underline{x} = [x_1, x_2, \ldots, x_d]
$$

Transformacja ta tworzy wektor wszystkich kombinacji wielomianów, tj. poniżej:

$$
(x_1)^{p_1} (x_2)^{p_2} \ldots (x_d)^{p_d}
$$

$$
p_1 + p_2 + \ldots + p_d \le p
$$

Liczbę takich kombinacji można przedstawić jako problem, tzw. „gwiazdek i pasków” (ang. „stars and bars”). Dla przykładu rozwiążmy problem dla 2 cech oraz 3-tej potęgi. Dla jasności oznaczę jedną cechę jako $a$ a drugą jako $b$.

$$
[1, a, b, a^2, ab, b^2, a^3, a^2 b, a b^2, b^3]
$$

Ewidentnie jest tutaj $10$ kombinacji.

Każdy z tych wielomianów można również przedstawić następująco:

$$
| \ | \ \ast \ \ast \ \ast  \\
\tiny{a^0 b^0}
$$

$$
\ast \ | \ | \ \ast \ \ast  \\
\tiny{a^1 b^0}
$$

$$
| \ \ast \ | \ \ast \ \ast  \\
\tiny{a^0 b^1}
$$

$$
\ast \ \ast \ | \ | \ \ast  \\
\tiny{a^2 b^0}
$$

$$
\ast \ | \ \ast \ | \ \ast  \\
\tiny{a^1 b^1}
$$

$$
| \ \ast \ \ast \ | \ \ast  \\
\tiny{a^0 b^2}
$$

$$
\ast \ \ast \ \ast \ | \ |  \\
\tiny{a^3 b^0}
$$

$$
\ast \ \ast \ | \ \ast \ |  \\
\tiny{a^2 b^1}
$$

$$
\ast \ | \ \ast \ \ast \ |  \\
\tiny{a^1 b^2}
$$

$$
| \ \ast \ \ast \ \ast \ |  \\
\tiny{a^0 b^3}
$$

Problem można wtedy zinterpretować jako: „Na ile sposobów można umieścić $d$ pasków na $p + d$ miejsc?”

Liczba takich kombinacji to:

$$
\binom{p + d}{d}
$$

$$
\binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

Dla przykładu $d = 2$ i $p = 3$:

$$
\binom{3 + 2}{2} = \binom{5}{2}
$$

$$
\binom{5}{2}= \frac{120}{2 \cdot 6} = 10
$$
