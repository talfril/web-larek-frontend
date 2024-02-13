import './scss/styles.scss';
import { Catalog } from './components/catalog';
import { API_URL } from './utils/constants';
import { Product } from './components/product';
import { ProductApi } from './components/product_api';
import { IProductItem } from './types';
import { Basket } from './components/basket';
import { ModalBasket } from './components/modal_basket';
import { ModalFullCard } from './components/modal_full_card';
import { ModalSuccess } from './components/modal_success';
import { ModalOrder } from './components/modal_order';
import { EventEmitter } from './components/base/events';

//Получение данных с API
const productApi = new ProductApi(API_URL);

function convertApiDataToProducts(apiProducts: IProductItem[]): Product[] {
	return apiProducts.map((item) => {
		return new Product(
			item.id,
			item.title,
			item.image,
			item.category,
			item.description,
			item.price
		);
	});
}

productApi
	.getProducts()
	.then((apiData: IProductItem[]) => {
		const products: Product[] = convertApiDataToProducts(apiData);
		products.forEach(function (product) {
			LarekCatalog.renderCard(product);
		});
	})
	.catch((error) => {
		console.error('Ошибка при получении списка товаров:', error);
	});

//Инициализация основных элементов
const eventEmitter = new EventEmitter();
const LarekCatalog = new Catalog(eventEmitter);
const LarekBasket = new Basket(eventEmitter);
const ModalLarekBasket = new ModalBasket(LarekBasket, eventEmitter);
const OrderFirst = new ModalOrder('order_start', eventEmitter);
const OrderSecond = new ModalOrder('order_finish', eventEmitter);
const SuccessLarek = new ModalSuccess(LarekBasket, eventEmitter);

//Установление обработчиков событий
eventEmitter.on('catalog:card_clicked', (data: { product: Product }) => {
	const modalFullCard = new ModalFullCard(
		data.product,
		eventEmitter,
		LarekBasket
	);
	modalFullCard.openModal();
});

eventEmitter.on('modal_basket:click_on_order_button', () => {
	OrderFirst.openModal();
});

eventEmitter.on(
	'modal_order: nextButton_is_clicked',
	(data: { selector: string }) => {
		if (data.selector === 'order_start') {
			OrderSecond.openModal();
		}
		if (data.selector === 'order_finish') {
			SuccessLarek.openModal();
		}
	}
);

eventEmitter.on('modal_success:success', () => {
	LarekBasket.cleanBasket();
	ModalLarekBasket.updateBasketCounter();
});

eventEmitter.on('modal_full_card:add_to_basket', (product: Product) => {
	ModalLarekBasket.updateBasketCounter();
});
