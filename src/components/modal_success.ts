import { Modal } from './base/modal';
import { Basket } from './basket';
import { EventEmitter } from './base/events';

export class ModalSuccess extends Modal {
	basket: Basket;
	private eventEmitter: EventEmitter;

	constructor(basket: Basket, eventEmitter: EventEmitter) {
		super('order-success');
		this.basket = basket;
		this.eventEmitter = eventEmitter;
		this.button.addEventListener('click', () => {
			this.closeModal();
		});
	}

	private renderModalSuccess(): void {
		const basketSum = this.modal.querySelector('.film__description');
		basketSum.textContent = this.basket.displayedSumInBasket.toString();
	}

	openModal() {
		this.renderModalSuccess();
		super.openModal();
	}

	closeModal(): void {
		super.closeModal();
		this.eventEmitter.emit('modal_success:success');
	}
}
