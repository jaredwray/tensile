export type TensileOptions = Record<string, unknown>;

export class Tensile {
	constructor(options?: TensileOptions) {}
}

const tensile = () => new Tensile();

export default tensile;
