import RankManager from "../RankManager";

export default class Facebook {
    private static _inst: Facebook = null;
    public static get inst() {
        if (this._inst == null)
            return new Facebook();
        else
            return this._inst;
    }
    private constructor() { }

    public getPlayerInfo(callback = (data) => { }) {
        FBInstant.player
            .getDataAsync(['highScore'])
            .then((res) => {
                console.log('data is loaded');
                let highScore = res['highScore'];
                let playerId = FBInstant.player.getID();
                if (!highScore)
                    highScore = 0;
                let data = { playerId: playerId, highScore: highScore };
                callback(data);
            });
    }

    public save(playerId, score, callback = () => { }) {
        FBInstant.player
            .setDataAsync({
                highScore: score,
            })
            .then(() => {
                console.log('data is set');
                callback();
            });

        FBInstant.getLeaderboardAsync('HighScore')
            .then((leaderboard) => {
                return leaderboard.setScoreAsync(score);
            });
    }

    public refreshLeaderBoard() {
        RankManager.inst.setLeaderBoard();
    }
}