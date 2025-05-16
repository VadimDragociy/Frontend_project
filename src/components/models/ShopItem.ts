import { Events, IShopItem, ILarekCategory } from '../../types';
import { Model } from '../base/Model';

/**
 * Класс модели предмета
 */
class ShopItem extends Model<IShopItem> {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ILarekCategory;
	price: number;
	isOrdered: boolean;

	/**
	 * Добавляем предмет в корзину
	 */
	placeInBasket(): void {
		this.isOrdered = true;
		this.emitChanges(Events.CHANGE_ITEM_IN_BASKET, { isOrdered: this.isOrdered });
	}

	/**
	 * Удаляем предмет из корзины
	 */
	removeFromBasket() {
		this.isOrdered = false;
		this.emitChanges(Events.CHANGE_ITEM_IN_BASKET, { isOrdered: this.isOrdered });
	}
}

export { ShopItem };
