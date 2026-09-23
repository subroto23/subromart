/* Runs before paint. Storage is optional; blocked storage never breaks the page. */
(()=>{
  const root=document.documentElement;
  const key='subromart.preferences.v1';
  let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{}
  const media=matchMedia('(prefers-color-scheme: dark)');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const hex=v=>/^#[0-9a-f]{6}$/i.test(v);
  const state={mode:['auto','light','dark'].includes(saved.mode)?saved.mode:'auto',color:hex(saved.color)?saved.color:'#d1f36b',reduceMotion:typeof saved.reduceMotion==='boolean'?saved.reduceMotion:motion.matches};
  const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  const lum=c=>c.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
  const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
  const css=c=>'rgb('+c.map(Math.round).join(',')+')';
  const mix=(a,b,r)=>a.map((v,i)=>v*(1-r)+b[i]*r);
  function apply(patch={},persist=false){
    if(['auto','light','dark'].includes(patch.mode))state.mode=patch.mode;
    if(hex(patch.color))state.color=patch.color;
    if(typeof patch.reduceMotion==='boolean')state.reduceMotion=patch.reduceMotion;
    const dark=state.mode==='auto'?media.matches:state.mode==='dark';
    const bg=rgb(dark?'#141414':'#ffffff'), accent=rgb(state.color), white=[255,255,255], black=[20,20,20];
    let text=accent.slice(),target=dark?white:black;
    for(let i=0;i<30&&contrast(text,bg)<5;i++)text=mix(text,target,.12);
    let previewAccent=accent.slice();
    for(let i=0;i<30&&contrast(previewAccent,white)<5;i++)previewAccent=mix(previewAccent,black,.12);
    root.dataset.theme=dark?'dark':'light';root.dataset.mode=state.mode;root.dataset.reducedMotion=String(state.reduceMotion||motion.matches);
    root.style.setProperty('--accent',state.color);
    root.style.setProperty('--accent-ink',contrast(accent,black)>=contrast(accent,white)?css(black):css(white));
    root.style.setProperty('--accent-text',css(text));
    root.style.setProperty('--accent-soft',css(mix(bg,accent,dark?.12:.16)));
    root.style.setProperty('--preview-accent',css(previewAccent));
    root.style.setProperty('--preview-soft',css(mix(white,accent,.1)));
    root.style.setProperty('--brand-filter',contrast(accent,black)>=contrast(accent,white)?'brightness(0)':'brightness(0) invert(1)');
    root.style.colorScheme=dark?'dark':'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#141414':'#ffffff');
    if(persist)try{localStorage.setItem(key,JSON.stringify(state));}catch{}
    window.dispatchEvent(new CustomEvent('subromart:preferences',{detail:{...state}}));
  }
  root.classList.add('js');apply();
  media.addEventListener('change',()=>apply());motion.addEventListener('change',()=>apply());
  window.SubromartTheme={state,apply,reset(){apply({mode:'auto',color:'#d1f36b',reduceMotion:motion.matches},true);}};
})();
