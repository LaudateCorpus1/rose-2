namespace rose {
    /**
     * 服务基类
     * 在复杂业务场景下用于做业务逻辑封装的一个抽象层
     * @author Created by pony
     */
    export class ServiceContainer {

        private _container: { [index: string]: Service } = Object.create(null);

        constructor() {

        }

        get(key: string): Service {
            return this._container[key];
        }

        register(key: string, service: Service): void {
            this._container[key] = service;
        }

    }

    export const serviceContainer = new ServiceContainer();
}
