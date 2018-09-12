import PlatformFactory from "./Platform/PlatformFactory";

export default class PersistentManager {
    public static _inst: PersistentManager = null;

    public playerId: string = null;
    public highScore: number = null;

    public static get inst() {
        if (this._inst == null) {
            this._inst = new PersistentManager();
        }
        return this._inst;
    }

    public init() {
        PlatformFactory.inst.currentPlatform.getPlayerInfo((data)=>{
            this.playerId = data.playerId;
            this.highScore = data.highScore;
        });
    }

    public save(score) {
        PlatformFactory.inst.currentPlatform.save(this.playerId,score);
    }
}