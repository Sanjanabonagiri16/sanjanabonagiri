Probability Calculator
The Probability Calculator is a specialized tool designed to compute probabilities for various events and distributions. It handles a wide range of probability-related tasks, from basic event probabilities to more complex calculations involving standard probability distributions. Below is a detailed description of its features and functionality.

Features
Simple Probability
Purpose: Calculates the probability of a simple event.
Inputs:
Number of favorable outcomes.
Total number of possible outcomes.
Computation: Probability = 
favorable outcomes
total outcomes
total outcomes
favorable outcomes
​
 .
Validation:
Ensures total outcomes are not zero.
Ensures favorable outcomes are not greater than total outcomes.
Example:
Favorable outcomes = 2, Total outcomes = 6 → Probability = 
2
/
6
=
0.3333
2/6=0.3333.
Combinations and Permutations
Purpose: Computes the number of combinations (
𝐶
(
𝑛
,
𝑘
)
C(n,k)) or permutations (
𝑃
(
𝑛
,
𝑘
)
P(n,k)).
Inputs:
𝑛
n (total items).
𝑘
k (items to choose).
Choice between combinations or permutations.
Computation:
Combinations: 
𝐶
(
𝑛
,
𝑘
)
=
𝑛
!
𝑘
!
(
𝑛
−
𝑘
)
!
C(n,k)= 
k!(n−k)!
n!
​
 .
Permutations: 
𝑃
(
𝑛
,
𝑘
)
=
𝑛
!
(
𝑛
−
𝑘
)
!
P(n,k)= 
(n−k)!
n!
​
 .
Validation:
Ensures 
𝑛
n and 
𝑘
k are non-negative integers.
Ensures 
𝑘
≤
𝑛
k≤n.
Example:
𝑛
=
5
n=5, 
𝑘
=
2
k=2, Combinations → 
𝐶
(
5
,
2
)
=
10
C(5,2)=10.
Probability Distributions
Purpose: Computes probabilities for specific probability distributions.
Supported Distributions:
Binomial Distribution:
Inputs:
𝑛
n (number of trials).
𝑝
p (probability of success).
𝑘
k (number of successes).
Computation: 
𝑃
(
𝑋
=
𝑘
)
=
𝐶
(
𝑛
,
𝑘
)
⋅
𝑝
𝑘
⋅
(
1
−
𝑝
)
𝑛
−
𝑘
P(X=k)=C(n,k)⋅p 
k
 ⋅(1−p) 
n−k
 .
Example:
𝑛
=
10
n=10, 
𝑝
=
0.5
p=0.5, 
𝑘
=
5
k=5 → 
𝑃
(
𝑋
=
5
)
=
0.2461
P(X=5)=0.2461.
Normal Distribution:
Inputs:
𝜇
μ (mean).
𝜎
σ (standard deviation).
𝑥
x (value to evaluate).
Computation: Cumulative probability 
𝑃
(
𝑋
≤
𝑥
)
P(X≤x) using the error function for accuracy.
Example:
𝜇
=
0
μ=0, 
𝜎
=
1
σ=1, 
𝑥
=
1.96
x=1.96 → 
𝑃
(
𝑋
≤
1.96
)
≈
0.975
P(X≤1.96)≈0.975.
Extensibility:
Additional distributions (e.g., Poisson, exponential) can be added in future updates.
User Interaction
Users select "Probability Calculations" from the main menu (described in the combined calculator section).
A sub-menu presents options:
Simple Probability.
Combinations and Permutations.
Probability Distributions.
For each calculation, users are prompted to input necessary parameters.
Results are displayed with appropriate precision (e.g., probabilities rounded to four decimal places).
Error handling ensures invalid inputs (e.g., non-numeric entries, illogical values) are caught, with clear error messages guiding users to correct their inputs.
Complex Number Calculator
The Complex Number Calculator is a tool designed to perform arithmetic operations and other functions with complex numbers. It leverages Python's built-in support for complex numbers to ensure accurate and reliable computations. Below is a detailed description of its features and functionality.

Features
Basic Arithmetic Operations
Supported Operations:
Addition.
Subtraction.
Multiplication.
Division.
Inputs:
Real and imaginary parts of two complex numbers.
Computation:
Uses Python's native complex number operations (e.g., c1 + c2, c1 * c2).
Example:
First number: 
3
+
2
𝑖
3+2i, Second number: 
1
−
4
𝑖
1−4i.
Addition: 
(
3
+
2
𝑖
)
+
(
1
−
4
𝑖
)
=
4
−
2
𝑖
(3+2i)+(1−4i)=4−2i.
Conjugate
Purpose: Computes the conjugate of a complex number.
Input:
Real and imaginary parts of one complex number.
Computation:
Uses the .conjugate() method.
Example:
Input: 
3
+
4
𝑖
3+4i → Conjugate: 
3
−
4
𝑖
3−4i.
Modulus
Purpose: Calculates the modulus (magnitude) of a complex number.
Input:
Real and imaginary parts of one complex number.
Computation:
Uses the abs() function, where modulus = 
𝑎
2
+
𝑏
2
a 
2
 +b 
2
 
​
  for 
𝑧
=
𝑎
+
𝑏
𝑖
z=a+bi.
Example:
Input: 
3
+
4
𝑖
3+4i → Modulus: 
3
2
+
4
2
=
5
3 
2
 +4 
2
 
​
 =5.
Argument
Purpose: Computes the argument (phase angle) of a complex number in radians.
Input:
Real and imaginary parts of one complex number.
Computation:
Uses the cmath.phase() function.
Example:
Input: 
1
+
𝑖
1+i → Argument: 
𝜋
/
4
π/4 radians.
User Interaction
Users select "Complex Number Operations" from the main menu (described in the combined calculator section).
A sub-menu presents options:
Add two complex numbers.
Subtract two complex numbers.
Multiply two complex numbers.
Divide two complex numbers.
Find conjugate.
Find modulus.
Find argument.
Users input complex numbers by specifying real and imaginary parts separately for clarity.
Results are displayed in a readable format:
Complex numbers: 
𝑎
+
𝑏
𝑖
a+bi.
Modulus and argument: Floating-point numbers.
Error handling catches invalid inputs (e.g., non-numeric entries), with prompts to correct them.
Combined Calculator Interface
The Combined Calculator integrates the Probability Calculator and Complex Number Calculator into a single, cohesive tool with a menu-driven interface. This design allows users to easily switch between probability and complex number calculations without needing separate tools, enhancing convenience and efficiency.

Main Menu
Upon starting the calculator, users are presented with the following options:

Probability Calculations:
Directs to the sub-menu for probability-related tasks (described above).
Complex Number Operations:
Directs to the sub-menu for complex number-related tasks (described above).
Users select an option by entering the corresponding number.

Workflow
Selection:
Users choose between "Probability Calculations" or "Complex Number Operations."
Sub-Menu Navigation:
Based on the choice, users are directed to the relevant sub-menu.
Each sub-menu lists specific calculations available (e.g., simple probability, addition of complex numbers).
Input and Calculation:
Users select a specific calculation.
The calculator prompts for necessary inputs (e.g., parameters for distributions, real and imaginary parts for complex numbers).
The computation is performed, and the result is displayed.
Repeat or Exit:
After each calculation, users are asked if they wish to perform another calculation.
If yes, they return to the main menu.
If no, the calculator exits.
Error Handling
The calculator includes robust error handling:
Catches invalid inputs (e.g., non-numeric entries where numbers are expected).
Validates logical constraints (e.g., probabilities between 0 and 1, non-negative integers for combinations).
Clear error messages guide users to correct their inputs and retry.
Design Choices
Modularity:
Each type of calculation is implemented as a separate function, making the codebase easy to maintain and extend.
User-Friendly Input:
Complex numbers are input by specifying real and imaginary parts separately to avoid confusion with notation (e.g., avoiding Python's "j" notation for imaginary units).
Output Formatting:
Results are formatted for clarity:
Probabilities rounded to four decimal places.
Complex numbers displayed as 
𝑎
+
𝑏
𝑖
a+bi.
Modulus and argument displayed as floating-point numbers.
Extensibility:
The menu-driven structure allows for easy addition of new features (e.g., more probability distributions, advanced complex number functions like powers or roots).
Example Usage
Probability Calculation (Binomial Distribution):
User selects:
"Probability Calculations" → "Probability Distributions" → "Binomial Distribution."
Inputs:
𝑛
=
10
n=10 (number of trials).
𝑝
=
0.5
p=0.5 (probability of success).
𝑘
=
5
k=5 (number of successes).
Output:
𝑃
(
𝑋
=
5
)
=
0.2461
P(X=5)=0.2461.
Complex Number Operation (Addition):
User selects:
"Complex Number Operations" → "Add two complex numbers."
Inputs:
First number: Real = 3, Imaginary = 2 (
3
+
2
𝑖
3+2i).
Second number: Real = 1, Imaginary = -4 (
1
−
4
𝑖
1−4i).
Output:
4.0
−
2.0
𝑖
4.0−2.0i.
Conclusion
The Combined Calculator is a powerful and flexible tool that seamlessly integrates probability and complex number calculations into a single, user-friendly interface. It caters to a wide range of users, including students, educators, and professionals, by providing accurate and reliable computations for both basic and advanced mathematical tasks. The menu-driven structure, robust error handling, and clear output formatting make it an efficient and convenient tool for performing diverse calculations without needing multiple separate calculators.