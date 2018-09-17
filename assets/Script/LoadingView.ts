const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingView extends cc.Component {

    public static inst: LoadingView;

    onStart() {
        // if (LoadingView.inst == null)
        LoadingView.inst = this;
        // else
        //     this.node.destroy();
    }

    show() {
        this.node.active = true;
    }

    hide() {
        this.node.active = false;
    }
}
