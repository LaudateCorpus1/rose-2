namespace rose {

    /**
     * 数据管理类
     * @author Created by pony
     */
    export class DataManager<T> implements IDataManager<T>{

        static readonly RESET_DATA = 'reset_data';

        static readonly CHANGE_DATA = 'change_data';

        static readonly CHANGE_DATA_KEY = 'change_data_';

        private readonly _values: T;

        protected readonly emitter: EventEmitter;

        constructor(values: T) {

            this._values = values;

            this.emitter = new EventEmitter();
        };

        /**
         * 设置指定并且通知
         * @param key 
         * @param value 
         */
        setValue<K extends keyof T>(key: K, value: T[K]): void {

            const previousValue = this._values[key];

            this._values[key] = value;

            this.emitter.emit(DataManager.CHANGE_DATA_KEY + key, value, previousValue);

            this.emitter.emit(DataManager.CHANGE_DATA);
        };

        get<K extends keyof T>(key: K): T[K] {

            const values = this._values;

            return values[key];
        }

        getAll() {

            const results = {} as T;

            for (var key in this._values) {
                if (this._values.hasOwnProperty(key)) {
                    results[key] = this._values[key];
                }
            }

            return results;
        };

        query(search) {

            const results = {};

            return results;
        }

        each(callback, context) {

        };

        register(selector: () => void, ctx?: any): void {
            this.emitter.on(DataManager.CHANGE_DATA, selector, ctx);
        };

        unregister(selector: () => void, ctx?: any): void {
            this.emitter.off(DataManager.CHANGE_DATA, selector, ctx);
        };

        registerByKey<K extends keyof T>(
            key: K,
            selector: (value?: T[K], previousValue?: T[K]) => void,
            ctx?: any
        ): void {
            this.emitter.on(DataManager.CHANGE_DATA_KEY + key, selector, ctx);
        };

        unregisterByKey<K extends keyof T>(
            key: K,
            selector: (value?: T[K], previousValue?: T[K]) => void,
            ctx?: any
        ): void {
            this.emitter.off(DataManager.CHANGE_DATA_KEY + key, selector, ctx);
        };

        unregisterAll(): void {
            this.emitter.removeAllListeners();
        };

        destroy(): void {
            this.unregisterAll();
        };
    }
}
