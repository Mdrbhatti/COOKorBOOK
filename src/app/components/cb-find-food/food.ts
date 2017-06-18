export class FoodItem {

    name: string;
    description: string;
    sellerComments: string;
    pricePerPortion: number;
    bulkPricing: boolean;
    picture: string;
    type: string;
    rating: number;
    addressStreet: string;
    addressPostalCode: string;
    addressCity: string;

    constructor(name: string, description: string, sellerComments: string, pricePerPortion: number,
                bulkPricing: boolean, picture: string, type: string, rating: number,
                addressStreet: string, addressPostalCode: string, addressCity: string) {

        this.name = name;
        this.description = description;
        this.sellerComments = sellerComments;
        this.pricePerPortion = pricePerPortion;
        this.bulkPricing = bulkPricing;
        this.picture = picture;
        this.type = type;
        this.rating = rating;
        this.addressStreet = addressStreet;
        this.addressPostalCode = addressPostalCode;
        this.addressCity = addressCity;
    }
}
