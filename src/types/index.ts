export type Category = "софт-скил" | "другое" | "дополнительное"| "кнопка" | "хард-скил"

export interface IProduct {
    id: string;
    name: string;
    icon: string;
    category: Category;
    cost: costType;
    displayedСost: string;
    inBasket: boolean;
}

export type costType = null | number;

export interface IBasket {
    productsInBasket: Array<{ name: string; displayedСost: string, }>;
    sumInBasket: costType;
    displayedSumInBasket: string;
}

