import Keyv from 'keyv';
import {Airhorn} from 'airhorn';
import {Ecto} from 'ecto';
import {Hookified} from 'hookified';

export type TensileOptions = {
	cache?: Keyv;
	notifications?: Airhorn;
	templates?: Ecto;
};

export class Tensile extends Hookified {
	private readonly cache: Keyv;
	private readonly notifications: Airhorn;
	private readonly templates: Ecto;

	constructor(options?: TensileOptions) {
		super();
		this.cache = new Keyv();
		this.notifications = new Airhorn();
		this.templates = new Ecto();
	}
}
