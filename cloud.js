/* Sincronização opcional por código individual. As permissões são validadas no banco. */
(() => {
  const cfg=window.CODEX_CLOUD_CONFIG || {};
  const url=String(cfg.projectUrl||'').replace(/\/+$/,'');
  const key=String(cfg.publishableKey||'');
  const enabled=/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)&&/^sb_publishable_[A-Za-z0-9_-]+$/.test(key);
  async function rpc(name,args){
    if(!enabled)throw Error('not-configured');
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),12000);
    let response;
    try{
      response=await fetch(`${url}/rest/v1/rpc/${name}`,{
        method:'POST',
        headers:{'apikey':key,'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(args),signal:controller.signal
      });
    }finally{clearTimeout(timeout);}
    let payload=null;
    try{payload=await response.json();}catch{}
    if(!response.ok){
      const error=Error(payload?.message||'Falha de sincronização.');
      error.code=payload?.code||String(response.status);
      throw error;
    }
    return payload;
  }
  window.CODEX_CLOUD={
    enabled,
    read:(id,code)=>rpc('codice_read',{p_id:id,p_code:code}),
    write:(id,code,document,revision)=>rpc('codice_write',{p_id:id,p_code:code,p_document:document,p_revision:revision}),
    readAll:code=>rpc('codice_read_all',{p_code:code})
  };
})();
