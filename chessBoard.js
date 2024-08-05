class Chessboard{#a;undo=!1;#b;sparePieces=!1;#c="png";#d;#e=!1;legalMoveOnly=!1;#f=!1;pieceTheme="neo";#g="rgb(115,149,82)";#h="rgb(235,236,208)";moves=[];BRIDGE=null;status="active";halfMoveCount=0;fullMoveCount=1;enPassantSquare="";turn="w";PGN=[];moveStack=[];FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";FENs=[];timeFormat=null;whiteTime=0;blackTime=0;increment=0;timerInterval=null;lastTimestamp=0;ID1="";ID2="";matchStarted=!1;enableSound=!1;isAnimating=!1;castlingRights={w:["",""],b:["",""]};#i="q";#j;#k;#l;#m=0;#n=null;#o=null;#p="";#q="";#r={start:"",end:""};#s={bp:"blackPawn",wp:"whitePawn",bb:"blackBishop",wb:"whiteBishop",bn:"blackKnight",wn:"whiteKnight",br:"blackRook",wr:"whiteRook",bq:"blackQueen",wq:"whiteQueen",bk:"blackKing",wk:"whiteKing"};#t={blackPawn:"bp",whitePawn:"wp",blackBishop:"bb",whiteBishop:"wb",blackKnight:"bn",whiteKnight:"wn",blackRook:"br",whiteRook:"wr",blackQueen:"bq",whiteQueen:"wq",blackKing:"bk",whiteKing:"wk"};#u={p:"bp",r:"br",n:"bn",b:"bb",q:"bq",k:"bk",P:"wp",R:"wr",N:"wn",B:"wb",Q:"wq",K:"wk"};#v={bp:"p",br:"r",bn:"n",bb:"b",bq:"q",bk:"k",wp:"P",wr:"R",wn:"N",wb:"B",wq:"Q",wk:"K"};everyMove=[];constructor(e,t={}){if(this.#a=document.getElementById(e),!this.#a)throw Error("Element not found");if(this.addStyles(),this.#a.classList.add("board"),this.#a.innerHTML+=this.#w,document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("myModal"),t=document.querySelector(".close");t.onclick=()=>e.style.display="none",window.onclick=t=>{t.target===e&&(e.style.display="none")}}),"string"==typeof t)"start"!==t&&(this.FEN=t);else if("object"==typeof t){t.position&&"start"!==t.position&&(this.FEN=t.position);let s=this.FEN.split(" ");this.turn=s[1],s[2].includes("K")&&(this.castlingRights.w[0]="K"),s[2].includes("Q")&&(this.castlingRights.w[1]="Q"),s[2].includes("k")&&(this.castlingRights.b[0]="k"),s[2].includes("q")&&(this.castlingRights.b[1]="q"),"-"!==s[3]&&(this.enPassantSquare=this.convertCoordtoId(s[3])),this.halfMoveCount=parseInt(s[4]),this.fullMoveCount=parseInt(s[5]),this.orientation=t.orientation||"white",this.draggable=void 0!==t.draggable&&t.draggable,this.#c=t.format||"pgn",this.timeFormat=t.timeFormat||null,this.showNotation=void 0!==t.showNotation&&t.showNotation,this.pieceTheme=t.pieceTheme||"neo",this.legalMoveOnly=t.onlyLegalMoves||!1,this.#g=t.darkColor||"rgb(115,149,82)",this.#h=t.lightColor||"rgb(235,236,208)",this.#f=t.highlightLegalMoves||!1,this.legalMoveOnly=t.onlyLegalMoves||!1,this.enableSound=t.enableSound||!1}else{let i=this.FEN.split(" ");this.turn=i[1],i[2].includes("K")&&(this.castlingRights.w[0]="K"),i[2].includes("Q")&&(this.castlingRights.w[1]="Q"),i[2].includes("k")&&(this.castlingRights.b[0]="k"),i[2].includes("q")&&(this.castlingRights.b[1]="q"),"-"!==i[3]&&(this.enPassantSquare=this.convertCoordtoId(i[3])),this.halfMoveCount=parseInt(i[4]),this.fullMoveCount=parseInt(i[5])}this.timeFormat&&(this.whiteTime=6e4*this.timeFormat.minute,this.blackTime=6e4*this.timeFormat.minute,this.increment=1e3*this.timeFormat.increment,this.ID1=this.timeFormat.ID1,this.ID2=this.timeFormat.ID2,this.updateTimer(),this.matchStarted=!0,setTimeout(()=>{this.startTimer(),document.addEventListener("DOMContentLoaded",()=>{this.#x("start")})},1e3)),this.#j=this.#a.offsetWidth,this.#b=document.createElement("div"),this.#b.classList.add("chessboard"),this.#a.appendChild(this.#b),this.#d="hovered",this.handleKeyDown=this.handleKeyDown.bind(this),this.onScroll=this.onScroll.bind(this),document.addEventListener("keydown",this.handleKeyDown),this.#b.addEventListener("wheel",this.onScroll),this.#y(this.FEN),this.FENs.push(this.FEN),this.draggable&&this.enableDrag()}bridge(e){this.BRIDGE=e}#w=`
            <div id="myModal" class="modal-gamestatus">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>lorem</p>
                <div id="modal-features">
                    <button id="rematch" class="modal-options">Rematch</button>
                    <button id="newgame" class="modal-options">New Game</button>
                </div>
            </div>
        </div>`;addStyles(){let e=`
        .board{display:flex;flex-direction:column;justify-content:center;
        position:relative} .chessboard{aspect-ratio:1/1;display:flex;
        flex-wrap:wrap;border-radius:.25em;overflow:hidden;position:relative}
        .square{width:calc(100%/8);height:calc(100%/8);cursor:grab;position:relative;
        display:flex;justify-content:center;align-items:center}.sparePieces{width:calc(600%/8);
        aspect-ratio:4/1}.sparePieces img{aspect-ratio:1/1;width:calc(90%/6);
        cursor:grab}.chessPiece{width:90%;aspect-ratio:1/1;cursor:grab;z-index:5;
        transition:transform .5s ease-in;position:relative}.square.hovered{box-shadow:inset 0 0 .6em #63ea4b
        }.dragging{cursor:grabbing;z-index:1000}.buttons{height:50px;width:50px}.file{display:flex;
        justify-content:center;align-items:center;width:25%;height:25%;font-family:Arial,Helvetica,sans-serif
        ;font-size:.7em;font-weight:600;position:absolute;bottom:2%;right:0}.rank{display:flex
        ;justify-content:center;align-items:center;width:25%;height:25%;font-size:.8em;font-weight:600
        ;position:absolute;top:5%;left:0}.fade-out{animation:fadeOut .6s forwards}@keyframes 
        fadeOut{from{opacity:1}to{opacity:0}}.square.analysisW{background-color:#EB7D6A!important}
        .square.analysisB{background-color:#D36C50!important}.circle{width:35%;height:35%;border-radius:50%;
        background-color:black;opacity:.2}.ring{width:80%;height:80%;border:.25em solid#000000;border-radius:50%
        ;opacity:.2;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
        .board,.image{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none
        ;user-select:none}.modal-gamestatus{user-select:none;display:none;position:absolute
        ;z-index:10;margin:auto;width:100%;height:100%;background:rgba(0,0,0,0.4);animation:fadeIn .5s}
        .modal-gamestatus .modal-content{background:#fff;margin:15% auto;padding:20px;border-radius:10px
        ;width:40%;height:60%;max-width:500px;animation:slideDown .5s forwards;display:flex;
        flex-direction:column;justify-content:space-around;span{color:#000;font-size:xx-large
        ;text-align:end;cursor:pointer;font-weight:900}p{text-align:center;font-size:1em;font-weight:600;
        width:80%;font-family:cursive;height:50%;margin:0 auto;display:flex;justify-content:center;align-items:center}
        #modal-features{display:flex;justify-content:space-around;.modal-options{color:white;width:42%;height:3em;
        background-color:#636261;margin:auto 0;font-size:x-small;font-family:cursive;display:flex;cursor:pointer;
        border-radius:5px;text-align:center;align-items:center;justify-content:center}}}@keyframes fadeIn{from{opacity:0}
        to{opacity:1}}@keyframes slideDown{from{transform:translateY(-100%)}to{transform:translateY(0)}}
  `,t=document.querySelector("style");t||(t=document.createElement("style"),document.head.appendChild(t)),t.appendChild(document.createTextNode(e))}startTimer(){this.lastTimestamp=performance.now(),this.timerInterval=setInterval(()=>this.updateTimer(),100)}stopTimer(){clearInterval(this.timerInterval)}updateTimer(){let e=performance.now(),t=e-this.lastTimestamp;this.lastTimestamp=e,"w"===this.turn?(this.whiteTime-=t,this.whiteTime<0&&(this.whiteTime=0,this.stopTimer(),alert("White lost on time"))):(this.blackTime-=t,this.blackTime<0&&(this.blackTime=0,this.stopTimer(),alert("Black lost on time"))),this.updateDisplay()}toggleTimer(){this.matchStarted&&(this.stopTimer(),"b"===this.turn?this.whiteTime+=this.increment:this.blackTime+=this.increment,this.startTimer())}updateDisplay(){let e=[this.formatTime(this.whiteTime),this.formatTime(this.blackTime),],t=document.getElementById(`${this.ID1}`);t&&(t.textContent=e[0]);let s=document.getElementById(`${this.ID2}`);return s&&(s.textContent=e[1]),e}formatTime(e){let t=Math.floor(e/1e3),s=Math.floor(t/3600),i=Math.floor(t%3600/60),a=t%60,r=Math.floor(e%1e3/100);return s>0?`${s.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}.${r}`:`${i.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}.${r}`}onScroll(e){e.preventDefault(),e.deltaY<0&&!this.isAnimating&&this.undoMove()}handleKeyDown(e){"ArrowRight"===e.key?this.handleRightArrow():"ArrowLeft"===e.key&&this.handleLeftArrow()}handleRightArrow(){console.log("Right arrow key pressed")}handleLeftArrow(){this.undoMove(),console.log("Left arrow key pressed")}#y(e){for(let t=1;t<=8;t++)for(let s=1;s<=8;s++){let i=document.createElement("div");i.style.backgroundColor=(t+s)%2==0?this.#h:this.#g,i.classList.add("square",(t+s)%2==0?"white":"black"),i.id="sq"+(8*(t-1)+s),i.addEventListener("click",()=>{0===i.childNodes.length&&this.hideLegalMoves(),this.legalMoveOnly&&this.moves.includes(i.id)?(this.#q=i.id,this.makeMove(this.#p,this.#q,"byClick")):this.legalMoveOnly||(this.#q=i.id,this.makeMove(this.#p,this.#q,"byClick"))}),this.#b.appendChild(i)}this.#b.querySelectorAll(".black").forEach(e=>{e.addEventListener("contextmenu",t=>{t.preventDefault(),e.classList.contains("analysisB")?e.classList.remove("analysisB"):e.classList.add("analysisB")})}),this.#b.querySelectorAll(".white").forEach(e=>{e.addEventListener("contextmenu",t=>{t.preventDefault(),e.classList.contains("analysisW")?e.classList.remove("analysisW"):e.classList.add("analysisW")})}),"start"===e?this.start():""!=e&&this.setPosition(e),this.showNotation&&this.enableCoordinates(),"black"===this.orientation&&this.flipBoard()}enableCoordinates(){if(this.showNotation=!0,!this.#b.children[0].querySelector("span")){let e=["a","b","c","d","e","f","g","h"],t="sq1"===this.#b.children[0].id?"w":"b";for(let s=0;s<8;s++){let i="w"===t?1:-1,a="w"===t?s:7-s,r="w"===t?57:8,o=document.createElement("span");o.classList.add("file"),o.style.color=s%2==0?this.#h:this.#g,o.innerText=e[a];this.#b.querySelector(`.square[id="sq${r+s*i}"]`).appendChild(o)}let h="sq1"===this.#b.children[0].id?57:8;for(let n=0;n<8;n++){let l=8===h?8:-8,c=document.createElement("span");c.classList.add("rank"),c.innerText=57===h?n+1:8-n,c.style.color=n%2==0?this.#h:this.#g;this.#b.querySelector(`.square[id="sq${l*n+h}"]`).appendChild(c)}}}disableCoordinates(){this.showNotation=!1;let e=this.#b.querySelectorAll(".file"),t=this.#b.querySelectorAll(".rank");e.forEach(e=>e.remove()),t.forEach(e=>e.remove())}#z(a){let r=document.createElement("img");return r.src=`media/chess-pieces/${this.pieceTheme}/${a}.${this.#c}`,r.draggable=!1,r.alt="",r.classList.add(this.#s[a],"chessPiece",a),r}createCircle(e){let t=document.createElement("div");t.className="circle",e&&e.appendChild(t)}createRing(e){let t=document.createElement("div");t.className="ring",e&&e.appendChild(t)}showLegalMoves(e,t){if(!this.#f)return;let s=this.fenToBoard(t).flat();e.map(e=>parseInt(e.match(/\d+/)[0])-1).forEach(e=>{let t=s[e];if(t){let i=this.#b.querySelector(`#sq${e+1}`);this.createRing(i)}else if(!t&&this.enPassantSquare&&e===parseInt(this.enPassantSquare.match(/\d+/)[0])-1){let a=this.#b.querySelector(`#sq${e+1}`);this.createRing(a)}else{let r=this.#b.querySelector(`#sq${e+1}`);this.createCircle(r)}})}hideLegalMoves(){this.#f&&(this.#b.querySelectorAll(".circle").forEach(e=>e.remove()),this.#b.querySelectorAll(".ring").forEach(e=>e.remove()))}changeTurn(){this.turn="w"===this.turn?"b":"w",this.timeFormat&&this.toggleTimer()}nextTurn(){return"w"===this.turn?"b":"w"}#x(o){if(!this.enableSound)return;let h;switch(o){case"start":(h=new Audio("media/audios/game-start.mp3")).play();break;case"move":(h=new Audio("media/audios/move-self.mp3")).play();break;case"capture":(h=new Audio("media/audios/capture.mp3")).play();break;case"castle":(h=new Audio("media/audios/castle.mp3")).play();break;case"promotion":(h=new Audio("media/audios/promote.mp3")).play();break;case"check":(h=new Audio("media/audios/move-check.mp3")).play();break;case"checkmate":(h=new Audio("media/audios/game-end.mp3")).play()}}hideAnalysis(){this.#b.querySelectorAll(".square").forEach(e=>{(e.classList.contains("analysisB")||e.classList.contains("analysisW"))&&(e.classList.remove("analysisB"),e.classList.remove("analysisW"))})}moveCond(e,t){return this.legalMoveOnly?e.classList[2][0]===this.turn&&(this.moves=this.validMoves(t),!0):(this.moves.length=0,this.moves.push(...Array.from({length:64},(e,t)=>"sq"+(t+1))),!0)}#A(n,l){if(this.hidePrompt(),(0===l.button||l.touches)&&this.draggable){this.hideAnalysis();let c=l.clientX||l.touches[0].clientX,d=l.clientY||l.touches[0].clientY,u=window.pageXOffset||document.documentElement.scrollLeft,p=window.pageYOffset||document.documentElement.scrollTop,g=n.querySelector(".chessPiece");if(g&&this.moveCond(g,n.id)){this.#f&&(this.hideLegalMoves(),this.showLegalMoves(this.moves,this.fen())),this.#p===n.id?this.#m=1:this.#m=0,this.#p=n.id,this.#e=!0,this.#n=g,this.#o=this.#n.parentElement,this.#o.classList.add(this.#d);let f=this.#n.getBoundingClientRect();this.#k=c-(f.left+f.width/2)+u,this.#l=d-(f.top+f.height/2)+p,document.body.appendChild(this.#n),this.#n.style.position="absolute",this.#n.style.width=f.width+"px",this.#n.style.height=f.height+"px",this.#n.style.left=c-f.width/2+u+"px",this.#n.style.top=d-f.height/2+p+"px",this.#n.style.cursor="grabbing"}}}#B(m){if(0===m.button||m.touches){let b=m.clientX||m.touches[0].clientX,$=m.clientY||m.touches[0].clientY,v=window.pageXOffset||document.documentElement.scrollLeft,y=window.pageYOffset||document.documentElement.scrollTop,q=this.#b.getBoundingClientRect();if(b>=q.left&&b<=q.right&&$>=q.top&&$<=q.bottom&&m.preventDefault(),this.#e&&this.#n){let _=b-this.#n.offsetWidth/2+v,w=$-this.#n.offsetHeight/2+y;_<q.left+v?_=q.left+v:_+this.#n.offsetWidth>q.right+v&&(_=q.right+v-this.#n.offsetWidth),w<q.top+y?w=q.top+y:w+this.#n.offsetHeight>q.bottom+y&&(w=q.bottom+y-this.#n.offsetHeight),this.#n.style.left=_+"px",this.#n.style.top=w+"px";let k=null;this.#b.querySelectorAll(".square").forEach(e=>{let t=e.getBoundingClientRect();b>=t.left&&b<=t.right&&$>=t.top&&$<=t.bottom&&(k=e),e.classList.remove(this.#d)}),k&&k.classList.add(this.#d)}}}#C(S){if(0===S.button||S.changedTouches&&S.changedTouches[0]){let C=S.clientX||S.changedTouches&&S.changedTouches[0].clientX,D=S.clientY||S.changedTouches&&S.changedTouches[0].clientY;if(window.pageXOffset||document.documentElement.scrollLeft,window.pageYOffset||document.documentElement.scrollTop,this.#e&&this.#n){this.#e=!1,this.#n.style.cursor="grab";let M=null;this.#b.querySelectorAll(".square").forEach(e=>{let t=e.getBoundingClientRect();C>=t.left&&C<=t.right&&D>=t.top&&D<=t.bottom&&(M=e),e.classList.remove(this.#d)}),M&&this.moves.includes(M.id)?(this.#q=M.id,this.makeMove(this.#p,this.#q,"byDrag")):(this.#o.appendChild(this.#n),this.#n.style.position="relative",this.#n.style.left=0,this.#n.style.top=0,this.#o.classList.remove(this.#d),this.#o=null)}}}#D(){this.boundStartDrag=e=>this.#A(e.currentTarget,e),this.boundMoveDrag=this.#B.bind(this),this.boundEndDrag=this.#C.bind(this),this.#b.querySelectorAll(".square").forEach(e=>{e.addEventListener("mousedown",this.boundStartDrag),e.addEventListener("touchstart",this.boundStartDrag)}),document.addEventListener("mousemove",this.boundMoveDrag),document.addEventListener("touchmove",this.boundMoveDrag,{passive:!1}),document.addEventListener("mouseup",this.boundEndDrag),document.addEventListener("touchend",this.boundEndDrag),document.addEventListener("dragstart",e=>{e.target.classList.contains("chessPiece")&&e.preventDefault()})}#E(){this.#b.querySelectorAll(".square").forEach(e=>{e.removeEventListener("mousedown",this.boundStartDrag),e.removeEventListener("touchstart",this.boundStartDrag)}),document.removeEventListener("mousemove",this.boundMoveDrag),document.removeEventListener("touchmove",this.boundMoveDrag),document.removeEventListener("mouseup",this.boundEndDrag),document.removeEventListener("touchend",this.boundEndDrag)}enableDrag(){this.#D()}disableDrag(){this.#E()}sparePieces(e){if(e){let t=document.createElement("div");t.classList.add("sparePieces"),["wp","wb","wn","wr","wq","wk","bp","bb","bn","br","bq","bk",].forEach(e=>{if(e){let s=this.#z(e);t.appendChild(s)}}),this.boundStartDrag=e=>this.#A(e.currentTarget,e),this.boundMoveDrag=this.#B.bind(this),this.boundEndDrag=this.#C.bind(this),t.querySelectorAll("img").forEach(e=>{e.addEventListener("mousedown",this.boundStartDrag),e.addEventListener("touchstart",this.boundStartDrag)}),document.addEventListener("mousemove",this.boundMoveDrag),document.addEventListener("touchmove",this.boundMoveDrag,{passive:!1}),document.addEventListener("mouseup",this.boundEndDrag),document.addEventListener("touchend",this.boundEndDrag),document.addEventListener("dragstart",e=>{e.target.classList.contains("chessPiece")&&e.preventDefault()}),this.#a.appendChild(t)}else{let s=this.#a.querySelector(".sparePieces");s&&s.remove()}}clearBoard(){let e=this.#b.querySelectorAll(".chessPiece");e.forEach(e=>{e.classList.add("fade-out"),e.addEventListener("animationend",()=>{e.remove()},{once:!0})})}setPosition(e){let t=0;"sq1"!=this.#b.children[0].id&&(this.flipBoard(),t=1),this.clearBoard(),this.fenToBoard(e).flat().forEach((e,t)=>{e&&this.#b.children[t].appendChild(this.#z(this.#u[e]))}),t&&this.flipBoard()}start(){this.enPassantSquare="",this.castlingRights={w:["K","Q"],b:["k","q"]},this.turn="w",this.halfMoveCount=0,this.fullMoveCount=1,this.setPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")}flipBoard(){this.showNotation&&(this.disableCoordinates(),this.showNotation=!0);let e=Array.from(this.#b.children);e.reverse(),e.forEach(e=>this.#b.appendChild(e)),this.showNotation&&this.enableCoordinates()}fenToBoard(e){return e.split(" ")[0].split("/").map(e=>Array.from(e,e=>isNaN(e)?e:Array(parseInt(e)).fill("")).flat())}#F={};checkCheck(e,t,s){let i=this.fenToBoard(t).flat(),a="w"===s?"q":"Q",r="w"===s?"b":"B",o="w"===s?"r":"R",h="w"===s?"p":"P",n="w"===s?-1:1,l=e=>e&&e.toUpperCase?e===e.toUpperCase()?"w":"b":null,c=e;for(""===i[e]&&(e=c=i.indexOf("b"===s?"k":"K"));c+8*n>-1&&c+8*n<64&&c>-1&&c<64;){if([o,a].includes(i[c+=8*n]))return!0;if(i[c]&&(["P","N","B"].includes(i[c].toUpperCase())||(i[c]&&l(i[c]))===s))break}for(c=e;c-8*n>-1&&c-8*n<64&&c>-1&&c<64;){if([o,a].includes(i[c-=8*n]))return!0;if(i[c]&&(["P","N","B"].includes(i[c].toUpperCase())||(i[c]&&l(i[c]))===s))break}for(c=e;(c+1)%8!=0&&c+1<64&&c>-1&&c<64;){if([o,a].includes(i[c+=1]))return!0;if(i[c]&&(["P","N","B"].includes(i[c].toUpperCase())||(i[c]&&l(i[c]))===s))break}for(c=e;c%8!=0&&c-1>-1&&c>-1&&c<64;){if([o,a].includes(i[c-=1]))return!0;if(i[c]&&(["P","N","B"].includes(i[c].toUpperCase())||(i[c]&&l(i[c]))===s))break}for(c=e;(c%8!=0&&"w"===s||(c+1)%8!=0&&"b"===s)&&c>-1&&c<64;){if((c+=9*n)>-1&&c<64&&[a,r].includes(i[c])||i[c]===h&&c===e+9*n)return!0;if(i[c]&&(["N","R"].includes(i[c].toUpperCase())||(i[c]&&l(i[c]))===s))break}for(c=e;(c%8!=0&&"b"===s||(c+1)%8!=0&&"w"===s)&&c>-1&&c<64;){if((c+=7*n)>-1&&c<64&&[a,r].includes(i[c])||i[c]===h&&c===e+9*n)return!0;if(i[c]&&(["N","R"].includes(i[c].toUpperCase())||(i[c]&&l(i[c]))===s))break}for(c=e;(c%8!=0&&"b"===s||(c+1)%8!=0&&"w"===s)&&c>-1&&c<64;){if((c-=9*n)>-1&&c<64&&[a,r].includes(i[c]))return!0;if(i[c]&&(["N","R"].includes(i[c].toUpperCase())||(i[c]&&l(i[c]))===s))break}for(c=e;(c%8!=0&&"w"===s||(c+1)%8!=0&&"b"===s)&&c>-1&&c<64;){if((c-=7*n)>-1&&c<64&&[a,r].includes(i[c]))return!0;if(i[c]&&(["N","R"].includes(i[c].toUpperCase())||(i[c]&&l(i[c]))===s))break}if((c=e)+9*n<64&&c+9*n>-1&&c%8!=0&&i[c+9]===("w"===s?"p":"P")||c+7*n<64&&c+7*n>-1&&(c+1)%8!=0&&i[c+7]===("w"===s?"p":"P"))return!0;for(let d of(c=e,[1,-1,7,-7,8,-8,9,-9])){let u=e+d;if([-9,7,-1].includes(d)&&e%8!=0&&i[u]&&i[u]===("w"===s?"k":"K")||[-7,9,1].includes(d)&&(e+1)%8!=0&&i[u]&&i[u]===("w"===s?"k":"K")||u>-1&&u<64&&i[u]&&i[u]===("w"===s?"k":"K"))return!0}let p="sq"+(e+1),g=this.validKnightMoves(p);for(let f of g)if(i[parseInt(f.match(/\d+/)[0])-1]===("w"===s?"n":"N"))return!0;return!1}isCheck(){let e=this.fen(),t=this.fenToBoard(e).flat(),s=this.turn,i=t.indexOf("w"===s?"K":"k");return this.checkCheck(i,e,s)}isCheckMate(){let e=this.fen();this.fenToBoard(e).flat();let t=this.turn,s=this.allMoves(t,e);if(0===s.length&&this.isCheck()){this.#x("checkmate"),this.status="checkmate";let i=this.nextTurn(),a=this.#a.querySelector("#myModal");a.querySelector(".modal-content").querySelector("p").innerText="b"===i?"Black is won by Checkmate!":"White is won by Checkmate!",setTimeout(()=>{this.disableDrag(),a.style.display="block"},250)}}checkThreefoldRepetition(){let e=this.fen().split(" ")[0];if(this.#F[e]?this.#F[e]+=1:this.#F[e]=1,3===this.#F[e]){this.status="draw",this.#x("checkmate"),this.nextTurn();let t=this.#a.querySelector("#myModal");t.querySelector(".modal-content").querySelector("p").innerText="Draw by Threefold Repetition!",setTimeout(()=>{this.disableDrag(),t.style.display="block"},250)}}checkFiftyMoveRule(){if(this.halfMoveCount>=100){this.#x("checkmate"),this.status="DrawByFiftyMoveRule",this.nextTurn();let e=this.#a.querySelector("#myModal");e.querySelector(".modal-content").querySelector("p").innerText="Draw by Fifty Move Rule!",setTimeout(()=>{this.disableDrag(),e.style.display="block"},250)}}checkStaleMate(){let e=this.fen(),t=this.allMoves(this.turn,e);if(0===t.length&&!this.isCheck()){this.#x("checkmate"),this.status="stalemate",this.nextTurn();let s=this.#a.querySelector("#myModal");s.querySelector(".modal-content").querySelector("p").innerText="Draw by Stalemate!",setTimeout(()=>{this.disableDrag(),s.style.display="block"},250)}}checkDraw(){let e=this.fenToBoard(this.fen()).flat(),t=e.filter(e=>e),s="",i=t.includes("q")||t.includes("Q")||t.includes("r")||t.includes("R"),a=t.includes("p")||t.includes("P");if(t.length<=2)s="DrawByInsufficientMaterial";else if(3!==t.length||i||a){if(4===t.length&&!i&&!a){let r=t.filter(e=>"b"===e.toLowerCase()),o=t.filter(e=>"n"===e.toLowerCase());(2===r.length||2===o.length||1===r.length&&1===o.length)&&(s="DrawByInsufficientMaterial")}}else s="DrawByInsufficientMaterial";if(s){this.status=s,this.#x("checkmate"),this.nextTurn();let h=this.#a.querySelector("#myModal");h.querySelector(".modal-content").querySelector("p").innerText="Draw by Insufficient Material!",setTimeout(()=>{this.disableDrag(),h.style.display="block"},250)}}checkStatus(){this.isCheckMate(),this.checkFiftyMoveRule(),this.checkThreefoldRepetition(),this.checkStaleMate(),this.checkDraw()}fen(){let e=this.#b.querySelectorAll(".square"),t="",s=0;for(let i=0;i<64;i++)i%8==0&&0!==i&&(s&&(t+=s,s=0),t+="/"),e[i].querySelector(".chessPiece")?(s&&(t+=s,s=0),t+=this.#v[this.#t[e[i].querySelector(".chessPiece").classList[0]]]):s++;return s&&(t+=s),"sq1"!==this.#b.children[0].id&&(t=t.split("").reverse().join("")),t+=" "+this.turn+" ",t+=(this.castlingRights.w[0]||"")+(this.castlingRights.w[1]||"")+(this.castlingRights.b[0]||"")+(this.castlingRights.b[1]||"")||"-",t+=" "+(this.enPassantSquare?this.convertIdtoCoord(this.enPassantSquare):"-")+" "+this.halfMoveCount+" "+this.fullMoveCount}toggleHighlightSquare(){this.#d="hovered"===this.#d?"unhovered":"hovered"}toggleBlindFold(){Array.from(this.#b.getElementsByClassName("chessPiece")).forEach(e=>{e.style.visibility="hidden"===e.style.visibility?"visible":"hidden"})}convertIdtoCoord(e){let t=parseInt(e.match(/\d+/)[0]);return["h","a","b","c","d","e","f","g"][t%8]+(8-Math.floor((t-1)/8))}convertCoordtoId(e){return"sq"+(8*(8-parseInt(e[1]))+({a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7})[e[0]]+1)}showPrompt(e,t){return new Promise(s=>{let i=document.createElement("div");i.classList.add("prompt"),i.style="display:none;position:absolute;background-color:white;width:100%;aspect-ratio:1/4;box-shadow:0 0 10px rgba(0,0,0,0.5);text-align:center;z-index:200;top:0;",("black"===t&&"w"===this.turn||"white"===t&&"b"===this.turn)&&(i.style.top="",i.style.bottom=0),["q","n","b","r"].forEach(e=>{let t=document.createElement("div");t.classList.add("images"),t.style=`background-image:url(media/chess-pieces/${this.pieceTheme}/${this.turn}${e}.${this.#c});background-size:contain;aspect-ratio:1/1;width:100%;background-color:white;cursor:pointer;`,t.addEventListener("mouseover",()=>{t.style.backgroundColor="#FFDFD6"}),t.addEventListener("mouseout",()=>{t.style.backgroundColor="white"}),t.addEventListener("mousedown",()=>{this.#i=e,s(e)}),i.appendChild(t)}),this.#b.querySelector(`#${e}`).appendChild(i),i.style.display="block"})}hidePrompt(){this.#b.querySelector(".prompt")&&this.#b.querySelector(".prompt").remove()}chessMap={bk:"♚",bq:"♛",br:"♜",bb:"♝",bn:"♞",bp:"",wk:"♔",wq:"♕",wr:"♖",wb:"♗",wn:"♘",wp:""};moveType={check:"+",checkmate:"#",capture:"x",move:""};checkCastle(e,t){this.fenToBoard(this.fen()).flat();let s="w"===this.turn?"K":"k";return"k"===s&&!!this.castlingRights[this.turn][1]&&"sq5"===e&&"sq3"===t||"k"===s&&!!this.castlingRights[this.turn][0]&&"sq5"===e&&"sq7"===t||"K"===s&&!!this.castlingRights[this.turn][1]&&"sq61"===e&&"sq59"===t||"K"===s&&!!this.castlingRights[this.turn][0]&&"sq61"===e&&"sq63"===t}canEnPassant(e,t){let s=this.fenToBoard(this.fen()).flat(),i=this.turn,a=parseInt(e.match(/\d+/)[0])-1,r=parseInt(t.match(/\d+/)[0])-1,o="w"===i?"P":"p";"P"===s[r].toUpperCase()&&16===Math.abs(a-r)&&(s[r+1]===o||s[r-1]===o)?this.enPassantSquare="sq"+(a+("b"===i?-8:8)+1):this.enPassantSquare="",console.log(this.enPassantSquare)}async makeMove(e,t,s){if(!e||!t)return;if(this.checkCastle(e,t)){this.castlingMove(t,s);return}let i=this.#b.querySelector(`#${e}`),a=this.#b.querySelector(`#${t}`),r=this.#n||i.querySelector(".chessPiece"),o=a.querySelector(".chessPiece");if(r&&r.classList[0].includes("Pawn")&&(t.match(/\d+/)[0]<=64&&t.match(/\d+/)[0]>=57||t.match(/\d+/)[0]>=1&&t.match(/\d+/)[0]<=8)){i.appendChild(r),this.fixImage(r);let h=null,n=null;s.includes("engineSays")?(h=s.split("_")[1],n=this.#z(`${this.turn}${h}`)):(h=await this.showPrompt(t,this.orientation),n=this.#z(`${this.turn}${h}`)),this.hideLegalMoves();let l="";o&&(o.remove(),l=this.convertIdtoCoord(e)[0]+"x"),this.fixImage(n),i.removeChild(r),r.remove(),a.appendChild(n),"b"===this.turn&&this.fullMoveCount++,this.halfMoveCount=0,l+=this.convertIdtoCoord(t),l+="="+this.chessMap[`${this.turn}${h}`],this.changeTurn(),this.FEN=this.fen();let c={from:{sqr:e,piece:r.cloneNode(!0)},to:{sqr:t,piece:o?o.cloneNode(!0):null},promotedTo:n.cloneNode(!0),sound:""};this.isCheck()?c.sound="check":o?c.sound="capture":c.sound="promotion","check"===c.sound&&(l+=this.moveType[c.sound]),this.PGN.push(l),this.#x(c.sound),this.moveStack.push(c),this.#n=null,this.#o=null,this.#p="",this.#q="",this.FEN=this.fen(),this.checkStatus(),this.BRIDGE&&this.BRIDGE();return}if("byDrag"===s){this.hideLegalMoves();let d=this.enPassantSquare,u={from:{sqr:e,piece:r.cloneNode(!0)},to:{sqr:t,piece:o?o.cloneNode(!0):null},promotedTo:null,sound:""};if(o?(o.remove(),this.halfMoveCount=0):r.classList[0].includes("Pawn")?this.halfMoveCount=0:this.halfMoveCount++,this.fixImage(r),a.appendChild(r),this.FEN=this.fen(),"b"===this.turn&&this.fullMoveCount++,this.changeTurn(),this.isCheck())u.sound="check";else if(o?1:0)u.sound="capture";else if(d===t){u.sound="capture";let p="sq"+(parseInt(d.match(/\d+/)[0])+("w"===this.turn?-8:8)),g=this.#b.querySelector(`#${p}`).querySelector(".chessPiece"),f={sqr:p,piece:g.cloneNode(!0)};u.enPassant=f,g.remove()}else u.sound="move";this.#x(u.sound),this.canEnPassant(e,t);let m=this.chessMap[r.classList[2]];"capture"===u.sound&&r.classList[0].includes("Pawn")?m+=this.convertIdtoCoord(e)[0]+this.moveType[u.sound]:"capture"===u.sound&&(m+=this.moveType[u.sound]),m+=this.convertIdtoCoord(t),"check"===u.sound&&(m+=this.moveType[u.sound]),this.PGN.push(m),this.moveStack.push(u),this.#n=null,this.#o=null,this.#p="",this.#q="","k"===r.classList[2][1]?(this.castlingRights[r.classList[2][0]][0]="",this.castlingRights[r.classList[2][0]][1]=""):"r"===r.classList[2][1]&&"sq1"===e||"sq57"===e?this.castlingRights[r.classList[2][0]][1]="":("r"===r.classList[2][1]&&"sq8"===e||"sq64"===e)&&(this.castlingRights[r.classList[2][0]][0]=""),this.FEN=this.fen(),this.BRIDGE&&this.BRIDGE(),this.checkStatus();return}if("byClick"===s){let b=i.getBoundingClientRect(),$=a.getBoundingClientRect(),v=$.left-b.left,y=$.top-b.top;r.style.transition="transform 0.2s ease",r.style.transform=`translate(${v}px,${y}px)`,this.hideLegalMoves(),setTimeout(()=>{r.style.transform="";let s=this.enPassantSquare,i={from:{sqr:e,piece:r.cloneNode(!0)},to:{sqr:t,piece:o?o.cloneNode(!0):null},promotedTo:null,sound:""};if(o?(o.remove(),this.halfMoveCount=0):r.classList[0].includes("Pawn")?this.halfMoveCount=0:this.halfMoveCount++,this.fixImage(r),a.appendChild(r),this.FEN=this.fen(),"b"===this.turn&&this.fullMoveCount++,this.changeTurn(),this.isCheck())i.sound="check";else if(o?1:0)i.sound="capture";else if(s===t){i.sound="capture";let h="sq"+(parseInt(s.match(/\d+/)[0])+("w"===this.turn?-8:8)),n=this.#b.querySelector(`#${h}`).querySelector(".chessPiece"),l={sqr:h,piece:n.cloneNode(!0)};i.enPassant=l,n.remove()}else i.sound="move";this.#x(i.sound),this.canEnPassant(e,t);let c=this.chessMap[r.classList[2]];"capture"===i.sound&&r.classList[0].includes("Pawn")?c+=this.convertIdtoCoord(e)[0]+this.moveType[i.sound]:"capture"===i.sound&&(c+=this.moveType[i.sound]),c+=this.convertIdtoCoord(t),"check"===i.sound&&(c+=this.moveType[i.sound]),this.PGN.push(c),this.moveStack.push(i),this.#n=null,this.#o=null,this.#p="",this.#q="","k"===r.classList[2][1]?(this.castlingRights[r.classList[2][0]][0]="",this.castlingRights[r.classList[2][0]][1]=""):"r"===r.classList[2][1]&&"sq1"===e||"sq57"===e?this.castlingRights[r.classList[2][0]][1]="":("r"===r.classList[2][1]&&"sq8"===e||"sq64"===e)&&(this.castlingRights[r.classList[2][0]][0]=""),this.FEN=this.fen(),this.BRIDGE&&this.BRIDGE(),this.checkStatus()},200);return}}castle={sq7:["sq6","sq5","sq8"],sq63:["sq62","sq61","sq64"],sq3:["sq4","sq5","sq1"],sq59:["sq60","sq61","sq57"]};castleSymbol={sq7:"O-O",sq63:"O-O",sq3:"O-O-O",sq59:"O-O-O"};castlingMove(e,t){let s=this.#b.querySelector(`#${this.castle[e][1]}`),i=this.#b.querySelector(`#${e}`),a=this.#n||s.querySelector(".chessPiece"),r=s.getBoundingClientRect(),o=i.getBoundingClientRect(),h=o.left-r.left,n=o.top-r.top;"byDrag"!==t&&(a.style.transition="transform 0.2s ease",a.style.transform=`translate(${h}px,${n}px)`),setTimeout(()=>{this.#x("castle"),a.style.transform="",i.appendChild(a),this.fixImage(a),this.castlingRights[a.classList[2][0]][0]="",this.castlingRights[a.classList[2][0]][1]=""},200);let l=this.#b.querySelector(`#${this.castle[e][2]}`),c=this.#b.querySelector(`#${this.castle[e][0]}`),d=l.querySelector(".chessPiece"),u=l.getBoundingClientRect(),p=c.getBoundingClientRect(),g=p.left-u.left,f=p.top-u.top;d.style.transition="transform 0.2s ease",d.style.transform=`translate(${g}px,${f}px)`,setTimeout(()=>{d.style.transform="",c.appendChild(d),this.fixImage(d)},200);let m={from:{sqr:this.castle[e][2],piece:d.cloneNode(!0)},to:{sqr:this.castle[e][0],piece:null},promotedTo:null,sound:""},b={from:{sqr:this.castle[e][1],piece:a.cloneNode(!0)},to:{sqr:e,piece:null},promotedTo:null,sound:"castle",castle:m};this.moveStack.push(b),this.hideLegalMoves(),this.#n=null,this.#o=null,this.#p="",this.#q="",this.halfMoveCount++,"b"===this.turn&&this.fullMoveCount++,this.FEN=this.fen(),this.changeTurn(),this.PGN.push(this.castleSymbol[e]),this.BRIDGE&&this.BRIDGE()}fixImage(e){e.style.position="relative",e.style.top=0,e.style.left=0}undoMove(){if(!this.undo)return;this.hideLegalMoves();let e=this.moveStack.pop();if(!e)return;let t=e.castle?e.castle:null,s=this.#b.querySelector(`#${e.from.sqr}`),i=this.#b.querySelector(`#${e.to.sqr}`),a=e.from.piece,r=e.to.piece;e.promotedTo&&i.querySelector(".chessPiece").replaceWith(a);let o=s.getBoundingClientRect(),h=i.getBoundingClientRect(),n=-h.left+o.left,l=-h.top+o.top;if((a=i.querySelector(".chessPiece")).style.transition="transform 0.2s ease",a.style.transform=`translate(${n}px,${l}px)`,setTimeout(()=>{s.appendChild(a),this.fixImage(a),a.style.transform="",this.hideLegalMoves(),r&&(i.appendChild(r),this.fixImage(r)),this.changeTurn(),this.#x(e.sound)},200),t){let c=this.#b.querySelector(`#${t.from.sqr}`),d=this.#b.querySelector(`#${t.to.sqr}`),u=t.from.piece;t.to.piece;let p=c.getBoundingClientRect(),g=d.getBoundingClientRect(),f=-g.left+p.left,m=-g.top+p.top;(u=d.querySelector(".chessPiece")).style.transition="transform 0.2s ease",u.style.transform=`translate(${f}px,${m}px)`,setTimeout(()=>{c.appendChild(u),this.fixImage(u),u.style.transform="",this.#x(t.sound)},200)}if(e.enPassant){let b=e.enPassant.sqr,$=e.enPassant.piece;this.#b.querySelector(`#${b}`).appendChild($)}}validPawnMoves(e){let t=this.fen(),s=this.fenToBoard(t).flat(),i=parseInt(e.match(/\d+/)[0])-1,a=s[i],r=[],o=Math.floor(i/8),h=a===a.toUpperCase()?-1:1,n=i+8*h,l=s[n];if(n>=0&&n<64&&!l&&(r.push("sq"+(n+1)),-1===h&&6===o||1===h&&1===o)){let c=i+16*h,d=s[c];c>=0&&c<64&&!d&&r.push("sq"+(c+1))}let u=i+7*h,p=i+9*h;return -1===h?(i%8!=0&&s[p]&&s[p].toLowerCase()===s[p]&&r.push("sq"+(p+1)),i%8!=0&&this.enPassantSquare==="sq"+(p+1)&&r.push("sq"+(p+1)),(i+1)%8!=0&&s[u]&&s[u].toLowerCase()===s[u]&&r.push("sq"+(u+1)),i%8!=0&&this.enPassantSquare==="sq"+(u+1)&&r.push("sq"+(u+1))):(i%8!=0&&s[p]&&s[p].toUpperCase()===s[p]&&r.push("sq"+(p+1)),i%8!=0&&this.enPassantSquare==="sq"+(p+1)&&r.push("sq"+(p+1)),(i+1)%8!=0&&s[u]&&s[u].toUpperCase()===s[u]&&r.push("sq"+(u+1)),(i+1)%8!=0&&this.enPassantSquare==="sq"+(u+1)&&r.push("sq"+(u+1))),r}validBishopMoves(e){let t=this.fen(),s=this.fenToBoard(t).flat(),i=parseInt(e.match(/\d+/)[0])-1,a=s[i],r=[],o=e=>a===a.toUpperCase()!=(e===e.toUpperCase()),h=i;for(;(h+1)%8!=0&&h<64;){h+=9;let n=s[h];if(!n&&h<64&&h>=0)r.push("sq"+(h+1));else if(n&&o(n)&&h<64&&h>=0){r.push("sq"+(h+1));break}else break}for(h=i;h%8!=0&&h>=0;){h-=9;let l=s[h];if(!l&&h<64&&h>=0)r.push("sq"+(h+1));else if(l&&o(l)&&h<64&&h>=0){r.push("sq"+(h+1));break}else break}for(h=i;h%8!=0&&h<64&&h>=0&&!((h+=7)<0);){let c=s[h];if(!c&&h<64&&h>=0)r.push("sq"+(h+1));else if(c&&o(c)&&h<64&&h>=0){r.push("sq"+(h+1));break}else break}for(h=i;(h+1)%8!=0&&h<64&&!((h-=7)>=64);){let d=s[h];if(!d&&h<64&&h>=0)r.push("sq"+(h+1));else if(d&&o(d)&&h<64&&h>=0){r.push("sq"+(h+1));break}else break}return r}validRookMoves(e){let t=this.fen(),s=this.fenToBoard(t).flat(),i=parseInt(e.match(/\d+/)[0])-1,a=s[i],r=[],o=e=>e&&a===a.toUpperCase()!=(e===e.toUpperCase()),h=i;for(;h<64;){h+=8;let n=s[h];if(!n&&h<64&&h>=0)r.push("sq"+(h+1));else if(o(n)&&h<64&&h>=0){r.push("sq"+(h+1));break}else break}for(h=i;h>=8;){h-=8;let l=s[h];if(!l&&h<64&&h>=0)r.push("sq"+(h+1));else if(o(l)&&h<64&&h>=0){r.push("sq"+(h+1));break}else break}for(h=i;(h+1)%8!=0;){h+=1;let c=s[h];if(!c&&h<64&&h>=0)r.push("sq"+(h+1));else if(o(c)&&h<64&&h>=0){r.push("sq"+(h+1));break}else break}for(h=i;h%8!=0;){h-=1;let d=s[h];if(!d&&h<64&&h>=0)r.push("sq"+(h+1));else if(o(d)&&h<64&&h>=0){r.push("sq"+(h+1));break}else break}return r}validQueenMoves(e){let t=this.validRookMoves(e);return t.concat(this.validBishopMoves(e))}validKnightMoves(e){let t=this.fen(),s=this.fenToBoard(t).flat(),i=parseInt(e.match(/\d+/)[0])-1,a=s[i],r=[],o=e=>e&&a===a.toUpperCase()!=(e===e.toUpperCase()),h=[-17,-15,-10,-6,6,10,15,17].map(e=>i+e).filter(e=>!(e<0)&&!(e>=64)&&!(Math.abs(Math.floor(e/8)-Math.floor(i/8))>2||Math.abs(e%8-i%8)>2)&&(!s[e]||o(s[e])));return h.forEach(e=>r.push("sq"+(e+1))),r}validKingMoves(e){let t=this.fen(),s=this.fenToBoard(t).flat(),i=parseInt(e.match(/\d+/)[0])-1,a=s[i],r=[],o=e=>e&&a===a.toUpperCase()!=(e===e.toUpperCase());[i+1,i-1,i+8,i-8,i+9,i-9,i+7,i-7,].forEach(e=>{if(e<64&&e>=0){let t=s[e];[9,-7,1].includes(e-i)&&(i+1)%8!=0?(!t||o(t))&&r.push(`sq${e+1}`):[7,-9,-1].includes(e-i)&&i%8!=0?(!t||o(t))&&r.push(`sq${e+1}`):8===Math.abs(e-i)&&(!t||o(t))&&r.push(`sq${e+1}`)}});let h=i,n=this.turn,l=i+1,c=i+2,d=i-1,u=i-2,p=i-3;return this.checkCheck(h,t,n)||!this.castlingRights[this.turn][0]||s[l]||s[c]||this.checkCheck(l,t,n)||this.checkCheck(c,t,n)||r.push(`sq${c+1}`),this.checkCheck(h,t,n)||!this.castlingRights[this.turn][1]||s[d]||s[u]||s[p]||this.checkCheck(d,t,n)||this.checkCheck(u,t,n)||this.checkCheck(p,t,n)||r.push(`sq${u+1}`),r}validMoves(e){let t=this.#b.querySelector(`#${e}`),s=t.querySelector(".chessPiece");if(!s)return[];if(s.classList[0].includes("Pawn")){let i=this.validPawnMoves(e);return this.filterMoves(i,this.fen(),this.turn,e)}if(s.classList[0].includes("Rook")){let a=this.validRookMoves(e);return this.filterMoves(a,this.fen(),this.turn,e)}if(s.classList[0].includes("Bishop")){let r=this.validBishopMoves(e);return this.filterMoves(r,this.fen(),this.turn,e)}if(s.classList[0].includes("Queen")){let o=this.validQueenMoves(e);return this.filterMoves(o,this.fen(),this.turn,e)}else if(s.classList[0].includes("Knight")){let h=this.validKnightMoves(e);return this.filterMoves(h,this.fen(),this.turn,e)}else if(s.classList[0].includes("King")){let n=this.validKingMoves(e);return this.filterMoves(n,this.fen(),this.turn,e)}}allMoves(e,t){let s=this.fenToBoard(t).flat(),i=s.filter(e=>e),a=[];for(let r=0;r<64;r++){let o=i[r],h=s.indexOf(o);if(o&&o===o.toUpperCase()==("w"===e)){let n="sq"+(1+h),l=this.validMoves(n);l.forEach(e=>a.push(e))}}return a}boardToFen(e){let t="",s=0;for(let i=0;i<e.length;i++){let a=e[i];""===a?s++:(s>0&&(t+=s,s=0),t+=a),(i+1)%8==0&&(s>0&&(t+=s,s=0),i!==e.length-1&&(t+="/"))}return t}filterMoves(e,t,s,i){let a=this.fenToBoard(t).flat(),r=parseInt(i.match(/\d+/)[0])-1,o=a.indexOf("w"===s?"K":"k"),h=a[r];a[r]="";let n=[];for(let l=0;l<e.length;l++){let c=[...a],d=e[l],u=parseInt(d.match(/\d+/)[0])-1;c[u]=h,this.checkCheck(o,this.boardToFen(c),s)||n.push(d)}return n}allLegalMoves(){return this.allMoves(this.turn,this.fen())}}
