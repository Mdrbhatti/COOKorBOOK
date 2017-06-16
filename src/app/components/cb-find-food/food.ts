export class FoodItem {

    picture: string;
    name: string;
    price: number;

    constructor(name: string, price: number, picture: string) {
        this.name = name;
        this.price = price;
        this.picture = picture;
    }
}
