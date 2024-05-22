import {it, expect, describe} from 'vitest';
import {Tensile} from '../src/tensile.js';

describe('tensile', () => {
	it('should initiate the constructor', () => {
		const tensile = new Tensile();
		expect(tensile).toBeInstanceOf(Tensile);
	});
});
