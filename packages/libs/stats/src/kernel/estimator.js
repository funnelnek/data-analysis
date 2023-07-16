export function epanechnikov(bandwidth) {
    return function(v) {
        return Math.abs(v /= bandwidth) <= 1 ? 0.75 * (1 - v * v) / bandwidth : 0;
    };
}

export function triangular(bandwidth) {
  return function(v) {
      return Math.abs(v /= bandwidth) <= 1 ? (1 - Math.abs(v)) / bandwidth : 0;
  };
}

export function uniform(bandwidth) {
  return function(v) {
      return Math.abs(v /= bandwidth) <= 1 ? 0.5 / bandwidth : 0;
  };
}

export function gaussian(bandwidth) {
  return function(v) {
      return (1 / Math.sqrt(2 * Math.PI)) * Math.exp((-0.5 * (v * v))) / bandwidth
  };
}

export function quartic(bandwidth) {
  return function(v) {
    return Math.abs(v /= bandwidth) <= 1 ? 0.9375 * Math.pow((1 - v * v), 2) / bandwidth : 0;    
  }
}

export function triweight(bandwidth) {
  return function(v) {
    return Math.abs(v /= bandwidth) <= 1 ? 1.09375 * Math.pow((1 - v * v), 3) / bandwidth : 0;    
  }
}

export function tricube(bandwidth) {
  return function(v) {
    return Math.abs(v /= bandwidth) <= 1 ? (70 / 81) * Math.pow((1 - Math.abs(Math.pow(v, 3))), 3) / bandwidth : 0;    
  }
}

export function cosine(bandwidth) {
  return function(v) {
    return Math.abs(v /= bandwidth) <= 1 ? (Math.PI / 4) * Math.cos(Math.PI / 2 * v) / bandwidth : 0;    
  }
}

export function logistic(bandwidth) {
  return function(v) {
    return 1 / (Math.exp(v) + 2 + Math.exp(-v)) / bandwidth;
  }
}

export function sigmoid(bandwidth) {
  return function(v) {
    return (2 / Math.PI) * (1 / (Math.exp(v) + Math.exp(-v))) / bandwidth;
  }
}

export function silverman(bandwidth) {
  return function(v) {
    let x = Math.abs(v) / Math.sqrt(2);
    return 0.5 * Math.exp(-x) * Math.sin(x + (Math.PI / 4)) / bandwidth;
  }
}
