import { page } from '../../utils/constants';

export class Modal {
	modal: HTMLElement;
	closeButton: HTMLButtonElement;
	button: HTMLButtonElement;
	modalSelector: string;
	modalContainer: HTMLElement;

	constructor(modalSelector: string) {
		this.modal = document.querySelector(`.${modalSelector}`);
		this.modalSelector = modalSelector;
		this.button = this.modal.querySelector('.button');
		this.modalContainer = this.modal.closest('.modal');
		this.closeButton = this.modalContainer.querySelector('.modal__close');
	}

	openModal() {
		if (this.modalContainer) {
			this.modalContainer.classList.add('modal_active');
			page.classList.add('page__wrapper_locked');
			this.modalContainer.addEventListener('click', this.handleOverlayClick);
		}

		this.closeButton.addEventListener('click', this.closeModal.bind(this));
	}

	closeModal(): void {
		if (this.modalContainer) {
			this.modalContainer.classList.remove('modal_active');
			page.classList.remove('page__wrapper_locked');
			this.modalContainer.removeEventListener('click', this.handleOverlayClick);
			this.closeButton.removeEventListener('click', this.closeModal.bind(this));
		}
	}

	private handleOverlayClick = (event: Event) => {
		if (event.target === this.modalContainer) {
			this.closeModal();
		}
	};
}
