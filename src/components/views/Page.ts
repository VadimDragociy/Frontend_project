import { Events } from '../../types';
import { ensureElement, formatNumber } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

/**
 * Интерфейс страницы
 * @property { number } counter - счётчик элементов в корзине
 * @property { HTMLElement[] } gallery - список предметов для отображения
 * @property { boolean } locked - признак блокировки прокрутки
 */
interface IPage {
	counter: number;
	gallery: HTMLElement[];
	locked: boolean;
}

/**
 * View-класс основной страницы
 */
class Page extends Component<IPage> {
	private readonly _counter: HTMLElement;
	private _gallery: HTMLElement;
	private readonly _wrapper: HTMLElement;
	private _basket: HTMLButtonElement;

	/**
	 * Базовый конструктор
	 * @constructor
	 * @param { HTMLElement } container родительский контейнер
	 * @param { IEvents } events брокер событий
	 */
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		// Используемые элементы на странице
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._gallery = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLButtonElement>('.header__basket');

		// Прослушиваем событие открытия корзины
		this._basket.addEventListener('click', () => {
			this.events.emit(Events.OPEN_BASKET);
		});
	}

	/**
	 * Устанавливаем количество лотов в корзине
	 */
	set counter(value: number) {
		this.setText(this._counter, formatNumber(value));
	}

	/**
	 * Обновляем список карточек
	 */
	set gallery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}

	/**
	 * Обрабатываем блокировку страницы
	 */
	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}

export { Page };
