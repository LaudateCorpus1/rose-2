namespace rose {

    /**
     * 
     * 模块配置接口
     * @author Created by pony on 2019/01/01.
     */
    export interface IModuleCfgItem {

        id: string; //name
        isHideUnder: boolean; //移除主模块时机，为 true 时在新模块显示前移除
        isSubModule: boolean; //是否为子模块
        loadingType: LoadingModuleTypeEnum; //枚举加载类型
        targetClass: new () => IModuleBase; //保存模块类
        notOwnRes: boolean;

        reqTask: Function;
        onBeforeShow: Function;
        goto: Function;
        onPreAsync: Function;

        onValid: <T extends IModuleParam>(moduleParam: T) => boolean;
    }

    /**
     * 
     * 模块参数接口
     * @author Created by pony on 2019/01/01.
     */
    export interface IModuleParam {
        fromWhere: string;
    }

    /**
     * 
     * 模块配置项
     * @author Created by pony on 2019/01/01.
     */
    export class ModuleCfgItem implements IModuleCfgItem {

        isHideUnder = false;
        isSubModule = true;
        loadingType: LoadingModuleTypeEnum = LoadingModuleTypeEnum.EMPTY;
        notOwnRes = false;

        targetClass: new () => IModuleBase; //保存模块类

        reqTask: Function; //暂未实现
        onBeforeShow: Function; //暂未实现
        goto: Function; //暂未实现
        onPreAsync: Function; //暂未实现

        onValid: <T extends IModuleParam>(moduleParam: T) => boolean = () => true;//默认

        constructor(public id: string) {
            
        }

    }
}
