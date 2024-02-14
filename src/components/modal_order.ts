import { Modal } from './base/modal';
import { EventEmitter } from './base/events';

export class ModalOrder extends Modal {
	onlineButton?: HTMLButtonElement;
	receiptButton?: HTMLButtonElement;
	private eventEmitter: EventEmitter;
	emailInput?: HTMLInputElement;
	phoneInput?: HTMLInputElement;
	addressInput?: HTMLInputElement;

	constructor(OrderSelector: string, eventEmitter: EventEmitter) {
		super(OrderSelector);
		this.button = this.modalContainer.querySelector('#next_button');
		this.eventEmitter = eventEmitter;
		if (OrderSelector === 'order_start') {
			this.operationSelectionButtons();
		}

		this.emailInput = this.modal.querySelector(
			'.form__input[placeholder="Введите Email"]'
		) as HTMLInputElement;
		this.addressInput = this.modal.querySelector(
			'.form__input[placeholder="Введите адрес"]'
		) as HTMLInputElement;
		this.phoneInput = this.modal.querySelector(
			'.form__input[placeholder="+7 ("]'
		) as HTMLInputElement;
		this.formValidation();

		this.button.addEventListener('click', (evt) => {
			this.eventEmitter.emit('modal_order: nextButton_is_clicked', {
				selector: this.modalSelector,
			});
			evt.preventDefault();
			this.closeModal();
		});
	}

	operationSelectionButtons() {
		this.onlineButton = this.modal.querySelector(
			'#online'
		) as HTMLButtonElement;
		this.receiptButton = this.modal.querySelector(
			'#receipt'
		) as HTMLButtonElement;
		this.onlineButton.addEventListener('click', () => {
			this.eventEmitter.emit('modal_order:selectedButtonPressed');
			this.onlineButton.classList.add('button_alt-active');
			this.receiptButton.classList.remove('button_alt-active');
		});
		this.receiptButton.addEventListener('click', () => {
			this.eventEmitter.emit('modal_order:selectedButtonPressed');
			this.receiptButton.classList.add('button_alt-active');
			this.onlineButton.classList.remove('button_alt-active');
		});
	}

	formValidation() {
		if (this.modalSelector === 'order_start') {
			if (this.addressInput) {
				this.addressInput.addEventListener('input', () => {
					const isButtonSelected =
						this.onlineButton?.classList.contains('button_alt-active') ||
						this.receiptButton?.classList.contains('button_alt-active');
					const isAddressEntered = this.addressInput.value.length > 0;
					this.buttonToggle(isButtonSelected, isAddressEntered);
				});
			}
		}

		if (this.modalSelector === 'order_finish') {
			this.emailInput?.addEventListener('input', () =>
				updateSubmitButtonState()
			);
			this.phoneInput?.addEventListener('input', () =>
				updateSubmitButtonState()
			);

			const updateSubmitButtonState = () => {
				const isEmailEntered = this.emailInput?.value.length > 0;
				const isPhoneEntered = this.phoneInput?.value.length > 0;

				this.buttonToggle(isEmailEntered, isPhoneEntered);
			};
		}
	}

	buttonToggle(firstArg: boolean, secondArg: boolean) {
		if (firstArg && secondArg) {
			if (this.button.hasAttribute('disabled')) {
				this.button.removeAttribute('disabled');
			}
		} else {
			this.button.setAttribute('disabled', 'true');
		}
	}

	closeModal(): void {
		super.closeModal();
		if (this.modalSelector === 'order_start') {
			this.onlineButton.classList.remove('button_alt-active');
			this.receiptButton.classList.remove('button_alt-active');
			this.addressInput.value = '';
		}
		if (this.modalSelector === 'order_finish') {
			this.emailInput.value = '';
			this.phoneInput.value = '';
		}
	}
}
