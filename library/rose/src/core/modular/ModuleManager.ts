namespace rose {

    /**
     * 模块管理
     * @author Created by pony on 2019/09/01.
     */
    export interface IModuleManager {

        moduleConfig: { [id: string]: IModuleCfgItem };

        modules: IModuleBase[];

        loadingClassMap: any;

        /**
         * 
         * @param type 
         * @param LoadingLayerClass 
         * 
         * 优化：LoadingLayerClass 类型
         */
        registerLoadingClass(type: LoadingModuleTypeEnum, LoadingLayerClass: any): boolean;

        /**
         * 登记模块
         * @param moduleCfgItem 
         */
        registerModule(moduleCfgItem: IModuleCfgItem): boolean;

        popModule(): void;

        start<T extends IModuleParam>(id: string, moduleParam?: T): Promise<void>;
    }

    /**
     * 
     * 模块管理、实现
     * @author Created by pony on 2019/01/01.
     */
    export class ModuleManager implements IModuleManager {

        moduleConfig: { [id: string]: IModuleCfgItem } = {};

        modules: IModuleBase[];

        loadingClassMap: any;

        constructor() {
            this.modules = [];
            this.loadingClassMap = {};
        }

        registerLoadingClass(type: LoadingModuleTypeEnum, LoadingLayerClass: any): boolean {
            this.loadingClassMap[type] = LoadingLayerClass;
            return true;//暂时处理
        };

        start<T extends IModuleParam>(id: string, moduleParam: T = <T>{ fromWhere: 'empty' }): Promise<void> {

            return new Promise((resolve, reject) => {

                const newModuleCfgItem = this._getModuleCfgItem(id);

                //找不到模块
                if (typeof newModuleCfgItem === 'undefined') {
                    _moduleNotFoundFunc(name);
                    reject({
                        c: -1,
                        t: '未找到模块'
                    });
                    return;
                }

                //统一模块验证
                if (!_validModuleFunc(newModuleCfgItem, moduleParam)) {
                    reject({
                        c: -2,
                        t: '统一模块验证失败'
                    });
                    return;
                };

                //验证模块
                if (!newModuleCfgItem.onValid(moduleParam)) {
                    reject({
                        c: -3,
                        t: '模块验证失败'
                    });
                    return;
                }

                const loadingClass = this.loadingClassMap[newModuleCfgItem.loadingType];
                if (typeof loadingClass === 'undefined') {
                    console.error('加载页未注册');
                    reject({
                        c: -4,
                        t: '加载页未找到'
                    });
                    return;
                };

                const loading = new loadingClass();
                loading.show();

                const isSubModule = newModuleCfgItem.isSubModule;
                const isHideUnder = newModuleCfgItem.isHideUnder;

                //数组的第一个元素一定是主模块，后期优化
                //先取出主模块，再操作
                const mainModule = this.modules.shift();

                if (isHideUnder && !isSubModule) {
                    this._destroyModule(mainModule);
                }

                const newModule = new newModuleCfgItem.targetClass();
                newModule.id = id;
                newModule.moduleParam = moduleParam;
                newModule.init();
                newModule.show();

                if (!isHideUnder && !isSubModule) {
                    this._destroyModule(mainModule);
                }

                if (isSubModule) {
                    this.modules.unshift(mainModule);
                    newModule.emitter.once("onClose", this._onCloseHandle, this); //监听关闭事件，关闭后在模块中移除
                }

                this.modules.push(newModule);

                loading.hide();

                resolve(); //成功加载
            });
        };

        private _destroyModule(mainModule: IModuleBase): void {
            if (typeof mainModule !== 'undefined') {

                mainModule.close();
                mainModule.destroy();

                const subModule = this.modules;

                for (let i = subModule.length - 1; i >= 0; i--) {
                    subModule[i].destroy();
                }

                this.modules = [];
            };
        }

        //关闭子模块时处理
        private _onCloseHandle(moduleId: string): void {
            console.log('关闭子模块',moduleId);

            const index = this._getModuleIndexById(moduleId);

            if (index > -1) {
                const subModule = this.modules.splice(index, 1).shift();
                subModule.destroy(); //后期配置是否缓存
            }

        }

        private _getModuleIndexById(moduleId: string): number {

            for (let i = 0, l = this.modules.length; i < l; i++) {
                if (this.modules[i].id === moduleId) {
                    return i;
                }
            }

            return -1;
        }

        private _getModuleCfgItem(id: string): IModuleCfgItem {
            return this.moduleConfig[id];
        }

        popModule(): void {

        };

        /**
         * 获取所有模块
         * 这个接口仅供调试使用
         * 注意获取的是克隆后的所有模块，外部修改不会影响
         */
        getAllModule(): IModuleBase[] {
            return this.modules.slice();
        }

        registerModule(moduleCfgItem: IModuleCfgItem): boolean {
            this.moduleConfig[moduleCfgItem.id] = moduleCfgItem;

            return true;
        };
    }

    /**
     * 
     * 全局模块管理
     * @author Created by pony on 2019/01/01.
     */
    export const ModuleMgr = new ModuleManager();

    //暂时处理
    ModuleMgr.registerLoadingClass(LoadingModuleTypeEnum.EMPTY, class {
        show() { }
        hide() { }
    });
}
