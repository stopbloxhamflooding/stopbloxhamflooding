window.SUPABASE_URL="https://vttyziopjlsgisdzolkc.supabase.co";
window.SUPABASE_ANON_KEY="sb_publishable_yVhn0MKmKgcUe5M7Z4l_Pg_Um0cNUSW";

// Community volunteer call-to-action. Kept here temporarily so it can be reviewed
// before the V2 content is moved into the editable site-content system.
document.addEventListener('DOMContentLoaded',()=>{
  const questions=document.querySelector('#questions');
  if(questions){
    questions.insertAdjacentHTML('beforebegin',`<section id="volunteer" class="section dark"><div class="wrap"><div class="section-head"><div><p class="kicker light">Join the mission</p><h2>Help us Stop Bloxham Flooding.</h2></div><p class="section-intro">This is a community effort and we need more people to help turn plans into practical action. You do not need to be a flood expert — there are useful roles for many different skills, interests and levels of available time.</p></div><div class="evidence-grid"><article class="evidence-card"><span class="card-icon">⚙</span><h3>Technical expertise</h3><p>Hydrology, drainage, engineering, surveying, mapping, environmental science, farming, ecology, data analysis or other relevant experience can all help us understand the catchment and assess possible solutions.</p></article><article class="evidence-card"><span class="card-icon">🌧</span><h3>Observe heavy rainfall</h3><p>Help monitor what actually happens when it rains heavily: where water comes from, which routes it follows, where drains struggle and where water begins to accumulate. Photographs, videos and observations can provide valuable evidence.</p></article><article class="evidence-card"><span class="card-icon">🌿</span><h3>Practical volunteering</h3><p>Join practical work such as helping with the leaky woody dams and flow-spreading measures being developed at The Slade, where activities are suitable for community volunteers and carried out under the appropriate project supervision.</p></article><article class="evidence-card featured"><span class="card-icon">≈</span><h3>Other ways to help</h3><p>Research, communications, photography, administration, talking to neighbours and landowners, or simply giving a few hours when a project needs extra hands can all make a difference.</p></article></div><div class="hero-actions"><a class="btn pale-btn" href="#questions">I would like to volunteer →</a></div><p class="small-note">Please use the message form below and select <strong>Volunteer</strong>. Tell us briefly how you might like to help. Practical activities will only take place where permission, appropriate supervision and any necessary safety arrangements are in place.</p></div></section>`);
  }
  const type=document.querySelector('#questionForm select[name="type"]');
  if(type && ![...type.options].some(o=>o.value==='Volunteer')){
    const option=document.createElement('option'); option.value='Volunteer'; option.textContent='Volunteer'; type.prepend(option);
  }
});
