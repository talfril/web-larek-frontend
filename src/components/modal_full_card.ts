import { Modal } from "./base/modal";
import { Product } from "./product";
import { categoryClasses } from "../utils/constants";
import { EventEmitter } from "./base/events";
import { Basket } from "./basket";

export class ModalFullCard extends Modal {
    private categoryClasses: Record<string, string>;
    product: Product;
    private eventEmitter: EventEmitter;
    private addToBasketCallback: () => void;
    private basket: Basket;

    constructor(product: Product, eventEmitter: EventEmitter, basket: Basket){
        super('card_full');
        this.product = product;
        this.basket = basket;
        this.categoryClasses = categoryClasses;
        this.eventEmitter = eventEmitter;
        this.addToBasketCallback = () => {
            this.eventEmitter.emit('modal_full_card:add_to_basket', this.product);
            this.closeModal()
        } 
        this.button.addEventListener('click', this.addToBasketCallback)
    }

    private renderFullProductElement(): void {
        if (this.basket.isProductInBasket(this.product)){
                   this.button.setAttribute('disabled', 'true');
                   this.button.textContent = 'Товар уже в корзине';
        } else {
            this.button.removeAttribute('disabled');
            this.button.textContent = 'В корзину';
        }

        const imageElement = this.modal.querySelector('.card__image');
        imageElement.setAttribute('src', this.product.icon);
        imageElement.setAttribute('alt', this.product.name);

        const categoryElement = this.modal.querySelector('.card__category');
        categoryElement.textContent = this.product.category;
        if (this.product.category in this.categoryClasses) {
            categoryElement.classList.add(this.categoryClasses[this.product.category]);
        }

        const titleElement = this.modal.querySelector('.card__title');
        titleElement.textContent = this.product.name;

        const textElement = this.modal.querySelector('.card__text');
        textElement.textContent = this.product.about;

        const priceElement = this.modal.querySelector('.card__price');
        priceElement.textContent = this.product.displayedCost;
    }
  
    openModal() {
        
        this.renderFullProductElement();
        super.openModal();
    }

    closeModal() {
        super.closeModal();
        this.button.removeEventListener('click', this.addToBasketCallback)
    }
}
