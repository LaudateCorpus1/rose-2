namespace rose {

    /**
     * 
     * 加载模块样式枚举
     * @author Created by pony on 2019/01/01.
     */
    export enum LoadingModuleTypeEnum {
        EMPTY,//不显示加载
        CIRCLE,
        ARMATURE
    }

    /** 验证模块处理函数*/
    export let _validModuleFunc: IValidModuleFunc = () => true;

    /** 找不到模块处理函数*/
    export let _moduleNotFoundFunc: IModuleNotFoundFunc = modName => console.error(`${modName}模块未注册`);

    /**
     * 验证模块函数接口
     */
    export interface IValidModuleFunc {
        (modCfgItem: IModuleCfgItem, modParam: IModuleParam): boolean;
    }

    /**
     * 找不到模块时候函数接口
     */
    export interface IModuleNotFoundFunc {
        (moduleName: string): void
    }

    /**
     * 登记模块处理函数
     * @param fn
     */
    export function registerValidModuleFunc(fn: IValidModuleFunc): void {
        _validModuleFunc = fn;
    };

    /**
     * 登记找不到模块处理函数
     * @param fn 
     */
    export function registerModuleNotFoundFunc(fn: IModuleNotFoundFunc): void {
        _moduleNotFoundFunc = fn;
    };
}
