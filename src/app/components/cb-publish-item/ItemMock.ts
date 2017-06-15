import { Item } from './Item';
import { ItemCategory } from './Category';
import { ItemIngredient } from './Ingredient';
import { ItemAllergen } from './Allergen';

export let itemsMock: Array<Item> = [];

const item_amount: number = 15;
const subitem_amount: number = 3;
// generate mock items
for (let mock_idx = 0; mock_idx < item_amount; mock_idx++) {
  var item = new Item(mock_idx);
  item.title = `food item ${mock_idx}`;
  item.description = `Lorem ipsum of ${mock_idx}`;
  item.categories = [];
  item.ingredients = [];
  item.allergens = [];
  for (let sub_idx = 0; sub_idx < subitem_amount; sub_idx++) {
    var categ = new ItemCategory();
    categ.title = `cat ${mock_idx}.${sub_idx}`;
    var aller = new ItemAllergen();
    aller.title = `all ${mock_idx}.${sub_idx}`;
    var ingre = new ItemIngredient();
    ingre.title = `ing ${mock_idx}.${sub_idx}`;
    item.categories.push(categ);
    item.allergens.push(aller);
    item.ingredients.push(ingre);
  }
  item.image_url = "http://bulma.io/images/placeholders/96x96.png";
  itemsMock.push(item);
}
