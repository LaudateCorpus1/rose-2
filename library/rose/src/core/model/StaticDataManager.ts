namespace rose {

    /**
     * 
     * 目前简易实现，后续优化
     */

    //============================================================
    
    const staticData = {};
    const configKey: Array<string> = [];

    function addDc(dcModule: string, dataCfg: any): void { };
    function getData(dcModule: string, key: string): any { };
    function registerDcParser(type: string, parser: Function, ctx?: any): void { };

    /**
     * 添加一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    export function addJSON(fileName: string, dataCfg: any): void {
        staticData[fileName] = dataCfg;
        configKey.push(fileName);
    };

    /**
     * 获取一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    export function getJSONWithFileName(fileName: string): any {
        return staticData[fileName];
    };
    /**
     * 获取一个json文件中某个id的单条信息
     * @param fileName
     * @param id
     * @returns {Object}
     */
    export function getJSONWithFileNameAndID(fileName: string, id: string): any {
        const jsonData = getJSONWithFileName(fileName);

        if (jsonData && jsonData.hasOwnProperty(id)) {
            return jsonData[id];
        }

        return console.error("亲," + fileName + " 文件木有这个ID：" + id), null;
    };

}
