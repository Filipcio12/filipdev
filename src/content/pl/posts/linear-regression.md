+++
title = 'Regresja liniowa'
date = 2026-04-04T11:47:43+02:00
+++

Prezentuję tutaj moje wyprowadzenie wzorów związanych z regresją liniową.

<!--more-->

## Mnożenie macierzy

$$
A = \begin{pmatrix}
a^1_1 & a^1_2 & \cdots & a^1_n \\
a^2_1 & a^2_2 & \cdots & a^2_n \\
\vdots  & \vdots  & \ddots & \vdots  \\
a^p_1 & a^p_2 & \cdots & a^p_n
\end{pmatrix}
$$

$$
B = \begin{pmatrix}
b^1_1 & b^1_2 & \cdots & b^1_m \\
b^2_1 & b^2_2 & \cdots & b^2_m \\
\vdots  & \vdots  & \ddots & \vdots  \\
b^n_1 & b^n_2 & \cdots & b^n_m
\end{pmatrix}
$$

$$
C = AB = \begin{pmatrix}
c^1_1 & c^1_2 & \cdots & c^1_m \\
c^2_1 & c^2_2 & \cdots & c^2_m \\
\vdots  & \vdots  & \ddots & \vdots  \\
c^p_1 & c^p_2 & \cdots & c^p_m
\end{pmatrix}
$$

$$
c^i_j = a^i_1 b^1_j + a^i_2 b^2_j + \ldots + a^i_n b^n_j
$$

Macierze można mnożyć jeśli są o wymiarach $(p, n) (n, m)$. Wtedy wynik ma wymiary $(p, m)$. Czyli środkowe wymiary muszą być równe i w wyniku się zjadają.

Za pomocą indeksu górnego numeruję wiersze a dolnego — kolumny.

## Odwracanie macierzy

## Macierz jednostkowa

$$
I_n = \begin{pmatrix}
1 & 0 & 0 & \cdots & 0 \\
0 & 1 & 0 & \cdots & 0 \\
0 & 0 & 1 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots  \\
0 & 0 & 0 & \cdots & 1 \\
\end{pmatrix}
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
X = \begin{pmatrix}
x^1_1 & x^1_2 & \cdots & x^1_d \\
x^2_1 & x^2_2 & \cdots & x^2_d \\
\vdots  & \vdots  & \ddots & \vdots  \\
x^n_1 & x^n_2 & \cdots & x^n_d
\end{pmatrix}
$$

$$
\underline{t} = [t^1, t^2, \ldots, t^n]^T
$$

$X$ — macierz próbek o wymiarach $(n, d)$

$n$ — liczba próbek

$d$ — liczba cech w próbce

$\underline{t}$ — wektor wartości docelowych o wymiarach $(n, 1)$

Dla nieznanej próbki $\underline{x}^i$ chcielibyśmy przewidzieć wartość $y^i$, która najlepiej pasuje do pozostałych próbek.

$$
y^i = w^1 x^i_1 + w^2 x^i_2 + \ldots + w^d x^i_d
$$

$$
\underline{x}^i = [x^i_1, x^i_2, \ldots, x^i_d]
$$

$$\underline{w} = [w^1, w^2, \ldots, w^d]^T$$

$$
y^i = \underline{x}^i \underline{w} \\
{\tiny (1, 1) = (1, d) (d, 1)}
$$

Wtedy wektor predykcji $\underline{y}$ można zdefiniować następująco:

$$
\underline{y} = X \underline{w}
$$

Następnie należy ustalić funkcję straty.

$$
L = \frac{1}{2} \sum_{i=1}^{n} (y^i - t^i)^2
$$

$$
L = \frac{1}{2}[\underline{y} - \underline{t}]^T [\underline{y} - \underline{t}]
$$

$$
L = \frac{1}{2}[X \underline{w} - \underline{t}]^T [X \underline{w} - \underline{t}] \\
{\tiny (1, 1) = (1, n) (n, 1)}
$$

Zarówno współczynnik $\frac{1}{2}$, jak i podnoszenie różnicy między predykcją a wartością docelową jest po to, żeby ułatwić liczenie pochodnej.

$$
\frac{\partial L}{\partial \underline{w}} = \frac{1}{2} \cdot 2 \cdot (\frac{\partial}{\partial \underline{w}}[X \underline{w} - \underline{t}])^T [X \underline{w} - \underline{t}]
$$

$$
\frac{\partial L}{\partial \underline{w}} = X^T [X \underline{w} - \underline{t}]
$$

$$
X^T X \underline{w} - X^T \underline{t} = 0
$$

$$
\underline{w} = (X^T X)^{-1} X^T \underline{t}
$$

Metoda gradientu prostego

$$
\Delta \underline{w} = - \eta \frac{\partial L}{\partial \underline{w}}
$$

$$
\Delta \underline{w} = - \eta X^T [X \underline{w} - \underline{t}]
$$

$$
\Delta \underline{w} = - \eta X^T [\underline{y} - \underline{t}]
$$

Odejmuję wartość docelową od predykcji, ponieważ jeśli predykcja jest większa od wartości docelowej, to należy obniżyć wagę. Mogę równie dobrze odwrócić te wartości.

$$
\Delta \underline{w} = \eta X^T [\underline{t} - \underline{y}]
$$

Teraz jeśli predykcja jest większa, to wartość $\Delta$ jest już ujemna, więc nie potrzeba minusa na początku.

Zarówno odejmowanie gradientu od wag, jak i liczenie funkcji straty, a nie korzyści, jest powszechną konwencją w uczeniu maszynowym.

## Regularyzacja L2

$$
\|\underline{w}\|_2 = \sqrt{(w^1)^2 + (w^2)^2 + \ldots + (w^d)^2}
$$

$$
\|\underline{w}\|^2_2 = (w^1)^2 + (w^2)^2 + \ldots + (w^d)^2
$$

$$
\|\underline{w}\|^2_2 = \underline{w}^T \underline{w}
$$

$$
L = \frac{1}{2}([X \underline{w} - \underline{t}]^T [X \underline{w} - \underline{t}] + \lambda \underline{w}^T \underline{w})
$$

$$
\frac{\partial L}{\partial \underline{w}} = \frac{1}{2}(2 \cdot [X^T X \underline{w} - X^T \underline{t}] + 2 \cdot \lambda \underline{w})
$$

$$
X^T X \underline{w} - X^T \underline{t} + \lambda \underline{w} = 0
$$

Żeby dodać współczynnik regularyzacji $\lambda$ do macierzy kwadratowej, korzystamy z macierzy jednostkowej $I$.

$$
(X^T X + \lambda I) \underline{w} = X^T X
$$

$$
\underline{w} = (X^T X + \lambda I)^{-1} X^T X
$$

Metoda gradientu prostego

$$
\Delta \underline{w} = - \eta \frac{\partial L}{\partial \underline{w}}
$$

$$
\Delta \underline{w} = - \eta X^T [\underline{y} - \underline{t}] + \lambda \underline{w}
$$

## Regularyzacja L1

$$
\|\underline{w}\|_1 = |w^1|+ |w^2|+ \ldots + |w^n|
$$

$$
\Delta \underline{w} = - \eta X^T [\underline{y} - \underline{t}] + \lambda \frac{\partial}{\partial \underline{w}} (\|\underline{w}\|_1)
$$

Ponieważ nie ma wygodnej pochodnej dla wartości absolutnej, to stosujemy jedynie metodę gradientu prostego.

## Cechy wielomianowe

$$
\underline{x}^i = [x^i_1, x^i_2, \ldots, x^i_d]
$$

<!-- $$
\phi _p(\underline{x}^i) = [1, x^i_1, \ldots, x^i_d, (x^i_1)^2, x^i_1 x^i_2, \ldots, (x^i_d)^2, \ldots, (x^i_1)^p, \ldots, (x^i_d)^p]
$$ -->

Transformacja ta tworzy wektor wszystkich kombinacji wielomianów, tj. poniżej:

$$
(x^i_1)^{p_1} (x^i_2)^{p_2} \ldots (x^i_d)^{p_d}
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
