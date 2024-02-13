import { Api } from './base/api';
import { IProductItem } from '../types';

export class ProductApi extends Api {
	constructor(baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	getProducts(): Promise<IProductItem[]> {
		return this.get('/product').then(
			(data: { items: IProductItem[] }) => data.items
		);
	}
}
