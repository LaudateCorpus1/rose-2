var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var rose;
(function (rose) {
    /**
     *
     * 加载模块样式枚举
     * @author Created by pony on 2019/01/01.
     */
    var LoadingModuleTypeEnum;
    (function (LoadingModuleTypeEnum) {
        LoadingModuleTypeEnum[LoadingModuleTypeEnum["EMPTY"] = 0] = "EMPTY";
        LoadingModuleTypeEnum[LoadingModuleTypeEnum["CIRCLE"] = 1] = "CIRCLE";
        LoadingModuleTypeEnum[LoadingModuleTypeEnum["ARMATURE"] = 2] = "ARMATURE";
    })(LoadingModuleTypeEnum = rose.LoadingModuleTypeEnum || (rose.LoadingModuleTypeEnum = {}));
    /** 验证模块处理函数*/
    rose._validModuleFunc = function () { return true; };
    /** 找不到模块处理函数*/
    rose._moduleNotFoundFunc = function (modName) { return console.error(modName + "\u6A21\u5757\u672A\u6CE8\u518C"); };
    /**
     * 登记模块处理函数
     * @param fn
     */
    function registerValidModuleFunc(fn) {
        rose._validModuleFunc = fn;
    }
    rose.registerValidModuleFunc = registerValidModuleFunc;
    ;
    /**
     * 登记找不到模块处理函数
     * @param fn
     */
    function registerModuleNotFoundFunc(fn) {
        rose._moduleNotFoundFunc = fn;
    }
    rose.registerModuleNotFoundFunc = registerModuleNotFoundFunc;
    ;
})(rose || (rose = {}));
var rose;
(function (rose) {
    //创建一个满屏 mask 
    var _createDialogMask = function (isTouch, alpha) {
        if (isTouch === void 0) { isTouch = true; }
        if (alpha === void 0) { alpha = 0.4; }
        var dialogMask = new egret.Sprite();
        dialogMask.graphics.beginFill(0, alpha);
        dialogMask.graphics.drawRect(0, 0, rose.layerMgr.gameStage.stageWidth, rose.layerMgr.gameStage.stageHeight);
        dialogMask.graphics.endFill();
        dialogMask.touchEnabled = isTouch;
        return dialogMask;
    };
    /**
     * 基于 eui.Component 的 Dialog
     *
     * 对应的 eui 皮肤命名应为 类名 + "Skin"
     * @author Created by pony on 2019/01/01.
     */
    var Dialog = (function (_super) {
        __extends(Dialog, _super);
        function Dialog() {
            var _this = _super.call(this) || this;
            /** 是否铺满*/
            _this.isFull = false;
            _this.isMask = true;
            _this.isClickMaskClose = true;
            /** 是否居中*/
            _this.isPopupCenter = true;
            /** 容器标识*/
            _this._containerName = 'dlg';
            //是否播放特效
            _this.isPlayEffect = false;
            _this._initProp();
            return _this;
        }
        ;
        Dialog.prototype._initProp = function () {
            this.emitter = new rose.EventEmitter();
            this.once(egret.Event.ADDED_TO_STAGE, this.onEnterStage, this);
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onExitStage, this);
        };
        Dialog.prototype.init = function () {
        };
        ;
        Dialog.prototype.show = function () {
            this._showing();
        };
        Dialog.prototype.onEnterStage = function () {
        };
        ;
        Dialog.prototype._showing = function () {
            var _this = this;
            if (typeof this._container === 'undefined') {
                this._container = rose.layerMgr[this._containerName];
            }
            if (this.isFull) {
                this._filledWith();
            }
            else if (this.isMask) {
                this.maskLayer = _createDialogMask(this.isClickMaskClose);
                this._container.addChild(this.maskLayer);
            }
            if (!this.isFull && this.isPopupCenter) {
                this.horizontalCenter = '0';
                this.verticalCenter = '0';
            }
            var complete = function () {
                _this._afterAnalysisSkin();
                _this._container.addChild(_this);
                if (_this.isPlayEffect && _this.popupEffect) {
                    _this.popupEffect(_this, function () { _this._onOpened(); });
                }
                else {
                    _this._onOpened();
                }
            };
            this.once(egret.Event.COMPLETE, complete, this);
            if (typeof this.skinNameIdentify === 'undefined') {
                var className = CommonUtil.getClassName(this);
                this.skinNameIdentify = className.slice(className.lastIndexOf('.') + 1) + 'Skin';
            }
            this.skinName = this.skinNameIdentify;
        };
        Dialog.prototype._filledWith = function () {
            this.top = this.bottom = this.left = this.right = 0;
        };
        /**
         * 解析皮肤后、在没有添加到舞台之前
         */
        Dialog.prototype._afterAnalysisSkin = function () {
        };
        /**
         * 打开完成后，调用此方法（如果有弹出动画，则在动画完成后执行）
         */
        Dialog.prototype._onOpened = function () {
            this._addEvent();
        };
        /**
         * 添加事件
         */
        Dialog.prototype._addEvent = function () {
            if (this.isMask && this.isClickMaskClose) {
                this.maskLayer.once(egret.TouchEvent.TOUCH_TAP, this.close, this);
            }
        };
        ;
        Dialog.prototype.close = function () {
            var _this = this;
            var complete = function () {
                _this._removeEvent();
                DisplayUtil.removeFromParent(_this);
                DisplayUtil.removeFromParent(_this.maskLayer);
                _this.closeHandler && _this.closeHandler();
                _this._onClosed();
                _this.emitter.emit('onClose', _this.id);
            };
            if (this.isPlayEffect && this.closeEffect) {
                this.closeEffect(this, complete);
            }
            else {
                complete();
            }
        };
        Dialog.prototype.onExitStage = function () {
        };
        ;
        Dialog.prototype.destroy = function () {
            this.emitter.emit('onDestroy', this.id);
        };
        ;
        /**
         * 关闭完成后
         * 如果有关闭动画，则在动画完成后执行，如有 closeHandler 方法调用 closeHandler 后
         */
        Dialog.prototype._onClosed = function () {
        };
        /**
         * 移除事件
         * @private
         */
        Dialog.prototype._removeEvent = function () {
        };
        ;
        Dialog.prototype.bringToTop = function () {
        };
        ;
        Dialog.prototype.sendToBack = function () {
        };
        ;
        return Dialog;
    }(eui.Component));
    rose.Dialog = Dialog;
    __reflect(Dialog.prototype, "rose.Dialog");
})(rose || (rose = {}));
var rose;
(function (rose) {
    var EventEmitter = (function () {
        function EventEmitter() {
            this._events = Object.create(null);
            this._eventsCount = 0;
        }
        EventEmitter.prototype.eventNames = function () {
            if (this._eventsCount === 0)
                return [];
            var events = this._events;
            // const names: Array<string> = Object.keys(events);
            // names.concat(Object.getOwnPropertySymbols(events));
            return Object.keys(events);
            // return names;
        };
        ;
        EventEmitter.prototype.listeners = function (event) {
            var handlers = this._events[event];
            if (!handlers)
                return [];
            var ee = [];
            for (var i = 0, l = handlers.length; i < l; i++) {
                ee[i] = handlers[i].fn;
            }
            return ee;
        };
        ;
        EventEmitter.prototype.listenerCount = function (event) {
            var listeners = this._events[event];
            if (!listeners)
                return 0;
            return listeners.length;
        };
        ;
        EventEmitter.prototype.emit = function (event, a1, a2, a3, a4, a5) {
            var listeners = this._events[event];
            if (!listeners)
                return false;
            var onceList = [];
            for (var i = 0, length_1 = listeners.length; i < length_1; i++) {
                var eventBin = listeners[i];
                if (eventBin.once) {
                    onceList.push(eventBin);
                }
                switch (arguments.length) {
                    case 1:
                        eventBin.fn.call(eventBin.context);
                        break;
                    case 2:
                        eventBin.fn.call(eventBin.context, a1);
                        break;
                    case 3:
                        eventBin.fn.call(eventBin.context, a1, a2);
                        break;
                    case 4:
                        eventBin.fn.call(eventBin.context, a1, a2, a3);
                        break;
                    case 5:
                        eventBin.fn.call(eventBin.context, a1, a2, a3, a4);
                        break;
                    case 6:
                        eventBin.fn.call(eventBin.context, a1, a2, a3, a4, a5);
                        break;
                    default:
                        console.error('>>>更多参数请使用数组实现!');
                }
            }
            while (onceList.length) {
                var onceEventBin = onceList.pop();
                this.removeListener(event, onceEventBin.fn, onceEventBin.context);
            }
            return true;
        };
        ;
        EventEmitter.prototype.removeListener = function (event, fn, context) {
            var listeners = this._events[event];
            if (!listeners)
                return;
            if (!fn) {
                this._clearEvent(event);
                return;
            }
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i].fn === fn && listeners[i].context === context) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        ;
        EventEmitter.prototype.on = function (event, fn, context) {
            this._addListener(event, fn, context, false);
        };
        ;
        EventEmitter.prototype.once = function (event, fn, context) {
            this._addListener(event, fn, context, true);
        };
        ;
        EventEmitter.prototype.removeAllListeners = function (event) {
            if (event) {
                if (this._events[event]) {
                    this._clearEvent(event);
                }
            }
            else {
                this._events = Object.create(null);
                this._eventsCount = 0;
            }
        };
        ;
        EventEmitter.prototype.off = function (event, fn, context) {
            this.removeListener(event, fn, context);
        };
        EventEmitter.prototype.addListener = function (event, fn, context) {
            this.on(event, fn, context);
        };
        EventEmitter.prototype._addListener = function (event, fn, context, once) {
            if (typeof fn !== 'function') {
                throw new TypeError('The listener must be a function');
            }
            var listener = { fn: fn, context: context, once: once }; // 优化时加入对象池功能
            var list = this._events[event];
            if (!list) {
                list = this._events[event] = [];
                this._eventsCount++;
            }
            list.push(listener);
        };
        ;
        EventEmitter.prototype._clearEvent = function (event) {
            --this._eventsCount;
            delete this._events[event];
        };
        return EventEmitter;
    }());
    rose.EventEmitter = EventEmitter;
    __reflect(EventEmitter.prototype, "rose.EventEmitter");
})(rose || (rose = {}));
var rose;
(function (rose) {
    var GameEventChannel = (function (_super) {
        __extends(GameEventChannel, _super);
        function GameEventChannel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameEventChannel.AFTER_CONFIG = "afterConfig";
        GameEventChannel.AFTER_MAIN = "afterMain";
        return GameEventChannel;
    }(rose.EventEmitter));
    rose.GameEventChannel = GameEventChannel;
    __reflect(GameEventChannel.prototype, "rose.GameEventChannel");
    rose.gameEventChannel = new GameEventChannel();
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     *
     * 模块配置项
     * @author Created by pony on 2019/01/01.
     */
    var ModuleCfgItem = (function () {
        function ModuleCfgItem(id) {
            this.id = id;
            this.isHideUnder = false;
            this.isSubModule = true;
            this.loadingType = rose.LoadingModuleTypeEnum.EMPTY;
            this.notOwnRes = false;
            this.onValid = function () { return true; }; //默认
        }
        return ModuleCfgItem;
    }());
    rose.ModuleCfgItem = ModuleCfgItem;
    __reflect(ModuleCfgItem.prototype, "rose.ModuleCfgItem", ["rose.IModuleCfgItem"]);
})(rose || (rose = {}));
var rose;
(function (rose) {
    var _volume = 1;
    var _audioEnabled = true; //音效默认打开
    var _bgMusicEnabled = false; //背景音乐默认关闭
    var _playingMusic;
    var _playingMusicChannel;
    var _audioPathHandler;
    function isAudioEnabled() {
        return _audioEnabled;
    }
    rose.isAudioEnabled = isAudioEnabled;
    ;
    function setAudioEnabled(isAudio) {
        _audioEnabled = isAudio;
    }
    rose.setAudioEnabled = setAudioEnabled;
    ;
    function isBgMusicEnabled() {
        return _bgMusicEnabled;
    }
    rose.isBgMusicEnabled = isBgMusicEnabled;
    ;
    function setBgMusicEnabled(isBgMusic) {
        _bgMusicEnabled = isBgMusic;
    }
    rose.setBgMusicEnabled = setBgMusicEnabled;
    ;
    function registerAudioPathHandler(handler) {
        _audioPathHandler = handler;
    }
    rose.registerAudioPathHandler = registerAudioPathHandler;
    ;
    function getAudioPath(audioKey) {
        return _audioPathHandler ? _audioPathHandler(audioKey) : audioKey;
    }
    rose.getAudioPath = getAudioPath;
    ;
    /** 播放一个音效 */
    function playAudio(audioPath, loops) {
        if (loops === void 0) { loops = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var soundEffect, soundEffectChannel, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isAudioEnabled()) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rose.R.getStatusRes(getAudioPath(audioPath))];
                    case 2:
                        soundEffect = _a.sent();
                        soundEffect.type = egret.Sound.EFFECT;
                        soundEffectChannel = soundEffect.play(0, loops);
                        soundEffectChannel.volume = _volume;
                        return [2 /*return*/, Promise.resolve(soundEffectChannel)];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    }
    rose.playAudio = playAudio;
    ;
    /** 停止一个音效*/
    function pauseAudio(audioPath) {
    }
    rose.pauseAudio = pauseAudio;
    ;
    /** 播放一个背景音乐*/
    function playMusic(audioPath) {
        if (isBgMusicEnabled()) {
            rose.R.getStatusRes(getAudioPath(audioPath)).then(function (music) {
                pauseMusic();
                _playingMusic = music;
                _playingMusic.type = egret.Sound.MUSIC;
                resumeMusic();
            }).catch(function (err) {
                console.error('播放背景音乐失败>>>', err);
            });
        }
    }
    rose.playMusic = playMusic;
    ;
    /**
     * 暂停背景音乐
     */
    function pauseMusic() {
        if (_playingMusicChannel) {
            _playingMusicChannel.stop();
        }
    }
    rose.pauseMusic = pauseMusic;
    ;
    /**
     * 恢复背景音乐
     */
    function resumeMusic() {
        if (isBgMusicEnabled() && _playingMusic) {
            _playingMusicChannel = _playingMusic.play();
            _playingMusicChannel.volume = _volume;
        }
    }
    rose.resumeMusic = resumeMusic;
    ;
    /**
     * 设置背景音乐音量
     * @param volume
     */
    function setMusicVolume(volume) {
        _volume = volume;
        if (_playingMusicChannel) {
            _playingMusicChannel.volume = _volume;
        }
    }
    rose.setMusicVolume = setMusicVolume;
    ;
    function pushMusic(audioPath, loop) {
    }
    rose.pushMusic = pushMusic;
    ;
    function popMusic() {
    }
    rose.popMusic = popMusic;
    ;
    function replaceMusic(audioPath, loop) {
    }
    rose.replaceMusic = replaceMusic;
    ;
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     *
     * 模块管理、实现
     * @author Created by pony on 2019/01/01.
     */
    var ModuleManager = (function () {
        function ModuleManager() {
            this.moduleConfig = {};
            this.modules = [];
            this.loadingClassMap = {};
        }
        ModuleManager.prototype.registerLoadingClass = function (type, LoadingLayerClass) {
            this.loadingClassMap[type] = LoadingLayerClass;
            return true; //暂时处理
        };
        ;
        ModuleManager.prototype.start = function (id, moduleParam) {
            var _this = this;
            if (moduleParam === void 0) { moduleParam = { fromWhere: 'empty' }; }
            return new Promise(function (resolve, reject) {
                var newModuleCfgItem = _this._getModuleCfgItem(id);
                //找不到模块
                if (typeof newModuleCfgItem === 'undefined') {
                    rose._moduleNotFoundFunc(name);
                    reject({
                        c: -1,
                        t: '未找到模块'
                    });
                    return;
                }
                //统一模块验证
                if (!rose._validModuleFunc(newModuleCfgItem, moduleParam)) {
                    reject({
                        c: -2,
                        t: '统一模块验证失败'
                    });
                    return;
                }
                ;
                //验证模块
                if (!newModuleCfgItem.onValid(moduleParam)) {
                    reject({
                        c: -3,
                        t: '模块验证失败'
                    });
                    return;
                }
                var loadingClass = _this.loadingClassMap[newModuleCfgItem.loadingType];
                if (typeof loadingClass === 'undefined') {
                    console.error('加载页未注册');
                    reject({
                        c: -4,
                        t: '加载页未找到'
                    });
                    return;
                }
                ;
                var loading = new loadingClass();
                loading.show();
                var isSubModule = newModuleCfgItem.isSubModule;
                var isHideUnder = newModuleCfgItem.isHideUnder;
                //数组的第一个元素一定是主模块，后期优化
                //先取出主模块，再操作
                var mainModule = _this.modules.shift();
                if (isHideUnder && !isSubModule) {
                    _this._destroyModule(mainModule);
                }
                var newModule = new newModuleCfgItem.targetClass();
                newModule.id = id;
                newModule.moduleParam = moduleParam;
                newModule.init();
                newModule.show();
                if (!isHideUnder && !isSubModule) {
                    _this._destroyModule(mainModule);
                }
                if (isSubModule) {
                    _this.modules.unshift(mainModule);
                    newModule.emitter.once("onClose", _this._onCloseHandle, _this); //监听关闭事件，关闭后在模块中移除
                }
                _this.modules.push(newModule);
                loading.hide();
                resolve(); //成功加载
            });
        };
        ;
        ModuleManager.prototype._destroyModule = function (mainModule) {
            if (typeof mainModule !== 'undefined') {
                mainModule.close();
                mainModule.destroy();
                var subModule = this.modules;
                for (var i = subModule.length - 1; i >= 0; i--) {
                    subModule[i].destroy();
                }
                this.modules = [];
            }
            ;
        };
        //关闭子模块时处理
        ModuleManager.prototype._onCloseHandle = function (moduleId) {
            console.log('关闭子模块', moduleId);
            var index = this._getModuleIndexById(moduleId);
            if (index > -1) {
                var subModule = this.modules.splice(index, 1).shift();
                subModule.destroy(); //后期配置是否缓存
            }
        };
        ModuleManager.prototype._getModuleIndexById = function (moduleId) {
            for (var i = 0, l = this.modules.length; i < l; i++) {
                if (this.modules[i].id === moduleId) {
                    return i;
                }
            }
            return -1;
        };
        ModuleManager.prototype._getModuleCfgItem = function (id) {
            return this.moduleConfig[id];
        };
        ModuleManager.prototype.popModule = function () {
        };
        ;
        /**
         * 获取所有模块
         * 这个接口仅供调试使用
         * 注意获取的是克隆后的所有模块，外部修改不会影响
         */
        ModuleManager.prototype.getAllModule = function () {
            return this.modules.slice();
        };
        ModuleManager.prototype.registerModule = function (moduleCfgItem) {
            this.moduleConfig[moduleCfgItem.id] = moduleCfgItem;
            return true;
        };
        ;
        return ModuleManager;
    }());
    rose.ModuleManager = ModuleManager;
    __reflect(ModuleManager.prototype, "rose.ModuleManager", ["rose.IModuleManager"]);
    /**
     *
     * 全局模块管理
     * @author Created by pony on 2019/01/01.
     */
    rose.ModuleMgr = new ModuleManager();
    //暂时处理
    rose.ModuleMgr.registerLoadingClass(rose.LoadingModuleTypeEnum.EMPTY, (function () {
        function class_1() {
        }
        class_1.prototype.show = function () { };
        class_1.prototype.hide = function () { };
        return class_1;
    }()));
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     *
     * 主模块
     */
    var MainModule = (function (_super) {
        __extends(MainModule, _super);
        function MainModule() {
            var _this = _super.call(this) || this;
            _this.isSubModule = false;
            _this._initProp();
            return _this;
        }
        ;
        MainModule.prototype._initProp = function () {
            this.emitter = new rose.EventEmitter();
            this.once(egret.Event.ADDED_TO_STAGE, this.onEnterStage, this);
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onExitStage, this);
        };
        MainModule.prototype.init = function () {
        };
        ;
        MainModule.prototype.show = function () {
            this.touchEnabled = false;
            rose.layerMgr.initializeGameLayer(this);
        };
        ;
        MainModule.prototype.onEnterStage = function () {
        };
        ;
        MainModule.prototype.close = function () {
            DisplayUtil.removeFromParent(this);
        };
        ;
        MainModule.prototype.onExitStage = function () {
        };
        ;
        MainModule.prototype.destroy = function () {
        };
        ;
        return MainModule;
    }(eui.UILayer));
    rose.MainModule = MainModule;
    __reflect(MainModule.prototype, "rose.MainModule", ["rose.IModuleBase"]);
})(rose || (rose = {}));
/// <reference path="../../gui/Dialog.ts" />
var rose;
(function (rose) {
    /**
     *
     * 子模块
     */
    var SubModule = (function (_super) {
        __extends(SubModule, _super);
        function SubModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isSubModule = true;
            return _this;
        }
        return SubModule;
    }(rose.Dialog));
    rose.SubModule = SubModule;
    __reflect(SubModule.prototype, "rose.SubModule", ["rose.IModuleBase"]);
})(rose || (rose = {}));
var rose;
(function (rose) {
    // export type serviceContainerType<A extends ServiceConfigType> = {
    //     [K in keyof A]: InstanceType<A[K]>
    // }
    /**
     * 创建 createService
     * @author Created by pony
     */
    function createService(service) {
        if (typeof service !== 'object') {
            throw new Error('Expected the service to be a object.');
        }
        var isInitialize = false;
        var serviceContainer = {};
        // function use<K extends keyof S>(serviceName: K): InstanceType<S[K]> {
        function use(serviceName) {
            if (!serviceContainer.hasOwnProperty(serviceName)) {
                throw new Error(serviceName + " service not provided\uFF01\uFF01\uFF01");
            }
            return serviceContainer[serviceName];
        }
        function initialize() {
            if (isInitialize)
                return;
            isInitialize = true;
            Object.keys(service).forEach(function (key) {
                var serviceClass = service[key];
                serviceContainer[key] = new serviceClass();
            });
            service = null;
        }
        // gameService
        return {
            initialize: initialize,
            use: use
        };
    }
    rose.createService = createService;
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     * 服务基类
     * 在复杂业务场景下用于做业务逻辑封装的一个抽象层
     * @author Created by pony
     */
    var Service = (function () {
        function Service() {
            this._initProp();
        }
        ;
        Service.prototype._initProp = function () {
        };
        return Service;
    }());
    rose.Service = Service;
    __reflect(Service.prototype, "rose.Service");
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     * 创建 store
     * @author Created by pony
     */
    function createStore(states) {
        if (typeof states !== 'object') {
            throw new Error('Expected the states to be a object.');
        }
        var finalDataManagers = {};
        Object.keys(states).forEach(function (key) { return finalDataManagers[key] = new rose.DataManager(states[key]); });
        function getDataManager(key) {
            if (!finalDataManagers.hasOwnProperty(key)) {
                throw new Error(key + " state not provided\uFF01\uFF01\uFF01");
            }
            return finalDataManagers[key];
        }
        return {
            getDataManager: getDataManager
        };
    }
    rose.createStore = createStore;
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     * 数据管理类
     * @author Created by pony
     */
    var DataManager = (function () {
        function DataManager(values) {
            this._values = values;
            this.emitter = new rose.EventEmitter();
        }
        ;
        /**
         * 设置指定并且通知
         * @param key
         * @param value
         */
        DataManager.prototype.setValue = function (key, value) {
            var previousValue = this._values[key];
            this._values[key] = value;
            this.emitter.emit(DataManager.CHANGE_DATA_KEY + key, value, previousValue);
            this.emitter.emit(DataManager.CHANGE_DATA);
        };
        ;
        DataManager.prototype.get = function (key) {
            var values = this._values;
            return values[key];
        };
        DataManager.prototype.getAll = function () {
            var results = {};
            for (var key in this._values) {
                if (this._values.hasOwnProperty(key)) {
                    results[key] = this._values[key];
                }
            }
            return results;
        };
        ;
        DataManager.prototype.query = function (search) {
            var results = {};
            return results;
        };
        DataManager.prototype.each = function (callback, context) {
        };
        ;
        DataManager.prototype.register = function (selector, ctx) {
            this.emitter.on(DataManager.CHANGE_DATA, selector, ctx);
        };
        ;
        DataManager.prototype.unregister = function (selector, ctx) {
            this.emitter.off(DataManager.CHANGE_DATA, selector, ctx);
        };
        ;
        DataManager.prototype.registerByKey = function (key, selector, ctx) {
            this.emitter.on(DataManager.CHANGE_DATA_KEY + key, selector, ctx);
        };
        ;
        DataManager.prototype.unregisterByKey = function (key, selector, ctx) {
            this.emitter.off(DataManager.CHANGE_DATA_KEY + key, selector, ctx);
        };
        ;
        DataManager.prototype.unregisterAll = function () {
            this.emitter.removeAllListeners();
        };
        ;
        DataManager.prototype.destroy = function () {
            this.unregisterAll();
        };
        ;
        DataManager.RESET_DATA = 'reset_data';
        DataManager.CHANGE_DATA = 'change_data';
        DataManager.CHANGE_DATA_KEY = 'change_data_';
        return DataManager;
    }());
    rose.DataManager = DataManager;
    __reflect(DataManager.prototype, "rose.DataManager", ["rose.IDataManager"]);
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     *
     * 目前简易实现，后续优化
     */
    //============================================================
    var staticData = {};
    var configKey = [];
    function addDc(dcModule, dataCfg) { }
    ;
    function getData(dcModule, key) { }
    ;
    function registerDcParser(type, parser, ctx) { }
    ;
    /**
     * 添加一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    function addJSON(fileName, dataCfg) {
        staticData[fileName] = dataCfg;
        configKey.push(fileName);
    }
    rose.addJSON = addJSON;
    ;
    /**
     * 获取一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    function getJSONWithFileName(fileName) {
        return staticData[fileName];
    }
    rose.getJSONWithFileName = getJSONWithFileName;
    ;
    /**
     * 获取一个json文件中某个id的单条信息
     * @param fileName
     * @param id
     * @returns {Object}
     */
    function getJSONWithFileNameAndID(fileName, id) {
        var jsonData = getJSONWithFileName(fileName);
        if (jsonData && jsonData.hasOwnProperty(id)) {
            return jsonData[id];
        }
        console.error(fileName + " 文件没这个ID：" + id);
        return undefined;
    }
    rose.getJSONWithFileNameAndID = getJSONWithFileNameAndID;
    ;
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     * 启动引导
     */
    function boot(gameStage) {
        return new Promise(function (resolve, reject) {
            //先设置舞台
            rose.layerMgr.gameStage = gameStage;
            //初始化上层容器
            var infoLayer = new eui.UILayer();
            infoLayer.touchEnabled = false;
            rose.layerMgr.initializeInfoLayer(infoLayer);
            //清理舞台垃圾，，，如游戏需要，可注释
            // layerMgr.clearBag();
            //派发配置后事件
            rose.gameEventChannel.emit(rose.GameEventChannel.AFTER_CONFIG);
            //结束成功回调
            resolve();
        });
    }
    rose.boot = boot;
})(rose || (rose = {}));
var rose;
(function (rose) {
    rose.InputEventChannel = new rose.EventEmitter();
})(rose || (rose = {}));
var rose;
(function (rose) {
    rose.NetEventChannel = new rose.EventEmitter();
})(rose || (rose = {}));
var rose;
(function (rose) {
    rose.TimerEventChannel = new rose.EventEmitter();
})(rose || (rose = {}));
var rose;
(function (rose) {
    /** 打开弹窗特效*/
    rose.dialogShowEaseBackOut = function (dialog, onEnd) {
        var dialogWidth = dialog.width;
        var dialogHeight = dialog.height;
        dialog.alpha = 0;
        dialog.scaleX = 0.5;
        dialog.scaleY = 0.5;
        dialog.x = dialog.x + dialogWidth / 4;
        dialog.y = dialog.y + dialogHeight / 4;
        egret.Tween.get(dialog).to({
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            x: dialog.x - dialogWidth / 4,
            y: dialog.y - dialogHeight / 4
        }, 300, egret.Ease.backOut).call(onEnd);
    };
    /** 默认关闭特效*/
    rose.dialogCloseDefault = function (dialog, onEnd) {
        egret.Tween.get(dialog).to({
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            x: dialog.x + dialog.width / 2,
            y: dialog.y + dialog.height / 2
        }, 300).call(onEnd);
    };
})(rose || (rose = {}));
var rose;
(function (rose) {
    /**
     * 层级管理
     * @author Created by peony on 2017/3/02.
     */
    var LayerManager = (function () {
        function LayerManager() {
        }
        /** 初始化*/
        LayerManager.prototype.initializeInfoLayer = function (layer) {
            this._infoLayer_ = layer;
            this._infoLayer_.name = '_infoLayer_';
            this._gameStage.addChild(this._infoLayer_);
            this._msgLayer = new eui.UILayer();
            this._msgLayer.touchEnabled = false;
            this._msgLayer.name = 'msgLayer';
            this._infoLayer_.addChild(this._msgLayer);
            this._guideLayer = new eui.UILayer();
            this._guideLayer.touchEnabled = false;
            this._guideLayer.name = 'guideLayer';
            this._infoLayer_.addChild(this._guideLayer);
            // _topLayer 层禁止触摸交互
            this._topLayer = new eui.UILayer();
            this._topLayer.touchEnabled = false;
            this._topLayer.touchChildren = false;
            this._topLayer.name = 'topLayer';
            this._infoLayer_.addChild(this._topLayer);
        };
        /** 初始化*/
        LayerManager.prototype.initializeGameLayer = function (layer) {
            this._gameLayer_ = layer;
            this._gameLayer_.name = '_gameLayer_';
            this._gameStage.addChildAt(this._gameLayer_, 0);
            this._sceneLayer = new eui.UILayer();
            this._sceneLayer.touchEnabled = false;
            this._sceneLayer.name = 'sceneLayer';
            this._gameLayer_.addChild(this._sceneLayer);
            this._menuLayer = new eui.UILayer();
            this._menuLayer.touchEnabled = false;
            this._menuLayer.name = 'menuLayer';
            this._gameLayer_.addChild(this._menuLayer);
            this._dlgLayer = new eui.UILayer();
            this._dlgLayer.touchEnabled = false;
            this._dlgLayer.name = 'dlgLayer';
            this._gameLayer_.addChild(this._dlgLayer);
        };
        /**
         *
         * 清理舞台上 _gameLayer_ 和 _infoLayer_ 以外的显示对象
         */
        LayerManager.prototype.clearBag = function () {
            if (this._gameStage) {
                this._gameStage.removeChildren();
                if (this._gameLayer_) {
                    this._gameStage.addChild(this._gameLayer_);
                }
                if (this._infoLayer_) {
                    this._gameStage.addChild(this._infoLayer_);
                }
            }
        };
        Object.defineProperty(LayerManager.prototype, "gameStage", {
            get: function () {
                return this._gameStage;
            },
            set: function (stage) {
                this._gameStage = stage;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(LayerManager.prototype, "scene", {
            get: function () {
                return this._sceneLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "menu", {
            get: function () {
                return this._menuLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "dlg", {
            get: function () {
                return this._dlgLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "msg", {
            get: function () {
                return this._msgLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "guide", {
            get: function () {
                return this._guideLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayerManager.prototype, "top", {
            get: function () {
                return this._topLayer;
            },
            enumerable: true,
            configurable: true
        });
        return LayerManager;
    }());
    rose.LayerManager = LayerManager;
    __reflect(LayerManager.prototype, "rose.LayerManager");
    rose.layerMgr = new LayerManager();
})(rose || (rose = {}));
var net;
(function (net) {
    var HttpRequestInfo = (function () {
        function HttpRequestInfo() {
        }
        return HttpRequestInfo;
    }());
    net.HttpRequestInfo = HttpRequestInfo;
    __reflect(HttpRequestInfo.prototype, "net.HttpRequestInfo", ["net.IHttpRequestInfo"]);
})(net || (net = {}));
var net;
(function (net) {
    /**
     * get 请求，命名 request
     * post 请求格式有 json、FormData，命名 post4Json post4FormData
     *
     * 为完成功能
     *   添加设置头
     *   post4FormData 请求方法
     */
    var HttpServer = (function () {
        function HttpServer() {
            this._initProp();
        }
        HttpServer.prototype._initProp = function () {
            this._requestIdCounter = 1;
            this._waitingRequestMap = {};
        };
        ;
        /**
         * get 请求
         * @param route
         * @param args
         * @param cb
         * @param ctx
         */
        HttpServer.prototype.request = function (route, args, cb, ctx) {
            var requestInfo = this._getRequestInfo(route, args, cb, ctx);
            this._waitingRequestMap[requestInfo.requestId] = requestInfo;
            this._requestHttpGet(requestInfo);
        };
        ;
        HttpServer.prototype._requestHttpGet = function (requestInfo) {
            var _this = this;
            var route = requestInfo.route;
            var httpUrl = "" + this._httpUrl + route + CommonUtil.splicingQueryString(requestInfo.args);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT; //默认值
            request.open(httpUrl, egret.HttpMethod.GET);
            request.once(egret.Event.COMPLETE, function (evt) {
                var result = evt.currentTarget;
                var response = result.response;
                _this._handleRequestResult(requestInfo, response);
            }, this);
            request.once(egret.IOErrorEvent.IO_ERROR, function (evt) {
                logger.error(route, ">>>", evt.type, evt.currentTarget);
                _this._handleRequestError(requestInfo, evt);
            }, this);
            request.send();
        };
        /**
         * json 格式 post 请求
         * @param route
         * @param args
         * @param cb
         * @param ctx
         */
        HttpServer.prototype.post4Json = function (route, args, cb, ctx) {
            var requestInfo = this._getRequestInfo(route, args, cb, ctx);
            this._waitingRequestMap[requestInfo.requestId] = requestInfo;
            this._requestPost4Json(requestInfo);
        };
        HttpServer.prototype._requestPost4Json = function (requestInfo) {
            var _this = this;
            var route = requestInfo.route;
            var args = requestInfo.args;
            var httpUrl = "" + this._httpUrl + route;
            var request = new egret.HttpRequest();
            request.setRequestHeader("Content-Type", "application/json");
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(httpUrl, egret.HttpMethod.POST);
            request.once(egret.Event.COMPLETE, function (evt) {
                var result = evt.currentTarget;
                var response = result.response;
                _this._handleRequestResult(requestInfo, response);
            }, this);
            request.once(egret.IOErrorEvent.IO_ERROR, function (evt) {
                logger.error(route, ">>>", evt.type, evt.currentTarget);
                _this._handleRequestError(requestInfo, evt);
            }, this);
            request.send(args);
        };
        ;
        HttpServer.prototype._getRequestInfo = function (route, args, cb, ctx) {
            var requestId = this._requestIdCounter++;
            var requestInfo = new net.HttpRequestInfo();
            requestInfo.requestId = requestId;
            requestInfo.route = route;
            requestInfo.args = args;
            requestInfo.cb = cb;
            requestInfo.ctx = ctx;
            return requestInfo;
        };
        /**
         * 处理请求结果
         * @param requestInfo
         * @param result
         */
        HttpServer.prototype._handleRequestResult = function (requestInfo, result) {
            var requestId = requestInfo.requestId;
            var cb = requestInfo.cb;
            var ctx = requestInfo.ctx;
            cb.call(ctx, null, result); //第一个参数为错误
            delete this._waitingRequestMap[requestId]; //从等待中移除
        };
        ;
        /**
         *
         * @param evt
         */
        HttpServer.prototype._handleRequestError = function (requestInfo, errInfo) {
            var requestId = requestInfo.requestId;
            var cb = requestInfo.cb;
            var ctx = requestInfo.ctx;
            cb.call(ctx, new Error(errInfo.type), null);
            delete this._waitingRequestMap[requestId];
        };
        ;
        HttpServer.prototype.reset = function () {
            this._waitingRequestMap = {}; //清空缓存的请求
            this._requestIdCounter = 1; //计数重置
        };
        ;
        HttpServer.ON_ERROR = "error";
        HttpServer.ON_CLOSE = "close";
        HttpServer.ON_KICK = "kick";
        HttpServer.ON_SUCCESS = "success";
        HttpServer.ON_ROUTE_ERROR = "resultError";
        HttpServer.ON_ROUTE_SUCCESS = "resultSuccess";
        return HttpServer;
    }());
    net.HttpServer = HttpServer;
    __reflect(HttpServer.prototype, "net.HttpServer");
})(net || (net = {}));
var rose;
(function (rose) {
    var Res = (function () {
        function Res() {
        }
        Res.prototype._initProp = function () {
        };
        Res.prototype.getStatusRes = function (res) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    result = RES.getRes(res);
                    if (result) {
                        return [2 /*return*/, Promise.resolve(result)];
                    }
                    return [2 /*return*/, RES.getResAsync(res)];
                });
            });
        };
        return Res;
    }());
    rose.Res = Res;
    __reflect(Res.prototype, "rose.Res");
    rose.R = new Res();
})(rose || (rose = {}));
var CommonUtil;
(function (CommonUtil) {
    /**
     * 获取对象类名
     * 注意只使用 egret 类型
     */
    function getClassName(target) {
        return target['__proto__']['__class__'];
    }
    CommonUtil.getClassName = getClassName;
    /**
     * 拼接 get 请求字符串
     * @param {*} argsObj - 待拼接的对象
     * @returns {string} - 拼接成的请求字符串
     */
    function splicingQueryString(argsObj, format) {
        if (format === void 0) { format = function (v) { return v; }; }
        var params = [];
        Object.keys(argsObj).forEach(function (key) { return params.push([key, format(argsObj[key])].join('=')); });
        return '?' + params.join('&');
    }
    CommonUtil.splicingQueryString = splicingQueryString;
    /**
     * 解析 URL 中参数。
     * 要获取的 key 中不允许有 '=',value 中可以正常解析。如果没有 value 默认为 “0”。<br/>
     * @return {{ [index: string]: string }} 包含URL参数的键值对对象。
     * @author Created by pony on 2019/01/01.
     */
    CommonUtil.getUrlParams = function (urlStr) {
        var params = {};
        var url = urlStr || window.location.href;
        var idx = url.indexOf('?');
        if (idx === -1) {
            return params;
        }
        var queryStr = url.substring(idx + 1);
        var args = queryStr.split('&');
        for (var i = 0, l = args.length; i < l; i++) {
            var str = args[i];
            var keyIdx = str.indexOf('=');
            if (keyIdx === -1) {
                //没有 value 时，添加一个默认值
                params[str] = '0';
                continue;
            }
            var key = str.substring(0, keyIdx);
            var value = str.substring(keyIdx + 1);
            params[key] = value;
        }
        return params;
    };
})(CommonUtil || (CommonUtil = {}));
/**
 * 显示对象工具
 * @author Created by pony on 2019/01/01.
 */
var DisplayUtil;
(function (DisplayUtil) {
    /** 删除显示对象、显示对象必须有父级容器*/
    function removeFromParent(disObj) {
        disObj && disObj.parent && disObj.parent.removeChild(disObj);
    }
    DisplayUtil.removeFromParent = removeFromParent;
    function removeAllChildrenFromScratch(disContainer) {
        while (disContainer.numChildren > 0) {
            disContainer.removeChildAt(0);
        }
    }
    DisplayUtil.removeAllChildrenFromScratch = removeAllChildrenFromScratch;
    /** 创建满屏遮罩 -- 废弃*/
    function createMaskFull(color, alpha, isTouch) {
        if (isTouch === void 0) { isTouch = true; }
        return createMask(color, alpha, 750, 1336, isTouch); //后期优化取实际宽高
    }
    DisplayUtil.createMaskFull = createMaskFull;
    /** 创建遮罩 -- 废弃*/
    function createMask(color, alpha, w, h, isTouch) {
        if (isTouch === void 0) { isTouch = false; }
        var rt = new eui.Rect(w, h, color);
        rt.alpha = alpha;
        rt.touchEnabled = isTouch;
        return rt;
    }
    DisplayUtil.createMask = createMask;
    /**  -- 废弃 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。*/
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    DisplayUtil.createBitmapByName = createBitmapByName;
})(DisplayUtil || (DisplayUtil = {}));
var logger;
(function (logger) {
    var noop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    logger.log = console.log.bind(console);
    logger.debug = console.debug.bind(console);
    logger.info = console.info.bind(console);
    logger.warn = console.warn.bind(console);
    logger.error = console.error.bind(console);
    /** 设置日志等级*/
    function setLvl(lvl) {
        if (lvl > 1) {
            logger.log = noop;
            logger.debug = noop;
        }
        if (lvl > 2) {
            logger.info = noop;
        }
        if (lvl > 3) {
            logger.warn = noop;
        }
        if (lvl > 4) {
            logger.error = noop;
        }
    }
    logger.setLvl = setLvl;
    ;
})(logger || (logger = {}));
var MathsUtil;
(function (MathsUtil) {
    //=================== 代数工具 ===================
    /** 获取百分比*/
    function numPercentage(curProgress, totalProgress, ratio) {
        var value = Math.floor(curProgress / totalProgress * ratio);
        if (value > ratio) {
            value = ratio;
        }
        ;
        return value;
    }
    MathsUtil.numPercentage = numPercentage;
    ;
    /**
     * 给定 start 和 end 范围随机之间的整数，包括 start 和 end
     */
    function rangeRandom(start, end) {
        return clamp(Math.floor(Math.random() * (end - start + 1) + start), start, end);
    }
    MathsUtil.rangeRandom = rangeRandom;
    function clamp(e, t, i) {
        return Math.min(Math.max(e, t), i);
    }
    MathsUtil.clamp = clamp;
    //=================== 几何工具 ===================
    var R_T_D = 180 / Math.PI;
    var D_T_R = Math.PI / 180;
    /** 弧度转度*/
    MathsUtil.radiansToDegrees = function (radian) { return radian * R_T_D; };
    /** 度转弧度*/
    MathsUtil.degreesToRadians = function (deg) { return deg * D_T_R; };
    /** 根据向量转换角度*/
    MathsUtil.pointAngle = function (strat, end) {
        return Math.atan2(end.y - strat.y, end.x - strat.x) * R_T_D;
    };
    /** 根据向量转换弧度*/
    MathsUtil.pointRadians = function (strat, end) {
        return Math.atan2(end.y - strat.y, end.x - strat.x);
    };
    MathsUtil.angleToSpeed = function (t) {
        var i = t * D_T_R;
        return new egret.Point(Math.cos(i), Math.sin(i));
    };
    /** 距离*/
    MathsUtil.measureDistance = function (p1, p2) {
        return Math.sqrt((p1.x - (p2.x)) * (p1.x - (p2.x)) + (p1.y - (p2.y)) * (p1.y - (p2.y)));
    };
    function radiansToSpeed(e) { return new egret.Point(Math.cos(e), Math.sin(e)); }
    MathsUtil.radiansToSpeed = radiansToSpeed;
    function angleSpeed(e, t) {
        var i = Math.atan2(t.y - e.y, t.x - e.x);
        return new egret.Point(Math.cos(i), Math.sin(i));
    }
    MathsUtil.angleSpeed = angleSpeed;
    function getCirclePoint(t, i, n) { var s = i * D_T_R; return t.add(new egret.Point(Math.cos(s) * n, Math.sin(s) * n)); }
    MathsUtil.getCirclePoint = getCirclePoint;
    function getCirclePoint2(e, t, i) { return e.add(new egret.Point(Math.cos(t) * i, Math.sin(t) * i)); }
    MathsUtil.getCirclePoint2 = getCirclePoint2;
    function getBezierY(e, t) {
        if (void 0 === t && (t = 0), 0 > e || e > 1)
            return 0;
        if (0 > t || t > 1)
            return 0;
        var i = 0.5 - Math.sqrt((1 - t) / 4);
        var n = e * (1 - i) + i;
        return 4 * (n - 0.5) * (n - 0.5) - 1;
    }
    MathsUtil.getBezierY = getBezierY;
})(MathsUtil || (MathsUtil = {}));
var MovieClipUtils = (function () {
    function MovieClipUtils() {
    }
    /**
     * @param resPath 路径
     * @param actName 动作名称
     * @param comFunc 回调函数
     * @param ctx 执行域(this)
    */
    MovieClipUtils.createMovieClip = function (resPath, actName, comFunc, ctx) {
        if (!this.depot.hasOwnProperty(resPath)) {
            var resJson = RES.getRes(resPath + "_json");
            var resPng = RES.getRes(resPath + "_png");
            if (resJson && resPng) {
                this.depot[resPath] = new egret.MovieClipDataFactory(resJson, resPng);
            }
        }
        comFunc.call(ctx, new egret.MovieClip(this.depot[resPath].generateMovieClipData(actName)));
    };
    MovieClipUtils.depot = {};
    return MovieClipUtils;
}());
__reflect(MovieClipUtils.prototype, "MovieClipUtils");
var rose;
(function (rose) {
    /** 该 api 只保留了在 h5 端常用方法 */
    /**
     * 下一个主循环执行一次。
     * 这个和nodejs不同的是，多了执行回调的上下文和传参。
     * @param cb
     * @param ctx
     */
    function nextTick(cb, ctx) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        egret.callLater(function () {
            cb.apply(ctx, args);
        }, null);
    }
    rose.nextTick = nextTick;
    ;
})(rose || (rose = {}));
var utils;
(function (utils) {
    var TimedTaskTicker = (function () {
        function TimedTaskTicker() {
            /**
             * @private
             * ticker 花销的时间
             */
            this.costEnterFrame = 0;
            /**
             * @private
             * 是否被暂停
             */
            this.isPaused = false;
            /**
             * @private
             */
            this.callBackList = [];
            /**
             * @private
             */
            this.thisObjectList = [];
        }
        TimedTaskTicker.prototype.startTick = function (callBack, thisObject) {
            var index = this.getTickIndex(callBack, thisObject);
            if (index != -1) {
                return;
            }
            this.concatTick();
            this.callBackList.push(callBack);
            this.thisObjectList.push(thisObject);
        };
        TimedTaskTicker.prototype.stopTick = function (callBack, thisObject) {
            var index = this.getTickIndex(callBack, thisObject);
            if (index === -1) {
                return;
            }
            this.concatTick();
            this.callBackList.splice(index, 1);
            this.thisObjectList.splice(index, 1);
        };
        /**
         * @private
         */
        TimedTaskTicker.prototype.getTickIndex = function (callBack, thisObject) {
            var callBackList = this.callBackList;
            var thisObjectList = this.thisObjectList;
            for (var i = callBackList.length - 1; i >= 0; i--) {
                if (callBackList[i] == callBack &&
                    thisObjectList[i] == thisObject) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * @private
         *
         */
        TimedTaskTicker.prototype.concatTick = function () {
            this.callBackList = this.callBackList.concat();
            this.thisObjectList = this.thisObjectList.concat();
        };
        /**
         * 暂停心跳
         */
        TimedTaskTicker.prototype.pause = function () {
            this.isPaused = true;
        };
        /**
         * 恢复心跳
         */
        TimedTaskTicker.prototype.resume = function () {
            this.isPaused = false;
        };
        /**
         * @private
         * 执行一次刷新
         */
        TimedTaskTicker.prototype.update = function () {
            var t1 = Date.now();
            var callBackList = this.callBackList;
            var thisObjectList = this.thisObjectList;
            var length = callBackList.length;
            var timeStamp = Date.now();
            if (this.isPaused)
                return;
            for (var i = 0; i < length; i++) {
                callBackList[i].call(thisObjectList[i], timeStamp);
            }
            var t2 = Date.now();
            this.costEnterFrame = t2 - t1;
        };
        return TimedTaskTicker;
    }());
    utils.TimedTaskTicker = TimedTaskTicker;
    __reflect(TimedTaskTicker.prototype, "utils.TimedTaskTicker");
    /**
    * 心跳计时器单例
    */
    utils.ticker = new TimedTaskTicker();
    /**
     * @private
     * 启动心跳计时器。
     */
    function startTimedTaskTicker(ticker) {
        window.setTimeout(loop, 1000);
        function loop() {
            ticker.update();
            window.setTimeout(loop, 1000);
        }
    }
    utils.startTimedTaskTicker = startTimedTaskTicker;
})(utils || (utils = {}));
