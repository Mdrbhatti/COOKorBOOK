import { ItemCategory } from './Category';
import { ItemIngredient } from './Ingredient';
import { ItemAllergen } from './Allergen';

/**
 * Class representing a food item
 *
 * @export
 * @class Item
 */
export class Item {
    private _id: number;
    public title: string;
    public image_url: string;
    public description: string;
    public categories: Array<ItemCategory>;
    public allergens: Array<ItemAllergen>;
    public ingredients: Array<ItemIngredient>;

    /**
     * Creates an instance of Item.
     * @param {number} my_id unique (not guaranteed) member identifier
     * @memberof Item
     */
    constructor(my_id: number) {
        this._id = my_id;
    }

    get id(): number { return this._id; }
}
