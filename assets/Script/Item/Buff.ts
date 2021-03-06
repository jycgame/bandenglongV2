import {Buf} from "../Data/Buf";
var CoinAnimPool = require('CoinAnimPool');
const { ccclass, property } = cc._decorator;

@ccclass
export default class Buff extends cc.Component {

    static scoreProb = 0;
    static speedProb = 0;
    static lifeProb = 0;

    @property(cc.Node)
    GameManagerNode: cc.Node = null;

    @property(cc.Node)
    DataManagerNode: cc.Node = null;

    @property(cc.SpriteFrame)
    scoreBuffSf: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    speedBuffSf: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    lifeBuffSf: cc.SpriteFrame = null;

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
    init() {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");
        this.DataManager = this.DataManagerNode.getComponent("DataManager");

        this.gridNode = this.GameManager.grid.getNodeFromPosition(this.node.position);
        
        Buff.curBuffTableRow = 0;
        Buff.nextBuffThrehold = 0;
        Buff.updateProbs();
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
        this.scoreProb  = curRow.scoreBuf/100;
        this.speedProb = curRow.speedBuf/100;
        this.lifeProb = curRow.lifeBuf/100;
        this.curBuffTableRow += 1;
        this.nextBuffThrehold = Buf[this.curBuffTableRow].score;
    }

    onCollisionEnter(other, self) {
        if (other.node.name === "Head" && this.curBuff != -1) {
            switch (this.curBuff) {
                case 0:
                    var n = Math.random();
                    if (n <= 0.5)
                        cc.audioEngine.play(this.GameManager.bunAudio1);
                    else
                        cc.audioEngine.play(this.GameManager.bunAudio2);
                    this.GameManager.setScoreBuff();
                    break;
                case 1:
                    var n = Math.random();
                    if (n <= 0.5)
                        cc.audioEngine.play(this.GameManager.crabAudio1);
                    else
                        cc.audioEngine.play(this.GameManager.crabAudio2);
                    this.GameManager.setSpeedBuff();
                    break;
                case 2:
                    cc.audioEngine.play(this.GameManager.crayfishAudio);
                    this.GameManager.setLifeBuff();
                    break;
                case 3:
                    this.gridNode.itemNode = null;
                    var n = Math.random();
                    if (n <= 0.2)
                        cc.audioEngine.play(this.GameManager.coinAudio1);
                    else
                        cc.audioEngine.play(this.GameManager.coinAudio2);

                    this.GameManager.updateScore(this.DataManager.smallCoinValue, true);
                    this.GameManager.updateSpeedUpScore(this.DataManager.smallCoinValue);

                    this.coinAnimNode = CoinAnimPool.create();
                    this.coinAnimNode.position = this.node.position;
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
        this.node.opacity = 255;
        var n = Math.random();
        if (n < Buff.scoreProb) {
            this.curBuff = 0;
            this.sprite.spriteFrame = this.scoreBuffSf;
        }
        else if (n < Buff.scoreProb + Buff.speedProb) {
            this.curBuff = 1;
            this.sprite.spriteFrame = this.speedBuffSf;
        }
        else if (n < Buff.scoreProb + Buff.speedProb + Buff.lifeProb) {
            this.curBuff = 2;
            this.sprite.spriteFrame = this.lifeBuffSf;
        }
        else {
            this.curBuff = 3;
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
