import { computeSqDeviation } from './computeSqDeviation';
import { mean as mu } from './mean';

describe('computeSqDeviation', () => {
    let mean: number = 0;
    let data: number[] = [35, 40, 45, 49, 34, 47, 39, 25, 19, 35, 28, 48];
    let sd: number[] = [4, 9, 64, 144, 9, 100, 4, 144, 324, 4, 81, 121];

    beforeAll(() => {
        mean = mu(data); // 37
    });

    it('should return a function', () => {
        let deviation = computeSqDeviation(mean);

        expect(deviation).toBeInstanceOf(Function);
    });

    it('should calculate the square deviation via the function returned', () => {
        let deviation = computeSqDeviation(mean);

        data.forEach((x, i) => {
            expect(deviation(x)).toBe(sd[i]);
        });
    });
});