export interface IProduct {
    id: string;
    name: string;
    icon: string;
    category: string;
    about: string;
    cost: CostType;
    displayedCost: string;
}

export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export type CostType = null | number;

export interface IBasket {
    productsInBasket: Array<{ name: string; displayedCost: string}>;
    sumInBasket: CostType;
    emptyPhrase: string;
    displayedSumInBasket: string;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
