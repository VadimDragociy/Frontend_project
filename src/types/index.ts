import { IOrderContactsForm } from '../components/views/ContactsForm';
import { IOrderDeliveryForm } from '../components/views/DeliveryForm';

enum Events {
	LOAD_ITEMS = 'catalog:changed', // подгружаем доступные лоты
	OPEN_ITEM = 'card:open', // открываем карточку лота для просмотра
	OPEN_BASKET = 'basket:open', // открываем корзину
	CHANGE_ITEM_IN_BASKET = 'lot:changed', // добавляем/удаляем лот из корзины
	VALIDATE_ORDER = 'formErrors:changed', // проверяем форму отправки
	OPEN_FIRST_ORDER_PART = 'order_payment:open', // начинаем оформление заказа
	FINISH_FIRST_ORDER_PART = 'order:submit', // заполнили первую форму
	OPEN_SECOND_ORDER_PART = 'order_contacts:open', // продолжаем оформление заказа
	FINISH_SECOND_ORDER_PART = 'contacts:submit', // заполнили первую форму
	PLACE_ORDER = 'order:post', // завершаем заказ
	SELECT_PAYMENT = 'payment:changed', // выбираем способ оплаты
	INPUT_ORDER_ADDRESS = 'order.address:change', // изменили адрес доставки
	INPUT_ORDER_EMAIL = 'contacts.email:change', // изменили почту для связи
	INPUT_ORDER_PHONE = 'contacts.phone:change', // изменили телефон для связи
	OPEN_MODAL = 'modal:open', // блокировка при открытии модального окна
	CLOSE_MODAL = 'modal:close', // снятие блокировки при закрытии модального окна
}

/**
 * Доступные категории карточек
 */
type ILarekCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

/**
 * Интерфейс лота из Postman
 * @property { string } id - идентификатор лота
 * @property { string } title - заголовок лота
 * @property { string } description - описание лота
 * @property { string } image - полный путь до файла картинки лота
 * @property { ILarekCategory } category - категория лота
 * @property { number } price - цена лота
 */
interface ILotItem {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ILarekCategory;
	price: number | null;
}

/**
 * Интерфейс отслеживания карточки
 * @property { boolean } isOrdered - признак включения в заказ
 * @method placeInBasket - добавляем предмет в корзину
 * @method removeFromBasket - удаляем предмет из корзины
 */
interface ILarek {
	isOrdered: boolean;
	placeInBasket: () => void;
	removeFromBasket: () => void;
}

/**
 * Интерфейс карточки в приложении
 */
type IShopItem = ILotItem & ILarek;

/**
 Доступные категории платежей
 */
type IPaymentType = 'card' | 'cash';

/**
 * Полный интерфейс формы
 */
type IOrderForm = IOrderDeliveryForm & IOrderContactsForm;

/**
 * Интерфейс API
 * @property { string[] } items - индексы покупаемых лотов
 * @property { number } total - общая стоимость заказа
 */
interface IOrderAPI extends IOrderForm {
	items: string[];
	total: number;
}

/**
 * Полный интерфейс формы
 * @property { IShopItem[] } items - объекты лотов в корзине
 * @method validateOrder - проверка полей формы
 * @method clearOrder - обнуляем поля заказа
 * @method validatePayment - проверяем способ оплаты
 * @method validateAddress - проверяем адрес доставки
 * @method validateEmail - проверяем почту
 * @method validatePhone - проверяем телефон
 * @method postOrder - завершаем заказ
 */
interface IOrder extends IOrderForm {
	items: IShopItem[];
	validateOrder(): void;
	clearOrder(): void;
	validatePayment(): void;
	validateAddress(): void;
	validateEmail(): void;
	validatePhone(): void;
	postOrder(): void;
}

type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

type CatalogChangeEvent = {
	catalog: IShopItem[];
};

/**
 * Интерфейс модели всего приложения
 * @property {IShopItem[]} catalog - список доступных лотов
 * @property {IShopItem[]} basket - список лотов в корзине
 * @property {IOrder} order - объект заказа
 * @property {IShopItem} preview - лот для модального окна
 * @method isLotInBasket - проверяем, что лот находится в каталоге
 * @method clearBasket - очищаем корзину
 * @method getTotalAmount - получить общую стоимость товаров в корзин
 * @method getBasketIds - получить список индексов в корзине
 * @method getBasketLength - получить количество товаров в корзине
 * @method initOrder - инициализируем объект заказа
 */
interface IAppState {
	catalog: IShopItem[];
	basket: IShopItem[];
	order: IOrder;
	preview: IShopItem;
	isLotInBasket(item: IShopItem): boolean;
	clearBasket(): void;
	getTotalAmount(): number;
	getBasketIds(): number;
	getBasketLength(): number;
	initOrder(): IOrder;
}

export {
	ILarekCategory,
	ILotItem,
	ILarek,
	IShopItem,
	IPaymentType,
	IOrderDeliveryForm,
	IOrderForm,
	IFormErrors,
	IOrder,
	IAppState,
	CatalogChangeEvent,
	IOrderAPI,
	Events,
};
