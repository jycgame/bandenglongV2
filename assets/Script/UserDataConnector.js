cc.Class({
    statics: {
        init: function () {
            this.apiUrl = "https://jcyapi.easybao.com/jcy-api/app/system/getUserMessage";
            //this.apiUrl = "http://106.14.151.23/jcy-api/app/system/getUserMessage";
            //this.dbUrl = "http://101.132.70.210/bandenglong";

            //this.dbUrl = "http://101.132.135.78/bandenglong";
            this.dbUrl = "https://games.jcgroup.com.cn/bandenglong";
        },

        getUserId: function () {
            this.userId = this.getURLParameter("userNo");
        },

        getURLParameter: function (name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        },

        getUserData: function (caller, callback) {
            var self = this;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", this.apiUrl);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            var paramJson = { "userNo": this.userId };
            xmlhttp.send(JSON.stringify(paramJson));
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var obj = JSON.parse(xmlhttp.responseText);
                        if (obj.data == null) {//Î´µÇÂ¼
                            window.isEmployee = false;
                            cc.sys.localStorage.setItem("bonusfirstTime", 1);
                            window.firstTime = false;
                            self.getTop5(caller, callback);
                        }
                        else {
                            window.isEmployee = true;
                            self.userName = obj.data.name;
                            self.userNickName = obj.data.nickName;
                            self.checkUserId(caller, callback);
                        }
                    }
                    else {
                        cc.error("getUserData error!");
                    }
                }
            }
        },

        register: function (caller, callback) {
            var self = this;
            var url = encodeURI(this.dbUrl + "/register.php?id=" + this.userId + "&name=" + this.userName + "&nickname=" + this.userNickName);
            window.xmlhttp = new XMLHttpRequest();
            window.xmlhttp.onreadystatechange = function () {
                if (window.xmlhttp.readyState == 4) {
                    if (window.xmlhttp.status == 200) {
                        self.getTop5(caller, callback);
                    }
                    else {
                        cc.error("signUp error!!");
                    }
                }
            };
            window.xmlhttp.open("GET", url, true);
            window.xmlhttp.send(null);
        },

        checkUserId: function (caller, callback) {
            var self = this;
            var url = this.dbUrl + "/queryuserexist.php?id=" + this.userId;
            window.xmlhttp = new XMLHttpRequest();
            window.xmlhttp.onreadystatechange = function () {
                if (window.xmlhttp.readyState == 4) {
                    if (window.xmlhttp.status == 200) {
                        if (window.xmlhttp.responseText === "Yes") {
                            cc.sys.localStorage.setItem("bonusfirstTime", 0)
                            window.firstTime = false;
                            self.getTop5(caller, callback);
                        }
                        else //µÚÒ»´ÎÍæ
                        {
                            cc.sys.localStorage.setItem("bonusfirstTime", 1);
                            window.firstTime = true;
                            self.register(caller, callback);
                        }
                    }
                    else {
                        cc.error("checkUserId error!");
                    }
                }
            }
            window.xmlhttp.open("GET", url, true);
            window.xmlhttp.send(null);
        },

        uploadHighScore: function (score, caller, callback, callerRM, callbackRM) {
            var self = this;
            var url = this.dbUrl + "/uploadscore.php?id=" + this.userId + "&highscore=" + score;
            window.xmlhttp = new XMLHttpRequest();
            window.xmlhttp.onreadystatechange = function () {
                if (window.xmlhttp.readyState == 4) {
                    if (window.xmlhttp.status == 200) {
                        self.getRank(caller, callback, callerRM, callbackRM);
                    }
                    else {
                        cc.error("uploadScore error!");
                    }
                }
            }
            window.xmlhttp.open("GET", url, true);
            window.xmlhttp.send(null);
        },

        getHighScore: function (callback) {
            var self = this;
            var url = this.dbUrl + "/getHighScore.php?id=" + this.userId;
            window.xmlhttp = new XMLHttpRequest();
            window.xmlhttp.onreadystatechange = function () {
                if (window.xmlhttp.readyState == 4) {
                    if (window.xmlhttp.status == 200) {
                        callback(parseFloat(xmlhttp.responseText));
                    }
                    else {
                        cc.error("getHighScore error!");
                    }
                }
            }
            window.xmlhttp.open("GET", url, true);
            window.xmlhttp.send(null);
        },

        getTop5: function (caller, callback) {
            var self = this;
            var url = this.dbUrl + "/querysort.php?count=5";
            window.xmlhttp = new XMLHttpRequest();
            window.xmlhttp.onreadystatechange = function () {
                if (window.xmlhttp.readyState == 4) {
                    if (window.xmlhttp.status == 200) {
                        var responses = window.xmlhttp.responseText.split("<br />");
                        callback(caller, responses);
                    }
                    else {
                        cc.error("Problem retrieveing XML data");
                    }
                }
            };
            window.xmlhttp.open("GET", url, true);
            window.xmlhttp.send(null);
        },

        getRank: function (caller, callback, callerRM, callbackRM) {
            var url = this.dbUrl + "/queryindex.php?id=" + this.userId;
            var self = this;
            window.xmlhttp = new XMLHttpRequest();
            window.xmlhttp.onreadystatechange = function () {
                if (window.xmlhttp.readyState == 4) {
                    if (window.xmlhttp.status == 200) {
                        callback(caller, window.xmlhttp.responseText);
                        if (callerRM != null) {
                            self.getTop5(callerRM, callbackRM)
                        }
                    }
                    else {
                        cc.error("Problem retrieveing XML data");
                    }
                }
            };
            window.xmlhttp.open("GET", url, true);
            window.xmlhttp.send(null);
        },

        updateLastRank: function (score, caller, callback, callerRM, callbackRM) {
            var self = this;
            var url = this.dbUrl + "/updateLastRank.php?id=" + this.userId;
            window.xmlhttp = new XMLHttpRequest();
            window.xmlhttp.onreadystatechange = function () {
                if (window.xmlhttp.readyState == 4) {
                    if (window.xmlhttp.status == 200) {
                        self.uploadHighScore(score, caller, callback, callerRM, callbackRM);
                    }
                    else {
                        cc.error("updateLastRank error!!");
                    }
                }
            }
            window.xmlhttp.open("GET", url, true);
            window.xmlhttp.send(null);
        },

    },
});
