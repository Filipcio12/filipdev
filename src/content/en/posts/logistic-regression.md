+++
title = 'Binary logistic regression'
date = 2026-04-04T23:03:40+02:00
+++

In this article, I introduce the sigmoid function and derive the formulas for two loss functions: Mean Squared Error (MSE) and Binary Cross-Entropy. This includes mapping raw linear scores into probabilities via the sigmoid function, followed by calculating the gradients of both loss functions with respect to the model weights.

<!--more-->

## Derivatives

Derivative of the natural logarithm:

$$
\frac{d}{dx} \ln(x) = \frac{1}{x}
$$

Derivative of the logarithm with base $a$:

$$
\frac{d}{dx} \log _a (x) = \frac{d}{dx} \left[\frac{\ln(x)}{\ln(a)}\right]
$$

$$
= \frac{d}{dx} \left[\frac{1}{\ln(a)} \ln(x)\right] = \frac{1}{x \ln(a)}
$$

Using a logarithm with a different base only introduces a constant coefficient $\frac{1}{\ln(a)}$ that can be combined with other coefficients; therefore, any logarithm works. In the literature, $\log$ often represents the natural logarithm, but here I will use $\ln$ for clarity.

Quotient rule:

$$
\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{\frac{df}{dx} g(x) - f(x)\frac{dg}{dx}}{g^2(x)}
$$

Derivative of $e^x$:

$$
\frac{d}{dx}(e^x) = e^x
$$

## Sigmoid

The sigmoid function takes raw values from linear regression and returns probabilities in the range $[0, 1]$. Its name comes from the shape of the function's graph, which resembles the letter "S".

$$
\sigma(z) = \frac{1}{1 + e^{-z}} = \frac{e^z}{e^z + 1}
$$

$$
\frac{d \sigma}{dz} = \frac{e^z(e^z + 1) - (e^z)^2}{(e^z + 1)^2}
$$

$$
= \frac{e^z}{e^z + 1} - \left[\frac{e^z}{e^z + 1}\right]^2 = \sigma - \sigma^2
$$

$$
= \sigma(1 - \sigma)
$$

## Logit

The logit function is defined as the mathematical inverse of the sigmoid (logistic) function. In machine learning literature, the term "logits" denotes the raw, unscaled linear predictions of a model before activation.

$$
\mathrm{logit}(p) = \ln \frac{p}{1 - p} 
$$

$$
= \ln(p) - \ln(1 - p)
$$

### Proof of inverse relationship

$$
\sigma(z) = p
$$

$$
p = \frac{1}{1 + e^{-z}}
$$

$$
e^{-z} = \frac{1}{p} - 1 = \frac{1 - p}{p}
$$

$$
z = \ln \frac{p}{1 - p}
$$

## Loss functions

$$
y \in \{0, 1\}
$$

$$
z = \mathbf{x} \mathbf{w}
$$

$$
p = \sigma(z)
$$

$y$ — label of sample $\mathbf{x}$

$z$ — logit of sample $\mathbf{x}$

$p$ — probability that sample $\mathbf{x}$ is of class $1$

$$
\mathbf{z} = [z_1, z_2, \ldots, z_n]^\top
$$

$$
\mathbf{p} = [p_1, p_2, \ldots, p_n]^\top
$$

$\mathbf{z}$ — vector of logits

$\mathbf{p}$ — vector of probabilities

I compute the derivative of the loss function for one sample.

### Squared error

$$
L = \frac{1}{2} (p - y)^2
$$

$$
\frac{\partial L}{\partial \mathbf{w}} = \frac{\partial L}{\partial p} \frac{\partial p}{\partial \mathbf{w}}
$$

Derivative of $p$ w.r.t. $\mathbf{w}$:

$$
\frac{\partial p}{\partial \mathbf{w}} = \frac{\partial \sigma}{\partial z} \frac{\partial z}{\mathbf{w}}
$$

$$
= \sigma(z)(1 - \sigma(z)) \frac{\partial}{\partial \mathbf{w}}(\mathbf{x} \mathbf{w})
$$

$$
= p(1 - p) \mathbf{x} \\
$$

Derivative of $L$ w.r.t. $p$:

$$
\frac{\partial L}{\partial p} = \frac{1}{2} \cdot 2 (p - y) \cdot 1
$$

$$
\frac{\partial L}{\partial p} = p - y
$$

Derivative of $L$ w.r.t. $\mathbf{w}$:

$$
\frac{\partial L}{\partial \mathbf{w}} = \frac{\partial L}{\partial p} \frac{\partial p}{\partial \mathbf{w}}
$$

$$
\frac{\partial L}{\partial \mathbf{w}} = (p - y) p (1 - p)\mathbf{x}
$$

Gradient descent:

$$
\Delta \mathbf{w} = - \eta \mathbf{x}^\top (p - y) p (1 - p)
$$

Matrix form (for the whole dataset):

$$
\Delta \mathbf{w} = -\eta X^\top (\mathbf{p} - \mathbf{y})\mathbf{p}^\top(1 - \mathbf{p}) \\
\tiny{{(d, 1) = (d, n)(n, 1)(1, n)(n, 1)}}
$$

### Binary cross-entropy

$$
L = -[y \ln(p) + (1 - y) \ln(1 - p)]
$$

$$
\frac{\partial L}{\partial \mathbf{w}} = \frac{\partial L}{\partial p} \frac{\partial p}{\partial \mathbf{w}}
$$

Derivative of $p$ w.r.t. $\mathbf{w}$:

$$
\frac{\partial p}{\partial \mathbf{w}} = p(1 - p) \mathbf{x} \\
$$

Derivative of $L$ w.r.t. $p$:

$$
\frac{\partial L}{\partial p} = -\left[\frac{y}{p} + \frac{y - 1}{1 - p}\right]
$$

Derivative of $L$ w.r.t. $\mathbf{w}$:

$$
\frac{\partial L}{\partial \mathbf{w}} = -\left[\frac{y}{p} + \frac{y - 1}{1 - p}\right] p(1 - p) \mathbf{x}
$$

$$
= -[y(1 - p)  + (y - 1) p] \mathbf{x}
$$

$$
= (p - y) \mathbf{x}
$$

Gradient descent:

$$
\Delta \mathbf{w} = -\eta \mathbf{x}^\top (p - y)
$$

Matrix form (for the whole dataset):

$$
\Delta \mathbf{w} = -\eta X^\top (\mathbf{p} - \mathbf{y}) \\
\tiny{(d, 1) = (d, n)(n, 1)}
$$