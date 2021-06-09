// 判断当前操作系统及app版本
export const APPSYS = () => {
    let s;
    let u = navigator.userAgent;
    let v = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        s = "Android";
    } else if (isIOS) {
        s = "IOS";
    } else {
        s = "Android";
    }
    return {
        v,
        s
    }
}

/**判空方法*/
export const notNull = obj => {
    if (obj === null) {
        return false;
    } else if (obj === undefined) {
        return false;
    } else if (obj === "undefined") {
        return false;
    } else if (obj === "") {
        return false;
    } else if (obj === "[]") {
        return false;
    } else if (obj === "{}") {
        return false;
    } else if (obj === {}) {

    } else if (obj === []) {

    } else {
        return true;
    }
};

export const callAppMethod = obj => {
	let callName = obj.callName || "";
	let parameters = obj.parameters || {};
	let callback = obj.callback || function(data) {};
	if(!callName) {
		return
	} else {
		setupWebViewJavascriptBridge(function(bridge) {
			bridge.callHandler(callName, parameters, callback)
		})
	}
}

/**获取移动端设备
 *1：Android；2：ios
 */
export const isMobile = function() {
	if(/android/i.test(navigator.userAgent) || /adr/i.test(navigator.userAgent)) {
		return 1
	} else if(/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
		return 2
	} else {
		return 1
	}
}

// 从url截取参数
function getParamsFromUrl(arg = ""){
    let url = window.location.href;
    if (url.indexOf("?") <= 0) {
        return;
    }
    let paramsString = url.split("?")[1];
    if (paramsString) {
        let paramsObj = {};
        if (paramsString.indexOf('&amp;') > 0) {
            paramsString = paramsString.indexOf("#/") > -1 ? paramsString.replace(/#\//g, "&amp;") : paramsString;
            paramsString.split("&amp;").forEach(function (item, index) {
                paramsObj[item.split("=")[0]] = item.split("=")[1]
            });
        } else {
            paramsString = paramsString.indexOf("#/") > -1 ? paramsString.replace(/#\//g, "&") : paramsString;
            paramsString.split("&").forEach(function (item, index) {
                paramsObj[item.split("=")[0]] = item.split("=")[1]
            });
        }
        if (arg && paramsObj[arg]) {
            return paramsObj[arg]
        } else {
            console.log("查询的参数不存在")
            return ""
        }
    } else {
        return
    }
}
// 与缤纷生活的交互方法jsBridge
function setupWebViewJavascriptBridge(callback) {
	if(window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener(
			'WebViewJavascriptBridgeReady',
			function() {
				callback(WebViewJavascriptBridge);
			},
			false
		);
	}
	if(window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe);
	}, 0);
}

/**与客户端进行交互
* 自定义参数
* userParameters.uiJumpId
*      模块详情ID
* userParameters.uiParmValue
*      模块详情ID
* userParameters.type
*      跳转模块类型: h5/app
*
* userParameters.isLogin
*      是否需要登陆: 0/1
*
*  actIsHtml5=1   跳转url
   actIsHtml5=0跳转app本地模块	—>type

   actIsLogin=1 需要登录
   actIsLogin=0 不需要登录		—> 新增拼接参数 ->isLogin

   actUrl 是模块id，可为空    		 —>uiJumpId

   actDetailsId 模块详情id  		—>uiParmValue
   在actIsHtml5=1时，需要增加下面的参数

   actHtml5Type 跳转H5类型      —>actHtml5Type(新增)
   actHtml5Url	 跳转H5地址	   —>jumpURLStr
*/
function openApp(userParameters) {
	// 判断浏览器
	var Navigator = navigator.userAgent;
	var ifChrome = Navigator.match(/Chrome/i) != null && Navigator.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null ?
		true : false;
	var ifAndroid = (Navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
	var ifiPad = (Navigator.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
	var ifiPhone = (!ifiPad && Navigator.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
	var ifSafari = (ifiPhone || ifiPad) && Navigator.match(/Safari/);
	var version = 0;
	ifSafari && (version = Navigator.match(/Version\/([\d\.]+)/));
	// safari浏览器版本
	version = parseFloat(version[1], 10);
	// 是否从微信打开
	var ifWeixin = navigator.userAgent.indexOf("MicroMessenger") >= 0; // weixin

	var bocSchemeUrl = "mlife";
	var loadTimer;
	//拼接自定义参数
	if(!$.isEmptyObject(userParameters)) {
		bocSchemeUrl += "?"
		for(var item in userParameters) {
			bocSchemeUrl += item + "=" + ((userParameters[item] != undefined && userParameters[item] != "undefined") ?
				userParameters[item] : "") + "&";
		}
		bocSchemeUrl = bocSchemeUrl.replace(/\&$/, "");
	}
	var encodeParams = encodeURIComponent(bocSchemeUrl);
	// 由安卓APP提供
	var AppConfig = {
		"scheme": "boc",
		"host": "mlife",
		"package": "com.forms",
		"action": "android.intent.action.VIEW",
		"category": "android.intent.category.BROWSABLE",
		"FAILBACK_ANDROID": "http://a.app.qq.com/o/simple.jsp?pkgname=com.forms&android_schema=boc://" + encodeParams, //安卓下载地址--应用宝下载地址
		"FAILBACK_IOS": "http://a.app.qq.com/o/simple.jsp?pkgname=com.forms&ios_scheme=bocMlife://" + encodeParams //ios下载地址--应用宝下载地址
	};

	if(ifAndroid) {
		var s = getAndroidSchema(AppConfig, ifChrome);
		if(ifChrome) { // chrome会自动识别S.browser_fallback_url如果没有安装则打开下载链接地址
			//			window.location.href = s;
			window.location.href = AppConfig.FAILBACK_ANDROID;
		} else
		if(ifWeixin) { // 微信无法打开APP，跳转到下载页面//ld---跳转到应用宝下载链接
			window.location.href = AppConfig.FAILBACK_ANDROID;
		} else { // 其他浏览器3秒内没打开则跳转到下载链接
			window.location.href = AppConfig.FAILBACK_ANDROID;

			//			window.location.href = s;
			//			var start = Date.now();
			//			// 如果页面在后台运行返回，如果超过3秒没有打开APP，则没有安装，跳转到应用市场
			//			loadTimer = setTimeout(function() {
			//				if(document.hidden || document.webkitHidden) {
			//					return;
			//				}
			//				if(Date.now() - start <= 3000 + 200) {
			//					//设置下载按钮的地址
			//					if(location.port) {
			//						location.href = "https://mlife.jf365.boc.cn/AppPrj/download.html";
			//					} else {
			//						location.href = "https://mlife.jf365.boc.cn/AppPrj/download.html";
			//					}
			//				} else {}
			//			}, 3000);
		}
		// 当页面在后台运行时清空定时器防止页面跳转到下载页
		var visibilitychange = function() {
			var tag = document.hidden || document.webkitHidden;
			tag && clearTimeout(loadTimer);
		}
		document.addEventListener('visibilitychange', visibilitychange, false);
		document.addEventListener("webkitvisibilitychange", visibilitychange, false);
		window.addEventListener("pagehide", function() {
			clearTimeout(loadTimer);
		}, false);
	}

	if(ifiPhone) {
		if(ifWeixin) {
			window.location.href = AppConfig.FAILBACK_IOS;
		} else {
			window.location.href = AppConfig.FAILBACK_IOS;
			//			window.location.href = 'boc://mlife/open';
			//			var start = Date.now();
			//			// 如果页面在后台运行返回，如果超过3秒没有打开APP，则没有安装，跳转到IOS应用市场
			//			loadTimer = setTimeout(function() {
			//				if(document.hidden || document.webkitHidden) {
			//					return;
			//				}
			//				if(Date.now() - start > 3000 + 200) {
			//
			//				} else {
			//					//设置下载按钮的地址
			//					if(location.port) {
			//						location.href = "https://mlife.jf365.boc.cn/AppPrj/download.html";
			//					} else {
			//						location.href = "https://mlife.jf365.boc.cn/AppPrj/download.html";
			//					}
			//				}
			//			}, 3000);

		}
		// 当页面在后台运行时清空定时器防止页面跳转到下载页
		var visibilitychange = function() {
			var tag = document.hidden || document.webkitHidden;
			tag && clearTimeout(loadTimer);
		}
		document.addEventListener('visibilitychange', visibilitychange, false);
		document.addEventListener("webkitvisibilitychange", visibilitychange, false);
		window.addEventListener("pagehide", function() {
			clearTimeout(loadTimer);
		}, false);
	}

};

/**android打开app 地址
 *@AppConfig
 *@ifChrome
 * */
function getAndroidSchema(AppConfig, ifChrome) {
	var schemaStr = 'mlife/open?a=test';
	if(ifChrome) {
		schemaStr = "intent://" + schemaStr + "#Intent;" +
			"scheme=" + AppConfig.scheme + ";" +
			"package=" + AppConfig.package + ";" +
			"category=" + AppConfig.category + ";" +
			"S.browser_fallback_url=" + encodeURIComponent(AppConfig.FAILBACK_ANDROID) + ";" +
			"end";
	} else {
		schemaStr = "boc://mlife/open";
	}
	return schemaStr;
};

/*
 * 此方法默认打开缤纷生活
 * urlAfter:链接后缀，如?#/orderListMLifePage
 */
function openMlifeAppByParams(urlAfter) {
	let uiJumpUrl = "https://mlife.jf365.boc.cn/mlife/mobilelife/html5/107/ColorfulLife_motionHealth_XW/index.html";
	if(notNull(urlAfter)) {
		uiJumpUrl = uiJumpUrl + urlAfter;
	}
	let actConfig = {
		type: "1",
		uiJumpId: "190001",
		uiJumpChildId: "",
		tip: "",
		uiName: "",
		uiJumpUrl: "",
		uiParmValue: uiJumpUrl,
	};
	openApp(actConfig);
}

/*区分是APP内调用还是微信调用
 *@actConfig:微信使用
 *@parameters：APP使用
 * */
function gotoCommonClick(actConfig, parameters) {
	console.log("==gotoCommonClick==")
	var isWx = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
	var isWeibo = navigator.userAgent.toLowerCase().match(/weibo/i) == "weibo";
	if(isWx || isWeibo) {
		openApp(actConfig);
	} else {
		gotoApp(parameters);
	}
};
  
export default { 
    setupWebViewJavascriptBridge,
    getParamsFromUrl,
    openApp,
    openMlifeAppByParams,
    gotoCommonClick
}
