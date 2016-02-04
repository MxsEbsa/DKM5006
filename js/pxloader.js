/*!
 * Copyright 2015 By Editora do Brasil
 * By: Tiago Juvenal de Lima, tiago.jlima.developer@gmail.com

 * Foca no Código

        .---.
       /o   o\
    __(=  "  =)__
     //\'-=-'/\\
        )   (_
       /      `"=-._
      /       \     ``"=.
     /  /   \  \         `=..--.
 ___/  /     \  \___      _,  , `\
`-----' `""""`'-----``"""`  \  \_/
                             `-`
*/

(function(g){function n(a){this.settings=a=a||{};null==a.statusInterval&&(a.statusInterval=5E3);null==a.loggingDelay&&(a.loggingDelay=2E4);null==a.noProgressTimeout&&(a.noProgressTimeout=Infinity);var c=[],r=[],g,n=Date.now(),t=function(b){return null==b?[]:Array.isArray(b)?b:[b]};this.add=function(b){b.tags=new l(b.tags);null==b.priority&&(b.priority=Infinity);c.push({resource:b,status:0})};this.addProgressListener=function(b,a){r.push({callback:b,tags:new l(a)})};this.addCompletionListener=function(b,
a){r.push({tags:new l(a),callback:function(a){a.completedCount===a.totalCount&&b(a)}})};var u=function(b){b=t(b);var a=function(a){a=a.resource;for(var d=Infinity,e=0;e<a.tags.length;e++)for(var c=0;c<Math.min(b.length,d)&&!(a.tags.all[e]===b[c]&&c<d&&(d=c,0===d))&&0!==d;c++);return d};return function(b,d){var c=a(b),f=a(d);return c<f?-1:c>f?1:b.priority<d.priority?-1:b.priority>d.priority?1:0}};this.start=function(b){g=Date.now();b=u(b);c.sort(b);b=0;for(var a=c.length;b<a;b++){var h=c[b];h.status=
1;h.resource.start(this)}setTimeout(p,100)};var p=function(){for(var b=!1,k=Date.now()-n,h=k>=a.noProgressTimeout,k=k>=a.loggingDelay,d=0,e=c.length;d<e;d++){var f=c[d];if(1===f.status&&(f.resource.checkStatus&&f.resource.checkStatus(),1===f.status))if(h)f.resource.onTimeout();else b=!0}k&&b&&v();b&&setTimeout(p,a.statusInterval)};this.isBusy=function(){for(var b=0,a=c.length;b<a;b++)if(0===c[b].status||1===c[b].status)return!0;return!1};var m=function(b,a){var h=null,d,e,f,g;d=0;for(e=c.length;d<
e;d++)if(c[d].resource===b){h=c[d];break}if(null!=h&&1===h.status)for(h.status=a,n=Date.now(),d=0,e=r.length;d<e;d++)if(f=r[d],g=0===f.tags.length?!0:b.tags.intersects(f.tags)){g=h;for(var l=0,m=0,s=void 0,p=void 0,q=void 0,t=void 0,s=0,p=c.length;s<p;s++)if(q=c[s],t=0===f.tags.length?!0:q.resource.tags.intersects(f.tags))m++,2!==q.status&&3!==q.status&&4!==q.status||l++;f.callback({resource:g.resource,loaded:2===g.status,error:3===g.status,timeout:4===g.status,completedCount:l,totalCount:m})}};this.onLoad=
function(a){m(a,2)};this.onError=function(a){m(a,3)};this.onTimeout=function(a){m(a,4)};var v=this.log=function(a){if(window.console){var k=Math.round((Date.now()-g)/1E3);window.console.log("PxLoader elapsed: "+k+" sec");for(var k=0,h=c.length;k<h;k++){var d=c[k];if(a||1===d.status){var e="PxLoader: #"+k+" "+d.resource.getName();switch(d.status){case 0:e+=" (Not Started)";break;case 1:e+=" (Waiting)";break;case 2:e+=" (Loaded)";break;case 3:e+=" (Error)";break;case 4:e+=" (Timeout)"}0<d.resource.tags.length&&
(e+=" Tags: ["+d.resource.tags.all.join(",")+"]");window.console.log(e)}}}}}function l(a){this.all=[];this.first=null;this.length=0;this.lookup={};if(a){if(Array.isArray(a))this.all=a.slice(0);else if("object"===typeof a)for(var c in a)a.hasOwnProperty(c)&&this.all.push(c);else this.all.push(a);this.length=this.all.length;0<this.length&&(this.first=this.all[0]);for(a=0;a<this.length;a++)this.lookup[this.all[a]]=!0}}l.prototype.intersects=function(a){if(0===this.length||0===a.length)return!1;if(1===
this.length&&1===a.length)return this.first===a.first;if(a.length<this.length)return a.intersects(this);for(var c in this.lookup)if(a.lookup[c])return!0;return!1};"function"===typeof define&&define.amd&&define("PxLoader",[],function(){return n});g.PxLoader=n})(this);Date.now||(Date.now=function(){return(new Date).getTime()});Array.isArray||(Array.isArray=function(g){return"[object Array]"===Object.prototype.toString.call(g)});

function PxLoaderImage(url,tags,priority){var self=this,loader=null;this.img=new Image();this.tags=tags;this.priority=priority;var onReadyStateChange=function(){if(self.img.readyState==='complete'){removeEventHandlers();loader.onLoad(self)}};var onLoad=function(){removeEventHandlers();loader.onLoad(self)};var onError=function(){removeEventHandlers();loader.onError(self)};var removeEventHandlers=function(){self.unbind('load',onLoad);self.unbind('readystatechange',onReadyStateChange);self.unbind('error',onError)};this.start=function(pxLoader){loader=pxLoader;self.bind('load',onLoad);self.bind('readystatechange',onReadyStateChange);self.bind('error',onError);self.img.src=url};this.checkStatus=function(){if(self.img.complete){removeEventHandlers();loader.onLoad(self)}};this.onTimeout=function(){removeEventHandlers();if(self.img.complete){loader.onLoad(self)}else{loader.onTimeout(self)}};this.getName=function(){return url};this.bind=function(eventName,eventHandler){if(self.img.addEventListener){self.img.addEventListener(eventName,eventHandler,false)}else if(self.img.attachEvent){self.img.attachEvent('on'+eventName,eventHandler)}};this.unbind=function(eventName,eventHandler){if(self.img.removeEventListener){self.img.removeEventListener(eventName,eventHandler,false)}else if(self.img.detachEvent){self.img.detachEvent('on'+eventName,eventHandler)}}}PxLoader.prototype.addImage=function(url,tags,priority){var imageLoader=new PxLoaderImage(url,tags,priority);this.add(imageLoader);return imageLoader.img};if(typeof define==='function'&&define.amd){define('PxLoaderImage',[],function(){return PxLoaderImage})}	


$(window).load(function(e){
	var loader = new PxLoader();
	var quantidadeImagens = localStorage.length;
	var loadimagens = new Array (
		"img/alpha000.png",
		"img/loader.gif",
		"img/logotipo_ebsa_creditos.jpg",
		"img/sprite_sheet_akpalo.png",
		"img/sprite_sheet_akpalo_logo.png",
		"img/sprite_sheet_apoema.png",
		"img/bgBody_apoema.png",
		"img/error_disciplina.png",
		"img/capa_gramatica.jpg"
	);

	for(var i = 0; i < quantidadeImagens; i++){
		loadimagens.push('conteudo/'+localStorage.getItem('imagens'+i));
	}

	for(var i=0; i<loadimagens.length; i++){
		pathimagens = loadimagens[i];
		loader.addImage(pathimagens);
		}
	loader.addProgressListener(function(e){console.log(e.resource.getName());});
	loader.addCompletionListener(function(e){
		$("#loading").fadeOut(500);
		setTimeout(function(){
			animacao_entrada_capa();
		},500);
	});
	loader.start();
});