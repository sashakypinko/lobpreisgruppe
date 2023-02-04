import{n as X,j as h,Z as T,bi as te,X as o,r as A,bj as ne,bk as ge,bl as me,bm as xe,bn as b,a0 as ve,bo as K,bb as ye,_ as be,Y as Be,a as re,u as Y,e as L,T as ie,as as j,bp as Ge,a9 as P,bh as Ke,a2 as we,d as Fe,g as Ue,a7 as $e,U as Ve,f as Xe,h as Z,A as J}from"./index.696bdcb7.js";import{u as Ye}from"./CustomCheckboxAutocomplete.ac1fe2f1.js";import{S as qe,C as Ce,a as Se,D as ue,E as Ze,b as Je}from"./Songs.3fdb5584.js";import{D as Qe,a as _e,b as et,u as tt}from"./useConfirm.18358877.js";import{A as nt}from"./AddCircle.d7752e4f.js";import"./isTypedArray.cda67028.js";import"./SongEnums.a1949f60.js";import"./useError.c25b92eb.js";const rt=X(h("path",{d:"M17 2c-.55 0-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V3c0-.55-.45-1-1-1zm2 18H5V10h14v10zm-8-7c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm-4 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm8 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm-4 4c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm-4 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm8 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z"}),"CalendarMonthRounded"),it=X(h("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z"}),"CheckCircleOutlineRounded"),ot=X(h("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3.17-6.41a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L12 12.59l1.41-1.41c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41L13.41 14l1.41 1.41c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0L12 15.41l-1.41 1.41c-.39.39-1.02.39-1.41 0a.9959.9959 0 0 1 0-1.41L10.59 14l-1.42-1.41zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"}),"DeleteForeverRounded"),at=X(h("path",{d:"M13.89 8.7 12 10.59 10.11 8.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 8.7 13.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l1.89 1.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l1.89-1.89c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.38-1.41 0zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"HighlightOffRounded"),st=X(h("path",{d:"M7 12c0 .55.45 1 1 1h8c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1zm5-10C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"RemoveCircleOutlineRounded");function oe(t){for(var n=1;n<arguments.length;n++){var r=arguments[n]!=null?Object(arguments[n]):{},s=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&s.push.apply(s,Object.getOwnPropertySymbols(r).filter(function(u){return Object.getOwnPropertyDescriptor(r,u).enumerable})),s.forEach(function(u){T(t,u,r[u])})}return t}var lt=function(){function t(){ne(this,t),T(this,"refs",{})}return te(t,[{key:"add",value:function(r,s){this.refs[r]||(this.refs[r]=[]),this.refs[r].push(s)}},{key:"remove",value:function(r,s){var u=this.getIndex(r,s);u!==-1&&this.refs[r].splice(u,1)}},{key:"isActive",value:function(){return this.active}},{key:"getActive",value:function(){var r=this;return this.refs[this.active.collection].find(function(s){var u=s.node;return u.sortableInfo.index==r.active.index})}},{key:"getIndex",value:function(r,s){return this.refs[r].indexOf(s)}},{key:"getOrderedRefs",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.active.collection;return this.refs[r].sort(ct)}}]),t}();function ct(t,n){var r=t.node.sortableInfo.index,s=n.node.sortableInfo.index;return r-s}function Te(t,n){return Object.keys(t).reduce(function(r,s){return n.indexOf(s)===-1&&(r[s]=t[s]),r},{})}var B={end:["touchend","touchcancel","mouseup"],move:["touchmove","mousemove"],start:["touchstart","mousedown"]},ke=function(){if(typeof window>"u"||typeof document>"u")return"";var t=window.getComputedStyle(document.documentElement,"")||["-moz-hidden-iframe"],n=(Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/)||t.OLink===""&&["","o"])[1];switch(n){case"ms":return"ms";default:return n&&n.length?n[0].toUpperCase()+n.substr(1):""}}();function Q(t,n){Object.keys(n).forEach(function(r){t.style[r]=n[r]})}function _(t,n){t.style["".concat(ke,"Transform")]=n==null?"":"translate3d(".concat(n.x,"px,").concat(n.y,"px,0)")}function ae(t,n){t.style["".concat(ke,"TransitionDuration")]=n==null?"":"".concat(n,"ms")}function V(t,n){for(;t;){if(n(t))return t;t=t.parentNode}return null}function he(t,n,r){return Math.max(t,Math.min(r,n))}function G(t){return t.substr(-2)==="px"?parseFloat(t):0}function dt(t){var n=window.getComputedStyle(t);return{bottom:G(n.marginBottom),left:G(n.marginLeft),right:G(n.marginRight),top:G(n.marginTop)}}function Ee(t,n){var r=n.displayName||n.name;return r?"".concat(t,"(").concat(r,")"):t}function se(t,n){var r=t.getBoundingClientRect();return{top:r.top+n.top,left:r.left+n.left}}function $(t){return t.touches&&t.touches.length?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.changedTouches&&t.changedTouches.length?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:{x:t.pageX,y:t.pageY}}function ut(t){return t.touches&&t.touches.length||t.changedTouches&&t.changedTouches.length}function ee(t,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{left:0,top:0};if(!!t){var s={left:r.left+t.offsetLeft,top:r.top+t.offsetTop};return t.parentNode===n?s:ee(t.parentNode,n,s)}}function ht(t,n,r){return t<r&&t>n?t-1:t>r&&t<n?t+1:t}function fe(t){var n=t.lockOffset,r=t.width,s=t.height,u=n,f=n,g="px";if(typeof n=="string"){var e=/^[+-]?\d*(?:\.\d*)?(px|%)$/.exec(n);K(e!==null,'lockOffset value should be a number or a string of a number followed by "px" or "%". Given %s',n),u=parseFloat(n),f=parseFloat(n),g=e[1]}return K(isFinite(u)&&isFinite(f),"lockOffset value should be a finite. Given %s",n),g==="%"&&(u=u*r/100,f=f*s/100),{x:u,y:f}}function ft(t){var n=t.height,r=t.width,s=t.lockOffset,u=Array.isArray(s)?s:[s,s];K(u.length===2,"lockOffset prop of SortableContainer should be a single value or an array of exactly two values. Given %s",s);var f=ve(u,2),g=f[0],e=f[1];return[fe({height:n,lockOffset:g,width:r}),fe({height:n,lockOffset:e,width:r})]}function pt(t){var n=window.getComputedStyle(t),r=/(auto|scroll)/,s=["overflow","overflowX","overflowY"];return s.find(function(u){return r.test(n[u])})}function Oe(t){return t instanceof HTMLElement?pt(t)?t:Oe(t.parentNode):null}function gt(t){var n=window.getComputedStyle(t);return n.display==="grid"?{x:G(n.gridColumnGap),y:G(n.gridRowGap)}:{x:0,y:0}}var H={TAB:9,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40},z={Anchor:"A",Button:"BUTTON",Canvas:"CANVAS",Input:"INPUT",Option:"OPTION",Textarea:"TEXTAREA",Select:"SELECT"};function mt(t){var n="input, textarea, select, canvas, [contenteditable]",r=t.querySelectorAll(n),s=t.cloneNode(!0),u=Be(s.querySelectorAll(n));return u.forEach(function(f,g){if(f.type!=="file"&&(f.value=r[g].value),f.type==="radio"&&f.name&&(f.name="__sortableClone__".concat(f.name)),f.tagName===z.Canvas&&r[g].width>0&&r[g].height>0){var e=f.getContext("2d");e.drawImage(r[g],0,0)}}),s}function pe(t){return t.sortableHandle!=null}var xt=function(){function t(n,r){ne(this,t),this.container=n,this.onScrollCallback=r}return te(t,[{key:"clear",value:function(){this.interval!=null&&(clearInterval(this.interval),this.interval=null)}},{key:"update",value:function(r){var s=this,u=r.translate,f=r.minTranslate,g=r.maxTranslate,e=r.width,p=r.height,i={x:0,y:0},l={x:1,y:1},d={x:10,y:10},c=this.container,a=c.scrollTop,x=c.scrollLeft,v=c.scrollHeight,I=c.scrollWidth,C=c.clientHeight,k=c.clientWidth,S=a===0,y=v-a-C===0,w=x===0,R=I-x-k===0;u.y>=g.y-p/2&&!y?(i.y=1,l.y=d.y*Math.abs((g.y-p/2-u.y)/p)):u.x>=g.x-e/2&&!R?(i.x=1,l.x=d.x*Math.abs((g.x-e/2-u.x)/e)):u.y<=f.y+p/2&&!S?(i.y=-1,l.y=d.y*Math.abs((u.y-p/2-f.y)/p)):u.x<=f.x+e/2&&!w&&(i.x=-1,l.x=d.x*Math.abs((u.x-e/2-f.x)/e)),this.interval&&(this.clear(),this.isAutoScrolling=!1),(i.x!==0||i.y!==0)&&(this.interval=setInterval(function(){s.isAutoScrolling=!0;var m={left:l.x*i.x,top:l.y*i.y};s.container.scrollTop+=m.top,s.container.scrollLeft+=m.left,s.onScrollCallback(m)},5))}}]),t}();function vt(t){var n=t.node;return{height:n.offsetHeight,width:n.offsetWidth}}function yt(t){var n=[z.Input,z.Textarea,z.Select,z.Option,z.Button];return!!(n.indexOf(t.target.tagName)!==-1||V(t.target,function(r){return r.contentEditable==="true"}))}var Ie={axis:o.exports.oneOf(["x","y","xy"]),contentWindow:o.exports.any,disableAutoscroll:o.exports.bool,distance:o.exports.number,getContainer:o.exports.func,getHelperDimensions:o.exports.func,helperClass:o.exports.string,helperContainer:o.exports.oneOfType([o.exports.func,typeof HTMLElement>"u"?o.exports.any:o.exports.instanceOf(HTMLElement)]),hideSortableGhost:o.exports.bool,keyboardSortingTransitionDuration:o.exports.number,lockAxis:o.exports.string,lockOffset:o.exports.oneOfType([o.exports.number,o.exports.string,o.exports.arrayOf(o.exports.oneOfType([o.exports.number,o.exports.string]))]),lockToContainerEdges:o.exports.bool,onSortEnd:o.exports.func,onSortMove:o.exports.func,onSortOver:o.exports.func,onSortStart:o.exports.func,pressDelay:o.exports.number,pressThreshold:o.exports.number,keyCodes:o.exports.shape({lift:o.exports.arrayOf(o.exports.number),drop:o.exports.arrayOf(o.exports.number),cancel:o.exports.arrayOf(o.exports.number),up:o.exports.arrayOf(o.exports.number),down:o.exports.arrayOf(o.exports.number)}),shouldCancelStart:o.exports.func,transitionDuration:o.exports.number,updateBeforeSortStart:o.exports.func,useDragHandle:o.exports.bool,useWindowAsScrollContainer:o.exports.bool},De={lift:[H.SPACE],drop:[H.SPACE],cancel:[H.ESC],up:[H.UP,H.LEFT],down:[H.DOWN,H.RIGHT]},bt={axis:"y",disableAutoscroll:!1,distance:0,getHelperDimensions:vt,hideSortableGhost:!0,lockOffset:"50%",lockToContainerEdges:!1,pressDelay:0,pressThreshold:5,keyCodes:De,shouldCancelStart:yt,transitionDuration:300,useWindowAsScrollContainer:!1},wt=Object.keys(Ie);function Ct(t){K(!(t.distance&&t.pressDelay),"Attempted to set both `pressDelay` and `distance` on SortableContainer, you may only use one or the other, not both at the same time.")}function St(t,n){try{var r=t()}catch(s){return n(!0,s)}return r&&r.then?r.then(n.bind(null,!1),n.bind(null,!0)):n(!1,value)}var Re=A.exports.createContext({manager:{}});function Tt(t){var n,r,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{withRef:!1};return r=n=function(u){ge(f,u);function f(g){var e;ne(this,f),e=me(this,xe(f).call(this,g)),T(b(b(e)),"state",{}),T(b(b(e)),"handleStart",function(i){var l=e.props,d=l.distance,c=l.shouldCancelStart;if(!(i.button===2||c(i))){e.touched=!0,e.position=$(i);var a=V(i.target,function(S){return S.sortableInfo!=null});if(a&&a.sortableInfo&&e.nodeIsChild(a)&&!e.state.sorting){var x=e.props.useDragHandle,v=a.sortableInfo,I=v.index,C=v.collection,k=v.disabled;if(k||x&&!V(i.target,pe))return;e.manager.active={collection:C,index:I},!ut(i)&&i.target.tagName===z.Anchor&&i.preventDefault(),d||(e.props.pressDelay===0?e.handlePress(i):e.pressTimer=setTimeout(function(){return e.handlePress(i)},e.props.pressDelay))}}}),T(b(b(e)),"nodeIsChild",function(i){return i.sortableInfo.manager===e.manager}),T(b(b(e)),"handleMove",function(i){var l=e.props,d=l.distance,c=l.pressThreshold;if(!e.state.sorting&&e.touched&&!e._awaitingUpdateBeforeSortStart){var a=$(i),x={x:e.position.x-a.x,y:e.position.y-a.y},v=Math.abs(x.x)+Math.abs(x.y);e.delta=x,!d&&(!c||v>=c)?(clearTimeout(e.cancelTimer),e.cancelTimer=setTimeout(e.cancel,0)):d&&v>=d&&e.manager.isActive()&&e.handlePress(i)}}),T(b(b(e)),"handleEnd",function(){e.touched=!1,e.cancel()}),T(b(b(e)),"cancel",function(){var i=e.props.distance,l=e.state.sorting;l||(i||clearTimeout(e.pressTimer),e.manager.active=null)}),T(b(b(e)),"handlePress",function(i){try{var l=e.manager.getActive(),d=function(){if(l){var c=function(){var O=w.sortableInfo.index,E=dt(w),M=gt(e.container),N=e.scrollContainer.getBoundingClientRect(),F=v({index:O,node:w,collection:R});if(e.node=w,e.margin=E,e.gridGap=M,e.width=F.width,e.height=F.height,e.marginOffset={x:e.margin.left+e.margin.right+e.gridGap.x,y:Math.max(e.margin.top,e.margin.bottom,e.gridGap.y)},e.boundingClientRect=w.getBoundingClientRect(),e.containerBoundingRect=N,e.index=O,e.newIndex=O,e.axis={x:x.indexOf("x")>=0,y:x.indexOf("y")>=0},e.offsetEdge=ee(w,e.container),m?e.initialOffset=$(oe({},i,{pageX:e.boundingClientRect.left,pageY:e.boundingClientRect.top})):e.initialOffset=$(i),e.initialScroll={left:e.scrollContainer.scrollLeft,top:e.scrollContainer.scrollTop},e.initialWindowScroll={left:window.pageXOffset,top:window.pageYOffset},e.helper=e.helperContainer.appendChild(mt(w)),Q(e.helper,{boxSizing:"border-box",height:"".concat(e.height,"px"),left:"".concat(e.boundingClientRect.left-E.left,"px"),pointerEvents:"none",position:"fixed",top:"".concat(e.boundingClientRect.top-E.top,"px"),width:"".concat(e.width,"px")}),m&&e.helper.focus(),C&&(e.sortableGhost=w,Q(w,{opacity:0,visibility:"hidden"})),e.minTranslate={},e.maxTranslate={},m){var q=y?{top:0,left:0,width:e.contentWindow.innerWidth,height:e.contentWindow.innerHeight}:e.containerBoundingRect,ce=q.top,de=q.left,We=q.width,He=q.height,je=ce+He,ze=de+We;e.axis.x&&(e.minTranslate.x=de-e.boundingClientRect.left,e.maxTranslate.x=ze-(e.boundingClientRect.left+e.width)),e.axis.y&&(e.minTranslate.y=ce-e.boundingClientRect.top,e.maxTranslate.y=je-(e.boundingClientRect.top+e.height))}else e.axis.x&&(e.minTranslate.x=(y?0:N.left)-e.boundingClientRect.left-e.width/2,e.maxTranslate.x=(y?e.contentWindow.innerWidth:N.left+N.width)-e.boundingClientRect.left-e.width/2),e.axis.y&&(e.minTranslate.y=(y?0:N.top)-e.boundingClientRect.top-e.height/2,e.maxTranslate.y=(y?e.contentWindow.innerHeight:N.top+N.height)-e.boundingClientRect.top-e.height/2);I&&I.split(" ").forEach(function(U){return e.helper.classList.add(U)}),e.listenerNode=i.touches?i.target:e.contentWindow,m?(e.listenerNode.addEventListener("wheel",e.handleKeyEnd,!0),e.listenerNode.addEventListener("mousedown",e.handleKeyEnd,!0),e.listenerNode.addEventListener("keydown",e.handleKeyDown)):(B.move.forEach(function(U){return e.listenerNode.addEventListener(U,e.handleSortMove,!1)}),B.end.forEach(function(U){return e.listenerNode.addEventListener(U,e.handleSortEnd,!1)})),e.setState({sorting:!0,sortingIndex:O}),S&&S({node:w,index:O,collection:R,isKeySorting:m,nodes:e.manager.getOrderedRefs(),helper:e.helper},i),m&&e.keyMove(0)},a=e.props,x=a.axis,v=a.getHelperDimensions,I=a.helperClass,C=a.hideSortableGhost,k=a.updateBeforeSortStart,S=a.onSortStart,y=a.useWindowAsScrollContainer,w=l.node,R=l.collection,m=e.manager.isKeySorting,D=function(){if(typeof k=="function"){e._awaitingUpdateBeforeSortStart=!0;var W=St(function(){var O=w.sortableInfo.index;return Promise.resolve(k({collection:R,index:O,node:w,isKeySorting:m},i)).then(function(){})},function(O,E){if(e._awaitingUpdateBeforeSortStart=!1,O)throw E;return E});if(W&&W.then)return W.then(function(){})}}();return D&&D.then?D.then(c):c(D)}}();return Promise.resolve(d&&d.then?d.then(function(){}):void 0)}catch(c){return Promise.reject(c)}}),T(b(b(e)),"handleSortMove",function(i){var l=e.props.onSortMove;typeof i.preventDefault=="function"&&i.cancelable&&i.preventDefault(),e.updateHelperPosition(i),e.animateNodes(),e.autoscroll(),l&&l(i)}),T(b(b(e)),"handleSortEnd",function(i){var l=e.props,d=l.hideSortableGhost,c=l.onSortEnd,a=e.manager,x=a.active.collection,v=a.isKeySorting,I=e.manager.getOrderedRefs();e.listenerNode&&(v?(e.listenerNode.removeEventListener("wheel",e.handleKeyEnd,!0),e.listenerNode.removeEventListener("mousedown",e.handleKeyEnd,!0),e.listenerNode.removeEventListener("keydown",e.handleKeyDown)):(B.move.forEach(function(w){return e.listenerNode.removeEventListener(w,e.handleSortMove)}),B.end.forEach(function(w){return e.listenerNode.removeEventListener(w,e.handleSortEnd)}))),e.helper.parentNode.removeChild(e.helper),d&&e.sortableGhost&&Q(e.sortableGhost,{opacity:"",visibility:""});for(var C=0,k=I.length;C<k;C++){var S=I[C],y=S.node;S.edgeOffset=null,S.boundingClientRect=null,_(y,null),ae(y,null),S.translate=null}e.autoScroller.clear(),e.manager.active=null,e.manager.isKeySorting=!1,e.setState({sorting:!1,sortingIndex:null}),typeof c=="function"&&c({collection:x,newIndex:e.newIndex,oldIndex:e.index,isKeySorting:v,nodes:I},i),e.touched=!1}),T(b(b(e)),"autoscroll",function(){var i=e.props.disableAutoscroll,l=e.manager.isKeySorting;if(i){e.autoScroller.clear();return}if(l){var d=oe({},e.translate),c=0,a=0;e.axis.x&&(d.x=Math.min(e.maxTranslate.x,Math.max(e.minTranslate.x,e.translate.x)),c=e.translate.x-d.x),e.axis.y&&(d.y=Math.min(e.maxTranslate.y,Math.max(e.minTranslate.y,e.translate.y)),a=e.translate.y-d.y),e.translate=d,_(e.helper,e.translate),e.scrollContainer.scrollLeft+=c,e.scrollContainer.scrollTop+=a;return}e.autoScroller.update({height:e.height,maxTranslate:e.maxTranslate,minTranslate:e.minTranslate,translate:e.translate,width:e.width})}),T(b(b(e)),"onAutoScroll",function(i){e.translate.x+=i.left,e.translate.y+=i.top,e.animateNodes()}),T(b(b(e)),"handleKeyDown",function(i){var l=i.keyCode,d=e.props,c=d.shouldCancelStart,a=d.keyCodes,x=a===void 0?{}:a,v=oe({},De,x);e.manager.active&&!e.manager.isKeySorting||!e.manager.active&&(!v.lift.includes(l)||c(i)||!e.isValidSortingTarget(i))||(i.stopPropagation(),i.preventDefault(),v.lift.includes(l)&&!e.manager.active?e.keyLift(i):v.drop.includes(l)&&e.manager.active?e.keyDrop(i):v.cancel.includes(l)?(e.newIndex=e.manager.active.index,e.keyDrop(i)):v.up.includes(l)?e.keyMove(-1):v.down.includes(l)&&e.keyMove(1))}),T(b(b(e)),"keyLift",function(i){var l=i.target,d=V(l,function(v){return v.sortableInfo!=null}),c=d.sortableInfo,a=c.index,x=c.collection;e.initialFocusedNode=l,e.manager.isKeySorting=!0,e.manager.active={index:a,collection:x},e.handlePress(i)}),T(b(b(e)),"keyMove",function(i){var l=e.manager.getOrderedRefs(),d=l[l.length-1].node.sortableInfo.index,c=e.newIndex+i,a=e.newIndex;if(!(c<0||c>d)){e.prevIndex=a,e.newIndex=c;var x=ht(e.newIndex,e.prevIndex,e.index),v=l.find(function(m){var D=m.node;return D.sortableInfo.index===x}),I=v.node,C=e.containerScrollDelta,k=v.boundingClientRect||se(I,C),S=v.translate||{x:0,y:0},y={top:k.top+S.y-C.top,left:k.left+S.x-C.left},w=a<c,R={x:w&&e.axis.x?I.offsetWidth-e.width:0,y:w&&e.axis.y?I.offsetHeight-e.height:0};e.handleSortMove({pageX:y.left+R.x,pageY:y.top+R.y,ignoreTransition:i===0})}}),T(b(b(e)),"keyDrop",function(i){e.handleSortEnd(i),e.initialFocusedNode&&e.initialFocusedNode.focus()}),T(b(b(e)),"handleKeyEnd",function(i){e.manager.active&&e.keyDrop(i)}),T(b(b(e)),"isValidSortingTarget",function(i){var l=e.props.useDragHandle,d=i.target,c=V(d,function(a){return a.sortableInfo!=null});return c&&c.sortableInfo&&!c.sortableInfo.disabled&&(l?pe(d):d.sortableInfo)});var p=new lt;return Ct(g),e.manager=p,e.wrappedInstance=A.exports.createRef(),e.sortableContextValue={manager:p},e.events={end:e.handleEnd,move:e.handleMove,start:e.handleStart},e}return te(f,[{key:"componentDidMount",value:function(){var e=this,p=this.props.useWindowAsScrollContainer,i=this.getContainer();Promise.resolve(i).then(function(l){e.container=l,e.document=e.container.ownerDocument||document;var d=e.props.contentWindow||e.document.defaultView||window;e.contentWindow=typeof d=="function"?d():d,e.scrollContainer=p?e.document.scrollingElement||e.document.documentElement:Oe(e.container)||e.container,e.autoScroller=new xt(e.scrollContainer,e.onAutoScroll),Object.keys(e.events).forEach(function(c){return B[c].forEach(function(a){return e.container.addEventListener(a,e.events[c],!1)})}),e.container.addEventListener("keydown",e.handleKeyDown)})}},{key:"componentWillUnmount",value:function(){var e=this;this.helper&&this.helper.parentNode&&this.helper.parentNode.removeChild(this.helper),this.container&&(Object.keys(this.events).forEach(function(p){return B[p].forEach(function(i){return e.container.removeEventListener(i,e.events[p])})}),this.container.removeEventListener("keydown",this.handleKeyDown))}},{key:"updateHelperPosition",value:function(e){var p=this.props,i=p.lockAxis,l=p.lockOffset,d=p.lockToContainerEdges,c=p.transitionDuration,a=p.keyboardSortingTransitionDuration,x=a===void 0?c:a,v=this.manager.isKeySorting,I=e.ignoreTransition,C=$(e),k={x:C.x-this.initialOffset.x,y:C.y-this.initialOffset.y};if(k.y-=window.pageYOffset-this.initialWindowScroll.top,k.x-=window.pageXOffset-this.initialWindowScroll.left,this.translate=k,d){var S=ft({height:this.height,lockOffset:l,width:this.width}),y=ve(S,2),w=y[0],R=y[1],m={x:this.width/2-w.x,y:this.height/2-w.y},D={x:this.width/2-R.x,y:this.height/2-R.y};k.x=he(this.minTranslate.x+m.x,this.maxTranslate.x-D.x,k.x),k.y=he(this.minTranslate.y+m.y,this.maxTranslate.y-D.y,k.y)}i==="x"?k.y=0:i==="y"&&(k.x=0),v&&x&&!I&&ae(this.helper,x),_(this.helper,k)}},{key:"animateNodes",value:function(){var e=this.props,p=e.transitionDuration,i=e.hideSortableGhost,l=e.onSortOver,d=this.containerScrollDelta,c=this.windowScrollDelta,a=this.manager.getOrderedRefs(),x={left:this.offsetEdge.left+this.translate.x+d.left,top:this.offsetEdge.top+this.translate.y+d.top},v=this.manager.isKeySorting,I=this.newIndex;this.newIndex=null;for(var C=0,k=a.length;C<k;C++){var S=a[C].node,y=S.sortableInfo.index,w=S.offsetWidth,R=S.offsetHeight,m={height:this.height>R?R/2:this.height/2,width:this.width>w?w/2:this.width/2},D=v&&y>this.index&&y<=I,W=v&&y<this.index&&y>=I,O={x:0,y:0},E=a[C].edgeOffset;E||(E=ee(S,this.container),a[C].edgeOffset=E,v&&(a[C].boundingClientRect=se(S,d)));var M=C<a.length-1&&a[C+1],N=C>0&&a[C-1];if(M&&!M.edgeOffset&&(M.edgeOffset=ee(M.node,this.container),v&&(M.boundingClientRect=se(M.node,d))),y===this.index){i&&(this.sortableGhost=S,Q(S,{opacity:0,visibility:"hidden"}));continue}p&&ae(S,p),this.axis.x?this.axis.y?W||y<this.index&&(x.left+c.left-m.width<=E.left&&x.top+c.top<=E.top+m.height||x.top+c.top+m.height<=E.top)?(O.x=this.width+this.marginOffset.x,E.left+O.x>this.containerBoundingRect.width-m.width&&M&&(O.x=M.edgeOffset.left-E.left,O.y=M.edgeOffset.top-E.top),this.newIndex===null&&(this.newIndex=y)):(D||y>this.index&&(x.left+c.left+m.width>=E.left&&x.top+c.top+m.height>=E.top||x.top+c.top+m.height>=E.top+R))&&(O.x=-(this.width+this.marginOffset.x),E.left+O.x<this.containerBoundingRect.left+m.width&&N&&(O.x=N.edgeOffset.left-E.left,O.y=N.edgeOffset.top-E.top),this.newIndex=y):D||y>this.index&&x.left+c.left+m.width>=E.left?(O.x=-(this.width+this.marginOffset.x),this.newIndex=y):(W||y<this.index&&x.left+c.left<=E.left+m.width)&&(O.x=this.width+this.marginOffset.x,this.newIndex==null&&(this.newIndex=y)):this.axis.y&&(D||y>this.index&&x.top+c.top+m.height>=E.top?(O.y=-(this.height+this.marginOffset.y),this.newIndex=y):(W||y<this.index&&x.top+c.top<=E.top+m.height)&&(O.y=this.height+this.marginOffset.y,this.newIndex==null&&(this.newIndex=y))),_(S,O),a[C].translate=O}this.newIndex==null&&(this.newIndex=this.index),v&&(this.newIndex=I);var F=v?this.prevIndex:I;l&&this.newIndex!==F&&l({collection:this.manager.active.collection,index:this.index,newIndex:this.newIndex,oldIndex:F,isKeySorting:v,nodes:a,helper:this.helper})}},{key:"getWrappedInstance",value:function(){return K(s.withRef,"To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableContainer() call"),this.wrappedInstance.current}},{key:"getContainer",value:function(){var e=this.props.getContainer;return typeof e!="function"?ye.exports.findDOMNode(this):e(s.withRef?this.getWrappedInstance():void 0)}},{key:"render",value:function(){var e=s.withRef?this.wrappedInstance:null;return A.exports.createElement(Re.Provider,{value:this.sortableContextValue},A.exports.createElement(t,be({ref:e},Te(this.props,wt))))}},{key:"helperContainer",get:function(){var e=this.props.helperContainer;return typeof e=="function"?e():this.props.helperContainer||this.document.body}},{key:"containerScrollDelta",get:function(){var e=this.props.useWindowAsScrollContainer;return e?{left:0,top:0}:{left:this.scrollContainer.scrollLeft-this.initialScroll.left,top:this.scrollContainer.scrollTop-this.initialScroll.top}}},{key:"windowScrollDelta",get:function(){return{left:this.contentWindow.pageXOffset-this.initialWindowScroll.left,top:this.contentWindow.pageYOffset-this.initialWindowScroll.top}}}]),f}(A.exports.Component),T(n,"displayName",Ee("sortableList",t)),T(n,"defaultProps",bt),T(n,"propTypes",Ie),r}var Pe={index:o.exports.number.isRequired,collection:o.exports.oneOfType([o.exports.number,o.exports.string]),disabled:o.exports.bool},kt=Object.keys(Pe);function Et(t){var n,r,s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{withRef:!1};return r=n=function(u){ge(f,u);function f(){var g,e;ne(this,f);for(var p=arguments.length,i=new Array(p),l=0;l<p;l++)i[l]=arguments[l];return e=me(this,(g=xe(f)).call.apply(g,[this].concat(i))),T(b(b(e)),"wrappedInstance",A.exports.createRef()),e}return te(f,[{key:"componentDidMount",value:function(){this.register()}},{key:"componentDidUpdate",value:function(e){this.node&&(e.index!==this.props.index&&(this.node.sortableInfo.index=this.props.index),e.disabled!==this.props.disabled&&(this.node.sortableInfo.disabled=this.props.disabled)),e.collection!==this.props.collection&&(this.unregister(e.collection),this.register())}},{key:"componentWillUnmount",value:function(){this.unregister()}},{key:"register",value:function(){var e=this.props,p=e.collection,i=e.disabled,l=e.index,d=ye.exports.findDOMNode(this);d.sortableInfo={collection:p,disabled:i,index:l,manager:this.context.manager},this.node=d,this.ref={node:d},this.context.manager.add(p,this.ref)}},{key:"unregister",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.props.collection;this.context.manager.remove(e,this.ref)}},{key:"getWrappedInstance",value:function(){return K(s.withRef,"To access the wrapped instance, you need to pass in {withRef: true} as the second argument of the SortableElement() call"),this.wrappedInstance.current}},{key:"render",value:function(){var e=s.withRef?this.wrappedInstance:null;return A.exports.createElement(t,be({ref:e},Te(this.props,kt)))}}]),f}(A.exports.Component),T(n,"displayName",Ee("sortableElement",t)),T(n,"contextType",Re),T(n,"propTypes",Pe),T(n,"defaultProps",{collection:0}),r}function Ot(t,n,r){const s=n<0?t.length+n:n;if(s>=0&&s<t.length){const u=r<0?t.length+r:r,[f]=t.splice(n,1);t.splice(u,0,f)}}function It(t,n,r){return t=[...t],Ot(t,n,r),t}const le=(t,n)=>typeof t=="object"&&Object.keys(t).length>0?Object.keys(t).length===Object.keys(n).length&&Object.keys(t).every(r=>le(t[r],n[r])):t===n,Dt=(t,n)=>t.length===n.length&&t.every((r,s)=>le(r,n[s])),Rt={objectsEqual:le,arraysEqual:Dt},Pt=()=>({closeIcon:{position:"absolute",right:8,top:16},textField:{marginTop:"5px"},defaultCountry:{margin:"12px"}}),Ae=({open:t,date:n,onClose:r,onAdd:s})=>{const{t:u}=re(),f=Y(Pt);return L(Qe,{open:t,onClose:r,"aria-labelledby":"alert-dialog",fullWidth:!0,maxWidth:"md",classes:{paper:f.paperRoot},children:[L(_e,{children:[h("span",{children:h(ie,{color:"secondary",variant:"h2",children:u("supplierProfiles.editEndpoint")})}),h(j,{className:f.closeIcon,onClick:r,children:h(Ge,{})})]}),h(et,{style:{padding:"2px"},children:h(qe,{date:n,onSave:s,inModal:!0})})]})};Ae.propTypes={open:o.exports.bool,date:o.exports.oneOfType([o.exports.string,o.exports.object]),onClose:o.exports.func,onAdd:o.exports.func};const Me={image:{width:"30px",color:"#fafafa !important"},nameContainer:{display:"flex",alignItems:"center"},card:{marginBottom:"5px"},cardContent:{padding:"7px 8px !important"},alignCenter:{display:"flex",alignItems:"center"},actions:{display:"flex",justifyContent:"end"}},At=t=>{switch(new Date(t).toLocaleDateString("en",{weekday:"long"})){case"Friday":return"#d32f2f";case"Sunday":return"#2e7d32";default:return"#227db5"}},Mt=Et(({song:t,onRemove:n})=>{const r=Y(Me),{_id:s,name:u}=t;return h(Ce,{className:r.card,children:h(Se,{className:r.cardContent,children:L(P,{container:!0,className:r.alignCenter,children:[h(P,{item:!0,xs:2,children:h("img",{className:r.image,src:"/img/music.png",alt:"music.png"})}),h(P,{item:!0,xs:8,children:h(ie,{variant:"h3",color:"text.secondary",children:u})}),h(P,{item:!0,xs:2,children:h(j,{sx:{color:"firebrick"},"aria-label":"remove",onClick:()=>n(s),children:h(st,{style:{pointerEvents:"none"}})})})]})})})}),Nt=Tt(({children:t})=>h(P,{children:t})),Ne=({praise:t,onEdit:n,onDelete:r,onConfirm:s})=>{const{_id:u}=t,{t:f,i18n:g}=re(),e=Y(Me),[p,i]=A.exports.useState([...t.songs]),[l,d]=A.exports.useState(!1),{ConfirmDialog:c,openDialog:a}=tt(),x=({oldIndex:m,newIndex:D})=>{i(It(p,m,D))},v=m=>{d(!1),i(m)},I=m=>{i(p.filter(D=>D._id!==m))},C=()=>{n({...t,songs:p.map((m,D)=>({...m,index:D}))})},k=()=>{i([...t.songs])},S=async()=>{await a(f("praises.sureToDeleteItem"),()=>r(u))},y=async()=>{await a(f("praises.sureToConfirmItem"),()=>s(u))},w=ue.getCorrectedDate(new Date(t.date),-1),R=!Rt.arraysEqual(t.songs,p);return L(P,{item:!0,xs:12,md:6,children:[c,h(Ce,{sx:{maxWidth:345,marginBottom:"10px"},children:L(Se,{className:e.cardContent,children:[L(P,{container:!0,className:e.nameContainer,children:[h(P,{item:!0,xs:3,children:h(rt,{style:{fontSize:"50px",color:At(w)}})}),h(P,{item:!0,xs:5,children:h(ie,{variant:"h1",color:"text.secondary",children:ue.getFormattedDate(w,g.language)})}),R&&L(P,{item:!0,xs:4,children:[h(j,{sx:{color:"green"},"aria-label":"remove",onClick:C,children:h(it,{})}),h(j,{sx:{color:"firebrick"},"aria-label":"cancel",onClick:k,children:h(at,{})})]})]}),h(Ke,{}),h(Nt,{axis:"y",lockAxis:"y",onSortEnd:x,children:p.map((m,D)=>h(Mt,{index:D,song:m,onRemove:I},`item-${m._id}`))}),h(P,{className:e.actions,spacing:1,container:!0,children:L(P,{item:!0,xs:3,className:e.actions,children:[h(j,{size:"large",color:"error",onClick:S,children:h(ot,{})}),h(j,{size:"large",color:"primary",onClick:()=>d(!0),children:h(Ze,{})}),h(j,{size:"large",color:"success",onClick:y,children:h(Je,{})})]})})]})}),h(Ae,{open:l,date:new Date(w),onClose:()=>d(!1),onAdd:v})]},u)};Ne.propTypes={praise:o.exports.object,onEdit:o.exports.func,onDelete:o.exports.func,onConfirm:o.exports.func};const Lt={noResults:{textAlign:"center",width:"100%",color:"#d32f2f"}},Le=({praises:t,loading:n,Loading:r,onEdit:s,onDelete:u,onConfirm:f})=>{const{t:g}=re(),e=Y(Lt);return n?h(r,{}):h(we,{children:t.length?t.map(p=>h(Ne,{praise:p,onEdit:s,onDelete:u,onConfirm:f},p._id)):h("div",{className:e.noResults,children:g("noResults")})})};Le.propTypes={praises:o.exports.array,loading:o.exports.bool,Loading:o.exports.func,onEdit:o.exports.func,onDelete:o.exports.func,onConfirm:o.exports.func};const Wt={title:{marginBottom:"10px"},spaceBetween:{display:"flex",justifyContent:"space-between"},container:{marginTop:"50px"}},Ht=()=>{const{t}=re(),n=Y(Wt),[r,s]=A.exports.useState([]),{createSuccessSnackbar:u,createErrorSnackbar:f}=Ye(),{loading:g,Loading:e,setLoading:p}=Fe(),i=async()=>{p(!0);const a=await Z.postRequest(J.getPraises);a.ok?(s(a.data.praises),u(t("praises.gettingPraisesSuccess"))):f(t("praises.gettingPraisesFailed")),p(!1)};A.exports.useEffect(()=>{i().then()},[]);const l=async a=>{p(!0),(await Z.postRequest(J.updatePraise,{praise:{songs:a.songs,date:a.date}})).ok?(await i(),u(t("praises.updatingPraiseSuccess"))):f(t("praises.updatingPraiseFailed")),p(!1)},d=async a=>{p(!0),(await Z.postRequest(J.removePraise,{_id:a})).ok?(await i(),u(t("praises.deletingPraiseSuccess"))):f(t("praises.deletingPraiseFailed")),p(!1)},c=async a=>{p(!0),(await Z.postRequest(J.confirmPraise,{_id:a})).ok?(await i(),u(t("praises.confirmationPraiseSuccess"))):f(t("praises.confirmationPraiseFailed")),p(!1)};return g?h(e,{}):L(we,{children:[L("div",{className:n.spaceBetween,children:[h(ie,{className:n.title,variant:"h1",children:t("praises.title")}),h(Ue,{to:$e.replaceParamsInReactUrl(Ve.SONGS,{id:"new"}),plain:!0,children:L(Xe,{uiLibrary:"mui",variant:"contained",size:"small",sx:{ml:1},children:[h(nt,{sx:{mr:1}})," ",t("praises.addNew")]})})]}),h(P,{className:n.container,container:!0,spacing:2,children:h(Le,{praises:r,loading:g,Loading:e,onEdit:l,onDelete:d,onConfirm:c})})]})};Ht.propTypes={};export{Ht as default};
