!function(n){var t={};function e(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return n[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=n,e.c=t,e.d=function(n,t,i){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:i})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(i,o,function(t){return n[t]}.bind(null,o));return i},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=69)}([function(n,t){n.exports={CloseInventory:"CloseInentory",StartTimer:"StartTimer",SetAlertMsg:"SetAlertMsg",SOCK:{NotLogined:"NotLogined",LoginRequest:"LoginRequest",Disconnect:"disconnect",QuizData:"QuizData",QuizDataResult:"QuizDataResult",QuizAnswer:"QuizAnswer",AlertMsg:"AlertMsg",ComboInfo:"ComboInfo",Logout:"Logout",QuizAnswerCnt:"QuizAnswerCnt"}}},function(n,t){n.exports=function(n){var t=[];return t.toString=function(){return this.map(function(t){var e=function(n,t){var e=n[1]||"",i=n[3];if(!i)return e;if(t&&"function"==typeof btoa){var o=(r=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),s=i.sources.map(function(n){return"/*# sourceURL="+i.sourceRoot+n+" */"});return[e].concat(s).concat([o]).join("\n")}var r;return[e].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+e+"}":e}).join("")},t.i=function(n,e){"string"==typeof n&&(n=[[null,n,""]]);for(var i={},o=0;o<this.length;o++){var s=this[o][0];"number"==typeof s&&(i[s]=!0)}for(o=0;o<n.length;o++){var r=n[o];"number"==typeof r[0]&&i[r[0]]||(e&&!r[2]?r[2]=e:e&&(r[2]="("+r[2]+") and ("+e+")"),t.push(r))}},t}},function(n,t,e){var i,o,s={},r=(i=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=i.apply(this,arguments)),o}),a=function(n){var t={};return function(n,e){if("function"==typeof n)return n();if(void 0===t[n]){var i=function(n,t){return t?t.querySelector(n):document.querySelector(n)}.call(this,n,e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(n){i=null}t[n]=i}return t[n]}}(),l=null,c=0,u=[],d=e(27);function f(n,t){for(var e=0;e<n.length;e++){var i=n[e],o=s[i.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](i.parts[r]);for(;r<i.parts.length;r++)o.parts.push(g(i.parts[r],t))}else{var a=[];for(r=0;r<i.parts.length;r++)a.push(g(i.parts[r],t));s[i.id]={id:i.id,refs:1,parts:a}}}}function v(n,t){for(var e=[],i={},o=0;o<n.length;o++){var s=n[o],r=t.base?s[0]+t.base:s[0],a={css:s[1],media:s[2],sourceMap:s[3]};i[r]?i[r].parts.push(a):e.push(i[r]={id:r,parts:[a]})}return e}function p(n,t){var e=a(n.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=u[u.length-1];if("top"===n.insertAt)i?i.nextSibling?e.insertBefore(t,i.nextSibling):e.appendChild(t):e.insertBefore(t,e.firstChild),u.push(t);else if("bottom"===n.insertAt)e.appendChild(t);else{if("object"!=typeof n.insertAt||!n.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(n.insertAt.before,e);e.insertBefore(t,o)}}function h(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n);var t=u.indexOf(n);t>=0&&u.splice(t,1)}function m(n){var t=document.createElement("style");if(void 0===n.attrs.type&&(n.attrs.type="text/css"),void 0===n.attrs.nonce){var i=function(){0;return e.nc}();i&&(n.attrs.nonce=i)}return b(t,n.attrs),p(n,t),t}function b(n,t){Object.keys(t).forEach(function(e){n.setAttribute(e,t[e])})}function g(n,t){var e,i,o,s;if(t.transform&&n.css){if(!(s="function"==typeof t.transform?t.transform(n.css):t.transform.default(n.css)))return function(){};n.css=s}if(t.singleton){var r=c++;e=l||(l=m(t)),i=y.bind(null,e,r,!1),o=y.bind(null,e,r,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(n){var t=document.createElement("link");return void 0===n.attrs.type&&(n.attrs.type="text/css"),n.attrs.rel="stylesheet",b(t,n.attrs),p(n,t),t}(t),i=function(n,t,e){var i=e.css,o=e.sourceMap,s=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||s)&&(i=d(i));o&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var r=new Blob([i],{type:"text/css"}),a=n.href;n.href=URL.createObjectURL(r),a&&URL.revokeObjectURL(a)}.bind(null,e,t),o=function(){h(e),e.href&&URL.revokeObjectURL(e.href)}):(e=m(t),i=function(n,t){var e=t.css,i=t.media;i&&n.setAttribute("media",i);if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}.bind(null,e),o=function(){h(e)});return i(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap)return;i(n=t)}else o()}}n.exports=function(n,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=r()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var e=v(n,t);return f(e,t),function(n){for(var i=[],o=0;o<e.length;o++){var r=e[o];(a=s[r.id]).refs--,i.push(a)}n&&f(v(n,t),t);for(o=0;o<i.length;o++){var a;if(0===(a=i[o]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete s[a.id]}}}};var x,w=(x=[],function(n,t){return x[n]=t,x.filter(Boolean).join("\n")});function y(n,t,e,i){var o=e?"":i.css;if(n.styleSheet)n.styleSheet.cssText=w(t,o);else{var s=document.createTextNode(o),r=n.childNodes;r[t]&&n.removeChild(r[t]),r.length?n.insertBefore(s,r[t]):n.appendChild(s)}}},function(n,t){n.exports=$},function(n,t,e){var i=e(29);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(31);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(33);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(35);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(37);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(39);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(41);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(43);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(45);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(47);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(49);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(51);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(53);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(55);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(57);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(59);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(61);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(63);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(65);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){var i=e(67);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t){n.exports=Vue},function(n,t,e){var i=e(26);"string"==typeof i&&(i=[[n.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(2)(i,o);i.locals&&(n.exports=i.locals)},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"* {\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n  background-color: #ffffff;\r\n}",""])},function(n,t){n.exports=function(n){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var e=t.protocol+"//"+t.host,i=e+t.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,t){var o,s=t.trim().replace(/^"(.*)"$/,function(n,t){return t}).replace(/^'(.*)'$/,function(n,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(s)?n:(o=0===s.indexOf("//")?s:0===s.indexOf("/")?e+s:i+s.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(n,t,e){"use strict";var i=e(4);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.logo-area {\n    width: 200px;\n    height: inherit;\n    line-height: 200px;\n}\n",""])},function(n,t,e){"use strict";var i=e(5);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.toptitle {\n    text-align: center;\n    height: inherit;\n    width: 800px;\n    background-color: inherit;\n    display: table-cell;\n    vertical-align: middle;\n}\n.toptitle-inner {\n    display: inline-block;\n    background-color: inherit;\n    color: #ffffff;\n    font-weight: 900;\n    position: relative;\n    text-align: center;\n    font-size: 28px;\n}\n.mobile {\n    font-size: 18px;\n}\n",""])},function(n,t,e){"use strict";var i=e(6);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.fade-enter-active[data-v-8e484efc], .fade-leave-active[data-v-8e484efc] {\n    transition: opacity .5s;\n}\n.fade-enter[data-v-8e484efc], .fade-leave-to[data-v-8e484efc] {\n    opacity: 0;\n}\n",""])},function(n,t,e){"use strict";var i=e(7);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},function(n,t,e){"use strict";var i=e(8);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.user-info-bar[data-v-0bc5a886] {\n    width: 100%;\n    height: 42px;\n    background-color: #1e2a5d;\n    border-bottom: 6px solid #334696;\n    overflow-x: hidden;\n    overflow-y: hidden;\n}\n.item[data-v-0bc5a886] {\n    background-color: inherit;\n    float: left;\n}\n.icon[data-v-0bc5a886] {\n    width: 36px;\n    height: 36px;\n    margin-left: 8px;\n}\n.img-icon[data-v-0bc5a886] {\n    width: inherit;\n    height: inherit;\n    background-color: inherit;\n    padding: 4px;\n}\n.id[data-v-0bc5a886] {\n    color: whitesmoke;\n    line-height: 36px;\n    margin-left: 8px;\n}\n.mobileitem[data-v-0bc5a886] {\n    margin-left: 4px;\n}\n.userinfomobile[data-v-0bc5a886] {\n    font-size: 13px;\n}\n",""])},function(n,t,e){"use strict";var i=e(9);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},function(n,t,e){"use strict";var i=e(10);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.top[data-v-14994438] {\n    width: 100%;\n    height: 250px;\n    background-color: #3e58a7;\n}\n.menu-btn-area[data-v-14994438] {\n    position: absolute;\n    right: 8px;\n    top: 8px;\n}\nbutton[data-v-14994438] {\n    width: 100px;\n    height: 50px;\n}\n.topmobile[data-v-14994438] {\n    height:  200px;\n}\n",""])},function(n,t,e){"use strict";var i=e(11);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.contents-item {\n    position: relative;\n    height: auto;\n    margin: 8px 0;\n    width: 50%;\n    left: 25%;\n    border-radius: 5px;\n}\n.contents-item h3,h5 {\n    border-radius: inherit;\n    background-color: inherit;\n    padding: 4px;\n}\n",""])},function(n,t,e){"use strict";var i=e(12);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.desc[data-v-62b3bc82] {\n    margin: 10px;\n    padding: 10px;\n    background-color: inherit;\n}\n",""])},function(n,t,e){"use strict";var i=e(13);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},function(n,t,e){"use strict";var i=e(14);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n#inventory[data-v-75e08c6e] {\n    position: absolute;\n    width: 400px;\n    height: 100%;\n    right: 0;\n    top: 0;\n}\n#inventory .list[data-v-75e08c6e] {\n    height: calc( 100% - 60px );\n    background-color: red;\n}\n#inventory .bottom[data-v-75e08c6e] {\n    height: 30px;\n    background-color: yellow;\n}\n#inventory .bottom button[data-v-75e08c6e] {\n    height: inherit;\n}\n",""])},function(n,t,e){"use strict";var i=e(15);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},function(n,t,e){"use strict";var i=e(16);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.quiztimer[data-v-b54a9fe6] {\n    text-align: center;\n    height: 6px;\n}\n.line[data-v-b54a9fe6] {\n    height: 6px;\n}\n",""])},function(n,t,e){"use strict";var i=e(17);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.quizanswerlist[data-v-0a06f1c0] {\n    text-align: center;\n    margin: 0 auto;\n}\n.quizanswerlist_mobile[data-v-0a06f1c0] {\n    width: 100%;\n}\nul[data-v-0a06f1c0] {\n}\nli[data-v-0a06f1c0] {\n    margin: 36px 4px;\n}\n.qal_li_mobile[data-v-0a06f1c0] {\n    margin: 10px 4px;\n}\n.answer[data-v-0a06f1c0] {\n    width: 700px;\n    height: 70px;\n    line-height: 70px;\n    margin: 0 auto;\n    font-size: 26px;\n    cursor: pointer;\n    transition: 0.5s;\n    z-index: 2;\n}\n.answer_inner[data-v-0a06f1c0] {\n    width: 700px;\n    height: 70px;\n    line-height: 70px;\n    font-size: 26px;\n    cursor: pointer;\n    position: absolute;\n    left: calc( 50% - 350px);\n    top:0;\n    background-color: transparent;\n    z-index: 0;\n    opacity: 0.4;\n    text-align: right;\n}\n.answermobile[data-v-0a06f1c0] {\n    width: 100%;\n    font-size: 14px;\n    height: 50px;\n    line-height: 50px;\n    margin: 0 auto;\n    cursor: pointer;\n    transition: 0.5s;\n}\n.answermobile_inner[data-v-0a06f1c0] {\n    width: 100%;\n    font-size: 14px;\n    height: 50px;\n    line-height: 50px;\n    margin: 0 auto;\n    cursor: pointer;\n    transition: 0.5s;\n    position: absolute;\n    left: 0;\n    top:0;\n    background-color: transparent;\n    z-index: 0;\n    opacity: 0.4;\n    text-align: right;\n}\n.answer[data-v-0a06f1c0]:hover {\n    font-weight: 900;\n    font-size: 30px;\n    color: #3e58a7;\n}\n.click[data-v-0a06f1c0] {\n    background-color: yellowgreen;\n}\n",""])},function(n,t,e){"use strict";var i=e(18);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},function(n,t,e){"use strict";var i=e(19);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\ntd[data-v-64d1fb97] {\n    padding: 4px;\n}\ninput[data-v-64d1fb97] {\n    height:40px;\n}\n.lf_mobile[data-v-64d1fb97] {\n    font-size: 15px;\n}\n.lf_pc[data-v-64d1fb97] {\n    font-size: 25px;\n}\n",""])},function(n,t,e){"use strict";var i=e(20);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\nli {\n    list-style: none;\n}\n#contents {\n    padding: 10px;\n    height: auto;\n    margin: 0 auto;\n}\n",""])},function(n,t,e){"use strict";var i=e(21);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},function(n,t,e){"use strict";var i=e(22);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n.alert-wnd[data-v-5a60e394] {\n    position: absolute;\n    width: 440px;\n    height: 80px;\n    top: 50px;\n    left: -440px;\n    background-color: white;\n    transition: all 0.3s;\n    opacity: 0.8;\n    text-align: center;\n    border-top-right-radius: 10px;\n    border-bottom-right-radius: 10px;\n}\n.alert_mobile[data-v-5a60e394] {\n    width: 100%;\n    opacity: 0.9;\n    border-top-right-radius: 0px;\n    border-bottom-right-radius: 0px;\n}\n.open[data-v-5a60e394] {\n    left: 0px;\n}\n.inner[data-v-5a60e394] {\n    margin: 0 auto;\n    background-color: inherit;\n    line-height: 80px;\n    border-top-right-radius: 10px;\n    border-bottom-right-radius: 10px;\n    font-size: 17px;\n    font-weight: 500;\n}\n",""])},function(n,t,e){"use strict";var i=e(23);e.n(i).a},function(n,t,e){(n.exports=e(1)(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},function(n,t){n.exports=_},function(n,t,e){"use strict";e.r(t);e(25);var i=e(24),o=e.n(i),s={data:function(){return{}}};e(28);function r(n,t,e,i,o,s,r,a){var l,c="function"==typeof n?n.options:n;if(t&&(c.render=t,c.staticRenderFns=e,c._compiled=!0),i&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),r?(l=function(n){(n=n||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(n=__VUE_SSR_CONTEXT__),o&&o.call(this,n),n&&n._registeredComponents&&n._registeredComponents.add(r)},c._ssrRegister=l):o&&(l=a?function(){o.call(this,this.$root.$options.shadowRoot)}:o),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(n,t){return l.call(t),u(n,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:n,options:c}}var a=r(s,function(){var n=this.$createElement;return(this._self._c||n)("div",{staticClass:"logo-area"},[this._v("\n    LogoArea\n")])},[],!1,null,null,null);a.options.__file="LogoArea.vue";var l=a.exports,c=e(0),u=e.n(c);function d(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}var f=new(function(){function n(){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.socket=io(),this.initSocketListener(),this.vBus=new Vue}var t,e,i;return t=n,(e=[{key:"initSocketListener",value:function(){var n=this;this.socket.on(u.a.SOCK.NotLogined,function(t){n.onNotLogined(t)}),this.socket.on(u.a.SOCK.LoginRequest,function(t){n.onLoginRequest(t)}),this.socket.on(u.a.SOCK.QuizData,function(t){n.onQuizData(t)}),this.socket.on(u.a.SOCK.QuizDataResult,function(t){n.onQuizDataResult(t)}),this.socket.on(u.a.SOCK.AlertMsg,function(t){n.onAlertMsg(t)}),this.socket.on(u.a.SOCK.ComboInfo,function(t){n.onComboInfo(t)}),this.socket.on(u.a.SOCK.QuizAnswerCnt,function(t){n.onQuizAnswerCnt(t)})}},{key:"isMobile",value:function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}},{key:"setQuizInfo",value:function(){this.vBus.$bus.$emit("QuizInfo",JSON.stringify({q:"테스트 문제입니다",a:["테스트1","테스트2","테스트3"]})),this.vBus.$bus.$emit(u.a.StartTimer,1e4)}},{key:"onNotLogined",value:function(n){if(-2!=n.ret){this.vBus.$bus.$emit(u.a.SOCK.NotLogined,n)}else alert("중복 접속입니다!")}},{key:"onLoginRequest",value:function(n){0==n.ret?this.vBus.$bus.$emit(u.a.SOCK.LoginRequest,n):alert("아이디 또는 비밀번호가 맞지 않습니다")}},{key:"onQuizData",value:function(n){this.vBus.$bus.$emit(u.a.SOCK.QuizData,JSON.stringify(n)),0==n.state&&this.vBus.$bus.$emit(u.a.StartTimer,{remain:n.tRemain,max:1e4})}},{key:"onQuizDataResult",value:function(n){this.vBus.$bus.$emit(u.a.SOCK.QuizDataResult,JSON.stringify(n))}},{key:"onAlertMsg",value:function(n){this.vBus.$bus.$emit(u.a.SetAlertMsg,n.msg)}},{key:"onComboInfo",value:function(n){this.showComboAlert(n.cnt),this.vBus.$bus.$emit(u.a.SOCK.ComboInfo,n)}},{key:"onQuizAnswerCnt",value:function(n){this.vBus.$bus.$emit(u.a.SOCK.QuizAnswerCnt,n)}},{key:"sendPacket",value:function(n,t){this.socket.emit(n,t)}},{key:"showComboAlert",value:function(n){if(!(n<2)){var t=n+" 콤보!";n>=10&&n%5==0&&(t+=" 대단합니다!"),this.vBus.$bus.$emit(u.a.SetAlertMsg,t)}}}])&&d(t.prototype,e),i&&d(t,i),n}()),v={data:function(){return{titleText:"다음 중 잘못 표기 된 것은 무엇일까요?",show:!0,isMobile:f.isMobile()}},created:function(){var n=this;this.$bus.$on(u.a.SOCK.NotLogined,this.onNotLogined),this.$bus.$on(u.a.SOCK.LoginRequest,this.onLoginRequest),this.$bus.$on(u.a.SOCK.QuizData,function(t){var e=JSON.parse(t);n.titleText=e.question})},methods:{onNotLogined:function(){this.titleText="라이브 퀴즈 공유기 기출문제입니다<br>로그인 후에 이용 해 주세요"},onLoginRequest:function(){this.titleText="다음 문제를 기다리고 있습니다"}}},p=(e(30),e(32),r(v,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticStyle:{"background-color":"inherit"}},[n.isMobile?e("div",{staticStyle:{margin:"0 auto",width:"85%",height:"calc(200px - 42px)","background-color":"inherit"}},[e("div",{staticClass:"toptitle"},[e("transition",{attrs:{name:"fade"}},[n.show?e("div",{staticClass:"toptitle-inner mobile",domProps:{innerHTML:n._s(n.titleText)}}):n._e()])],1)]):e("div",{staticStyle:{margin:"0 auto",width:"800px",height:"calc(250px - 42px)","background-color":"inherit"}},[e("div",{staticClass:"toptitle"},[e("transition",{attrs:{name:"fade"}},[n.show?e("div",{staticClass:"toptitle-inner",domProps:{innerHTML:n._s(n.titleText)}}):n._e()])],1)])])},[],!1,null,"8e484efc",null));p.options.__file="TopTitle.vue";var h=p.exports,m={data:function(){return{imageURL:"/images/star0.png",nick:"정보없음",level:0,point:0,comboCount:0,logined:!1,isMobile:f.isMobile()}},components:{},methods:{setInfo:function(n,t,e){this.nick=n,this.level=t,this.imageURL="/images/star"+t+".png",this.point=e,this.logined=!0},clear:function(){this.nick="noname",this.level=0,this.imageURL="/images/star0.png",this.point=0,this.logined=!1},onBtnLogout:function(n){f.sendPacket(u.a.SOCK.Logout,{})}},created:function(){var n=this;this.clear(),this.$bus.$on(u.a.SOCK.LoginRequest,function(t){n.setInfo(t.nick,t.auth,t.point)}),this.$bus.$on(u.a.SOCK.NotLogined,function(t){n.clear()}),this.$bus.$on(u.a.SOCK.ComboInfo,function(t){n.comboCount=t.cnt,n.point=t.point})}},b=(e(34),e(36),r(m,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"user-info-bar",class:{userinfomobile:n.isMobile}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!n.isMobile,expression:"!isMobile"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v("라이브 퀴즈 공유기 기출문제")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"icon item"},[e("img",{staticClass:"img-icon",attrs:{src:n.imageURL}})]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v(n._s(n.nick))]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v(" | ")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v(n._s(n.level)+"레벨")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v(" | ")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v(n._s(n.point)+"점")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v(" | ")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v(" "+n._s(n.comboCount)+" 콤보")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[n._v(" | ")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.logined,expression:"logined"}],staticClass:"id item",class:{mobileitem:n.isMobile}},[e("button",{staticStyle:{width:"auto",padding:"4px 6px"},on:{click:n.onBtnLogout}},[n._v("logout")])])])},[],!1,null,"0bc5a886",null));b.options.__file="UserInfoBar.vue";var g={data:function(){return{isMobile:f.isMobile()}},components:{"logo-area":l,"title-area":h,"user-info-bar":b.exports},methods:{onBtnOpenMenu:function(n){this.$bus.$emit("openInventory","")}}},x=(e(38),e(40),r(g,function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"top",class:{topmobile:this.isMobile}},[t("user-info-bar"),this._v(" "),t("title-area")],1)},[],!1,null,"14994438",null));x.options.__file="Top.vue";var w=x.exports,y=r({data:function(){return{}},props:["list"]},function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("ul",[n._l(n.list,function(t){return[e("li",[n._v(n._s(t.name))])]})],2)])},[],!1,null,null,null);y.options.__file="DataList.vue";var _=y.exports,C={data:function(){return{styleObject:{backgroundColor:"gray",border:"4px solid red"}}},props:["title","regdate","desc","type"],components:{"data-list":_},methods:{getTypeString:function(){switch(this.type){case 0:return this.styleObject.backgroundColor="yellow","자동";case 1:return"이벤트 퀴즈";default:return"임시"}}}},S=(e(42),e(44),r(C,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"contents-item",style:n.styleObject},[e("h3",[n._v("["+n._s(n.getTypeString())+"] "+n._s(n.title))]),n._v(" "),e("h5",[n._v(n._s(n.regdate))]),n._v(" "),e("div",{staticClass:"desc",domProps:{innerHTML:n._s(n.desc)}})])},[],!1,null,"62b3bc82",null));S.options.__file="PostCard.vue";var k=S.exports,$={data:function(){return{inventory:[{name:"채팅 컬러 교환권",cnt:20},{name:"채팅 스타일 교환권",cnt:1}],visible:!1}},methods:{onCloseInventory:function(){this.$bus.$emit(u.a.CloseInventory,"")}},created:function(){var n=this;this.$bus.$on(u.a.CloseInventory,function(t){n.visible=!1}),this.$bus.$on("openInventory",function(){n.visible=!0})}},L=(e(46),e(48),r($,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{directives:[{name:"show",rawName:"v-show",value:n.visible,expression:"visible"}],attrs:{id:"inventory"}},[e("div",[n._v("인벤토리")]),n._v(" "),e("ul",{staticClass:"list"},[n._l(n.inventory,function(t){return[e("li",[e("div",[n._v("\n                    "+n._s(t.name)+" : "+n._s(t.cnt)+"개\n                ")])])]})],2),n._v(" "),e("div",{staticClass:"bottom"},[e("button",{on:{click:n.onCloseInventory}},[n._v("닫기")])])])},[],!1,null,"75e08c6e",null));L.options.__file="Inventory.vue";L.exports;var M={props:["width","align","lineColor"],data:function(){return{intervalId:-1,tStart:0,tElapsed:0,mainStyle:{},lineStyle:{width:"100%"},tLimitMs:0,visible:!0}},created:function(){f.isMobile()?this.mainStyle.width="90%":this.mainStyle.width=this.width+"px","center"===this.align&&(this.mainStyle.margin="0 auto"),this.lineStyle.backgroundColor=this.lineColor,this.$bus.$on(u.a.StartTimer,this.onStartTimer),this.$bus.$on(u.a.SOCK.NotLogined,this.onNotLogined),this.$bus.$on(u.a.SOCK.LoginRequest,this.onLoginRequest)},methods:{onStartTimer:function(n){var t=n.max,e=this;this.tStart=new Date,this.tStart-=t-n.remain,this.tLimitMs=t,this.intervalId=setInterval(function(){var n=e.getElapsed();e.tElapsed=n;var t=n/e.tLimitMs*100;e.lineStyle.width=Math.floor(100-t)+"%",n>=e.tLimitMs&&clearInterval(e.intervalId)},30)},onNotLogined:function(){this.visible=!1},onLoginRequest:function(){this.visible=!0},getElapsed:function(){return new Date-this.tStart}}},O=(e(50),e(52),r(M,function(){var n=this.$createElement,t=this._self._c||n;return t("div",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"quiztimer",style:this.mainStyle},[t("div",{staticClass:"line",style:this.lineStyle})])},[],!1,null,"b54a9fe6",null));O.options.__file="QuizTimer.vue";var I=O.exports,N={data:function(){return{answers:[],visible:!0,selectable:!1,isMobile:f.isMobile()}},created:function(){var n={number:1,answer:"보기",style:{},isClicked:!1,selectedCnt:0};this.answers.push(n),this.answers.push(n),this.answers.push(n);var t=this;this.$bus.$on(u.a.SOCK.NotLogined,this.onNotLogined),this.$bus.$on(u.a.SOCK.LoginRequest,this.onLoginRequest),this.$bus.$on(u.a.SOCK.QuizData,function(n){var e=JSON.parse(n);t.answers=[],t.answers.push({isClicked:!1,number:1,answer:e.answer[0],style:{},selectedCnt:0}),t.answers.push({isClicked:!1,number:2,answer:e.answer[1],style:{},selectedCnt:0}),t.answers.push({isClicked:!1,number:3,answer:e.answer[2],style:{},selectedCnt:0}),t.selectable=!0}),this.$bus.$on(u.a.SOCK.QuizDataResult,function(n){var e=JSON.parse(n);t.answers[e.collect].style={backgroundColor:"#3e58a7",color:"white"}}),this.$bus.$on(u.a.SOCK.QuizAnswerCnt,function(n){t.answers[0].selectedCnt=n.cnts[0],t.answers[1].selectedCnt=n.cnts[1],t.answers[2].selectedCnt=n.cnts[2]})},methods:{onNotLogined:function(){this.visible=!1},onLoginRequest:function(){this.visible=!0},onBtnSelectAnswer:function(n){this.selectable&&(this.answers[n].isClicked=!0,f.sendPacket(u.a.SOCK.QuizAnswer,{answer:n}),this.selectable=!1)}}},z=(e(54),r(N,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{directives:[{name:"show",rawName:"v-show",value:n.visible,expression:"visible"}],staticClass:"quizanswerlist",class:{quizanswerlist_mobile:n.isMobile}},[e("ul",[n._l(n.answers,function(t){return[e("li",{class:{qal_li_mobile:n.isMobile},staticStyle:{position:"relative"}},[e("div",{class:{click:t.isClicked,answer:!n.isMobile,answermobile:n.isMobile},style:t.style,on:{click:function(e){n.onBtnSelectAnswer(t.number-1)}}},[n._v("\n                    "+n._s(t.number)+". "+n._s(t.answer)+"\n                    "),e("div",{class:{answer_inner:!n.isMobile,answermobile_inner:n.isMobile},domProps:{textContent:n._s(t.selectedCnt)}},[n._v("0")])])])]})],2)])},[],!1,null,"0a06f1c0",null));z.options.__file="QuizAnswerList.vue";var R=z.exports,A={data:function(){return{iid:"",ipw:"",style:{textAlign:"center"},visible:!1,isMobile:f.isMobile()}},components:{},methods:{onBtnLogin:function(n){f.sendPacket(u.a.SOCK.LoginRequest,{id:this.iid,pw:this.ipw})},onNotLogined:function(){this.visible=!0},onLoginRequest:function(){this.visible=!1}},created:function(){f.isMobile()&&(this.style.fontSize="15px"),this.$bus.$on(u.a.SOCK.NotLogined,this.onNotLogined),this.$bus.$on(u.a.SOCK.LoginRequest,this.onLoginRequest)}},T=(e(56),e(58),r(A,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{directives:[{name:"show",rawName:"v-show",value:n.visible,expression:"visible"}],style:n.style},[e("table",{class:{lf_mobile:n.isMobile,lf_pc:!n.isMobile},staticStyle:{margin:"0 auto"}},[e("tr",[e("td",[n._v("아이디")]),n._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:n.iid,expression:"iid"}],attrs:{type:"text"},domProps:{value:n.iid},on:{input:function(t){t.target.composing||(n.iid=t.target.value)}}})])]),n._v(" "),e("tr",[e("td",[n._v("비밀번호")]),n._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:n.ipw,expression:"ipw"}],attrs:{type:"password"},domProps:{value:n.ipw},on:{input:function(t){t.target.composing||(n.ipw=t.target.value)}}})])]),n._v(" "),e("tr",[e("td",{attrs:{colspan:"2"}},[e("button",{staticStyle:{width:"100%",height:"50px"},on:{click:n.onBtnLogin}},[n._v("로그인")])])])])])},[],!1,null,"64d1fb97",null));T.options.__file="LoginForm.vue";var q=T.exports,E=e(3),K=e.n(E),B={data:function(){return{items:[{title:"9시 원픽 당첨자",desc:"당첨자 : 왕야옹",regdate:"2018-11-23 08:10:00",type:0},{title:"인원 맞히기",desc:"<a href=''>이거</a> vs <a href=''>저거</a><br>우승자는?!<br><br><br><br>바로<br><br><br>",regdate:"2018-11-23 08:10:00",type:1},{title:"9시 원픽 당첨자",desc:"당첨자 : 잼잼이",regdate:"2018-11-23 08:10:00",type:0}],lastIdx:0}},components:{"data-list":_,"post-card":k,"quiz-timer":I,"quiz-answer-list":R,"login-form":q},methods:{checkScrollToEnd:function(){},onScroll:function(n){K()(window).scrollTop(),K()(window).height(),K()(document).height()}},mounted:function(){},created:function(){window.addEventListener("scroll",this.onScroll)},destroyed:function(){}},j=(e(60),r(B,function(){var n=this.$createElement,t=this._self._c||n;return t("div",{attrs:{id:"contents"}},[t("quiz-answer-list"),this._v(" "),t("quiz-timer",{attrs:{width:"400",align:"center",lineColor:"#3e58a7"}}),this._v(" "),t("login-form")],1)},[],!1,null,null,null));j.options.__file="Contents.vue";var Q=j.exports,U={data:function(){return{open:!1,contents:"테스트",isMobile:f.isMobile()}},components:{},methods:{onOpen:function(){this.open=!0},onClose:function(){this.open=!1},setContents:function(n){var t=this;this.contents=n,this.onOpen(),setTimeout(function(){t.onClose()},2e3)}},created:function(){var n=this;this.$bus.$on(u.a.SetAlertMsg,function(t){n.setContents(t)})}},D=(e(62),e(64),r(U,function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"alert-wnd",class:{open:this.open,alert_mobile:this.isMobile}},[t("div",{staticClass:"inner",domProps:{innerHTML:this._s(this.contents)}})])},[],!1,null,"5a60e394",null));D.options.__file="AlertWnd.vue";var P={data:function(){return{isMobile:f.isMobile()}},components:{"top-bar":w,contents:Q,"alert-wnd":D.exports}},J=(e(66),r(P,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{attrs:{id:"main"}},[e("top-bar"),n._v(" "),e("contents"),n._v(" "),n.isMobile?e("div",[n._m(1),n._v(" "),n._m(2)]):e("div",[n._m(0)]),n._v(" "),e("alert-wnd")],1)},[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticStyle:{width:"980px",margin:"0 auto",position:"absolute",bottom:"0",left:"calc( 50% - 490px )"}},[t("div",{staticStyle:{width:"320px",float:"left"}},[t("ins",{staticClass:"kakao_ad_area",staticStyle:{display:"none",width:"100%"},attrs:{"data-ad-unit":"DAN-t87e91n4i053","data-ad-width":"320","data-ad-height":"50"}})]),this._v(" "),t("div",{staticStyle:{width:"320px",float:"left","margin-left":"10px"}},[t("ins",{staticClass:"kakao_ad_area",staticStyle:{display:"none",width:"100%"},attrs:{"data-ad-unit":"DAN-uvjqvmlqkb3k","data-ad-width":"320","data-ad-height":"50"}})]),this._v(" "),t("div",{staticStyle:{width:"320px",float:"left","margin-left":"10px"}},[t("ins",{staticClass:"kakao_ad_area",staticStyle:{display:"none",width:"100%"},attrs:{"data-ad-unit":"DAN-rh5ikhi3t46a","data-ad-width":"320","data-ad-height":"50"}})])])},function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticStyle:{width:"320px",margin:"0 auto",position:"absolute",bottom:"0",left:"calc( 50% - 160px )"}},[t("div",{staticStyle:{width:"320px",float:"left"}},[t("ins",{staticClass:"kakao_ad_area",staticStyle:{display:"none",width:"100%"},attrs:{"data-ad-unit":"DAN-t87e91n4i053","data-ad-width":"320","data-ad-height":"50"}})])])},function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticStyle:{width:"320px",margin:"0 auto",position:"absolute",bottom:"52px",left:"calc( 50% - 160px )"}},[t("div",{staticStyle:{width:"320px",float:"left"}},[t("ins",{staticClass:"kakao_ad_area",staticStyle:{display:"none",width:"100%"},attrs:{"data-ad-unit":"DAN-uvjqvmlqkb3k","data-ad-width":"320","data-ad-height":"50"}})])])}],!1,null,null,null));J.options.__file="App.vue";var H=J.exports;e(68);K()(document).ready(function(){o.a.prototype.$bus=new o.a,new o.a({el:"#app",render:function(n){return n(H)}})})}]);