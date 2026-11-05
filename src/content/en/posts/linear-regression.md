+++
title = 'Linear regression'
date = 2026-04-04T11:47:43+02:00
+++

In this article, I provide the mathematical derivation of linear regression based on Mean Squared Error (MSE) minimization. I discuss both analytical and numerical solutions, as well as the impact of regularization on parameter estimation.

<!--more-->

## Derivatives

Power rule:

$$
\frac{d}{dx} x^r = r x^{r - 1}
$$

Chain rule:

$$
\frac{d}{dx} f(g(x)) = \frac{df}{dg} \frac{dg}{dx}
$$

### Example

$$
\frac{\partial}{\partial x} (ax + b)^2 = 2x(ax + b)
$$

## Samples, labels and weights

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

$X$ — sample matrix of size $(n, d)$

$n$ — number of samples

$d$ — number of features

$\mathbf{y}$ — vector of target values of size $(n, 1)$

For an unseen sample $\mathbf{x}$, we want to predict a target value $\hat{y}$ that best fits the rest of the data.

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

Prediction vector $\mathbf{\hat{y}}$ can be defined like so:

$$
\mathbf{\hat{y}} = X \mathbf{w}
$$

Next, we choose the loss function.

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

Both the factor of $\frac{1}{2}$ and the squaring of the difference between the prediction and the target value serve to simplify derivative calculations.

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

Gradient descent:

$$
\Delta \mathbf{w} = - \eta \frac{\partial L}{\partial \mathbf{w}}
$$

$$
\Delta \mathbf{w} = - \eta X^\top [X \mathbf{w} - \mathbf{y}]
$$

$$
\Delta \mathbf{w} = - \eta X^\top [\mathbf{\hat{y}} - \mathbf{y}]
$$

Subtracting the target value from the prediction means that when the prediction exceeds the target, the weight should be reduced. We could just as easily reverse the order of these terms.

$$
\Delta \mathbf{w} = \eta X^\top [\mathbf{y} - \mathbf{\hat{y}}]
$$

Now, if the prediction is larger than the target, $\Delta \mathbf{w}$ is inherently negative, eliminating the need for a leading minus sign.

Both subtracting the gradient from the weights and framing optimization around minimizing a loss function (rather than maximizing a utility function) are standard conventions in machine learning.

## L2 regularization

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

To add the regularization parameter $\lambda$ to a square matrix, we utilize the identity matrix $I$.

$$
(X^\top X + \lambda I) \mathbf{w} = X^\top \mathbf{y}
$$

$$
\mathbf{w} = (X^\top X + \lambda I)^{-1} X^\top \mathbf{y}
$$

Gradient descent:

$$
\Delta \mathbf{w} = - \eta \frac{\partial L}{\partial \mathbf{w}}
$$

$$
\Delta \mathbf{w} = - \eta (X^\top [\mathbf{\hat{y}} - \mathbf{y}] + \lambda \mathbf{w})
$$

## L1 regularization

$$
\|\mathbf{w}\|_1 = |w_1|+ |w_2|+ \ldots + |w_d|
$$

$$
\Delta \mathbf{w} = - \eta (X^\top [\mathbf{\hat{y}} - \mathbf{y}] + \lambda\,\mathrm{sign}(\mathbf{w}))
$$

Since there is no convenient derivative for the absolute value, we only use the gradient descent method.

## Polynomial features

$$
\mathbf{x} = [x_1, x_2, \ldots, x_d]
$$

This transformation yields a feature vector comprising all combinations of polynomial terms, as detailed below:

$$
(x_1)^{p_1} (x_2)^{p_2} \ldots (x_d)^{p_d}
$$

$$
p_1 + p_2 + \ldots + p_d \le p
$$

The number of such combinations can be presented as a "stars and bars" problem. As an example, let's solve the problem for 2 features and degree 3. For clarity, I will denote one feature as $a$ and the other as $b$.

$$
[1, a, b, a^2, ab, b^2, a^3, a^2 b, a b^2, b^3]
$$

Clearly, there are $10$ combinations.

Each of these polynomial terms can also be expressed as follows::

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

The problem can then be interpreted as: "In how many ways can $d$ bars be placed in $p + d$ spots?"

The number of such combinations is:

$$
\binom{p + d}{d}
$$

$$
\binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

For example, $d = 2$ and $p = 3$:

$$
\binom{3 + 2}{2} = \binom{5}{2}
$$

$$
\binom{5}{2}= \frac{120}{2 \cdot 6} = 10
$$
