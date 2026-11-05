+++
title = 'Maszyna wektorów nośnych (SVM)'
date = 2026-04-09T15:22:40+02:00
+++

Maszyna wektorów nośnych (SVM) to jeden z najbardziej popularnych i intuicyjnych algorytmów uczenia maszynowego. Jej celem jest rozdzielenie dwóch grup danych za pomocą hiperpłaszczyzny w taki sposób, aby zachować jak największy odstęp (margines) od najbliższych punktów — tzw. wektorów nośnych. 

<!--more-->

W tym artykule krok po kroku przedstawiam matematyczne wyprowadzenie tego modelu: od podstawowych relacji geometrycznych, przez metody optymalizacji Lagrange'a i problem dualny, aż po rozwiązywanie problemów nieseparowalnych liniowo dzięki funkcji jądra.

## Odległość punktu od płaszczyzny

![Point from plane](point_from_plane.png)

$$
\pi: ax + by + cz + d = 0
$$

$\pi$ — płaszczyzna

$p$ — punkt poza płaszczyzną

$p_0$ — punkt na płaszczyźnie

$$
\mathbf{u} = [a, b, c]
$$

$$
\mathbf{v} = \mathbf{p} - \mathbf{p}_0
$$

$\mathbf{u}$ — wektor normalny (prostopadły) do płaszczyzny $\pi$

$\mathbf{v}$ — wektor łączący punkty $p_0$ i $p$

$d$ — odległość $p_1$ od płaszczyzny $\pi$

Z definicji cosinusa:

$$
\cos \theta = \frac{d}{||\mathbf{v}||}
$$

$$
d = ||\mathbf{v}|| \cos \theta
$$

$||\mathbf{v}||$ — długość euklidesowa $\mathbf{v}$

Z definicji iloczynu skalarnego wektorów:

$$
\mathbf{u} \cdot \mathbf{v} = ||\mathbf{u}|| \cdot ||\mathbf{v}|| \cos \theta
$$

$$
d = \frac{|\mathbf{u} \cdot \mathbf{v}|}{||\mathbf{u}||}
$$

Odległość jest wartością nieujemną.

## SVM

$$
\pi: w_1 x_1 + w_2 x_2 + \ldots + w_d x_d = 0
$$

$$
\mathbf{x} \mathbf{w} = 0
$$

Chcemy znaleźć hiperpłaszczyznę, która będzie powierzchnią decyzyjną.

$$
y \in \{-1, 1\}
$$

\[
\hat{y}_i =
\begin{cases}
1 & \text{dla } \mathbf{x}_i \mathbf{w} \ge 0 \\
-1 & \text{dla } \mathbf{x}_i \mathbf{w} < 0
\end{cases}
\]

Wtedy odległość próbki $\mathbf{x}_i$ od przestrzeni decyzyjnej wynosi:

$$
\mathrm{dist}(\mathbf{x}_i) = \frac{|\mathbf{w} \cdot (\mathbf{x}_i - \mathbf{x}_0)|}{||\mathbf{w}||}
$$

Ponieważ $\mathbf{x}_0 \mathbf{w} = 0$, bo $x_0$ jest na hiperpłaszczyźnie $\pi$:

$$
\mathrm{dist}(\mathbf{x}_i) = \frac{|\mathbf{x}_i\mathbf{w}|}{||\mathbf{w}||}
$$

Możemy wykorzystać właściwość etykiety $y_i$:

$$
\mathrm{dist}(\mathbf{x}_i) = y_i \frac{\mathbf{x}_i\mathbf{w}}{||\mathbf{w}||}
$$

![Margin](margin.png)

Celem SVM-a jest stworzenie największego możliwie marginesu między powierzchnią decyzyjną a najbliższymi do niej próbkami.

$$
\mathbf{x}_+ \mathbf{w} = 1
$$

$\mathbf{x}_+$ — najbliższa próbka należąca do klasy $1$

$$
\mathrm{dist}(\mathbf{x}_+) = \frac{1}{||\mathbf{w}||}
$$

Widać, że odległość od $\mathbf{x}_-$ jest taka sama.

$$
\mathrm{margin} = \frac{2}{||\mathbf{w}||}
$$

Żeby zmaksymalizować margines, trzeba zminimalizować $||\mathbf{w}||$, co przekształcamy do $\frac{1}{2}||\mathbf{w}||^2$, żeby ułatwić liczenie pochodnej. To jest tzw. reprezentacja **prymalna**.

$$
\min \frac{1}{2}||\mathbf{w}||^2
$$

Tak można opisać warunek, że żadna próbka nie może znaleźć się w obrębie marginesu.

$$
y_i(\mathbf{x}_i \mathbf{w}) - 1 \ge 0
$$

### Metoda mnożników Lagrange'a

$$
L = f(\mathbf{x}) + \bm{\lambda}^\top g(\mathbf{x})
$$

$$
\lambda_i \ge 0
$$

To jest wciąż technicznie postać **prymalna**.

$$
\min_{\mathbf{x}} f(\mathbf{x})
$$

$$
g(\mathbf{x}) \le 0
$$

Jeżeli warunek $g(\mathbf{x}) \le 0$ jest spełniony, to wtedy drugi wyraz jest ujemny, czyli wartość funkcji Lagrange'a się zmniejsza, a chcemy zminimalizować wartość $f(\mathbf{x})$.

Następnie liczymy pochodną $L$ po $\mathbf{x}$. I znajdujemy wyrażenie $\mathbf{x}(\bm{\lambda})$, przyrównując pochodną do zera. Efektywnie znajdujemy dolny przedział dla minimum.

$$
L = f(\mathbf{x}(\bm{\lambda})) + \bm{\lambda}^\top g(\mathbf{x}(\bm{\lambda}))
$$

I to jest dopiero tzw. postać **dualna**. Znajdując maksimum dolnego przedziału dla minimum, znajdujemy minimum.

### Optymalizacja marginesu

$$
L = \frac{1}{2} \mathbf{w}^\top \mathbf{w} - \sum_{i=1}^{n} \lambda_i[y_i \mathbf{x}_i \mathbf{w} - 1]
$$

To jest postać **prymalna**, którą trzeba zminimalizować.

$$
\frac{\partial L}{\partial \mathbf{w}} = \mathbf{w} - \sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i = 0
$$

$$
\mathbf{w} = \sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i
$$

Teraz podstawiamy pod $\mathbf{w}$ we wzorze na $L$:

$$
L = \frac{1}{2} \left[\sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i\right] \left[\sum_{j=1}^{n} \lambda_j y_j \mathbf{x}_j \right]
$$

$$
-\left[\sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i\right] \left[\sum_{j=1}^{n} \lambda_j y_j \mathbf{x}_j \right] + \sum_{i=1}^{n} \lambda_i
$$

$$
= -\frac{1}{2} \left[\sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i\right] \left[\sum_{j=1}^{n} \lambda_j y_j \mathbf{x}_j \right]
$$

$$
+\sum_{i=1}^{n} \lambda_i
$$

$$
= \sum_{i=1}^{n} \lambda_i - \frac{1}{2} \sum_{i=1}^{n} \sum_{j=1}^{n} \lambda_i \lambda_j y_i y_j \mathbf{x}_i \mathbf{x}_j^\top
$$

To jest postać **dualna**, którą trzeba zmaksymalizować.

Następnie należy dokonać już faktycznej optymalizacji numerycznie. Można to zrobić na wiele sposobów. Zanim jednak to zrobimy warto zapisać funkcję nagrody macierzowo.

$$
Q_{i j} = y_i y_j \mathbf{x}_i \mathbf{x}_j^\top
$$

$$
Q = (\mathbf{y}\mathbf{y}^\top) \odot (XX^\top)
$$

$$
L = \sum_{i=1}^{n} \lambda_i - \frac{1}{2} \bm{\lambda}^\top Q \bm{\lambda} \\
\tiny{(1, 1) = (1, n)(n, n)(n, 1)}
$$

### Funkcje jądra

Funkcja jądra przyjmuje dwa wektory i jej wynik interpretowany jest jako ilościowe określenie podobieństwa tych wektorów. Pozwala na rozwiązywanie problemów, które nie są liniowo separowalne.

$$
Q = (\mathbf{y}\mathbf{y}^\top) \odot K
$$

Jądro liniowe:

$$
k(\mathbf{x}_i, \mathbf{x}_j) = \mathbf{x}_i \mathbf{x}_j^\top
$$

$$
K = X_1X_2^\top \\
\tiny{(n_1, n_2)(n_1, d)(d, n_2)}
$$

Jądro wielomianowe:

$$
k(\mathbf{x}_i, \mathbf{x}_j) = (\mathbf{x}_i \mathbf{x}_j^\top + 1)^m
$$

$$
J_{ij} = 1
$$

$$
K = (X_1X_2^\top + J)^{\odot m}
$$

Jądro gaussowskie:

$$
k(\mathbf{x}_i, \mathbf{x}_j) = \exp\left(-\frac{||\mathbf{x}_i - \mathbf{x}_j||^2}{2\sigma^2}\right)
$$

$$
K = \exp \left(-\frac{D}{2\sigma^2}\right)
$$

$$
D_{ij} = ||\mathbf{x}_i - \mathbf{x}_j||^2
$$

$$
= ||\mathbf{x}_i||^2 - 2 \mathbf{x}_i \mathbf{x}_j^\top + ||\mathbf{x}_j||^2
$$

Żeby przeprowadzić powyższą operację na macierzach, to trzeba skorzystać z poniższej sztuczki.

$$
\mathbf{r}_1 = \mathrm{diag}(X_1X_1^\top)
$$

$$
\mathbf{r}_2 = \mathrm{diag}(X_2X_2^\top)
$$

$$
\mathbf{r}_1 = [||\mathbf{x}^{(1)}_1||^2, ||\mathbf{x}^{(1)}_2||^2, \dots, ||\mathbf{x}^{(1)}_n||^2]^\top
$$

$$
\mathbf{r}_2 = [||\mathbf{x}^{(2)}_1||^2, ||\mathbf{x}^{(2)}_2||^2, \dots, ||\mathbf{x}^{(2)}_n||^2]^\top
$$

$$
D = \mathbf{r}_1 J_{1 \times n} - 2XX^\top + J_{n \times 1}\mathbf{r}_2^\top
$$

$\mathbf{r}_1 J_{1 \times n}$ to efektywnie broadcasting $\mathbf{r}_1$ po wierszach, czyli po $i$, natomiast $J_{n \times 1}\mathbf{r}_2^\top$ to broadcasting $\mathbf{r}_2$ po kolumnach, czyli po $j$.

#### Predykcja z funkcją jądra

Wtedy predykcja dla próbki testowej $\mathbf{x}_j$ wygląda następująco:

$$
\hat{y}_j = \mathrm{sign}\left(\sum_{i=1}^{n} \lambda_i y_i k(\mathbf{x}_i, \mathbf{x}_j)\right)
$$

Postać macierzowa:

$$
\hat{\mathbf{y}} = \mathrm{sign}(K(\bm{\lambda} \odot \mathbf{y}))
$$

### Miękki margines

Żeby móc rozwiązywać problemy nieseparowalne liniowo, pozwalamy na niepoprawną klasyfikację niektórych próbek. Dodajemy tzw. zmienne luzu do problemu prymalnego.

$$
\min \frac{1}{2}||\mathbf{w}||^2 + C \sum_{i=1}^{n} \xi_i
$$

$$
y_i(\mathbf{x}_i \mathbf{w}) \ge 1 - \xi_i
$$

$$
y_i(\mathbf{x}_i \mathbf{w}) - 1 + \xi_i \ge 0
$$

$$
\xi_i \ge 0
$$

Próbka $\mathbf{x}_i$ nie może znaleźć się w obrębie marginesu, ale z pewnym luzem $\xi_i$.

$\xi_i = 0$ — twardy margines

$0 < \xi_i < 1$ — poprawna klasyfikacja, ale w obrębie marginesu

$\xi_i = 1$ — próbka na powierzchni decyzyjnej

$\xi_i > 1$ — niepoprawna klasyfikacja

$C$ to hiperparametr, który określa jak bardzo model karze próbki, które są źle zaklasyfikowane. Im większy współczynnik $C$, tym model jest bardziej surowy.

$$
L = \frac{1}{2} \mathbf{w}^\top \mathbf{w} - \sum_{i=1}^{n} \lambda_i[y_i \mathbf{x}_i \mathbf{w} - 1 + \xi_i]
$$

$$
+C \sum_{i=1}^{n} \xi_i - \sum_{i=1}^{n} \mu_i \xi_i
$$

$$
\mu_i \ge 0
$$

$\mu_i$ to mnożnik Lagrange'a, dla zmiennej luzu $\xi_i$.

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
L = \frac{1}{2} \mathbf{w}^\top \mathbf{w} - \sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i \mathbf{w} + \sum_{i=1}^{n} \lambda_i
$$

$$
-\sum_{i=1}^{n} \lambda_i \xi_i + \sum_{i=1}^{n} C\xi_i - \sum_{i=1}^{n} \mu_i \xi_i
$$

$$
= \frac{1}{2} \mathbf{w}^\top \mathbf{w} - \sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i \mathbf{w} + \sum_{i=1}^{n} \lambda_i
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
1 & \text{dla } \mathbf{x}_i \text{ z klasy } k  \\
-1 & \text{dla } \mathbf{x}_i \text{ z poza klasy } k
\end{cases}
\]

$$
\hat{y}_i = \arg \max_{k \in \{1, \ldots, c\}} \mathbf{x}_i\mathbf{w}_k
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
1 & \text{dla } \mathbf{x}_i \text{ z klasy } k  \\
-1 & \text{dla } \mathbf{x}_i \text{ z klasy } l
\end{cases}
\]

\[
\hat{y}_i^{(k, l)} =
\begin{cases}
k & \text{dla } \mathbf{x}_i \mathbf{w} \ge 0   \\
l & \text{dla } \mathbf{x}_i \mathbf{w} < 0 
\end{cases}
\]

$$
\hat{y}_i = \arg \max_{k \in {1,\ldots,c}} V_k(\mathbf{x}_i)
$$

$V_k(\mathbf{x}_i)$ — liczba głosów, że $\mathbf{x}_i$ należy do klasy $k$

