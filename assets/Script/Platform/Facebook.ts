export default class Facebook { 
    private static _inst: Facebook = null;
    public static get inst() {
        if (this._inst == null)
            return new Facebook();
        else
            return this._inst;
    }
    private Facebook() {}
}