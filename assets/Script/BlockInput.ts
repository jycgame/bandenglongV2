const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockInput extends cc.Component {

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => { })
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => { })
        // this.node.on("click", (event) => { })
    }
}
