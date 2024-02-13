import { IProduct, CostType } from '../types';
import { CDN_URL } from '../utils/constants';

export class Product implements IProduct {
	id: string;
	name: string;
	icon: string;
	category: string;
	about: string;
	cost: CostType;
	displayedCost: string;

	constructor(
		id: string,
		name: string,
		icon: string,
		category: string,
		about: string,
		cost: CostType
	) {
		this.id = id;
		this.name = name;
		this.icon = CDN_URL + icon;
		this.category = category;
		this.about = about;
		if (cost === null) {
			this.cost = 0;
			this.displayedCost = 'Бесценно';
		}
		if (cost > 0) {
			this.cost = cost;
			this.displayedCost = cost + ' синапсов';
		}
	}
}
