export class Customer {
    id? :number;
    firstName :string;
    lastName :string;
    email :string;

    constructor(id = 0, firstName = '', lastName = '', email = '') {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }
}