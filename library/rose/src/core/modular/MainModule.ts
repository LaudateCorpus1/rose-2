namespace rose {

    /**
     * 
     * 主模块
     */
    export class MainModule extends eui.UILayer implements IModuleBase {

        id: string;

        isSubModule = false;

        emitter: EventEmitter;

        moduleParam: IModuleParam;

        constructor() {
            super();
            this._initProp();
        };

        protected _initProp(): void {
            this.emitter = new EventEmitter();
            this.once(egret.Event.ADDED_TO_STAGE, this.onEnterStage, this);
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onExitStage, this);
        }

        init(): void {

        };

        show(): void {
            this.touchEnabled = false;
            layerMgr.initializeGameLayer(this);
        };

        onEnterStage(): void {

        };

        close(): void {
            DisplayUtil.removeFromParent(this);
        };

        onExitStage(): void {

        };

        destroy(): void {

        };
    }
}
