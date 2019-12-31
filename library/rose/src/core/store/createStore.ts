namespace rose {

    export type DataManagersType<S> = {
        [K in keyof S]: IDataManager<S[K]>
    }

    /**
     * 创建 store
     * @author Created by pony
     */
    export function createStore<S>(states: S) {

        if (typeof states !== 'object') {
            throw new Error('Expected the states to be a object.');
        }

        const finalDataManagers: DataManagersType<S> = {} as DataManagersType<S>;

        Object.keys(states).forEach(key => finalDataManagers[key] = new DataManager(states[key]));

        function getDataManager<K extends keyof S>(key: K): DataManagersType<S>[K] {

            if (!finalDataManagers.hasOwnProperty(key)) {
                throw new Error(`${key} state not provided！！！`);
            }

            return finalDataManagers[key];
        }

        return {
            getDataManager
        }

    }

}

