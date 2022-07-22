import { Customer } from "./Customer";
import { Product } from "./Product";

export class Order {
    id? :number;
    quantity :number; //amount of product ordered
    totalCost :number;
    product :Product;
    customer :Customer;

    constructor(id = 0, quantity = 0, totalCost = 0, product = new Product(), customer = new Customer()) {
        this.id = id;
        this.quantity = quantity
        this.totalCost = totalCost
        this.product = product
        this.customer = customer

    }
}