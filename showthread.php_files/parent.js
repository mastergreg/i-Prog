__twttrlr(function(using, provide, loadrunner, define) {provide("xd/flash",function(a){function b(a,b){var c=b||Math.floor(Math.random()*100),d=['<object id="xdflashshim'+c+'" name="xdflashshim'+c+'"','type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"','width="1" height="1" style="position:absolute;left:-9999px;top:-9999px;">','<param name="movie" value="'+a+"&debug="+window.__XDDEBUG__+'"/>','<param name="wmode" value="window"/>','<param name="allowscriptaccess" value="always"/>',"</object>"].join(" ");return d}a({object:b})});
provide("xd/detection",function(a){function b(){try{return!!navigator.plugins["Shockwave Flash"]||!!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))}catch(a){return!1}}a({getFlashEnabled:b,hasPostMessage:!!window.postMessage,isIE:!!navigator.userAgent.match("MSIE")})});
provide("util/util",function(a){function d(a,b){for(var c=0,d;d=a[c];c++)if(b==d)return c;return-1}function c(a){return b([],a)}function b(a){for(var b=1,c;c=arguments[b];b++)for(var d in c)a[d]=c[d];return a}a({aug:b,array:c,indexOf:d})});
provide("util/events",function(a){using("util/util",function(b){function d(){this.completed=!1,this.callbacks=[]}var c={bind:function(a,b){this._handlers=this._handlers||{},this._handlers[a]=this._handlers[a]||[];return this._handlers[a].push(b)},unbind:function(a,c){if(!!this._handlers[a])if(c){var d=b.indexOf(this._handlers[a],c);d>=0&&this._handlers[a].splice(d,1)}else this._handlers[a]=[]},trigger:function(a,b){var c=this._handlers&&this._handlers[a];b.type=a;if(c)for(var d=0,e;e=c[d];d++)e.call(this,b)}};d.prototype.addCallback=function(a){this.completed?a.apply(this,this.results):this.callbacks.push(a)},d.prototype.complete=function(){this.results=makeArray(arguments),this.completed=!0;for(var a=0,b;b=this.callbacks[a];a++)b.apply(this,this.results)},a({Emitter:c,Promise:d})})});
provide("xd/base",function(a){using("util/util","util/events",function(b,c){function d(){}b.aug(d.prototype,c.Emitter,{transportMethod:"",init:function(){},send:function(a){var b;this._ready?this._performSend(a):b=this.bind("ready",function(){this.unbind("ready",b),this._performSend(a)})},ready:function(){this.trigger("ready",this),this._ready=!0},receive:function(a){this.trigger("message",a)}}),a({Connection:d})})});
provide("xd/parent",function(a){using("xd/base","util/util","xd/detection",function(b,c,d){function i(){}function h(a){var b=[];for(var c in a)b.push(c+"="+a[c]);return b.join(",")}var e="__ready__",f=0,g;i.prototype=new b.Connection,c.aug(i.prototype,{_createChild:function(){this.options.window?this._createWindow():this._createIframe()},_createIframe:function(){var a={allowTransparency:!0,frameBorder:"0",scrolling:"no",tabIndex:"0",name:this._name()},b,d,e,f=c.aug(c.aug({},a),this.options.iframe);window.postMessage?(g||(g=document.createElement("iframe")),b=g.cloneNode(!1)):b=document.createElement('<iframe name="'+f.name+'">');for(var h in f)h!="style"&&b.setAttribute(h,f[h]);var i=b.getAttribute("style");i&&typeof i.cssText!="undefined"?i.cssText=f.style:b.style.cssText=f.style;var j=this,k=function(){j.child=b.contentWindow,j._ready||j.init()};if(!b.addEventListener){var l=!1;b.attachEvent("onload",function(){l||(l=!0,k())})}else b.addEventListener("load",k,!1);b.src=this._source(),(d=this.options.appendTo)?d.appendChild(b):(e=this.options.replace)?(d=e.parentNode,d&&d.replaceChild(b,e)):document.body.insertBefore(b,document.body.firstChild)},_createWindow:function(){var a={width:550,height:450,personalbar:"0",toolbar:"0",scrollbars:"1",resizable:"1"},b,d,e,f=c.aug(c.aug({},a),this.options.window),g=screen.width,i=screen.height;f.left=f.left||Math.round(g/2-f.width/2),f.top=f.top||Math.round(i/2-f.height/2),i<f.height&&(f.top=0,f.height=i);var j=this._name();b=window.open(this._source(),j,h(f)),b&&b.focus(),this.child=b,this.init()},_source:function(){return this.options.src},_name:function(){var a="_xd_"+f++;window.parent&&window.parent!=window&&window.name&&(a=window.name+a);return a}});var j=function(a){this.transportMethod="PostMessage",this.options=a,this._createChild()};j.prototype=new i,c.aug(j.prototype,{init:function(){function b(b){b.source===a.child&&(!a._ready&&b.data===e?a.ready():a.receive(b.data))}var a=this;window.addEventListener?window.addEventListener("message",b,!1):window.attachEvent("onmessage",b)},_performSend:function(a){this.child.postMessage(a,this.options.src)}});var k=function(a){this.transportMethod="Flash",this.options=a,this.token=Math.random().toString(16).substring(2),this._setup()};k.prototype=new i,c.aug(k.prototype,{_setup:function(){var a=this;using("xd/flash",function(b){window["__xdcb"+a.token]={receive:function(b){!a._ready&&b===e?a.ready():a.receive(b)},loaded:function(){(function b(){a.proxy?a._createChild():setTimeout(b,10)})()}};var c=document.createElement("div");c.innerHTML=b.object("https://tfw-current.s3.amazonaws.com/xd/ft.swf?&token="+a.token+"&parent=true&callback=__xdcb"+a.token+"&xdomain="+a._host(),a.token),document.body.insertBefore(c,document.body.firstChild),a.proxy=c.firstChild})},init:function(){},_performSend:function(a){this.proxy.send(a)},_host:function(){return this.options.src.replace(/https?:\/\//,"").split(/(:|\/)/)[0]},_source:function(){return this.options.src+(this.options.src.match(/\?/)?"&":"?")+"xd_token="+escape(this.token)}});var l=function(a){this.transportMethod="Fallback",this.options=a,this._createChild()};l.prototype=new i,c.aug(l.prototype,{init:function(){},_performSend:function(a){}}),a({connect:function(a){var b;d.hasPostMessage?d.isIE&&a.window?d.getFlashEnabled()&&(b=new k(a)):b=new j(a):d.isIE&&d.getFlashEnabled()&&(b=new k(a)),b||(b=new l(a));return b}})})})});