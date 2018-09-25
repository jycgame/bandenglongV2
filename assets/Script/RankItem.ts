const { ccclass, property } = cc._decorator;

@ccclass
export default class RankManager extends cc.Component {

    iconSprite: cc.Sprite = null;
    nameLabel: cc.Label = null;
    scoreLabel: cc.Label = null;
    rankLabel: cc.Label = null; //for player only

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.rankLabel = this.node.children[0].getComponent(cc.Label);
        this.iconSprite = this.node.children[1].getComponent(cc.Sprite);
        this.nameLabel = this.node.children[2].getComponent(cc.Label);
        this.scoreLabel = this.node.children[3].getComponent(cc.Label);


    }
    // update (dt) {}

    set(iconUrl: string, name: string, score: number, rank?: number) {
        this.nameLabel.string = name;
        this.scoreLabel.string = score.toString();
        this.createImage(iconUrl);

        if (rank) {
            this.rankLabel.string = rank.toString();
        }
        // this.iconSprite.spriteFrame = this.createImage(iconUrl);
    }

    
    createImage(avatarUrl) {
        cc.loader.load(avatarUrl, (err, texture) => {
            this.iconSprite.spriteFrame = new cc.SpriteFrame(texture);
        });

    }
}
