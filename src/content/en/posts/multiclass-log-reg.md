+++
title = 'Multiclass logistic regression'
date = 2026-04-07T13:49:31+02:00
+++

In this article, I present the extension of logistic regression to multiclass problems. This approach involves transforming raw linear outputs (logits) into a normalized probability distribution using the softmax function, followed by evaluating the model's error using the cross-entropy loss function.

<!--more-->

## Softmax

The softmax function is a generalization of the sigmoid function to more than two classes; or conversely, the sigmoid function is simply a special case of softmax.

$$
\sigma(\mathbf{z})_i = \frac{e^{z_i}}{\sum_{j=1}^{c} e^{z_j}} = p_i
$$

$$
\sigma(\mathbf{z}) = \mathbf{p}
$$

Softmax takes a vector and returns a vector, but we index the output vector in the formula.

$$
\mathbf{z} = [z_1, z_2, \ldots, z_c]
$$

$$
\mathbf{p} = [p_1, p_2, \ldots, p_c]
$$

$\mathbf{z}$ — vector of $c$ logits

$\mathbf{p}$ — vector of $c$ probabilities

### Sigmoid is softmax for class $1$ and $c = 2$

Let $\mathbf{z} = [z_1, z_2]$:

$$
\sigma(\mathbf{z})_1 = \frac{e^{z_1}}{e^{z_1} + e^{z_2}}
$$

Divide top and bottom by $e^{z_1}$.

$$
\sigma(\mathbf{z})_1 = \frac{1}{1 + e^{z_2 - z_1}}
$$

Let $z = z_1 - z_2$:

$$
\sigma(\mathbf{z})_1 = \frac{1}{1 + e^{-z}}
$$

### Derivative

Softmax takes a vector and returns a vector and because of that its derivative is a Jacobian matrix.

$$
\frac{\partial \sigma}{\partial \mathbf{z}} = J
$$

$$
J = \begin{bmatrix}
\dfrac{\partial \sigma_1}{\partial z_1} 
& \dfrac{\partial \sigma_1}{\partial z_2} 
& \cdots 
& \dfrac{\partial \sigma_1}{\partial z_c} \\[8pt]
\dfrac{\partial \sigma_2}{\partial z_1}
& \dfrac{\partial \sigma_2}{\partial z_2}
& \cdots 
& \dfrac{\partial \sigma_2}{\partial z_c} \\[2pt]
\vdots  & \vdots  & \ddots & \vdots  \\[2pt]
\dfrac{\partial \sigma _c}{\partial z_1}
& \dfrac{\partial \sigma _c}{\partial z_2}
& \cdots 
& \dfrac{\partial \sigma _c}{\partial z_c}
\end{bmatrix}_{ij}
$$

Following derivative will be used later.

$$
\frac{\partial}{\partial z_j}\left[\sum_{k=1}^{c} e^{z_k}\right]
$$

$$
= \frac{\partial}{\partial z_j}(e^{z_1} + \ldots + e^{z_j} + \ldots + e^{z_c})
$$

$$
= e^{z_j}
$$

When $i = j$ (on the diagonal):

$$
\frac{\partial \sigma _i}{\partial z_i} = \frac{\partial}{\partial z_i}\left[\frac{e^{z_i}}{ \sum_{k=1}^{c} e^{z_k}}\right]
$$

$$
= \frac{e^{z_i} \sum_{k=1}^{c} e^{z_k} - (e^{z_i})^2}{(\sum_{k=1}^{c} e^{z_k})^2}
$$

$$
= \frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}} - \left[\frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}}\right]^2
$$

$$
= \sigma_i - \sigma^2_i
$$

$$
= \sigma_i(1 - \sigma_i)
$$

A clear similiarity to sigmoid.

When $i \ne j$ (not on the diagonal):

$$
\frac{\partial \sigma _i}{\partial z_j} = e^{z_i} \frac{\partial}{\partial z_j}\left[\frac{1}{\sum_{k=1}^{c} e^{z_k}}\right]
$$

$$
= -\frac{e^{z_i} e^{z_j}}{(\sum_{k=1}^{c} e^{z_k})^2} 
$$

$$
= -\frac{e^{z_i}}{\sum_{k=1}^{c} e^{z_k}} \frac{e^{z_j}}{\sum_{k=1}^{c} e^{z_k}} 
$$

$$
= -\sigma_i \sigma_j
$$

The Jacobian matrix looks like this:

$$J = \left[\begin{smallmatrix}
\sigma_1(1 - \sigma_1) & -\sigma_1 \sigma_2 & \cdots & -\sigma_1 \sigma_c \\
-\sigma_2 \sigma_1 & \sigma_2(1 - \sigma_2) & \cdots & -\sigma_2 \sigma_c \\
\vdots & \vdots & \ddots & \vdots \\
-\sigma _c \sigma_1 & -\sigma _c \sigma_2 & \cdots & \sigma _c(1 - \sigma _c)
\end{smallmatrix}\right]$$

### Kronecker's delta

\[
\delta_{ij} =
\begin{cases}
1 & \text{for } i = j \\
0 & \text{for } i \ne j
\end{cases}
\]

Kronecker's delta is a function which can be used to simplify complicated formulas.

\[
\frac{\partial \sigma _i}{\partial z_j} =
\begin{cases}
\sigma_i(1 - \sigma_i) & \text{for } i = j \\
-\sigma_i \sigma_j & \text{for } i \ne j
\end{cases}
\]

$$
= \delta_{ij}(\sigma_i(1 - \sigma_i)) + (1 - \delta_{ij})(-\sigma_i \sigma_j)
$$

$$
= \delta_{ij}\sigma_i - \delta_{ij}\sigma^2_i - \sigma_i \sigma_j + \delta_{ij}\sigma_i \sigma_j
$$

Terms with $\delta_{ij}$ are only present when $i = j$.

$$
= \delta_{ij}\sigma_i - \delta_{ij}\sigma^2_i - \sigma_i \sigma_j + \delta_{ij}\sigma^2_i
$$

$$
\frac{\partial \sigma _i}{\partial z_j} = \sigma_i (\delta_{ij} - \sigma_j)
$$

## Multiclass cross-entropy

To use logistic regression for multiple classes, we need to create a set of weights for each class separately.

$$
W = \begin{bmatrix}
w_{1 1} & w_{1 2} & \cdots & w_{1 c} \\
w_{2 1} & w_{2 2} & \cdots & w_{2 c} \\
\vdots  & \vdots  & \ddots & \vdots  \\
w_{d 1} & w_{d 2} & \cdots & w_{d c}
\end{bmatrix}
$$

$W$ — weight matrix of size $(d, c)$

$d$ — number of features (inputs)

$c$ — number of classes (outputs)

$$
Y = \begin{bmatrix}
y_{1 1} & y_{1 2} & \cdots & y_{1 c} \\
y_{2 1} & y_{2 2} & \cdots & y_{2 c} \\
\vdots  & \vdots  & \ddots & \vdots  \\
y_{n 1} & y_{n 2} & \cdots & y_{n c}
\end{bmatrix}
$$

$Y$ — matrix of one-hot encoded labels of size $(n, c)$

$n$ — number of samples

$$
\mathbf{y} = [0, 0, \ldots, 1, \ldots, 0]
$$

$$
\mathbf{z} = \mathbf{x} W
$$

$$
p_i = \sigma(\mathbf{z})_i
$$

$\mathbf{y}$ — one-hot label for sample $\mathbf{x}$

$\mathbf{z}$ — logit vector for sample $\mathbf{x}$

$p_i$ — probability that sample $\mathbf{x}$ is of class $i$

I calculate the derivative of loss for one sample first.

$$
L = \sum_{i=1}^{c} L_i
$$

$$
L_i = -y_i \ln(p_i)
$$

$$
\frac{\partial L_i}{\partial \mathbf{w}_j} = \frac{\partial L_i}{\partial p_i} \frac{\partial p_i}{\partial z_j} \frac{\partial z_j}{\partial \mathbf{w}_j}
$$

Derivative of $z_j$ w.r.t. $\mathbf{w}_j$:

$$
\frac{\partial z_j}{\partial \mathbf{w}_j} = \frac{\partial}{\partial \mathbf{w}_j}(\mathbf{x} \mathbf{w}_j) = \mathbf{x}
$$

Derivative of $p_i$ w.r.t. $z_j$:

$$
\frac{\partial p_i}{\partial z_j} = p_i (\delta_{ij} - p_j)
$$

Derivative of $L_i$ w.r.t. $p_i$:

$$
\frac{\partial L_i}{\partial p_i} = - \frac{y_i}{p_i}
$$

Derivative of $L_i$ w.r.t. $\mathbf{w}_j$:

$$
\frac{\partial L_i}{\partial \mathbf{w}_j} = \frac{\partial L_i}{\partial p_i} \frac{\partial p_i}{\partial z_j} \frac{\partial z_j}{\partial \mathbf{w}_j}
$$

$$
= - \frac{y_i}{p_i} (p_i (\delta_{ij} - p_j)) \mathbf{x}
$$

$$
= (p_j y_i - y_j \delta_{ij}) \mathbf{x}
$$

Derivative of $L$ w.r.t. $\mathbf{w}_j$:

$$
\frac{\partial L}{\partial \mathbf{w}_j} = \sum_{i=1}^{c} (p_j y_i - y_j \delta_{ij}) \mathbf{x}
$$

$$
= \left[p_j \sum_{i=1}^{c} y_i - y_j \sum_{i=1}^{c} \delta_{ij} \right] \mathbf{x}
$$

$$
= (p_j - y_j) \mathbf{x}
$$

Since $\mathbf{y}$ is one-hot encoded, the sum of its components equals $1$. On the other hand, $\delta_{ij}$ equals $1$ only when $i = j$, otherwise it's $0$, so that sum must also equal $1$.

Gradient descent:

$$
\Delta \mathbf{w}_j = - \eta \mathbf{x}^{\top} (p_j - y_j)
$$

Matrix form (for the whole dataset):

$$
\Delta W = -\eta X^\top (P - Y) \\
\tiny{(d, c) = (d, n)(n, c)}
$$