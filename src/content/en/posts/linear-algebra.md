+++
title = 'Linear Algebra Fundamentals'
date = 2026-04-12T12:33:16+02:00
+++

In this post, I present the fundamentals of linear algebra. This field of mathematics is essential for algorithms of artificial intelligence, 3D graphics and big data analysis. Not only do I discuss operations on vectors and matrices, but I also introduce an intuitive interpretation of these operations.

<!--more-->

## Vector

A vector can describe the position of a point in space or its displacement. In other words, we can think of it as a point or an arrow. If we add vector $\mathbf{b}$ to vector $\mathbf{a}$ it's as if we moved from point $\mathbf{a}$ along an arrow $\mathbf{b}$ to the new point $\mathbf{a} + \mathbf{b}$.

{{< figure src="vector.png" width="300px" >}}

Every vector can be reduced to a sum of unit vectors pointing along the axes of the coordinate system.

$$
\mathbf{v} = [x, y]
$$

$$
\mathbf{v} = x \cdot \bm{\hat{\imath}} + y \cdot \bm{\hat{\jmath}}
$$

where

$$
\bm{\hat{\imath}} = [1, 0] \quad \bm{\hat{\jmath}} = [0, 1]
$$

### Polar coordinates

The position of a point can also be described with the incline angle to the x-axis of the coordinate system.

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

## Dot product

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

This is how we can prove that both formulas are equivalent.

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

### Geometric interpretation

The dot product $\mathbf{a} \cdot \mathbf{b}$ is the product of the length of the orthogonal projection of $\mathbf{a}$ onto $\mathbf{b}$ and the length of $\mathbf{b}$. If the vectors point in opposite directions, their dot product is negative; if they are orthogonal, it is \(0\); and if they point in the same direction, it is maximal for fixed vector lengths. Because of this property, we could say that the dot product is a measure of similarity between vectors.

## Cross product

### Two-dimensional

$$
\mathbf{a} \times \mathbf{b} = \det\left(\begin{bmatrix}
a_1 & a_2  \\
b_1 & b_2
\end{bmatrix}\right)
$$

$$
= a_1 b_2 - a_2 b_1
$$

It is the signed (could be negative) area of the parallelogram spanned by these two vectors (depending on the orientation).

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

### Three-dimensional

$$
\mathbf{a} \times \mathbf{b} = \det\left(\begin{bmatrix}
\bm{\hat{\imath}} & \bm{\hat{\jmath}} & \bm{\hat{k}} \\
a_1 & a_2 & a_3 \\
b_1 & b_2 & b_3
\end{bmatrix}\right)
$$

We can compute the determinant of a $3 \times 3$ matrix using **Sarrus’ rule**. We copy the first two columns to the right of the matrix. We then add the products along the diagonals running from the top left to the bottom right and subtract the products along the diagonals running from the top right to the bottom left.

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

## Matrix multiplication

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

Two matrices can be multiplied if their dimensions are $(p, n)$ and $(n, m)$. The resulting matrix has dimensions $(p, m)$. In other words, the inner dimensions must be equal, and they are eliminated in the final product.

I use superscripts to denote rows and subscripts for columns.

## Determinant of a matrix

The determinant of a matrix is defined recursively and can only be computed for square matrices of size $(n, n)$. Geometrically, it is equivalent to the volume of the region spanned by the column (or row) vectors of the matrix. However, it can also be negative, in which case it represents a reversed orientation.

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

For larger matrices, along any row $i$ (for example, $i = 1$):

$$
\det(\mathbf{A}) = \sum_{j=1}^{n} (-1)^{i + j} a_{ij} \det(\mathbf{A}_{ij})
$$

$\mathbf{A}_{ij}$ — matrix obtained by removing row $i$ and column $j$ from the original matrix $\mathbf{A}$

$$
\det(\mathbf{A}) = \det(\mathbf{A}^\top)
$$

### Gaussian elimination

For a triangular matrix (one where all entries strictly above or below the main diagonal are $0$), the determinant is the product of the entries on the main diagonal.

$$
\det(\mathbf{A}) = \prod_{i=1}^{n} a_{ii}
$$

#### Elementary row operations:

Swapping two rows: 

$$R_i \leftrightarrow R_j \text{ } \det \leftarrow -\det $$

Scaling a row by $k$: 

$$R_i \leftarrow kR_i \text{ } \det \leftarrow k\det$$

Adding a multiple of one row to another: 

$$R_i \leftarrow R_i + kR_j \text{ } \det \leftarrow \det$$

#### Example

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

## Inverting a matrix

$$
\mathbf{A}^{-1}\mathbf{A} = \mathbf{A}\mathbf{A}^{-1} = \mathbf{I}
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

It's only possible to invert a square matrix $\mathbf{A}$ if $\det(\mathbf{A}) \ne 0$.

We apply the same elementary row operations to $\mathbf{A}$ and the identity matrix $\mathbf{I}$ until $\mathbf{A}$ is completely transformed into $\mathbf{I}$. At this point, $\mathbf{I}$ will have transformed into $\mathbf{A}^{-1}$.

$$
[\mathbf{A} | \mathbf{I}]
$$

$$
[\mathbf{I}|\mathbf{A}^{-1}]
$$

### Example

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

It is easy to imagine programming an algorithm to invert a matrix, which would require performing numerous floating-point operations. This is effectively the same procedure as solving a system of linear equations.

## Linear transformation

A matrix effectively describes a linear transformation. Each column of the matrix contains the new position of a unit vector along one of the axes of the coordinate system.

To rotate a vector about the y-axis by an angle $\theta$ in a three-dimensional space (that is, within the xz-plane), all we need to do is determine where the unit vectors $\bm{\hat{\imath}}$, $\bm{\hat{\jmath}}$ and $\bm{\hat{k}}$ will land after the transformation.

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

Now we write it down in a matrix.

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

From this, we obatin formulas for $x$, $y$ and $z$.

$$
x' = x\cos\theta - z\sin\theta
$$

$$
y' = y
$$

$$
z' = x\sin\theta + z\cos\theta
$$
