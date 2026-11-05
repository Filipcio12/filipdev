+++
title = 'Derivation of the formula for normal distribution'
date = 2026-05-11T22:08:41+02:00
+++

The normal distribution is fundamental to the classical theory of probability and mathematical statistics. Its key role stems directly from the Central Limit Theorem, according to which the sum of many independent random variables with arbitrary distributions converges toward a normal distribution.

<!--more-->

In this article, I present a complete derivation of the formula for the normal distribution from first principles.

## Derivatives

Chain rule:

$$
\frac{d}{dx} f(g(x)) = \frac{df}{dg} \frac{dg}{dx}
$$

Product rule:

$$
\frac{d}{dx}(fg) = \frac{df}{dx}g + f\frac{dg}{dx}
$$

## Arithmetic mean

The arithmetic mean has been used since ancient times to estimate expected values, even without a formal justification for doing so. Post hoc, the arithmetic mean can be defined as the value that minimizes the squared prediction error.

Example: $\mathbf{x} = [-5,\, 5,\, 3,\, 4,\, 2,\, -3]$

![Arithmetic mean](arithmetic_mean.png)

If we subtract the mean value from all the points, then $\mu = 0$ and the data is centered on the x-axis.

The formula for arithmetic mean can be derived like so.

$$
L(\mu) = \sum_{i=1}^{n}(x_i - \mu)^2
$$

$$
\frac{\partial L}{\partial \mu} = 0
$$

Chain rule:

$$
-2\sum_{i=1}^{n} (x_i - \mu) = 0
$$

$$
\sum_{i=1}^{n} x_i = \sum_{i=1}^{n} \mu
$$

From definition of multiplication:

$$
\sum_{i=1}^{n} x_i = n \mu
$$

$$
\mu = \frac{1}{n} \sum_{i=1}^{n} x_i
$$

## Variance

Variance measures how far a random variable's values spread out from their expected value. According to Wikipedia:

$$
\mathrm{Var}[X] = E[(X - \mu)^2]
$$

$X$ — random variable

$E$ — function which returns the expected value

$\mu$ — expected value of $X$

If the expected value is the arithmetic mean, then variance is the mean squared error of a model that returns the arithmetic mean.

$$
\mathrm{Var}[X] = \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2
$$

## Normal distribution

If samples depend on many different factors, the probability distribution of these samples will converge toward the normal distribution. This is proven by the Central Limit Theorem. This is why the normal distribution is so common in the real world.

### Gaussian function

![Gaussian function](gaussian_function.png)

$$
f(x) = e^{-x^2}
$$

In fact, any exponential function whose exponent is non-positive will take on the characteristic shape of a Gaussian bell. Mathematicians have a habit of replacing every base of an exponential function with the number $e$.

$$
b^x = e^{\ln (b) x} = e^{cx}
$$

The general form of the Gaussian function looks like this.

$$
f(x) = a \cdot e^{-c(x - b)^2}
$$

Here, $a$ scales the height of the curve, $c$ controls its steepness, and $b$ determines the position of the peak. Note that the Gaussian curve is symmetric with respect to its peak and rapidly approaches zero.

#### Why is Gaussian curve in normal distribution?

I am going to provide a more formal explanation, but personally, just knowing that raising nearly any number to a non-positive power produces this shape is completely satisfying to me.

Here are the assumptions:

1. The phenomenon depends on a number of independent factors (e.g. $x$ and $y$)
2. The probability distribution is symmetric.
3. The more extreme the values, the lower the probability.

Suppose we randomly select points in the $xy$-plane and draw vectors to them from the origin. Let $p(r)$ be the probability density function of the vector length $r$.

$$
r = \sqrt{x^2 + y^2}
$$

Polar coordinates:

$$
x = r \cos \theta
$$

$$
y = r \sin \theta
$$

It is worth noting that under the assumptions of rotational symmetry and statistical independence of the components, the two-dimensional probability density of selecting a vector $(x, y)$ is proportional to the product of the probability densities along the coordinate axes: $f(x, y) \propto f(x, 0) \cdot f(0, y)$.

$$
p(r) \propto p(x) p(y)
$$

To put an equals sign, I just come up with some constant $\alpha$.
$$
\alpha p(r) = p(x) p(y)
$$

We compute the derivative w.r.t. $\theta$ on both sides.

$$
0 = \frac{\partial p(x)}{\partial x} \frac{\partial x}{\partial \theta} p(y) + p(x) \frac{\partial p(y)}{\partial y} \frac{\partial y}{\partial \theta}
$$

$$
-\frac{\partial p(x)}{\partial x} \frac{\partial x}{\partial \theta} p(y) = p(x) \frac{\partial p(y)}{\partial y} \frac{\partial y}{\partial \theta}
$$

The vector length $r$ does not depend on the angle $\theta$, nor does the probability density, due to the rotational symmetry assumption.

Derivative of $x$ w.r.t. $\theta$:

$$
\frac{\partial x}{\partial \theta} = \frac{\partial}{\partial \theta} (r \cos \theta ) = -r \sin \theta = -y
$$

Derivative of $y$ w.r.t. $\theta$:

$$
\frac{\partial y}{\partial \theta} = \frac{\partial}{\partial \theta} (r \sin \theta ) = r \cos \theta = x
$$

Equation:

$$
y p(y) \frac{\partial p(x)}{\partial x} = xp(x) \frac{\partial p(y)}{\partial y}
$$

$$
\frac{p'(x)}{xp(x)} = \frac{p'(y)}{yp(y)} = C
$$

Integrate both sides w.r.t. $x$:

$$
\int \frac{p'(x)}{p(x)}\,dx = \int Cx\,dx
$$

$$
\ln |p(x)| + K_1 = \frac{1}{2}Cx^2 + K_2
$$

The constants of integration can be combined into one.

$$
K_2 - K_1 = K
$$

$$
p(x) = e^{\frac{1}{2}Cx^2 + K} = e^Ke^{\frac{1}{2}Cx^2}
$$

Rewrite $e^K$ as $A$.

$$
p(x) = Ae^{\frac{1}{2}Cx^2}
$$

Since the probability density must decrease for more extreme values, $C$ must be negative. Therefore, we can set $C = -c$, where $c > 0$ is a positive constant.

$$
p(x) = Ae^{-\frac{1}{2}cx^2}
$$

### Area under the curve

To obtain a valid probability density function, the area under the curve must equal $1$.

$$
\int_{-\infty}^{\infty} Ae^{-\frac{1}{2}cx^2}\,dx = 1
$$

$$
\int_{-\infty}^{\infty} e^{-\frac{1}{2}cx^2}\,dx = \frac{1}{A}
$$

The function is symmetric.

$$
\int_{0}^{\infty} e^{-\frac{1}{2}cx^2}\,dx = \frac{1}{2A}
$$

The integral above cannot be evaluated directly; it must be transformed into a double integral (or higher-dimensional) problem.

$$
\int_{0}^{\infty} e^{-\frac{1}{2}cx^2}\,dx \int_{0}^{\infty} e^{-\frac{1}{2}cy^2}\,dy = \frac{1}{4A^2}
$$

$$
\int_{0}^{\infty} \int_{0}^{\infty} e^{-\frac{1}{2}cx^2-\frac{1}{2}cy^2}\,dxdy = \frac{1}{4A^2}
$$

$$
\int_{0}^{\infty} \int_{0}^{\infty} e^{-\frac{1}{2}c(x^2+y^2)}\,dxdy = \frac{1}{4A^2}
$$

Switch to polar coordinates. By the Pythagorean theorem $x^2 + y^2 = r^2$.

$$
dxdy = |\det (J)| \,drd\theta
$$

$$
J = \begin{bmatrix}
\frac{\partial x}{\partial r}
& \frac{\partial x}{\partial \theta} \\[4pt]
\frac{\partial y}{\partial r}
& \frac{\partial y}{\partial \theta} \\
\end{bmatrix}
$$

For polar coordinates:

$$
J = \begin{bmatrix}
\cos \theta
& -r\sin \theta \\
\sin \theta
& r\cos \theta \\
\end{bmatrix}
$$

$$
\det(J) = r\cos^2\theta + r\sin^2\theta
$$

$$
= r(\cos^2\theta + \sin^2\theta) = r
$$

$r$ is always positive since it represents length.

$$
dxdy = r \,drd\theta
$$

Back to the integral:

$$
\int_{0}^{\frac{\pi}{2}} \int_{0}^{\infty} e^{-\frac{1}{2}c(r^2)}r\,drd\theta = \frac{1}{4A^2}
$$

$$
u = -\frac{1}{2}c(r^2)
$$

$$
du = -cr\,dr
$$

$$
dr = -\frac{1}{cr}\,du
$$

$$
\int_{0}^{\frac{\pi}{2}} \int_{0}^{-\infty} e^ur(-\frac{1}{cr})\,dud\theta = \frac{1}{4A^2}
$$

$$
-\frac{1}{c}\int_{0}^{\frac{\pi}{2}}[e^{-\infty} - e^0]\,d\theta = \frac{1}{4A^2}
$$

$$
\frac{1}{c}\int_{0}^{\frac{\pi}{2}}d\theta = \frac{1}{4A^2}
$$

$$
\frac{1}{c}\cdot\frac{\pi}{2} = \frac{1}{4A^2}
$$

$$
\frac{2\pi}{c} = \frac{1}{A^2}
$$

$$
A = \sqrt{\frac{c}{2\pi}}
$$

We choose the positive square root since the area under the curve must equal $1$, rather than $-1$.

### Definition of variance

If the arithmetic mean $\mu = 0$ and variance is $\sigma^2$:

$$
\int_{-\infty}^{\infty} x^2 p(x)\,dx = \sigma^2
$$

The function is symmetric.

$$
2\int_{0}^{\infty} x^2 p(x)\,dx = \sigma^2
$$

$$
2\int_{0}^{\infty} x^2 Ae^{-\frac{1}{2}cx^2}\,dx = \sigma^2
$$

$$
2A\int_{0}^{\infty} x^2 e^{-\frac{1}{2}cx^2}\,dx = \sigma^2
$$

Integration by parts:

$$
\int u\,dv = uv - \int v\,du
$$

$$
u = x
$$

$$
dv = xe^{-\frac{1}{2}cx^2}
$$

$$
v = \int xe^{-\frac{1}{2}cx^2}\,dx
$$

$$
m = -\frac{1}{2}cx^2
$$

$$
dm = -cx\,dx
$$

$$
dx = -\frac{1}{cx}\,dm
$$

$$
v = -\frac{1}{c}\int e^m\,dm
$$

$$
= -\frac{1}{c}e^m = -\frac{1}{c}e^{-\frac{1}{2}cx^2}
$$

First, the indefinite integral:

$$
\int x^2 e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= -\frac{x}{c}e^{-\frac{1}{2}cx^2} - \int -\frac{1}{c}e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= -\frac{x}{c}e^{-\frac{1}{2}cx^2} + \frac{1}{c}\int e^{-\frac{1}{2}cx^2}\,dx
$$

Next, the definitive integral:

$$
\int_{0}^{\infty} x^2 e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= \left[-\frac{\infty}{c}e^{-\frac{1}{2}c\infty^2} - 0\right] + \frac{1}{c}\int_{0}^{\infty} e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= \frac{1}{c}\int_{0}^{\infty} e^{-\frac{1}{2}cx^2}\,dx = \frac{1}{c} \cdot \frac{1}{2A}
$$

Back to the beginning:

$$
2A\int_{0}^{\infty} x^2 e^{-\frac{1}{2}cx^2}\,dx = \sigma^2
$$

$$
= 2A\int_{0}^{\infty} x^2 e^{-\frac{1}{2}cx^2}\,dx
$$

$$
= 2A\frac{1}{c} \cdot \frac{1}{2A} = \frac{1}{c}
$$

$$
\frac{1}{c} = \sigma^2
$$

$$
c = \frac{1}{\sigma^2}
$$

### To sum up

Formula for A:

$$
A = \sqrt{\frac{c}{2\pi}} = \sqrt{\frac{1}{2\pi\sigma^2}}
$$

$$
A = \frac{1}{\sqrt{2\pi\sigma^2}}
$$

Complete formula for normal distribution:

$$
p(x) = Ae^{-\frac{1}{2}cx^2} = A\exp \left(-\frac{x^2}{2\sigma^2}\right)
$$

$$
p(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp \left(-\frac{x^2}{2\sigma^2}\right)
$$

Now, we can just shift the peak by $\mu$:

$$
p(x) = \frac{1}{\sqrt{2\pi\sigma^2}}\exp \left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$
