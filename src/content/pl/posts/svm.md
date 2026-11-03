+++
title = 'Maszyna wektorów nośnych (SVM)'
date = 2026-04-09T15:22:40+02:00
+++

Prezentuję tutaj moje wyprowadzenie wzorów związanych z maszyną wektorów nośnych.

<!--more-->

## Odległość punktu od płaszczyzny

![Point from plane](point_from_plane.png)

$$
\pi: ax + by + cz + d = 0
$$

$\pi$ — płaszczyzna

$p$ — punkt poza płaszczyzną

$p_0$ — punkt na płaszczyźnie

$$
\underline{u} = [a, b, c]
$$

$$
\underline{v} = \underline{p} - \underline{p_0}
$$

$\underline{u}$ — wektor normalny (prostopadły) do płaszczyzny $\pi$

$\underline{v}$ — wektor łączący punkty $p_0$ i $p$

$d$ — odległość $p_1$ od płaszczyzny $\pi$

Z definicji cosinusa:

$$
\cos \theta = \frac{d}{||\underline{v}||}
$$

$$
d = ||\underline{v}|| \cos \theta
$$

$||\underline{v}||$ — długość euklidesowa $\underline{v}$

Z definicji iloczynu skalarnego wektorów:

$$
\underline{u} \cdot \underline{v} = ||\underline{u}|| \cdot ||\underline{v}|| \cos \theta
$$

$$
d = \frac{|\underline{u} \cdot \underline{v}|}{||\underline{u}||}
$$

Odległość jest wartością nieujemną.

## SVM

$$
\pi: w_1 x_1 + w_2 x_2 + \ldots + w_d x_d = 0
$$

$$
\underline{x} \underline{w} = 0
$$

Chcemy znaleźć hiperpłaszczyznę, która będzie powierzchnią decyzyjną.

$$
y \in \{-1, 1\}
$$

\[
\hat{y}_i =
\begin{cases}
1 & \text{dla } \underline{x}_i \underline{w} \ge 0 \\
-1 & \text{dla } \underline{x}_i \underline{w} < 0
\end{cases}
\]

Wtedy odległość próbki $\underline{x}_i$ od przestrzeni decyzyjnej wynosi:

$$
\mathrm{dist}(\underline{x}_i) = \frac{|\underline{w} \cdot (\underline{x}_i - \underline{x}_0)|}{||\underline{w}||}
$$

Ponieważ $\underline{x}_0 \underline{w} = 0$, bo $x_0$ jest na hiperpłaszczyźnie $\pi$:

$$
\mathrm{dist}(\underline{x}_i) = \frac{|\underline{x}_i\underline{w}|}{||\underline{w}||}
$$

Możemy wykorzystać właściwość etykiety $y$:

$$
\mathrm{dist}(\underline{x}_i) = y_i \frac{\underline{x}_i\underline{w}}{||\underline{w}||}
$$

![Margin](margin.png)

Celem SVM-a jest stworzenie największego możliwie marginesu między powierzchnią decyzyjną a najbliższymi do niej próbkami.

$$
\underline{x}_+ \underline{w} = 1
$$

$\underline{x}_+$ — najbliższa próbka należąca do klasy $1$

$$
\mathrm{dist}(\underline{x}_+) = \frac{1}{||\underline{w}||}
$$

Widać, że odległość od $\underline{x}_-$ jest taka sama.

$$
\mathrm{margin} = \frac{2}{||\underline{w}||}
$$

Żeby zmaksymalizować margines, trzeba zminimalizować $||w||$, co przekształcamy do $\frac{1}{2}||w||^2$, żeby ułatwić liczenie pochodnej. To jest tzw. reprezentacja **prymalna**.

$$
\min \frac{1}{2}||w||^2
$$

Tak można opisać warunek, że żadna próbka nie może znaleźć się w obrębie marginesu.

$$
y_i(\underline{x}_i \underline{w}) - 1 \ge 0
$$

### Metoda mnożników Lagrange'a

$$
L = f(\underline{x}) + \underline{\lambda}^\top g(\underline{x})
$$

$$
\lambda_i \ge 0
$$

To jest wciąż technicznie postać **prymalna**.

$$
\min_{\underline{x}} f(\underline{x})
$$

$$
g(\underline{x}) \le 0
$$

Jeżeli warunek $g(\underline{x}) \le 0$ jest spełniony, to wtedy drugi wyraz jest ujemny, czyli wartość funkcji Lagrange'a się zmniejsza, a chcemy zminimalizować wartość $f(\underline{x})$.

Następnie liczymy pochodną $L$ po $\underline{x}$. I znajdujemy wyrażenie $\underline{x}(\underline{\lambda})$, przyrównując pochodną do zera. Efektywnie znajdujemy dolny przedział dla minimum.

$$
L = f(\underline{x}(\underline{\lambda})) + \underline{\lambda}^\top g(\underline{x}(\underline{\lambda}))
$$

I to jest dopiero tzw. postać **dualna**. Znajdując maksimum dolnego przedziału dla minimum, znajdujemy minimum.

### Optymalizacja marginesu

$$
L = \frac{1}{2} \underline{w}^\top \underline{w} - \sum_{i=1}^{n} \lambda_i[y_i \underline{x}_i \underline{w} - 1]
$$

To jest postać **prymalna**, którą trzeba zminimalizować.

$$
\frac{\partial L}{\partial \underline{w}} = \underline{w} - \sum_{i=1}^{n} \lambda_i y_i \underline{x}_i = 0
$$

$$
\underline{w} = \sum_{i=1}^{n} \lambda_i y_i \underline{x}_i
$$

Teraz podstawiamy pod $\underline{w}$ we wzorze na $L$:

$$
L = \frac{1}{2} \left[\sum_{i=1}^{n} \lambda_i y_i \underline{x}_i\right] \left[\sum_{j=1}^{n} \lambda_j y_j \underline{x}_j \right]
$$

$$
-\left[\sum_{i=1}^{n} \lambda_i y_i \underline{x}_i\right] \left[\sum_{j=1}^{n} \lambda_j y_j \underline{x}_j \right] + \sum_{i=1}^{n} \lambda_i
$$

$$
= -\frac{1}{2} \left[\sum_{i=1}^{n} \lambda_i y_i \underline{x}_i\right] \left[\sum_{j=1}^{n} \lambda_j y_j \underline{x}_j \right]
$$

$$
+\sum_{i=1}^{n} \lambda_i
$$

$$
= \sum_{i=1}^{n} \lambda_i - \frac{1}{2} \sum_{i=1}^{n} \sum_{j=1}^{n} \lambda_i \lambda_j y_i y_j \underline{x}_i \underline{x}_j^\top
$$

To jest postać **dualna**, którą trzeba zmaksymalizować.

Następnie należy dokonać już faktycznej optymalizacji numerycznie. Można to zrobić na wiele sposobów. Zanim jednak to zrobimy warto zapisać funkcję nagrody macierzowo.

$$
Q_{i j} = y_i y_j \underline{x}_i \underline{x}_j^\top
$$

$$
Q = (\underline{y}\underline{y}^\top) \odot (XX^\top)
$$

$$
L = \sum_{i=1}^{n} \lambda_i - \frac{1}{2} \underline{\lambda}^\top Q \underline{\lambda} \\
\tiny{(1, 1) = (1, n)(n, n)(n, 1)}
$$

### Funkcje jądra

Funkcja jądra przyjmuje dwa wektory i jej wynik interpretowany jest jako ilościowe określenie podobieństwa tych wektorów. Pozwala na rozwiązywanie problemów, które nie są liniowo separowalne.

$$
Q = (\underline{y}\underline{y}^\top) \odot K
$$

Jądro liniowe:

$$
k(\underline{x}_i, \underline{x}_j) = \underline{x}_i \underline{x}_j^\top
$$

$$
K = X_1X_2^\top \\
\tiny{(n_1, n_2)(n_1, d)(d, n_2)}
$$

Jądro wielomianowe:

$$
k(\underline{x}_i, \underline{x}_j) = (\underline{x}_i \underline{x}_j^\top + 1)^m
$$

$$
J_{ij} = 1
$$

$$
K = (X_1X_2^\top + J)^{\odot m}
$$

Jądro gaussowskie:

$$
k(\underline{x}_i, \underline{x}_j) = \exp\left(-\frac{||\underline{x}_i - \underline{x}_j||^2}{2\sigma^2}\right)
$$

$$
K = \exp \left(-\frac{D}{2\sigma^2}\right)
$$

$$
D_{ij} = ||\underline{x}_i - \underline{x}_j||^2
$$

$$
= ||\underline{x}_i||^2 - 2 \underline{x}_i \underline{x}_j^\top + ||\underline{x}_j||^2
$$

Żeby przeprowadzić powyższą operację na macierzach, to trzeba skorzystać z poniższej sztuczki.

$$
\underline{r}_1 = \mathrm{diag}(X_1X_1^\top)
$$

$$
\underline{r}_2 = \mathrm{diag}(X_2X_2^\top)
$$

$$
\underline{r}_1 = [||\underline{x}^{(1)}_1||^2, ||\underline{x}^{(1)}_2||^2, \dots, ||\underline{x}^{(1)}_n||^2]^\top
$$

$$
\underline{r}_2 = [||\underline{x}^{(2)}_1||^2, ||\underline{x}^{(2)}_2||^2, \dots, ||\underline{x}^{(2)}_n||^2]^\top
$$

$$
D = \underline{r}_1 J_{1 \times n} - 2XX^\top + J_{n \times 1}\underline{r}_2^\top
$$

$\underline{r}_1 J_{1 \times n}$ to efektywnie broadcasting $\underline{r}_1$ po wierszach, czyli po $i$, natomiast $J_{n \times 1}\underline{r}_2^\top$ to broadcasting $\underline{r}_2$ po kolumnach, czyli po $j$.

#### Predykcja z funkcją jądra

Wtedy predykcja dla próbki testowej $\underline{x}_j$ wygląda następująco:

$$
\hat{y}_j = \mathrm{sign}\left(\sum_{i=1}^{n} \lambda_i y_i k(\underline{x}_i, \underline{x}_j)\right)
$$

Postać macierzowa:

$$
\hat{\underline{y}} = \mathrm{sign}(K(\underline{\lambda} \odot \underline{y}))
$$

### Miękki margines

Żeby móc rozwiązywać problemy nieseparowalne liniowo, pozwalamy na niepoprawną klasyfikację niektórych próbek. Dodajemy tzw. zmienne luzu do problemu prymalnego.

$$
\min \frac{1}{2}||w||^2 + C \sum_{i=1}^{n} \xi_i
$$

$$
y_i(\underline{x}_i \underline{w}) \ge 1 - \xi_i
$$

$$
y_i(\underline{x}_i \underline{w}) - 1 + \xi_i \ge 0
$$

$$
\xi_i \ge 0
$$

Próbka $\underline{x}_i$ nie może znaleźć się w obrębie marginesu, ale z pewnym luzem $\xi_i$.

$\xi_i = 0$ — twardy margines

$0 < \xi_i < 1$ — poprawna klasyfikacja, ale w obrębie marginesu

$\xi_i = 1$ — próbka na powierzchni decyzyjnej

$\xi_i > 1$ — niepoprawna klasyfikacja

$C$ to hiperparametr, który określa jak bardzo model karze próbki, które są źle zaklasyfikowane. Im większy współczynnik $C$, tym model jest bardziej surowy.

$$
L = \frac{1}{2} \underline{w}^\top \underline{w} - \sum_{i=1}^{n} \lambda_i[y_i \underline{x}_i \underline{w} - 1 + \xi_i]
$$

$$
+C \sum_{i=1}^{n} \xi_i - \sum_{i=1}^{n} \mu_i \xi_i
$$

$$
\mu_i \ge 0
$$

$\mu_i$, to mnożnik Lagrange'a, dla zmiennej luzu $\xi_i$.

$$
\frac{\partial L}{\partial \xi_k} = -\lambda_k + C - \mu_k = 0
$$

$$
\mu_k = C - \lambda_k \ge 0
$$

$$
\lambda_k \le C
$$

Jeżeli wstawimy $\mu_i = C - \lambda_i$ do funkcji Lagrange'a, to zmienne luzu powinny się skrócić. Najpierw wykonajmy małe przekształcenie.

$$
L = \frac{1}{2} \underline{w}^\top \underline{w} - \sum_{i=1}^{n} \lambda_i y_i \underline{x}_i \underline{w} + \sum_{i=1}^{n} \lambda_i
$$

$$
-\sum_{i=1}^{n} \lambda_i \xi_i + \sum_{i=1}^{n} C\xi_i - \sum_{i=1}^{n} \mu_i \xi_i
$$

$$
= \frac{1}{2} \underline{w}^\top \underline{w} - \sum_{i=1}^{n} \lambda_i y_i \underline{x}_i \underline{w} + \sum_{i=1}^{n} \lambda_i
$$

$$
+\sum_{i=1}^{n} \xi_i(-\lambda_i + C - \mu_i)
$$

Ponieważ $-\lambda_i + C - \mu_i = 0$, to zmienne luzu się skracają i pozostaje jedynie poniższy warunek.

$$
0 \le \lambda_i \le C
$$

## Klasyfikacja wieloklasowa

### One vs Rest

\[
y_i^{(k)} =
\begin{cases}
1 & \text{dla } \underline{x}_i \text{ z klasy } k  \\
-1 & \text{dla } \underline{x}_i \text{ z poza klasy } k
\end{cases}
\]

$$
\hat{y}_i = \arg \max_{k \in \{1, \ldots, c\}} \underline{x}_i\underline{w}_k
$$

Trenujemy $c$ klasyfikatorów, jeden na każdą klasę $k$.

### One vs One

Trenujemy klasyfikator dla każdej pary klas.

$$
\text{liczba klasyfikatorów} = \frac{1}{2}c(c-1)
$$

\[
y_i^{(k, l)} =
\begin{cases}
1 & \text{dla } \underline{x}_i \text{ z klasy } k  \\
-1 & \text{dla } \underline{x}_i \text{ z klasy } l
\end{cases}
\]

\[
\hat{y}_i^{(k, l)} =
\begin{cases}
k & \text{dla } \underline{x}_i \underline{w} \ge 0   \\
l & \text{dla } \underline{x}_i \underline{w} < 0 
\end{cases}
\]

$$
\hat{y}_i = \arg \max_{k \in {1,\ldots,c}} V_k(\underline{x}_i)
$$

$V_k(\underline{x}_i)$ — liczba głosów, że $\underline{x}_i$ należy do klasy $k$

