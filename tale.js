/* Originals by Lignio — animated storybook: "The Tale of Two Gardens" */
(function(){
const root=document.getElementById("tale");if(!root)return;
const W=1600,H=900,GROUND=800;
const R=(a,b)=>a+Math.random()*(b-a);
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const seg=(t,a,b)=>clamp((t-a)/(b-a));
const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
const lerp=(a,b,k)=>a+(b-a)*k;

/* ---------- scenery ---------- */
function palm(x,y,s,c1="#2f6b3b",c2="#6b4a2c"){let f="";[-160,-125,-90,-55,-20,15,40].forEach(a=>{const r=a*Math.PI/180;f+=`<path d="M0 -150 q${Math.cos(r)*55} ${Math.sin(r)*55-18} ${Math.cos(r)*105} ${Math.sin(r)*105+22}" stroke="${c1}" stroke-width="11" fill="none" stroke-linecap="round"/>`});
 return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q-14 -80 0 -150" stroke="${c2}" stroke-width="13" fill="none" stroke-linecap="round"/>${f}<circle cx="-4" cy="-146" r="8" fill="#8a6a2a"/><circle cx="8" cy="-142" r="8" fill="#8a6a2a"/></g>`}
function cardamomBush(x,y,s){let g="";for(let i=0;i<9;i++){const a=-150+i*15;g+=`<ellipse cx="0" cy="-70" rx="12" ry="72" fill="${i%2?"#3f7d43":"#2f6a38"}" transform="rotate(${a+90} 0 0)"/>`}
 let pods="";for(let i=0;i<6;i++)pods+=`<ellipse cx="${-30+i*12}" cy="${-6-(i%2)*6}" rx="7" ry="4.5" fill="#a9c46a" stroke="#6f8536" stroke-width="1.5"/>`;
 return `<g transform="translate(${x} ${y}) scale(${s})">${g}${pods}</g>`}
function pepperTree(x,y,s){let b="";for(let i=0;i<7;i++){b+=`<g transform="translate(${(i%2?14:-14)} ${-40-i*34})"><ellipse rx="16" ry="9" fill="#3c7a3f" transform="rotate(${i%2?-30:30})"/><circle cx="${i%2?10:-10}" cy="10" r="4" fill="#c0392b"/><circle cx="${i%2?14:-14}" cy="16" r="4" fill="#a93226"/><circle cx="${i%2?7:-7}" cy="17" r="4" fill="#c0392b"/></g>`}
 return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-9" y="-300" width="18" height="300" rx="8" fill="#6b4a2c"/><path d="M0 -10 C30 -60 -30 -110 0 -160 S 30 -250 0 -290" stroke="#2f6b3b" stroke-width="5" fill="none"/>${b}<ellipse cx="0" cy="-320" rx="90" ry="55" fill="#356f3c"/><ellipse cx="-40" cy="-300" rx="55" ry="38" fill="#2c5f33"/></g>`}
function shadeTree(x,y,s){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 0 L-3 -260 L3 -260 L6 0Z" fill="#7a6a58"/><path d="M0 -200 L-40 -250 M0 -220 L38 -262" stroke="#7a6a58" stroke-width="5"/><ellipse cx="0" cy="-275" rx="120" ry="34" fill="#4f8a4b"/><ellipse cx="-30" cy="-290" rx="70" ry="22" fill="#5f9a56"/></g>`}
function teaRows(y0,rows,colA,colB){let s="";for(let r=0;r<rows;r++){const y=y0+r*r*7+r*38,h=26+r*9,w=70+r*16;let d=`M-40 ${y+h}`;for(let x=-40;x<W+80;x+=w)d+=` q${w/2} ${-h} ${w} 0`;d+=` L${W+80} ${H} L-40 ${H}Z`;s+=`<path d="${d}" fill="${r%2?colA:colB}"/>`;
  for(let x=-10;x<W;x+=w)s+=`<path d="M${x+w*.3} ${y+h*.55} q${w*.2} -6 ${w*.4} 0" stroke="#7fbf6a" stroke-width="2" fill="none" opacity=".55"/>`}return s}
function rhino(x,y,s){return `<g transform="translate(${x} ${y}) scale(${s})" fill="#6d6a66"><ellipse cx="0" cy="0" rx="58" ry="30"/><path d="M50 -10 q34 0 44 22 q-10 14 -40 8z"/><path d="M86 -2 l10 -22 l4 22z" fill="#55524f"/><rect x="-44" y="16" width="14" height="26" rx="5"/><rect x="-18" y="18" width="14" height="24" rx="5"/><rect x="18" y="18" width="14" height="24" rx="5"/><rect x="38" y="14" width="14" height="28" rx="5"/><ellipse cx="56" cy="-16" rx="6" ry="10" fill="#5c5955"/></g>`}
function sparkles(n,y1,y2,col){let s="";for(let i=0;i<n;i++)s+=`<circle class="tw" cx="${R(20,W-20)}" cy="${R(y1,y2)}" r="${R(2,4.5)}" fill="${col}" style="animation-delay:${R(0,3).toFixed(2)}s;animation-duration:${R(1.6,3.2).toFixed(2)}s"/>`;return s}

const keralaBG=`<g id="tKerala">
<defs><linearGradient id="tkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7c9a6"/><stop offset=".55" stop-color="#fbe3c0"/><stop offset="1" stop-color="#d9ead2"/></linearGradient>
<radialGradient id="tkSun"><stop offset="0" stop-color="#fff4cf"/><stop offset="1" stop-color="#fff4cf" stop-opacity="0"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="url(#tkSky)"/><circle cx="1180" cy="250" r="230" fill="url(#tkSun)"/><circle cx="1180" cy="250" r="70" fill="#ffe7a8"/>
<path d="M0 470 Q160 300 360 420 Q520 280 720 400 Q900 260 1100 390 Q1300 290 1600 380 L1600 640 L0 640Z" fill="#a8c7ae" opacity=".8"/>
<rect y="430" width="${W}" height="70" fill="#fff" opacity=".35"/>
<path d="M0 600 Q220 470 460 570 Q700 470 960 560 Q1220 470 1600 540 L1600 900 L0 900Z" fill="#6aa275"/>
<g stroke="#5a9366" stroke-width="5" fill="none" opacity=".8">${[0,1,2,3,4].map(i=>`<path d="M-20 ${630+i*26} Q400 ${560+i*26} 800 ${615+i*26} T1620 ${600+i*26}"/>`).join("")}</g>
<rect y="${GROUND-40}" width="${W}" height="${H-GROUND+40}" fill="#4c7f45"/>
${palm(110,700,1.3)}${palm(1480,690,1.45)}${palm(1330,640,.9,"#3d7a48")}
${pepperTree(1180,770,1)}${pepperTree(300,770,.85)}
${cardamomBush(520,780,1.05)}${cardamomBush(760,800,.9)}${cardamomBush(1000,790,1.1)}${cardamomBush(1420,810,.95)}${cardamomBush(60,810,.9)}
<g>${Array.from({length:22},()=>`<circle cx="${R(0,W)}" cy="${R(812,890)}" r="${R(3,6)}" fill="${["#fff","#f6c445","#e27d99"][Math.floor(R(0,3))]}"/>`).join("")}</g>
<g>${sparkles(28,150,760,"#fff6c9")}</g></g>`;

const assamBG=`<g id="tAssam">
<defs><linearGradient id="taSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe8e4"/><stop offset=".6" stop-color="#f4f0d2"/><stop offset="1" stop-color="#e3efcf"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#taSky)"/><circle cx="380" cy="210" r="64" fill="#fff1bf"/>
<path d="M0 420 Q240 330 500 400 Q800 320 1100 390 Q1350 330 1600 380 L1600 520 L0 520Z" fill="#9fb9c4" opacity=".8"/>
<rect y="455" width="${W}" height="38" fill="#cfe3ea"/><path d="M0 470 h1600" stroke="#eef7f8" stroke-width="3" opacity=".8"/>
<rect y="490" width="${W}" height="40" fill="#b9b25a"/>${rhino(230,505,.7)}
${teaRows(520,7,"#3f8a45","#2f7a3b")}
${shadeTree(640,640,1)}${shadeTree(1250,600,.8)}${shadeTree(150,700,1.1)}
<rect y="${GROUND+20}" width="${W}" height="${H-GROUND}" fill="#2a6a35"/>
<g>${sparkles(22,140,700,"#ffffff")}</g></g>`;

const meetBG=`<g id="tMeet">
<defs><linearGradient id="tmSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d2457"/><stop offset=".55" stop-color="#9a4f73"/><stop offset=".85" stop-color="#f0a86a"/><stop offset="1" stop-color="#f6c98a"/></linearGradient>
<radialGradient id="tmGlow"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="url(#tmSky)"/>
<g>${sparkles(60,20,380,"#fff")}</g><circle cx="1330" cy="140" r="44" fill="#fff4d6"/><circle cx="1348" cy="130" r="40" fill="#4a3368" opacity=".35"/>
<path d="M0 560 Q200 430 420 520 Q560 450 760 560 L760 900 L0 900Z" fill="#3d5f4a"/>
${palm(140,640,1.1,"#24452f","#3b2c22")}${palm(420,600,.85,"#24452f","#3b2c22")}${cardamomBush(300,700,.9)}
<path d="M700 600 Q840 520 900 540 Q1040 470 1240 540 Q1420 470 1600 520 L1600 900 L840 900Z" fill="#355d3a"/>
<g transform="translate(0 40)" opacity=".95">${teaRows(600,4,"#2e6436","#27592f").replace(/M-40/g,"M820")}</g>
${shadeTree(1380,640,.9).replace(/#4f8a4b/g,"#2f5a37").replace(/#5f9a56/g,"#3a6a40")}
<path d="M560 900 Q720 760 800 700 Q880 760 1040 900Z" fill="#c9a77a" opacity=".85"/>
<circle id="tGlow" cx="800" cy="560" r="330" fill="url(#tmGlow)" opacity="0"/>
<rect y="${GROUND+10}" width="${W}" height="${H-GROUND}" fill="#2a3f30" opacity=".6"/></g>`;

/* ---------- characters ---------- */
function girl(id,o){
 const hairBack=o.curly
  ?`<g fill="${o.hair}">${[[-30,-250,24],[-36,-225,22],[-30,-200,20],[-18,-186,18],[-40,-180,16],[-24,-168,15],[-6,-268,24],[16,-266,20],[30,-252,16],[-20,-272,20]].map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}"/>`).join("")}</g>`
  :`<path d="M-30 -262 Q-46 -200 -40 -128 Q-20 -118 -6 -126 Q-10 -190 6 -262Z" fill="${o.hair}"/>`;
 const hairFront=o.curly
  ?`<g fill="${o.hair}"><circle cx="-12" cy="-262" r="16"/><circle cx="6" cy="-266" r="15"/><circle cx="22" cy="-258" r="11"/><circle cx="-24" cy="-246" r="12"/></g><g fill="#fffdf4"><circle cx="-34" cy="-236" r="4"/><circle cx="-38" cy="-226" r="4"/><circle cx="-36" cy="-215" r="4"/><circle cx="-33" cy="-205" r="4"/></g>`
  :`<path d="M-30 -246 Q-28 -276 2 -272 Q30 -270 30 -246 Q14 -262 -6 -256 Q-20 -252 -30 -246Z" fill="${o.hair}"/>`;
 return `<g id="${id}"><ellipse cx="0" cy="2" rx="62" ry="11" fill="#000" opacity=".18"/>
 <g class="b">${hairBack}
  <g class="fL"><ellipse cx="-14" cy="-6" rx="17" ry="8" fill="${o.shoe}"/></g><g class="fR"><ellipse cx="16" cy="-6" rx="17" ry="8" fill="${o.shoe}"/></g>
  <g class="sk"><path d="M-30 -140 C-38 -92 -60 -42 -66 -10 L66 -10 C60 -42 38 -92 30 -140Z" fill="${o.dress}"/>
   <path d="M-64 -26 L64 -26 L66 -10 L-66 -10Z" fill="${o.border}"/><path d="M-61 -34 L61 -34" stroke="${o.border}" stroke-width="3"/>
   ${o.motif?`<g fill="${o.border}">${[-44,-22,0,22,44].map(x=>`<path d="M${x} -48 l6 7 l-6 7 l-6 -7z"/>`).join("")}</g>`:""}</g>
  <g class="aL"><path d="M-24 -196 L-32 -128" stroke="${o.skin}" stroke-width="13" stroke-linecap="round"/></g>
  <path d="M-28 -202 Q0 -212 28 -202 L32 -138 L-32 -138Z" fill="${o.blouse}"/>
  <path d="M-26 -204 L34 -150 L34 -134 L-32 -192Z" fill="${o.drape}"/><path d="M-24 -206 L36 -152" stroke="${o.border}" stroke-width="5"/>
  <rect x="-8" y="-214" width="16" height="16" rx="5" fill="${o.skin}"/>
  <circle cx="0" cy="-240" r="30" fill="${o.skin}"/>${hairFront}
  <ellipse cx="2" cy="-242" rx="3.2" ry="4.6" fill="#2a1a12"/><ellipse cx="17" cy="-242" rx="3.2" ry="4.6" fill="#2a1a12"/>
  <circle cx="3" cy="-243.5" r="1.1" fill="#fff"/><circle cx="18" cy="-243.5" r="1.1" fill="#fff"/>
  <path d="M-1 -250 q4 -3 7 0 M13 -250 q4 -3 7 0" stroke="#2a1a12" stroke-width="1.6" fill="none"/>
  <circle cx="-5" cy="-230" r="5" fill="#e88a8a" opacity=".45"/><circle cx="24" cy="-230" r="4" fill="#e88a8a" opacity=".45"/>
  <path d="M5 -226 Q11 -221 17 -226" stroke="#7a2a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  ${o.bindi?`<circle cx="10" cy="-256" r="2.2" fill="#b3263a"/>`:""}
  <g class="aR"><path d="M24 -196 L32 -128" stroke="${o.skin}" stroke-width="13" stroke-linecap="round"/>
   <g class="cup" opacity="0" transform="translate(32 -124)"><path d="M-12 -14 L12 -14 L9 6 L-9 6Z" fill="#f6ecdc" stroke="#c9a36a" stroke-width="2"/><path d="M12 -10 q9 1 7 8 q-2 5 -9 4" stroke="#f6ecdc" stroke-width="3" fill="none"/><ellipse cx="0" cy="-14" rx="12" ry="3" fill="#8a4a24"/>
    <path class="st" d="M-4 -22 q-5 -8 0 -16 q5 -8 0 -16 M5 -22 q-5 -8 0 -16 q5 -8 0 -16" stroke="#fff" stroke-width="2.4" fill="none" opacity=".75" stroke-linecap="round"/></g></g>
 </g></g>`}
const KERALA={skin:"#b9825c",hair:"#25160f",curly:true,dress:"#fbf3df",blouse:"#c9973f",drape:"#fbf3df",border:"#c9973f",shoe:"#7a4a2a"};
const ASSAM={skin:"#e3b48f",hair:"#5a3220",curly:false,dress:"#fbf1e3",blouse:"#9c1f33",drape:"#b3263a",border:"#b3263a",motif:true,bindi:true,shoe:"#5a2a1a"};

/* ---------- magic pieces ---------- */
const parts=[];let partSVG="";
for(let i=0;i<34;i++){const fromLeft=i%2===0;parts.push({sx:fromLeft?R(320,620):R(980,1280),sy:R(420,700),a:R(0,6.28),d:R(0,.9),k:fromLeft?["#9a5530","#a9c46a","#4a2818","#c0392b"][i%4]:["#4f8f4c","#6aa06a","#2f6b3b"][i%3],leaf:!fromLeft});
 const p=parts[i];partSVG+=p.leaf?`<ellipse id="tp${i}" rx="11" ry="5" fill="${p.k}" opacity="0"/>`:`<circle id="tp${i}" r="${R(4,7)}" fill="${p.k}" opacity="0"/>`}
const bigCup=`<g id="tBigCup" opacity="0"><ellipse cx="0" cy="58" rx="120" ry="18" fill="#000" opacity=".25"/><ellipse cx="0" cy="48" rx="110" ry="16" fill="#e9dcc4"/>
<path d="M-82 -40 L82 -40 Q78 30 50 46 L-50 46 Q-78 30 -82 -40Z" fill="#f6ecdc"/><path d="M82 -26 q46 4 40 40 q-6 26 -48 22" stroke="#f6ecdc" stroke-width="13" fill="none"/>
<ellipse cx="0" cy="-40" rx="82" ry="15" fill="#8a4a24"/><ellipse cx="-14" cy="-43" rx="30" ry="5" fill="#b0703a" opacity=".7"/>
<g transform="translate(-6 6) rotate(-30)"><ellipse rx="16" ry="7" fill="#6aa06a"/></g><g transform="translate(14 8) rotate(30)"><ellipse rx="16" ry="7" fill="#4f8f4c"/></g>
<path id="tBigSteam" d="M-30 -70 q-14 -26 0 -52 q14 -26 0 -52 M0 -70 q-14 -26 0 -52 q14 -26 0 -52 M30 -70 q-14 -26 0 -52 q14 -26 0 -52" stroke="#fff" stroke-width="5" fill="none" opacity=".8" stroke-linecap="round"/></g>`;
const logo=`<g id="tLogo" opacity="0" text-anchor="middle"><text x="800" y="170" font-family="Playfair Display, Georgia, serif" font-weight="800" font-size="120" fill="#ffe2a0" stroke="#5a3a1c" stroke-width="2" paint-order="stroke">Originals</text>
<text x="800" y="236" font-family="Parisienne, cursive" font-size="64" fill="#fff4d6">by Lignio</text></g>`;
let hearts="";for(let i=0;i<8;i++)hearts+=`<path id="th${i}" d="M0 6 C-12 -6 -6 -18 0 -10 C6 -18 12 -6 0 6Z" fill="${i%2?"#f08aa2":"#ffd36b"}" opacity="0"/>`;

root.querySelector(".tale-stage").insertAdjacentHTML("afterbegin",`<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="taleTitle" preserveAspectRatio="xMidYMid slice">
<title id="taleTitle">An animated story: a girl from the spice hills of Kerala and a girl from the tea gardens of Assam meet and create Originals by Lignio</title>
${keralaBG}${assamBG}${meetBG}<g id="tParts">${partSVG}</g>${bigCup}${logo}${girl("gK",KERALA)}${girl("gA",ASSAM)}<g>${hearts}</g></svg>`);

const $=id=>document.getElementById(id);
const sc={k:$("tKerala"),a:$("tAssam"),m:$("tMeet")};
const gK=$("gK"),gA=$("gA");
const capEl=root.querySelector(".tale-cap"),endEl=root.querySelector(".tale-end"),playBtn=root.querySelector(".tale-play"),bar=root.querySelector(".tale-bar i");
const CAPS=[[0,7,"Once upon a time, in the misty spice hills of Kerala, lived a girl who knew every cardamom pod and cinnamon stick by its scent."],
 [7.3,14,"Far away, in the green tea gardens of Assam, lived a girl who grew up on the strongest chai in the land."],
 [14.3,21,"One day, far from home, their paths crossed. Books turned into laughter, and laughter into long evenings of tea."],
 [21.3,27.5,"The tea of Assam met the spices of Kerala, and something magical began to brew…"],
 [27.8,99,"Originals by Lignio. Good tea brings good people together."]];
const END=35;

function pose(g,x,face,walkPh,walking,opts={}){
 const bob=walking?Math.abs(Math.sin(walkPh))*7:0,sw=walking?Math.sin(walkPh):0;
 g.setAttribute("transform",`translate(${x} ${GROUND}) scale(${face*1.35} 1.35)`);
 g.querySelector(".b").setAttribute("transform",`translate(0 ${-bob})`);
 g.querySelector(".fL").setAttribute("transform",`translate(${sw*12} 0)`);
 g.querySelector(".fR").setAttribute("transform",`translate(${-sw*12} 0)`);
 g.querySelector(".sk").setAttribute("transform",`skewX(${sw*3})`);
 g.querySelector(".aL").setAttribute("transform",`rotate(${-sw*18} -24 -196)`);
 const raise=opts.raise||0;
 g.querySelector(".aR").setAttribute("transform",`rotate(${sw*18-raise*62} 24 -196)`);
 const c=g.querySelector(".cup");c.setAttribute("opacity",raise);c.setAttribute("transform",`translate(32 -124) rotate(${raise*62})`);
 g.style.opacity=opts.op??1}

function frame(t){
 const op={k:1-seg(t,6.4,7.4),a:Math.min(seg(t,6.6,7.6),1-seg(t,13.6,14.6)),m:seg(t,13.8,14.8)};
 sc.k.style.opacity=op.k;sc.a.style.opacity=op.a;sc.m.style.opacity=op.m;
 sc.k.style.display=op.k>0?"":"none";sc.a.style.display=op.a>0?"":"none";sc.m.style.display=op.m>0?"":"none";
 /* Kerala girl */
 if(t<7.4){const k=ease(seg(t,.3,6.6));pose(gK,lerp(220,980,k),1,t*5.2,k<1&&k>0,{op:op.k})}
 else{const k=ease(seg(t,14.6,20.4));const walking=k>0&&k<1;const r=seg(t,27.6,29);pose(gK,lerp(240,650,k),1,t*5.2,walking,{op:op.m,raise:r})}
 /* Assam girl */
 if(t<14.6){const k=ease(seg(t,7.4,13.4));pose(gA,lerp(1380,620,k),-1,t*5.2,k<1&&k>0,{op:t<7.4?op.a:Math.min(op.a,1)})}
 else{const k=ease(seg(t,14.6,20.4));const walking=k>0&&k<1;const r=seg(t,27.6,29);pose(gA,lerp(1360,950,k),-1,t*5.2+1.6,walking,{op:op.m,raise:r})}
 if(t>=7.4&&t<14.6){gK.style.opacity=0}
 if(t<6.6){gA.style.opacity=0}
 /* glow + magic */
 $("tGlow").setAttribute("opacity",seg(t,20,22)*.9);
 const cx=800,cy=560;
 parts.forEach((p,i)=>{const e=$("tp"+i);const k=seg(t,21.4+p.d,25.2+p.d);
  if(k<=0||k>=1){e.setAttribute("opacity",0);return}
  const kk=ease(k),ang=p.a+kk*7,rad=(1-kk)*Math.hypot(p.sx-cx,p.sy-cy);
  const x=cx+Math.cos(ang)*rad,y=cy+Math.sin(ang)*rad*.55-Math.sin(kk*Math.PI)*80;
  e.setAttribute("opacity",Math.sin(k*Math.PI));e.setAttribute(p.leaf?"transform":"transform",`translate(${x} ${y}) rotate(${kk*540})`)});
 const cupK=ease(seg(t,24.6,26.6));
 $("tBigCup").setAttribute("opacity",cupK);$("tBigCup").setAttribute("transform",`translate(${cx} ${lerp(cy-40,400,cupK)}) scale(${.3+cupK*.5})`);
 $("tBigSteam").setAttribute("transform",`translate(0 ${Math.sin(t*3)*4})`);
 const lk=ease(seg(t,25.6,27.6));$("tLogo").setAttribute("opacity",lk);$("tLogo").setAttribute("transform",`translate(0 ${(1-lk)*20})`);
 for(let i=0;i<8;i++){const h=$("th"+i),k=((t-29+i*.55)%3.2)/3.2;if(t<29){h.setAttribute("opacity",0);continue}
  const x=800+Math.sin(i*2.1+k*6)*60+(i%2?-60:60),y=640-k*260;h.setAttribute("opacity",Math.sin(k*Math.PI)*.95);h.setAttribute("transform",`translate(${x} ${y}) scale(${1.4+i%3*.4})`)}
 const c=CAPS.find(c=>t>=c[0]&&t<c[1]);const txt=c?c[2]:"";if(capEl.dataset.t!==txt){capEl.dataset.t=txt;capEl.classList.remove("on");void capEl.offsetWidth;capEl.textContent=txt;if(txt)capEl.classList.add("on")}
 bar.style.width=(clamp(t/END)*100)+"%";
}

let t0=null,raf=0,playing=false,tNow=0;
function loop(ts){if(t0===null)t0=ts-tNow*1000;tNow=(ts-t0)/1000;frame(tNow);
 if(tNow>=END){playing=false;root.classList.remove("playing");endEl.hidden=false;return}
 raf=requestAnimationFrame(loop)}
function play(){if(tNow>=END)tNow=0;endEl.hidden=true;playBtn.hidden=true;playing=true;root.classList.add("playing");t0=null;cancelAnimationFrame(raf);raf=requestAnimationFrame(loop)}
function pause(){playing=false;cancelAnimationFrame(raf);root.classList.remove("playing");playBtn.hidden=false;playBtn.querySelector("span").textContent="Resume the story"}
playBtn.addEventListener("click",play);
root.querySelector(".tale-again").addEventListener("click",()=>{tNow=0;play()});
root.querySelector(".tale-stage").addEventListener("click",e=>{if(e.target.closest("button"))return;if(playing)pause()});
document.addEventListener("visibilitychange",()=>{if(document.hidden&&playing)pause()});
addEventListener("hashchange",()=>{if(playing)pause()});
frame(3.2); /* poster frame: Kerala girl in the spice garden */
window.originalsTale={play,pause,seek:t=>{tNow=t;frame(t)}};
})();
