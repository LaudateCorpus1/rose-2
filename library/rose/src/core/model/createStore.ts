namespace rose {

    export type DataManagersMap<S> = {
        [K in keyof S]: IDataManager<S[K]>
    }

    export function createStore<S>(states: S) {

        if (typeof states !== 'object') {
            throw new Error('Expected the states to be a object.');
        }

        const finalDataManagers: DataManagersMap<S> = {} as DataManagersMap<S>;

        Object.keys(states).forEach(key => finalDataManagers[key] = new DataManager(states[key]));

        return function getDataManager<K extends keyof S>(key: K): DataManagersMap<S>[K] {

            if (finalDataManagers.hasOwnProperty(key)) {
                return finalDataManagers[key];
            }

        }

    }

}

