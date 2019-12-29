namespace rose {

    /**
     * 数据管理类
     * @author Created by pony
     */
    export interface IDataManager<T> {

        /**
         * 设置指定并且通知
         * @param key 
         * @param value 
         */
        setValue<K extends keyof T>(key: K, value: T[K]): void;

        get<K extends keyof T>(key: K): T[K];

        getAll(): T;

        query(search);

        each(callback, context);

        register(selector: () => void, ctx?: any): void;

        unregister(selector: () => void, ctx?: any): void;

        registerByKey<K extends keyof T>(
            key: K,
            selector: (value?: T[K], previousValue?: T[K]) => void,
            ctx?: any
        ): void;

        unregisterByKey<K extends keyof T>(
            key: K,
            selector: (value?: T[K], previousValue?: T[K]) => void,
            ctx?: any
        ): void;

        unregisterAll(): void;

        destroy(): void;
    }
}
