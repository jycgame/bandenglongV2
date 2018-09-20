import { Buf } from "../Data/Buf";
var CoinAnimPool = require('CoinAnimPool');
const { ccclass, property } = cc._decorator;

@ccclass
export default class Bomb extends cc.Component {

    static bombProp = 0;

    @property(cc.Node)
    GameManagerNode: cc.Node = null;

    @property(cc.Node)
    DataManagerNode: cc.Node = null;

    @property(cc.SpriteFrame)
    bombSf: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    coinSf: cc.SpriteFrame = null;

    private GameManager;
    private DataManager;
    private curBuff: number;
    private sprite: cc.Sprite;
    private bAnim: boolean;
    private timePassed: number;
    private coinAnimNode: cc.Node;

    private gridNode;
    public static curBuffTableRow;
    public static nextBuffThrehold;
    private trapAnim;
    init() {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");

        this.gridNode = this.GameManager.grid.getNodeFromPosition(this.node.position);

        Bomb.curBuffTableRow = 0;
        Bomb.nextBuffThrehold = 0;

        this.trapAnim = this.node.getComponent(cc.Animation);
        Bomb.updateProbs();
        this.sprite = this.node.getComponent(cc.Sprite);
        this.bAnim = false;
        this.timePassed = 0;
        this.spawn();
    }

    public static checkBuffThrehold(score) {
        if (score >= this.nextBuffThrehold) {
            this.updateProbs();
        }
    }

    public static updateProbs() {
        let curRow = Buf[this.curBuffTableRow]
        this.bombProp = curRow.bomb / 100;
        this.curBuffTableRow += 1;
        this.nextBuffThrehold = Buf[this.curBuffTableRow].score;
    }

    onCollisionEnter(other, self) {
        if (other.node.name === "Head" && this.curBuff != -1) {
            switch (this.curBuff) {
                case 0:
                    if (this.GameManager.invincibleSYSJ)
                        this.GameManager.invincibleSYSJ = false;
                    else if (!this.GameManager.invincible)
                        this.GameManager.gameOver();
                    break;
                case 1:
                    this.gridNode.itemNode = null;
                    var n = Math.random();
                    if (n <= 0.2)
                        cc.audioEngine.play(this.GameManager.coinAudio1);
                    else
                        cc.audioEngine.play(this.GameManager.coinAudio2);

                    this.GameManager.updateScore(this.DataManager.smallCoinValue, true);
                    this.GameManager.updateSpeedUpScore(this.DataManager.smallCoinValue);

                    this.coinAnimNode = CoinAnimPool.create();
                    this.coinAnimNode.position = self.node.position;
                    var action = cc.moveBy(0.1, new cc.Vec2(0, 80));
                    this.coinAnimNode.runAction(action);

                    this.timePassed = 0;
                    var coinAnim = this.coinAnimNode.getComponent(cc.Animation);
                    coinAnim.play();
                    this.bAnim = true;
                    break;
            }

            this.node.opacity = 0;
            this.curBuff = -1;
            this.scheduleOnce(() => {
                this.spawn();
            }, (this.DataManager.maxSpawnTime - this.DataManager.minSpawnTime) * Math.random() + this.DataManager.minSpawnTime);
        }
    }

    spawn() {
        var n = Math.random();
        if (n < Bomb.bombProp) {
            this.curBuff = -1;
            this.sprite.spriteFrame = this.bombSf;
            this.trapAnim.play();

            let respawTime = (this.DataManager.maxSpawnTime - this.DataManager.minSpawnTime) * Math.random() + this.DataManager.minSpawnTime;
            if (!respawTime) {
                respawTime = 10;
            }
            let trapTime = this.DataManager.trapTime
            if (!trapTime)
                trapTime = 10;

            this.scheduleOnce(() => {
                this.node.opacity = 0;
                this.curBuff = -1;
                this.scheduleOnce(() => {
                    console.log(3)
                    this.spawn();
                }, respawTime);
            }, trapTime);

            this.scheduleOnce(() => {
                this.trapAnim.stop();
                this.node.opacity = 255;
                this.curBuff = 0;
            }, 3);
        }
        else {
            this.node.opacity = 255;
            this.curBuff = 1;
            this.sprite.spriteFrame = this.coinSf;
            this.gridNode.itemNode = this.node;
        }
    }

    update(dt) {
        if (this.bAnim) {
            this.timePassed += dt;
            if (this.timePassed >= 0.4) {
                CoinAnimPool.destroy(this.coinAnimNode);
                this.bAnim = false;
            }
        }
    }

}
