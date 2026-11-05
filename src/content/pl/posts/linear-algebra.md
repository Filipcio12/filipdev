+++
title = 'Podstawy algebry liniowej'
date = 2026-04-12T12:33:16+02:00
+++

W tym wpisie przedstawiam podstawy algebry liniowej. Jest to fundament dla algorytmów sztucznej inteligencji, grafiki 3D oraz analizy wielkich zbiorów danych. Omawiam operacje na wektorach i macierzach, a także prezentuję intuicyjną interpretację tych działań.

<!--more-->

## Wektor

Wektor opisuje położenie punktu w przestrzeni albo jego przesunięcie. Innymi słowy można myśleć o wektorze jak o punkcie lub strzałce. Jeżeli do wektora $\mathbf{a}$ dodamy wektor $\mathbf{b}$, to jest tak jakbyśmy się przesunęli z punktu $\mathbf{a}$ wzdłuż strzałki $\mathbf{b}$ do nowego punktu $\mathbf{a} +\mathbf{b}$.

{{< figure src="vector.png" width="300px" >}}

Każdy wektor można opisać jako sumę wektorów jednostkowych zgodnych z osiami układu współrzędnych.

$$
\mathbf{v} = [x, y]
$$

$$
\mathbf{v} = x \cdot \bm{\hat{\imath}} + y \cdot \bm{\hat{\jmath}}
$$

gdzie

$$
\bm{\hat{\imath}} = [1, 0] \quad \bm{\hat{\jmath}} = [0, 1]
$$

### Współrzędne biegunowe

Położenie punktu można również opisać za pomocą kąta nachylenia do jednej z osi układu współrzędnych.

$$
\mathbf{v} = [x, y]
$$

$$
\cos \theta = \frac{x}{||\mathbf{v}||}
$$

$$
x = ||\mathbf{v}|| \cos \theta
$$

$$
y = ||\mathbf{v}|| \sin \theta
$$

## Iloczyn skalarny

{{< figure src="dot_product.png" width="400px" >}}

$$
\alpha = \theta + \beta
$$

$$
\theta = \alpha - \beta
$$

$$
\mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2
$$

$$
= ||\mathbf{a}|| \cdot ||\mathbf{b}|| \cos \theta
$$

Tak można udowodnić, że obie postacie są równoważne:

$$
a_1 b_1 + a_2 b_2
$$

$$
= ||\mathbf{a}|| \cos \alpha ||\mathbf{b}|| \cos \beta 
$$

$$
+||\mathbf{a}|| \sin \alpha ||\mathbf{b}|| \sin \beta
$$

$$
= ||\mathbf{a}|| \cdot ||\mathbf{b}|| (\cos \alpha \cos \beta + \sin \alpha \sin \beta)
$$

$$
||\mathbf{a}|| \cdot ||\mathbf{b}|| \cos(\alpha - \beta)
$$

$$
= ||\mathbf{a}|| \cdot ||\mathbf{b}|| \cos \theta
$$

### Interpretacja geometryczna

Iloczyn skalarny $\mathbf{a} \cdot \mathbf{b}$ jest iloczynem długości rzutu prostokątnego wektora $\mathbf{a}$ na wektor $\mathbf{b}$ oraz długości wektora $\mathbf{b}$. Jeżeli wektory celują w przeciwnych kierunkach to wtedy iloczyn jest ujemny, jeżeli są prostopadłe to wynosi $0$, a jeśli celują w tym samym kierunku, to iloczyn jest największy. Można powiedzieć, że iloczyn skalarny jest miarą podobieństwa wektorów.

## Iloczyn wektorowy

### Dwuwymiarowy

$$
\mathbf{a} \times \mathbf{b} = \det\left(\begin{bmatrix}
a_1 & a_2  \\
b_1 & b_2
\end{bmatrix}\right)
$$

$$
= a_1 b_2 - a_2 b_1
$$

Jest to pole powierzchni równoległoboku wyznaczonego przez te dwa wektory (z uwzględnioną orientacją).

$$
= ||\mathbf{a}|| \cos \alpha ||\mathbf{b}|| \sin \beta 
$$

$$
-||\mathbf{a}|| \sin \alpha ||\mathbf{b}|| \cos \beta 
$$

$$
= ||\mathbf{a}|| \cdot ||\mathbf{b}|| (\cos \alpha \sin \beta - \sin \alpha \cos \beta)
$$

$$
= ||\mathbf{a}|| \cdot ||\mathbf{b}|| \sin (\beta - \alpha)
$$

$$
= - ||\mathbf{a}|| \cdot ||\mathbf{b}|| \sin \theta
$$

### Trójwymiarowy

$$
\mathbf{a} \times \mathbf{b} = \det\left(\begin{bmatrix}
\bm{\hat{\imath}} & \bm{\hat{\jmath}} & \bm{\hat{k}} \\
a_1 & a_2 & a_3 \\
b_1 & b_2 & b_3
\end{bmatrix}\right)
$$

Używając **reguły Sarrusa** (sztuczka na liczenie wyznacznika macierzy $3 \times 3$) rozszerzamy macierz o pierwsze dwie kolumny. Przekątne od lewej do prawej są dodatnie, natomiast od prawej do lewej — ujemne.

$$
\begin{bmatrix} 
\bm{\hat{\imath}} & \bm{\hat{\jmath}} & \bm{\hat{k}} & \bm{\hat{\imath}} & \bm{\hat{\jmath}} \\ 
a_1 & a_2 & a_3 & a_1 & a_2 \\ 
b_1 & b_2 & b_3 & b_1 & b_2 
\end{bmatrix}
$$

$$
= a_2 b_3 \bm{\hat{\imath}} + a_3 b_1 \bm{\hat{\jmath}} + a_1 b_2 \bm{\hat{k}}
$$

$$
-a_3 b_2 \bm{\hat{\imath}} - a_1 b_3 \bm{\hat{\jmath}} - a_2 b_1 \bm{\hat{k}}
$$

$$
= (a_2 b_3 - a_3 b_2)\bm{\hat{\imath}}
$$

$$
+(a_3 b_1 - a_1 b_3)\bm{\hat{\jmath}}
$$

$$
+(a_1 b_2 - a_2 b_1)\bm{\hat{k}}
$$

## Mnożenie macierzy

$$
\mathbf{A} = \begin{bmatrix}
a_{1 1} & a_{1 2} & \cdots & a_{1 n} \\
a_{2 1} & a_{2 2} & \cdots & a_{2 n} \\
\vdots  & \vdots  & \ddots & \vdots  \\
a_{p 1} & a_{p 2} & \cdots & a_{p n}
\end{bmatrix}
$$

$$
\mathbf{B} = \begin{bmatrix}
b_{1 1} & b_{1 2} & \cdots & b_{1 m} \\
b_{2 1} & b_{2 2} & \cdots & b_{2 m} \\
\vdots  & \vdots  & \ddots & \vdots  \\
b_{n 1} & b_{n 2} & \cdots & b_{n m}
\end{bmatrix}
$$

$$
\mathbf{C} = \mathbf{AB} = \begin{bmatrix}
c_{1 1} & c_{1 2} & \cdots & c_{1 m} \\
c_{2 1} & c_{2 2} & \cdots & c_{2 m} \\
\vdots  & \vdots  & \ddots & \vdots  \\
c_{p 1} & c_{p 2} & \cdots & c_{p m}
\end{bmatrix}
$$

$$
c_{i j} = a_{i 1} b_{1 j} + a_{i 2} b_{2 j} + \ldots + a_{i n} b_{n j}
$$

$$
c_{i j} = \mathbf{a}_{i:} \cdot \mathbf{b}_{:j}
$$

Macierze można mnożyć jeśli są o wymiarach $(p, n) (n, m)$. Wtedy wynik ma wymiary $(p, m)$. Czyli środkowe wymiary muszą być równe i w wyniku się zjadają.

Za pomocą indeksu górnego numeruję wiersze a dolnego — kolumny.

## Wyznacznik macierzy

Wyznacznik macierzy jest zdefiniowany rekurencyjne. Można obliczyć go tylko dla kwadratowych macierzy $(n, n)$ i geometrycznie jest równy wymiarowi hiperprzestrzeni nakreślonej przez wektory kolumnowe (lub wierszowe) tej macierzy. Przy czym może być ujemny i wtedy oznacza odwróconą orientację.

$$
\det\left(\begin{bmatrix}
a_1
\end{bmatrix}\right) = a_1
$$

$$
\det\left(\begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix}\right) = a_{11} a_{22} - a_{12} a_{21}
$$

Dla większych macierzy dla dowolnego wiersza $i$ (na przykład $1$):

$$
\det(\mathbf{A}) = \sum_{j=1}^{n} (-1)^{i + j} a_{ij} \det(\mathbf{A}_{ij})
$$

$\mathbf{A}_{ij}$ — macierz powstała przez usunięcie wiersza $i$ oraz kolumny $j$ z oryginalnej macierzy $\mathbf{A}$

$$
\det(\mathbf{A}) = \det(\mathbf{A}^\top)
$$

### Metoda eliminacji Gaussa

Dla macierzy trójkątnej, czyli takiej że wartości pod przekątną równe są $0$, wyznacznik jest iloczynem wartości na przekątnej.

$$
\det(\mathbf{A}) = \prod_{i=1}^{n} a_{ii}
$$

#### Elementarne operacje na wierszach:

Zamiana pozycji dwóch wierszy: 

$$R_i \leftrightarrow R_j \text{ } \det \leftarrow -\det $$

Przeskalowanie wiersza przez $k$: 

$$R_i \leftarrow kR_i \text{ } \det \leftarrow k\det$$

Dodanie wielokrotności jednego wiersza do drugiego: 

$$R_i \leftarrow R_i + kR_j \text{ } \det \leftarrow \det$$

#### Przykład

$$
\det \left(\begin{bmatrix} 
1 & 2 & 3 \\
0 & -1 & 4 \\
2 & 0 & 1
\end{bmatrix}\right)
$$

$$
R_3 \leftarrow R_3 - 2R_1
$$

$$
= \det \left(\begin{bmatrix} 
1 & 2 & 3 \\
0 & -1 & 4 \\
0 & -4 & -5
\end{bmatrix}\right)
$$

$$
R_3 \leftarrow R_3 - 4R_2
$$

$$
= \det \left(\begin{bmatrix} 
1 & 2 & 3 \\
0 & -1 & 4 \\
0 & 0 & -21
\end{bmatrix}\right)
$$

$$
= 1(-1)(-21) = 21
$$

## Odwracanie macierzy

$$
\mathbf{A}^{-1}\mathbf{A} = \mathbf{AA}^{-1} = \mathbf{I}
$$

$$
\mathbf{I}_n = \begin{bmatrix}
1 & 0 & 0 & \cdots & 0 \\
0 & 1 & 0 & \cdots & 0 \\
0 & 0 & 1 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots  \\
0 & 0 & 0 & \cdots & 1 \\
\end{bmatrix}
$$

Można odwrócić tylko macierz kwadratową $\mathbf{A}$, dla której $\det(\mathbf{A}) \ne 0$.

Stosujemy takie same elementarne operacje na wierszach na macierzy $\mathbf{A}$ oraz na odpowiadającej macierzy $\mathbf{I}$, aż do momentu kompletnej transformacji $\mathbf{A}$ w $\mathbf{I}$, wtedy oryginalna macierz $\mathbf{I}$ przetransformuje się w $\mathbf{A}^{-1}$.

$$
[\mathbf{A} | \mathbf{I}]
$$

$$
[\mathbf{I}|\mathbf{A}^{-1}]
$$

### Przykład

$$
\mathbf{A} = \begin{bmatrix} 
1 & 2 & 3 \\
0 & -1 & 4 \\
2 & 0 & 1
\end{bmatrix}
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 2 & 3 & 1 & 0 & 0 \\
0 & -1 & 4 & 0 & 1 & 0 \\
2 & 0 & 1 & 0 & 0 & 1
\end{array}
\right]
$$

$$
R_3 \leftarrow R_3 - 2R_1
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 2 & 3 & 1 & 0 & 0 \\
0 & -1 & 4 & 0 & 1 & 0 \\
0 & -4 & -5 & -2 & 0 & 1
\end{array}
\right]
$$

$$
R_3 \leftarrow R_3 - 4R_2
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 2 & 3 & 1 & 0 & 0 \\
0 & -1 & 4 & 0 & 1 & 0 \\
0 & 0 & -21 & -2 & -4 & 1
\end{array}
\right]
$$

$$
R_2 \leftarrow R_2 + \frac{4}{21}R_3
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 2 & 3 & 1 & 0 & 0 \\
0 & -1 & 0 & -\frac{8}{21} & \frac{5}{21} & \frac{4}{21} \\
0 & 0 & -21 & -2 & -4 & 1
\end{array}
\right]
$$

$$
R_1 \leftarrow R_1 + \frac{3}{21}R_3
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 2 & 0 & \frac{15}{21} & \frac{-12}{21} & \frac{3}{21} \\
0 & -1 & 0 & -\frac{8}{21} & \frac{5}{21} & \frac{4}{21} \\
0 & 0 & -21 & -2 & -4 & 1
\end{array}
\right]
$$

$$
R_1 \leftarrow R_1 + 2R_2
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 0 & 0 & -\frac{1}{21} & -\frac{2}{21} & \frac{11}{21} \\
0 & -1 & 0 & -\frac{8}{21} & \frac{5}{21} & \frac{4}{21} \\
0 & 0 & -21 & -2 & -4 & 1
\end{array}
\right]
$$

$$
R_2 \leftarrow -R_2
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 0 & 0 & -\frac{1}{21} & -\frac{2}{21} & \frac{11}{21} \\
0 & 1 & 0 & \frac{8}{21} & -\frac{5}{21} & -\frac{4}{21} \\
0 & 0 & -21 & -2 & -4 & 1
\end{array}
\right]
$$

$$
R_3 \leftarrow -\frac{1}{21}R_3
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 0 & 0 & -\frac{1}{21} & -\frac{2}{21} & \frac{11}{21} \\
0 & 1 & 0 & \frac{8}{21} & -\frac{5}{21} & -\frac{4}{21} \\
0 & 0 & 1 & \frac{2}{21} & \frac{4}{21} & -\frac{1}{21}
\end{array}
\right]
$$

$$
\mathbf{A}^{-1} = \begin{bmatrix}
-\frac{1}{21} & -\frac{2}{21} & \frac{11}{21} \\
\frac{8}{21} & -\frac{5}{21} & -\frac{4}{21} \\
\frac{2}{21} & \frac{4}{21} & -\frac{1}{21}
\end{bmatrix}
$$

Można sobie wyobrazić jak zaprogramować taki algorytm odwracania macierzy i że będzie dużo operacji na liczbach zmiennoprzecinkowych. Jest to w sumie efektywnie ta sama procedura jak przy rozwiązywaniu układu równań liniowych.

## Przekształcenie liniowe

Macierz efektywnie opisuje przekształcenie liniowe. Każda kolumna macierzy zawiera nową pozycję dla kolejnego wektora jednostkowego zgodnego z jedną z osi układu współrzędnych.

Jeżeli mamy przestrzeń trójwymiarową i chcemy obrócić wektor wokół osi $y$, czyli w ramach płaszczyzny $xz$ o jakiś kąt $\theta$, to wystarczy rozpatrzeć, gdzie będzie wskazywał wektor jednostkowy $\bm{\hat{\imath}}$, $\bm{\hat{\jmath}}$ i $\bm{\hat{k}}$ po tym przekształceniu.

{{< figure src="rotation.png" width="400px" >}}

$$
\bm{\hat{\imath}} = [\cos \theta, 0, \sin \theta]
$$

$$
\bm{\hat{\jmath}} = [0, 1, 0]
$$

$$
\bm{\hat{k}} = [-\cos(90\degree - \theta), 0, \sin(90\degree - \theta)]
$$

$$
= [-\sin \theta, 0, \cos \theta]
$$

Teraz zapisujemy to w macierzy:

$$
R_y(\theta, \mathbf{v}) = \begin{bmatrix}
\cos \theta & 0 & -\sin \theta \\
0 & 1 & 0 \\
\sin \theta & 0 & \cos \theta
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
z
\end{bmatrix}
$$

$$
= x \begin{bmatrix}
\cos \theta \\
0 \\
\sin \theta
\end{bmatrix} + y \begin{bmatrix}
0 \\
1 \\
0
\end{bmatrix} + z \begin{bmatrix}
-\sin \theta \\
0 \\
\cos \theta
\end{bmatrix}
$$

$$
= \begin{bmatrix}
x\cos\theta - z\sin\theta \\
y \\
x\sin\theta + z\cos\theta
\end{bmatrix}
$$

Z tego możemy wyciągnąć osobne wzory na $x$, $y$ i $z$.

$$
x' = x\cos\theta - z\sin\theta
$$

$$
y' = y
$$

$$
z' = x\sin\theta + z\cos\theta
$$
