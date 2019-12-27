namespace rose {
    /** 该 api 只保留了在 h5 端常用方法 */
    
    /**
     * 下一个主循环执行一次。
     * 这个和nodejs不同的是，多了执行回调的上下文和传参。
     * @param cb
     * @param ctx
     */
    export function nextTick(cb: (...args) => void, ctx?: any, ...args): void {
        egret.callLater(function () {
            cb.apply(ctx, args);
        }, null);
    };
}
