import Keyv from 'keyv';
import { Airhorn } from 'airhorn';
import { Ecto } from 'ecto';

export class Tensile {

	private cache: Keyv;
	private notificationProvider: Airhorn;
	private templateProvider: Ecto;

    constructor() {
		this.cache = new Keyv();
		this.notificationProvider = new Airhorn();
		this.templateProvider = new Ecto();
        
    }

	public get Cache(): Keyv {
		return this.cache;
	}
	public get NotificationProvider(): Airhorn {
		return this.notificationProvider;
	}
	public get TemplateProvider(): Ecto {
		return this.templateProvider;
	}
}