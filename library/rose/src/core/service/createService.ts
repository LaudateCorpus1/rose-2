namespace rose {

    export type ServiceConfigType = { [index: string]: new () => Service };

    // export type serviceContainerType<A extends ServiceConfigType> = {
    //     [K in keyof A]: InstanceType<A[K]>
    // }

    /**
     * 创建 createService 
     * @author Created by pony
     */
    export function createService<S extends ServiceConfigType>(service: S) {

        if (typeof service !== 'object') {
            throw new Error('Expected the service to be a object.');
        }

        let isInitialize = false;

        const serviceContainer = {} as any;

        function use<K extends keyof S>(serviceName: K): InstanceType<S[K]> {

            if (!serviceContainer.hasOwnProperty(serviceName)) {
                throw new Error(`${serviceName} service not provided！！！`);
            }

            return serviceContainer[serviceName];
        }

        function initialize() {

            if (isInitialize) return;
            isInitialize = true;

            Object.keys(service).forEach(key => {
                const serviceClass = service[key];
                serviceContainer[key] = new serviceClass();
            });

            service = null;
        }

        // gameService
        return {
            initialize,
            use
        }
    }
}
