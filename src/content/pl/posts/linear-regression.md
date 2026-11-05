+++
title = 'Regresja liniowa'
date = 2026-04-04T11:47:43+02:00
+++

W tym artykule przedstawiam matematyczne wyprowadzenie regresji liniowej oparte na minimalizacji błędu średniokwadratowego (MSE). Omawiam rozwiązanie analityczne oraz numeryczne, a także wpływ regularyzacji na wyznaczane parametry.

<!--more-->

## Pochodne

Pochodna wielomianu:

$$
\frac{d}{dx} x^r = r x^{r - 1}
$$

Pochodna funkcji złożonej:

$$
\frac{d}{dx} f(g(x)) = \frac{df}{dg} \frac{dg}{dx}
$$

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
\mathbf{y} = [y_1, y_2, \ldots, y_n]^\top
$$

$X$ — macierz próbek o wymiarach $(n, d)$

$n$ — liczba próbek

$d$ — liczba cech w próbce

$\mathbf{y}$ — wektor wartości docelowych o wymiarach $(n, 1)$

Dla nieznanej próbki $\mathbf{x}$ chcielibyśmy przewidzieć wartość $\hat{y}$, która najlepiej pasuje do pozostałych próbek.

$$
\hat{y} = w_1 x_1 + w_2 x_2 + \ldots + w_d x_d
$$

$$
\mathbf{x} = [x_1, x_2, \ldots, x_d]
$$

$$\mathbf{w} = [w_1, w_2, \ldots, w_d]^\top$$

$$
\hat{y} = \mathbf{x} \mathbf{w} \\
{\tiny (1, 1) = (1, d) (d, 1)}
$$

Wtedy wektor predykcji $\mathbf{\hat{y}}$ można zdefiniować następująco:

$$
\mathbf{\hat{y}} = X \mathbf{w}
$$

Następnie należy ustalić funkcję straty.

$$
L = \frac{1}{2} \sum_{i=1}^{n} (\hat{y}_i - y_i)^2
$$

$$
L = \frac{1}{2}[\mathbf{\hat{y}} - \mathbf{y}]^\top [\mathbf{\hat{y}} - \mathbf{y}]
$$

$$
L = \frac{1}{2}[X \mathbf{w} - \mathbf{y}]^\top [X \mathbf{w} - \mathbf{y}] \\
{\tiny (1, 1) = (1, n) (n, 1)}
$$

Zarówno współczynnik $\frac{1}{2}$, jak i podnoszenie różnicy między predykcją a wartością docelową do kwadratu jest po to, żeby ułatwić liczenie pochodnej.

$$
\frac{\partial L}{\partial \mathbf{w}} = \frac{1}{2} \cdot 2 \cdot (\frac{\partial}{\partial \mathbf{w}}[X \mathbf{w} - \mathbf{y}])^\top [X \mathbf{w} - \mathbf{y}]
$$

$$
\frac{\partial L}{\partial \mathbf{w}} = X^\top [X \mathbf{w} - \mathbf{y}]
$$

$$
X^\top X \mathbf{w} - X^\top \mathbf{y} = 0
$$

$$
\mathbf{w} = (X^\top X)^{-1} X^\top \mathbf{y}
$$

Metoda gradientu prostego

$$
\Delta \mathbf{w} = - \eta \frac{\partial L}{\partial \mathbf{w}}
$$

$$
\Delta \mathbf{w} = - \eta X^\top [X \mathbf{w} - \mathbf{y}]
$$

$$
\Delta \mathbf{w} = - \eta X^\top [\mathbf{\hat{y}} - \mathbf{y}]
$$

Odejmuję wartość docelową od predykcji, ponieważ jeśli predykcja jest większa od wartości docelowej, to należy obniżyć wagę. Mogę równie dobrze odwrócić te wartości.

$$
\Delta \mathbf{w} = \eta X^\top [\mathbf{y} - \mathbf{\hat{y}}]
$$

Teraz jeśli predykcja jest większa, to wartość $\Delta$ jest już ujemna, więc nie potrzeba minusa na początku.

Zarówno odejmowanie gradientu od wag, jak i liczenie funkcji straty, a nie korzyści, jest powszechną konwencją w uczeniu maszynowym.

## Regularyzacja L2

$$
\|\mathbf{w}\|_2 = \sqrt{(w_1)^2 + (w_2)^2 + \ldots + (w_d)^2}
$$

$$
\|\mathbf{w}\|_2^2 = (w_1)^2 + (w_2)^2 + \ldots + (w_d)^2
$$

$$
\|\mathbf{w}\|_2^2 = \mathbf{w}^\top \mathbf{w}
$$

$$
L = \frac{1}{2}([X \mathbf{w} - \mathbf{y}]^\top [X \mathbf{w} - \mathbf{y}] + \lambda \mathbf{w}^\top \mathbf{w})
$$

$$
\frac{\partial L}{\partial \mathbf{w}} = \frac{1}{2}(2 \cdot [X^\top X \mathbf{w} - X^\top \mathbf{y}] + 2 \cdot \lambda \mathbf{w})
$$

$$
X^\top X \mathbf{w} - X^\top \mathbf{y} + \lambda \mathbf{w} = 0
$$

Żeby dodać współczynnik regularyzacji $\lambda$ do macierzy kwadratowej, korzystamy z macierzy jednostkowej $I$.

$$
(X^\top X + \lambda I) \mathbf{w} = X^\top \mathbf{y}
$$

$$
\mathbf{w} = (X^\top X + \lambda I)^{-1} X^\top \mathbf{y}
$$

Metoda gradientu prostego

$$
\Delta \mathbf{w} = - \eta \frac{\partial L}{\partial \mathbf{w}}
$$

$$
\Delta \mathbf{w} = - \eta (X^\top [\mathbf{\hat{y}} - \mathbf{y}] + \lambda \mathbf{w})
$$

## Regularyzacja L1

$$
\|\mathbf{w}\|_1 = |w_1|+ |w_2|+ \ldots + |w_d|
$$

$$
\Delta \mathbf{w} = - \eta (X^\top [\mathbf{\hat{y}} - \mathbf{y}] + \lambda\,\mathrm{sign}(\mathbf{w}))
$$

Ponieważ nie ma wygodnej pochodnej dla wartości absolutnej, to stosujemy jedynie metodę gradientu prostego.

## Cechy wielomianowe

$$
\mathbf{x} = [x_1, x_2, \ldots, x_d]
$$

Transformacja ta tworzy wektor wszystkich kombinacji jednomianów, tj. poniżej:

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

Każdy z tych jednomianów można również przedstawić następująco:

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
