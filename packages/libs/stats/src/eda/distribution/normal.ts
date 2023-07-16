import { ProbabilityDistribution } from "./contracts/ProbabilityDistribution";

/**
 * Normal Probability Distribution - https://www.itl.nist.gov/div898/handbook/eda/section3/eda3661.htm
 * 
 */
class Normal implements ProbabilityDistribution {
    location!: number;
    scale!: number;
}