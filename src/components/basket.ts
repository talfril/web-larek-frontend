import { IBasket, CostType, IProduct } from '../types';
import { EventEmitter } from './base/events';

export class Basket implements IBasket {
	productsInBasket: Array<{
		name: string;
		cost: CostType;
		displayedCost: string;
	}>;
	sumInBasket: CostType;
	emptyPhrase: string;
	displayedSumInBasket: string;
	private eventEmitter: EventEmitter;

	constructor(eventEmitter: EventEmitter) {
		this.productsInBasket = [];
		this.sumInBasket = null;
		this.emptyPhrase = 'Это вам ничего не стоит';
		this.displayedSumInBasket = this.emptyPhrase;
		this.eventEmitter = eventEmitter;

		this.eventEmitter.on(
			'modal_full_card:add_to_basket',
			(product: IProduct) => {
					this.setToBasket(product);
			}
		);
	}

	isProductInBasket(product: IProduct) {
		return this.productsInBasket.some((item) => item.name === product.name);
	}

	setToBasket(product: IProduct) {
		const newBasketItem = new BasketItem(product);
		this.productsInBasket.push(newBasketItem);

		this.sumInBasket = this.sumInBasket
			? this.sumInBasket + newBasketItem.cost
			: newBasketItem.cost;

		if (this.sumInBasket !== 0) {
			this.displayedSumInBasket = `${this.sumInBasket} синапсов`;
		}
	}

	deletefromBasket(itemToDelete: BasketItem) {
		this.sumInBasket -= itemToDelete.cost;
		this.productsInBasket = this.productsInBasket.filter(
			(item) => item !== itemToDelete
		);
		if (this.sumInBasket !== 0) {
			this.displayedSumInBasket = `${this.sumInBasket} синапсов`;
		} else {
			this.displayedSumInBasket = this.emptyPhrase;
		}
	}

	cleanBasket() {
		this.productsInBasket = [];
		this.displayedSumInBasket = this.emptyPhrase;
		this.sumInBasket = null;
	}
}

export class BasketItem {
	name: string;
	cost: CostType;
	displayedCost: string;

	constructor(Product: IProduct) {
		this.name = Product.name;
		this.cost = Product.cost;
		this.displayedCost = Product.displayedCost;
	}
}
