export default class BasePlatform {
    private static _inst: BasePlatform = null;
    public static get inst() {
        if (this._inst == null)
            return new BasePlatform();
        else
            return this._inst;
    }
    private BasePlatform() { }

    public getPlayerInfo(callback = (data) => { }) {
        callback({ playerId: "unkown", highScore: 0 });
    }

    public save(playerId, score, callback = () => { }) {

    }

    public refreshLeaderBoard() {

    }
}

