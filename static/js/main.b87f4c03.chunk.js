(this["webpackJsonpcapture-the-flag"]=this["webpackJsonpcapture-the-flag"]||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n(14)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(5),o=n.n(r),i=(n(11),n(2)),l=n(3),u=n(1),s=(n(12),n(13),function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return e})).join(" ")}),f=function(e){return e*e};var d=function(e){var t,n=e.className,a=e.teamId,r=e.dx,o=e.dy,i=e.style,l=e.holding,u=Math.abs(r),f=Math.abs(o),d=u>.05||f>.05;return t=u>f?r<0?"top":"bottom":o<0?"left":"right",c.a.createElement("div",{className:s("Character","team_".concat(a),d&&"moving",t,n),style:i},l&&c.a.createElement("div",{className:s("holding",l)}))},m=new Array(31).fill(0).map((function(e,t){return 1<<t})),v=Object(u.a)(m,16),b=v[0],h=v[1],w=v[2],p=v[3],j=v[4],O=v[5],y=v[6],g=v[7],E=v[8],k=v[9],M=v[10],F=v[11],N=v[12],S=v[13],_=v[14],A=v[15],L=[h,w,p,j,O,y,E,k,M,F,N,S,_,A];function I(e){return e.map((function(e){return e.map((function(e){return e}))}))}var R=function(e){var t=e.mapHeight,n=e.mapWidth,r=e.windowHeight,o=Object(a.useState)([0,0]),m=Object(u.a)(o,2),v=Object(u.a)(m[0],2),R=v[0],x=v[1],H=m[1],P=Object(a.useState)([0,0]),T=Object(u.a)(P,2),q=Object(u.a)(T[0],2),z=q[0],C=q[1],D=T[1],W=Object(a.useState)(0),J=Object(u.a)(W,2),U=J[0],B=J[1],G=Object(a.useState)(2*r|0),K=Object(u.a)(G,2),Q=K[0],V=K[1],X=Object(a.useState)(function(e,t){var n=new Array(e).fill(0).map((function(n,a){return new Array(t).fill(0).map((function(n,c){var r=0,o=0===a,i=a===e-1,l=0===c,u=c===t-1;return o&&l?r|=N:o&&u?r|=S:i&&l?r|=_:i&&u?r|=A:o?r|=E:i?r|=k:l?r|=M:u?r|=F:80===a?r|=b:4===a||a===e-1-4?r|=y:Math.random()<.01?r|=[h,w,p][3*Math.random()|0]:Math.random()<.02?r|=j:Math.random()<.001&&(r|=g),r}))}));return n[40][t/2|0]|=O,n[e-1-40][t/2|0]|=O,n}(t,n)),Y=Object(u.a)(X,2),Z=Y[0],$=Y[1],ee=Object(a.useState)(!1),te=Object(u.a)(ee,2),ne=te[0],ae=te[1],ce=Object(a.useState)(!1),re=Object(u.a)(ce,2),oe=re[0],ie=re[1],le=Object(a.useState)(0),ue=Object(u.a)(le,2),se=ue[0],fe=ue[1],de=Object(a.useState)(g),me=Object(u.a)(de,2),ve=me[0],be=me[1],he="".concat(9.09,"vw");oe&&(r=81,Q=81,he="".concat(1.23,"vw"),z=40,C=0),Object(a.useEffect)((function(){var e=function(e){e.preventDefault(),console.log(e.key);var t=0,n=0;switch(e.key){case"ArrowDown":t++;break;case"ArrowUp":t--;break;case"ArrowLeft":n--;break;case"ArrowRight":n++}H([t/=5,n/=5])},t=function(e){H([0,0])},n=function(e){e.absolute,e.alpha;var t=e.beta,n=e.gamma;H([-n/540,t/540])},a=function(){V(window.innerHeight/window.innerWidth*r+.5|0)};a();var c=window.setInterval((function(){B(Math.random())}),1e3/30);return document.addEventListener("keydown",e),document.addEventListener("keyup",t),window.addEventListener("resize",a),window.addEventListener("deviceorientation",n,!0),function(){window.clearInterval(c),document.removeEventListener("keydown",e),document.removeEventListener("keyup",t),window.removeEventListener("resize",a),window.removeEventListener("deviceorientation",n)}}),[]),Object(a.useEffect)((function(){if(oe){var e=Math.atan2(-x,R),t=se,n=Math.PI/300,a=e-t,c=Math.abs(a);if(0===c)return;c>Math.PI?t-=a/c*n:t+=a/c*n,t%=2*Math.PI,fe(t)}else{var r=z+R,o=C+x,i=Z[we+r+.5|0][pe+C+.5|0];L.some((function(e){return(e&i)>0}))&&(r=z);var l=Z[we+z+.5|0][pe+o+.5|0];L.some((function(e){return(e&l)>0}))&&(o=C);var s=!1;Ee.forEach((function(e,t){e.forEach((function(e,n){(e&O)>0&&function(e,t){var n=Object(u.a)(e,2),a=n[0],c=n[1],r=Object(u.a)(t,2),o=r[0],i=r[1];return Math.sqrt(f(a-o)+f(c-i))}([ye-3+t,ge-3+n],[we+r,pe+o])<2&&(ie(!0),s=!0)}))})),s||D([r,o])}}),[U]);var we=t/2|0,pe=n/2|0,je=r/2|0,Oe=Q/2|0,ye=we+(0|z)-je,ge=pe+(0|C)-Oe,Ee=function(e,t,n,a,c){return(t<0?[].concat(Object(l.a)(new Array(-t).fill(0).map((function(){return new Array(c).fill(0)}))),Object(l.a)(e.slice(0,t+a))):e.slice(t,t+a)).map((function(e){return n<0?[].concat(Object(l.a)(new Array(-n).fill(0)),Object(l.a)(e.slice(0,n+c))):e.slice(n,n+c)}))}(Z,ye-3,ge-3,r+7,Q+7),ke=(0|z)-z,Me=(0|C)-C,Fe=Object(a.useRef)(null),Ne=Fe.current,Se=Object(a.useRef)(null),_e=Se.current;if(_e){var Ae,Le=_e.getContext("2d");Le.clearRect(0,0,_e.width,_e.height);var Ie=(Ae={},Object(i.a)(Ae,O,["#ffe300",2]),Object(i.a)(Ae,y,["#606060",1]),Object(i.a)(Ae,b,["#808080",1]),Object(i.a)(Ae,g,["#ff6600",1]),Ae),Re=Object.keys(Ie);Z.forEach((function(e,t){e.forEach((function(e,n){var a=Re.find((function(t){return(t&e)>0}));if(a in Ie){var c=Object(u.a)(Ie[a],2),r=c[0],o=c[1];Le.fillStyle=r,Le.fillRect(n-o,t-o,2*o+1,2*o+1)}}))})),Le.fillStyle="#FFFFFF",Le.fillRect(pe+(C+.5|0)-1,we+(z+.5|0)-1,3,3),Le.strokeStyle="#FFFFFF",Le.strokeRect(ge-1,ye-1,Q+2,r+2)}return c.a.createElement("div",{className:"App",ref:Fe,onTouchStart:function(){return ae(!0)},onTouchEnd:function(){return ae(!1)},onMouseDown:function(){return ae(!0)},onMouseUp:function(){return ae(!1)},onClick:function(){if(document.fullscreenElement||Ne&&Ne.requestFullscreen&&Ne.requestFullscreen().catch(alert),oe)ie(!1);else if(ve===g){var e=function(e,t,n,a){var c=I(e);return c[t][n]|=a,c}(Z,we+(z+.5|0),pe+(C+.5|0),g);$(e),be(0)}}},c.a.createElement("div",{className:"game"},c.a.createElement("div",{className:s("grid",oe&&"scan"),style:{marginTop:"calc(".concat(ke-3," * ").concat(he,")"),marginLeft:"calc(".concat(Me-3," * ").concat(he,")"),paddingLeft:oe?"calc((100vh - 100vw) / 2)":""}},Ee.map((function(e,t){return c.a.createElement("div",{className:"row",key:t},e.map((function(e,n){var a=["divider","rock0","rock1","rock2","tree","tower","jail","key","border_top","border_bottom","border_left","border_right","border_top_left","border_top_right","border_bottom_left","border_bottom_right"].filter((function(t,n){return(e&1<<n)>0}));return a.length>0&&c.a.createElement("div",{className:"col",key:n,style:{left:"calc(".concat(n," * ").concat(he,")")}},a.map((function(e){return c.a.createElement("div",{key:e,className:s("block",e),style:{zIndex:["divider","key"].includes(e)?0:z+3<(0|z)-je+t?2:0}})})))})))}))),!oe&&c.a.createElement(d,{className:"character",teamId:0,dx:R,dy:x,style:{top:"calc(".concat(je," * ").concat(he,")"),left:"calc(".concat(Oe," * ").concat(he,")")},holding:ve===g?"key":"lamp"}),!oe&&c.a.createElement("div",{className:s("illumination",ne&&"flash"),style:{marginTop:"calc(".concat(je," * ").concat(he,")"),marginLeft:"calc(".concat(Oe," * ").concat(he,")")}}),oe&&c.a.createElement("div",{className:"spotlight",style:{transform:"rotate(".concat(se/Math.PI*180,"deg)")}}),!oe&&c.a.createElement("div",{className:"minimap"},c.a.createElement("canvas",{ref:Se,className:"canvas",height:t,width:n}))))};o.a.render(c.a.createElement(R,{mapHeight:161,mapWidth:81,windowHeight:11}),document.getElementById("root"))}],[[6,1,2]]]);
//# sourceMappingURL=main.b87f4c03.chunk.js.map