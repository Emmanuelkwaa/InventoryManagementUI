export class Category {
    id? :number;
    name :string;

    constructor(id = 0, name = '') {
        this.id = id;
        this.name = name;
    }
}