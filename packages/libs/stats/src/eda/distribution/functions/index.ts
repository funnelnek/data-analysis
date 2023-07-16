
/**
 * Probability density function of the normal distribution.
 * 
 * A function which defines the relationship between a random variable and its probability, so that you can find the probability of the variable.
 * 
 * The Probability Density Function is a function that gives us the probability distribution of a random variable for any value of it. 
 * To get the probability distribution at a point, you only have to solve the probability density function for that point.
 * 
 * For discrete variables, the probability is straightforward and can be calculated easily.
 * But for continuous variables which can take on infinite values, the probability also takes on a range of infinite values. 
 * The function which describes the probability for such variables is called a probability density function in statistics.
 * 
 * The different types of variables. They are mainly of two types: * 
 * - Discrete Variable: A variable that can only take on a certain finite value within a specific range is called a discrete variable. 
 * - Continuous Variable: A continuous random variable can take on infinite different values within a range of values.
 * 
 * 
 * @param x - The random variable.
 * @param loc - the location parameter that represents the mean.
 * @param scale - the scale parameter that represents the standard deviation.
 * @returns {number}
 */
export function density(x:number, loc: number = 0, scale: number = 0): number {
    return Math.exp(-Math.pow(x - loc, 2) / (2 * Math.pow(scale, 2))) / (scale * Math.sqrt(2 * Math.PI))
}

/**
 * The standard normal distribution.
 * @param x - The random variable.
 * @returns {number}
 */
export function standard(x: number): number {
    return Math.exp(-Math.pow(x , 2)) / Math.sqrt(2 * Math.PI)
}

/**
 * The cumulative distribution function of the standard normal distribution.
 * 
 * The cumulative distribution function is used to describe the probability distribution of random variables. 
 * It can be used to describe the probability for a discrete, continuous or mixed variable. 
 * It is obtained by summing up the probability density function and getting the cumulative probability for a random variable.
 * 
 * It is the probability that the random variable X will take a value less than or equal to x.
 * 
 * @param x - The random variable.
 */
export function cumulative(x: number): number {
    return standard(x)
}