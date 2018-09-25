import PlatformFactory from "./Platform/PlatformFactory";
import RankManager from "./RankManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankView extends cc.Component {

    @property(cc.Button)
    closeBtn: cc.Button = null;

    @property(cc.Sprite)
    wechatSprite:cc.Sprite = null;

    @property(RankManager)
    FBRankManager:RankManager = null;

    private FBRank:cc.Node;
    private tex: cc.Texture2D;
    start() {
        this.closeBtn.node.on("click", () => this.closeBtnOnClick());
        this.FBRank = this.FBRankManager.node.parent;
        this.wechatSprite.node.active = false;
        this.node.active = false;
        this.FBRank.active = false;

        if (CC_WECHATGAME) {
            this.tex = new cc.Texture2D();
            sharedCanvas.width = 1044;
            sharedCanvas.height = 1006;
        }
    }

    show() {
        PlatformFactory.inst.currentPlatform.refreshLeaderBoard();
        this.node.active = true;
        if(CC_WECHATGAME){
            this.wechatSprite.node.active = true;
        }
        else if (typeof FBInstant != "undefined") {
            this.FBRank.active = true;
        }
    }

    closeBtnOnClick() {
        if(CC_WECHATGAME){
            this.wechatSprite.node.active = false;
        }
        else if (typeof FBInstant != "undefined") {
            this.FBRank.active = false;
        }
        this.node.active = false;
    }

    update(dt) {
        this._updateSubDomainCanvas();
    }

    _updateSubDomainCanvas() {
        if (CC_WECHATGAME) {
            this.tex.initWithElement(sharedCanvas);
            this.tex.handleLoadedTexture();
            this.wechatSprite.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    }
}
