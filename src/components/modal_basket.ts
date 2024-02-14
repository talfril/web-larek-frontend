import { Modal } from './base/modal';
import { Basket, BasketItem } from './basket';
import { EventEmitter } from './base/events';
import { basketButton } from '../utils/constants';
import { ensureElement } from '../utils/utils';

export class ModalBasket extends Modal {
	basket: Basket;
	eventEmitter: EventEmitter;

	constructor(basket: Basket, eventEmitter: EventEmitter) {
		super('basket');
		this.basket = basket;
		this.eventEmitter = eventEmitter;

		basketButton.addEventListener('click', () => {
			this.eventEmitter.emit('modal_basket:basket_modal_opened');
			this.openModal();
		});

		this.button.addEventListener('click', () => {
			this.eventEmitter.emit('modal_basket:on_order');
			this.closeModal();
		});
	}

	private createBasketItemElement(item: BasketItem): HTMLElement {
		const listItem = document.createElement('li');
		listItem.classList.add('basket__item', 'card', 'card_compact');

		const indexSpan = document.createElement('span');
		indexSpan.classList.add('basket__item-index');
		const indexOfBasketItem = this.basket.productsInBasket.indexOf(item) + 1;
		indexSpan.textContent = indexOfBasketItem.toString();

		const titleSpan = document.createElement('span');
		titleSpan.classList.add('card__title');
		titleSpan.textContent = item.name;

		const priceSpan = document.createElement('span');
		priceSpan.classList.add('card__price');
		priceSpan.textContent = item.displayedCost;

		const deleteButton = document.createElement('button');
		deleteButton.classList.add('basket__item-delete');
		deleteButton.setAttribute('aria-label', 'удалить');

		deleteButton.addEventListener(
			'click',
			function () {
				this.basket.deletefromBasket(item);
				this.renderBasket();
			}.bind(this)
		);

		listItem.appendChild(indexSpan);
		listItem.appendChild(titleSpan);
		listItem.appendChild(priceSpan);
		listItem.appendChild(deleteButton);

		return listItem;
	}

	renderBasket() {
		const basketList = this.modal.querySelector('.basket__list');
		const basketPrice = this.modal.querySelector('.basket__price');

		while (basketList.firstChild) {
			basketList.removeChild(basketList.firstChild);
		}

		this.basket.productsInBasket.forEach((item) => {
			const listItem = this.createBasketItemElement(item);
			basketList.appendChild(listItem);
		});

		basketPrice.textContent = this.basket.displayedSumInBasket;
		if (this.basket.productsInBasket.length === 0) {
			this.button.disabled = true;
		} else {
			this.button.disabled = false;
		}
		this.updateBasketCounter();
	}

	updateBasketCounter() {
		const basketCounter = ensureElement('.header__basket-counter');
		const countIn = this.basket.productsInBasket.length;
		basketCounter.textContent = countIn.toString();
	}

	openModal() {
		this.renderBasket();
		super.openModal();
	}

	closeModal() {
		super.closeModal();
	}
}
