/* Códice de Evolução — funciona localmente e pode sincronizar com Supabase. */
(() => {
  'use strict';
  const DATA = window.CODEX_DATA || [];
  const CREATURES = window.CODEX_CREATURES || {companion:[],wild:[],special:[]};
  const STORE = 'codice-ilha-tempestade-v2';
  const CHARS = [
    {id:'lorelay', name:'Lorelay', cls:'Druida', image:'lorelay.jpg', color:'#83a98a', sigil:'leaf', stats:{FOR:8,DES:10,CON:12,INT:14,SAB:16,CAR:16}, casting:'SAB', motto:'A ilha fala por raízes, marés e formas vivas.'},
    {id:'duki', name:'Duki', cls:'Ladino', image:'duki.jpg', color:'#b58b61', sigil:'dagger', stats:{FOR:10,DES:15,CON:13,INT:15,SAB:8,CAR:14}, casting:'INT', motto:'Uma saída existe, mesmo quando a porta está trancada.'},
    {id:'milagres', name:'Milagres Kikito', cls:'Bardo', image:'milagres.jpg', color:'#d3aa6a', sigil:'music', stats:{FOR:12,DES:10,CON:9,INT:14,SAB:14,CAR:17}, casting:'CAR', motto:'Toda aventura merece uma canção que a faça durar.'},
    {id:'joao', name:'João, o Andarilho', cls:'Patrulheiro', image:'joao.jpg', color:'#9cae78', sigil:'bow', stats:{FOR:10,DES:16,CON:14,INT:8,SAB:14,CAR:14}, casting:'SAB', motto:'A trilha é um mapa para quem sabe observar.'},
    {id:'kiedis', name:'KIEDIS', cls:'Monge', image:'kiedis.jpg', color:'#c88c7d', sigil:'sun', stats:{FOR:10,DES:15,CON:8,INT:15,SAB:12,CAR:15}, casting:null, motto:'O próximo passo começa com um instante de calma.'},
    {id:'calebi', name:'Calebi', cls:'Bruxo', image:'calebi.jpg', color:'#ae91bc', sigil:'eye', stats:{FOR:10,DES:16,CON:12,INT:13,SAB:8,CAR:16}, casting:'CAR', motto:'As palavras do pacto ainda não revelaram tudo.'}
  ];
  const SKILLS=['Acrobacia','Arcanismo','Atletismo','Atuação','Enganação','Furtividade','História','Intimidação','Intuição','Investigação','Lidar com Animais','Medicina','Natureza','Percepção','Persuasão','Prestidigitação','Religião','Sobrevivência'];
  const BARD_PROFICIENT=new Set(['Acrobacia','Atuação','Enganação','Intuição','Investigação','Percepção','Persuasão']);
  const ICONS = {
    leaf:'<path d="M18 4C8 5 4 10 5 17c6 3 14-2 13-13Z"/><path d="M6 18c3-4 6-6 10-8"/>',
    dagger:'<path d="m5 19 5-5m-3 7-4-4m7-3 8-8 2-4-4 2-8 8"/><path d="m8 12 4 4"/>',
    music:'<path d="M9 18V5l10-2v13"/><path d="M9 5v4l10-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="16" cy="16" rx="3" ry="2"/>',
    bow:'<path d="M5 3c11 2 11 16 0 18M5 3v18m0-9h15m-4-3 4 3-4 3"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3M19 5l-3 3M8 16l-3 3"/>',
    eye:'<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3"/>',
    star:'<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z"/>',
    shield:'<path d="m12 2 8 3v6c0 5-3 8-8 11-5-3-8-6-8-11V5l8-3Z"/><path d="M12 6v12M7 11h10"/>',
    flame:'<path d="M12 22c-5 0-8-3-8-7 0-4 3-7 5-9 0 3 2 4 3 5 2-3 3-5 3-9 5 5 7 9 5 14-1 4-4 6-8 6Z"/><path d="M12 21c-2 0-3-2-3-4 0-2 2-4 3-5 0 2 3 3 3 5 0 2-1 4-3 4Z"/>',
    heart:'<path d="M20.8 8.1c0 4.2-8.8 11.2-8.8 11.2S3.2 12.3 3.2 8.1a4.4 4.4 0 0 1 8.8-.2 4.4 4.4 0 0 1 8.8.2Z"/>',
    bread:'<path d="M4 14c0-4 3-7 8-7s8 3 8 7v6H4v-6Z"/><path d="M8 7c0-2 1-3 2-4m4 4c0-2 1-3 2-4"/>',
    bottle:'<path d="M9 2h6m-5 0v5l-4 5v8c0 1 1 2 2 2h8c1 0 2-1 2-2v-8l-4-5V2M7 14h10"/>',
    rope:'<circle cx="12" cy="11" r="8"/><circle cx="12" cy="11" r="5"/><path d="M17 17l4 4"/>',
    coin:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><path d="m12 8 1.1 2.9L16 12l-2.9 1.1L12 16l-1.1-2.9L8 12l2.9-1.1L12 8Z"/>',
    tool:'<path d="M15 3a5 5 0 0 0 6 6l-9 9-3 3a3 3 0 0 1-4-4l3-3 9-9a5 5 0 0 0-2-2Z"/>',
    photo:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m4 18 5-5 4 3 3-4 5 6"/>',
    dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="8" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/>',
    box:'<path d="M3 8 12 4l9 4v11l-9 4-9-4V8Z"/><path d="m3 8 9 4 9-4m-9 4v11"/>',
    book:'<path d="M12 5c-3-2-7-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>',
    paw:'<circle cx="7" cy="7" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="17" cy="7" r="1"/><path d="M12 11c-3 0-6 4-6 6 0 3 3 3 6 2 3 1 6 1 6-2 0-2-3-6-6-6Z"/>',
    swirl:'<path d="M21 12c0 5-4 9-9 9S3 17 3 12s4-9 9-9c4 0 7 3 7 6s-2 5-5 5-4-2-4-4 2-3 3-3"/>',
    scroll:'<path d="M6 3h12v14c0 2-2 4-4 4H5c-2 0-3-2-3-4s1-3 3-3h10M6 3v11M5 18h9"/>',
    check:'<path d="m4 12 5 5L20 6"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    spark:'<path d="m12 2 2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8Z"/>',
  };
  const icon = (name, size=24) => `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.star}</svg>`;
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const clean = s => String(s).replace(/\s*\[(?:E|I|Fiend|obrigatório)\]/gi,'').trim();
  const unique = list => [...new Map(list.map(x => [clean(x[0]).toLowerCase(),x])).values()];
  let saved;
  let storageAvailable = true;
  try { saved = JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { saved = {}; storageAvailable = false; }
  const state = {choices:saved.choices || {}, asi:saved.asi || {}, beasts:saved.beasts || {}, checks:saved.checks || {}, visited:saved.visited || {}, finished:saved.finished || {}, inventory:saved.inventory || {}, inventoryVersion:saved.inventoryVersion || {}};
  const ui = {char:null, level:2, panel:'overview', step:null, search:'', filter:'all', detail:null, inventoryEdit:null, inventoryAdding:null, inventoryOpen:null, campaignOpen:null, noteEditor:null, noteDraft:'', combatPanel:null, spellbookOpen:null, stageEntrance:false};
  const CLOUD=window.CODEX_CLOUD||{enabled:false};
  const CLOUD_GROUPS=['choices','asi','beasts','checks','visited','finished','swaps'];
  const cloudSessions={};
  const cloudTimers={};
  const cloudBusy=new Set();
  const cloudDirty=new Set();
  let cloudApplying=false,cloudMasterCode=null;
  function characterEntries(group,id){return Object.fromEntries(Object.entries(state[group]||{}).filter(([key])=>key.startsWith(id+'-')||key.startsWith(id+':')));}
  function cloudDocument(id){const data={};for(const group of CLOUD_GROUPS)data[group]=characterEntries(group,id);data.notes=notesFor(id);data.inventory=state.inventory?.[id]||null;data.inventoryVersion=state.inventoryVersion?.[id]||0;return data;}
  function applyCloudDocument(id,data){
    cloudApplying=true;
    for(const group of CLOUD_GROUPS){
      state[group] ||= {};
      for(const key of Object.keys(state[group]))if(key.startsWith(id+'-')||key.startsWith(id+':'))delete state[group][key];
      Object.assign(state[group],data?.[group]||{});
    }
    state.notes ||= {};state.inventory ||= {};state.inventoryVersion ||= {};
    state.notes[id]=normalizeNotes(data?.notes,id);
    if(Array.isArray(data?.inventory))state.inventory[id]=data.inventory;else delete state.inventory[id];
    state.inventoryVersion[id]=Number(data?.inventoryVersion)||0;
    persist();cloudApplying=false;
  }
  function cloudTarget(){return ui.screen==='admin'?ui.adminChar:ui.char;}
  function queueCloud(id){
    if(!CLOUD.enabled||!id||!cloudSessions[id]||cloudSessions[id].blocked)return;
    try{localStorage.setItem(`codice-pendente-${id}`,'1');}catch{}
    cloudDirty.add(id);clearTimeout(cloudTimers[id]);
    cloudTimers[id]=setTimeout(()=>flushCloud(id),650);
  }
  async function flushCloud(id){
    const session=cloudSessions[id];if(!session||session.blocked||cloudBusy.has(id))return;
    if(!cloudDirty.delete(id))return;
    cloudBusy.add(id);
    const sheetDocument=cloudDocument(id);
    try{const result=await CLOUD.write(id,session.code,sheetDocument,session.revision);session.revision=Number(result.revision);try{localStorage.setItem(`codice-revisao-${id}`,String(session.revision));if(!cloudDirty.has(id))localStorage.removeItem(`codice-pendente-${id}`);}catch{}const status=ui.char===id?document.querySelector('.cloud-strip span'):null;if(status&&!cloudDirty.has(id))status.textContent='Ficha online · atualizada';}
    catch(error){session.blocked=true;cloudDirty.add(id);toast(error.code==='40001'?'Outra pessoa atualizou esta ficha. Exporte seus dados antes de recarregar a versão online.':'Não foi possível sincronizar. Seus dados continuam salvos neste aparelho.');}
    finally{cloudBusy.delete(id);if(cloudDirty.has(id)&&!session.blocked)queueCloud(id);}
  }
  function persist() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); storageAvailable = true; }
    catch { storageAvailable = false; }
    if(!cloudApplying)queueCloud(cloudTarget());
  }
  function toast(message) {
    const el=document.querySelector('#toast'); el.textContent=message; el.classList.add('show');
    clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),3900);
  }
  async function openCloudCharacter(id,code){
    if(cloudBusy.has(id)){toast('Aguarde a sincronização desta ficha e tente novamente.');return;}
    try{
      let pending=false,previousRevision=NaN;
      try{pending=localStorage.getItem(`codice-pendente-${id}`)==='1';const raw=localStorage.getItem(`codice-revisao-${id}`);previousRevision=raw===null?NaN:Number(raw);}catch{}
      if(pending){
        if(!Number.isInteger(previousRevision))throw Error('Mudanças locais sem revisão online. Exporte antes de atualizar.');
        cloudSessions[id]={code,revision:previousRevision,blocked:false};
        cloudDirty.add(id);await flushCloud(id);
        if(cloudSessions[id]?.blocked)throw Error('Mudanças locais pendentes. Exporte antes de atualizar.');
      }
      const result=await CLOUD.read(id,code);
      const revision=Number(result?.revision);
      if(!Number.isInteger(revision))throw Error('Formato de resposta inesperado.');
      cloudSessions[id]={code,revision,blocked:false};
      try{localStorage.setItem(`codice-revisao-${id}`,String(revision));}catch{}
      if(result.document&&Object.keys(result.document).length)applyCloudDocument(id,result.document);
      else{queueCloud(id);clearTimeout(cloudTimers[id]);await flushCloud(id);if(cloudSessions[id]?.blocked)throw Error('Falha ao criar a ficha online.');}
      try{localStorage.setItem(`codice-acesso-${id}`,code);}catch{}
      ui.char=id;ui.syncConflict=null;ui.screen='profile';render();scrollTop();
      toast('Ficha online atualizada.');
    }catch(error){
      delete cloudSessions[id];
      if(error.code==='28000')try{localStorage.removeItem(`codice-acesso-${id}`);}catch{}
      ui.screen='unlock';ui.syncConflict=id;render();toast(error.code==='28000'?'Código incorreto.':error.message||'Não foi possível abrir a ficha online. Confira a conexão.');
    }
  }
  async function useCloudVersion(id,code){
    if(cloudBusy.has(id)){toast('Aguarde a sincronização desta ficha.');return;}
    try{
      const result=await CLOUD.read(id,code);
      clearTimeout(cloudTimers[id]);cloudDirty.delete(id);
      cloudSessions[id]={code,revision:Number(result.revision),blocked:false};
      try{localStorage.removeItem(`codice-pendente-${id}`);localStorage.setItem(`codice-revisao-${id}`,String(result.revision));localStorage.setItem(`codice-acesso-${id}`,code);}catch{}
      applyCloudDocument(id,result.document||{});
      ui.char=id;ui.screen='profile';render();scrollTop();toast('Versão online carregada.');
    }catch(error){toast(error.code==='28000'?'Código incorreto.':'Não foi possível carregar a versão online.');}
  }
  async function openCloudMaster(code){
    if(cloudBusy.size){toast('Aguarde a sincronização antes de atualizar todas as fichas.');return;}
    try{
      for(const c of CHARS){
        let pending=false,raw=null;try{pending=localStorage.getItem(`codice-pendente-${c.id}`)==='1';raw=localStorage.getItem(`codice-revisao-${c.id}`);}catch{}
        if(!pending)continue;
        const revision=raw===null?NaN:Number(raw);
        if(!Number.isInteger(revision))throw Error('Há alterações locais sem revisão online. Exporte uma cópia antes de atualizar.');
        cloudSessions[c.id]={code,revision,blocked:false};cloudDirty.add(c.id);await flushCloud(c.id);
        if(cloudSessions[c.id]?.blocked)throw Error('Há alterações locais pendentes. Exporte uma cópia antes de atualizar.');
      }
      const rows=await CLOUD.readAll(code);
      if(!Array.isArray(rows))throw Error('Formato de resposta inesperado.');
      cloudMasterCode=code;
      for(const row of rows){
        if(!charById(row.character_id))continue;
        cloudSessions[row.character_id]={code,revision:Number(row.revision),blocked:false};
        applyCloudDocument(row.character_id,row.document||{});
      }
      ui.screen='admin';render();toast('Fichas online atualizadas.');
    }catch(error){toast(error.code==='28000'?'Código do mestre incorreto.':error.message||'Não foi possível consultar as fichas online.');}
  }
  function charById(id) { return CHARS.find(c => c.id===id); }
  function chapter(c,l) { return DATA.find(x => x.name===c.name && x.after===l); }
  const selected = id => state.choices[id] || [];
  const has = (id,label) => selected(id).some(x => clean(x)===clean(label));
  function branch(c,l,index) {
    const id=`${c.id}-${l}-${index}`;
    const tests={
      'lorelay-2-2':()=>has('lorelay-2-1','Círculo da Terra'),
      'lorelay-2-3':()=>has('lorelay-2-1','Círculo da Terra'),
      'duki-3-3':()=>has('duki-3-1','Trapaceiro Arcano'),
      'duki-3-6':()=>has('duki-3-1','Trapaceiro Arcano'),
      'duki-4-3':()=>has('duki-3-1','Trapaceiro Arcano'),
      'joao-3-2':()=>has('joao-3-1','Caçador'),
      'kiedis-3-2':()=>has('kiedis-3-1','Sombra'),
      'kiedis-3-3':()=>has('kiedis-3-1','Quatro Elementos'),
      'calebi-3-2':()=>has('calebi-3-1','Tomo')
    };
    return tests[id] ? tests[id]() : true;
  }
  function spellPool(c,l,index,items) {
    let list=items.slice();
    const from={
      'milagres-3-2':[['milagres',2,1]],
      'milagres-4-extra':[['milagres',2,1],['milagres',3,2]],
      'calebi-3-3':[['calebi',2,2]],
      'calebi-4-extra':[['calebi',2,2],['calebi',3,3]]
    }[`${c.id}-${l}-${index}`] || [];
    from.forEach(([cid,lev,ind])=>{
      const source=chapter(charById(cid),lev);
      list.push(...source.sections[ind].items);
    });
    return unique(list);
  }
  function steps(c,l) {
    const source=chapter(c,l); if(!source) return [];
    const result=[];
    source.sections.forEach((s,index)=>{
      const id=`${c.id}-${l}-${index}`;
      if (!branch(c,l,index)) return;
      if (s.kind==='automatic'||s.kind==='heading'||s.kind==='paragraph'||s.kind==='mechanical_note'||s.kind==='note') return;
      if (c.id==='lorelay'&&l===3&&index===1) {
        result.push({id,title:'Magias para preparar após descanso',kind:'reference',intro:s.intro,items:s.items,icon:'book',source:s}); return;
      }
      if (c.id==='kiedis'&&l===3&&index===2) {
        result.push({id,title:'Poderes do Caminho da Sombra',kind:'reference',intro:s.intro,items:s.items,icon:'swirl',source:s}); return;
      }
      if (s.kind==='decision'&&s.title==='Escolha de atributos') {
        result.push({id,title:'Melhoria de atributos',kind:'asi',limit:1,icon:'spark',source:s}); return;
      }
      let title=s.title;
      if (id==='duki-3-3') title='Escolha 2 truques de mago';
      if (id==='duki-3-6') title='Escolha 3 magias de nível 1';
      if (id==='calebi-3-2') title='Escolha 3 truques para o Tomo';
      let limit=Number((title.match(/(?:escolha|opções práticas para)\s*(\d+)/i)||[])[1])||1;
      if (id==='duki-3-3') limit=2;
      if (id==='duki-3-6') limit=3;
      if (id==='joao-3-2') limit=1;
      if (id==='calebi-3-2') limit=3;
      const kind=(s.kind==='spells'||s.kind==='conditional_spells'||/magia|truque/i.test(title))?'spell':'choice';
      let items=s.items;
      if (id==='duki-3-3') items=items.filter(x=>!x[0].includes('[obrigatório]'));
      if (kind==='spell') items=spellPool(c,l,index,items);
      const intro=id==='duki-3-6' ? source.sections[5].intro : s.intro;
      result.push({id,title,kind,limit,intro,items,icon:kind==='spell'?'book':(/terreno|fera|disciplina/i.test(title)?'leaf':'star'),source:s});
    });
    if (c.id==='joao'&&l===3&&has('joao-3-1','Mestre das Feras'))
      result.splice(1,0,{id:'joao-3-beast',title:'Escolha sua companheira animal',kind:'beast',limit:1,icon:'paw',intro:'Escolha uma companheira. Confira os ataques e a habilidade dela antes de decidir.'});
    if(c.id==='lorelay'&&l===2)
      result.push({id:'lorelay-2-wild',title:'Escolha 4 formas selvagens',kind:'wildforms',limit:4,icon:'paw',intro:'Estas são as quatro formas que Lorelay conhece agora. Cada uma tem uma maneira diferente de ajudar em combate e na exploração.',items:CREATURES.wild.map(x=>[x[0],x[3]])});
    if(c.id==='lorelay'&&l===4)
      result.push({id:'lorelay-4-special',title:'Escolha a quinta forma selvagem',kind:'wildforms',limit:1,icon:'paw',intro:'Uma forma especial se soma às quatro anteriores. Escolha uma.',items:CREATURES.special.map(x=>[x[0],x[3]])});
    if (c.id==='milagres'&&l===3) {
      result.splice(1,0,{id:'milagres-3-expertise',title:'Escolha 2 perícias para Especialização',kind:'choice',limit:2,icon:'star',intro:'A ficha inicial marca estas perícias como proficientes. Escolha duas; o bônus de proficiência nelas passa de +2 para +4.',items:SKILLS.filter(name=>BARD_PROFICIENT.has(name)).map(name=>[name,'Dobre o bônus de proficiência nesta perícia.'])});
      if(has('milagres-3-1','Conhecimento')) result.splice(2,0,{id:'milagres-3-lore-skills',title:'Escolha 3 novas proficiências',kind:'choice',limit:3,icon:'book',intro:'O Colégio do Conhecimento concede proficiência em três perícias. Aqui aparecem apenas as que não estão marcadas na ficha inicial.',items:SKILLS.filter(name=>!BARD_PROFICIENT.has(name)).map(name=>[name,'Ganha proficiência nesta perícia pelo Colégio do Conhecimento.'])});
    }
    if (c.id==='milagres'&&l===4)
      result.push({id:'milagres-4-extra',title:'Escolha 1 magia conhecida',kind:'spell',limit:1,icon:'book',intro:'Pode ser de nível 1 ou nível 2. O PDF remete às listas dos níveis anteriores.',items:spellPool(c,l,'extra',[])});
    if (c.id==='calebi'&&l===4)
      result.push({id:'calebi-4-extra',title:'Escolha 1 magia conhecida',kind:'spell',limit:1,icon:'book',intro:'Pode ser de nível 1 ou nível 2. O PDF remete às listas dos níveis anteriores.',items:spellPool(c,l,'extra',[])});
    return result;
  }
  function isComplete(step) {
    if (step.kind==='asi') return !!validAsi(state.asi[step.id],CHARS.find(c=>step.id.startsWith(`${c.id}-`)));
    if (step.kind==='beast') {
      const b=state.beasts[step.id]||{};
      return CREATURES.companion.some(x=>x[0]===b.name);
    }
    if (step.kind==='reference') return true;
    const picks=selected(step.id);
    if(picks.length!==step.limit) return false;
    if(step.kind==='spell') {
      const c=CHARS.find(x=>step.id.startsWith(`${x.id}-`)), l=Number(step.id.slice(c.id.length+1).split('-')[0]);
      const prior=previousSpellNames(c,l,step.id);
      if(picks.some(x=>prior.has(clean(x).toLowerCase()))) return false;
      if(step.id==='duki-3-6'&&picks.filter(x=>/\[(E|I)\]/.test(x)).length<2) return false;
    }
    return true;
  }
  function progress(c,l) { const all=steps(c,l).filter(s=>s.kind!=='reference'); return {done:all.filter(isComplete).length,total:all.length}; }
  function levelStatus(c,l) {
    const key=`${c.id}-${l}`, p=progress(c,l);
    if(state.finished[key]&&p.done===p.total) return 'concluída';
    if(state.visited[key]||Object.keys(state.choices).some(x=>x.startsWith(`${key}-`))||Object.keys(state.asi).some(x=>x.startsWith(`${key}-`))) return 'em andamento';
    return 'não iniciada';
  }
  function touchLevel(c,l) { state.visited[`${c.id}-${l}`]=true;persist(); }
  function invalidateLevel(c,l){ for(let level=l;level<=4;level++) delete state.finished[`${c.id}-${level}`]; }
  function currentChar(){ return charById(ui.char); }
  function mod(n) { return Math.floor((Number(n)-10)/2); }
  function signed(n) { return n>=0?`+${n}`:String(n); }
  function validAsi(a,c) {
    if (!a||!c) return false;
    if (a.mode==='two'&&a.first&&c.stats[a.first]+2<=20) return true;
    return a.mode==='split'&&a.first&&a.second&&a.first!==a.second&&c.stats[a.first]+1<=20&&c.stats[a.second]+1<=20;
  }
  function afterStats(c,level) {
    const out={...c.stats}; if (level!==4) return out;
    const a=state.asi[`${c.id}-4-${chapter(c,4).sections.findIndex(x=>x.title==='Escolha de atributos')}`];
    if (!validAsi(a,c)) return out;
    if (a.mode==='two') out[a.first]+=2; else {out[a.first]++;out[a.second]++;}
    return out;
  }
  function hpAfter(c,l) {
    const ch=chapter(c,l); if(l!==4) return ch.hp_after;
    return ch.hp_after+l*(mod(afterStats(c,l).CON)-mod(c.stats.CON));
  }
  function automatic(c,l) {
    return chapter(c,l).sections.filter(s=>s.kind==='automatic').flatMap(s=>s.items).filter(([name])=>{
      if (/^Escolhas$|^Estilo de Luta$|^Invocações Místicas$/.test(name)) return false;
      if (/^Se for Trapaceiro/.test(name)) return has('duki-3-1','Trapaceiro Arcano');
      if (/^Se for Mestre das Feras/.test(name)) return has('joao-3-1','Mestre das Feras');
      if (/^Se for Caçador/.test(name)) return has('joao-3-1','Caçador');
      return true;
    });
  }
  function previousSpellNames(c,l,id) {
    const names=new Set(knownBefore(c,l).map(x=>x.toLowerCase()));
    if(c.id==='milagres') ['Zombaria Viciosa','Prestidigitação'].forEach(x=>names.add(x.toLowerCase()));
    if(c.id==='calebi') ['Rajada Mística','Ilusão Menor'].forEach(x=>names.add(x.toLowerCase()));
    for(let lev=2;lev<l;lev++)steps(c,lev).filter(s=>/truque/i.test(s.title)).forEach(s=>selected(s.id).forEach(x=>names.add(clean(x).toLowerCase())));
    if (c.id==='duki'&&l===3&&id==='duki-3-3') names.add('mãos mágicas');
    return names;
  }
  function optionIcon(name) {
    const t=clean(name).toLowerCase();
    if (/fogo|chama|ardente|flamej|cinzas|calor/.test(t)) return 'flame';
    if (/cura|restaura|regenera/.test(t)) return 'heart';
    if (/proteç|armadura|escudo|defesa|resist/.test(t)) return 'shield';
    if (/animal|fera|natureza|espinho|árvore|planta|raíze|fruto|forma selvagem|círculo da terra/.test(t)) return 'leaf';
    if (/visão|detectar|olhos|sentidos|percep/.test(t)) return 'eye';
    if (/sombra|escur|ilusão|invis|disfar|imagem/.test(t)) return 'swirl';
    if (/raio|trovej|relâmp|bruxa|mísseis/.test(t)) return 'spark';
    if (/mão|toque|golpe|ataque|lâmina|adaga|ardilosa|furtiv|desengaj|esconder/.test(t)) return 'dagger';
    if (/magia|ritual|idioma|escrita|servo|mensagem/.test(t)) return 'book';
    return 'star';
  }
  function spellCircle(step,item) {
    if (/truque/i.test(step.title)) return 'Truque';
    const name=clean(item[0]);
    const from1=(step.id==='milagres-3-2'||step.id==='milagres-4-extra')&&chapter(charById('milagres'),2).sections[1].items.some(x=>clean(x[0])===name);
    const war1=(step.id==='calebi-3-3'||step.id==='calebi-4-extra')&&chapter(charById('calebi'),2).sections[2].items.some(x=>clean(x[0])===name);
    if(from1||war1) return 'nível 1';
    if (/nível 2/i.test(step.title) || step.id==='milagres-4-extra'||step.id==='calebi-4-extra') return 'nível 2';
    return 'nível 1';
  }

  const IMAGES = {
    lorelay: 'assets/lorelay.jpg',
    duki: 'assets/duki.jpg',
    milagres: 'assets/milagres.jpg',
    joao: 'assets/joao.jpg',
    kiedis: 'assets/kiedis.jpg',
    calebi: 'assets/calebi.jpg'
  };
  const CHOICE_ART = {
    flame:'ball-glow', heart:'ball-heart', shield:'armor-vest', leaf:'acorn', eye:'awareness',
    swirl:'aura', spark:'arcing-bolt', dagger:'backstab', book:'aura', star:'aura'
  };
  // Uma invocação pode alterar uma magia ou permitir conjurá-la à vontade.
  // Nesse caso, a imagem acompanha o efeito real em vez de um símbolo genérico.
  const INVOCATION_ART = {
    'Rajada Agonizante':'Rajada Mística',
    'Armadura das Sombras':'Armadura Arcana',
    'Fala das Feras':'Falar com Animais',
    'Influência Sedutora':'Enfeitiçar Pessoa',
    'Visão Diabólica':'Visão no Escuro',
    'Visão Mística':'Detectar Magia',
    'Lança Mística':'Rajada Mística',
    'Olhos das Runas':'Compreender Idiomas',
    'Vigor Infernal':'Vida Falsa',
    'Olhar de Duas Mentes':'Detectar Pensamentos',
    'Máscara de Muitas Faces':'Disfarçar-se',
    'Visões Nebulosas':'Imagem Silenciosa',
    'Rajada Repulsiva':'Rajada Mística',
    'Ladrão dos Cinco Destinos':'Perdição'
  };
  function choiceArt(name) {
    const spell=INVOCATION_ART[clean(name)];
    const artwork=spell&&window.CODEX_SPELL_ICONS?.[spell];
    if(artwork)return `<img src="${artwork}" alt="" aria-hidden="true" loading="lazy">`;
    const type=optionIcon(name);
    return `<img src="assets/icons/${CHOICE_ART[type]||'aura'}.svg" alt="" aria-hidden="true">`;
  }
  const FEATURED_CHOICES = {
    'lorelay-2-1': {
      'Círculo da Terra': {tone:'land',type:'MAGIA E PREPARAÇÃO',hook:'Mais opções de magia, todos os dias.',points:['+1 truque de druida agora','Recupera um espaço de magia de nível 1 após descanso curto, 1 vez por descanso longo','Escolhe um terreno que amplia as magias do círculo'],sheet:'Anote o truque, Recuperação Natural e o terreno escolhido.'},
      'Círculo da Lua': {tone:'moon',type:'FORMA SELVAGEM EM COMBATE',hook:'A transformação vira sua maior força.',points:['Transforma-se usando ação bônus','Use as formas escolhidas no códice, ainda sem voo ou natação','Em forma animal, gasta espaço de magia como ação bônus para curar 1d8 por nível do espaço'],sheet:'Anote Forma Selvagem de Combate e suas formas escolhidas.'}
    },
    'duki-3-1': {
      'Ladrão': {type:'MOBILIDADE E FERRAMENTAS',hook:'Entra, alcança e usa objetos antes de todo mundo.'},
      'Assassino': {type:'ABERTURA DE COMBATE',hook:'O primeiro turno pode decidir a luta.'},
      'Trapaceiro Arcano': {type:'FURTIVIDADE E MAGIA',hook:'A infiltração ganha truques e uma mão invisível.'}
    },
    'milagres-3-1': {
      'Conhecimento': {type:'PERÍCIAS E CONTROLE',hook:'Três perícias novas e palavras que atrapalham o inimigo.'},
      'Bravura': {type:'COMBATE E PROTEÇÃO',hook:'Armas, armadura e Inspiração que muda um ataque.'}
    },
    'joao-2-1': {
      'Arquearia': {type:'PRECISÃO À DISTÂNCIA',hook:'+2 para acertar com armas à distância.'},
      'Defesa': {type:'PROTEÇÃO',hook:'+1 na CA enquanto estiver usando armadura.'},
      'Duelismo': {type:'ARMA DE UMA MÃO',hook:'+2 no dano ao lutar com uma arma corpo a corpo.'},
      'Duas Armas': {type:'DOIS GOLPES',hook:'O segundo ataque também soma o modificador ao dano.'}
    },
    'joao-3-1': {
      'Caçador': {type:'TÉCNICA DE CAÇA',hook:'Escolhe uma vantagem permanente para o combate.'},
      'Mestre das Feras': {type:'COMPANHEIRA ANIMAL',hook:'Uma fera passa a lutar e viajar ao seu lado.'}
    },
    'kiedis-3-1': {
      'Mão Aberta': {type:'CONTROLE CORPORAL',hook:'Cada golpe da Rajada pode derrubar, empurrar ou impedir reações.'},
      'Sombra': {type:'INFILTRAÇÃO COM KI',hook:'Usa escuridão, silêncio e furtividade como ferramentas.'},
      'Quatro Elementos': {type:'DISCIPLINAS ELEMENTAIS',hook:'Conduz energia elemental em técnicas que gastam ki.'}
    },
    'calebi-3-1': {
      'Corrente': {type:'FAMILIAR',hook:'Invoca um familiar especial para observar, ajudar e lutar.'},
      'Lâmina': {type:'ARMA DE PACTO',hook:'Cria uma arma mágica corpo a corpo na própria mão.'},
      'Tomo': {type:'LIVRO DAS SOMBRAS',hook:'Aprende três truques de qualquer classe.'}
    }
  };
  function featuredInfo(s,name){return FEATURED_CHOICES[s.id]?.[clean(name)]||null;}
  function featuredCard(s,name,description,picked,blocked){
    const info=featuredInfo(s,name),tone=info.tone||optionIcon(name);
    const details=info.points?`<span class="major-points">${info.points.map(x=>`<span>${esc(x)}</span>`).join('')}</span>`:`<span class="major-description">${esc(description)}</span>`;
    return `<button class="option option-major theme-${tone} ${picked?'picked':''}" data-do="pick" data-step="${s.id}" data-name="${esc(name)}" ${blocked?'disabled':''} aria-pressed="${picked}"><span class="major-top"><span class="option-icon">${tone==='moon'?icon('paw',38):choiceArt(name)}</span><span class="major-state">${picked?'ESCOLHIDO ✓':'ESCOLHER →'}</span></span><span class="major-type">${esc(info.type)}</span><strong class="major-title">${esc(clean(name))}</strong><span class="major-hook">${esc(info.hook)}</span>${details}${info.sheet?`<span class="major-sheet"><b>NA FICHA</b>${esc(info.sheet)}</span>`:''}${timingBadge(choiceTiming(s,name,description))}</button>`;
  }
  const SHEET = {
    lorelay:{race:'Meio-elfa',player:'Amanda',ac:13,speed:'9 m',item:['Espelho das Mil Peles','1 uso por descanso longo. Ao ver um animal, SAB CD 13: sucesso assume forma por até 10 minutos; falha, forma aleatória do mestre por 1 minuto. Por ora, use animais inofensivos sem voo ou natação.'],base:['Druídico','Visão no escuro 18 m','Ancestralidade feérica','Magias de druida preparadas após descanso longo'],actions:[['Produzir Chamas','AÇÃO'],['Palavra Curativa','AÇÃO BÔNUS']]},
    duki:{race:'Gnomo das rochas',player:'João',ac:13,speed:'7,5 m',item:['Chave do Talvez','Usos ilimitados. Tenta abrir fechadura comum com DES + ferramentas de ladrão, CD 13. Falha faz barulho; não abre fechaduras mágicas.'],base:['Ataque Furtivo 1d6','Especialização em Furtividade e ferramentas de ladrão','Astúcia Gnômica','Gíria de Ladrão'],actions:[['Ataque com rapieira ou arco curto','AÇÃO']]},
    milagres:{race:'Meio-elfo',player:'Prim',ac:11,speed:'9 m',item:['Pergaminho do Milagre','Uso único. Qualquer personagem pode usá-lo; criatura morta há até 1 minuto retorna com 1 PV. O pergaminho desaparece.'],base:['Inspiração de Bardo d6, 3 usos por descanso longo','Magias conhecidas','Visão no escuro 18 m','Ancestralidade feérica'],actions:[['Inspiração de Bardo','AÇÃO BÔNUS'],['Zombaria Viciosa','AÇÃO']]},
    joao:{race:'Meio-elfo',player:'João',ac:14,speed:'9 m',item:['As Mil Moedas Falsas','Bolsa com exatamente 1.000 moedas falsas. Parecem ouro à primeira vista; o mestre pode pedir Enganação para tentar usá-las.'],base:['Inimigo favorito: dragões','Explorador natural: costa','Visão no escuro 18 m','Ancestralidade feérica'],actions:[['Arco longo','AÇÃO'],['Ataque com segunda espada','AÇÃO BÔNUS']]},
    kiedis:{race:'Tiefling',player:'Diego',ac:13,speed:'9 m',item:['Mochila do Esquecimento','Espaço ilimitado; não guarda seres vivos. Ao retirar objeto, 1 no d20 perde o objeto; 2–20 retira normalmente.'],base:['Defesa sem Armadura','Artes Marciais d4','Resistência a fogo','Taumaturgia'],actions:[['Ataque com bastão','AÇÃO'],['Golpe desarmado de Artes Marciais','AÇÃO BÔNUS']]},
    calebi:{race:'Drow',player:'Lucca',ac:14,speed:'9 m',item:['Livro dos Pequenos Favores','3 usos. Escreva um pedido simples; uma entidade tenta cumprir. Não causa dano direto, mata criaturas nem imita magia poderosa. Cada favor cria uma dívida.'],base:['Patrono do Ínfero','Bênção do Escuro: 4 PV temporários ao reduzir inimigo a 0 PV','Visão no escuro 36 m','Sensibilidade à luz solar'],actions:[['Rajada Mística','AÇÃO'],['Hex','AÇÃO BÔNUS'],['Repreensão Infernal','REAÇÃO']]}
  };
  const BIOGRAPHIES={
    lorelay:'Lorelay cresceu sem os pais, acolhida pelos animais e pela floresta. Ainda pequena, perdeu a família quando um troll matou seu pai e sua mãe depois de perder uma aposta numa briga de bar. Não se lembra daquele dia; guarda apenas fotografias dos dois. A natureza lhe deu abrigo, mas ela ainda procura um lugar a que possa chamar de lar e pessoas que se tornem sua família. Quer conhecer as belezas do mundo. Não sonha com riquezas, embora aprecie uma vida confortável.',
    duki:'Duki cresceu numa família pobre da cidade. Por ser gnomo, enfrentou preconceito e aprendeu cedo a se virar nas ruas. A vida de aventureiro lhe pareceu um caminho mais digno para ganhar o próprio sustento. Ainda assim, um ladino sabe reconhecer uma boa recompensa quando ela aparece.',
    milagres:'Os dias de Milagres pareciam cópias uns dos outros. Cansado de uma vida parada, ele deixou a rotina para conhecer o mundo e descobrir um propósito, mesmo sem saber ainda qual será. Cada nova estrada é uma chance de sair da zona de conforto e encontrar algo que valha a pena contar.',
    joao:'João nunca se ajustou ao ritmo rígido da cidade nem à solenidade dos parentes elfos. Filho de uma família humilde, cresceu entre dois mundos e encontrou seu lugar na estrada. Viaja com um violão gasto, uma mochila e o gosto pela liberdade. Conhece cogumelos e ervas que recolhe nos bosques; gosta de tocar à fogueira, fumar seu cachimbo e contemplar o pôr do sol. Dinheiro lhe serve para suprimentos, não para juntar fortuna. Veio à Ilha da Tempestade em busca de histórias, névoas misteriosas e dos cogumelos raros que, dizem, crescem nos penhascos sob o rugido dos dragões e da tempestade.',
    kiedis:'KIEDIS cresceu entre as ruas e as praias de uma grande cidade litorânea. Poeta e artista de rua, ganhava a vida com versos rápidos, ritmo, voz e presença de palco. Quando sua trupe se dispersou, escolheu a estrada. Busca liberdade e inspiração em cada lugar novo, vivendo histórias intensas para transformá-las em poesia.',
    calebi:'Desde criança, Calebi queria ser o melhor em tudo. Treinou muito e se destacou nos esportes da vila, mas a ambição também se tornou um defeito. Cresceu com o pai ausente, trabalhou como pedreiro e aproveitou a força conquistada nos treinos. Às vezes usava drogas; em outras ocasiões, roubava pequenos objetos apenas pela adrenalina. Agora leva essa mistura de disciplina, impulso e desejo de superar os outros para a vida de aventureiro.'
  };
  state.notes = saved.notes || {};
  state.swaps = saved.swaps || {};
  function normalizeNotes(raw,id){
    if(typeof raw==='string')return raw.trim()?[{id:`legacy-${id}`,text:raw.trim()}]:[];
    if(!Array.isArray(raw))return [];
    return raw.filter(note=>note&&typeof note.text==='string'&&note.text.trim()).map((note,index)=>({id:String(note.id||`note-${id}-${index}`),text:note.text,updatedAt:note.updatedAt||''}));
  }
  function notesFor(id){
    state.notes[id]=normalizeNotes(state.notes[id],id);
    return state.notes[id];
  }
  ui.screen='home'; ui.stage='level'; ui.search=''; ui.admin=false;
  const hasFinished=(c,l)=>!!state.finished[`${c.id}-${l}`];
  const nextLevel=c=>[2,3,4].find(l=>!hasFinished(c,l))||null;
  const knownLevel=c=>[4,3,2].find(l=>hasFinished(c,l))||1;
  const portrait=(c,klass='')=>`<img class="portrait ${klass}" src="${esc(IMAGES[c.id])}" alt="Referência visual para ${esc(c.name)}" decoding="async" onerror="this.hidden=true">`;
  const classMark=(c)=>`<img class="class-mark" src="assets/class-icons/${c.id}.svg" alt="" aria-hidden="true">`;
  function badge(text){
    const t=String(text||'');
    const label=/ação b[oô]nus/i.test(t)?'AÇÃO BÔNUS':/rea[cç][aã]o/i.test(t)?'REAÇÃO':/\ba[cç][aã]o\b/i.test(t)?'AÇÃO':'';
    return label?`<span class="badge badge-${label==='AÇÃO'?'action':label==='REAÇÃO'?'reaction':'bonus'}">${label}</span>`:'';
  }
  const BONUS_SPELLS=new Set(['Bordão Místico','Chuva de Espinhos','Golpe Constritor','Hex','Lâmina Flamejante','Marca do Caçador','Passo Nebuloso','Retirada Acelerada','Palavra Curativa']);
  const BONUS_SPELL_DETAILS={
    'Palavra Curativa':{level:'MAGIA NÍVEL 1',note:'Gaste um espaço de magia: uma criatura que você vê a até 18 m recupera 1d4 + seu modificador de conjuração PV.'},
    'Hex':{level:'MAGIA NÍVEL 1',note:'Gaste um espaço e concentre-se. O alvo sofre +1d6 necrótico quando você o acerta; escolha um atributo no qual ele terá desvantagem em testes.'},
    'Marca do Caçador':{level:'MAGIA NÍVEL 1',note:'Gaste um espaço e concentre-se. Escolha uma criatura que vê: seus ataques com arma causam +1d6 nela; se cair a 0 PV, marque outra em turno posterior.'},
    'Chuva de Espinhos':{level:'MAGIA NÍVEL 1',note:'Gaste um espaço e concentre-se. O próximo acerto com arma à distância espalha espinhos; alvo e criaturas próximas fazem resistência de Destreza.'},
    'Golpe Constritor':{level:'MAGIA NÍVEL 1',note:'Gaste um espaço e concentre-se. O próximo acerto com arma invoca vinhas; o alvo faz resistência de Força ou fica impedido e sofre 1d6 por turno.'},
    'Retirada Acelerada':{level:'MAGIA NÍVEL 1',note:'Gaste um espaço e concentre-se. Você Dispara ao conjurar e pode Disparar como ação bônus nos turnos seguintes.'},
    'Passo Nebuloso':{level:'MAGIA NÍVEL 2',note:'Gaste um espaço de magia de nível 2 ou maior para se teleportar até 9 m para um espaço livre que você veja.'},
    'Lâmina Flamejante':{level:'MAGIA NÍVEL 2 · CONJURAR',note:'Se preparada, gaste um espaço para criar a lâmina como ação bônus. Nos turnos seguintes, use sua ação para atacar com ela: 3d6 de fogo. Exige concentração.'},
    'Esfera Flamejante':{level:'MAGIA NÍVEL 2 · MOVER',note:'Se preparada e já conjurada com uma ação, mova a esfera até 9 m como ação bônus; ao atingir uma criatura, ela faz resistência de Destreza. Exige concentração.'},
    'Esquentar Metal':{level:'MAGIA NÍVEL 2 · REPETIR',note:'Se preparada e já conjurada com uma ação, use ação bônus em turnos seguintes para repetir 2d8 de fogo a quem toca o metal. Exige concentração.'},
    'Bordão Místico':{level:'TRUQUE',note:'Sem gastar espaço: por 1 minuto, um bastão ou porrete que segura usa seu atributo de conjuração para ataque e dano, causa 1d8 e se torna mágico.'}
  };
  const REACTION_SPELLS=new Set(['Queda Suave','Repreensão Infernal','Escudo','Escudo Arcano']);
  const MINUTE_SPELLS=new Set(['Alarme','Boca Mágica','Consertar','Escrita Ilusória','Identificar']);
  const HOUR_SPELLS=new Set(['Encontrar Familiar']);
  const ACTION_INVOCATIONS=new Set(['Armadura das Sombras','Fala das Feras','Visão Mística','Vigor Infernal','Olhar de Duas Mentes','Máscara de Muitas Faces','Visões Nebulosas','Ladrão dos Cinco Destinos']);
  function timingBadge(kind){
    const labels={action:'AÇÃO',bonus:'AÇÃO BÔNUS',reaction:'REAÇÃO',passive:'PASSIVO · SEM AÇÃO',minute:'1 MINUTO',hour:'1 HORA',variable:'TEMPO VARIA'};
    const symbols={action:'dagger',bonus:'spark',reaction:'shield',passive:'check',minute:'scroll',hour:'scroll',variable:'book'};
    return `<span class="timing timing-${kind}">${icon(symbols[kind],15)} ${labels[kind]}</span>`;
  }
  function choiceTiming(s,name,description){
    const title=clean(name),detail=String(description||'');
    if(s.kind==='spell'){
      if(BONUS_SPELLS.has(title))return 'bonus';
      if(REACTION_SPELLS.has(title))return 'reaction';
      if(MINUTE_SPELLS.has(title))return 'minute';
      if(HOUR_SPELLS.has(title))return 'hour';
      if(!detail||/Truque escolhido de outra lista/.test(detail))return 'variable';
      return 'action';
    }
    if(s.kind==='asi')return 'passive';
    if(s.kind==='beast')return 'action';
    if(s.id==='lorelay-2-1')return title==='Círculo da Lua'?'bonus':'passive';
    if(s.id==='duki-3-1')return title==='Assassino'?'passive':'bonus';
    if(s.id==='milagres-3-1')return title==='Conhecimento'?'reaction':'bonus';
    if(s.id==='joao-3-1')return title==='Mestre das Feras'?'action':'passive';
    if(s.id==='kiedis-3-1')return title==='Sombra'?'action':title==='Mão Aberta'?'bonus':'variable';
    if(s.id==='calebi-2-1')return ACTION_INVOCATIONS.has(title)?'action':'passive';
    if(s.id==='calebi-3-1')return title==='Lâmina'?'action':title==='Corrente'?'variable':'passive';
    if(/a[cç][aã]o b[oô]nus/i.test(detail))return 'bonus';
    if(/rea[cç][aã]o/i.test(detail))return 'reaction';
    if(/\b(?:uma |sua |como )?a[cç][aã]o\b/i.test(detail))return 'action';
    return 'passive';
  }
  function head(){return `<header class="topbar"><button class="wordmark" data-do="home">Ilha da Tempestade <span>/ Códice</span></button><div class="top-actions"><button class="icon-button" data-do="export" title="Exportar progresso" aria-label="Exportar progresso">⇩</button><label class="icon-button upload" title="Importar progresso" aria-label="Importar progresso">⇧<input id="import-file" type="file" accept=".json,application/json"></label><button class="icon-button shield" data-do="admin" title="Administração" aria-label="Abrir administração">${icon('shield',21)}</button></div></header>`;}
  function foot(){return `<footer class="footer"><span>Edição 1.0 · Regras 2014 + regras da mesa · ${CLOUD.enabled?'Ficha online com cópia neste aparelho':'Progresso salvo neste aparelho'}</span><a href="https://www.dndbeyond.com/sources/dnd/basic-rules-2014" target="_blank" rel="noopener">Regras 2014</a></footer>`;}
  function home(){
    return `${head()}<main class="wrap home"><div class="page-intro"><p class="eyebrow">CÓDICE DE EVOLUÇÃO</p><h1>Escolha seu personagem</h1><p>${CLOUD.enabled?'Use o código individual para abrir a ficha compartilhada. As alterações aparecem para o mestre quando ele atualiza o painel.':'O próximo nível é aberto automaticamente. Até a nuvem ser configurada, as decisões ficam salvas neste aparelho.'}</p></div><div class="roster-grid">${CHARS.map(c=>`<button class="character-card" data-do="character" data-char="${c.id}" data-character="${c.id}" aria-label="Abrir ficha de ${esc(c.name)}, nível ${knownLevel(c)}">${portrait(c,'card-portrait')}<span class="card-shade"></span><span class="character-info"><span class="class-line">${classMark(c)}<small>${esc(SHEET[c.id].race)} · ${esc(c.cls)}</small></span><strong>${esc(c.name)}</strong><span>Jogador: ${esc(SHEET[c.id].player)}</span><span class="card-level"><small>NÍVEL ATUAL</small><strong>${knownLevel(c)}</strong></span></span><span class="card-arrow">→</span></button>`).join('')}</div><p class="quiet">Retratos fornecidos pelo mestre. <button class="text-button" data-do="credits">Créditos dos ícones</button></p></main>${foot()}`;
  }
  function unlock(){
    const c=charById(ui.pendingChar)||CHARS[0];
    let pending=false;try{pending=localStorage.getItem(`codice-pendente-${c.id}`)==='1';}catch{}
    return `${head()}<main class="wrap unlock"><button class="backlink" data-do="home">← Personagens</button><p class="eyebrow">FICHA COMPARTILHADA</p><h1>${esc(c.name)}</h1>${pending?`<div class="cloud-warning"><strong>Há alterações neste aparelho ainda não sincronizadas.</strong><p>Tente novamente com o código. Antes de atualizar ou limpar o navegador, salve uma cópia.</p><button class="secondary" data-do="export">EXPORTAR CÓPIA</button></div>`:''}<p>Digite o código que o mestre lhe passou. Este aparelho vai lembrar o código para as próximas visitas.</p><label>Código do personagem<input id="cloud-code" type="password" autocomplete="off" spellcheck="false" maxlength="40" placeholder="Código individual"></label><button class="primary" data-do="cloud-unlock">ABRIR FICHA ONLINE</button>${pending?`<button class="cloud-discard" data-do="cloud-use-online">Descartar mudanças deste aparelho e carregar a ficha online</button>`:''}</main>${foot()}`;
  }
  const ATTR_NAMES={FOR:'Força',DES:'Destreza',CON:'Constituição',INT:'Inteligência',SAB:'Sabedoria',CAR:'Carisma'};
  const BAG_SEED={
    lorelay:[['Rações',10],['Odre',1],['Corda (15 m)',1],['Foto dos pais',1],['Espelho das Mil Peles',1]],
    duki:[['Rações',5],['Odre',1],['Mapa da cidade',1],['Poção de cura',1],['Chave do Talvez',1]],
    milagres:[['Rações',5],['Odre',1],['Lembrança de admirador',1],['Pedra da sorte da família',1],['Pergaminho do Milagre',1]],
    joao:[['Rações',10],['Odre',1],['Poção de cura',1],['Moedas falsas',1000],['Cachimbo',1],['Gaita',1]],
    kiedis:[['Rações',10],['Odre',1],['Amuleto de pimenta-malagueta seca',1],['Poção de cura',1]],
    calebi:[['Rações',10],['Odre',1],['Dados',1],['Poção de cura',1],['Livro dos Pequenos Favores',1]]
  };
  const BAG_GEAR={
    lorelay:[['Armadilha de caça',1],['Troféu natural',1]],
    duki:[['Lanterna',1],['Óleo',1],['Corda (15 m)',1],['Faca pequena',1]],
    milagres:[],
    joao:[['Corda (15 m)',1],['Tochas',1],['Armadilha',1],['Caixinha de madeira',1],['Troféu natural',1]],
    kiedis:[['Corda (15 m)',1],['Tochas',1],['Lembrança de admirador',1]],
    calebi:[['Corda (15 m)',1],['Tochas',1],['Pederneira',1],['Martelo',1],['Pitões',1],['Pé de cabra',1]]
  };
  const BAG_DESCRIPTIONS={
    'Rações':'Comida de viagem. Reduza a quantidade quando consumir.',
    'Odre':'Recipiente para carregar água.',
    'Corda (15 m)':'Corda para escalar, prender ou atravessar obstáculos.',
    'Armadilha de caça':'Armadilha portátil para capturar uma criatura.',
    'Troféu natural':'Lembrança recolhida na natureza.',
    'Foto dos pais':'Retrato da família guardado na mochila.',
    'Lanterna':'Ilumina o caminho quando abastecida com óleo.',
    'Óleo':'Combustível para a lanterna; confira a quantidade restante.',
    'Mapa da cidade':'Ajuda a encontrar ruas e pontos conhecidos.',
    'Poção de cura':'Recupera 2d4 + 2 PV. Nesta mesa, tomar ou administrar usa ação bônus.',
    'Faca pequena':'Lâmina pequena para tarefas simples.',
    'Lembrança de admirador':'Recordação recebida de alguém que admira o personagem.',
    'Pedra da sorte da família':'Recordação de família levada na viagem.',
    'Tochas':'Fontes de luz portáteis; reduza a quantidade quando usar.',
    'Armadilha':'Equipamento para preparar uma armadilha.',
    'Caixinha de madeira':'Pequena caixa para guardar objetos.',
    'Moedas falsas':'Mil moedas que parecem ouro à primeira vista.',
    'Cachimbo':'Objeto pessoal do viajante.',
    'Gaita':'Instrumento musical portátil.',
    'Violão':'Instrumento de cordas que João leva pela estrada.',
    'Amuleto de pimenta-malagueta seca':'Amuleto pessoal feito com pimenta seca.',
    'Pederneira':'Produz faíscas para acender fogo.',
    'Dados':'Conjunto de dados para jogos.',
    'Martelo':'Ferramenta para bater pitões e realizar reparos.',
    'Pitões':'Pinos de metal para fixar cordas em superfícies.',
    'Pé de cabra':'Barra usada para forçar aberturas.'
  };
  function itemDescription(c,item){
    return item.description||BAG_DESCRIPTIONS[item.name]||(item.name===SHEET[c.id].item[0]?SHEET[c.id].item[1]:'Sem descrição. Use o lápis para adicionar uma.');
  }
  function itemIcon(name){
    if(/armadura|escudo/i.test(name))return 'shield';
    if(/instrumentos musicais|traje e tambor/i.test(name))return 'music';
    if(/equipamento de viagem|ferramentas/i.test(name))return 'tool';
    if(/armas|foco arcano|foco dru[ií]dico/i.test(name))return 'dagger';
    if(/po[cç][aã]o|cura/i.test(name))return 'heart';
    if(/ra[cç][oõ]es|comida|p[aã]o/i.test(name))return 'bread';
    if(/odre|[aá]gua|[oó]leo/i.test(name))return 'bottle';
    if(/corda/i.test(name))return 'rope';
    if(/moeda/i.test(name))return 'coin';
    if(/dados/i.test(name))return 'dice';
    if(/foto|retrato|imagem/i.test(name))return 'photo';
    if(/espelho|[oó]culos/i.test(name))return 'eye';
    if(/tocha|lanterna|pederneira|cachimbo/i.test(name))return 'flame';
    if(/gaita|viol[aã]o|ala[uú]de|tambor/i.test(name))return 'music';
    if(/mapa|livro|pergaminho/i.test(name))return 'book';
    if(/faca|rapieira|adaga|espada|arco/i.test(name))return 'dagger';
    if(/chave|armadilha|martelo|pit[oõ]es|p[eé] de cabra/i.test(name))return 'tool';
    if(/fruto|pimenta|natural/i.test(name))return 'leaf';
    if(/pedra|amuleto|lembran[cç]a/i.test(name))return 'star';
    return 'box';
  }
  const EQUIPPED={
    lorelay:[['Armadura de couro','Escudo de madeira'],['Cimitarra','Bastão','Foco druídico'],['Roupas de viajante'],['Armadilha de caça','Troféu natural']],
    duki:[['Armadura de couro'],['Rapieira','Arco curto e 20 flechas','2 adagas'],['Ferramentas de ladrão','Faca pequena'],['Roupas','Pulseira da mãe'],['Camundongo (companheiro)'],['Lanterna','Óleo','Corda (15 m)']],
    milagres:[['Armadura de couro'],['Rapieira','Adaga'],['Alaúde','Tambor'],['Traje de artista']],
    joao:[['Armadura de couro'],['2 espadas curtas','Arco longo e 20 flechas','Bastão'],['Roupas de viagem','Violão'],['Corda (15 m)','Tochas','Armadilha'],['Caixinha de madeira','Troféu natural']],
    kiedis:[['Bastão','10 dardos'],['Traje de artista','Tambor'],['Corda (15 m)','Tochas'],['Lembrança de admirador']],
    calebi:[['Armadura de couro'],['Besta leve e 20 virotes','Bordão','2 adagas','Foco arcano'],['Ferramentas de ladrão'],['Roupas escuras','Sobretudo vinho','Óculos amarelos'],['Moeda com bulldog'],['Corda (15 m)','Tochas','Pederneira','Martelo','Pitões','Pé de cabra']]
  };
  const GEAR_SET_NAMES={
    lorelay:['Armadura e escudo','Armas e foco druídico','Roupas de viajante','Pertences naturais'],
    duki:['Armadura de couro','Armas de Duki','Ferramentas e faca','Roupas e pulseira','Camundongo (companheiro)','Equipamento de viagem'],
    milagres:['Armadura de couro','Armas de Milagres','Instrumentos musicais','Traje de artista'],
    joao:['Armadura de couro','Armas de João','Roupas e violão','Equipamento de viagem','Caixa e troféu'],
    kiedis:['Bastão e dardos','Traje e tambor','Equipamento de viagem','Lembrança de admirador'],
    calebi:['Armadura de couro','Armas e foco arcano','Ferramentas de ladrão','Roupas e acessórios','Moeda com bulldog','Equipamento de viagem']
  };
  function gearSet(c,group,index){
    const seed=new Set(BAG_SEED[c.id].map(([name])=>name.toLocaleLowerCase('pt-BR')));
    const names=group.filter(name=>!seed.has(name.toLocaleLowerCase('pt-BR')));
    if(!names.length)return null;
    return names.length===1?{name:names[0],qty:1}:{name:GEAR_SET_NAMES[c.id][index],qty:1,description:`Contém: ${names.join(', ')}.`};
  }
  function bagDefault(c){
    const entries=[...BAG_SEED[c.id].map(([name,qty])=>({name,qty})),...EQUIPPED[c.id].map((group,index)=>gearSet(c,group,index)).filter(Boolean)];
    return [...new Map(entries.map(item=>[item.name.toLocaleLowerCase('pt-BR'),item])).values()];
  }
  function bagCapacity(c){return c.id==='kiedis'?Infinity:bagDefault(c).length>8?14:8;}
  function inventoryFor(c){
    if(!Array.isArray(state.inventory[c.id])){state.inventory[c.id]=bagDefault(c);state.inventoryVersion[c.id]=4;persist();}
    else if((state.inventoryVersion[c.id]||0)<4){
      const bag=state.inventory[c.id],seed=new Set(BAG_SEED[c.id].map(([name])=>name.toLocaleLowerCase('pt-BR')));
      EQUIPPED[c.id].forEach((group,index)=>{
        const names=group.filter(name=>!seed.has(name.toLocaleLowerCase('pt-BR')));
        if(names.length<2)return;
        const combined=gearSet(c,group,index);
        if(bag.some(item=>item.name===combined.name))return;
        const positions=names.map(name=>bag.findIndex(item=>item.name.toLocaleLowerCase('pt-BR')===name.toLocaleLowerCase('pt-BR')&&Number(item.qty)===1&&!item.description));
        if(positions.some(position=>position<0))return;
        const first=Math.min(...positions);
        positions.sort((a,b)=>b-a).forEach(position=>bag.splice(position,1));
        bag.splice(first,0,combined);
      });
      state.inventoryVersion[c.id]=4;persist();
    }
    return state.inventory[c.id];
  }
  function backpack(c){
    const bag=inventoryFor(c),unlimited=c.id==='kiedis',limit=bagCapacity(c);
    const editing=ui.inventoryEdit?.char===c.id?ui.inventoryEdit.index:-1;
    const slots=unlimited?Math.max(30,bag.length+1):limit;
    const adding=ui.inventoryAdding?.char===c.id?ui.inventoryAdding.index:-1;
    const rows=Array.from({length:slots},(_,i)=>{
      const item=bag[i],number=`<span class="pack-row-number">${String(i+1).padStart(2,'0')}</span>`;
      if(editing===i)return `<li class="pack-row pack-row-edit">${number}<input id="inventory-edit-name" maxlength="70" value="${esc(item.name)}" aria-label="Nome do item"><input id="inventory-edit-amount" type="number" min="1" max="999999" step="1" value="${esc(item.qty)}" aria-label="Quantidade"><button data-do="inventory-save" data-index="${i}">Salvar</button><button data-do="inventory-cancel">Cancelar</button><label class="pack-description-field">Descrição curta<input id="inventory-edit-description" maxlength="160" value="${esc(item.description||BAG_DESCRIPTIONS[item.name]||'')}" placeholder="Até duas linhas"></label></li>`;
      if(item){const opened=ui.inventoryOpen?.char===c.id&&ui.inventoryOpen.name===item.name;return `<li class="pack-row ${opened?'pack-row-open':''}">${number}<button class="pack-item-open" data-do="inventory-toggle" data-name="${esc(item.name)}" aria-expanded="${opened}" aria-label="${opened?'Ocultar':'Ver'} descrição de ${esc(item.name)}"><span class="pack-item-icon">${icon(itemIcon(item.name),18)}</span><strong>${esc(item.name)}</strong><span class="pack-qty">× ${esc(item.qty)}</span></button><button class="pack-edit" data-do="inventory-edit" data-index="${i}" title="Editar ${esc(item.name)}" aria-label="Editar ${esc(item.name)}">✎</button><button class="pack-remove" data-do="inventory-remove" data-index="${i}" title="Remover ${esc(item.name)}" aria-label="Remover ${esc(item.name)}">×</button>${opened?`<p class="pack-description" tabindex="0" role="region" aria-label="Descrição de ${esc(item.name)}">${esc(itemDescription(c,item))}</p>`:''}</li>`;}
      if(adding===i)return `<li class="pack-row pack-row-adding">${number}<div class="pack-add-form"><label>Item<input id="inventory-name" maxlength="70" placeholder="Nome do item"></label><label>Qtd.<input id="inventory-amount" type="number" min="1" max="999999" step="1" value="1"></label><button data-do="inventory-add">Salvar</button><button data-do="inventory-hide-add">Cancelar</button><label class="pack-description-field">Descrição curta<input id="inventory-description" maxlength="160" placeholder="O que é ou para que serve"></label></div></li>`;
      return `<li class="pack-row pack-row-empty">${number}<button class="pack-plus" data-do="inventory-show-add" data-index="${i}"><span aria-hidden="true">+</span> Adicionar item</button></li>`;
    }).join('');
    const campaignOpen=ui.campaignOpen===c.id;
    return `<section class="backpack ${unlimited?'backpack-unlimited':''}"><div class="backpack-head"><div><p class="eyebrow">ITENS DE ${esc(c.name.toLocaleUpperCase('pt-BR'))}</p><h2>${unlimited?'Mochila do Esquecimento':'Mochila'}</h2></div><div class="backpack-capacity"><strong>${unlimited?'∞':`${bag.length} / ${limit}`}</strong><span>espaços ocupados</span></div></div><div class="backpack-frame"><div class="backpack-emblem"><img src="assets/icons/backpack.svg" alt="" aria-hidden="true" onerror="this.hidden=true"><span aria-hidden="true">🎒</span></div><div class="pack-paper-head"><div class="pack-title"><strong>Conteúdo da mochila</strong><button class="campaign-toggle" data-do="campaign-toggle" aria-label="${campaignOpen?'Ocultar':'Ver'} item da campanha" aria-expanded="${campaignOpen}" title="Item da campanha">${icon('star',21)}</button></div><span>${unlimited?'Mochila mágica':`${Math.max(0,limit-bag.length)} ${limit-bag.length===1?'espaço livre':'espaços livres'}`}</span></div>${campaignOpen?`<div class="campaign-reveal"><small>ITEM DA CAMPANHA</small><strong>${esc(SHEET[c.id].item[0])}</strong><p>${esc(SHEET[c.id].item[1])}</p></div>`:''}<ol class="pack-list ${unlimited?'pack-list-scroll':''}">${rows}</ol></div><p class="backpack-help">Toque no item para ver sua descrição. O lápis edita nome, quantidade e descrição; o X remove.</p></section>`;
  }
  function combatOverview(c){
    const level=knownLevel(c),action=[],bonus=[];
    const add=(list,name,note)=>list.push({name,note});
    if(c.id==='lorelay'){
      if(level>=2){
        const moon=has('lorelay-2-1','Círculo da Lua');
        add(moon?bonus:action,'Forma Selvagem',`Transforme-se em uma das formas escolhidas; 2 usos por descanso curto ou longo. ${moon?'Círculo da Lua: transformação como ação bônus.':'Transformação como ação.'} ${level>=4?'A quinta forma já está disponível; formas aquáticas permitidas, sem voo.':'Ainda sem voo ou natação.'}`);
        add(bonus,'Reverter Forma Selvagem','Volte à forma normal antes do fim da transformação.');
        if(moon)add(bonus,'Cura na Forma Selvagem','Enquanto transformada, gaste 1 espaço de magia para recuperar 1d8 PV por nível do espaço.');
      }
    }
    if(c.id==='duki'){
      add(action,'Rapieira ou arco curto',`Faça um ataque com a rapieira (arma de acuidade) ou o arco curto (arma à distância). Se acertar, some ${level>=3?'2d6':'1d6'} de Ataque Furtivo uma vez por turno quando tiver vantagem na jogada de ataque. Também vale sem vantagem se outro inimigo do alvo estiver a até 1,5 m dele, não estiver incapacitado e você não tiver desvantagem. O dano extra não gasta outra ação.`);
      if(level>=2){
        add(bonus,'Disparar · Ação Ardilosa','Ganhe deslocamento extra igual à sua velocidade neste turno.');
        add(bonus,'Desengajar · Ação Ardilosa','Seu movimento não provoca ataques de oportunidade neste turno.');
        add(bonus,'Esconder-se · Ação Ardilosa','Faça um teste de Destreza (Furtividade) para tentar se ocultar.');
      }
      if(level>=3&&has('duki-3-1','Ladrão'))add(bonus,'Mãos Rápidas','Use Prestidigitação, ferramentas de ladrão em tranca/armadilha ou Usar um Objeto por Ação Ardilosa.');
      if(level>=3&&has('duki-3-1','Trapaceiro Arcano'))add(bonus,'Mão Mágica aprimorada','Controle a mão para manipular objeto leve, desarmar armadilha, abrir fechadura ou furtar, segundo o arquétipo.');
    }
    if(c.id==='milagres'){
      add(bonus,'Inspiração de Bardo','Dê 1d6 a aliado que possa ouvir você a até 18 m; ele soma o dado a teste, ataque ou resistência em até 10 minutos.');
    }
    if(c.id==='joao'){
      add(action,'Arco longo ou espada curta','Faça um ataque com a arma escolhida. Ao atacar com espada curta, pode abrir a opção da segunda arma.');
      add(bonus,'Ataque com segunda espada',`Depois de Atacar com uma arma leve em uma mão, ataque com a outra. ${level>=2&&has('joao-2-1','Duas Armas')?'Seu Estilo de Luta soma o modificador de Destreza ao dano.':'Sem o Estilo de Luta Duas Armas, o dano não soma o modificador de atributo.'}`);
      if(level>=3&&has('joao-3-1','Mestre das Feras'))add(action,'Comandar companheiro','Use sua ação para ordenar que a fera ataque, Dispare, Desengaje, Esquive ou Ajude, conforme a regra de 2014.');
    }
    if(c.id==='kiedis'){
      add(action,'Bastão ou golpe desarmado','Faça um ataque. Artes Marciais permite usar Destreza e o dado marcial de monge.');
      add(bonus,'Golpe desarmado de Artes Marciais','Após usar Atacar com ataque desarmado ou arma de monge, faça um golpe desarmado.');
      if(level>=2){
        add(bonus,'Rajada de Golpes','Após Atacar, gaste 1 ki para fazer dois golpes desarmados.');
        add(bonus,'Defesa Paciente','Gaste 1 ki para Esquivar.');
        add(bonus,'Passo do Vento','Gaste 1 ki para Disparar ou Desengajar; sua distância de salto dobra neste turno.');
      }
    }
    for(const [name] of spellRowsFor(c)){
      const timing=spellTiming(name);
      if(timing!=='action'&&timing!=='bonus')continue;
      let note=spellNote(name);
      if(c.id==='lorelay'&&!['Arte Druídica','Produzir Chamas'].includes(name))note+=' Use apenas se estiver preparada após descanso longo.';
      if(c.id==='calebi'&&name==='Rajada Mística'){
        if(has('calebi-2-1','Rajada Agonizante'))note+=' Some seu modificador de Carisma ao dano de cada acerto.';
        if(has('calebi-2-1','Rajada Repulsiva'))note+=' Cada acerto pode empurrar o alvo 3 m.';
        if(has('calebi-2-1','Lança Mística'))note+=' Alcance aumentado para 90 m.';
      }
      add(timing==='bonus'?bonus:action,`Conjurar: ${name}`,note);
    }
    if(c.id==='calebi'&&level>=2){
      const invocations=steps(c,2).find(s=>s.id==='calebi-2-1')?.items||[];
      for(const name of selected('calebi-2-1')){
        if(!ACTION_INVOCATIONS.has(name))continue;
        add(action,`Invocação: ${name}`,invocations.find(item=>item[0]===name)?.[1]||'Consulte a descrição da invocação na ficha.');
      }
    }
    const commonBonus=[
      ['Tomar ou administrar poção','Regra da mesa: gaste sua ação bônus. Uma poção de cura comum recupera 2d4 + 2 PV.'],
      ['Estabilizar alguém caído','Regra da mesa: gaste sua ação bônus e faça Sabedoria (Medicina) CD 10. Se passar, a pessoa fica estável com 0 PV, sem acordar.'],
      ['Lutar com duas armas','Depois de Atacar com arma leve corpo a corpo em uma mão, ataque com outra arma leve na outra. Sem habilidade específica, não some o modificador positivo ao dano desse segundo ataque.']
    ];
    const common=[
      ['Atacar','Escolha um alvo e faça a jogada de ataque: d20 + modificador do atributo + proficiência, se souber usar a arma. Se igualar ou superar a CA, role o dano. Agarrar ou empurrar pode substituir um ataque.'],
      ['Disparar','Ganhe deslocamento extra igual à sua velocidade neste turno.'],
      ['Desengajar','Seu movimento não provoca ataques de oportunidade neste turno.'],
      ['Esquivar','Até seu próximo turno, ataques de criaturas que você vê têm desvantagem; você tem vantagem em resistências de Destreza.'],
      ['Ajudar','Dê vantagem ao próximo teste de um aliado ou ao primeiro ataque dele contra inimigo ao seu alcance.'],
      ['Esconder-se','Tente um teste de Destreza (Furtividade); é preciso poder se ocultar.'],
      ['Usar um Objeto','Use um item que exige ação ou uma segunda interação com objeto no turno.'],
      ['Empurrar','Substitua um ataque por Força (Atletismo) contestada; derrube ou empurre 1,5 m.'],
      ['Improvisar','Descreva outra tentativa; o mestre decide se é possível e qual teste se aplica.']
    ];
    const rows=(personal,general,kind)=>[
      ...(kind==='action'?[{name:'Improvisar',note:'Descreva o que você quer tentar; o mestre diz qual teste fazer.',origin:'PRIMEIRO, IMAGINE SUA AÇÃO'}]:[]),
      ...personal.map(({name,note,origin})=>({name,note,origin:origin||'DA FICHA',personal:true})),
      ...general.filter(([name])=>name!=='Improvisar').map(([name,note])=>({name,note,origin:'REGRA GERAL'}))
    ].map(({name,note,origin,personal})=>`<li class="combat-table-row ${personal?'combat-personal':''}"><div class="combat-row-head"><span class="combat-row-icon">${icon(optionIcon(name),21)}</span><strong>${esc(name)}</strong>${timingBadge(kind)}</div><p>${esc(note)}</p><span class="combat-origin">${esc(origin)}</span></li>`).join('');
    const table=(kind,title,subtitle,personal,general)=>`<section id="combat-panel-${kind}" class="combat-table combat-table-${kind}" aria-label="${title}" ${ui.combatPanel===kind?'':'hidden'}><p class="combat-panel-intro">${subtitle}</p><ul>${rows(personal,general,kind)}</ul></section>`;
    const toggle=(kind,title,symbol,count)=>`<button class="combat-toggle combat-toggle-${kind} ${ui.combatPanel===kind?'active':''}" type="button" data-do="combat-toggle" data-kind="${kind}" aria-expanded="${ui.combatPanel===kind}" aria-controls="combat-panel-${kind}"><span class="combat-toggle-symbol">${icon(symbol,30)}</span><span><strong>${title}</strong><small>${count} opções · toque para ${ui.combatPanel===kind?'fechar':'abrir'}</small></span><span class="combat-toggle-arrow" aria-hidden="true">${ui.combatPanel===kind?'−':'+'}</span></button>`;
    const commonBonusForChar=commonBonus.filter(([name])=>!(c.id==='joao'&&name==='Lutar com duas armas'));
    return `<section class="combat-overview" aria-label="Opções de combate"><div class="combat-toggles">${toggle('action','AÇÃO','dagger',action.length+common.length)}${toggle('bonus','AÇÃO BÔNUS','spark',bonus.length+commonBonusForChar.length)}</div><div class="combat-tables">${table('action','Ações','O que você pode fazer com sua ação.',action,common)}${table('bonus','Ações bônus','Use no máximo uma por turno.',bonus,commonBonusForChar)}</div><p class="combat-movement">Você também pode se mover até sua velocidade e interagir brevemente com um objeto, como sacar uma arma. Erguer-se do chão gasta metade do deslocamento.</p></section>`;
  }
  function notesPanel(c){
    const notes=notesFor(c.id),editing=ui.noteEditor?.char===c.id;
    const editor=editing?`<div class="note-editor"><label for="note-text">${ui.noteEditor.id?'Editar anotação':'Nova anotação'}</label><textarea id="note-text" maxlength="4000" rows="6" placeholder="Escreva pistas, planos, nomes ou lembretes da sessão...">${esc(ui.noteDraft)}</textarea><div class="note-editor-actions"><button class="primary" data-do="note-save">SALVAR ANOTAÇÃO</button><button class="secondary" data-do="note-cancel">CANCELAR</button></div></div>`:'';
    return `<section class="notes-panel" aria-labelledby="notes-heading"><div class="notes-head"><div><span class="notes-icon">${icon('book',27)}</span><div><p class="eyebrow">CADERNO DE ${esc(c.name.toLocaleUpperCase('pt-BR'))}</p><h3 id="notes-heading">Anotações</h3></div></div><span>${notes.length} ${notes.length===1?'anotação':'anotações'}</span></div><p class="notes-intro">Registre o que quiser lembrar da aventura. Cada anotação fica salva na ficha deste personagem.</p>${!editing?`<button class="notes-add" data-do="note-add">+ ADICIONAR ANOTAÇÃO</button>`:''}${editor}<div class="notes-list">${notes.length?notes.map((note,index)=>`<article class="note-card"><div class="note-card-head"><small>ANOTAÇÃO ${String(index+1).padStart(2,'0')}</small><div><button data-do="note-edit" data-id="${esc(note.id)}" aria-label="Editar anotação ${index+1}">Editar</button><button class="note-delete" data-do="note-remove" data-id="${esc(note.id)}" aria-label="Excluir anotação ${index+1}">Excluir</button></div></div><p>${esc(note.text)}</p></article>`).join(''):'<p class="notes-empty">Nenhuma anotação ainda. Adicione pistas, planos ou lembranças da sessão.</p>'}</div></section>`;
  }
  const SPELL_ICONS=window.CODEX_SPELL_ICONS||{};
  const SPELL_SEED={
    lorelay:[['Arte Druídica','TRUQUE'],['Produzir Chamas','TRUQUE'],['Palavra Curativa','MAGIA NÍVEL 1'],['Emaranhar','MAGIA NÍVEL 1']],
    milagres:[['Zombaria Viciosa','TRUQUE'],['Prestidigitação','TRUQUE'],['Palavra Curativa','MAGIA NÍVEL 1'],['Fogo das Fadas','MAGIA NÍVEL 1'],['Sono','MAGIA NÍVEL 1'],['Onda Trovejante','MAGIA NÍVEL 1']],
    calebi:[['Rajada Mística','TRUQUE'],['Ilusão Menor','TRUQUE'],['Luzes Dançantes','TRUQUE'],['Hex','MAGIA NÍVEL 1'],['Repreensão Infernal','MAGIA NÍVEL 1']],
    kiedis:[['Taumaturgia','TRUQUE']]
  };
  const SPELL_NOTES={
    'Arte Druídica':'Pequenos sinais da natureza: prever o tempo, acender ou apagar uma chama pequena, fazer florescer um broto.',
    'Produzir Chamas':'Crie luz por até 10 minutos. Você pode arremessar a chama a até 9 m com ataque mágico à distância; acerto causa 1d8 de fogo.',
    'Palavra Curativa':'Cure uma criatura que você vê a até 18 m em 1d4 + modificador de conjuração. Gasta espaço de magia de nível 1 ou superior.',
    'Emaranhar':'Raízes prendem criaturas em área de 6 m; quem falhar em resistência de Força fica restringido. Exige concentração.',
    'Zombaria Viciosa':'Alvo que ouve você a até 18 m faz resistência de Sabedoria; falha causa 1d4 psíquico e desvantagem no próximo ataque.',
    'Prestidigitação':'Pequenos truques sensoriais, limpeza, aquecimento ou marcas temporárias; sem dano.',
    'Rajada Mística':'Ataque mágico à distância a até 36 m; acerto causa 1d10 de energia. Invocações podem melhorar o efeito.',
    'Hex':'Amaldiçoe uma criatura: seus ataques causam +1d6 necrótico nela. Exige concentração.',
    'Ilusão Menor':'Crie um som ou uma imagem pequena por até 1 minuto; não causa dano.',
    'Taumaturgia':'Produza um sinal sobrenatural simples, como voz estrondosa, tremor ou mudança na aparência dos olhos.',
    'Luzes Dançantes':'Crie até quatro luzes pequenas; exige concentração e pode movê-las.',
    'Repreensão Infernal':'Quando sofrer dano de uma criatura que vê, use sua reação; ela faz resistência de Destreza contra dano de fogo.'
  };
  function spellIcon(name){return SPELL_ICONS[clean(name)]?`<img src="${SPELL_ICONS[clean(name)]}" alt="" loading="lazy">`:choiceArt(name);}
  const CREATURE_ICONS={'Lobo':409,'Pantera':411,'Javali':429,'Texugo Gigante':358,'Aranha-lobo Gigante':384,'Sapo Gigante':457,'Mastim':412,'Rato Gigante':452,'Doninha Gigante':445,'Caranguejo Gigante':228,'Gato':437,'Lagarto Gigante':295,'Alce':280,'Ave-bico-de-machado':410,'Urso-pardo':413,'Lobo Terrível':379,'Leão':186,'Tigre':185,'Aranha Gigante':384};
  function creatureIcon(name){const n=CREATURE_ICONS[name];return n===undefined?choiceArt(name):`<img src="assets/bg3/tile${String(n).padStart(3,'0')}.png" alt="" loading="lazy">`;}
  function spellNote(name){
    if(SPELL_NOTES[name])return SPELL_NOTES[name];
    if(BONUS_SPELL_DETAILS[name])return BONUS_SPELL_DETAILS[name].note;
    for(const ch of DATA)for(const section of ch.sections)for(const item of section.items||[])if(clean(item[0])===name&&item[1])return item[1];
    return 'Confira alcance, componentes, duração e efeito na descrição da magia antes de usar.';
  }
  function spellTiming(name){return BONUS_SPELLS.has(name)?'bonus':REACTION_SPELLS.has(name)?'reaction':MINUTE_SPELLS.has(name)?'minute':HOUR_SPELLS.has(name)?'hour':'action';}
  function spellRowsFor(c){
    const level=knownLevel(c),rows=[...(SPELL_SEED[c.id]||[])];
    if(c.id==='kiedis'&&level>=3)rows.push(['Repreensão Infernal','MAGIA RACIAL']);
    if(c.id==='duki'&&level>=3&&has('duki-3-1','Trapaceiro Arcano'))rows.push(['Mãos Mágicas','TRUQUE']);
    for(let n=2;n<=level;n++)for(const step of steps(c,n).filter(s=>s.kind==='spell'))for(const pick of selected(step.id))rows.push([clean(pick),spellCircle(step,[pick])==='Truque'?'TRUQUE':`MAGIA ${spellCircle(step,[pick]).toUpperCase()}`]);
    for(let n=2;n<=level;n++){const swap=state.swaps[swapId(c,n)];if(swap?.enabled&&swap.old&&swap.next){const at=rows.findIndex(x=>x[0]===swap.old);if(at>=0)rows.splice(at,1);rows.push([swap.next,'MAGIA TROCADA']);}}
    return [...new Map(rows.map(row=>[row[0],row])).values()];
  }
  function spellbook(c){
    const rows=spellRowsFor(c);if(!rows.length)return '';
    const opened=ui.spellbookOpen===c.id;
    return `<section class="spellbook"><button class="spellbook-trigger" data-do="spellbook-toggle" aria-expanded="${opened}" aria-controls="spellbook-list"><span class="spellbook-glyph">${icon('book',35)}</span><span><small>GRIMÓRIO</small><strong>Magias de ${esc(c.name)}</strong><em>${rows.length} ${rows.length===1?'magia':'magias'} · toque para ${opened?'fechar':'abrir'}</em></span><span class="spellbook-spark" aria-hidden="true">✦</span></button><div id="spellbook-list" class="spellbook-list" ${opened?'':'hidden'}><p>O marcador em cada magia mostra quando usá-la.${c.id==='lorelay'?' Magias de druida precisam estar preparadas após descanso longo.':''}</p><div class="spell-grid">${rows.map(([name,circle])=>`<article class="spell-card"><span class="spell-card-art">${spellIcon(name)}</span><div><small>${esc(circle)}</small><h4>${esc(name)}</h4>${timingBadge(spellTiming(name))}${['Esfera Flamejante','Esquentar Metal'].includes(name)?timingBadge('bonus'):''}<p>${esc(spellNote(name))}</p></div></article>`).join('')}</div>${c.id==='lorelay'?'<p class="spellbook-caveat">Lorelay prepara suas magias após descanso longo. Confirme na ficha quais estão preparadas hoje.</p>':''}</div></section>`;
  }
  function creatureProfile(c){
    const entries=[];
    if(c.id==='joao'&&knownLevel(c)>=3){const name=state.beasts['joao-3-beast']?.name,animal=CREATURES.companion.find(x=>x[0]===name);if(animal)entries.push(['COMPANHEIRA ANIMAL',animal]);}
    if(c.id==='lorelay'&&knownLevel(c)>=2){for(const name of selected('lorelay-2-wild')){const animal=CREATURES.wild.find(x=>x[0]===name);if(animal)entries.push(['FORMA SELVAGEM',animal]);}if(knownLevel(c)>=4)for(const name of selected('lorelay-4-special')){const animal=CREATURES.special.find(x=>x[0]===name);if(animal)entries.push(['QUINTA FORMA',animal]);}}
    if(!entries.length)return '';
    return `<section class="creature-profile"><h3>${c.id==='joao'?'Companheira de João':'Formas de Lorelay'}</h3><div class="creature-profile-grid">${entries.map(([kind,[name,ac,hp,attack,bonus,extra]])=>`<article><small>${kind}</small><h4>${esc(name)}</h4><strong>CA ${ac} · PV ${hp}</strong><p><b>AÇÃO</b> ${esc(attack)}</p><p><b>AÇÃO BÔNUS</b> ${esc(bonus)}</p>${extra?`<p>${esc(extra)}</p>`:''}</article>`).join('')}</div><p class="rule-note">✦ indica uma regra desta campanha.</p></section>`;
  }
  function tipsPanel(c){
    const level=knownLevel(c),tips={
      lorelay:['Sua ancestralidade feérica dá vantagem em resistências contra ser enfeitiçada.','Depois de descansar, confira quais magias de druida preparou.',...(level>=2?['Forma Selvagem tem 2 usos por descanso curto ou longo. Consulte aqui as formas escolhidas.']:[]),...(level>=4?['A quinta forma especial já está liberada. Anote-a junto às outras quatro.']:[])],
      duki:['Ataque Furtivo acrescenta dano uma vez por turno quando você cumpre as condições; ele não é uma ação separada.',...(level>=2?['Ação Ardilosa permite Disparar, Desengajar ou Esconder-se como ação bônus.']:[]),'Suas ferramentas de ladrão estão na mochila.'],
      milagres:['Inspiração de Bardo é uma ação bônus; o aliado usa o dado depois, quando precisar.',...(level>=3?['Especialização dobra seu bônus de proficiência nas perícias escolhidas.']:[]),'Seu grimório reúne as magias e o tempo de conjuração de cada uma.'],
      joao:['Explore trilhas e procure sinais antes de entrar em combate.',...(level>=2?['Confira seu Estilo de Luta antes de calcular ataques.']:[]),...(level>=3?['Se escolheu Mestre das Feras, o bloco da companheira aparece na ficha.']:[])],
      kiedis:['Artes Marciais permite usar Destreza com golpes e armas de monge.',...(level>=2?['Ki volta após descanso curto ou longo; Rajada de Golpes, Defesa Paciente e Passo do Vento usam ação bônus.']:[]),'A Mochila do Esquecimento guarda itens sem limite de espaços.'],
      calebi:['Seus espaços de magia de bruxo voltam após descanso curto ou longo.','Confira invocações e pacto sempre que subir de nível.',...(level>=3?['O pacto escolhido pode mudar seu estilo de combate ou ampliar seus truques.']:[])]
    }[c.id]||[];
    return `<section class="tips-panel"><div class="tips-head">${icon('book',26)}<div><p class="eyebrow">CADERNO DE ${esc(c.name.toLocaleUpperCase('pt-BR'))}</p><h3>Dicas para a mesa</h3></div></div><ul>${tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><p>Use seu caderno de papel para pistas, planos e acontecimentos da sessão.</p></section>`;
  }
  function invocationPanel(c){
    if(c.id!=='calebi'||knownLevel(c)<2)return '';
    const step=steps(c,2).find(s=>s.id==='calebi-2-1');
    const picked=selected('calebi-2-1');
    if(!step||!picked.length)return '';
    return `<section class="invocation-panel" aria-labelledby="invocation-heading"><div class="invocation-head"><span class="invocation-seal">${icon('spark',28)}</span><div><p class="eyebrow">PACTO · NÍVEL 2</p><h3 id="invocation-heading">Invocações Místicas</h3></div></div><div class="invocation-grid">${picked.map(name=>{const description=step.items.find(item=>clean(item[0])===clean(name))?.[1]||'';return `<article class="invocation-card"><span class="invocation-art">${choiceArt(name)}</span><div><h4>${esc(clean(name))}</h4>${timingBadge(choiceTiming(step,name,description))}<p>${esc(description)}</p></div></article>`;}).join('')}</div></section>`;
  }
  function profile(c){
    const n=nextLevel(c),s=SHEET[c.id],currentHp=knownLevel(c)===1?chapter(c,2).hp_before:hpAfter(c,knownLevel(c));
    const currentStats=afterStats(c,knownLevel(c));
    const currentAc=s.ac+mod(currentStats.DES)-mod(c.stats.DES)+(c.id==='kiedis'?mod(currentStats.SAB)-mod(c.stats.SAB):0)+(c.id==='joao'&&knownLevel(c)>=2&&has('joao-2-1','Defesa')?1:0);
    const currentSpeed=c.id==='kiedis'&&knownLevel(c)>=2?'12 m':s.speed;
    const statItems=[['PV MÁXIMOS',currentHp,'vital-hp',knownLevel(c)>1?'changed-hp':''],['CLASSE DE ARMADURA',currentAc,'',currentAc!==s.ac?'changed-choice':''],['DESLOCAMENTO',currentSpeed,'',currentSpeed!==s.speed?'changed-feature':''],['PROFICIÊNCIA','+2','','']];
    return `${head()}<main class="wrap profile"><button class="backlink" data-do="home">← Personagens</button><div class="profile-intro"><div class="profile-card" data-character="${c.id}">${portrait(c,'profile-portrait')}<div class="card-shade"></div><div class="profile-card-info"><div class="class-line">${classMark(c)}<p class="eyebrow">${esc(s.race)} · ${esc(c.cls)}</p></div><h1>${esc(c.name)}</h1><p>Jogador: ${esc(s.player)}</p><div class="level-mark"><span>NÍVEL ATUAL</span><strong>${knownLevel(c)}</strong></div></div></div><aside class="character-story" aria-label="História de ${esc(c.name)}"><p class="eyebrow">A HISTÓRIA DE ${esc(c.name.toLocaleUpperCase('pt-BR'))}</p><h2>Antes da ilha</h2><p>${esc(BIOGRAPHIES[c.id])}</p></aside></div>${CLOUD.enabled?`<div class="cloud-strip"><span>${cloudDirty.has(c.id)||cloudBusy.has(c.id)||cloudSessions[c.id]?.blocked?"Alterações pendentes de sincronização":"Ficha online · atualizada"}</span><button data-do="cloud-refresh">Atualizar ficha</button></div>`:""}${n?`<div class="hold-area"><button class="hold-button" id="hold-level" type="button" aria-label="Segure para subir ao nível ${n}"><svg class="hold-die" viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M50 7 87 28v44L50 93 13 72V28L50 7Z"/><path d="M50 7 13 72h74L50 7Zm-37 21 37 65 37-65M13 28h74"/></svg><span>SEGURE PARA</span><b>SUBIR DE NÍVEL</b><i></i></button></div>`:`<div class="finished-note">Todas as evoluções disponíveis neste códice foram concluídas.</div>`}<section class="sheet-section"><div class="section-title"><h2>Ficha atual</h2><span>Nível ${knownLevel(c)}</span></div><div class="sheet-vitals">${statItems.map(([label,value,kind,change])=>`<div class="sheet-vital ${kind} ${change}"><small>${label}</small><strong>${value}</strong></div>`).join('')}</div><div class="sheet-subheading"><h3>Atributos</h3><span>Valor · modificador</span></div><div class="sheet-abilities">${Object.entries(currentStats).map(([key,val])=>`<div class="sheet-ability ${val!==c.stats[key]?'changed-choice':''}"><span><b>${key}</b><small>${ATTR_NAMES[key]}</small></span><strong>${val}</strong><em>${signed(mod(val))}</em></div>`).join('')}</div>${Object.entries(currentStats).some(([key,val])=>val!==c.stats[key])?'<p class="attribute-legend"><span aria-hidden="true"></span>Em rosa: atributo aumentado em relação à ficha inicial.</p>':''}${spellbook(c)}${invocationPanel(c)}${combatOverview(c)}${creatureProfile(c)}${backpack(c)}${notesPanel(c)}${tipsPanel(c)}</section></main>${foot()}`;
  }
  function asiText(c,s){const a=state.asi[s.id];return validAsi(a,c)?(a.mode==='two'?`+2 ${a.first}`:`+1 ${a.first} e +1 ${a.second}`):'';}
  function swapId(c,l){return `${c.id}-${l}-swap`;}
  function canSwap(c,l){return (['milagres','calebi'].includes(c.id)&&l>=2)||(c.id==='joao'&&l>=3)||(c.id==='duki'&&l===4&&has('duki-3-1','Trapaceiro Arcano'));}
  function knownBefore(c,l){
    const names=[];
    if(c.id==='milagres')names.push('Palavra Curativa','Fogo das Fadas','Sono','Onda Trovejante');
    if(c.id==='calebi')names.push('Hex','Repreensão Infernal');
    for(let level=2;level<l;level++){
      steps(c,level).filter(s=>s.kind==='spell'&&!/truque/i.test(s.title)).forEach(s=>selected(s.id).forEach(n=>names.push(clean(n))));
      const swap=state.swaps[swapId(c,level)]||{};
      if(swap.enabled&&swap.old&&swap.next){const i=names.indexOf(swap.old);if(i>=0)names.splice(i,1);names.push(swap.next);}
    }
    return [...new Set(names)];
  }
  function spellsThisLevel(c,l){return steps(c,l).filter(s=>s.kind==='spell'&&!/truque/i.test(s.title)).flatMap(s=>selected(s.id).map(clean));}
  function swapOptions(c,l){
    const list=[];
    for(let level=2;level<=l;level++){
      const ch=chapter(c,level);
      ch.sections.forEach((s,index)=>{
        if(c.id==='duki'&&level===3&&index===3)return;
        if(c.id==='duki'&&level===4&&index===3){list.push(...s.items.map(x=>x[0]));return;}
        if(['spells','conditional_spells'].includes(s.kind)&&!/truque/i.test(s.title))list.push(...s.items.map(x=>x[0]));
      });
    }
    if(c.id==='duki')return [...new Set(list.filter(x=>/\[(E|I)\]/.test(x)).map(clean))];
    return [...new Set(list.map(clean))];
  }
  function swapComplete(c,l){const v=state.swaps[swapId(c,l)]||{};if(!v.enabled)return true;const known=knownBefore(c,l);return !!(known.includes(v.old)&&v.next&&v.next!==v.old&&swapOptions(c,l).includes(v.next)&&!known.includes(v.next)&&!spellsThisLevel(c,l).includes(v.next));}
  function stages(c,l){
    const autos=automatic(c,l).map(([name,description],i)=>({id:`auto-${i}`,kind:'auto',title:name,description}));
    return [{id:'level',kind:'level',title:`Nível ${l} alcançado`},{id:'hp',kind:'hp',title:'Novos pontos de vida'},...autos.filter(x=>!/^Se for /i.test(x.title)),...steps(c,l).filter(x=>x.kind!=='reference').map(x=>({...x,id:`step:${x.id}`,stepId:x.id,kind:'step'})),...(canSwap(c,l)?[{id:'swap',kind:'swap',title:'Quer trocar uma magia conhecida?'}]:[]),...autos.filter(x=>/^Se for /i.test(x.title))];
  }
  function stageIndex(c,l){return stages(c,l).findIndex(x=>x.id===ui.stage);}
  function currentStage(c,l){return stages(c,l).find(x=>x.id===ui.stage)||stages(c,l)[0];}
  function startWizard(){const c=currentChar(), l=nextLevel(c);if(!l)return;ui.level=l;ui.screen='wizard';ui.stage='level';ui.stageEntrance=true;ui.levelReady=false;ui.hpReady=false;ui.search='';touchLevel(c,l);render();animateLevel();scrollTop();}
  function scrollTop(){window.scrollTo({top:0,behavior:'instant'});}
  let levelRun=0,hpRun=0;
  function animateLevel(){
    const el=document.querySelector('#level-count');if(!el)return;
    const target=ui.level,run=++levelRun,button=document.querySelector('[data-do="next"]');
    ui.levelReady=false;el.textContent=target-1;if(button)button.disabled=true;
    const finish=()=>{if(run!==levelRun)return;el.textContent=target;ui.levelReady=true;document.querySelector('.level-ceremony')?.classList.add('complete');const next=document.querySelector('[data-do="next"]');if(next)next.disabled=false;};
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){finish();return;}
    const began=performance.now(),duration=1650;
    function tick(now){
      if(run!==levelRun||ui.screen!=='wizard'||ui.stage!=='level')return;
      const elapsed=now-began;
      if(elapsed<duration){el.textContent=1+(Math.floor(elapsed/86)%20);requestAnimationFrame(tick);}
      else finish();
    }
    requestAnimationFrame(tick);
  }
  function animateHp(){
    const el=document.querySelector('#hp-count');if(!el)return;
    const c=currentChar(),ch=chapter(c,ui.level),from=ch.hp_before,to=hpAfter(c,ui.level),run=++hpRun;
    const button=document.querySelector('[data-do="next"]');
    ui.hpReady=false;el.textContent=from;if(button)button.disabled=true;
    const finish=()=>{if(run!==hpRun)return;el.textContent=to;ui.hpReady=true;document.querySelector('.hp-ceremony')?.classList.add('complete');const next=document.querySelector('[data-do="next"]');if(next)next.disabled=false;};
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){finish();return;}
    setTimeout(()=>{
      if(run!==hpRun||ui.screen!=='wizard'||ui.stage!=='hp')return;
      const began=performance.now(),duration=2200;
      function tick(now){
        if(run!==hpRun||ui.screen!=='wizard'||ui.stage!=='hp')return;
        const p=Math.min(1,(now-began)/duration);
        el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-p,2)));
        if(p<1)requestAnimationFrame(tick);else finish();
      }
      requestAnimationFrame(tick);
    },1250);
  }
  function optionBlocked(c,l,s,item){if(has(s.id,item[0]))return false;if(s.kind==='spell'&&previousSpellNames(c,l,s.id).has(clean(item[0]).toLowerCase()))return true;return s.limit>1&&selected(s.id).length>=s.limit;}
  function swapBody(c,l){
    const id=swapId(c,l),v=state.swaps[id]||{},known=knownBefore(c,l),current=spellsThisLevel(c,l),available=swapOptions(c,l).filter(x=>!known.includes(x)&&!current.includes(x));
    const cards=(names,field)=>`<div class="swap-grid">${names.map(name=>`<button class="swap-card ${v[field]===name?'picked':''}" data-do="swap-pick" data-field="${field}" data-name="${esc(name)}" aria-pressed="${v[field]===name}"><span class="swap-art">${spellIcon(name)}</span><span><strong>${esc(name)}</strong>${timingBadge(spellTiming(name))}<small>${esc(spellNote(name))}</small></span></button>`).join('')}</div>`;
    return `<p>Você pode manter suas magias ou substituir uma magia conhecida por outra da sua classe. A troca é opcional.</p><div class="choice-mode"><button data-do="swap-mode" data-enabled="false" class="${!v.enabled?'selected':''}">Manter magias</button><button data-do="swap-mode" data-enabled="true" class="${v.enabled?'selected':''}">Trocar uma</button></div>${v.enabled?`<div class="swap-section"><h3>1 · Magia que sai</h3>${cards(known,'old')}</div><div class="swap-section"><h3>2 · Magia que entra</h3>${cards(available,'next')}</div><p class="selection-note">Confira o nível da magia, a escola e os requisitos antes de anotá-la.</p>`:''}<p class="instruction">${v.enabled?'ANOTE NA FICHA: risque a magia removida e registre a nova.':'Se mantiver as magias, avance para a revisão.'}</p>`;
  }
  function creatureCard(animal,picked,action,step,blocked=false){
    const [name,ac,hp,attack,bonus,extra]=animal;
    return `<button class="creature-card ${picked?'picked':''}" data-do="${action}" data-step="${step}" data-name="${esc(name)}" ${blocked?'disabled':''} aria-pressed="${picked}"><span class="creature-card-top"><span class="creature-art">${creatureIcon(name)}</span><strong>${esc(name)}</strong><b>${picked?'ESCOLHIDO ✓':'ESCOLHER'}</b></span><span class="creature-stats"><span>CA <b>${ac}</b></span><span>PV <b>${hp}</b></span></span><span class="creature-action"><em>AÇÃO</em>${esc(attack)}</span><span class="creature-action"><em>AÇÃO BÔNUS</em>${esc(bonus)}</span>${extra?`<span class="creature-extra">${esc(extra)}</span>`:''}</button>`;
  }
  function choiceBody(c,l,s){
    if(s.kind==='asi'){
      const a=state.asi[s.id]||{mode:'two',first:'',second:''};
      const select=(field,label)=>`<label>${label}<select data-asi="${field}" data-step="${s.id}"><option value="">Selecione</option>${Object.keys(c.stats).map(k=>`<option value="${k}" ${a[field]===k?'selected':''}>${k} (${c.stats[k]})</option>`).join('')}</select></label>`;
      return `<p>Distribua +2 em um atributo ou +1 em dois atributos diferentes. Máximo 20.</p><p class="choice-timing">${timingBadge('passive')} A melhoria altera sua ficha; não exige ação em combate.</p><div class="choice-mode"><button data-do="asi-mode" data-mode="two" data-step="${s.id}" class="${a.mode==='two'?'selected':''}">+2 em um</button><button data-do="asi-mode" data-mode="split" data-step="${s.id}" class="${a.mode==='split'?'selected':''}">+1 em dois</button></div><div class="form-pair">${select('first','Primeiro atributo')}${a.mode==='split'?select('second','Segundo atributo'):''}</div>${validAsi(a,c)?`<p class="selection-note">Anote: ${esc(asiText(c,s))}. Confira os modificadores e o PV máximo atualizado na ficha.</p>`:''}`;
    }
    if(s.kind==='beast'){
      const b=state.beasts[s.id]||{};
      return `<p>${esc(s.intro)}</p><p class="choice-timing">${timingBadge('action')} João usa sua ação para comandar a companheira conforme a regra de 2014. As ações bônus nas cartas são ajustes desta campanha.</p><div class="creature-grid">${CREATURES.companion.map(animal=>creatureCard(animal,b.name===animal[0],'beast-pick',s.id)).join('')}</div><p class="instruction">Anote a companheira escolhida, CA, PV, ataque e habilidade na ficha dela.</p>`;
    }
    if(s.kind==='wildforms'){
      const animals=s.id==='lorelay-4-special'?CREATURES.special:CREATURES.wild;
      return `<p>${esc(s.intro)}</p><div class="selection-count">${selected(s.id).length} de ${s.limit} ${s.limit===1?'forma':'formas'}</div><div class="creature-grid">${animals.map(animal=>creatureCard(animal,has(s.id,animal[0]),'pick',s.id,s.limit>1&&selected(s.id).length>=s.limit&&!has(s.id,animal[0]))).join('')}</div><p class="instruction">Anote as formas escolhidas e seus ataques na ficha. Marque as habilidades ✦ como regras da campanha.</p>`;
    }
    let options=(s.items||[]).slice();
    if(s.id==='calebi-3-2')selected(s.id).filter(x=>!options.some(y=>clean(y[0])===clean(x))).forEach(x=>options.push([x,'Truque escolhido de outra lista de classe.']));
    const q=ui.search.toLocaleLowerCase('pt-BR').trim();if(q)options=options.filter(x=>(x[0]+' '+x[1]).toLocaleLowerCase('pt-BR').includes(q));
    const chosen=selected(s.id);
    const featured=!!FEATURED_CHOICES[s.id];
    const intro=s.id==='duki-3-3'?'Mãos Mágicas é obrigatório e já está incluído. Escolha mais dois truques.':featured?'Compare o efeito de cada caminho. Você pode mudar de ideia até confirmar o nível.':s.intro||'Escolha uma opção. Você pode mudar antes de confirmar o nível.';
    return `<p class="${featured?'choice-intro':''}">${esc(intro)}</p><p class="choice-help">O marcador mostra como usar o efeito no jogo. Escolhas passivas não gastam ação; magias usam o tempo indicado em cada carta.</p><div class="selection-count">${chosen.length} de ${s.limit} ${s.limit===1?'escolha':'escolhas'}</div>${s.id==='duki-3-6'?'<p class="rule-note">Pelo menos duas magias devem ser de Encantamento [E] ou Ilusão [I].</p>':''}${s.kind==='spell'?`<label class="search">Buscar magia<input id="spell-search" type="search" value="${esc(ui.search)}" placeholder="Nome ou efeito"></label>`:''}<div class="options ${featured?'options-major':''} options-count-${options.length} ${s.id==='lorelay-2-1'?'options-circle':''}">${options.map(([name,description])=>{const picked=has(s.id,name),blocked=optionBlocked(c,l,s,[name,description]);if(featuredInfo(s,name))return featuredCard(s,name,description,picked,blocked);return `<button class="option theme-${optionIcon(name)} ${picked?'picked':''}" data-do="pick" data-step="${s.id}" data-name="${esc(name)}" ${blocked?'disabled':''} aria-pressed="${picked}"><span class="option-icon">${s.kind==='spell'?spellIcon(name):choiceArt(name)}</span><span class="option-copy"><span class="option-top"><strong>${esc(clean(name))}</strong>${picked?'<b>ESCOLHIDO ✓</b>':'<em>Selecionar</em>'}</span><small>${esc(description)}</small>${timingBadge(choiceTiming(s,name,description))}</span></button>`;}).join('')||'<p>Nenhuma opção encontrada.</p>'}</div>${s.id==='calebi-3-2'?`<div class="custom"><label>Outro truque de qualquer classe<input id="custom-cantrip" maxlength="60" placeholder="Nome do truque"></label><button data-do="custom-cantrip">Adicionar</button></div><p class="choice-timing">${timingBadge('variable')} Confira o tempo de conjuração do truque escolhido.</p>`:''}`;
  }
  function wizard(c){
    const l=ui.level,all=stages(c,l),st=currentStage(c,l),index=all.findIndex(x=>x.id===st.id),done=st.kind==='step'?isComplete(steps(c,l).find(x=>x.id===st.stepId)):st.kind==='swap'?swapComplete(c,l):st.kind==='hp'?!!ui.hpReady:st.kind==='level'?!!ui.levelReady:true;
    let body='';
    if(st.kind==='level')body=`<div class="level-ceremony"><div class="level-die-shell" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none"><path d="M50 5 87 26v48L50 95 13 74V26L50 5Z"/><path d="M50 5 13 74h74L50 5Zm-37 21 37 69 37-69M13 26h74"/></svg><strong id="level-count">${l-1}</strong></div><p class="level-achieved">NÍVEL ${l} ALCANÇADO</p><p class="level-from">${esc(c.name)} avança do nível ${l-1} para o ${l}.</p><p class="level-next-hint">Continue para descobrir o novo total de Vida e os ganhos deste nível.</p></div>`;
    if(st.kind==='hp'){
      const ch=chapter(c,l),to=hpAfter(c,l);
      body=`<div class="hp-ceremony"><div class="hp-emblem">${icon('heart',52)}</div><p class="hp-gain">Seu máximo de pontos de vida cresce <strong>+${ch.hp_gain}</strong>.</p><div class="hp-animation" role="img" aria-label="Vida máxima de ${ch.hp_before} para ${to}"><div class="hp-current"><small>VIDA MÁXIMA ANTERIOR</small><span>${ch.hp_before}</span></div><i aria-hidden="true">→</i><div class="hp-next"><small>NOVA VIDA MÁXIMA</small><strong id="hp-count">${ch.hp_before}</strong></div></div><p class="instruction">Troque o valor de PV máximos na ficha: ${ch.hp_before} → ${to}.</p></div>`;
    }
    if(st.kind==='auto')body=`<div class="auto-feature theme-${optionIcon(st.title)} ${/truque/i.test(st.title)?'auto-cantrip':''}"><div class="feature-symbol">${choiceArt(st.title)}</div><div><p class="auto-feature-label">${/truque/i.test(st.title)?'NOVO TRUQUE':/a[cç][aã]o b[oô]nus/i.test(st.description)?'AÇÃO BÔNUS NOVA':/\ba[cç][aã]o\b/i.test(st.description)?'AÇÃO NOVA':'CARACTERÍSTICA NOVA'}</p><h2>${esc(st.title)}</h2><p class="auto-feature-description">${esc(st.description)}</p>${badge(st.description)}</div></div><p class="instruction">Registre ${esc(st.title)} nas características da ficha${/truque/i.test(st.title)?' e prossiga para escolher o truque.':'.'}</p>`;
    if(st.kind==='step'){const s=steps(c,l).find(x=>x.id===st.stepId),specific=featuredInfo(s,selected(s.id)[0])?.sheet;body=choiceBody(c,l,s)+(isComplete(s)?`<div class="decision-echo"><small>DECISÃO REGISTRADA</small><strong>${esc(decisionText(c,s))}</strong></div>`:'')+`<p class="instruction">${esc(specific|| (s.kind==='asi'?'Anote os novos atributos e atualize os valores derivados.':s.kind==='beast'?'Anote a companheira e copie o bloco da criatura.':s.kind==='spell'?'Anote as magias escolhidas e os espaços disponíveis.':'Anote a escolha e o recurso correspondente na ficha.'))}</p>`;}
    if(st.kind==='swap')body=swapBody(c,l);
    const heading=st.kind==='hp'?'VIDA MÁXIMA AUMENTADA':st.kind==='step'?st.title.replace(/^Escolha\s+\d+\s+/i,''):st.title;
    const label=st.kind==='level'?'A EVOLUÇÃO COMEÇA':st.kind==='hp'?'O PRIMEIRO GANHO':st.kind==='auto'?'NOVO RECURSO':st.kind==='step'&&FEATURED_CHOICES[st.stepId]?'DECISÃO DE CLASSE':'SUA ESCOLHA';
    return `${head()}<main class="wrap wizard wizard-${st.kind} ${st.kind==='step'&&FEATURED_CHOICES[st.stepId]?'wizard-featured':''}"><div class="wizard-top"><button class="backlink" data-do="back">← Voltar</button><span class="wizard-character">${classMark(c)}${esc(c.name)} · nível ${l}</span></div><div class="progress-label">ETAPA ${index+1} DE ${all.length}</div><div class="progress-bar"><i style="width:${Math.round((index+1)/all.length*100)}%"></i></div><article class="stage stage-${st.kind} ${ui.stageEntrance?'stage-enter':''}" key="${esc(st.id)}"><p class="eyebrow">${label}</p>${st.kind==='auto'?'':`<h1>${esc(heading)}</h1>`}${body}</article><div class="stage-nav"><button class="secondary stage-back" data-do="back"><span aria-hidden="true">←</span> VOLTAR</button><button class="primary" data-do="next" ${done?'':'disabled'}>${st.kind==='hp'?'OK, CONTINUAR':index===all.length-1?'REVISAR ESCOLHAS':'CONTINUAR'} <span>→</span></button>${!done&&st.kind!=='hp'&&st.kind!=='level'?'<small>Conclua esta escolha para seguir.</small>':''}</div></main>${foot()}`;
  }
  function decisionText(c,s){if(s.kind==='asi')return asiText(c,s);if(s.kind==='beast')return state.beasts[s.id]?.name||'';return selected(s.id).map(clean).join(', ');}
  function decisionDetail(s){
    if(s.kind==='beast'){const animal=CREATURES.companion.find(x=>x[0]===state.beasts[s.id]?.name);return animal?`CA ${animal[1]}, PV ${animal[2]}. Ação: ${animal[3]} Ação bônus: ${animal[4]}`:'';}
    if(s.kind==='wildforms'){const pool=s.id==='lorelay-4-special'?CREATURES.special:CREATURES.wild;return selected(s.id).map(name=>{const a=pool.find(x=>x[0]===name);return a?`${name}: CA ${a[1]}, PV ${a[2]}. Ação: ${a[3]} Ação bônus: ${a[4]}`:'';}).filter(Boolean).join(' | ');}
    return '';
  }
  function swapLine(c,l){const v=state.swaps[swapId(c,l)]||{};return v.enabled?`${v.old||'pendente'} → ${v.next||'pendente'}`:'Nenhuma troca';}
  function reviewTiming(s){
    if(s.kind==='beast'||s.kind==='wildforms')return `${timingBadge('action')} ${timingBadge('bonus')}`;
    if(s.kind==='asi')return timingBadge('passive');
    const kinds=[...new Set(selected(s.id).map(name=>choiceTiming(s,name,s.items?.find(item=>clean(item[0])===clean(name))?.[1]||'')))];
    return kinds.map(timingBadge).join('');
  }
  function reviewDecision(c,s,index){
    const name=selected(s.id)[0],info=name?featuredInfo(s,name):null;
    const chosen=decisionText(c,s)||'Pendente';
    const description=decisionDetail(s)||(s.limit===1?s.items?.find(x=>clean(x[0])===clean(name))?.[1]:'');
    const tone=info?.tone||optionIcon(name||s.title);
    return `<button class="review-decision ${info?'review-decision-major':''} theme-${tone}" data-do="revise" data-stage="step:${s.id}" aria-label="Editar ${esc(s.title)}: ${esc(chosen)}"><span class="review-decision-icon">${choiceArt(name||s.title)}</span><span class="review-decision-main"><span class="review-decision-kicker">ESCOLHA ${index+1} · ${esc(s.title.replace(/^Escolha\s+\d+\s+/i,''))}</span><strong>${esc(chosen)}</strong>${info?`<span class="review-decision-impact">${esc(info.hook)}</span>`:description?`<span class="review-decision-impact">${esc(description)}</span>`:''}<span class="review-decision-timing">${reviewTiming(s)}</span>${info?.points?`<span class="review-decision-points">${info.points.map(x=>`<span>${esc(x)}</span>`).join('')}</span>`:''}</span><span class="review-edit">ALTERAR ESCOLHA <span aria-hidden="true">↗</span></span></button>`;
  }
  function review(c){
    const l=ui.level,choices=steps(c,l).filter(s=>s.kind!=='reference'),complete=choices.every(isComplete)&&swapComplete(c,l),ch=chapter(c,l);
    const decisions=choices.map((s,i)=>reviewDecision(c,s,i)).join('')+(canSwap(c,l)?`<button class="review-decision review-swap theme-book" data-do="revise" data-stage="swap"><span class="review-decision-main"><span class="review-decision-kicker">OPCIONAL · MAGIA CONHECIDA</span><strong>${esc(swapLine(c,l))}</strong><span class="review-decision-impact">Você pode manter suas magias ou trocar uma antes de confirmar.</span>${timingBadge('passive')}</span><span class="review-edit">ALTERAR ESCOLHA <span aria-hidden="true">↗</span></span></button>`:'');
    const gainCards=automatic(c,l).map(([name,desc],index)=>`<article class="review-gain theme-${optionIcon(name)}"><span class="review-gain-number">${String(index+1).padStart(2,'0')}</span><span class="review-gain-art">${choiceArt(name)}</span><div class="review-gain-copy"><div class="review-gain-title"><h3>${esc(name)}</h3>${badge(desc)}</div><p>${esc(desc)}</p></div></article>`).join('');
    return `${head()}<main class="wrap review"><button class="backlink" data-do="back">← Última etapa</button><header class="review-hero"><div class="review-hero-copy"><p class="eyebrow">REGISTRO DE EVOLUÇÃO · ${esc(c.name.toLocaleUpperCase('pt-BR'))}</p><h1>Revise a evolução</h1><p>Confira os ganhos, anote tudo na ficha e abra qualquer decisão que queira mudar.</p><span class="review-chapter">NÍVEL ${l-1} <span aria-hidden="true">→</span> NÍVEL ${l}</span></div><div class="review-level-seal" aria-label="Nível ${l}"><svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M50 5 87 26v48L50 95 13 74V26L50 5Z"/><path d="M50 5 13 74h74L50 5Zm-37 21 37 69 37-69M13 26h74"/></svg><strong>${l}</strong></div><div class="review-paper" aria-hidden="true"><span>✎</span><small>ANOTE<br>NA FICHA</small></div></header><div class="review-hp"><span class="review-hp-symbol">${icon('heart',32)}</span><span class="review-hp-label"><small>VIDA MÁXIMA</small><b>Mais força para a jornada</b></span><strong>${ch.hp_before} <i>→</i> ${hpAfter(c,l)}</strong></div>${decisions?`<section class="review-section review-decisions-section"><div class="review-section-head"><div><p class="eyebrow">CAMINHO ESCOLHIDO</p><h2>Suas decisões</h2></div><span>${choices.length} ${choices.length===1?'escolha':'escolhas'}</span></div><p class="review-section-intro">Toque em uma carta para mudar a escolha antes de confirmar.</p><div class="review-decisions">${decisions}</div></section>`:''}<section class="review-section review-automatic"><div class="review-section-head"><div><p class="eyebrow">PODERES DESPERTOS</p><h2>Ganhos deste nível</h2></div><span>${automatic(c,l).length} ${automatic(c,l).length===1?'ganho':'ganhos'}</span></div><div class="review-list">${gainCards}</div></section><div class="review-commit"><div class="review-commit-copy"><span class="review-commit-icon">${icon('shield',30)}</span><div><strong>Confira a ficha antes de confirmar</strong><p>Registre PV, características, magias e escolhas. Depois segure o botão para salvar o nível.</p></div></div><button class="primary confirm hold-confirm" id="hold-confirm" type="button" ${complete?'':'disabled'}>SEGURE PARA CONFIRMAR O NÍVEL ${l} <span aria-hidden="true">✦</span></button>${!complete?'<p class="rule-note">Ainda há escolhas pendentes.</p>':''}</div></main>${foot()}`;
  }
  function result(c){const l=ui.level,ch=chapter(c,l),ss=steps(c,l).filter(s=>s.kind!=='reference');return `${head()}<main class="wrap result"><div class="level-flash">NÍVEL ${l}</div><p class="eyebrow">EVOLUÇÃO CONFIRMADA</p><h1>O que dizer pro mestre</h1><p>Conte ao mestre seu novo total de PV e as escolhas feitas. Confira também se tudo foi escrito na ficha.</p><div class="master-note"><p><strong>${esc(c.name)}</strong> chegou ao nível ${l}. PV máximos: ${ch.hp_before} → ${hpAfter(c,l)}.</p>${ss.map(s=>`<p><strong>${esc(s.title)}:</strong> ${esc(decisionText(c,s))}.</p>`).join('')||'<p>Este nível não teve escolhas obrigatórias.</p>'}${canSwap(c,l)?`<p><strong>Troca de magia:</strong> ${esc(swapLine(c,l))}.</p>`:''}<p><strong>Ganhos automáticos:</strong> ${esc(automatic(c,l).map(x=>x[0]).join(', '))}.</p></div><section class="result-checklist"><h2>Confira sua ficha</h2><ul><li>Troque os PV máximos para <strong>${hpAfter(c,l)}</strong>.</li>${automatic(c,l).map(([name,desc])=>`<li><strong>${esc(name)}:</strong> ${esc(desc)}</li>`).join('')}${ss.map(s=>`<li><strong>${esc(s.title)}:</strong> ${esc(decisionText(c,s))}. ${esc(decisionDetail(s))}</li>`).join('')}${canSwap(c,l)?`<li><strong>Magias:</strong> ${esc(swapLine(c,l))}.</li>`:''}</ul><p>Anote pistas e planos da aventura no seu caderno de papel.</p></section><button class="primary" data-do="profile">VER FICHA ATUALIZADA <span aria-hidden="true">→</span></button></main>${foot()}`;}
  function credits(){return `${head()}<main class="wrap"><button class="backlink" data-do="home">← Voltar</button><h1>Créditos visuais</h1><p>Retratos, símbolos de classe e sprites de magias e criaturas foram fornecidos pelo mestre para esta edição.</p><p>Outros símbolos usados nas escolhas são da coleção <a href="https://game-icons.net" target="_blank" rel="noopener">Game Icons</a>, de Lorc. O desenho da mochila é de <a href="https://game-icons.net/1x1/delapouite/backpack.html" target="_blank" rel="noopener">Delapouite</a>.</p></main>${foot()}`;}
  function adminPage(){
    const c=charById(ui.adminChar)||CHARS[0],current=knownLevel(c),target=ui.adminTargetLevel??current,remoteLocked=CLOUD.enabled&&!cloudMasterCode;
    const cloudPanel=CLOUD.enabled?`<section class="admin-cloud"><h2>Fichas compartilhadas</h2>${cloudMasterCode?`<p>Conectado como mestre. Atualize para ver alterações feitas em outros aparelhos.</p><button class="secondary" data-do="cloud-admin-refresh">ATUALIZAR TODAS AS FICHAS</button>`:`<p>O escudo 0404 libera este painel neste aparelho. Para consultar e editar as fichas online, use o código privado do mestre.</p><label>Código do mestre<input id="cloud-master-code" type="password" autocomplete="off" spellcheck="false"></label><button class="secondary" data-do="cloud-master-login">ABRIR FICHAS ONLINE</button>`}</section>`:'';
    return `${head()}<main class="wrap admin"><button class="backlink" data-do="home">← Voltar</button><p class="eyebrow">ESCUDO DO MESTRE</p><h1>Administração</h1>${!ui.admin?`<p>Digite o código para ajustar níveis e limpar o progresso de teste.</p><label>Código<input id="admin-code" type="password" inputmode="numeric" maxlength="4" autocomplete="off"></label><button class="primary" data-do="admin-login">Entrar</button>`:`${cloudPanel}<p>Escolha um personagem. O nível salvo aparece junto ao retrato.</p><div class="admin-roster">${CHARS.map(x=>`<button class="admin-person ${c.id===x.id?'active':''}" data-do="admin-select-char" data-char="${x.id}" aria-pressed="${c.id===x.id}">${portrait(x,'admin-portrait')}<span><strong>${esc(x.name)}</strong><small>Nível ${knownLevel(x)}</small></span></button>`).join('')}</div><section class="admin-editor"><div class="admin-selected">${portrait(c,'admin-selected-portrait')}<div><p class="eyebrow">PERSONAGEM SELECIONADO</p><h2>${esc(c.name)}</h2><p>${esc(SHEET[c.id].player)} · ${esc(c.cls)}</p></div></div><p class="admin-label">Definir nível</p><div class="level-choices">${[1,2,3,4].map(level=>`<button data-do="admin-select-level" data-level="${level}" class="${target===level?'active':''}" aria-pressed="${target===level}">${level}</button>`).join('')}</div><p class="admin-preview">Nível salvo <strong>${current}</strong><span>→</span>Nível escolhido <strong>${target}</strong></p><button class="primary admin-apply" data-do="admin-level" ${target===current||remoteLocked?'disabled':''}>APLICAR NÍVEL ${target} A ${esc(c.name).toLocaleUpperCase('pt-BR')}</button><p class="rule-note">Ao reduzir o nível, as escolhas anteriores ficam guardadas para você poder refazê-las. Avançar manualmente não preenche decisões ainda não tomadas.</p><button class="secondary admin-clear" data-do="admin-reset-char" ${remoteLocked?'disabled':''}>Limpar todo o progresso de ${esc(c.name)}</button></section><div class="admin-danger"><p>Todos os personagens</p><button class="secondary" data-do="admin-reset-all" ${remoteLocked?'disabled':''}>RESETAR TUDO</button></div>`}</main>${foot()}`;
  }
  function render(){const packScroll=document.querySelector('.pack-list')?.scrollTop,storyScroll=document.querySelector('.character-story')?.scrollTop;let html;if(ui.screen==='home')html=home();else if(ui.screen==='credits')html=credits();else if(ui.screen==='admin')html=adminPage();else if(ui.screen==='unlock')html=unlock();else {const c=currentChar();html=ui.screen==='profile'?profile(c):ui.screen==='wizard'?wizard(c):ui.screen==='review'?review(c):result(c);}document.querySelector('#app').innerHTML=html;ui.stageEntrance=false;if(packScroll!==undefined){const list=document.querySelector('.pack-list');if(list)list.scrollTop=packScroll;}if(storyScroll!==undefined){const story=document.querySelector('.character-story');if(story)story.scrollTop=storyScroll;}document.title=`Códice de Evolução · Ilha da Tempestade`;}
  function advance(){const c=currentChar(),all=stages(c,ui.level),i=stageIndex(c,ui.level),st=all[i];if(st?.kind==='level'&&!ui.levelReady)return;if(st?.kind==='hp'&&!ui.hpReady)return;if(st?.kind==='step'&&!isComplete(steps(c,ui.level).find(x=>x.id===st.stepId))){toast('Conclua a escolha antes de seguir.');return;}if(st?.kind==='swap'&&!swapComplete(c,ui.level)){toast('Complete a troca ou mantenha suas magias.');return;}if(i<all.length-1){ui.stage=all[i+1].id;ui.stageEntrance=true;ui.search='';render();if(ui.stage==='level')animateLevel();if(ui.stage==='hp')animateHp();scrollTop();}else{ui.screen='review';render();scrollTop();}}
  function back(){if(ui.screen==='review'){ui.screen='wizard';ui.stage=stages(currentChar(),ui.level).at(-1).id;}else if(ui.screen==='wizard'){const all=stages(currentChar(),ui.level),i=stageIndex(currentChar(),ui.level);if(i>0)ui.stage=all[i-1].id;else ui.screen='profile';}else ui.screen='profile';ui.stageEntrance=ui.screen==='wizard';ui.search='';render();if(ui.stage==='level'&&ui.screen==='wizard')animateLevel();if(ui.stage==='hp'&&ui.screen==='wizard')animateHp();scrollTop();}
  function pick(id,name){const c=currentChar(),s=steps(c,ui.level).find(x=>x.id===id);if(!s)return;let arr=selected(id).slice(),i=arr.findIndex(x=>clean(x)===clean(name));if(i>=0)arr.splice(i,1);else{if(optionBlocked(c,ui.level,s,[name,'']))return toast('Remova uma escolha para trocar.');if(id==='duki-3-6'&&!/\[(E|I)\]/.test(name)&&arr.filter(x=>!/\[(E|I)\]/.test(x)).length>=1)return toast('Apenas uma magia pode ser de outra escola.');if(s.limit===1)arr=[name];else arr.push(name);}state.choices[id]=arr;invalidateLevel(c,ui.level);if(id==='lorelay-2-1'&&!has(id,'Círculo da Terra')){delete state.choices['lorelay-2-2'];delete state.choices['lorelay-2-3'];}if(id==='duki-3-1'&&!has(id,'Trapaceiro Arcano')){delete state.choices['duki-3-3'];delete state.choices['duki-3-6'];delete state.choices['duki-4-3'];}if(id==='joao-3-1'){if(!has(id,'Caçador'))delete state.choices['joao-3-2'];if(!has(id,'Mestre das Feras'))delete state.beasts['joao-3-beast'];}if(id==='milagres-3-1'&&!has(id,'Conhecimento'))delete state.choices['milagres-3-lore-skills'];if(id==='kiedis-3-1'&&!has(id,'Quatro Elementos'))delete state.choices['kiedis-3-3'];if(id==='calebi-3-1'&&!has(id,'Tomo'))delete state.choices['calebi-3-2'];persist();render();}
  function download(name,content){const a=document.createElement('a'),u=URL.createObjectURL(new Blob([content],{type:'application/json'}));a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),30000);}
  let holdTimer=null,holdStart=0;
  function finishLevel(){const c=currentChar(),all=steps(c,ui.level).filter(s=>s.kind!=='reference');if(!all.every(isComplete)||!swapComplete(c,ui.level))return toast('Ainda há escolhas pendentes.');state.finished[`${c.id}-${ui.level}`]=true;persist();ui.screen='result';render();scrollTop();}
  function stopHold(){clearInterval(holdTimer);holdTimer=null;for(const b of document.querySelectorAll('#hold-level,#hold-confirm'))if(!b.classList.contains('hold-complete'))b.style.setProperty('--hold','0%');}
  function beginHold(e){const b=e.target.closest('#hold-level,#hold-confirm');if(!b||b.disabled||holdTimer||b.classList.contains('hold-complete'))return;holdStart=performance.now();b.style.setProperty('--hold','0%');holdTimer=setInterval(()=>{const p=Math.min(1,(performance.now()-holdStart)/1250);b.style.setProperty('--hold',`${p*100}%`);if(p>=1){clearInterval(holdTimer);holdTimer=null;b.classList.add('hold-complete');setTimeout(b.id==='hold-confirm'?finishLevel:startWizard,330);}},25);}
  document.addEventListener('pointerdown',beginHold);
  document.addEventListener('pointerup',stopHold);
  document.addEventListener('pointercancel',stopHold);
  document.addEventListener('keydown',e=>{if(['hold-level','hold-confirm'].includes(e.target.id)&&(e.key===' '||e.key==='Enter')){e.preventDefault();beginHold(e);}});
  document.addEventListener('keyup',e=>{if(['hold-level','hold-confirm'].includes(e.target.id)&&(e.key===' '||e.key==='Enter'))stopHold();});
  document.addEventListener('click',async e=>{
    const b=e.target.closest('[data-do]');if(!b)return;
    const action=b.dataset.do;
    if(action==='home'){ui.screen='home';ui.char=null;render();scrollTop();return;}
    if(action==='character'){ui.char=b.dataset.char;ui.combatPanel=null;ui.inventoryEdit=null;ui.inventoryAdding=null;ui.noteEditor=null;ui.noteDraft='';if(CLOUD.enabled){ui.pendingChar=ui.char;ui.screen='unlock';render();scrollTop();let code='';try{code=localStorage.getItem(`codice-acesso-${ui.char}`)||'';}catch{}if(code)await openCloudCharacter(ui.char,code);return;}ui.screen='profile';render();scrollTop();return;}
    if(action==='cloud-unlock'){const code=document.querySelector('#cloud-code')?.value.trim();if(!code)return toast('Digite o código do personagem.');b.disabled=true;await openCloudCharacter(ui.pendingChar,code);return;}
    if(action==='cloud-use-online'){const id=ui.pendingChar,code=document.querySelector('#cloud-code')?.value.trim()||localStorage.getItem(`codice-acesso-${id}`);if(!code)return toast('Digite o código do personagem.');if(!confirm('Descartar as alterações deste aparelho ainda não enviadas? Exporte uma cópia se quiser guardá-las.'))return;await useCloudVersion(id,code);return;}
    if(action==='cloud-refresh'){const c=currentChar(),session=cloudSessions[c.id];if(!session)return;if(cloudDirty.has(c.id)||cloudBusy.has(c.id)||session.blocked)return toast('Há mudanças locais pendentes. Exporte uma cópia antes de atualizar.');await openCloudCharacter(c.id,session.code);return;}
    if(action==='profile'){ui.screen='profile';render();scrollTop();return;}
    if(action==='combat-toggle'){ui.combatPanel=ui.combatPanel===b.dataset.kind?null:b.dataset.kind;render();document.querySelector('.combat-toggles')?.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});document.querySelector(`[data-do="combat-toggle"][data-kind="${b.dataset.kind}"]`)?.focus({preventScroll:true});return;}
    if(action==='spellbook-toggle'){ui.spellbookOpen=ui.spellbookOpen===currentChar().id?null:currentChar().id;render();document.querySelector('.spellbook-trigger')?.focus({preventScroll:true});return;}
    if(action==='credits'){ui.screen='credits';render();scrollTop();return;}
    if(action==='next'){advance();return;}
    if(action==='back'){back();return;}
    if(action==='revise'){ui.screen='wizard';ui.stage=b.dataset.stage;ui.stageEntrance=true;ui.search='';render();scrollTop();return;}
    if(action==='pick'){pick(b.dataset.step,b.dataset.name);return;}
    if(action==='beast-pick'){const id=b.dataset.step,name=b.dataset.name;if(!CREATURES.companion.some(x=>x[0]===name))return;state.beasts[id]={name};invalidateLevel(currentChar(),ui.level);persist();render();return;}
    if(action==='asi-mode'){state.asi[b.dataset.step]={mode:b.dataset.mode,first:'',second:''};invalidateLevel(currentChar(),ui.level);persist();render();return;}
    if(action==='swap-mode'){state.swaps[swapId(currentChar(),ui.level)]={enabled:b.dataset.enabled==='true',old:'',next:''};invalidateLevel(currentChar(),ui.level);persist();render();return;}
    if(action==='swap-pick'){const id=swapId(currentChar(),ui.level),field=b.dataset.field,name=b.dataset.name;if(!['old','next'].includes(field))return;state.swaps[id]={enabled:true,old:'',next:'',...(state.swaps[id]||{}),[field]:name};invalidateLevel(currentChar(),ui.level);persist();render();return;}
    if(action==='custom-cantrip'){const name=document.querySelector('#custom-cantrip')?.value.trim();if(!name)return toast('Digite o nome do truque.');pick('calebi-3-2',name);return;}
    if(action==='note-add'){ui.noteEditor={char:currentChar().id,id:null};ui.noteDraft='';render();document.querySelector('#note-text')?.focus();return;}
    if(action==='note-edit'){const c=currentChar(),note=notesFor(c.id).find(x=>x.id===b.dataset.id);if(!note)return;ui.noteEditor={char:c.id,id:note.id};ui.noteDraft=note.text;render();document.querySelector('#note-text')?.focus();return;}
    if(action==='note-cancel'){ui.noteEditor=null;ui.noteDraft='';render();return;}
    if(action==='note-save'){const c=currentChar(),text=(document.querySelector('#note-text')?.value??ui.noteDraft).trim().slice(0,4000);if(!text)return toast('Escreva a anotação antes de salvar.');const notes=notesFor(c.id),id=ui.noteEditor?.char===c.id?ui.noteEditor.id:null;if(id){const note=notes.find(x=>x.id===id);if(!note)return toast('Esta anotação não foi encontrada.');note.text=text;note.updatedAt=new Date().toISOString();}else notes.unshift({id:`note-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,text,updatedAt:new Date().toISOString()});ui.noteEditor=null;ui.noteDraft='';persist();render();toast('Anotação salva.');return;}
    if(action==='note-remove'){const c=currentChar(),notes=notesFor(c.id),index=notes.findIndex(x=>x.id===b.dataset.id);if(index<0)return;if(!confirm('Excluir esta anotação?'))return;notes.splice(index,1);if(ui.noteEditor?.id===b.dataset.id){ui.noteEditor=null;ui.noteDraft='';}persist();render();toast('Anotação excluída.');return;}
    if(action==='campaign-toggle'){ui.campaignOpen=ui.campaignOpen===currentChar().id?null:currentChar().id;render();return;}
    if(action==='inventory-toggle'){const c=currentChar(),name=b.dataset.name;ui.inventoryOpen=ui.inventoryOpen?.char===c.id&&ui.inventoryOpen.name===name?null:{char:c.id,name};render();[...(document.querySelectorAll?.('.pack-item-open')||[])].find(el=>el.dataset.name===name)?.focus({preventScroll:true});return;}
    if(action==='inventory-show-add'){ui.inventoryAdding={char:currentChar().id,index:Number(b.dataset.index)};ui.inventoryEdit=null;render();document.querySelector('#inventory-name')?.focus();return;}
    if(action==='inventory-hide-add'){ui.inventoryAdding=null;render();return;}
    if(action==='inventory-edit'){ui.inventoryEdit={char:currentChar().id,index:Number(b.dataset.index)};ui.inventoryAdding=null;render();return;}
    if(action==='inventory-cancel'){ui.inventoryEdit=null;render();return;}
    if(action==='inventory-save'){const c=currentChar(),bag=inventoryFor(c),index=Number(b.dataset.index),name=document.querySelector('#inventory-edit-name')?.value.trim().replace(/\s+/g,' '),qty=Number(document.querySelector('#inventory-edit-amount')?.value),description=(document.querySelector('#inventory-edit-description')?.value||'').trim().replace(/\s+/g,' ').slice(0,160);if(!Number.isInteger(index)||index<0||index>=bag.length)return;if(!name)return toast('Digite o nome do item.');if(!Number.isInteger(qty)||qty<1||qty>999999)return toast('Informe uma quantidade entre 1 e 999999.');const duplicate=bag.findIndex((x,i)=>i!==index&&x.name.toLocaleLowerCase('pt-BR')===name.toLocaleLowerCase('pt-BR'));if(duplicate>=0){if(Number(bag[duplicate].qty)+qty>999999)return toast('Quantidade máxima por item: 999999.');bag[duplicate].qty=Number(bag[duplicate].qty)+qty;if(description)bag[duplicate].description=description;bag.splice(index,1);}else bag[index]={name,qty,description};ui.inventoryEdit=null;ui.inventoryOpen={char:c.id,name};persist();render();toast('Item atualizado.');return;}
    if(action==='inventory-add'){const c=currentChar(),name=document.querySelector('#inventory-name')?.value.trim().replace(/\s+/g,' '),qty=Number(document.querySelector('#inventory-amount')?.value),description=(document.querySelector('#inventory-description')?.value||'').trim().replace(/\s+/g,' ').slice(0,160);if(!name)return toast('Digite o nome do item.');if(!Number.isInteger(qty)||qty<1||qty>999999)return toast('Informe uma quantidade entre 1 e 999999.');const bag=inventoryFor(c),item=bag.find(x=>x.name.toLocaleLowerCase('pt-BR')===name.toLocaleLowerCase('pt-BR'));if(item){if(Number(item.qty)+qty>999999)return toast('Quantidade máxima por item: 999999.');item.qty=Number(item.qty)+qty;if(description)item.description=description;}else{if(bag.length>=bagCapacity(c))return toast('A mochila está cheia. Retire um item antes de adicionar outro tipo.');bag.push({name,qty,description});}ui.inventoryAdding=null;ui.inventoryOpen={char:c.id,name};persist();render();toast(item?'Quantidade adicionada ao mesmo espaço.':'Item adicionado à mochila.');return;}
    if(action==='inventory-remove'){const bag=inventoryFor(currentChar()),index=Number(b.dataset.index);if(!Number.isInteger(index)||index<0||index>=bag.length)return;bag.splice(index,1);ui.inventoryEdit=null;ui.inventoryOpen=null;persist();render();toast('Item retirado da mochila.');return;}
    if(action==='report'){ui.level=Number(b.dataset.level);ui.screen='result';render();scrollTop();return;}
    if(action==='export'){download('codice-progresso.json',JSON.stringify({version:4,exportedAt:new Date().toISOString(),...state},null,2));toast('Progresso exportado.');return;}
    if(action==='admin'){ui.adminChar=ui.char||ui.adminChar||CHARS[0].id;ui.adminTargetLevel=knownLevel(charById(ui.adminChar));ui.screen='admin';render();scrollTop();return;}
    if(action==='admin-login'){if(document.querySelector('#admin-code')?.value==='0404'){ui.admin=true;render();}else toast('Código incorreto.');return;}
    if(action==='cloud-master-login'){const code=document.querySelector('#cloud-master-code')?.value.trim();if(!code)return toast('Digite o código privado do mestre.');b.disabled=true;await openCloudMaster(code);return;}
    if(action==='cloud-admin-refresh'){if([...cloudBusy,...cloudDirty].length)return toast('Aguarde a sincronização antes de atualizar.');if(cloudMasterCode)await openCloudMaster(cloudMasterCode);return;}
    if(action==='admin-select-char'){ui.adminChar=b.dataset.char;ui.adminTargetLevel=knownLevel(charById(ui.adminChar));render();return;}
    if(action==='admin-select-level'){ui.adminTargetLevel=Number(b.dataset.level);render();return;}
    if(action==='admin-level'){if(CLOUD.enabled&&!cloudMasterCode)return toast('Abra as fichas online com o código do mestre.');const id=ui.adminChar,l=ui.adminTargetLevel,c=charById(id);if(!id||![1,2,3,4].includes(l)||l===knownLevel(c))return;if(!confirm(`Definir ${c.name} como nível ${l}?`))return;for(let n=2;n<=4;n++){if(n<=l)state.finished[`${id}-${n}`]=true;else delete state.finished[`${id}-${n}`];}persist();render();toast(`${c.name} agora está no nível ${l}.`);return;}
    if(action==='admin-reset-char'){if(CLOUD.enabled&&!cloudMasterCode)return toast('Abra as fichas online com o código do mestre.');const id=ui.adminChar,c=charById(id);if(!confirm(`Apagar todo o progresso de ${c.name}${CLOUD.enabled?' para todos os aparelhos':' neste navegador'}?`))return;for(const group of CLOUD_GROUPS)for(const k of Object.keys(state[group]))if(k.startsWith(id+'-')||k.startsWith(id+':'))delete state[group][k];delete state.notes[id];delete state.inventory[id];delete state.inventoryVersion[id];ui.adminTargetLevel=1;persist();render();toast(`${c.name} foi reiniciado.`);return;}
    if(action==='admin-reset-all'){if(CLOUD.enabled&&!cloudMasterCode)return toast('Abra as fichas online com o código do mestre.');if(!confirm(`Apagar o progresso de todos os personagens${CLOUD.enabled?' em todos os aparelhos':' neste navegador'}?`))return;for(const group of [...CLOUD_GROUPS,'notes','inventory','inventoryVersion'])state[group]={};ui.adminTargetLevel=1;persist();if(CLOUD.enabled)for(const char of CHARS)queueCloud(char.id);render();toast('Progresso de todos os personagens reiniciado.');return;}
  });
  document.addEventListener('input',e=>{const t=e.target;if(t.id==='spell-search'){const pos=t.selectionStart;ui.search=t.value;render();const n=document.querySelector('#spell-search');n?.focus();n?.setSelectionRange(pos,pos);}if(t.id==='note-text'&&ui.noteEditor?.char===ui.char)ui.noteDraft=t.value;if(t.dataset.beast){state.beasts[t.dataset.step]={...(state.beasts[t.dataset.step]||{}),[t.dataset.beast]:t.value};invalidateLevel(currentChar(),ui.level);persist();}});
  document.addEventListener('change',async e=>{const t=e.target;if(t.dataset.inventoryQty!==undefined){const bag=inventoryFor(currentChar()),index=Number(t.dataset.inventoryQty),qty=Number(t.value);if(!Number.isInteger(index)||index<0||index>=bag.length)return;if(!Number.isInteger(qty)||qty<1||qty>999999){toast('Informe uma quantidade entre 1 e 999999.');render();return;}bag[index].qty=qty;persist();render();return;}if(t.dataset.asi){const id=t.dataset.step;state.asi[id]={mode:'two',first:'',second:'',...(state.asi[id]||{}),[t.dataset.asi]:t.value};invalidateLevel(currentChar(),ui.level);persist();render();}if(t.dataset.swap){const id=swapId(currentChar(),ui.level);state.swaps[id]={enabled:true,old:'',next:'',...(state.swaps[id]||{}),[t.dataset.swap]:t.value};invalidateLevel(currentChar(),ui.level);persist();render();}if(t.dataset.beast){persist();render();}if(t.id==='import-file'){const f=t.files?.[0];if(!f)return;if(CLOUD.enabled&&!cloudMasterCode){toast('Abra as fichas online com o código do mestre antes de importar um backup.');t.value='';return;}try{const p=JSON.parse(await f.text());if(![2,3,4].includes(p.version)||!p.choices||typeof p.choices!=='object'||!p.asi||typeof p.asi!=='object')throw Error('format');if(CLOUD.enabled&&!confirm('Restaurar este arquivo nas seis fichas online? As versões atuais serão substituídas.'))return;for(const group of ['choices','asi','beasts','checks','visited','finished','notes','swaps','inventory','inventoryVersion'])state[group]=p[group]||{};persist();if(CLOUD.enabled)for(const c of CHARS)queueCloud(c.id);ui.screen='home';ui.char=null;render();toast('Progresso importado.');}catch{toast('Arquivo de progresso incompatível.');}}});
  if(!storageAvailable)setTimeout(()=>toast('Este navegador não permitiu salvar. Exporte o progresso para guardá-lo.'),600);
  render();
})();


