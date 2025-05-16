import _ from 'lodash';
import { Events, IAppState, IShopItem, IOrder } from '../../types';
import { Model } from '../base/Model';
import { IEvents } from '../base/events';
import { ShopItem } from './ShopItem';
import { Order } from './Order';

/**
 * Класс модели приложения
 */
class AppState extends Model<IAppState> {
	private _catalog: IShopItem[];
	private _order: IOrder;
	private _preview: IShopItem;

	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { Partial<IAppState> } data используемые моделью данные
	 * @param { IEvents } events объект брокера событий
	 */
	constructor(data: Partial<IAppState>, events: IEvents) {
		super(data, events);
	}

	set catalog(items: IShopItem[]) {
		this._catalog = items.map((item) => new ShopItem(item, this.events));
		this.emitChanges(Events.LOAD_ITEMS, { catalog: this.catalog });
	}

	get catalog(): IShopItem[] {
		return this._catalog;
	}

	get basket(): IShopItem[] {
		return this._catalog.filter((item) => item.isOrdered);
	}

	get order(): IOrder {
		return this._order;
	}

	get preview(): IShopItem {
		return this._preview;
	}

	set preview(value: IShopItem) {
		this._preview = value;
		this.emitChanges('preview:changed', this.preview);
	}

	/**
	 * Проверяем, что лот находится в каталоге
	 * @param { IShopItem } item исследуемый предмет
	 * @returns признак наличия предмета в корзине
	 */
	isShopItemInBasket(item: IShopItem): boolean {
		return item.isOrdered;
	}

	/**
	 * Очищаем корзину
	 */
	clearBasket(): void {
		this.basket.forEach((lot) => lot.removeFromBasket());
	}

	/**
	 * Получить общую стоимость товаров в корзине
	 * @returns стоимость корзины
	 */
	getTotalAmount(): number {
		return this.basket.reduce((a, c) => a + c.price, 0);
	}

	/**
	 * Получить список индексов в корзине
	 * @returns список индексов в корзине
	 */
	getBasketIds(): string[] {
		return this.basket.map((item) => item.id);
	}

	/**
	 * Получить количество товаров в корзине
	 * @returns количество товаров в корзине
	 */
	getBasketLength(): number {
		return this.basket.length;
	}

	/**
	 * Инициализируем объект заказа
	 */
	initOrder(): IOrder {
		this._order = new Order({}, this.events);
		this.order.clearOrder();
		return this.order;
	}
}

export { AppState };
