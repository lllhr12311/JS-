function SSOController() {
    var undefined, me = this, updateCookieTimer = null, updateCookieTimeHardLimit = 1800, cookieExpireTimeLength = 86400, crossDomainForward = null, crossDomainTimer = null, crossDomainTime = 3, autoLoginCallBack2 = null, ssoCrosssDomainUrl = "https://login.sina.com.cn/sso/crossdomain.php", ssoLoginUrl = "https://login.sina.com.cn/sso/login.php", ssoLogoutUrl = "https://login.sina.com.cn/sso/logout.php", ssoUpdateCookieUrl = "https://login.sina.com.cn/sso/updatetgt.php", ssoPreLoginUrl = "https://login.sina.com.cn/sso/prelogin.php", pincodeUrl = "https://login.sina.com.cn/cgi/pin.php", vfValidUrl = "http://weibo.com/sguide/vdun.php", generateVisitorUrl = "https://passport.weibo.com/visitor/visitor", crossDomainUrlList = null, loginMethod = "", ssoServerTimeTimer = null, ssoLoginTimer = null, loginByConfig = null, loginMethodCheck = null, https = 1, rsa = 2, wsse = 4, pcid = "", tmpData = {}, preloginTimeStart = 0, preloginTime = 0, callbackLogoutStatus;
    this.https = 1;
    this.rsa = 2;
    this.wsse = 4;
    this.name = "sinaSSOController";
    this.loginFormId = "ssoLoginForm";
    this.scriptId = "ssoLoginScript";
    this.ssoCrossDomainScriptId = "ssoCrossDomainScriptId";
    this.loginFrameName = "ssoLoginFrame";
    this.appLoginURL = {
        "weibo.com": "https://passport.weibo.com/wbsso/login"
    };
    this.appDomainService = {
        "weibo.com": "miniblog"
    };
    this.loginExtraQuery = {};
    this.setDomain = !1;
    this.feedBackUrl = "";
    this.service = "sso";
    this.domain = "sina.com.cn";
    this.from = "";
    this.pageCharset = "GB2312";
    this.useTicket = !1;
    this.isCheckLoginState = !1;
    this.isUpdateCookieOnLoad = !0;
    this.useIframe = !0;
    this.noActiveTime = 7200;
    this.autoUpdateCookieTime = 1800;
    this.loginType = rsa;
    this.timeoutEnable = !1;
    this.loginTimeout = 5e3;
    this.crossDomain = !0;
    this.scriptLoginHttps = !1;
    this.allowAutoFoundServerTime = !1;
    this.allowAutoFoundServerTimeError = !0;
    this.calcServerTimeInterval = 2e3;
    this.servertime = null;
    this.nonce = null;
    this.rsaPubkey = null;
    this.rsakv = null;
    this.loginExtraFlag = {};
    this.cdult = !1;
    this.crossDomainTime = 5;
    this.failRedirect = !1;
    this.isGenerateVisitor = !0;
    this.generateVisitorProbability = 1;
    this.generateVisitorDelay = 6;
    this.generateVisitorDomain = ["^.*sina.com.cn$"];
    this.getVersion = function() {
        return "ssologin.js(v1.4.19) 2017-01-09"
    }
    ;
    this.getEntry = function() {
        return me.entry
    }
    ;
    this.getClientType = function() {
        return me.getVersion().split(" ")[0]
    }
    ;
    this.init = function() {
        if (getType(arguments[0]) === "object")
            return customPrepare(arguments[0]);
        me.setLoginType(me.loginType);
        var a = window.sinaSSOConfig;
        typeof a != "object" && (a = {});
        var b;
        for (b in a)
            me[b] = a[b];
        me.entry || (me.entry = me.service);
        me.isUpdateCookieOnLoad && setTimeout(me.name + ".updateCookie()", 1e4);
        me.isGenerateVisitor && self === top && Math.random() < me.generateVisitorProbability && location.protocol !== "https:" && setTimeout(me.name + ".generateVisitor()", me.generateVisitorDelay * 1e3);
        me.isCheckLoginState && addEventListener(window, "load", function() {
            me.checkLoginState()
        });
        me.allowAutoFoundServerTime && ssoLoginServerTime && me.setServerTime(ssoLoginServerTime);
        me.customInit()
    }
    ;
    this.getLoginInfo = function() {
        var a = getCookie("sso_info");
        if (!a)
            return {};
        try {
            return parse_str(sinaSSOEncoder.Cookie.decode(a))
        } catch (b) {
            return {}
        }
    }
    ;
    this.customInit = function() {}
    ;
    this.customUpdateCookieCallBack = function(a) {}
    ;
    this.customLoginCallBack = function(a) {}
    ;
    this.customLogoutCallBack = function(a) {
        me.customLoginCallBack({
            result: !1
        })
    }
    ;
    var customLogin, customPrepare, customLogout;
    (function() {
        var a = function() {}
          , b = {
            username: "",
            password: "",
            savestate: 0,
            vsnf: 0,
            vsnval: "",
            door: "",
            setCookie: 1,
            ssoSimpleLogin: 0,
            onComplete: a,
            onSuccess: a,
            onFailure: a
        }
          , c = {
            onComplete: a,
            onSuccess: a,
            onFailure: a
        }
          , d = {
            vsnf: "vsnf",
            vsnval: "vsnval",
            door: "door",
            setCookie: "s",
            ssoSimpleLogin: "ssosimplelogin"
        }
          , e = {}
          , f = {}
          , g = function(a, b) {
            var c, d = {};
            a = a || {};
            b = b || {};
            objMerge(d, a);
            for (c in b)
                a.hasOwnProperty(c) && (d[c] = b[c]);
            return d
        }
          , h = function(a, b, c) {
            typeof a[b] == "function" && a[b](c)
        };
        this.callbackLoginStatus = function(a) {
            me.customLoginCallBack(a);
            h(e, "onComplete", a);
            a && a.result === !0 ? h(e, "onSuccess", a) : h(e, "onFailure", a)
        }
        ;
        callbackLogoutStatus = function(a) {
            me.customLogoutCallBack(a);
            h(f, "onComplete", a);
            a && a.result === !0 ? h(f, "onSuccess", a) : h(f, "onFailure", a)
        }
        ;
        customPrepare = function(a) {
            var c;
            a = a || {};
            e = objMerge({
                entry: "sso",
                useTicket: !1,
                service: "sso",
                domain: "sina.com.cn",
                feedBackUrl: "",
                setDomain: !1,
                crossDomain: !0,
                name: "sinaSSOController"
            }, b);
            e = g(e, a);
            window[e.name] = window[e.name] || me;
            for (c in e)
                b.hasOwnProperty(c) || (me[c] = e[c]);
            me.loginExtraQuery = {};
            objMerge(me.loginExtraQuery, e.loginExtraQuery);
            for (c in d)
                e.hasOwnProperty(c) && (me.loginExtraQuery[d[c]] = e[c])
        }
        ;
        customLogin = function(a) {
            a = a || {};
            customPrepare(a);
            me.login(e.username, e.password, e.savestate)
        }
        ;
        customLogout = function(a) {
            a = a || {};
            f = objMerge({}, c);
            f = g(f, a);
            me.logout()
        }
    }
    ).apply(this);
    this.login = function(a, b, c) {
        var d = arguments[3] ? arguments[3] : !1;
        if (getType(arguments[0]) === "object")
            return customLogin(arguments[0]);
        ssoLoginTimer ? ssoLoginTimer.clear() : ssoLoginTimer = new prototypeTimer(me.timeoutEnable);
        ssoLoginTimer.start(me.loginTimeout, function() {
            ssoLoginTimer.clear();
            me.callbackLoginStatus({
                result: !1,
                errno: -1,
                reason: unescape("%u767B%u5F55%u8D85%u65F6%uFF0C%u8BF7%u91CD%u8BD5")
            })
        });
        c = c == undefined ? 0 : c;
        tmpData.savestate = c;
        loginByConfig = function() {
            if (!me.feedBackUrl && loginByXMLHttpRequest(a, b, c, d))
                return !0;
            if (me.useIframe && (me.setDomain || me.feedBackUrl)) {
                if (me.setDomain) {
                    document.domain = me.domain;
                    !me.feedBackUrl && me.domain != "sina.com.cn" && (me.feedBackUrl = makeURL(me.appLoginURL[me.domain], {
                        domain: 1
                    }))
                }
                loginMethod = "post";
                var e = loginByIframe(a, b, c, d);
                if (!e) {
                    loginMethod = "get";
                    me.scriptLoginHttps ? me.setLoginType(me.loginType | https) : me.setLoginType(me.loginType | rsa);
                    loginByScript(a, b, c, d)
                }
            } else {
                loginMethod = "get";
                loginByScript(a, b, c, d)
            }
            me.nonce = null
        }
        ;
        loginMethodCheck = function() {
            if (me.loginType & wsse || me.loginType & rsa) {
                if (me.servertime) {
                    me.nonce || (me.nonce = makeNonce(6));
                    loginByConfig();
                    return !0
                }
                me.getServerTime(a, loginByConfig)
            } else
                loginByConfig()
        }
        ;
        loginMethodCheck();
        return !0
    }
    ;
    this.prelogin = function(a, b) {
        var c = ssoPreLoginUrl
          , d = a.username || "";
        d = sinaSSOEncoder.base64.encode(urlencode(d));
        delete a.username;
        var e = {
            entry: me.entry,
            callback: me.name + ".preloginCallBack",
            su: d,
            rsakt: "mod"
        };
        c = makeURL(c, objMerge(e, a));
        me.preloginCallBack = function(a) {
            if (a && a.retcode == 0) {
                me.setServerTime(a.servertime);
                me.nonce = a.nonce;
                me.rsaPubkey = a.pubkey;
                me.rsakv = a.rsakv;
                pcid = a.pcid;
                preloginTime = (new Date).getTime() - preloginTimeStart - (parseInt(a.exectime, 10) || 0)
            }
            typeof b == "function" && b(a)
        }
        ;
        preloginTimeStart = (new Date).getTime();
        excuteScript(me.scriptId, c)
    }
    ;
    this.getServerTime = function(a, b) {
        if (me.servertime) {
            typeof b == "function" && b({
                retcode: 0,
                servertime: me.servertime
            });
            return !0
        }
        me.prelogin({
            username: a
        }, b)
    }
    ;
    this.logout = function() {
        try {
            if (getType(arguments[0]) === "object")
                return customLogout(arguments[0]);
            var a = {
                entry: me.getEntry(),
                callback: me.name + ".ssoLogoutCallBack"
            };
            try {
                a.sr = window.screen.width + "*" + window.screen.height
            } catch (b) {}
            var c = makeURL(ssoLogoutUrl, a);
            excuteScript(me.scriptId, c)
        } catch (b) {}
        return !0
    }
    ;
    this.ssoLogoutCallBack = function(a) {
        a.arrURL && me.setCrossDomainUrlList(a);
        me.crossDomainAction("logout", function() {
            callbackLogoutStatus({
                result: !0
            })
        })
    }
    ;
    this.updateCookie = function() {
        try {
            if (me.autoUpdateCookieTime > 5) {
                updateCookieTimer != null && clearTimeout(updateCookieTimer);
                updateCookieTimer = setTimeout(me.name + ".updateCookie()", me.autoUpdateCookieTime * 1e3)
            }
            var a = me.getCookieExpireTime()
              , b = (new Date).getTime() / 1e3
              , c = {};
            a == null ? c = {
                retcode: 6102
            } : a < b ? c = {
                retcode: 6203
            } : a - cookieExpireTimeLength + updateCookieTimeHardLimit > b ? c = {
                retcode: 6110
            } : a - b > me.noActiveTime && (c = {
                retcode: 6111
            });
            if (c.retcode !== undefined) {
                me.customUpdateCookieCallBack(c);
                return !1
            }
            var d = makeURL(ssoUpdateCookieUrl, {
                entry: me.getEntry(),
                callback: me.name + ".updateCookieCallBack"
            });
            excuteScript(me.scriptId, d)
        } catch (e) {}
        return !0
    }
    ;
    this.setCrossDomainUrlList = function(a) {
        crossDomainUrlList = a
    }
    ;
    this.checkAltLoginName = function() {
        return !0
    }
    ;
    this.callFeedBackUrl = function(a) {
        try {
            var b = {
                callback: me.name + ".feedBackUrlCallBack"
            };
            a.ticket && (b.ticket = a.ticket);
            a.retcode !== undefined && (b.retcode = a.retcode);
            var c = makeURL(me.feedBackUrl, b);
            excuteScript(me.scriptId, c)
        } catch (d) {}
        return !0
    }
    ;
    this.loginCallBack = function(a) {
        try {
            if (me.timeoutEnable && !ssoLoginTimer.isset())
                return;
            ssoLoginTimer.clear();
            me.loginExtraFlag = {};
            var b = {}
              , c = a.ticket
              , d = a.uid;
            if (d) {
                b.result = !0;
                b.retcode = 0;
                b.userinfo = {
                    uniqueid: a.uid
                };
                c && (b.ticket = c);
                a.cookie && (b.cookie = a.cookie);
                if (me.feedBackUrl)
                    me.crossDomain ? me.crossDomainAction("login", function() {
                        me.callFeedBackUrl(b)
                    }) : me.callFeedBackUrl(b);
                else if (me.crossDomain) {
                    a.crossDomainUrlList && me.setCrossDomainUrlList({
                        retcode: 0,
                        arrURL: a.crossDomainUrlList
                    });
                    me.crossDomainAction("login", function() {
                        if (c && me.appLoginURL[me.domain])
                            me.appLogin(c, me.domain, me.name + ".callbackLoginStatus");
                        else {
                            b.userinfo = objMerge(b.userinfo, me.getSinaCookie());
                            me.callbackLoginStatus(b)
                        }
                    })
                } else
                    me.callbackLoginStatus(b)
            } else {
                if (loginMethodCheck && a.retcode == "2092" && me.allowAutoFoundServerTimeError) {
                    me.setServerTime(0);
                    me.loginExtraFlag = objMerge(me.loginExtraFlag, {
                        wsseretry: "servertime_error"
                    });
                    loginMethodCheck();
                    loginMethodCheck = null;
                    return !1
                }
                b.result = !1;
                b.errno = a.retcode;
                if (b.errno == "4069") {
                    var e = a.reason.split("|");
                    b.reason = e[0];
                    e.length == 2 && (b.rurl = e[1]);
                    if (b.rurl)
                        try {
                            top.location.href = b.rurl;
                            return
                        } catch (f) {}
                } else
                    b.reason = a.reason;
                a.retcode == "2071" && "protection_url"in a && a.protection_url && (b.protection_url = decodeURIComponent(a.protection_url));
                a.retcode == "8120" && "logout_confirm_url"in a && a.logout_confirm_url && (b.logout_confirm_url = decodeURIComponent(a.logout_confirm_url));
                me.callbackLoginStatus(b)
            }
        } catch (f) {}
        return !0
    }
    ;
    this.updateCookieCallBack = function(a) {
        a.retcode == 0 ? me.crossDomainAction("update", function() {
            me.customUpdateCookieCallBack(a)
        }) : me.customUpdateCookieCallBack(a)
    }
    ;
    this.feedBackUrlCallBack = function(a) {
        if (loginMethod != "post" || !me.timeoutEnable || !!ssoLoginTimer.isset()) {
            a.errno == "2092" && me.setServerTime(0);
            if (loginMethodCheck && a.errno == "2092" && me.allowAutoFoundServerTimeError) {
                me.loginExtraFlag = objMerge(me.loginExtraFlag, {
                    wsseretry: "servertime_error"
                });
                loginMethodCheck();
                loginMethodCheck = null;
                return !1
            }
            ssoLoginTimer && ssoLoginTimer.clear();
            if (a.errno == "4069") {
                var b = a.reason.split("|");
                a.reason = b[0];
                if (b.length == 2) {
                    a.rurl = b[1];
                    try {
                        top.location.href = a.rurl;
                        return
                    } catch (c) {}
                }
            }
            me.callbackLoginStatus(a);
            removeNode(me.loginFrameName)
        }
    }
    ;
    this.doCrossDomainCallBack = function(a) {
        me.crossDomainCounter++;
        a && removeNode(a.scriptId);
        if (me.crossDomainCounter == me.crossDomainCount) {
            clearTimeout(crossDomainTimer);
            me.crossDomainResult()
        }
    }
    ;
    this.crossDomainCallBack = function(a) {
        removeNode(me.ssoCrossDomainScriptId);
        if (!a || a.retcode != 0)
            return !1;
        var b = a.arrURL, c, d, e = {
            callback: me.name + ".doCrossDomainCallBack"
        };
        me.crossDomainCount = b.length;
        me.crossDomainCounter = 0;
        if (b.length == 0) {
            clearTimeout(crossDomainTimer);
            me.crossDomainResult();
            return !0
        }
        for (var f = 0; f < b.length; f++) {
            c = b[f];
            d = "ssoscript" + f;
            e.scriptId = d;
            c = makeURL(c, e);
            isSafari() ? excuteIframe(d, c) : excuteScript(d, c)
        }
    }
    ;
    this.crossDomainResult = function() {
        crossDomainUrlList = null;
        typeof crossDomainForward == "function" && crossDomainForward()
    }
    ;
    this.crossDomainAction = function(a, b) {
        crossDomainTimer = setTimeout(me.name + ".crossDomainResult()", crossDomainTime * 1e3);
        typeof b == "function" ? crossDomainForward = b : crossDomainForward = null;
        if (crossDomainUrlList) {
            me.crossDomainCallBack(crossDomainUrlList);
            return !1
        }
        var c = me.domain;
        if (a == "update") {
            a = "login";
            c = "sina.com.cn"
        }
        var d = {
            scriptId: me.ssoCrossDomainScriptId,
            callback: me.name + ".crossDomainCallBack",
            action: a,
            domain: c,
            sr: window.screen.width + "*" + window.screen.height
        }
          , e = makeURL(ssoCrosssDomainUrl, d);
        excuteScript(me.ssoCrossDomainScriptId, e)
    }
    ;
    this.checkLoginState = function(a) {
        a ? me.autoLogin(a) : me.autoLogin(function(a) {
            var b = {};
            if (a !== null) {
                var c = {
                    displayname: a.nick,
                    uniqueid: a.uid,
                    userid: a.user
                };
                b.result = !0;
                b.userinfo = c
            } else {
                b.result = !1;
                b.reason = ""
            }
            me.callbackLoginStatus(b)
        })
    }
    ;
    this.getCookieExpireTime = function() {
        return getCookieExpireTimeByDomain(me.domain)
    }
    ;
    this.getSinaCookie = function(a) {
        var b = getCookie("SUBP");
        if (!b)
            return null;
        var c = sinaSSOEncoder.getSUBPCookie.decode(b);
        try {
            c.uid = c.uid.replace(/(^\s*)|(\s*$)/g, "");
            c.nick = decodeURIComponent(c.nick.replace(/(^\s*)|(\s*$)/g, ""))
        } catch (d) {
            return null
        }
        return c
    }
    ;
    this.get51UCCookie = function() {
        return me.getSinaCookie()
    }
    ;
    this.isPreLoginState = function() {
        var a = getCookie("SUBP");
        if (!a)
            return !1;
        var b = sinaSSOEncoder.getSUBPCookie.decode(a);
        return b && b.status == "40" ? !0 : !1
    }
    ;
    this.isVisitor = function() {
        var a = getCookie("SUBP");
        if (!a)
            return !1;
        var b = sinaSSOEncoder.getSUBPCookie.decode(a);
        return b && b.status == "20" ? !0 : !1
    }
    ;
    this.autoLogin = function(a, b) {
        if (me.domain == "sina.com.cn") {
            if (getCookie("SUBP") === null && getCookie("ALF") !== null) {
                sinaAutoLogin(a);
                return !0
            }
        } else if (getCookie("SUBP") === null && (b || getCookie("SSOLoginState") !== null || getCookie("ALF") !== null)) {
            sinaAutoLogin(a);
            return !0
        }
        a(me.getSinaCookie());
        return !0
    }
    ;
    this.autoLoginCallBack2 = function(a) {
        try {
            autoLoginCallBack2(me.getSinaCookie())
        } catch (b) {}
        return !0
    }
    ;
    this.appLogin = function(a, b, c) {
        var d = tmpData.savestate ? parseInt((new Date).getTime() / 1e3 + tmpData.savestate * 86400) : 0
          , e = getCookie("ALF") ? getCookie("ALF") : 0
          , f = {
            callback: c,
            ticket: a,
            ssosavestate: d || e
        }
          , g = me.appLoginURL[b]
          , h = makeURL(g, f);
        excuteScript(me.scriptId, h, "gb2312");
        return !0
    }
    ;
    this.autoLoginCallBack3 = function(a) {
        if (a.retcode != 0) {
            me.autoLoginCallBack2(a);
            return !1
        }
        var b = me.domain == "sina.com.cn" ? "weibo.com" : me.domain;
        me.appLogin(a.ticket, b, me.name + ".autoLoginCallBack2");
        return !0
    }
    ;
    this.setLoginType = function(a) {
        var b = location.protocol == "https:" ? me.https : 0;
        b && (me.crossDomain = !1);
        me.loginType = a | b;
        return !0
    }
    ;
    this.setServerTime = function(a) {
        ssoServerTimeTimer || (ssoServerTimeTimer = new prototypeTimer(!0));
        if (a == 0) {
            ssoServerTimeTimer.clear();
            me.servertime = a;
            return !0
        }
        if (a < 1294935546)
            return !1;
        var b = function() {
            if (me.servertime) {
                me.servertime += me.calcServerTimeInterval / 1e3;
                ssoServerTimeTimer.start(me.calcServerTimeInterval, b)
            }
        };
        me.servertime = a;
        ssoServerTimeTimer.start(me.calcServerTimeInterval, b)
    }
    ;
    this.getPinCodeUrl = function(a) {
        a == undefined && (a = 0);
        pcid && (me.loginExtraQuery.pcid = pcid);
        return pincodeUrl + "?r=" + Math.floor(Math.random() * 1e8) + "&s=" + a + (pcid.length > 0 ? "&p=" + pcid : "")
    }
    ;
    this.showPinCode = function(a) {
        me.$(a).src = me.getPinCodeUrl()
    }
    ;
    this.isVfValid = function() {
        return me.getSinaCookie(!0).vf != 1
    }
    ;
    this.getVfValidUrl = function() {
        return vfValidUrl
    }
    ;
    this.enableFailRedirect = function() {
        me.failRedirect = !0
    }
    ;
    var makeNonce = function(a) {
        var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          , c = "";
        for (var d = 0; d < a; d++)
            c += b.charAt(Math.ceil(Math.random() * 1e6) % b.length);
        return c
    }
      , sinaAutoLogin = function(a) {
        autoLoginCallBack2 = a;
        var b = {
            entry: me.getEntry(),
            service: me.service,
            encoding: "UTF-8",
            gateway: 1,
            returntype: "TEXT",
            from: me.from
        };
        if (me.domain == "sina.com.cn") {
            b.callback = me.name + ".autoLoginCallBack3";
            b.service = "miniblog";
            b.useticket = 1
        } else {
            b.callback = me.name + ".autoLoginCallBack3";
            b.useticket = 1
        }
        var c = makeURL(ssoLoginUrl, b);
        excuteScript(me.scriptId, c, "gb2312");
        return !0
    }
      , getCookieExpireTimeByDomain = function(a) {
        var b = null
          , c = null;
        c = me.getSinaCookie();
        c && (b = c.et);
        return b
    }
      , addEventListener = function(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
    }
      , prototypeTimer = function(a) {
        var b = !1;
        this.start = function(c, d) {
            a && (b = setTimeout(d, c))
        }
        ;
        this.clear = function(c) {
            if (a) {
                clearTimeout(b);
                b = !1
            }
        }
        ;
        this.isset = function() {
            return b !== !1
        }
    }
      , excuteScript = function(a, b, c) {
        removeNode(a);
        var d = document.getElementsByTagName("head")[0]
          , e = document.createElement("script");
        e.charset = c || "gb2312";
        e.id = a;
        e.type = "text/javascript";
        e.src = makeURL(b, {
            client: me.getClientType(),
            _: (new Date).getTime()
        });
        d.appendChild(e)
    }
      , excuteIframe = function(a, b) {
        removeNode(a);
        var c = document.getElementsByTagName("body")[0]
          , d = document.createElement("iframe");
        d.style.display = "none";
        d.src = makeURL(b, {
            client: me.getClientType(),
            _: (new Date).getTime()
        });
        d.isReady = !1;
        addEventListener(d, "load", function() {
            if (!d.isReady) {
                d.isReady = !0;
                me.doCrossDomainCallBack({
                    scriptId: a
                })
            }
        });
        c.appendChild(d)
    }
      , makeRequest = function(a, b, c, d) {
        var e = {
            entry: me.getEntry(),
            gateway: 1,
            from: me.from,
            savestate: c,
            qrcode_flag: d,
            useticket: me.useTicket ? 1 : 0
        };
        me.failRedirect && (me.loginExtraQuery.frd = 1);
        e = objMerge(e, {
            pagerefer: document.referrer || ""
        });
        e = objMerge(e, me.loginExtraFlag);
        e = objMerge(e, me.loginExtraQuery);
        e.su = sinaSSOEncoder.base64.encode(urlencode(a));
        me.service && (e.service = me.service);
        if (me.loginType & rsa && me.servertime && sinaSSOEncoder && sinaSSOEncoder.RSAKey) {
            e.servertime = me.servertime;
            e.nonce = me.nonce;
            e.pwencode = "rsa2";
            e.rsakv = me.rsakv;
            var f = new sinaSSOEncoder.RSAKey;
            f.setPublic(me.rsaPubkey, "10001");
            b = f.encrypt([me.servertime, me.nonce].join("\t") + "\n" + b)
        } else if (me.loginType & wsse && me.servertime && sinaSSOEncoder && sinaSSOEncoder.hex_sha1) {
            e.servertime = me.servertime;
            e.nonce = me.nonce;
            e.pwencode = "wsse";
            b = sinaSSOEncoder.hex_sha1("" + sinaSSOEncoder.hex_sha1(sinaSSOEncoder.hex_sha1(b)) + me.servertime + me.nonce)
        }
        e.sp = b;
        try {
            e.sr = window.screen.width + "*" + window.screen.height
        } catch (g) {}
        return e
    }
      , loginByXMLHttpRequest = function(a, b, c, d) {
        if (typeof XMLHttpRequest == "undefined")
            return !1;
        var e = new XMLHttpRequest;
        if (!1 in e)
            return !1;
        var f = makeXMLRequestQuery(a, b, c, d)
          , g = makeURL(ssoLoginUrl, {
            client: me.getClientType(),
            _: (new Date).getTime()
        });
        console.log(f)
        try {
            e.open("POST", g, !0);
            e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            e.withCredentials = !0;
            e.onreadystatechange = function() {
                e.readyState == 4 && e.status == 200 && me.loginCallBack(parseJSON(e.responseText))
            }
            ;
            e.send(httpBuildQuery(f))
        } catch (h) {
            return !1
        }
        return !0
    }
      , makeXMLRequestQuery = function(a, b, c, d) {
        if (me.appLoginURL[me.domain]) {
            me.useTicket = 1;
            me.service = me.appDomainService[me.domain] || me.service
        }
        var e = 0;
        me.domain && (e = 2);
        me.appLoginURL[me.domain] || (e = 3);
        me.cdult !== !1 && (e = me.cdult);
        if (e == 3) {
            crossDomainTime = me.crossDomainTime;
            delete me.appLoginURL[me.domain]
        }
        var f = makeRequest(a, b, c, d);
        return objMerge(f, {
            encoding: "UTF-8",
            cdult: e,
            domain: me.domain,
            useticket: me.appLoginURL[me.domain] ? 1 : 0,
            prelt: preloginTime,
            returntype: "TEXT"
        })
    }
      , loginByScript = function(a, b, c, d) {
        var e = makeXMLRequestQuery(a, b, c, d);
        e = objMerge(e, {
            callback: me.name + ".loginCallBack"
        });
        var f = makeURL(ssoLoginUrl, e);
        excuteScript(me.scriptId, f, "gb2312")
    }
      , loginByIframe = function(a, b, c, d) {
        createIFrame(me.loginFrameName);
        var e = createForm(me.loginFormId)
          , f = makeRequest(a, b, c, d);
        f.encoding = "UTF-8";
        me.crossDomain == !1 && (f.crossdomain = 0);
        f.prelt = preloginTime;
        if (me.feedBackUrl) {
            f.url = makeURL(me.feedBackUrl, {
                framelogin: 1,
                callback: "parent." + me.name + ".feedBackUrlCallBack"
            });
            f.returntype = "META"
        } else {
            f.callback = "parent." + me.name + ".loginCallBack";
            f.returntype = "IFRAME";
            f.setdomain = me.setDomain ? 1 : 0
        }
        for (var g in me.loginExtraQuery) {
            if (typeof me.loginExtraQuery[g] == "function")
                continue;
            f[g] = me.loginExtraQuery[g]
        }
        for (var h in f)
            e.addInput(h, f[h]);
        var i = makeURL(ssoLoginUrl, objMerge({
            client: me.getClientType()
        }, me.loginExtraFlag));
        e.method = "post";
        e.action = i;
        e.target = me.loginFrameName;
        var j = !0;
        try {
            e.submit()
        } catch (k) {
            removeNode(me.loginFrameName);
            j = !1
        }
        setTimeout(function() {
            removeNode(e)
        }, 10);
        return j
    }
      , createIFrame = function(a, b) {
        b == null && (b = "javascript:false;");
        removeNode(a);
        var c = document.createElement("iframe");
        c.height = 0;
        c.width = 0;
        c.style.display = "none";
        c.name = a;
        c.id = a;
        c.src = b;
        appendChild(document.body, c);
        window.frames[a].name = a;
        return c
    }
      , createForm = function(a, b) {
        b == null && (b = "none");
        removeNode(a);
        var c = document.createElement("form");
        c.height = 0;
        c.width = 0;
        c.style.display = b;
        c.name = a;
        c.id = a;
        appendChild(document.body, c);
        document.forms[a].name = a;
        c.addInput = function(a, b, c) {
            c == null && (c = "text");
            var d = this.getElementsByTagName("input")[a];
            d && this.removeChild(d);
            d = document.createElement("input");
            this.appendChild(d);
            d.id = a;
            d.name = a;
            d.type = c;
            d.value = b
        }
        ;
        return c
    }
      , removeNode = function(a) {
        try {
            typeof a == "string" && (a = me.$(a));
            a.parentNode.removeChild(a)
        } catch (b) {}
    }
      , getType = function(a) {
        return typeof a == "undefined" ? "undefined" : a === null ? "null" : Object.prototype.toString.call(a).replace(/^\[object\s|\]$/gi, "").toLowerCase()
    }
      , isSafari = function() {
        var a = navigator.userAgent.toLowerCase();
        return /webkit/i.test(a) && !/chrome/i.test(a)
    }
      , appendChild = function(a, b) {
        a.appendChild(b)
    }
      , getCookie = function(a) {
        var b = (new RegExp(a + "=([^;]+)")).exec(document.cookie);
        return b == null ? null : b[1]
    }
      , makeURL = function(a, b) {
        return a + urlAndChar(a) + httpBuildQuery(b)
    }
      , urlAndChar = function(a) {
        return /\?/.test(a) ? "&" : "?"
    }
      , urlencode = function(a) {
        return encodeURIComponent(a)
    }
      , urldecode = function(a) {
        if (a == null)
            return "";
        try {
            return decodeURIComponent(a)
        } catch (b) {
            return ""
        }
    }
      , httpBuildQuery = function(a) {
        if (typeof a != "object")
            return "";
        var b = [];
        for (var c in a) {
            if (typeof a[c] == "function")
                continue;
            b.push(c + "=" + urlencode(a[c]))
        }
        return b.join("&")
    }
      , parse_str = function(a) {
        var b = a.split("&"), c, d = {};
        for (var e = 0; e < b.length; e++) {
            c = b[e].split("=");
            d[c[0]] = urldecode(c[1])
        }
        return d
    }
      , parseJSON = function(str) {
        return typeof str == "object" ? str : window.JSON ? JSON.parse(str) : eval("(" + str + ")")
    }
      , objMerge = function(a, b) {
        for (var c in b)
            a[c] = b[c];
        return a
    };
    this.$ = function(a) {
        return document.getElementById(a)
    }
    ;
    this.generateVisitor = function() {
        var a, b = !1;
        for (var c = 0; c < this.generateVisitorDomain.length; c++) {
            a = new RegExp(this.generateVisitorDomain[c]);
            if (a.test(document.domain)) {
                b = !0;
                break
            }
        }
        if (!b)
            return !1;
        try {
            if (me.shouldGenerateVisitor() && !me.$("visitorfrm84747h4784")) {
                document.body.insertAdjacentHTML("beforeEnd", "<iframe id='visitorfrm84747h4784' style='position:absolute;left:0;top:0;border:none;width:1px;height:1px' src='" + generateVisitorUrl + "?from=iframe'/>");
                setTimeout(function() {
                    try {
                        var a = me.$("visitorfrm84747h4784");
                        a && a.parentNode.removeChild(a)
                    } catch (b) {}
                }, 3e4)
            }
        } catch (d) {
            return !1
        }
        return !0
    }
    ;
    this.shouldGenerateVisitor = function() {
        var a = !1
          , b = !1
          , c = getCookie("SUBP");
        c && (a = !0);
        var d = getCookie("SUP");
        d && (b = !0);
        return !a && !b ? !0 : !1
    }
}
var sinaSSOEncoder = sinaSSOEncoder || {};
(function() {
    var a = 0
      , b = 8;
    this.hex_sha1 = function(a) {
        return i(c(h(a), a.length * b))
    }
    ;
    var c = function(a, b) {
        a[b >> 5] |= 128 << 24 - b % 32;
        a[(b + 64 >> 9 << 4) + 15] = b;
        var c = Array(80)
          , h = 1732584193
          , i = -271733879
          , j = -1732584194
          , k = 271733878
          , l = -1009589776;
        for (var m = 0; m < a.length; m += 16) {
            var n = h
              , o = i
              , p = j
              , q = k
              , r = l;
            for (var s = 0; s < 80; s++) {
                s < 16 ? c[s] = a[m + s] : c[s] = g(c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16], 1);
                var t = f(f(g(h, 5), d(s, i, j, k)), f(f(l, c[s]), e(s)));
                l = k;
                k = j;
                j = g(i, 30);
                i = h;
                h = t
            }
            h = f(h, n);
            i = f(i, o);
            j = f(j, p);
            k = f(k, q);
            l = f(l, r)
        }
        return [h, i, j, k, l]
    }
      , d = function(a, b, c, d) {
        return a < 20 ? b & c | ~b & d : a < 40 ? b ^ c ^ d : a < 60 ? b & c | b & d | c & d : b ^ c ^ d
    }
      , e = function(a) {
        return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514
    }
      , f = function(a, b) {
        var c = (a & 65535) + (b & 65535)
          , d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | c & 65535
    }
      , g = function(a, b) {
        return a << b | a >>> 32 - b
    }
      , h = function(a) {
        var c = []
          , d = (1 << b) - 1;
        for (var e = 0; e < a.length * b; e += b)
            c[e >> 5] |= (a.charCodeAt(e / b) & d) << 24 - e % 32;
        return c
    }
      , i = function(b) {
        var c = a ? "0123456789ABCDEF" : "0123456789abcdef"
          , d = "";
        for (var e = 0; e < b.length * 4; e++)
            d += c.charAt(b[e >> 2] >> (3 - e % 4) * 8 + 4 & 15) + c.charAt(b[e >> 2] >> (3 - e % 4) * 8 & 15);
        return d
    }
      , j = function(a) {
        var b = ""
          , c = 0;
        for (; c < a.length; c++)
            b += "%" + k(a[c]);
        return decodeURIComponent(b)
    }
      , k = function(a) {
        var b = "0" + a.toString(16);
        return b.length <= 2 ? b : b.substr(1)
    };
    this.base64 = {
        encode: function(a) {
            a = "" + a;
            if (a == "")
                return "";
            var b = "", c, d, e = "", f, g, h, i = "", j = 0;
            do {
                c = a.charCodeAt(j++);
                d = a.charCodeAt(j++);
                e = a.charCodeAt(j++);
                f = c >> 2;
                g = (c & 3) << 4 | d >> 4;
                h = (d & 15) << 2 | e >> 6;
                i = e & 63;
                isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64);
                b = b + this._keys.charAt(f) + this._keys.charAt(g) + this._keys.charAt(h) + this._keys.charAt(i);
                c = d = e = "";
                f = g = h = i = ""
            } while (j < a.length);
            return b
        },
        decode: function(a, b, c) {
            var d = function(a, b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c] === b)
                        return c;
                return -1
            };
            typeof a == "string" && (a = a.split(""));
            var e = [], f, g, h = "", i, j, k, l = "";
            a.length % 4 == 0;
            var m = /[^A-Za-z0-9+\/=]/
              , n = this._keys.split("");
            if (b == "urlsafe") {
                m = /[^A-Za-z0-9-_=]/;
                n = this._keys_urlsafe.split("")
            }
            if (b == "subp_v2") {
                m = /[^A-Za-z0-9_=-]/;
                n = this._subp_v2_keys.split("")
            }
            if (b == "subp_v3_3") {
                m = /[^A-Za-z0-9-_.-]/;
                n = this._subp_v3_keys_3.split("")
            }
            var o = 0;
            if (b == "binnary") {
                n = [];
                for (o = 0; o <= 64; o++)
                    n[o] = o + 128
            }
            if (b != "binnary" && m.test(a.join("")))
                return c == "array" ? [] : "";
            o = 0;
            do {
                i = d(n, a[o++]);
                j = d(n, a[o++]);
                k = d(n, a[o++]);
                l = d(n, a[o++]);
                f = i << 2 | j >> 4;
                g = (j & 15) << 4 | k >> 2;
                h = (k & 3) << 6 | l;
                e.push(f);
                k != 64 && k != -1 && e.push(g);
                l != 64 && l != -1 && e.push(h);
                f = g = h = "";
                i = j = k = l = ""
            } while (o < a.length);
            if (c == "array")
                return e;
            var p = ""
              , q = 0;
            for (; q < e.lenth; q++)
                p += String.fromCharCode(e[q]);
            return p
        },
        _keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        _keys_urlsafe: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
        _subp_v2_keys: "uAL715W8e3jJCcNU0lT_FSXVgxpbEDdQ4vKaIOH2GBPtfzqsmYZo-wRM9i6hynrk=",
        _subp_v3_keys_3: "5WFh28sGziZTeS1lBxCK-HgPq9IdMUwknybo.LJrQD3uj_Va7pE0XfcNR4AOYvm6t"
    };
    this.Cookie = {
        decode: function(a) {
            var b = []
              , c = a.substr(0, 3)
              , d = a.substr(3);
            switch (c) {
            case "v01":
                for (var e = 0; e < d.length; e += 2)
                    b.push(parseInt(d.substr(e, 2), 16));
                return decodeURIComponent(j(sinaSSOEncoder.base64.decode(b, "binnary", "array")));
            case "v02":
                d = d.replace(/\./g, "=");
                b = sinaSSOEncoder.base64.decode(d, "urlsafe", "array");
                return j(sinaSSOEncoder.base64.decode(b, "binnary", "array"));
            default:
                return decodeURIComponent(a)
            }
        }
    };
    this.getSUBPCookie = {
        __parse: function(a) {
            var b, c, d, e, f, g = 0, h, i = {}, k = "", l = "";
            if (!a)
                return i;
            do {
                c = a[g];
                b = ++g;
                for (h = g; h < c + b; h++,
                g++)
                    k += String.fromCharCode(a[h]);
                e = a[g];
                b = ++g;
                if (k == "status" || k == "flag")
                    for (h = g; h < e + b; h++,
                    g++)
                        l += a[h];
                else {
                    l = a.slice(b, e + b);
                    try {
                        l = j(l)
                    } catch (m) {
                        l = ""
                    }
                    g += e
                }
                i[k] = l;
                k = "";
                l = ""
            } while (g < a.length);
            return i
        },
        decode: function(a) {
            var b = [], c, d = a.substr(0, 3), e = decodeURIComponent(a.substr(3));
            switch (d) {
            case "002":
                b = sinaSSOEncoder.base64.decode(e, "subp_v2", "array");
                return sinaSSOEncoder.getSUBPCookie.__parse(b);
            case "003":
                c = e.substr(0, 1);
                e = e.substr(1);
                b = sinaSSOEncoder.base64.decode(e, "subp_v3_" + c, "array");
                return sinaSSOEncoder.getSUBPCookie.__parse(b);
            default:
                return decodeURIComponent(a)
            }
        }
    }
}
).call(sinaSSOEncoder);
(function() {
    function bt(a) {
        var b = bp(a, this.n.bitLength() + 7 >> 3);
        if (b == null)
            return null;
        var c = this.doPublic(b);
        if (c == null)
            return null;
        var d = c.toString(16);
        return (d.length & 1) == 0 ? d : "0" + d
    }
    function bs(a) {
        return a.modPowInt(this.e, this.n)
    }
    function br(a, b) {
        if (a != null && b != null && a.length > 0 && b.length > 0) {
            this.n = bm(a, 16);
            this.e = parseInt(b, 16)
        } else
            alert("Invalid RSA public key")
    }
    function bq() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null
    }
    function bp(a, b) {
        if (b < a.length + 11) {
            alert("Message too long for RSA");
            return null
        }
        var c = []
          , e = a.length - 1;
        while (e >= 0 && b > 0) {
            var f = a.charCodeAt(e--);
            if (f < 128)
                c[--b] = f;
            else if (f > 127 && f < 2048) {
                c[--b] = f & 63 | 128;
                c[--b] = f >> 6 | 192
            } else {
                c[--b] = f & 63 | 128;
                c[--b] = f >> 6 & 63 | 128;
                c[--b] = f >> 12 | 224
            }
        }
        c[--b] = 0;
        var g = new bl
          , h = [];
        while (b > 2) {
            h[0] = 0;
            while (h[0] == 0)
                g.nextBytes(h);
            c[--b] = h[0]
        }
        c[--b] = 2;
        c[--b] = 0;
        return new d(c)
    }
    function bo(a) {
        return a < 16 ? "0" + a.toString(16) : a.toString(16)
    }
    function bn(a, b) {
        var c = ""
          , d = 0;
        while (d + b < a.length) {
            c += a.substring(d, d + b) + "\n";
            d += b
        }
        return c + a.substring(d, a.length)
    }
    function bm(a, b) {
        return new d(a,b)
    }
    function bl() {}
    function bk(a) {
        var b;
        for (b = 0; b < a.length; ++b)
            a[b] = bj()
    }
    function bj() {
        if (bc == null) {
            bg();
            bc = ba();
            bc.init(bd);
            for (be = 0; be < bd.length; ++be)
                bd[be] = 0;
            be = 0
        }
        return bc.next()
    }
    function bg() {
        bf((new Date).getTime())
    }
    function bf(a) {
        bd[be++] ^= a & 255;
        bd[be++] ^= a >> 8 & 255;
        bd[be++] ^= a >> 16 & 255;
        bd[be++] ^= a >> 24 & 255;
        be >= bb && (be -= bb)
    }
    function ba() {
        return new Z
    }
    function _() {
        var a;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        a = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = a;
        return this.S[a + this.S[this.i] & 255]
    }
    function $(a) {
        var b, c, d;
        for (b = 0; b < 256; ++b)
            this.S[b] = b;
        c = 0;
        for (b = 0; b < 256; ++b) {
            c = c + this.S[b] + a[b % a.length] & 255;
            d = this.S[b];
            this.S[b] = this.S[c];
            this.S[c] = d
        }
        this.i = 0;
        this.j = 0
    }
    function Z() {
        this.i = 0;
        this.j = 0;
        this.S = []
    }
    function Y(a, b) {
        var c;
        a < 256 || b.isEven() ? c = new J(b) : c = new Q(b);
        return this.exp(a, c)
    }
    function X(a, b) {
        if (a > 4294967295 || a < 1)
            return d.ONE;
        var c = e()
          , f = e()
          , g = b.convert(this)
          , h = y(a) - 1;
        g.copyTo(c);
        while (--h >= 0) {
            b.sqrTo(c, f);
            if ((a & 1 << h) > 0)
                b.mulTo(f, g, c);
            else {
                var i = c;
                c = f;
                f = i
            }
        }
        return b.revert(c)
    }
    function W() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0
    }
    function V(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }
    function U(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }
    function T(a) {
        while (a.t <= this.mt2)
            a[a.t++] = 0;
        for (var b = 0; b < this.m.t; ++b) {
            var c = a[b] & 32767
              , d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
            c = b + this.m.t;
            a[c] += this.m.am(0, d, a, b, 0, this.m.t);
            while (a[c] >= a.DV) {
                a[c] -= a.DV;
                a[++c]++
            }
        }
        a.clamp();
        a.drShiftTo(this.m.t, a);
        a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
    }
    function S(a) {
        var b = e();
        a.copyTo(b);
        this.reduce(b);
        return b
    }
    function R(a) {
        var b = e();
        a.abs().dlShiftTo(this.m.t, b);
        b.divRemTo(this.m, null, b);
        a.s < 0 && b.compareTo(d.ZERO) > 0 && this.m.subTo(b, b);
        return b
    }
    function Q(a) {
        this.m = a;
        this.mp = a.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << a.DB - 15) - 1;
        this.mt2 = 2 * a.t
    }
    function P() {
        if (this.t < 1)
            return 0;
        var a = this[0];
        if ((a & 1) == 0)
            return 0;
        var b = a & 3;
        b = b * (2 - (a & 15) * b) & 15;
        b = b * (2 - (a & 255) * b) & 255;
        b = b * (2 - ((a & 65535) * b & 65535)) & 65535;
        b = b * (2 - a * b % this.DV) % this.DV;
        return b > 0 ? this.DV - b : -b
    }
    function O(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }
    function N(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }
    function M(a) {
        a.divRemTo(this.m, null, a)
    }
    function L(a) {
        return a
    }
    function K(a) {
        return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
    }
    function J(a) {
        this.m = a
    }
    function I(a) {
        var b = e();
        this.abs().divRemTo(a, null, b);
        this.s < 0 && b.compareTo(d.ZERO) > 0 && a.subTo(b, b);
        return b
    }
    function H(a, b, c) {
        var f = a.abs();
        if (!(f.t <= 0)) {
            var g = this.abs();
            if (g.t < f.t) {
                b != null && b.fromInt(0);
                c != null && this.copyTo(c);
                return
            }
            c == null && (c = e());
            var h = e()
              , i = this.s
              , j = a.s
              , k = this.DB - y(f[f.t - 1]);
            if (k > 0) {
                f.lShiftTo(k, h);
                g.lShiftTo(k, c)
            } else {
                f.copyTo(h);
                g.copyTo(c)
            }
            var l = h.t
              , m = h[l - 1];
            if (m == 0)
                return;
            var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0)
              , o = this.FV / n
              , p = (1 << this.F1) / n
              , q = 1 << this.F2
              , r = c.t
              , s = r - l
              , t = b == null ? e() : b;
            h.dlShiftTo(s, t);
            if (c.compareTo(t) >= 0) {
                c[c.t++] = 1;
                c.subTo(t, c)
            }
            d.ONE.dlShiftTo(l, t);
            t.subTo(h, h);
            while (h.t < l)
                h[h.t++] = 0;
            while (--s >= 0) {
                var u = c[--r] == m ? this.DM : Math.floor(c[r] * o + (c[r - 1] + q) * p);
                if ((c[r] += h.am(0, u, c, s, 0, l)) < u) {
                    h.dlShiftTo(s, t);
                    c.subTo(t, c);
                    while (c[r] < --u)
                        c.subTo(t, c)
                }
            }
            if (b != null) {
                c.drShiftTo(l, b);
                i != j && d.ZERO.subTo(b, b)
            }
            c.t = l;
            c.clamp();
            k > 0 && c.rShiftTo(k, c);
            i < 0 && d.ZERO.subTo(c, c)
        }
    }
    function G(a) {
        var b = this.abs()
          , c = a.t = 2 * b.t;
        while (--c >= 0)
            a[c] = 0;
        for (c = 0; c < b.t - 1; ++c) {
            var d = b.am(c, b[c], a, 2 * c, 0, 1);
            if ((a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV) {
                a[c + b.t] -= b.DV;
                a[c + b.t + 1] = 1
            }
        }
        a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1));
        a.s = 0;
        a.clamp()
    }
    function F(a, b) {
        var c = this.abs()
          , e = a.abs()
          , f = c.t;
        b.t = f + e.t;
        while (--f >= 0)
            b[f] = 0;
        for (f = 0; f < e.t; ++f)
            b[f + c.t] = c.am(0, e[f], b, f, 0, c.t);
        b.s = 0;
        b.clamp();
        this.s != a.s && d.ZERO.subTo(b, b)
    }
    function E(a, b) {
        var c = 0
          , d = 0
          , e = Math.min(a.t, this.t);
        while (c < e) {
            d += this[c] - a[c];
            b[c++] = d & this.DM;
            d >>= this.DB
        }
        if (a.t < this.t) {
            d -= a.s;
            while (c < this.t) {
                d += this[c];
                b[c++] = d & this.DM;
                d >>= this.DB
            }
            d += this.s
        } else {
            d += this.s;
            while (c < a.t) {
                d -= a[c];
                b[c++] = d & this.DM;
                d >>= this.DB
            }
            d -= a.s
        }
        b.s = d < 0 ? -1 : 0;
        d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d);
        b.t = c;
        b.clamp()
    }
    function D(a, b) {
        b.s = this.s;
        var c = Math.floor(a / this.DB);
        if (c >= this.t)
            b.t = 0;
        else {
            var d = a % this.DB
              , e = this.DB - d
              , f = (1 << d) - 1;
            b[0] = this[c] >> d;
            for (var g = c + 1; g < this.t; ++g) {
                b[g - c - 1] |= (this[g] & f) << e;
                b[g - c] = this[g] >> d
            }
            d > 0 && (b[this.t - c - 1] |= (this.s & f) << e);
            b.t = this.t - c;
            b.clamp()
        }
    }
    function C(a, b) {
        var c = a % this.DB, d = this.DB - c, e = (1 << d) - 1, f = Math.floor(a / this.DB), g = this.s << c & this.DM, h;
        for (h = this.t - 1; h >= 0; --h) {
            b[h + f + 1] = this[h] >> d | g;
            g = (this[h] & e) << c
        }
        for (h = f - 1; h >= 0; --h)
            b[h] = 0;
        b[f] = g;
        b.t = this.t + f + 1;
        b.s = this.s;
        b.clamp()
    }
    function B(a, b) {
        for (var c = a; c < this.t; ++c)
            b[c - a] = this[c];
        b.t = Math.max(this.t - a, 0);
        b.s = this.s
    }
    function A(a, b) {
        var c;
        for (c = this.t - 1; c >= 0; --c)
            b[c + a] = this[c];
        for (c = a - 1; c >= 0; --c)
            b[c] = 0;
        b.t = this.t + a;
        b.s = this.s
    }
    function z() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + y(this[this.t - 1] ^ this.s & this.DM)
    }
    function y(a) {
        var b = 1, c;
        if ((c = a >>> 16) != 0) {
            a = c;
            b += 16
        }
        if ((c = a >> 8) != 0) {
            a = c;
            b += 8
        }
        if ((c = a >> 4) != 0) {
            a = c;
            b += 4
        }
        if ((c = a >> 2) != 0) {
            a = c;
            b += 2
        }
        if ((c = a >> 1) != 0) {
            a = c;
            b += 1
        }
        return b
    }
    function x(a) {
        var b = this.s - a.s;
        if (b != 0)
            return b;
        var c = this.t;
        b = c - a.t;
        if (b != 0)
            return b;
        while (--c >= 0)
            if ((b = this[c] - a[c]) != 0)
                return b;
        return 0
    }
    function w() {
        return this.s < 0 ? this.negate() : this
    }
    function v() {
        var a = e();
        d.ZERO.subTo(this, a);
        return a
    }
    function u(a) {
        if (this.s < 0)
            return "-" + this.negate().toString(a);
        var b;
        if (a == 16)
            b = 4;
        else if (a == 8)
            b = 3;
        else if (a == 2)
            b = 1;
        else if (a == 32)
            b = 5;
        else if (a == 4)
            b = 2;
        else
            return this.toRadix(a);
        var c = (1 << b) - 1, d, e = !1, f = "", g = this.t, h = this.DB - g * this.DB % b;
        if (g-- > 0) {
            if (h < this.DB && (d = this[g] >> h) > 0) {
                e = !0;
                f = n(d)
            }
            while (g >= 0) {
                if (h < b) {
                    d = (this[g] & (1 << h) - 1) << b - h;
                    d |= this[--g] >> (h += this.DB - b)
                } else {
                    d = this[g] >> (h -= b) & c;
                    if (h <= 0) {
                        h += this.DB;
                        --g
                    }
                }
                d > 0 && (e = !0);
                e && (f += n(d))
            }
        }
        return e ? f : "0"
    }
    function t() {
        var a = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == a)
            --this.t
    }
    function s(a, b) {
        var c;
        if (b == 16)
            c = 4;
        else if (b == 8)
            c = 3;
        else if (b == 256)
            c = 8;
        else if (b == 2)
            c = 1;
        else if (b == 32)
            c = 5;
        else if (b == 4)
            c = 2;
        else {
            this.fromRadix(a, b);
            return
        }
        this.t = 0;
        this.s = 0;
        var e = a.length
          , f = !1
          , g = 0;
        while (--e >= 0) {
            var h = c == 8 ? a[e] & 255 : o(a, e);
            if (h < 0) {
                a.charAt(e) == "-" && (f = !0);
                continue
            }
            f = !1;
            if (g == 0)
                this[this.t++] = h;
            else if (g + c > this.DB) {
                this[this.t - 1] |= (h & (1 << this.DB - g) - 1) << g;
                this[this.t++] = h >> this.DB - g
            } else
                this[this.t - 1] |= h << g;
            g += c;
            g >= this.DB && (g -= this.DB)
        }
        if (c == 8 && (a[0] & 128) != 0) {
            this.s = -1;
            g > 0 && (this[this.t - 1] |= (1 << this.DB - g) - 1 << g)
        }
        this.clamp();
        f && d.ZERO.subTo(this, this)
    }
    function r(a) {
        var b = e();
        b.fromInt(a);
        return b
    }
    function q(a) {
        this.t = 1;
        this.s = a < 0 ? -1 : 0;
        a > 0 ? this[0] = a : a < -1 ? this[0] = a + DV : this.t = 0
    }
    function p(a) {
        for (var b = this.t - 1; b >= 0; --b)
            a[b] = this[b];
        a.t = this.t;
        a.s = this.s
    }
    function o(a, b) {
        var c = k[a.charCodeAt(b)];
        return c == null ? -1 : c
    }
    function n(a) {
        return j.charAt(a)
    }
    function h(a, b, c, d, e, f) {
        var g = b & 16383
          , h = b >> 14;
        while (--f >= 0) {
            var i = this[a] & 16383
              , j = this[a++] >> 14
              , k = h * i + j * g;
            i = g * i + ((k & 16383) << 14) + c[d] + e;
            e = (i >> 28) + (k >> 14) + h * j;
            c[d++] = i & 268435455
        }
        return e
    }
    function g(a, b, c, d, e, f) {
        var g = b & 32767
          , h = b >> 15;
        while (--f >= 0) {
            var i = this[a] & 32767
              , j = this[a++] >> 15
              , k = h * i + j * g;
            i = g * i + ((k & 32767) << 15) + c[d] + (e & 1073741823);
            e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30);
            c[d++] = i & 1073741823
        }
        return e
    }
    function f(a, b, c, d, e, f) {
        while (--f >= 0) {
            var g = b * this[a++] + c[d] + e;
            e = Math.floor(g / 67108864);
            c[d++] = g & 67108863
        }
        return e
    }
    function e() {
        return new d(null)
    }
    function d(a, b, c) {
        a != null && ("number" == typeof a ? this.fromNumber(a, b, c) : b == null && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
    }
    var a, b = 0xdeadbeefcafe, c = (b & 16777215) == 15715070;
    if (c && navigator.appName == "Microsoft Internet Explorer") {
        d.prototype.am = g;
        a = 30
    } else if (c && navigator.appName != "Netscape") {
        d.prototype.am = f;
        a = 26
    } else {
        d.prototype.am = h;
        a = 28
    }
    d.prototype.DB = a;
    d.prototype.DM = (1 << a) - 1;
    d.prototype.DV = 1 << a;
    var i = 52;
    d.prototype.FV = Math.pow(2, i);
    d.prototype.F1 = i - a;
    d.prototype.F2 = 2 * a - i;
    var j = "0123456789abcdefghijklmnopqrstuvwxyz", k = [], l, m;
    l = "0".charCodeAt(0);
    for (m = 0; m <= 9; ++m)
        k[l++] = m;
    l = "a".charCodeAt(0);
    for (m = 10; m < 36; ++m)
        k[l++] = m;
    l = "A".charCodeAt(0);
    for (m = 10; m < 36; ++m)
        k[l++] = m;
    J.prototype.convert = K;
    J.prototype.revert = L;
    J.prototype.reduce = M;
    J.prototype.mulTo = N;
    J.prototype.sqrTo = O;
    Q.prototype.convert = R;
    Q.prototype.revert = S;
    Q.prototype.reduce = T;
    Q.prototype.mulTo = V;
    Q.prototype.sqrTo = U;
    d.prototype.copyTo = p;
    d.prototype.fromInt = q;
    d.prototype.fromString = s;
    d.prototype.clamp = t;
    d.prototype.dlShiftTo = A;
    d.prototype.drShiftTo = B;
    d.prototype.lShiftTo = C;
    d.prototype.rShiftTo = D;
    d.prototype.subTo = E;
    d.prototype.multiplyTo = F;
    d.prototype.squareTo = G;
    d.prototype.divRemTo = H;
    d.prototype.invDigit = P;
    d.prototype.isEven = W;
    d.prototype.exp = X;
    d.prototype.toString = u;
    d.prototype.negate = v;
    d.prototype.abs = w;
    d.prototype.compareTo = x;
    d.prototype.bitLength = z;
    d.prototype.mod = I;
    d.prototype.modPowInt = Y;
    d.ZERO = r(0);
    d.ONE = r(1);
    Z.prototype.init = $;
    Z.prototype.next = _;
    var bb = 256, bc, bd, be;
    if (bd == null) {
        bd = [];
        be = 0;
        var bh;
        if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && typeof window.crypto.random == "function") {
            var bi = window.crypto.random(32);
            for (bh = 0; bh < bi.length; ++bh)
                bd[be++] = bi.charCodeAt(bh) & 255
        }
        while (be < bb) {
            bh = Math.floor(65536 * Math.random());
            bd[be++] = bh >>> 8;
            bd[be++] = bh & 255
        }
        be = 0;
        bg()
    }
    bl.prototype.nextBytes = bk;
    bq.prototype.doPublic = bs;
    bq.prototype.setPublic = br;
    bq.prototype.encrypt = bt;
    this.RSAKey = bq
}
).call(sinaSSOEncoder);
sinaSSOController = new SSOController;
sinaSSOController.init();
var f = new sinaSSOEncoder.RSAKey;
//   公钥在预登录中可以返回
var pubkey="-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDrKjhWhmGIf6GAvdtcq9XyHHv9\nWcCQyy0kWoesJTBiiCcpKT5VBjUFCOf5qju3f0MzIxSQ+RX21jxV/i8IpJs1P0RK\n05k8rMAtt4Sru45CqbG7//s4vhjXjoeg5Bubj3OpKO4MzuH2c5iEuXd+T+noihu+\nSVknrEp5mzGB1kQkQwIDAQAB\n-----END PUBLIC KEY-----";

f.setPublic(pubkey, "10001");
//     servertime  和   nonce  在预登录中可以返回   password是加密参数
var servertime=1645711760,nonce="EI97CQ",password='11111aaaa';
var b = f.encrypt([servertime, nonce].join("\t") + "\n" + password)
// console.log(b);    用上面这个加密就行   返回加密的sp参数
//   这个js逆向了没什么用，web端登录成功了仍然要短信啥的