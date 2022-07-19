import { Category } from "./Category";

export class Product {
    id?: number;
    name: string;
    price: number;
    details: string;
    category: Category;
    availableQuantity: number;

    constructor(
        id = 0,
        name = '',
        price = 0,
        details = '',
        category = new Category(),
        availableQuantity = 0
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.details = details;
        this.category = category;
        this.availableQuantity = availableQuantity;
    }
}
