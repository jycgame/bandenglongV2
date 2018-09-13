export default class WeChat {
    private static baseUrl = "https://zouzhifeng.xyz/dragon/"
    private static _inst: WeChat = null;
    public static get inst() {
        if (this._inst == null)
            return new WeChat();
        else
            return this._inst;
    }

    private WeChat() { }

    public getPlayerInfo(callback = (data) => { }) {
        wx.login({
            success: (res) => {
                wx.request({
                    url: WeChat.baseUrl + "init.php",
                    data: {
                        code: res.code,
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    success: (res) => {
                        let data = { playerId: res.data.openid, highScore: Number(res.data.highScore) };
                        callback(data);
                    }
                });
            }
            // fail: function (res) { },
            // complete: function (res) { }
        });
    }

    public save(playerId, score, callback = () => { }) {
        wx.postMessage({
            messageType: 1,
            score: this.score
        });

        wx.request({
            url: WeChat.baseUrl + "save.php",
            data: {
                openid: playerId,
                highScore: score
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: () => {
                console.log("save successfull!");
                callback();
            }
        });
    }

    public refreshLeaderBoard() {
        wx.postMessage({
            messageType: 0,
        });
    }
}