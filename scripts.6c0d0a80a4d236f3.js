!function(){"use strict";var w=function(){this.init()};w.prototype={init:function(){var e=this||o;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator=typeof window<"u"&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var n=this||o;if(e=parseFloat(e),n.ctx||y(),void 0!==e&&e>=0&&e<=1){if(n._volume=e,n._muted)return n;n.usingWebAudio&&n.masterGain.gain.setValueAtTime(e,o.ctx.currentTime);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var r=n._howls[t]._getSoundIds(),a=0;a<r.length;a++){var d=n._howls[t]._soundById(r[a]);d&&d._node&&(d._node.volume=d._volume*e)}return n}return n._volume},mute:function(e){var n=this||o;n.ctx||y(),n._muted=e,n.usingWebAudio&&n.masterGain.gain.setValueAtTime(e?0:n._volume,o.ctx.currentTime);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var r=n._howls[t]._getSoundIds(),a=0;a<r.length;a++){var d=n._howls[t]._soundById(r[a]);d&&d._node&&(d._node.muted=!!e||d._muted)}return n},stop:function(){for(var e=this||o,n=0;n<e._howls.length;n++)e._howls[n].stop();return e},unload:function(){for(var e=this||o,n=e._howls.length-1;n>=0;n--)e._howls[n].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,y()),e},codecs:function(e){return(this||o)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||o;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if(typeof Audio<"u")try{void 0===(new Audio).oncanplaythrough&&(e._canPlayEvent="canplay")}catch{e.noAudio=!0}else e.noAudio=!0;try{(new Audio).muted&&(e.noAudio=!0)}catch{}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||o,n=null;try{n=typeof Audio<"u"?new Audio:null}catch{return e}if(!n||"function"!=typeof n.canPlayType)return e;var t=n.canPlayType("audio/mpeg;").replace(/^no$/,""),r=e._navigator?e._navigator.userAgent:"",a=r.match(/OPR\/([0-6].)/g),d=a&&parseInt(a[0].split("/")[1],10)<33,i=-1!==r.indexOf("Safari")&&-1===r.indexOf("Chrome"),p=r.match(/Version\/(.*?) /),m=i&&p&&parseInt(p[1],10)<15;return e._codecs={mp3:!(d||!t&&!n.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(n.canPlayType('audio/wav; codecs="1"')||n.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!n.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(n.canPlayType("audio/x-m4b;")||n.canPlayType("audio/m4b;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!(m||!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!(m||!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(n.canPlayType("audio/x-flac;")||n.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||o;if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var n=function(t){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var r=new Audio;r._unlocked=!0,e._releaseHtml5Audio(r)}catch{e.noAudio=!0;break}for(var a=0;a<e._howls.length;a++)if(!e._howls[a]._webAudio)for(var d=e._howls[a]._getSoundIds(),i=0;i<d.length;i++){var p=e._howls[a]._soundById(d[i]);p&&p._node&&!p._node._unlocked&&(p._node._unlocked=!0,p._node.load())}e._autoResume();var m=e.ctx.createBufferSource();m.buffer=e._scratchBuffer,m.connect(e.ctx.destination),void 0===m.start?m.noteOn(0):m.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),m.onended=function(){m.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",n,!0),document.removeEventListener("touchend",n,!0),document.removeEventListener("click",n,!0),document.removeEventListener("keydown",n,!0);for(var A=0;A<e._howls.length;A++)e._howls[A]._emit("unlock")}};return document.addEventListener("touchstart",n,!0),document.addEventListener("touchend",n,!0),document.addEventListener("click",n,!0),document.addEventListener("keydown",n,!0),e}},_obtainHtml5Audio:function(){var e=this||o;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var n=(new Audio).play();return n&&typeof Promise<"u"&&(n instanceof Promise||"function"==typeof n.then)&&n.catch(function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")}),new Audio},_releaseHtml5Audio:function(e){var n=this||o;return e._unlocked&&n._html5AudioPool.push(e),n},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&o.usingWebAudio){for(var n=0;n<e._howls.length;n++)if(e._howls[n]._webAudio)for(var t=0;t<e._howls[n]._sounds.length;t++)if(!e._howls[n]._sounds[t]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){if(e.autoSuspend){e._suspendTimer=null,e.state="suspending";var r=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(r,r)}},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&o.usingWebAudio)return"running"===e.state&&"interrupted"!==e.ctx.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state||"running"===e.state&&"interrupted"===e.ctx.state?(e.ctx.resume().then(function(){e.state="running";for(var n=0;n<e._howls.length;n++)e._howls[n]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var o=new w,u=function(e){e.src&&0!==e.src.length?this.init(e):console.error("An array of source files must be passed with any new Howl.")};u.prototype={init:function(e){var n=this;return o.ctx||y(),n._autoplay=e.autoplay||!1,n._format="string"!=typeof e.format?e.format:[e.format],n._html5=e.html5||!1,n._muted=e.mute||!1,n._loop=e.loop||!1,n._pool=e.pool||5,n._preload="boolean"!=typeof e.preload&&"metadata"!==e.preload||e.preload,n._rate=e.rate||1,n._sprite=e.sprite||{},n._src="string"!=typeof e.src?e.src:[e.src],n._volume=void 0!==e.volume?e.volume:1,n._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:!(!e.xhr||!e.xhr.withCredentials)&&e.xhr.withCredentials},n._duration=0,n._state="unloaded",n._sounds=[],n._endTimers={},n._queue=[],n._playLock=!1,n._onend=e.onend?[{fn:e.onend}]:[],n._onfade=e.onfade?[{fn:e.onfade}]:[],n._onload=e.onload?[{fn:e.onload}]:[],n._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],n._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],n._onpause=e.onpause?[{fn:e.onpause}]:[],n._onplay=e.onplay?[{fn:e.onplay}]:[],n._onstop=e.onstop?[{fn:e.onstop}]:[],n._onmute=e.onmute?[{fn:e.onmute}]:[],n._onvolume=e.onvolume?[{fn:e.onvolume}]:[],n._onrate=e.onrate?[{fn:e.onrate}]:[],n._onseek=e.onseek?[{fn:e.onseek}]:[],n._onunlock=e.onunlock?[{fn:e.onunlock}]:[],n._onresume=[],n._webAudio=o.usingWebAudio&&!n._html5,void 0!==o.ctx&&o.ctx&&o.autoUnlock&&o._unlockAudio(),o._howls.push(n),n._autoplay&&n._queue.push({event:"play",action:function(){n.play()}}),n._preload&&"none"!==n._preload&&n.load(),n},load:function(){var e=this,n=null;if(!o.noAudio){"string"==typeof e._src&&(e._src=[e._src]);for(var t=0;t<e._src.length;t++){var r,a;if(e._format&&e._format[t])r=e._format[t];else{if("string"!=typeof(a=e._src[t])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}(r=/^data:audio\/([^;,]+);/i.exec(a))||(r=/\.([^.]+)$/.exec(a.split("?",1)[0])),r&&(r=r[1].toLowerCase())}if(r||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),r&&o.codecs(r)){n=e._src[t];break}}return n?(e._src=n,e._state="loading","https:"===window.location.protocol&&"http:"===n.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new _(e),e._webAudio&&c(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")}e._emit("loaderror",null,"No audio support.")},play:function(e,n){var t=this,r=null;if("number"==typeof e)r=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if(void 0===e&&(e="__default",!t._playLock)){for(var a=0,d=0;d<t._sounds.length;d++)t._sounds[d]._paused&&!t._sounds[d]._ended&&(a++,r=t._sounds[d]._id);1===a?e=null:r=null}}var i=r?t._soundById(r):t._inactiveSound();if(!i)return null;if(r&&!e&&(e=i._sprite||"__default"),"loaded"!==t._state){i._sprite=e,i._ended=!1;var p=i._id;return t._queue.push({event:"play",action:function(){t.play(p)}}),p}if(r&&!i._paused)return n||t._loadQueue("play"),i._id;t._webAudio&&o._autoResume();var m=Math.max(0,i._seek>0?i._seek:t._sprite[e][0]/1e3),A=Math.max(0,(t._sprite[e][0]+t._sprite[e][1])/1e3-m),g=1e3*A/Math.abs(i._rate),b=t._sprite[e][0]/1e3,x=(t._sprite[e][0]+t._sprite[e][1])/1e3;i._sprite=e,i._ended=!1;var S=function(){i._paused=!1,i._seek=m,i._start=b,i._stop=x,i._loop=!(!i._loop&&!t._sprite[e][2])};if(!(m>=x)){var v=i._node;if(t._webAudio){var k=function(){t._playLock=!1,S(),t._refreshBuffer(i),v.gain.setValueAtTime(i._muted||t._muted?0:i._volume,o.ctx.currentTime),i._playStart=o.ctx.currentTime,void 0===v.bufferSource.start?v.bufferSource.noteGrainOn(0,m,i._loop?86400:A):v.bufferSource.start(0,m,i._loop?86400:A),g!==1/0&&(t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),g)),n||setTimeout(function(){t._emit("play",i._id),t._loadQueue()},0)};"running"===o.state&&"interrupted"!==o.ctx.state?k():(t._playLock=!0,t.once("resume",k),t._clearTimer(i._id))}else{var I=function(){v.currentTime=m,v.muted=i._muted||t._muted||o._muted||v.muted,v.volume=i._volume*o.volume(),v.playbackRate=i._rate;try{var T=v.play();if(T&&typeof Promise<"u"&&(T instanceof Promise||"function"==typeof T.then)?(t._playLock=!0,S(),T.then(function(){t._playLock=!1,v._unlocked=!0,n?t._loadQueue():t._emit("play",i._id)}).catch(function(){t._playLock=!1,t._emit("playerror",i._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),i._ended=!0,i._paused=!0})):n||(t._playLock=!1,S(),t._emit("play",i._id)),v.playbackRate=i._rate,v.paused)return void t._emit("playerror",i._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");"__default"!==e||i._loop?t._endTimers[i._id]=setTimeout(t._ended.bind(t,i),g):(t._endTimers[i._id]=function(){t._ended(i),v.removeEventListener("ended",t._endTimers[i._id],!1)},v.addEventListener("ended",t._endTimers[i._id],!1))}catch(M){t._emit("playerror",i._id,M)}};"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===v.src&&(v.src=t._src,v.load());var O=window&&window.ejecta||!v.readyState&&o._navigator.isCocoonJS;if(v.readyState>=3||O)I();else{t._playLock=!0,t._state="loading";var H=function(){t._state="loaded",I(),v.removeEventListener(o._canPlayEvent,H,!1)};v.addEventListener(o._canPlayEvent,H,!1),t._clearTimer(i._id)}}return i._id}t._ended(i)},pause:function(e){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var t=n._getSoundIds(e),r=0;r<t.length;r++){n._clearTimer(t[r]);var a=n._soundById(t[r]);if(a&&!a._paused&&(a._seek=n.seek(t[r]),a._rateSeek=0,a._paused=!0,n._stopFade(t[r]),a._node))if(n._webAudio){if(!a._node.bufferSource)continue;void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),n._cleanBuffer(a._node)}else isNaN(a._node.duration)&&a._node.duration!==1/0||a._node.pause();arguments[1]||n._emit("pause",a?a._id:null)}return n},stop:function(e,n){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"stop",action:function(){t.stop(e)}}),t;for(var r=t._getSoundIds(e),a=0;a<r.length;a++){t._clearTimer(r[a]);var d=t._soundById(r[a]);d&&(d._seek=d._start||0,d._rateSeek=0,d._paused=!0,d._ended=!0,t._stopFade(r[a]),d._node&&(t._webAudio?d._node.bufferSource&&(void 0===d._node.bufferSource.stop?d._node.bufferSource.noteOff(0):d._node.bufferSource.stop(0),t._cleanBuffer(d._node)):isNaN(d._node.duration)&&d._node.duration!==1/0||(d._node.currentTime=d._start||0,d._node.pause(),d._node.duration===1/0&&t._clearSound(d._node))),n||t._emit("stop",d._id))}return t},mute:function(e,n){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"mute",action:function(){t.mute(e,n)}}),t;if(void 0===n){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(n),a=0;a<r.length;a++){var d=t._soundById(r[a]);d&&(d._muted=e,d._interval&&t._stopFade(d._id),t._webAudio&&d._node?d._node.gain.setValueAtTime(e?0:d._volume,o.ctx.currentTime):d._node&&(d._node.muted=!!o._muted||e),t._emit("mute",d._id))}return t},volume:function(){var e,n,a,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length||2===r.length&&void 0===r[1]?t._getSoundIds().indexOf(r[0])>=0?n=parseInt(r[0],10):e=parseFloat(r[0]):r.length>=2&&(e=parseFloat(r[0]),n=parseInt(r[1],10)),!(void 0!==e&&e>=0&&e<=1))return(a=n?t._soundById(n):t._sounds[0])?a._volume:0;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;void 0===n&&(t._volume=e),n=t._getSoundIds(n);for(var d=0;d<n.length;d++)(a=t._soundById(n[d]))&&(a._volume=e,r[2]||t._stopFade(n[d]),t._webAudio&&a._node&&!a._muted?a._node.gain.setValueAtTime(e,o.ctx.currentTime):a._node&&!a._muted&&(a._node.volume=e*o.volume()),t._emit("volume",a._id));return t},fade:function(e,n,t,r){var a=this;if("loaded"!==a._state||a._playLock)return a._queue.push({event:"fade",action:function(){a.fade(e,n,t,r)}}),a;e=Math.min(Math.max(0,parseFloat(e)),1),n=Math.min(Math.max(0,parseFloat(n)),1),t=parseFloat(t),a.volume(e,r);for(var d=a._getSoundIds(r),i=0;i<d.length;i++){var p=a._soundById(d[i]);if(p){if(r||a._stopFade(d[i]),a._webAudio&&!p._muted){var m=o.ctx.currentTime,A=m+t/1e3;p._volume=e,p._node.gain.setValueAtTime(e,m),p._node.gain.linearRampToValueAtTime(n,A)}a._startFadeInterval(p,e,n,t,d[i],void 0===r)}}return a},_startFadeInterval:function(e,n,t,r,a,d){var i=this,p=n,m=t-n,A=Math.abs(m/.01),g=Math.max(4,A>0?r/A:r),b=Date.now();e._fadeTo=t,e._interval=setInterval(function(){var x=(Date.now()-b)/r;b=Date.now(),p+=m*x,p=Math.round(100*p)/100,p=m<0?Math.max(t,p):Math.min(t,p),i._webAudio?e._volume=p:i.volume(p,e._id,!0),d&&(i._volume=p),(t<n&&p<=t||t>n&&p>=t)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,i.volume(t,e._id),i._emit("fade",e._id))},g)},_stopFade:function(e){var n=this,t=n._soundById(e);return t&&t._interval&&(n._webAudio&&t._node.gain.cancelScheduledValues(o.ctx.currentTime),clearInterval(t._interval),t._interval=null,n.volume(t._fadeTo,e),t._fadeTo=null,n._emit("fade",e)),n},loop:function(){var e,n,t,r=this,a=arguments;if(0===a.length)return r._loop;if(1===a.length){if("boolean"!=typeof a[0])return!!(t=r._soundById(parseInt(a[0],10)))&&t._loop;r._loop=e=a[0]}else 2===a.length&&(e=a[0],n=parseInt(a[1],10));for(var d=r._getSoundIds(n),i=0;i<d.length;i++)(t=r._soundById(d[i]))&&(t._loop=e,r._webAudio&&t._node&&t._node.bufferSource&&(t._node.bufferSource.loop=e,e&&(t._node.bufferSource.loopStart=t._start||0,t._node.bufferSource.loopEnd=t._stop,r.playing(d[i])&&(r.pause(d[i],!0),r.play(d[i],!0)))));return r},rate:function(){var e,n,i,t=this,r=arguments;if(0===r.length?n=t._sounds[0]._id:1===r.length?t._getSoundIds().indexOf(r[0])>=0?n=parseInt(r[0],10):e=parseFloat(r[0]):2===r.length&&(e=parseFloat(r[0]),n=parseInt(r[1],10)),"number"!=typeof e)return(i=t._soundById(n))?i._rate:t._rate;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"rate",action:function(){t.rate.apply(t,r)}}),t;void 0===n&&(t._rate=e),n=t._getSoundIds(n);for(var p=0;p<n.length;p++)if(i=t._soundById(n[p])){t.playing(n[p])&&(i._rateSeek=t.seek(n[p]),i._playStart=t._webAudio?o.ctx.currentTime:i._playStart),i._rate=e,t._webAudio&&i._node&&i._node.bufferSource?i._node.bufferSource.playbackRate.setValueAtTime(e,o.ctx.currentTime):i._node&&(i._node.playbackRate=e);var m=t.seek(n[p]),g=1e3*((t._sprite[i._sprite][0]+t._sprite[i._sprite][1])/1e3-m)/Math.abs(i._rate);!t._endTimers[n[p]]&&i._paused||(t._clearTimer(n[p]),t._endTimers[n[p]]=setTimeout(t._ended.bind(t,i),g)),t._emit("rate",i._id)}return t},seek:function(){var e,n,t=this,r=arguments;if(0===r.length?t._sounds.length&&(n=t._sounds[0]._id):1===r.length?t._getSoundIds().indexOf(r[0])>=0?n=parseInt(r[0],10):t._sounds.length&&(n=t._sounds[0]._id,e=parseFloat(r[0])):2===r.length&&(e=parseFloat(r[0]),n=parseInt(r[1],10)),void 0===n)return 0;if("number"==typeof e&&("loaded"!==t._state||t._playLock))return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var i=t._soundById(n);if(i){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var p=t.playing(n)?o.ctx.currentTime-i._playStart:0;return i._seek+((i._rateSeek?i._rateSeek-i._seek:0)+p*Math.abs(i._rate))}return i._node.currentTime}var A=t.playing(n);A&&t.pause(n,!0),i._seek=e,i._ended=!1,t._clearTimer(n),t._webAudio||!i._node||isNaN(i._node.duration)||(i._node.currentTime=e);var g=function(){A&&t.play(n,!0),t._emit("seek",n)};if(A&&!t._webAudio){var b=function(){t._playLock?setTimeout(b,0):g()};setTimeout(b,0)}else g()}return t},playing:function(e){var n=this;if("number"==typeof e){var t=n._soundById(e);return!!t&&!t._paused}for(var r=0;r<n._sounds.length;r++)if(!n._sounds[r]._paused)return!0;return!1},duration:function(e){var n=this,t=n._duration,r=n._soundById(e);return r&&(t=n._sprite[r._sprite][1]/1e3),t},state:function(){return this._state},unload:function(){for(var e=this,n=e._sounds,t=0;t<n.length;t++)n[t]._paused||e.stop(n[t]._id),e._webAudio||(e._clearSound(n[t]._node),n[t]._node.removeEventListener("error",n[t]._errorFn,!1),n[t]._node.removeEventListener(o._canPlayEvent,n[t]._loadFn,!1),n[t]._node.removeEventListener("ended",n[t]._endFn,!1),o._releaseHtml5Audio(n[t]._node)),delete n[t]._node,e._clearTimer(n[t]._id);var r=o._howls.indexOf(e);r>=0&&o._howls.splice(r,1);var a=!0;for(t=0;t<o._howls.length;t++)if(o._howls[t]._src===e._src||e._src.indexOf(o._howls[t]._src)>=0){a=!1;break}return s&&a&&delete s[e._src],o.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,t,r){return"function"==typeof n&&this["_on"+e].push(r?{id:t,fn:n,once:r}:{id:t,fn:n}),this},off:function(e,n,t){var r=this,a=r["_on"+e],d=0;if("number"==typeof n&&(t=n,n=null),n||t)for(d=0;d<a.length;d++){var i=t===a[d].id;if(n===a[d].fn&&i||!n&&i){a.splice(d,1);break}}else if(e)r["_on"+e]=[];else{var p=Object.keys(r);for(d=0;d<p.length;d++)0===p[d].indexOf("_on")&&Array.isArray(r[p[d]])&&(r[p[d]]=[])}return r},once:function(e,n,t){return this.on(e,n,t,1),this},_emit:function(e,n,t){for(var r=this,a=r["_on"+e],d=a.length-1;d>=0;d--)a[d].id&&a[d].id!==n&&"load"!==e||(setTimeout(function(i){i.call(this,n,t)}.bind(r,a[d].fn),0),a[d].once&&r.off(e,a[d].fn,a[d].id));return r._loadQueue(e),r},_loadQueue:function(e){var n=this;if(n._queue.length>0){var t=n._queue[0];t.event===e&&(n._queue.shift(),n._loadQueue()),e||t.action()}return n},_ended:function(e){var n=this,t=e._sprite;if(!n._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(n._ended.bind(n,e),100),n;var r=!(!e._loop&&!n._sprite[t][2]);if(n._emit("end",e._id),!n._webAudio&&r&&n.stop(e._id,!0).play(e._id),n._webAudio&&r){n._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=o.ctx.currentTime;var a=1e3*(e._stop-e._start)/Math.abs(e._rate);n._endTimers[e._id]=setTimeout(n._ended.bind(n,e),a)}return n._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,n._clearTimer(e._id),n._cleanBuffer(e._node),o._autoSuspend()),n._webAudio||r||n.stop(e._id,!0),n},_clearTimer:function(e){var n=this;if(n._endTimers[e]){if("function"!=typeof n._endTimers[e])clearTimeout(n._endTimers[e]);else{var t=n._soundById(e);t&&t._node&&t._node.removeEventListener("ended",n._endTimers[e],!1)}delete n._endTimers[e]}return n},_soundById:function(e){for(var n=this,t=0;t<n._sounds.length;t++)if(e===n._sounds[t]._id)return n._sounds[t];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new _(e)},_drain:function(){var e=this,n=e._pool,t=0,r=0;if(!(e._sounds.length<n)){for(r=0;r<e._sounds.length;r++)e._sounds[r]._ended&&t++;for(r=e._sounds.length-1;r>=0;r--){if(t<=n)return;e._sounds[r]._ended&&(e._webAudio&&e._sounds[r]._node&&e._sounds[r]._node.disconnect(0),e._sounds.splice(r,1),t--)}}},_getSoundIds:function(e){if(void 0===e){for(var t=[],r=0;r<this._sounds.length;r++)t.push(this._sounds[r]._id);return t}return[e]},_refreshBuffer:function(e){return e._node.bufferSource=o.ctx.createBufferSource(),e._node.bufferSource.buffer=s[this._src],e._node.bufferSource.connect(e._panner?e._panner:e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,o.ctx.currentTime),this},_cleanBuffer:function(e){var t=o._navigator&&o._navigator.vendor.indexOf("Apple")>=0;if(o._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),t))try{e.bufferSource.buffer=o._scratchBuffer}catch{}return e.bufferSource=null,this},_clearSound:function(e){/MSIE |Trident\//.test(o._navigator&&o._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var _=function(e){this._parent=e,this.init()};_.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++o._counter,n._sounds.push(e),e.create(),e},create:function(){var e=this,n=e._parent,t=o._muted||e._muted||e._parent._muted?0:e._volume;return n._webAudio?(e._node=void 0===o.ctx.createGain?o.ctx.createGainNode():o.ctx.createGain(),e._node.gain.setValueAtTime(t,o.ctx.currentTime),e._node.paused=!0,e._node.connect(o.masterGain)):o.noAudio||(e._node=o._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(o._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=n._src,e._node.preload=!0===n._preload?"auto":n._preload,e._node.volume=t*o.volume(),e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._rate=n._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++o._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,n=e._parent;n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),"loaded"!==n._state&&(n._state="loaded",n._emit("load"),n._loadQueue()),e._node.removeEventListener(o._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,n=e._parent;n._duration===1/0&&(n._duration=Math.ceil(10*e._node.duration)/10,n._sprite.__default[1]===1/0&&(n._sprite.__default[1]=1e3*n._duration),n._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var s={},c=function(e){var n=e._src;if(s[n])return e._duration=s[n].duration,void l(e);if(/^data:[^;]+;base64,/.test(n)){for(var t=atob(n.split(",")[1]),r=new Uint8Array(t.length),a=0;a<t.length;++a)r[a]=t.charCodeAt(a);f(r.buffer,e)}else{var d=new XMLHttpRequest;d.open(e._xhr.method,n,!0),d.withCredentials=e._xhr.withCredentials,d.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach(function(i){d.setRequestHeader(i,e._xhr.headers[i])}),d.onload=function(){var i=(d.status+"")[0];"0"===i||"2"===i||"3"===i?f(d.response,e):e._emit("loaderror",null,"Failed loading audio file with status: "+d.status+".")},d.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete s[n],e.load())},h(d)}},h=function(e){try{e.send()}catch{e.onerror()}},f=function(e,n){var t=function(){n._emit("loaderror",null,"Decoding audio data failed.")},r=function(a){a&&n._sounds.length>0?(s[n._src]=a,l(n,a)):t()};typeof Promise<"u"&&1===o.ctx.decodeAudioData.length?o.ctx.decodeAudioData(e).then(r).catch(t):o.ctx.decodeAudioData(e,r,t)},l=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},y=function(){if(o.usingWebAudio){try{typeof AudioContext<"u"?o.ctx=new AudioContext:typeof webkitAudioContext<"u"?o.ctx=new webkitAudioContext:o.usingWebAudio=!1}catch{o.usingWebAudio=!1}o.ctx||(o.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(o._navigator&&o._navigator.platform),n=o._navigator&&o._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),t=n?parseInt(n[1],10):null;if(e&&t&&t<9){var r=/safari/.test(o._navigator&&o._navigator.userAgent.toLowerCase());o._navigator&&!r&&(o.usingWebAudio=!1)}o.usingWebAudio&&(o.masterGain=void 0===o.ctx.createGain?o.ctx.createGainNode():o.ctx.createGain(),o.masterGain.gain.setValueAtTime(o._muted?0:o._volume,o.ctx.currentTime),o.masterGain.connect(o.ctx.destination)),o._setup()}};"function"==typeof define&&define.amd&&define([],function(){return{Howler:o,Howl:u}}),typeof exports<"u"&&(exports.Howler=o,exports.Howl=u),typeof global<"u"?(global.HowlerGlobal=w,global.Howler=o,global.Howl=u,global.Sound=_):typeof window<"u"&&(window.HowlerGlobal=w,window.Howler=o,window.Howl=u,window.Sound=_)}(),function(){"use strict";var o;HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(o){var u=this;if(!u.ctx||!u.ctx.listener)return u;for(var _=u._howls.length-1;_>=0;_--)u._howls[_].stereo(o);return u},HowlerGlobal.prototype.pos=function(o,u,_){var s=this;return s.ctx&&s.ctx.listener?(u="number"!=typeof u?s._pos[1]:u,_="number"!=typeof _?s._pos[2]:_,"number"!=typeof o?s._pos:(s._pos=[o,u,_],void 0!==s.ctx.listener.positionX?(s.ctx.listener.positionX.setTargetAtTime(s._pos[0],Howler.ctx.currentTime,.1),s.ctx.listener.positionY.setTargetAtTime(s._pos[1],Howler.ctx.currentTime,.1),s.ctx.listener.positionZ.setTargetAtTime(s._pos[2],Howler.ctx.currentTime,.1)):s.ctx.listener.setPosition(s._pos[0],s._pos[1],s._pos[2]),s)):s},HowlerGlobal.prototype.orientation=function(o,u,_,s,c,h){var f=this;if(!f.ctx||!f.ctx.listener)return f;var l=f._orientation;return u="number"!=typeof u?l[1]:u,_="number"!=typeof _?l[2]:_,s="number"!=typeof s?l[3]:s,c="number"!=typeof c?l[4]:c,h="number"!=typeof h?l[5]:h,"number"!=typeof o?l:(f._orientation=[o,u,_,s,c,h],void 0!==f.ctx.listener.forwardX?(f.ctx.listener.forwardX.setTargetAtTime(o,Howler.ctx.currentTime,.1),f.ctx.listener.forwardY.setTargetAtTime(u,Howler.ctx.currentTime,.1),f.ctx.listener.forwardZ.setTargetAtTime(_,Howler.ctx.currentTime,.1),f.ctx.listener.upX.setTargetAtTime(s,Howler.ctx.currentTime,.1),f.ctx.listener.upY.setTargetAtTime(c,Howler.ctx.currentTime,.1),f.ctx.listener.upZ.setTargetAtTime(h,Howler.ctx.currentTime,.1)):f.ctx.listener.setOrientation(o,u,_,s,c,h),f)},Howl.prototype.init=(o=Howl.prototype.init,function(u){var _=this;return _._orientation=u.orientation||[1,0,0],_._stereo=u.stereo||null,_._pos=u.pos||null,_._pannerAttr={coneInnerAngle:void 0!==u.coneInnerAngle?u.coneInnerAngle:360,coneOuterAngle:void 0!==u.coneOuterAngle?u.coneOuterAngle:360,coneOuterGain:void 0!==u.coneOuterGain?u.coneOuterGain:0,distanceModel:void 0!==u.distanceModel?u.distanceModel:"inverse",maxDistance:void 0!==u.maxDistance?u.maxDistance:1e4,panningModel:void 0!==u.panningModel?u.panningModel:"HRTF",refDistance:void 0!==u.refDistance?u.refDistance:1,rolloffFactor:void 0!==u.rolloffFactor?u.rolloffFactor:1},_._onstereo=u.onstereo?[{fn:u.onstereo}]:[],_._onpos=u.onpos?[{fn:u.onpos}]:[],_._onorientation=u.onorientation?[{fn:u.onorientation}]:[],o.call(this,u)}),Howl.prototype.stereo=function(o,u){var _=this;if(!_._webAudio)return _;if("loaded"!==_._state)return _._queue.push({event:"stereo",action:function(){_.stereo(o,u)}}),_;var s=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===u){if("number"!=typeof o)return _._stereo;_._stereo=o,_._pos=[o,0,0]}for(var c=_._getSoundIds(u),h=0;h<c.length;h++){var f=_._soundById(c[h]);if(f){if("number"!=typeof o)return f._stereo;f._stereo=o,f._pos=[o,0,0],f._node&&(f._pannerAttr.panningModel="equalpower",f._panner&&f._panner.pan||w(f,s),"spatial"===s?void 0!==f._panner.positionX?(f._panner.positionX.setValueAtTime(o,Howler.ctx.currentTime),f._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),f._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):f._panner.setPosition(o,0,0):f._panner.pan.setValueAtTime(o,Howler.ctx.currentTime)),_._emit("stereo",f._id)}}return _},Howl.prototype.pos=function(o,u,_,s){var c=this;if(!c._webAudio)return c;if("loaded"!==c._state)return c._queue.push({event:"pos",action:function(){c.pos(o,u,_,s)}}),c;if(u="number"!=typeof u?0:u,_="number"!=typeof _?-.5:_,void 0===s){if("number"!=typeof o)return c._pos;c._pos=[o,u,_]}for(var h=c._getSoundIds(s),f=0;f<h.length;f++){var l=c._soundById(h[f]);if(l){if("number"!=typeof o)return l._pos;l._pos=[o,u,_],l._node&&(l._panner&&!l._panner.pan||w(l,"spatial"),void 0!==l._panner.positionX?(l._panner.positionX.setValueAtTime(o,Howler.ctx.currentTime),l._panner.positionY.setValueAtTime(u,Howler.ctx.currentTime),l._panner.positionZ.setValueAtTime(_,Howler.ctx.currentTime)):l._panner.setPosition(o,u,_)),c._emit("pos",l._id)}}return c},Howl.prototype.orientation=function(o,u,_,s){var c=this;if(!c._webAudio)return c;if("loaded"!==c._state)return c._queue.push({event:"orientation",action:function(){c.orientation(o,u,_,s)}}),c;if(u="number"!=typeof u?c._orientation[1]:u,_="number"!=typeof _?c._orientation[2]:_,void 0===s){if("number"!=typeof o)return c._orientation;c._orientation=[o,u,_]}for(var h=c._getSoundIds(s),f=0;f<h.length;f++){var l=c._soundById(h[f]);if(l){if("number"!=typeof o)return l._orientation;l._orientation=[o,u,_],l._node&&(l._panner||(l._pos||(l._pos=c._pos||[0,0,-.5]),w(l,"spatial")),void 0!==l._panner.orientationX?(l._panner.orientationX.setValueAtTime(o,Howler.ctx.currentTime),l._panner.orientationY.setValueAtTime(u,Howler.ctx.currentTime),l._panner.orientationZ.setValueAtTime(_,Howler.ctx.currentTime)):l._panner.setOrientation(o,u,_)),c._emit("orientation",l._id)}}return c},Howl.prototype.pannerAttr=function(){var o,u,_,s=this,c=arguments;if(!s._webAudio)return s;if(0===c.length)return s._pannerAttr;if(1===c.length){if("object"!=typeof c[0])return(_=s._soundById(parseInt(c[0],10)))?_._pannerAttr:s._pannerAttr;o=c[0],void 0===u&&(o.pannerAttr||(o.pannerAttr={coneInnerAngle:o.coneInnerAngle,coneOuterAngle:o.coneOuterAngle,coneOuterGain:o.coneOuterGain,distanceModel:o.distanceModel,maxDistance:o.maxDistance,refDistance:o.refDistance,rolloffFactor:o.rolloffFactor,panningModel:o.panningModel}),s._pannerAttr={coneInnerAngle:void 0!==o.pannerAttr.coneInnerAngle?o.pannerAttr.coneInnerAngle:s._coneInnerAngle,coneOuterAngle:void 0!==o.pannerAttr.coneOuterAngle?o.pannerAttr.coneOuterAngle:s._coneOuterAngle,coneOuterGain:void 0!==o.pannerAttr.coneOuterGain?o.pannerAttr.coneOuterGain:s._coneOuterGain,distanceModel:void 0!==o.pannerAttr.distanceModel?o.pannerAttr.distanceModel:s._distanceModel,maxDistance:void 0!==o.pannerAttr.maxDistance?o.pannerAttr.maxDistance:s._maxDistance,refDistance:void 0!==o.pannerAttr.refDistance?o.pannerAttr.refDistance:s._refDistance,rolloffFactor:void 0!==o.pannerAttr.rolloffFactor?o.pannerAttr.rolloffFactor:s._rolloffFactor,panningModel:void 0!==o.pannerAttr.panningModel?o.pannerAttr.panningModel:s._panningModel})}else 2===c.length&&(o=c[0],u=parseInt(c[1],10));for(var h=s._getSoundIds(u),f=0;f<h.length;f++)if(_=s._soundById(h[f])){var l=_._pannerAttr;l={coneInnerAngle:void 0!==o.coneInnerAngle?o.coneInnerAngle:l.coneInnerAngle,coneOuterAngle:void 0!==o.coneOuterAngle?o.coneOuterAngle:l.coneOuterAngle,coneOuterGain:void 0!==o.coneOuterGain?o.coneOuterGain:l.coneOuterGain,distanceModel:void 0!==o.distanceModel?o.distanceModel:l.distanceModel,maxDistance:void 0!==o.maxDistance?o.maxDistance:l.maxDistance,refDistance:void 0!==o.refDistance?o.refDistance:l.refDistance,rolloffFactor:void 0!==o.rolloffFactor?o.rolloffFactor:l.rolloffFactor,panningModel:void 0!==o.panningModel?o.panningModel:l.panningModel};var y=_._panner;y?(y.coneInnerAngle=l.coneInnerAngle,y.coneOuterAngle=l.coneOuterAngle,y.coneOuterGain=l.coneOuterGain,y.distanceModel=l.distanceModel,y.maxDistance=l.maxDistance,y.refDistance=l.refDistance,y.rolloffFactor=l.rolloffFactor,y.panningModel=l.panningModel):(_._pos||(_._pos=s._pos||[0,0,-.5]),w(_,"spatial"))}return s},Sound.prototype.init=function(o){return function(){var u=this,_=u._parent;u._orientation=_._orientation,u._stereo=_._stereo,u._pos=_._pos,u._pannerAttr=_._pannerAttr,o.call(this),u._stereo?_.stereo(u._stereo):u._pos&&_.pos(u._pos[0],u._pos[1],u._pos[2],u._id)}}(Sound.prototype.init),Sound.prototype.reset=function(o){return function(){var u=this,_=u._parent;return u._orientation=_._orientation,u._stereo=_._stereo,u._pos=_._pos,u._pannerAttr=_._pannerAttr,u._stereo?_.stereo(u._stereo):u._pos?_.pos(u._pos[0],u._pos[1],u._pos[2],u._id):u._panner&&(u._panner.disconnect(0),u._panner=void 0,_._refreshBuffer(u)),o.call(this)}}(Sound.prototype.reset);var w=function(o,u){"spatial"===(u=u||"spatial")?(o._panner=Howler.ctx.createPanner(),o._panner.coneInnerAngle=o._pannerAttr.coneInnerAngle,o._panner.coneOuterAngle=o._pannerAttr.coneOuterAngle,o._panner.coneOuterGain=o._pannerAttr.coneOuterGain,o._panner.distanceModel=o._pannerAttr.distanceModel,o._panner.maxDistance=o._pannerAttr.maxDistance,o._panner.refDistance=o._pannerAttr.refDistance,o._panner.rolloffFactor=o._pannerAttr.rolloffFactor,o._panner.panningModel=o._pannerAttr.panningModel,void 0!==o._panner.positionX?(o._panner.positionX.setValueAtTime(o._pos[0],Howler.ctx.currentTime),o._panner.positionY.setValueAtTime(o._pos[1],Howler.ctx.currentTime),o._panner.positionZ.setValueAtTime(o._pos[2],Howler.ctx.currentTime)):o._panner.setPosition(o._pos[0],o._pos[1],o._pos[2]),void 0!==o._panner.orientationX?(o._panner.orientationX.setValueAtTime(o._orientation[0],Howler.ctx.currentTime),o._panner.orientationY.setValueAtTime(o._orientation[1],Howler.ctx.currentTime),o._panner.orientationZ.setValueAtTime(o._orientation[2],Howler.ctx.currentTime)):o._panner.setOrientation(o._orientation[0],o._orientation[1],o._orientation[2])):(o._panner=Howler.ctx.createStereoPanner(),o._panner.pan.setValueAtTime(o._stereo,Howler.ctx.currentTime)),o._panner.connect(o._node),o._paused||o._parent.pause(o._id,!0).play(o._id,!0)}}();