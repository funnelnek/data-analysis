export * as estimator from './estimator';

export class KernelDensityEstimator {
    _kernel;
    _bandwidth = 1;

    constructor(kernel, bandwidth=1) {
        this._kernel = kernel;
        this._bandwidth = bandwidth;
    }

    get estimator() {
        return estimator[this._kernel](this._bandwidth);
    }

    density(v) {
        estimator[this._kernel](this._bandwidth)(v);
    }
}