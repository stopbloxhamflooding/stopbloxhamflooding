import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
const $=s=>document.querySelector(s);
function safe(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
async function load(){if(SUPABASE_URL.startsWith('YOUR_')){showFallback();return}
 const {data:content}=await supabase.from('site_content').select('*').eq('id',1).maybeSingle();
 if(content){$('#status').textContent=content.status;$('#updated').textContent=content.updated;$('#focus').textContent=content.focus;$('#latest').textContent=content.latest;}
 const {data:projects}=await supabase.from('projects').select('*').eq('published',true).order('sort_order');
 $('#projects').innerHTML=(projects||[]).map(p=>`<div class="card"><h3>${safe(p.icon||'🌊')} ${safe(p.title)}</h3><p>${safe(p.description)}</p></div>`).join('');
 const {data:docs}=await supabase.from('documents').select('*').eq('published',true).order('created_at',{ascending:false});
 $('#documents').innerHTML=(docs||[]).map(d=>`<p><a target="_blank" rel="noopener" href="${safe(d.url)}">${safe(d.title)} →</a></p>`).join('')||'<span class="muted">No documents published yet.</span>';
 const {data:qs}=await supabase.from('questions').select('id,name,type,body,answer,created_at').eq('published',true).order('created_at',{ascending:false});
 $('#published').innerHTML=(qs||[]).map(q=>`<div class="card" style="margin:12px 0"><b>${safe(q.type)} · ${safe(q.name)}</b><div class="q"><p>${safe(q.body)}</p>${q.answer?`<p><b>Response:</b> ${safe(q.answer)}</p>`:''}</div></div>`).join('')||'<div class="card"><span class="muted">No published submissions yet.</span></div>';
}
function showFallback(){$('#status').textContent='🟠 Works and investigations ongoing';$('#updated').textContent='August 2026';$('#focus').textContent='The Slade / Courtington Lane / Workhouse Lane';$('#projects').innerHTML='<div class="card"><h3>🌿 The Slade</h3><p>Natural Flood Management measures are planned to help slow and hold back water.</p></div><div class="card"><h3>🚧 Lane works</h3><p>Alternative solutions are being investigated.</p></div>';}
$('#questionForm').addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(e.target);const msg=$('#formMessage');if(SUPABASE_URL.startsWith('YOUR_')){msg.textContent='The site is in setup mode. Connect Supabase before accepting submissions.';return}const {error}=await supabase.from('questions').insert({name:f.get('name'),email:f.get('email'),type:f.get('type'),body:f.get('body')});msg.textContent=error?'Sorry — your submission could not be sent.': 'Thank you. Your submission has been sent for moderation.';if(!error)e.target.reset();});
load();
