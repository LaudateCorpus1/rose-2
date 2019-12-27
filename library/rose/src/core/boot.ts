namespace rose {

	/**
	 * 启动引导
	 */
    export function boot(gameStage: egret.Stage): Promise<void> {
        return new Promise((resolve, reject) => {

            //先设置舞台
            layerMgr.gameStage = gameStage;

            //初始化上层容器
            const infoLayer = new eui.UILayer();
            infoLayer.touchEnabled = false;
            layerMgr.initializeInfoLayer(infoLayer);

            //清理舞台垃圾，，，如游戏需要，可注释
            // layerMgr.clearBag();

            //派发配置后事件
            gameEventChannel.emit(rose.GameEventChannel.AFTER_CONFIG);

            //结束成功回调
            resolve();
        });
    }
}
