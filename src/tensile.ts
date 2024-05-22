import Keyv from 'keyv';
import {Airhorn} from 'airhorn';
import {Ecto} from 'ecto';

export class Tensile {
	private readonly cache: Keyv;
	private readonly notificationProvider: Airhorn;
	private readonly templateProvider: Ecto;

	constructor() {
		this.cache = new Keyv();
		this.notificationProvider = new Airhorn();
		this.templateProvider = new Ecto();
	}
}
