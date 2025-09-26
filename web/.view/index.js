 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, c, defer, hashfile, libLoader, md5, url, version) {
      pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
if(!libLoader) {
  libLoader = {
    js: {url: {}},
    css: {url: {}},
    root: function(r) { libLoader._r = r; },
    _r: "/assets/lib",
    _v: "",
    version: function(v) { libLoader._v = (v ? "?v=" + v : ""); }
  }
  if(version) { libLoader.version(version); }
}

pug_mixins["script"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var str = '', urls = [];
if(!Array.isArray(os)) { os = [os]; }
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var o = $$obj[pug_index0];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
if (!libLoader.js.url[url]) {
libLoader.js.url[url] = true;
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + libLoader._v, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var o = $$obj[pug_index0];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
if (!libLoader.js.url[url]) {
libLoader.js.url[url] = true;
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + libLoader._v, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
    }
  }
}).call(this);

if (cfg && cfg.pack) {
var name = md5(str);
//var filename = "/js/pack/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".js";
var fn = "/assets/bundle/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".js";
hashfile({type: "js", name: name, files: urls, src: locals.filename});
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", fn + libLoader._v, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
};
pug_mixins["css"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var str = '', urls = [];
if(!Array.isArray(os)) { os = [os]; }
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var o = $$obj[pug_index1];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
if (!libLoader.css.url[url]) {
libLoader.css.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url, true, true)) + "\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + libLoader._v, true, true)) + "\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var o = $$obj[pug_index1];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
if (!libLoader.css.url[url]) {
libLoader.css.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url, true, true)) + "\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + libLoader._v, true, true)) + "\u003E";
}
}
    }
  }
}).call(this);

if (cfg && cfg.pack) {
var name = md5(str);
//var filename = "/css/pack/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".css";
var fn = "/assets/bundle/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".css";
hashfile({type: "css", name: name, files: urls, src: locals.filename});
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", fn + libLoader._v, true, true)) + "\u003E";
}
};
pug_html = pug_html + "\u003Chtml\u003E\u003Chead\u003E";
pug_mixins["css"]([
    {name: "bootstrap", path: "dist/css/bootstrap.min.css"},
    {name: "@loadingio/bootstrap.ext"}
    ]);
pug_html = pug_html + "\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv class=\"m-5\"\u003E\u003Cdiv class=\"border rounded w-100 d-flex align-item-stretch flex-nowrap\" ld=\"root\" style=\"height:500px\"\u003E\u003Cdiv class=\"bg-light d-flex justify-content-end\" style=\"flex-basis:50%\"\u003ESome Text\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-dark gutter\" style=\"width:10px;flex:0 0 auto;cursor:pointer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-light d-flex justify-content-start\" style=\"flex-basis:50%\"\u003ESome Text\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["script"]([
    {name: "@loadingio/debounce.js"},
    {name: "@loadingio/ldquery"},
    {name: "proxise"},
    {name: "ldview"}
    ]);
pug_html = pug_html + "\u003Cscript type=\"module\"\u003Evar flexize,ref$;flexize=function(t){var i,e,n,r,o;i=t!=null?t:{},e=i.root,n=(r=i.minWidth)!=null?r:100,o=(r=i.gutterSelector)!=null?r:\".gutter\";this._opt={root:e,minWidth:n,gutterSelector:o};this.root=e;this.minWidth=n;this.gutterSelector=o;this.isDragging=false;this.isHorizontal=true;this.leftPanel=void 8;this.rightPanel=void 8;this.initialLeftWidth=void 8;this.initialRightWidth=void 8;this.initialX=void 8;this.init();return this};flexize.prototype=(ref$=Object.create(Object.prototype),ref$.constructor=flexize,ref$.init=function(){var t,i,e,n=this;t=getComputedStyle(this.root);i=t.flexDirection||\"row\";this.isHorizontal=i===\"row\"||i===\"row-reverse\";e=this.root.querySelectorAll(this.gutterSelector);return e.forEach(function(t){return n.setupGutter(t)})},ref$.setupGutter=function(t){var i=this;t.addEventListener(\"mousedown\",function(t){return i.onMouseDown.apply(i,[t])});document.addEventListener(\"mousemove\",function(t){return i.onMouseMove.apply(i,[t])});return document.addEventListener(\"mouseup\",function(t){return i.onMouseUp.apply(i,[t])})},ref$.onMouseDown=function(t){var i;this.isDragging=true;t.preventDefault();i=t.currentTarget;this.leftPanel=i.previousElementSibling;this.rightPanel=i.nextElementSibling;if(this.isHorizontal){this.initialLeftWidth=this.leftPanel.offsetWidth;this.initialRightWidth=this.rightPanel.offsetWidth;return this.initialX=t.clientX}else{this.initialLeftWidth=this.leftPanel.offsetHeight;this.initialRightWidth=this.rightPanel.offsetHeight;return this.initialX=t.clientY}},ref$.onMouseMove=function(t){var i,e,n;if(!this.isDragging){return}i=this.isHorizontal?t.clientX-this.initialX:t.clientY-this.initialX;e=this.initialLeftWidth+i;n=this.initialRightWidth-i;if(e\u003Ethis.minWidth&&n\u003Ethis.minWidth){this.leftPanel.style.flexBasis=e+\"px\";return this.rightPanel.style.flexBasis=n+\"px\"}},ref$.onMouseUp=function(t){return this.isDragging=false},ref$);if(typeof window!=\"undefined\"&&window!==null){window.flexize=flexize}else{module.exports=flexize}var view,res;view=new ldview({root:document.body});res=new flexize({root:view.get(\"root\")});\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "c" in locals_for_with ?
        locals_for_with.c :
        typeof c !== 'undefined' ? c : undefined, "defer" in locals_for_with ?
        locals_for_with.defer :
        typeof defer !== 'undefined' ? defer : undefined, "hashfile" in locals_for_with ?
        locals_for_with.hashfile :
        typeof hashfile !== 'undefined' ? hashfile : undefined, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "md5" in locals_for_with ?
        locals_for_with.md5 :
        typeof md5 !== 'undefined' ? md5 : undefined, "url" in locals_for_with ?
        locals_for_with.url :
        typeof url !== 'undefined' ? url : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;;return pug_html;}; module.exports = template; })() 