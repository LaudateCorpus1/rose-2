namespace rose {

    /**
     * 服务器容器接口
     */
    export interface IServiceContainerMap {

    }

    /**
     * 服务基类 -- 简单实现，后期优化
     * 在复杂业务场景下用于做业务逻辑封装的一个抽象层
     * @author Created by pony
     */
    export class ServiceContainer<S extends IServiceContainerMap> {

        private _container: S = Object.create(null);

        get<K extends keyof S>(key: K): S[K] {
            return this._container[key];
        }

        register<K extends keyof S>(key: K, service: S[K]): void {
            this._container[key] = service;
        }

    }
}
