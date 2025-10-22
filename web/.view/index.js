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
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003Ehtml,body{margin:0;padding:0;width:100%;height:100%}.cell{display:flex;align-items:center;justify-content:center;user-select:none}.cell.dark{background:#777;color:#fff}\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv class=\"p-4 w-100 h-100\"\u003E\u003Cdiv class=\"d-flex flex-column h-100\" ld=\"root\"\u003E\u003Cdiv class=\"align-items-stretch\" style=\"flex-basis:100px;flex-grow:0\"\u003E\u003Cdiv class=\"bg-light border w-100 h-100 d-flex align-item-stretch flex-nowrap\" ld=\"root\"\u003E\u003Cdiv class=\"cell dark text-nowrap p-3\" style=\"flex-basis:10%\"\u003EFixed Panel\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell py-2\" style=\"flex:1 0 auto;width:fit-content\"\u003E\u003Cdiv class=\"bg-info cell text-white py-3\" style=\"width:400px\"\u003ESome Text\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-dark flexize-gutter\" style=\"width:10px;flex:0 0 auto;cursor:pointer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell py-2\" style=\"flex:0 0 auto;width:fit-content\"\u003E\u003Cdiv class=\"bg-info cell text-white py-3\" style=\"width:400px\"\u003ESome Text\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-dark flexize-gutter\" style=\"height:10px;flex:0 0 auto;cursor:pointer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex w-100 align-items-stretch\" style=\"flex-basis:10%;flex-grow:1\" ld=\"root\"\u003E\u003Cdiv style=\"flex:1 0 20%\"\u003E\u003Cdiv class=\"bg-light shadow-sm border rounded w-100 h-100 d-flex flex-column align-item-stretch flex-nowrap\" ld=\"root\"\u003E\u003Cdiv class=\"cell dark\" style=\"flex-basis:10%;padding:.5em 0\"\u003E\u003Cdiv\u003EFixed Panel\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex g-2\"\u003E\u003Cdiv class=\"btn btn-primary\" ld=\"reset\"\u003EReset\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-primary\" ld=\"hide\"\u003EHide\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell d-flex flex-column justify-content-between\" style=\"flex:1 0 10%\"\u003E\u003Cdiv\u003EFlex Panel\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-dark flexize-gutter\" style=\"height:10px;flex:0 0 auto;cursor:pointer;width:100%\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell flexize-fixed\" ld=\"middle\" style=\"flex:0 0 10%\"\u003EFixed Panel\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-dark flexize-gutter\" style=\"height:10px;flex:0 0 auto;cursor:pointer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell d-flex flex-column\" ld=\"middle\" style=\"flex:0 0 10%\"\u003EFlex Panel\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-dark flexize-gutter\" style=\"height:10px;flex:0 0 auto;cursor:pointer;width:100%\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell\" style=\"flex: 0 0 10%\"\u003EFlex Panel\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-dark flexize-gutter\" style=\"width:10px;flex:0 0 auto;cursor:pointer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"align-items-stretch\" style=\"flex:1 0 20%\"\u003E\u003Cdiv class=\"bg-light shadow-sm border rounded w-100 h-100 d-flex align-item-stretch flex-nowrap\" ld=\"root\" style=\"flex-direction:row-reverse\"\u003E\u003Cdiv class=\"cell dark text-center\" style=\"flex-basis:10%\"\u003EFixed Panel\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell\" style=\"flex:1 0 10%\"\u003E\u003Cdiv class=\"bg-info w-100 h-100 d-flex align-items-stretch flex-nowrap flex-column\" ld=\"root\"\u003E\u003Cdiv class=\"cell\" style=\"flex:1 0 10%\"\u003EInner Cell\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-danger flexize-gutter\" style=\"height:10px;flex:0 0 auto;cursor:pointer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell\" style=\"flex:1 0 10%\"\u003EInner Cell\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-danger flexize-gutter\" style=\"height:10px;flex:0 0 auto;cursor:pointer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell\" style=\"flex:1 0 10%\"\u003EInner Cell\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"bg-dark flexize-gutter\" style=\"width:10px;flex:0 0 auto;cursor:pointer\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"cell\" style=\"flex:0 0 10%\"\u003ESome Text\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["script"]([
    {name: "@loadingio/debounce.js"},
    {name: "@loadingio/ldquery"},
    {name: "proxise"},
    {name: "ldview"},
    {name: "flexize", version: "dev"}
    ]);
pug_html = pug_html + "\u003Cscript type=\"module\"\u003Evar ress,view;ress=[];view=new ldview({root:document.body,init:{root:function(e){var i,t;i=e.node;return ress.push(t=new flexize({root:i}))}},action:{click:{reset:function(){ress[1].set([0,1,1]);return view.get(\"middle\").style.display=\"\"},hide:function(){return view.get(\"middle\").style.display=\"none\"}}}});\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
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