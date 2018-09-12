import BasePlatform from "./BasePlatform";
import Facebook from "./Facebook";
import WeChat from "./WeChat";

export default class PlatformFactory {

    private static _inst: PlatformFactory = null;
    public currentPlatform = null;

    public static get inst() {
        if (this._inst == null)
            return new PlatformFactory();
        else
            return this._inst;
    }

    private constructor() {
        if (typeof FBInstant != "undefined")
            this.currentPlatform = Facebook.inst;
        else if (CC_WECHATGAME)
            this.currentPlatform = WeChat.inst;
        else
            this.currentPlatform = BasePlatform.inst;
    }
}
