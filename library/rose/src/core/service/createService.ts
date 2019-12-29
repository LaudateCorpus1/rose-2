namespace rose {

    /**
     * 创建 createService 
     * @author Created by pony
     */
    export function createService<S>(service: S) {

        function useService<K extends keyof S>(serviceName: K): S[K] {
            return service[serviceName];
        }

        return {
            useService
        }
    }
}
