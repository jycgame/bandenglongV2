const {ccclass, property} = cc._decorator;

@ccclass
export default class Buff extends cc.Component {

    @property(cc.Node)
    GameManagerNode:cc.Node = null;

    @property(cc.Prefab)
    scoreBuffPrefab:cc.Prefab = null;

    @property(cc.Prefab)
    speedBuffPrefab:cc.Prefab = null;

    @property(cc.Prefab)
    lifeBuffPrefab:cc.Prefab = null;
    
    private GameManager;
    start () {
        this.GameManager = this.GameManagerNode.getComponent("GameManager");

        // onCollisionEnter: function (other, self) {
        //     if (other.node.name === "Head") {
    
        //         var n = Math.random();
        //         if (n <= 0.5)
        //             cc.audioEngine.play(this.GameManager.crabAudio1);
        //         else
        //             cc.audioEngine.play(this.GameManager.crabAudio2);
        //         this.GameManager.specialItemNum--;
        //         this.GameManager.setCrabBuff();
        //         this.node.destroy();
        //         this.GameManager.spawnNode(self.node.position, self.node.parent);
        //     }
        // },
    }

    // update (dt) {}
}
