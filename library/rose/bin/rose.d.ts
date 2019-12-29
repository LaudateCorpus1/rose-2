declare namespace rose {
    /**
     *
     * 加载模块样式枚举
     * @author Created by pony on 2019/01/01.
     */
    enum LoadingModuleTypeEnum {
        EMPTY = 0,
        CIRCLE = 1,
        ARMATURE = 2,
    }
    /** 验证模块处理函数*/
    let _validModuleFunc: IValidModuleFunc;
    /** 找不到模块处理函数*/
    let _moduleNotFoundFunc: IModuleNotFoundFunc;
    /**
     * 验证模块函数接口
     */
    interface IValidModuleFunc {
        (modCfgItem: IModuleCfgItem, modParam: IModuleParam): boolean;
    }
    /**
     * 找不到模块时候函数接口
     */
    interface IModuleNotFoundFunc {
        (moduleName: string): void;
    }
    /**
     * 登记模块处理函数
     * @param fn
     */
    function registerValidModuleFunc(fn: IValidModuleFunc): void;
    /**
     * 登记找不到模块处理函数
     * @param fn
     */
    function registerModuleNotFoundFunc(fn: IModuleNotFoundFunc): void;
}
declare namespace rose {
    /**
     * 基于 eui.Component 的 Dialog
     *
     * 对应的 eui 皮肤命名应为 类名 + "Skin"
     * @author Created by pony on 2019/01/01.
     */
    class Dialog extends eui.Component {
        id: string;
        /** 是否铺满*/
        isFull: boolean;
        isMask: boolean;
        isClickMaskClose: boolean;
        maskLayer: egret.Sprite;
        /** 是否居中*/
        isPopupCenter: boolean;
        /** 皮肤标识符，默认类名字加 Skin*/
        skinNameIdentify: any;
        /** 容器标识*/
        protected _containerName: string;
        /** 容器*/
        _container: egret.DisplayObjectContainer;
        emitter: EventEmitter;
        isPlayEffect: boolean;
        /** 打开特效*/
        popupEffect: IDialogEffect;
        /** 关闭特效*/
        closeEffect: IDialogEffect;
        /** 关闭后执行*/
        closeHandler: () => void;
        constructor();
        protected _initProp(): void;
        init(): void;
        show(): void;
        onEnterStage(): void;
        private _showing();
        private _filledWith();
        /**
         * 解析皮肤后、在没有添加到舞台之前
         */
        protected _afterAnalysisSkin(): void;
        /**
         * 打开完成后，调用此方法（如果有弹出动画，则在动画完成后执行）
         */
        protected _onOpened(): void;
        /**
         * 添加事件
         */
        protected _addEvent(): void;
        close(): void;
        onExitStage(): void;
        destroy(): void;
        /**
         * 关闭完成后
         * 如果有关闭动画，则在动画完成后执行，如有 closeHandler 方法调用 closeHandler 后
         */
        protected _onClosed(): void;
        /**
         * 移除事件
         * @private
         */
        protected _removeEvent(): void;
        bringToTop(): void;
        sendToBack(): void;
    }
}
declare namespace rose {
    class EventEmitter {
        private _events;
        private _eventsCount;
        eventNames(): string[];
        listeners(event: string): any[];
        listenerCount(event: string): number;
        emit(event: string, a1?: any, a2?: any, a3?: any, a4?: any, a5?: any): boolean;
        removeListener(event: string, fn?: Function, context?: any): void;
        on(event: string, fn: Function, context?: any): void;
        once(event: string, fn: Function, context?: any): void;
        removeAllListeners(event?: string): void;
        off(event: string, fn?: Function, context?: any): void;
        addListener(event: string, fn: Function, context?: any): void;
        private _addListener(event, fn, context, once);
        private _clearEvent(event);
    }
}
declare namespace rose {
    class GameEventChannel extends EventEmitter {
        static AFTER_CONFIG: string;
        static AFTER_MAIN: string;
    }
    const gameEventChannel: GameEventChannel;
}
declare namespace rose {
    /**
     *
     * 模块配置接口
     * @author Created by pony on 2019/01/01.
     */
    interface IModuleCfgItem {
        id: string;
        isHideUnder: boolean;
        isSubModule: boolean;
        loadingType: LoadingModuleTypeEnum;
        targetClass: new () => IModuleBase;
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
    interface IModuleParam {
        fromWhere: string;
    }
    /**
     *
     * 模块配置项
     * @author Created by pony on 2019/01/01.
     */
    class ModuleCfgItem implements IModuleCfgItem {
        id: string;
        isHideUnder: boolean;
        isSubModule: boolean;
        loadingType: LoadingModuleTypeEnum;
        notOwnRes: boolean;
        targetClass: new () => IModuleBase;
        reqTask: Function;
        onBeforeShow: Function;
        goto: Function;
        onPreAsync: Function;
        onValid: <T extends IModuleParam>(moduleParam: T) => boolean;
        constructor(id: string);
    }
}
declare namespace rose {
    interface IAudioPathHandler {
        (audioKey: string): string;
    }
    function isAudioEnabled(): boolean;
    function setAudioEnabled(isAudio: boolean): void;
    function isBgMusicEnabled(): boolean;
    function setBgMusicEnabled(isBgMusic: boolean): void;
    function registerAudioPathHandler(handler: IAudioPathHandler): void;
    function getAudioPath(audioKey: string): string;
    /** 播放一个音效 */
    function playAudio(audioPath: string, loops?: number): Promise<void | egret.SoundChannel>;
    /** 停止一个音效*/
    function pauseAudio(audioPath: string): void;
    /** 播放一个背景音乐*/
    function playMusic(audioPath: string): void;
    /**
     * 暂停背景音乐
     */
    function pauseMusic(): void;
    /**
     * 恢复背景音乐
     */
    function resumeMusic(): void;
    /**
     * 设置背景音乐音量
     * @param volume
     */
    function setMusicVolume(volume: number): void;
    function pushMusic(audioPath: string, loop?: boolean): void;
    function popMusic(): void;
    function replaceMusic(audioPath: string, loop?: boolean): void;
}
declare namespace rose {
    /**
     * 模块管理
     * @author Created by pony on 2019/09/01.
     */
    interface IModuleManager {
        moduleConfig: {
            [id: string]: IModuleCfgItem;
        };
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
    class ModuleManager implements IModuleManager {
        moduleConfig: {
            [id: string]: IModuleCfgItem;
        };
        modules: IModuleBase[];
        loadingClassMap: any;
        constructor();
        registerLoadingClass(type: LoadingModuleTypeEnum, LoadingLayerClass: any): boolean;
        start<T extends IModuleParam>(id: string, moduleParam?: T): Promise<void>;
        private _destroyModule(mainModule);
        private _onCloseHandle(moduleId);
        private _getModuleIndexById(moduleId);
        private _getModuleCfgItem(id);
        popModule(): void;
        /**
         * 获取所有模块
         * 这个接口仅供调试使用
         * 注意获取的是克隆后的所有模块，外部修改不会影响
         */
        getAllModule(): IModuleBase[];
        registerModule(moduleCfgItem: IModuleCfgItem): boolean;
    }
    /**
     *
     * 全局模块管理
     * @author Created by pony on 2019/01/01.
     */
    const ModuleMgr: ModuleManager;
}
declare namespace rose {
    /**
     *
     * 主模块
     */
    class MainModule extends eui.UILayer implements IModuleBase {
        id: string;
        isSubModule: boolean;
        emitter: EventEmitter;
        moduleParam: IModuleParam;
        constructor();
        protected _initProp(): void;
        init(): void;
        show(): void;
        onEnterStage(): void;
        close(): void;
        onExitStage(): void;
        destroy(): void;
    }
}
declare namespace rose {
    /**
     *
     * 子模块
     */
    class SubModule extends Dialog implements IModuleBase {
        isSubModule: boolean;
        /**
         * 模块参数
         */
        moduleParam: IModuleParam;
    }
}
declare namespace rose {
    /**
     * 创建 createService
     * @author Created by pony
     */
    function createService<S>(service: S): {
        useService: <K extends keyof S>(serviceName: K) => S[K];
    };
}
declare namespace rose {
    /**
     * 服务基类
     * 在复杂业务场景下用于做业务逻辑封装的一个抽象层
     * @author Created by pony
     */
    class Service {
        constructor();
        protected _initProp(): void;
    }
}
declare namespace rose {
    type DataManagersMap<S> = {
        [K in keyof S]: IDataManager<S[K]>;
    };
    /**
     * 创建 store
     * @author Created by pony
     */
    function createStore<S>(states: S): <K extends keyof S>(key: K) => IDataManager<S[K]>;
}
declare namespace rose {
    /**
     * 数据管理类
     * @author Created by pony
     */
    class DataManager<T> implements IDataManager<T> {
        static readonly RESET_DATA: string;
        static readonly CHANGE_DATA: string;
        static readonly CHANGE_DATA_KEY: string;
        private readonly _values;
        protected readonly emitter: EventEmitter;
        constructor(values: T);
        /**
         * 设置指定并且通知
         * @param key
         * @param value
         */
        setValue<K extends keyof T>(key: K, value: T[K]): void;
        get<K extends keyof T>(key: K): T[K];
        getAll(): T;
        query(search: any): {};
        each(callback: any, context: any): void;
        register(selector: () => void, ctx?: any): void;
        unregister(selector: () => void, ctx?: any): void;
        registerByKey<K extends keyof T>(key: K, selector: (value?: T[K], previousValue?: T[K]) => void, ctx?: any): void;
        unregisterByKey<K extends keyof T>(key: K, selector: (value?: T[K], previousValue?: T[K]) => void, ctx?: any): void;
        unregisterAll(): void;
        destroy(): void;
    }
}
declare namespace rose {
    /**
     * 数据管理类
     * @author Created by pony
     */
    interface IDataManager<T> {
        /**
         * 设置指定并且通知
         * @param key
         * @param value
         */
        setValue<K extends keyof T>(key: K, value: T[K]): void;
        get<K extends keyof T>(key: K): T[K];
        getAll(): T;
        query(search: any): any;
        each(callback: any, context: any): any;
        register(selector: () => void, ctx?: any): void;
        unregister(selector: () => void, ctx?: any): void;
        registerByKey<K extends keyof T>(key: K, selector: (value?: T[K], previousValue?: T[K]) => void, ctx?: any): void;
        unregisterByKey<K extends keyof T>(key: K, selector: (value?: T[K], previousValue?: T[K]) => void, ctx?: any): void;
        unregisterAll(): void;
        destroy(): void;
    }
}
declare namespace rose {
    /**
     * 添加一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    function addJSON(fileName: string, dataCfg: any): void;
    /**
     * 获取一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    function getJSONWithFileName(fileName: string): any;
    /**
     * 获取一个json文件中某个id的单条信息
     * @param fileName
     * @param id
     * @returns {Object}
     */
    function getJSONWithFileNameAndID(fileName: string, id: string): any;
}
declare namespace rose {
    /**
     *
     * 模块接口
     * @author Created by pony on 2019/01/01.
     */
    interface IModuleBase {
        id: string;
        isSubModule: boolean;
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
declare namespace rose {
    /**
     * 启动引导
     */
    function boot(gameStage: egret.Stage): Promise<void>;
}
declare namespace rose {
    const InputEventChannel: EventEmitter;
}
declare namespace rose {
    const NetEventChannel: EventEmitter;
}
declare namespace rose {
    const TimerEventChannel: EventEmitter;
}
declare namespace rose {
    interface IDialogEffect {
        (dialog: egret.DisplayObjectContainer, onEnd: () => void): void;
    }
    /** 打开弹窗特效*/
    const dialogShowEaseBackOut: IDialogEffect;
    /** 默认关闭特效*/
    const dialogCloseDefault: IDialogEffect;
}
declare namespace rose {
    /**
     * 层级管理
     * @author Created by peony on 2017/3/02.
     */
    class LayerManager {
        private _gameStage;
        private _gameLayer_;
        private _sceneLayer;
        private _menuLayer;
        private _dlgLayer;
        private _infoLayer_;
        private _msgLayer;
        private _guideLayer;
        private _topLayer;
        /** 初始化*/
        initializeInfoLayer(layer: eui.UILayer): void;
        /** 初始化*/
        initializeGameLayer(layer: eui.UILayer): void;
        /**
         *
         * 清理舞台上 _gameLayer_ 和 _infoLayer_ 以外的显示对象
         */
        clearBag(): void;
        gameStage: egret.Stage;
        readonly scene: eui.UILayer;
        readonly menu: eui.UILayer;
        readonly dlg: eui.UILayer;
        readonly msg: eui.UILayer;
        readonly guide: eui.UILayer;
        readonly top: eui.UILayer;
    }
    const layerMgr: LayerManager;
}
declare namespace net {
    interface IHttpRequestInfoCallFunc {
        (err: Error, data: any): void;
    }
    interface IHttpRequestInfoArgs {
        [index: string]: any;
    }
    interface IHttpRequestInfo {
        requestId: number;
        route: string;
        args: IHttpRequestInfoArgs;
        cb: IHttpRequestInfoCallFunc;
        ctx: any;
    }
    class HttpRequestInfo implements IHttpRequestInfo {
        requestId: number;
        route: string;
        args: IHttpRequestInfoArgs;
        cb: IHttpRequestInfoCallFunc;
        ctx: any;
    }
}
declare namespace net {
    /**
     * get 请求，命名 request
     * post 请求格式有 json、FormData，命名 post4Json post4FormData
     *
     * 为完成功能
     *   添加设置头
     *   post4FormData 请求方法
     */
    class HttpServer {
        static ON_ERROR: string;
        static ON_CLOSE: string;
        static ON_KICK: string;
        static ON_SUCCESS: string;
        static ON_ROUTE_ERROR: string;
        static ON_ROUTE_SUCCESS: string;
        httpHost: string;
        httpPort: string;
        protected _httpUrl: string;
        protected _requestIdCounter: number;
        private _waitingRequestMap;
        constructor();
        protected _initProp(): void;
        /**
         * get 请求
         * @param route
         * @param args
         * @param cb
         * @param ctx
         */
        request(route: string, args: IHttpRequestInfoArgs, cb: IHttpRequestInfoCallFunc, ctx: any): void;
        protected _requestHttpGet(requestInfo: IHttpRequestInfo): void;
        /**
         * json 格式 post 请求
         * @param route
         * @param args
         * @param cb
         * @param ctx
         */
        post4Json(route: string, args: IHttpRequestInfoArgs, cb: IHttpRequestInfoCallFunc, ctx: any): void;
        private _requestPost4Json(requestInfo);
        protected _getRequestInfo(route: string, args: IHttpRequestInfoArgs, cb: IHttpRequestInfoCallFunc, ctx: any): IHttpRequestInfo;
        /**
         * 处理请求结果
         * @param requestInfo
         * @param result
         */
        protected _handleRequestResult(requestInfo: IHttpRequestInfo, result: any): void;
        /**
         *
         * @param evt
         */
        protected _handleRequestError(requestInfo: IHttpRequestInfo, errInfo: egret.IOErrorEvent): void;
        reset(): void;
    }
}
declare namespace rose {
    class Res {
        _initProp(): void;
        getStatusRes(res: string): Promise<any>;
    }
    let R: Res;
}
declare namespace CommonUtil {
    /**
     * 获取对象类名
     * 注意只使用 egret 类型
     */
    function getClassName(target: egret.HashObject): string;
    /**
     * 拼接 get 请求字符串
     * @param {*} argsObj - 待拼接的对象
     * @returns {string} - 拼接成的请求字符串
     */
    function splicingQueryString(argsObj: {
        [index: string]: any;
    }, format?: (v: any) => any): string;
    /**
     * 解析 URL 中参数。
     * 要获取的 key 中不允许有 '=',value 中可以正常解析。如果没有 value 默认为 “0”。<br/>
     * @return {{ [index: string]: string }} 包含URL参数的键值对对象。
     * @author Created by pony on 2019/01/01.
     */
    const getUrlParams: (urlStr?: string) => {
        [index: string]: string;
    };
}
/**
 * 显示对象工具
 * @author Created by pony on 2019/01/01.
 */
declare namespace DisplayUtil {
    /** 删除显示对象、显示对象必须有父级容器*/
    function removeFromParent(disObj: egret.DisplayObject): void;
    function removeAllChildrenFromScratch(disContainer: egret.DisplayObjectContainer): void;
    /** 创建满屏遮罩 -- 废弃*/
    function createMaskFull(color: number, alpha: number, isTouch?: boolean): eui.Rect;
    /** 创建遮罩 -- 废弃*/
    function createMask(color: number, alpha: number, w: number, h: number, isTouch?: boolean): eui.Rect;
    /**  -- 废弃 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。*/
    function createBitmapByName(name: string): egret.Bitmap;
}
declare namespace logger {
    let log: (...args) => void;
    let debug: (...args) => void;
    let info: (...args) => void;
    let warn: (...args) => void;
    let error: (...args) => void;
    /** 设置日志等级*/
    function setLvl(lvl: number): void;
}
declare namespace MathsUtil {
    /** 获取百分比*/
    function numPercentage(curProgress: number, totalProgress: number, ratio: number): number;
    /**
     * 给定 start 和 end 范围随机之间的整数，包括 start 和 end
     */
    function rangeRandom(start: number, end: number): number;
    function clamp(e: number, t: number, i: number): number;
    /** 弧度转度*/
    const radiansToDegrees: (radian: number) => number;
    /** 度转弧度*/
    const degreesToRadians: (deg: number) => number;
    /** 根据向量转换角度*/
    const pointAngle: (strat: egret.Point, end: egret.Point) => number;
    /** 根据向量转换弧度*/
    const pointRadians: (strat: egret.Point, end: egret.Point) => number;
    const angleToSpeed: (t: number) => egret.Point;
    /** 距离*/
    const measureDistance: (p1: egret.Point, p2: egret.Point) => number;
    function radiansToSpeed(e: any): egret.Point;
    function angleSpeed(e: any, t: any): egret.Point;
    function getCirclePoint(t: any, i: any, n: any): any;
    function getCirclePoint2(e: any, t: any, i: any): any;
    function getBezierY(e: any, t: any): number;
}
declare class MovieClipUtils {
    static depot: {};
    /**
     * @param resPath 路径
     * @param actName 动作名称
     * @param comFunc 回调函数
     * @param ctx 执行域(this)
    */
    static createMovieClip(resPath: string, actName: string, comFunc: (mc: egret.MovieClip) => void, ctx: any): void;
}
declare namespace rose {
    /** 该 api 只保留了在 h5 端常用方法 */
    /**
     * 下一个主循环执行一次。
     * 这个和nodejs不同的是，多了执行回调的上下文和传参。
     * @param cb
     * @param ctx
     */
    function nextTick(cb: (...args) => void, ctx?: any, ...args: any[]): void;
}
declare namespace utils {
    class TimedTaskTicker {
        constructor();
        /**
         * @private
         * ticker 花销的时间
         */
        private costEnterFrame;
        /**
         * @private
         * 是否被暂停
         */
        private isPaused;
        /**
         * @private
         */
        private callBackList;
        /**
         * @private
         */
        private thisObjectList;
        startTick(callBack: (timeStamp: number) => boolean, thisObject: any): void;
        stopTick(callBack: (timeStamp: number) => boolean, thisObject: any): void;
        /**
         * @private
         */
        private getTickIndex(callBack, thisObject);
        /**
         * @private
         *
         */
        private concatTick();
        /**
         * 暂停心跳
         */
        pause(): void;
        /**
         * 恢复心跳
         */
        resume(): void;
        /**
         * @private
         * 执行一次刷新
         */
        update(): void;
    }
    /**
    * 心跳计时器单例
    */
    const ticker: TimedTaskTicker;
    /**
     * @private
     * 启动心跳计时器。
     */
    function startTimedTaskTicker(ticker: TimedTaskTicker): void;
}
