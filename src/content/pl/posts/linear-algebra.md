+++
title = 'Podstawy algebry liniowej'
date = 2026-04-12T12:33:16+02:00
+++

W tym wpisie przedstawiam podstawy algebry liniowej.

<!--more-->

## Wektor

Wektor opisuje położenie punktu w przestrzeni albo przesunięcie punktu w przestrzeni. Jeżeli do wektora $\underline{a}$ dodamy wektor $\underline{b}$, to jakbyśmy się przesuneli z punktu $a$ o wektor $\underline{b}$ do punktu $a +\underline{b}$.

{{< figure src="vector.png" width="300px" >}}

Każdy wektor można opisać jako sumę wektorów jednostkowych zgodnych z osiami układu współrzędnych.

$$
v = [x, y]
$$

$$
v = x \hat{\imath} + y \hat{\jmath}
$$

### Współrzędne biegunowe

Położenie punktu można również opisać za pomocą kąta nachylenia do jednej z osi układu współrzędnych.

$$
\underline{v} = [x, y]
$$

$$
\cos \theta = \frac{x}{||\underline{v}||}
$$

$$
x = ||\underline{v}|| \cos \theta
$$

$$
y = ||\underline{v}|| \sin \theta
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
\underline{a} \cdot \underline{b} = a_1 b_1 + a_2 b_2
$$

$$
= ||\underline{a}|| \cdot ||\underline{b}|| \cos \theta
$$

Tak można udowodnić, że obie postacie są równoważne:

$$
a_1 b_1 + a_2 b_2
$$

$$
= ||\underline{a}|| \cos \alpha ||\underline{b}|| \cos \beta 
$$

$$
+||\underline{a}|| \sin \alpha ||\underline{b}|| \sin \beta
$$

$$
= ||\underline{a}|| \cdot ||\underline{b}|| (\cos \alpha \cos \beta + \sin \alpha \sin \beta)
$$

$$
||\underline{a}|| \cdot ||\underline{b}|| \cos(\alpha - \beta)
$$

$$
= ||\underline{a}|| \cdot ||\underline{b}|| \cos \theta
$$

### Interpretacja geometryczna

Iloczyn skalarny $\underline{a} \cdot \underline{b}$ jest iloczynem długości rzutu prostokątnego wektora $\underline{a}$ na wektor $\underline{b}$ oraz długości wektora $\underline{b}$. Jeżeli wektory celują w przeciwnych kierunkach to wtedy iloczyn jest ujemny, jeżeli są prostopadłe to wynosi $0$, a jeśli celują w tym samym kierunku, to iloczyn jest największy. Można powiedzieć, że iloczyn skalarny jest miarą podobieństwa wektorów.

## Iloczyn wektorowy

### Dwuwymiarowy

$$
\underline{a} \times \underline{b} = \det\left(\begin{bmatrix}
a_1 & a_2  \\
b_1 & b_2
\end{bmatrix}\right)
$$

$$
= a_1 b_2 - a_2 b_1
$$

Jest to pole powierzchni równoległoboku wyznaczonego przez te dwa wektory (z uwzględnioną orientacją).

$$
= ||\underline{a}|| \cos \alpha ||\underline{b}|| \sin \beta 
$$

$$
-||\underline{a}|| \sin \alpha ||\underline{b}|| \cos \beta 
$$

$$
= ||\underline{a}|| \cdot ||\underline{b}|| (\cos \alpha \sin \beta - \sin \alpha \cos \beta)
$$

$$
= ||\underline{a}|| \cdot ||\underline{b}|| \sin (\beta - \alpha)
$$

$$
= - ||\underline{a}|| \cdot ||\underline{b}|| \sin \theta
$$

### Trójwymiarowy

$$
\underline{a} \times \underline{b} = \det\left(\begin{bmatrix}
\hat{\imath} & \hat{\jmath} & \hat{k} \\
a_1 & a_2 & a_3 \\
b_1 & b_2 & b_3
\end{bmatrix}\right)
$$

Używając **reguły Sarrusa** (sztuczka na liczenie wyznacznika macierzy $3 \times 3$) rozszerzamy macierz o pierwsze dwie kolumny. Przekątne od lewej do prawej są dodatnie, natomiast od prawej do lewej — ujemne.

$$
\begin{bmatrix}
\hat{\imath} & \hat{\jmath} & \hat{k} & \hat{\imath} & \hat{\jmath} \\
a_1 & a_2 & a_3 & a_1 & a_2 \\
b_1 & b_2 & b_3 & b_1 & b_2 
\end{bmatrix}
$$

$$
= \hat{\imath} a_2 b_3 + \hat{\jmath} a_3 b_1 + \hat{k} a_1 b_2
$$

$$
-\hat{k} a_2 b_1 - \hat{\jmath} a_1 b_3 - \hat{\imath} a_3 b_2
$$

$$
+(a_2 b_3 - a_3 b_2) \hat{\imath} 
$$

$$
+(a_3 b_1 - a_1 b_3) \hat{\jmath} 
$$

$$
+(a_1 b_2 - a_2 b_1) \hat{k}
$$

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

$$
c_{i j} = \underline{a}_{i:} \cdot \underline{b}_{:j}
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

Dla większych macierzy dla dowolnego wiersza $i$ (na przykłąd $1$):

$$
\det(A) = \sum_{j=1}^{n} (-1)^{i + j} a_{ij} \det(A_{ij})
$$

$A_{ij}$ — macierz powstała przez usunięcie wiersza $i$ oraz kolumny $j$ z oryginalnej macierzy $A$

$$
\det(A) = \det(A^\top)
$$

### Metoda eliminacji Gaussa

Dla macierzy trójkątnej, czyli takiej że wartości pod przekątną równe są $0$, wyznacznik jest iloczynem wartości na przekątnej.

$$
\det(A) = \prod_{i=1}^{n} a_{ii}
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
A^{-1}A = AA^{-1} = I
$$

$$
I_n = \begin{bmatrix}
1 & 0 & 0 & \cdots & 0 \\
0 & 1 & 0 & \cdots & 0 \\
0 & 0 & 1 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots  \\
0 & 0 & 0 & \cdots & 1 \\
\end{bmatrix}
$$

Można odwrócić tylko macierz kwadratową $A$, dla której $\det(A) \ne 0$.

Stosujemy takie same elementarne operacje na wierszach na macierzy $A$ oraz na odpowiadającej macierzy $I$, aż do momentu kompletnej transformacji $A$ w $I$, wtedy oryginalna macierz $I$ przetransformuje się w $A^{-1}$.

$$
[A | I]
$$

$$
[I|A^{-1}]
$$

### Przykład

$$
A = \begin{bmatrix} 
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
A^{-1} = \begin{bmatrix}
-\frac{1}{21} & -\frac{2}{21} & \frac{11}{21} \\
\frac{8}{21} & -\frac{5}{21} & -\frac{4}{21} \\
\frac{2}{21} & \frac{4}{21} & -\frac{1}{21}
\end{bmatrix}
$$

Można sobie wyobrazić jak zaprogramować taki algorytm odwracania macierzy i że będzie dużo operacji na liczbach zmiennoprzecinkowych. Jest to w sumie efektywnie ta sama procedura jak przy rozwiązywaniu układu równań liniowych.

## Przekształcenie liniowe

Macierz efektywnie opisuje przekształcenie liniowe. Każda kolumna macierzy zawiera nową pozycję dla kolejnego wektora jednostkowego zgodnego z jedną z osi układu współrzędnych.

Jeżeli mamy przestrzeń trójwymiarową i chcemy obrócić wektor wokół osi $y$, czyli w ramach płaszczyzny $xz$ o jakiś kąt $\theta$, to wystarczy rozpatrzeć, gdzie będzie wskazywał wektor jednostkowy $\hat{\imath}$, $\hat{\jmath}$ i $\hat{k}$ po tym przekształceniu.

{{< figure src="rotation.png" width="400px" >}}

$$
\hat{\imath} = [\cos \theta, 0, \sin \theta]
$$

$$
\hat{\jmath} = [0, 1, 0]
$$

$$
\hat{k} = [-\cos(90\degree - \theta), 0, \sin(90\degree - \theta)]
$$

$$
= [-\sin \theta, 0, \cos \theta]
$$

Teraz zapisujemy to w macierzy:

$$
R_y(\theta, \underline{v}) = \begin{bmatrix}
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
