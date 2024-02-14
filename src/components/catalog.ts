import { Product } from './product';
import { categoryClasses } from '../utils/constants';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';

export class Catalog {
	private categoryClasses: Record<string, string>;
	private galleryContainer: HTMLElement;
	private cardTemplate: HTMLTemplateElement;
	private eventEmitter: EventEmitter;
	private categoryElement: HTMLElement;
	private titleElement: HTMLElement;
	private imageElement: HTMLImageElement;
	private costElement: HTMLElement;
	private cardElement: HTMLElement;

	constructor(eventEmitter: EventEmitter) {
		this.galleryContainer = ensureElement<HTMLElement>('.gallery');
		this.cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
		this.categoryClasses = categoryClasses;
		this.eventEmitter = eventEmitter;

		this.categoryElement =
			this.cardTemplate.content.querySelector('.card__category');
		this.titleElement = this.cardTemplate.content.querySelector('.card__title');
		this.imageElement = this.cardTemplate.content.querySelector('.card__image');
		this.costElement = this.cardTemplate.content.querySelector('.card__price');
		this.cardElement = this.cardTemplate.content.querySelector('.card');
	}

	renderCard(product: Product): void {
		const cardClone = this.cardTemplate.content.cloneNode(
			true
		) as DocumentFragment;

		this.categoryElement.textContent = product.category;
		if (product.category in this.categoryClasses) {
			this.categoryElement.classList.add(
				this.categoryClasses[product.category]
			);
		}
		this.cardElement.setAttribute('product-id', product.id);
		this.titleElement.textContent = product.name;
		this.imageElement.src = product.icon;
		this.costElement.textContent = product.displayedCost;

		const cardToClick = cardClone.querySelector(
			'.gallery__item'
		) as HTMLElement;
		cardToClick.addEventListener('click', () => {
			this.eventEmitter.emit('catalog:on_card', { product });
		});

		this.galleryContainer.appendChild(cardClone);
	}
}
