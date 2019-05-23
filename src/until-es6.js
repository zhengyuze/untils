/**
 * until es6版本
 * @authors Your Name (you@example.org)
 * @date    2019-05-23 13:56:41
 * @version $Id$
 */
/**
 * 时间格式化 返回格式化的时间
 * 格式：
 *   YYYY：4位年,如1993
 *　　YY：2位年,如93
 *　　MM：月份
 *　　DD：日期
 *　　hh：小时
 *　　mm：分钟
 *　　ss：秒钟
 *　　星期：星期，返回如 星期二
 *　　周：返回如 周二
 *　　week：英文星期全称，返回如 Saturday
 *　　www：三位英文星期，返回如 Sat
 * @method Util.formatDate
 * @param {object} date   可选参数，要格式化的data对象，没有则为当前时间
 * @param {string} fomat  格式化字符串，例如：'YYYY年MM月DD日 hh时mm分ss秒 星期' 'YYYY/MM/DD week' (中文为星期，英文为week)
 * @return {string} 返回格式化的字符串
 *
 * 例子:
 * @example
 *   formatDate(new Date("january 01,2012"));
 * @example
 *   formatDate(new Date());
 * @example
 *   formatDate('YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY-MM-DD week');
 * @example
 *   formatDate(new Date("january 01,2012"),'YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY/MM/DD week');
 */
const formatDate = function(date, format) {
	if (arguments.length < 2 && !date.getTime) {
		format = date;
		date = new Date();
	}
	typeof format != 'string' && (format = seewoLang.time_formate1);
	var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', seewoLang.Day, seewoLang.One, seewoLang.Two, seewoLang.Three, seewoLang.Four, seewoLang.Five, seewoLang.Six];
	return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|www|week/g, function(a) {
		switch (a) {
			case "YYYY":
				return date.getFullYear();
			case "YY":
				return (date.getFullYear() + "").slice(2);
			case "MM":
				return (date.getMonth() + 1 + "").length < 2 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			case "DD":
				return (date.getDate() + "").length < 2 ? "0" + date.getDate() : date.getDate();
			case "hh":
				return (date.getHours() + "").length < 2 ? "0" + date.getHours() : date.getHours();
			case "mm":
				return (date.getMinutes() + "").length < 2 ? "0" + date.getMinutes() : date.getMinutes();
			case "ss":
				return (date.getSeconds() + "").length < 2 ? "0" + date.getSeconds() : date.getSeconds();
			case "星期":
				return "星期" + week[date.getDay() + 7];
			case seewoLang.Week:
				return seewoLang.Week + week[date.getDay() + 7];
			case "week":
				return week[date.getDay()];
			case "www":
				return week[date.getDay()].slice(0, 3);
		}
	});
};
/**
 * 下载附件
 * @method Util.downloadAttachFile
 * @param  {string} [url] 附件的下载URL，不传时使用默认值
 */
const downLoadAttachFileByUrl = function(url) {
	var url = url ? url : '/download';
	var elemIF = document.createElement("iframe");
	elemIF.src = url;
	elemIF.style.display = "none";
	document.body.appendChild(elemIF);
};
/**
 * 比较两个浮点数（支持字符串数字），如果前者大于后者，则返回true，否则false
 * @method Util.biggerThan
 * @param {float} doubleNum1
 * @param {float} doubleNum2
 * @param {string} opt_precision 精确度，默认2
 * @returns {boolean} true or false
 */
const biggerThan = function(doubleNum1, doubleNum2, opt_precision) {
	opt_precision = opt_precision || 2;
	if (opt_precision == doubleNum1.toString().split(".")[1].length) {
		return parseInt(parseFloat(doubleNum1) * Math.pow(10, opt_precision)) > parseInt(parseFloat(doubleNum2) * Math.pow(10, opt_precision));
	} else {
		return Math.round(parseFloat(doubleNum1) * Math.pow(10, opt_precision)) > parseInt(parseFloat(doubleNum2) * Math.pow(10, opt_precision));
	}
};
/**
 * 获取网站的baseUrl
 * @method  Util.getRootPath
 * @return {string} 
 */
const getRootPath = function() {
	// 获取当前网址，如： http://localhost:8080/iclass/edu/teacher/task.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： iclass/edu/teacher/task.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8080
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/iclass
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
};
/**
 * 高频执行方法的防抖
 * @method Util.debounce
 * @param  {function} func      需要高频执行的函数
 * @param  {string} wait      执行间隔时间
 * @param  {boolean} immediate 是否立刻执行
 */
const debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
/**
 * 滑动页面视窗到顶部
 * @method Util.scrollTo
 */
const scrollTo = function(options) {
	var option = {
		acceleration: 0.1,
		time: 16,
		targetX: 0,
		targetY: 0
	};
	var option = $.extend(option, options);
	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var x3 = 0;
	var y3 = 0;
	if (document.documentElement) {
		x1 = document.documentElement.scrollLeft || 0;
		y1 = document.documentElement.scrollTop || 0;
	}
	if (document.body) {
		x2 = document.body.scrollLeft || 0;
		y2 = document.body.scrollTop || 0;
	}
	var x3 = window.scrollX || 0;
	var y3 = window.scrollY || 0;
	// 滚动条到页面顶部的水平距离
	var x = Math.max(x1, Math.max(x2, x3));
	// 滚动条到页面顶部的垂直距离
	var y = Math.max(y1, Math.max(y2, y3));
	// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
	var speed = 1 + option.acceleration;
	window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
	// 如果距离不为零, 继续调用迭代本函数
	if (x > option.targetX || y > option.targetY) {
		window.setTimeout(function() {
			Util.scrollTo(option);
		}, option.time);
	}
};
/**
 * 自定义截取字符串长度
 * @method  Util.cutStr
 * @param  {string} str 原字符串
 * @param  {int} len 保留长度
 * @return {string} string
 */
const cutStr = function(str, len) {
	return str.substring(0, len) + "...";
};
/**
 * subString 通用中英文截取
 * @method Util.subString
 * @param  {string}  str 原字符串
 * @param  {int}  len 保留长度
 * @param  {Boolean} hasDot 是否在结尾加上“...”
 * @return {string} string
 */
const subString = function(str, len, hasDot) {
	var newLength = 0;
	var newStr = "";
	var chineseRegex = /[^\x00-\xff]/g;
	var singleChar = "";
	var strLength = str.replace(chineseRegex, "**").length;
	for (var i = 0; i < strLength; i++) {
		singleChar = str.charAt(i).toString();
		if (singleChar.match(chineseRegex) != null) {
			newLength += 2;
		} else {
			newLength++;
		}
		if (newLength > len) {
			break;
		}
		newStr += singleChar;
	};
	if (hasDot && strLength > len) {
		newStr += "...";
	};
	return newStr;
};
/**
 * 验证码倒计时模块
 * @method  SC.util.autoTime
 * @param {jq object} selector 倒计时显示的元素
 * @param {int} time 倒计时总时间
 */
const autoTime = function(selector, time) {
	$(selector).removeClass("btn-primary").addClass("btn-default").html(time);
	$(selector).attr("disabled", "disabled");
	time--;
	if (time > 0) {
		setTimeout(function() {
			Util.autoTime(selector, time);
		}, 1000);
	} else {
		$(selector).removeClass("btn-default").addClass("btn-primary").html("重新发送");
		$(selector).removeAttr("disabled");
		time = 60;
	}
};
/**
 * 根据key获取cookie的值
 * @method  Util.getCookie
 * @param {string} cname cookie的key
 * @return {string} cookie的值
 */
const getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
};
/**
 * 获取URL中的参数的值
 * @method  Util.getUrlParam
 * @param {string} paras 参数key
 * @returns {string} 返回参数的value
 */
const getUrlParam = function(paras) {
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {}
	for (i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if (typeof(returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
};
/**
 * base加密解密
 * @type {[type]}
 */
const Base64 = function {
	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	// public method for encoding
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
	// public method for decoding
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
	// private method for UTF-8 encoding
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}
	// private method for UTF-8 decoding
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
};
/**
 * 字符串加密和解密
 * 需要base加密，解密
 * @param    {[string]} [str] [需要加密/解密的字符串（包括中文）]
 * @param    {[string]} [pwd] [密码]
 * @param    {[string]} [type] [类型：E = 加密 、D = 解密]
 * @return   {[string]}   
 */
const secretKey = function(str, pwd, type) {
	var b = new Base64(); //需要加载一个Base64.js文件 可以上网自行下载
	if (type == 'E') { //加密
		str = b.encode(str); //Base64加密
		var prand = "";
		for (var i = 0; i < pwd.length; i++) {
			prand += pwd.charCodeAt(i).toString();
		}
		var sPos = Math.floor(prand.length / 5);
		var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
		var incr = Math.ceil(pwd.length / 2);
		var modu = Math.pow(2, 31) - 1;
		if (mult < 2) {
			alert("Please choose a more complex or longer password.");
			return null;
		}
		var salt = Math.round(Math.random() * 1000000000) % 100000000;
		prand += salt;
		while (prand.length > 10) {
			prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
		}
		prand = (mult * prand + incr) % modu;
		var enc_chr = "";
		var enc_str = "";
		for (var i = 0; i < str.length; i++) {
			enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
			if (enc_chr < 16) {
				enc_str += "0" + enc_chr.toString(16);
			} else enc_str += enc_chr.toString(16);
			prand = (mult * prand + incr) % modu;
		}
		salt = salt.toString(16);
		while (salt.length < 8) salt = "0" + salt;
		enc_str += salt;
		return enc_str;
	}
	if (type == 'D') { //解密
		var prand = "";
		for (var i = 0; i < pwd.length; i++) {
			prand += pwd.charCodeAt(i).toString();
		}
		var sPos = Math.floor(prand.length / 5);
		var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
		var incr = Math.round(pwd.length / 2);
		var modu = Math.pow(2, 31) - 1;
		var salt = parseInt(str.substring(str.length - 8, str.length), 16);
		str = str.substring(0, str.length - 8);
		prand += salt;
		while (prand.length > 10) {
			prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
		}
		prand = (mult * prand + incr) % modu;
		var enc_chr = "";
		var enc_str = "";
		for (var i = 0; i < str.length; i += 2) {
			enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));
			enc_str += String.fromCharCode(enc_chr);
			prand = (mult * prand + incr) % modu;
		}
		return b.decode(enc_str);
	}
}
export {
	formatDate,
	downLoadAttachFileByUrl,
	biggerThan,
	getRootPath,
	debounce,
	scrollTo,
	cutStr,
	subString,
	autoTime,
	getCookie,
	getUrlParam,
	Base64
}