import { Endian } from '../common.js';
import { getF64Codec } from '../f64.js';
import { assertValid } from './__setup__.js';

const APPROX_PI = 3.141592653589793;
const f64 = getF64Codec;

describe('getF64Codec', () => {
    it('encodes and decodes f64 numbers', () => {
        expect.hasAssertions();
        const f64LE = f64();
        const f64BE = f64({ endian: Endian.BIG });

        assertValid(f64LE, 0, '0000000000000000');
        assertValid(f64BE, 0, '0000000000000000');

        assertValid(f64LE, 1, '000000000000f03f');
        assertValid(f64BE, 1, '3ff0000000000000');
        assertValid(f64LE, 42, '0000000000004540');
        assertValid(f64BE, 42, '4045000000000000');
        assertValid(f64LE, Math.PI, '182d4454fb210940', APPROX_PI);
        assertValid(f64BE, Math.PI, '400921fb54442d18', APPROX_PI);

        assertValid(f64LE, -1, '000000000000f0bf');
        assertValid(f64BE, -1, 'bff0000000000000');
        assertValid(f64LE, -42, '00000000000045c0');
        assertValid(f64BE, -42, 'c045000000000000');
        assertValid(f64LE, -Math.PI, '182d4454fb2109c0', -APPROX_PI);
        assertValid(f64BE, -Math.PI, 'c00921fb54442d18', -APPROX_PI);
    });

    it('has the right description', () => {
        expect(f64().description).toBe('f64(le)');
        expect(f64({ endian: Endian.LITTLE }).description).toBe('f64(le)');
        expect(f64({ endian: Endian.BIG }).description).toBe('f64(be)');
        expect(f64({ description: 'custom' }).description).toBe('custom');
    });

    it('has the right sizes', () => {
        expect(f64().fixedSize).toBe(8);
        expect(f64().maxSize).toBe(8);
    });
});
