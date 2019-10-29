namespace rose {

    /**
     * 
     * 数据代理，控制类
     */
    export class Proxy<T> implements IProxy<T> {

        static RESET_DATA = 'reset_data';
        //默认不进行通知，由于性能原因，尽可能的不要除监听所有数据变化，尽量数据拆分详细
        static CHANGE_DATA = 'change_data';
        static CHANGE_DATA_KEY = 'change_data_';

        autoNotifyAll: boolean;
        isInit: boolean;

        private _autoNotify: boolean; //自动通知
        get autoNotify() { return this._autoNotify };
        set autoNotify(isAuto: boolean) { this._autoNotify = isAuto };

        protected data: T;
        protected emitter: EventEmitter;

        constructor() {
            this._initProp();
        }

        /**
         * 
         * @override
         */
        protected _initProp(): void {
            this._autoNotify = true;
            this.autoNotifyAll = false;
            this.emitter = new EventEmitter();
        }

        init(): void {
            this.isInit = true;
        }

        isAutoNotify(): boolean {
            return this._autoNotify;
        }

        setData(data: T): IProxy<T> {
            this.data = data;
            return this;
        }

        getData(): T {
            return this.data;
        }

        /**
         * 
         * @param key 
         * @param value 
         */
        setValueAndNotify<K extends keyof T>(key: K, value: T[K]): void {

            this.data[key] = value;

            if (!this._autoNotify) {
                return;
            }

            let notifyData: any

            if (Array.isArray(value)) {
                notifyData = value.slice();
            } else if (typeof value === 'object') {
                notifyData = Object.assign({}, value);
            } else {
                notifyData = value;
            }

            this.notifyEvent(Proxy.CHANGE_DATA_KEY + key, notifyData);

            if (this.autoNotifyAll) {
                this.notifyEvent(Proxy.CHANGE_DATA, this.getData());
            }
        };

        notifyEvent(eventName: string, args?: any): void {

            if (!this._autoNotify) {
                return;
            }

            if (args) {
                this.emitter.emit(eventName, args);
                return;
            }

            this.emitter.emit(eventName);
        }

        getValue<K extends keyof T>(key: K): T[K] {
            //考虑引用类型问题，外部不可更改
            return this.data[key];
        };

        getAll() {
            const results = {};

            return results;
        };

        register(selector: (data?: T) => void, ctx: any): void {
            this.emitter.on(Proxy.CHANGE_DATA, selector, ctx);
        };

        unregister(selector: (data?: T) => void, ctx: any): void {
            this.emitter.off(Proxy.CHANGE_DATA, selector, ctx, false);
        };

        registerByKey<K extends keyof T>(key: K | string, selector: (value?: T[K]) => void, ctx: any): void {
            this.emitter.on(Proxy.CHANGE_DATA_KEY + key, selector, ctx);
        };

        unregisterByKey<K extends keyof T>(key: K | string, selector: (value?: T[K]) => void, ctx: any): void {
            this.emitter.off(Proxy.CHANGE_DATA_KEY + key, selector, ctx, false);
        };

        unregisterAll(): void {
            this.emitter.removeAllListeners();
        };

        destroy(): void {
            this.unregisterAll();
        };
    }
}