import { Api, ApiListResponse } from './base/api';
import { IShopItem, IOrderAPI } from '../types';

/**
 * Интерфейс API для сервиса web-larek
 * @method getLarekItem - получить информацию по конкретному предмету
 * @method getLarekItemList - выгрузить все доступные предметы
 * @method postOrderShopItems - отправить на сервер запрос на оформление заказа
 */
interface ILarekAPI {
	getLarekItem: (id: string) => Promise<IShopItem>;
	getLarekItemList: () => Promise<IShopItem[]>;
	postOrderShopItems: (order: IOrderAPI) => Promise<IOrderResult>;
}

/**
 * Интерфейс ответа на post запроса на оформление заказа
 * @property {string} id - идентификатор заказа
 * @property {number} total - общая стоимость заказа
 */
interface IOrderResult {
	id: string;
	total: number;
}

/**
 * Класс API для сервиса web-larek
 */
class LarekAPI extends Api implements ILarekAPI {
	private readonly cdn: string;

	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { string } cdn используемый домен со статикой
	 * @param { string } baseUrl используемый домен сервера
	 * @param { RequestInit } options параметры запроса
	 */
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	/**
	 * Получить информацию по конкретному предмету
	 * @param { string } id идентификатор предмета
	 * @returns { Promise<IShopItem> } объект предмета
	 */
	getLarekItem(id: string): Promise<IShopItem> {
		return this.get(`/product/${id}`).then((item: IShopItem) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	/**
	 * Выгрузить все доступные лоты
	 * @returns { Promise<IShopItem[]> } объекты лотов
	 */
	getLarekItemList(): Promise<IShopItem[]> {
		return this.get('/product/').then((data: ApiListResponse<IShopItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	/**
	 * Отправить на сервер запрос на оформление заказа
	 * @param { IOrderAPI } order данные запроса
	 * @returns { Promise<IOrderResult> } результат запроса
	 */
	postOrderShopItems(order: IOrderAPI): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}

export { LarekAPI };
