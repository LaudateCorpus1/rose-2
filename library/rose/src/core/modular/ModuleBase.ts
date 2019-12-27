namespace rose {

    /**
     * 
     * 模块接口
     * @author Created by pony on 2019/01/01.
     */
    export interface IModuleBase {

        id: string;

        isSubModule: boolean; //是否为子模块

        /**
         * 事件
         */
        emitter: EventEmitter;

        /**
         * 模块参数
         */
        moduleParam: IModuleParam;

        /**
         * 初始化
         */
        init(): void;

        /**
         * 显示
         */
        show(): void;

        /**
         * 
         * 进入舞台
         */
        onEnterStage(): void;

        /**
         * 退出舞台
         */
        onExitStage(): void;

        /**
         * 关闭
         */
        close(): void;

        /**
         * 析构
         */
        destroy(): void;
    }
}
