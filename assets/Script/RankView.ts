import PlatformFactory from "./Platform/PlatformFactory";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankView extends cc.Component {

    @property(cc.Button)
    closeBtn: cc.Button = null;

    private tex: cc.Texture2D;
    private sprite: cc.Sprite;
    start() {
        this.sprite = this.node.getComponent(cc.Sprite);
        this.closeBtn.node.on("click", () => this.closeBtnOnClick());
        this.node.active = false;

        this.tex = new cc.Texture2D();
        if (CC_WECHATGAME) {
            sharedCanvas.width = 1044;
            sharedCanvas.height = 1006;
        }
    }

    show() {
        PlatformFactory.inst.currentPlatform.refreshLeaderBoard();
        this.node.active = true;
    }

    closeBtnOnClick() {
        this.node.active = false;
    }

    update(dt) {
        this._updateSubDomainCanvas();
    }

    _updateSubDomainCanvas() {
        if (CC_WECHATGAME) {
            this.tex.initWithElement(sharedCanvas);
            this.tex.handleLoadedTexture();
            this.sprite.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    }
}
