(self.webpackChunkasset_exit_strategies=self.webpackChunkasset_exit_strategies||[]).push([[604],{3065:function(e,o,n){var t,l;!function(){"use strict";t=function(){var e=function(){},o="undefined",n=typeof window!==o&&typeof window.navigator!==o&&/Trident\/|MSIE /.test(window.navigator.userAgent),t=["trace","debug","info","warn","error"],l={},i=null;function r(e,o){var n=e[o];if("function"==typeof n.bind)return n.bind(e);try{return Function.prototype.bind.call(n,e)}catch(o){return function(){return Function.prototype.apply.apply(n,[e,arguments])}}}function c(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function a(){for(var n=this.getLevel(),l=0;l<t.length;l++){var i=t[l];this[i]=l<n?e:this.methodFactory(i,n,this.name)}if(this.log=this.debug,typeof console===o&&n<this.levels.SILENT)return"No console available for logging"}function s(e){return function(){typeof console!==o&&(a.call(this),this[e].apply(this,arguments))}}function u(t,l,i){return function(t){return"debug"===t&&(t="log"),typeof console!==o&&("trace"===t&&n?c:void 0!==console[t]?r(console,t):void 0!==console.log?r(console,"log"):e)}(t)||s.apply(this,arguments)}function f(e,n){var r,c,s,f=this,p="loglevel";function d(){var e;if(typeof window!==o&&p){try{e=window.localStorage[p]}catch(e){}if(typeof e===o)try{var n=window.document.cookie,t=encodeURIComponent(p),l=n.indexOf(t+"=");-1!==l&&(e=/^([^;]+)/.exec(n.slice(l+t.length+1))[1])}catch(e){}return void 0===f.levels[e]&&(e=void 0),e}}function v(e){var o=e;if("string"==typeof o&&void 0!==f.levels[o.toUpperCase()]&&(o=f.levels[o.toUpperCase()]),"number"==typeof o&&o>=0&&o<=f.levels.SILENT)return o;throw new TypeError("log.setLevel() called with invalid level: "+e)}"string"==typeof e?p+=":"+e:"symbol"==typeof e&&(p=void 0),f.name=e,f.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},f.methodFactory=n||u,f.getLevel=function(){return null!=s?s:null!=c?c:r},f.setLevel=function(e,n){return s=v(e),!1!==n&&function(e){var n=(t[e]||"silent").toUpperCase();if(typeof window!==o&&p){try{return void(window.localStorage[p]=n)}catch(e){}try{window.document.cookie=encodeURIComponent(p)+"="+n+";"}catch(e){}}}(s),a.call(f)},f.setDefaultLevel=function(e){c=v(e),d()||f.setLevel(e,!1)},f.resetLevel=function(){s=null,function(){if(typeof window!==o&&p){try{window.localStorage.removeItem(p)}catch(e){}try{window.document.cookie=encodeURIComponent(p)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(e){}}}(),a.call(f)},f.enableAll=function(e){f.setLevel(f.levels.TRACE,e)},f.disableAll=function(e){f.setLevel(f.levels.SILENT,e)},f.rebuild=function(){if(i!==f&&(r=v(i.getLevel())),a.call(f),i===f)for(var e in l)l[e].rebuild()},r=v(i?i.getLevel():"WARN");var g=d();null!=g&&(s=v(g)),a.call(f)}(i=new f).getLogger=function(e){if("symbol"!=typeof e&&"string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var o=l[e];return o||(o=l[e]=new f(e,i.methodFactory)),o};var p=typeof window!==o?window.log:void 0;return i.noConflict=function(){return typeof window!==o&&window.log===i&&(window.log=p),i},i.getLoggers=function(){return l},i.default=i,i},void 0===(l=t.call(o,n,o,e))||(e.exports=l)}()}}]);
//# sourceMappingURL=npm.loglevel.e92ab575690f64af5d97.js.map