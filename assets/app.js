
const KEY="homevault_v2";
const SESSION="homevault_session";
const DEFAULT={
 homes:[],boilers:[],vehicles:[],appliances:[],documents:[],reminders:[],expenses:[],timelineEvents:[],
 users:[{username:"admin",password:"admin",role:"Admin",name:"HomeVault Admin"}],
 reminderSettings:{days:[30,14,7,1],email:true,browser:true},activity:[]
};
function clone(x){return JSON.parse(JSON.stringify(x))}
function load(){let s;try{s=JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){s=null}return Object.assign(clone(DEFAULT),s||{},{
 homes:Array.isArray(s?.homes)?s.homes:[],boilers:Array.isArray(s?.boilers)?s.boilers:[],vehicles:Array.isArray(s?.vehicles)?s.vehicles:[],
 appliances:Array.isArray(s?.appliances)?s.appliances:[],documents:Array.isArray(s?.documents)?s.documents:[],reminders:Array.isArray(s?.reminders)?s.reminders:[],
 expenses:Array.isArray(s?.expenses)?s.expenses:[],timelineEvents:Array.isArray(s?.timelineEvents)?s.timelineEvents:[],users:Array.isArray(s?.users)&&s.users.length?s.users:clone(DEFAULT.users),
 activity:Array.isArray(s?.activity)?s.activity:[],reminderSettings:s?.reminderSettings||clone(DEFAULT.reminderSettings)
})}
let state=load();
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function money(v){return "£"+Number(v||0).toLocaleString("en-GB",{minimumFractionDigits:2,maximumFractionDigits:2})}
function date(v){if(!v)return "—";const d=new Date(v+"T00:00:00");return isNaN(d)?"—":d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}
function today(){return new Date().toISOString().slice(0,10)}
function addActivity(text){state.activity.unshift({id:uid(),text,date:new Date().toISOString()});state.activity=state.activity.slice(0,40);save()}
function toast(msg){const x=document.createElement("div");x.className="toast";x.textContent=msg;document.body.appendChild(x);setTimeout(()=>x.remove(),2600)}
function modal(title,body){document.getElementById("modalTitle").textContent=title;document.getElementById("modalBody").innerHTML=body;document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function session(){return JSON.parse(sessionStorage.getItem(SESSION)||"null")}
function requireAuth(){if(!session()){location.href="login.html";return false}return true}
function logout(){sessionStorage.removeItem(SESSION);location.href="login.html"}
function setupShell(page,title,subtitle){
 if(!requireAuth())return;
 const s=session();document.getElementById("userName").textContent=s?.name||s?.username||"User";
 document.getElementById("pageTitle").textContent=title;document.getElementById("pageSubtitle").textContent=subtitle||"";
 document.querySelectorAll(".nav a").forEach(a=>a.classList.toggle("active",a.dataset.page===page));
 const admin=document.getElementById("adminNav"); if(admin)admin.style.display=s?.role==="Admin"?"block":"none";
}
function nav(page){location.href=page+".html"}
function toggleMenu(){document.getElementById("sidebar").classList.toggle("open")}
function formData(form){return Object.fromEntries(new FormData(form).entries())}
function pageBase(page,title,subtitle,content){document.title="HomeVault — "+title;document.body.innerHTML=`
<div class="app"><aside class="sidebar" id="sidebar"><div class="brand">Home<span>Vault</span></div><nav class="nav">
<a data-page="dashboard" href="dashboard.html">🏠 <span>Dashboard</span></a>
<a data-page="home" href="home.html">🏡 <span>My Home</span></a>
<a data-page="boiler" href="boiler.html">🔥 <span>Boiler</span></a>
<a data-page="vehicle" href="vehicle.html">🚗 <span>Vehicle</span></a>
<a data-page="appliances" href="appliances.html">🧊 <span>Appliances</span></a>
<a data-page="documents" href="documents.html">📄 <span>Documents</span></a>
<a data-page="scanner" href="scanner.html">📸 <span>Scan document</span></a>
<a data-page="reminders" href="reminders.html">🔔 <span>Reminders</span></a>
<a data-page="expenses" href="expenses.html">💷 <span>Expenses</span></a>
<a data-page="timeline" href="timeline.html">📈 <span>Timeline</span></a>
<div class="nav-divider"></div><a id="adminNav" data-page="admin" href="admin.html">⚙️ <span>Admin</span></a>
<a href="#" onclick="logout();return false">↪ <span>Log out</span></a>
</nav></aside>
<main class="main"><div class="topbar"><div><button class="mobile-menu" onclick="toggleMenu()">☰</button><h1 id="pageTitle">${esc(title)}</h1><p id="pageSubtitle">${esc(subtitle||"")}</p></div><div class="user-pill">👤 <span id="userName">User</span></div></div><div id="content">${content}</div></main></div>
<div id="modal" class="modal-backdrop" onclick="if(event.target===this)closeModal()"><div class="modal"><button class="close" onclick="closeModal()">×</button><h2 id="modalTitle"></h2><div id="modalBody"></div></div></div>`;setupShell(page,title,subtitle)}
function empty(icon,title,text,button=""){return `<div class="empty"><div style="font-size:48px">${icon}</div><h3>${esc(title)}</h3><p>${esc(text)}</p>${button?`<div style="margin-top:16px">${button}</div>`:""}</div>`}
function expenseScope(e){return e.scope==="Personal"?"Personal":"Home"}
function expenseMonthly(e){if(e.frequency==="Monthly")return +e.amount||0;if(e.frequency==="Yearly")return (+e.amount||0)/12;return 0}
function nextMonthOneOff(scope){const n=new Date();const y=n.getMonth()===11?n.getFullYear()+1:n.getFullYear(),m=(n.getMonth()+1)%12;return state.expenses.reduce((s,e)=>{if(expenseScope(e)!==scope||e.frequency!=="One-off"||!e.date)return s;const d=new Date(e.date+"T00:00:00");return d.getFullYear()===y&&d.getMonth()===m?s+(+e.amount||0):s},0)}
function monthlyCost(scope){return state.expenses.filter(e=>expenseScope(e)===scope).reduce((s,e)=>s+expenseMonthly(e),0)+nextMonthOneOff(scope)}
function annualCost(){return state.expenses.reduce((s,e)=>s+(e.frequency==="Monthly"?+e.amount*12:e.frequency==="Yearly"?+e.amount:+e.amount),0)}
function frequencyLabel(e){return e.frequency||"One-off"}
function categoryLabel(c){return ({Home:"🏠 Home",Vehicle:"🚗 Car",Repairs:"🔧 Repairs",Appliances:"🧊 Appliances",Boiler:"🔥 Boiler",Other:"📦 Other"}[c]||c)}
function expenseForm(id){
 const e=state.expenses.find(x=>x.id===id)||{scope:"Home",frequency:"One-off",category:"Home",payment:"Direct Debit",date:today(),amount:""};
 const cats=e.scope==="Personal"?["Groceries","Transport","Entertainment","Shopping","Health","Subscriptions","Personal","Other"]:["Home","Vehicle","Repairs","Appliances","Boiler","Other"];
 modal(id?"Edit expense":"Add expense",`<form id="expenseForm" onsubmit="submitExpense(event,'${id||""}')"><div class="form-grid">
 <div class="field"><label>Expense</label><input name="title" value="${esc(e.title||"")}" placeholder="Mortgage, groceries, boiler service..." required></div>
 <div class="field"><label>Type</label><select name="scope" onchange="switchExpenseType(this.value)"><option value="Home" ${e.scope!=="Personal"?"selected":""}>🏠 Home expense</option><option value="Personal" ${e.scope==="Personal"?"selected":""}>👤 Personal expense</option></select></div>
 <div class="field"><label>Amount (£)</label><input name="amount" type="number" min="0" step=".01" value="${esc(e.amount||"")}" required></div>
 <div class="field"><label>Frequency</label><select name="frequency"><option value="One-off" ${e.frequency==="One-off"?"selected":""}>One-off</option><option value="Monthly" ${e.frequency==="Monthly"?"selected":""}>Monthly</option><option value="Yearly" ${e.frequency==="Yearly"?"selected":""}>Yearly</option></select></div>
 <div class="field"><label>Date / start date</label><input name="date" type="date" value="${esc(e.date||today())}" required></div>
 <div class="field"><label>Payment method</label><select name="payment">${["Direct Debit","Card","Bank transfer","Cash","Finance","Other"].map(x=>`<option ${e.payment===x?"selected":""}>${x}</option>`).join("")}</select></div>
 <div class="field"><label>Category</label><select id="expenseCategory" name="category">${cats.map(x=>`<option ${e.category===x?"selected":""}>${x}</option>`).join("")}</select></div>
 <div class="field"><label>Next payment / renewal</label><input name="nextDate" type="date" value="${esc(e.nextDate||"")}"></div>
 <div class="field full"><label>Related record</label><input name="related" value="${esc(e.related||"")}" placeholder="Boiler / BMW / Home / optional"></div>
 <div class="field full"><label>Notes</label><textarea name="notes">${esc(e.notes||"")}</textarea></div></div>
 <div class="notice" style="margin-top:15px">Monthly expenses are ongoing and automatically included in next month's projected costs. Yearly expenses are spread across the year for the monthly equivalent.</div>
 <div class="actions">${id?`<button type="button" class="btn btn-danger" onclick="deleteExpense('${id}')">Delete</button>`:""}<span style="flex:1"></span><button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary">Save expense</button></div></form>`) }
function switchExpenseType(scope){const s=document.getElementById("expenseCategory");if(!s)return;const cats=scope==="Personal"?["Groceries","Transport","Entertainment","Shopping","Health","Subscriptions","Personal","Other"]:["Home","Vehicle","Repairs","Appliances","Boiler","Other"];s.innerHTML=cats.map(x=>`<option>${x}</option>`).join("")}
function submitExpense(ev,id){ev.preventDefault();const f=formData(ev.target),obj={id:id||uid(),title:f.title,scope:f.scope,amount:+f.amount||0,frequency:f.frequency,date:f.date,payment:f.payment,category:f.category,nextDate:f.nextDate,related:f.related,notes:f.notes};if(id){const i=state.expenses.findIndex(e=>e.id===id);state.expenses[i]=obj}else state.expenses.unshift(obj);addActivity(id?"Updated expense":"Added expense");save();closeModal();renderExpenses();toast(id?"Expense updated":"Expense added")}
function deleteExpense(id){const e=state.expenses.find(x=>x.id===id);if(!e)return;if(!confirm(`Delete "${e.title}"?`))return;state.expenses=state.expenses.filter(x=>x.id!==id);addActivity("Deleted expense");save();closeModal();renderExpenses();toast("Expense deleted")}
function renderExpenses(){
 const home=monthlyCost("Home"), personal=monthlyCost("Personal"), combined=home+personal, next=new Date();next.setMonth(next.getMonth()+1);
 const all=state.expenses.slice().sort((a,b)=>(b.date||"").localeCompare(a.date||""));
 const recurring=state.expenses.filter(e=>e.frequency==="Monthly"||e.frequency==="Yearly");
 document.getElementById("content").innerHTML=`<div class="page-head"><div><h2>💷 Expenses</h2><p>Track home and personal spending and see what next month is expected to cost.</p></div><button class="btn btn-primary" onclick="expenseForm()">＋ Add expense</button></div>
 <div class="grid g3"><div class="card hero"><div class="kpi-label">🏠 HOME MONTHLY COST</div><div class="big-money">${money(home)}</div><p>Ongoing home costs + next month's home one-offs</p></div><div class="card"><div class="kpi-label">👤 PERSONAL MONTHLY COST</div><div class="big-money">${money(personal)}</div><p>Ongoing personal costs + next month's personal one-offs</p></div><div class="card"><div class="kpi-label">💷 COMBINED MONTHLY COST</div><div class="big-money">${money(combined)}</div><p>Your overall projected monthly cost</p></div></div>
 <div class="section grid g2"><div class="card"><div class="section-head"><h2>📅 Next month</h2><span class="tag">${next.toLocaleDateString("en-GB",{month:"long",year:"numeric"})}</span></div><div class="record"><div class="record-icon">🏠</div><div class="record-meta"><strong>Home projected</strong><span>Monthly costs + dated one-offs</span></div><strong>${money(home)}</strong></div><div class="record"><div class="record-icon">👤</div><div class="record-meta"><strong>Personal projected</strong><span>Monthly costs + dated one-offs</span></div><strong>${money(personal)}</strong></div><div class="record"><div class="record-icon">💷</div><div class="record-meta"><strong>Combined projected</strong><span>Home + personal</span></div><strong>${money(combined)}</strong></div></div><div class="card"><div class="section-head"><h2>📈 Annual picture</h2><span class="tag">${new Date().getFullYear()}</span></div><div class="big-money">${money(annualCost())}</div><p>Based on all recorded one-off, monthly and yearly expenses.</p><div style="margin-top:18px"><div class="kpi-label">HOME VS PERSONAL</div><div class="progress" style="margin-top:7px"><div style="width:${combined?Math.min(100,home/combined*100):0}%"></div></div><div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px"><span>🏠 ${money(home)}</span><span>👤 ${money(personal)}</span></div></div></div></div>
 <div class="section"><div class="section-head"><h2>🔄 Monthly & yearly costs</h2><span class="muted">${recurring.length} recurring costs</span></div><div class="card table-wrap">${recurring.length?`<table><thead><tr><th>Cost</th><th>Type</th><th>Amount</th><th>Frequency</th><th>Monthly equivalent</th><th>Payment</th><th></th></tr></thead><tbody>${recurring.map(e=>`<tr><td><strong>${esc(e.title)}</strong><br><span class="muted">${esc(e.related||"")}</span></td><td>${expenseScope(e)==="Home"?"🏠 Home":"👤 Personal"}</td><td>${money(e.amount)}</td><td>${frequencyLabel(e)}</td><td>${money(expenseMonthly(e))}</td><td>${esc(e.payment)}</td><td><button class="btn btn-ghost" onclick="expenseForm('${e.id}')">Edit</button></td></tr>`).join("")}</tbody></table>`:empty("🔄","No monthly or yearly costs","Add your regular household or personal commitments.")}</div></div>
 <div class="section"><div class="section-head"><h2>🧾 All expenses</h2><span class="muted">${all.length} records</span></div><div class="card table-wrap">${all.length?`<table><thead><tr><th>Expense</th><th>Type</th><th>Amount</th><th>Frequency</th><th>Category</th><th>Payment</th><th>Date</th><th></th></tr></thead><tbody>${all.map(e=>`<tr><td><strong>${esc(e.title)}</strong>${e.related?`<br><span class="muted">${esc(e.related)}</span>`:""}</td><td>${expenseScope(e)==="Home"?"🏠 Home":"👤 Personal"}</td><td>${money(e.amount)}</td><td>${frequencyLabel(e)}</td><td>${esc(e.category)}</td><td>${esc(e.payment)}</td><td>${date(e.date)}</td><td><button class="btn btn-ghost" onclick="expenseForm('${e.id}')">Edit</button></td></tr>`).join("")}</tbody></table>`:empty("💷","No expenses yet","Add your first home or personal expense.",'<button class="btn btn-primary" onclick="expenseForm()">Add expense</button>')}</div></div>`}
