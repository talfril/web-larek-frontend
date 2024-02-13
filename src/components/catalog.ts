import { Product } from './product';
import { categoryClasses } from '../utils/constants';
import { EventEmitter } from './base/events';

export class Catalog {
	private categoryClasses: Record<string, string>;
	private galleryContainer: HTMLElement;
	private cardTemplate: HTMLTemplateElement;
	private eventEmitter: EventEmitter;

	constructor(eventEmitter: EventEmitter) {
		this.galleryContainer = document.querySelector('.gallery') as HTMLElement;
		this.cardTemplate = document.getElementById(
			'card-catalog'
		) as HTMLTemplateElement;
		this.categoryClasses = categoryClasses;
		this.eventEmitter = eventEmitter;
	}

	renderCard(product: Product): void {
		const cardClone = this.cardTemplate.content.cloneNode(
			true
		) as DocumentFragment;

		const categoryElement = cardClone.querySelector(
			'.card__category'
		) as HTMLElement;
		const titleElement = cardClone.querySelector('.card__title') as HTMLElement;
		const imageElement = cardClone.querySelector(
			'.card__image'
		) as HTMLImageElement;
		const costElement = cardClone.querySelector('.card__price') as HTMLElement;
		const cardElement = cardClone.querySelector('.card') as HTMLElement;

		categoryElement.textContent = product.category;
		if (product.category in this.categoryClasses) {
			categoryElement.classList.add(this.categoryClasses[product.category]);
		}
		cardElement.setAttribute('product-id', product.id);
		titleElement.textContent = product.name;
		imageElement.src = product.icon;
		costElement.textContent = product.displayedCost;

		this.galleryContainer.appendChild(cardClone);

		if (cardElement) {
			cardElement.addEventListener('click', () => {
				this.eventEmitter.emit('catalog:card_clicked', { product });
			});
		}
	}
}
