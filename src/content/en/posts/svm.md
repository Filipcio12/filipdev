+++
title = 'Support vector machine (SVM)'
date = 2026-04-09T15:22:40+02:00
+++

A Support Vector Machine (SVM) is one of the most popular and intuitive machine learning algorithms. Its goal is to separate two data classes using a hyperplane in a way that maximizes the distance (margin) from the nearest points—the so-called support vectors.

<!--more-->

In this article, I present a step-by-step mathematical derivation of this model: from basic geometric relationships, through Lagrange optimization methods and the dual problem, to solving linearly non-separable problems using kernel functions.

## Distance from a point to a plane

![Point from plane](point_from_plane.png)

$$
\pi: ax + by + cz + d = 0
$$

$\pi$ — plane

$p$ — point outside the plane

$p_0$ — point on the plane

$$
\mathbf{u} = [a, b, c]
$$

$$
\mathbf{v} = \mathbf{p} - \mathbf{p}_0
$$

$\mathbf{u}$ — normal (perpendicular) vector to plane $\pi$

$\mathbf{v}$ — vector connecting points $p_0$ and $p$

$d$ — distance of $p_1$ from plane $\pi$

By the definition of cosine:

$$
\cos \theta = \frac{d}{||\mathbf{v}||}
$$

$$
d = ||\mathbf{v}|| \cos \theta
$$

$||\mathbf{v}||$ — Euclidean length of $\mathbf{v}$

By the definition of the dot product:

$$
\mathbf{u} \cdot \mathbf{v} = ||\mathbf{u}|| \cdot ||\mathbf{v}|| \cos \theta
$$

$$
d = \frac{|\mathbf{u} \cdot \mathbf{v}|}{||\mathbf{u}||}
$$

Distance is non-negative.

## SVM

$$
\pi: w_1 x_1 + w_2 x_2 + \ldots + w_d x_d = 0
$$

$$
\mathbf{x} \mathbf{w} = 0
$$

Our goal is to find a hyperplane that acts as a decision boundary.

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

The distance of sample $\mathbf{x}_i$ from the decision space is:

$$
\mathrm{dist}(\mathbf{x}_i) = \frac{|\mathbf{w} \cdot (\mathbf{x}_i - \mathbf{x}_0)|}{||\mathbf{w}||}
$$

Since $\mathbf{x}_0$ lies on the hyperplane $\pi$, we have $\mathbf{x}_0 \mathbf{w} = 0$:

$$
\mathrm{dist}(\mathbf{x}_i) = \frac{|\mathbf{x}_i\mathbf{w}|}{||\mathbf{w}||}
$$

We use the property of the label $y_i$:

$$
\mathrm{dist}(\mathbf{x}_i) = y_i \frac{\mathbf{x}_i\mathbf{w}}{||\mathbf{w}||}
$$

![Margin](margin.png)

The goal of an SVM is to create the largest possible margin between the decision boundary and the samples closest to it (support vectors).

$$
\mathbf{x}_+ \mathbf{w} = 1
$$

$\mathbf{x}_+$ — the nearest sample of class $1$

$$
\mathrm{dist}(\mathbf{x}_+) = \frac{1}{||\mathbf{w}||}
$$

Widać, że odległość od $\mathbf{x}_-$ jest taka sama.

$$
\mathrm{margin} = \frac{2}{||\mathbf{w}||}
$$

Maximizing the margin is equivalent to minimizing $||\mathbf{w}||$, which we reframe as $\frac{1}{2}||\mathbf{w}||^2$ to make differentiation easier. This gives the so-called **primal** representation.

$$
\min \frac{1}{2}||\mathbf{w}||^2
$$

No sample may fall within the margin.

$$
y_i(\mathbf{x}_i \mathbf{w}) - 1 \ge 0
$$

### Lagrange multipliers

$$
L = f(\mathbf{x}) + \bm{\lambda}^\top g(\mathbf{x})
$$

$$
\lambda_i \ge 0
$$

This is still **primal** representation.

$$
\min_{\mathbf{x}} f(\mathbf{x})
$$

$$
g(\mathbf{x}) \le 0
$$

If the constraint $g(\mathbf{x}) \le 0$ is satisfied, the second term is non-positive, which decreases the value of the Lagrangian function—aligning with our goal to minimize $f(\mathbf{x})$.

Next, we take the derivative of $L$ with respect to $\mathbf{x}$ and set it to zero to express $\mathbf{x}$ in terms of $\bm{\lambda}$, written as $\mathbf{x}(\bm{\lambda})$. Effectively, this establishes a lower bound on the minimum.

$$
L = f(\mathbf{x}(\bm{\lambda})) + \bm{\lambda}^\top g(\mathbf{x}(\bm{\lambda}))
$$

This yields the so-called **dual** formulation. By finding the maximum of this lower bound, we recover the minimum of the primal problem.

### Margin optimization

$$
L = \frac{1}{2} \mathbf{w}^\top \mathbf{w} - \sum_{i=1}^{n} \lambda_i[y_i \mathbf{x}_i \mathbf{w} - 1]
$$

This is the **primal** formulation to minimize.

$$
\frac{\partial L}{\partial \mathbf{w}} = \mathbf{w} - \sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i = 0
$$

$$
\mathbf{w} = \sum_{i=1}^{n} \lambda_i y_i \mathbf{x}_i
$$

Now we substitute $\mathbf{w}$ in the formula for $L$:

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

This is the **dual** formulation to maximize.

The final optimization is done numerically and can be achieved in several ways. Before that, it is worth rewriting the objective function in matrix form.

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

### Kernel functions

A kernel function takes two vectors as input and returns a scalar value that represents their similarity. By mapping data into a higher-dimensional feature space, kernels enable SVMs to solve linearly non-separable problems.

$$
Q = (\mathbf{y}\mathbf{y}^\top) \odot K
$$

Linear kernel:

$$
k(\mathbf{x}_i, \mathbf{x}_j) = \mathbf{x}_i \mathbf{x}_j^\top
$$

$$
K = X_1X_2^\top \\
\tiny{(n_1, n_2)(n_1, d)(d, n_2)}
$$

Polynomial kernel:

$$
k(\mathbf{x}_i, \mathbf{x}_j) = (\mathbf{x}_i \mathbf{x}_j^\top + 1)^m
$$

$$
J_{ij} = 1
$$

$$
K = (X_1X_2^\top + J)^{\odot m}
$$

Gaussian kernel (radial basis function kernel):

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

To perform the operation above in matrix form, we can use the following vectorization trick:

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

Here, $\mathbf{r}_1 J_{1 \times n}$ effectively broadcasts $\mathbf{r}_1$ across rows (i.e., along index $i$), whereas $J_{n \times 1} \mathbf{r}_2^\top$ broadcasts $\mathbf{r}_2$ across columns (i.e., along index $j$).

#### Prediction with a kernel function

Then, the prediction for a test sample $\mathbf{x}_j$ is as follows:

$$
\hat{y}_j = \mathrm{sign}\left(\sum_{i=1}^{n} \lambda_i y_i k(\mathbf{x}_i, \mathbf{x}_j)\right)
$$

Matrix form:

$$
\hat{\mathbf{y}} = \mathrm{sign}(K(\bm{\lambda} \odot \mathbf{y}))
$$

### Soft margin

To solve linearly non-separable tasks, we permit some degree of classification error. We achieve this by adding slack variables to the primal formulation.

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

The sample $\mathbf{x}_i$ is not allowed inside the margin, subject to a slack tolerance of $\xi_i$

$\xi_i = 0$ — hard margin

$0 < \xi_i < 1$ — correct classification, within the margin

$\xi_i = 1$ — sample on the decision boundary

$\xi_i > 1$ — incorrect classification

$C$ is a hyperparameter that specifies how much the model penalizes misclassified samples. The larger the coefficient $C$, the stricter the model is.

$$
L = \frac{1}{2} \mathbf{w}^\top \mathbf{w} - \sum_{i=1}^{n} \lambda_i[y_i \mathbf{x}_i \mathbf{w} - 1 + \xi_i]
$$

$$
+C \sum_{i=1}^{n} \xi_i - \sum_{i=1}^{n} \mu_i \xi_i
$$

$$
\mu_i \ge 0
$$

$\mu_i$ is a Lagrange multiplier for the slack variable $\xi_i$.

$$
\frac{\partial L}{\partial \xi_k} = -\lambda_k + C - \mu_k = 0
$$

$$
\mu_k = C - \lambda_k \ge 0
$$

$$
\lambda_k \le C
$$

Substituting $\mu_i = C - \lambda_i$ into the Lagrangian causes the slack terms to cancel out. First, we carry out a simple rearrangement.

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

Since $-\lambda_i + C - \mu_i = 0$, the slack variables cancel out, leaving only the following condition:

$$
0 \le \lambda_i \le C
$$

## Multiclass classification

### One vs Rest

\[
y_i^{(k)} =
\begin{cases}
1 & \text{for } \mathbf{x}_i \text{ of class } k  \\
-1 & \text{for } \mathbf{x}_i \text{ not of class } k
\end{cases}
\]

$$
\hat{y}_i = \arg \max_{k \in \{1, \ldots, c\}} \mathbf{x}_i\mathbf{w}_k
$$

We train $c$ classifiers, one for each class $k$.

### One vs One

We train a classifier for each pair of classes.

$$
\text{number of classifiers} = \frac{1}{2}c(c-1)
$$

\[
y_i^{(k, l)} =
\begin{cases}
1 & \text{for } \mathbf{x}_i \text{ of class } k  \\
-1 & \text{for } \mathbf{x}_i \text{ of class } l
\end{cases}
\]

\[
\hat{y}_i^{(k, l)} =
\begin{cases}
k & \text{for } \mathbf{x}_i \mathbf{w} \ge 0   \\
l & \text{for } \mathbf{x}_i \mathbf{w} < 0 
\end{cases}
\]

$$
\hat{y}_i = \arg \max_{k \in {1,\ldots,c}} V_k(\mathbf{x}_i)
$$

$V_k(\mathbf{x}_i)$ — number of votest that $\mathbf{x}_i$ is of class $k$

