const { ccclass, property } = cc._decorator;
import RankItem from "./RankItem";

@ccclass
export default class RankManager extends cc.Component {

    public static inst: RankManager = null;

    @property(cc.Node)
    RankListNode: cc.Node = null;

    @property(RankItem)
    PlayerRankItem: RankItem = null;

    onLoad() {
        RankManager.inst = this;
    }

    public setLeaderBoard() {
        FBInstant.getLeaderboardAsync('HighScore')
            .then((leaderboard) => {
                return leaderboard.getConnectedPlayerEntriesAsync(5, 0);
            })
            .then((entries) => {
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    const rankItem = this.RankListNode.children[i].getComponent(RankItem);
                    rankItem.set(entry.getPlayer().getPhoto(), entry.getPlayer().getName(), entry.getScore());
                }
            });
    }

    // update (dt) {}
}
