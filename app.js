const $ = (id) => document.getElementById(id);
let tasks = [];
try { tasks = JSON.parse(localStorage.getItem("studybuddy_tasks") || "[]"); } catch { tasks = []; }

function save(){ localStorage.setItem("studybuddy_tasks", JSON.stringify(tasks)); renderTasks(); }
function renderTasks(){
  const list = $("taskList");
  if(!tasks.length){ list.className="muted"; list.textContent="No homework added yet. Add your first task above."; return; }
  list.className="";
  list.innerHTML="";
  tasks.sort((a,b)=>(a.due||"9999").localeCompare(b.due||"9999"));
  tasks.forEach(task=>{
    const row=document.createElement("div"); row.className="task";
    const check=document.createElement("input"); check.type="checkbox"; check.checked=task.done; check.setAttribute("aria-label","Mark complete");
    check.addEventListener("change",()=>{task.done=check.checked;save();});
    const details=document.createElement("div"); details.className="taskname"+(task.done?" done":"");
    const title=document.createElement("div"); title.textContent=task.title;
    const tag=document.createElement("span"); tag.className="tag"; tag.textContent=task.subject+(task.due?" · Due "+task.due:"");
    details.append(title,tag);
    const del=document.createElement("button"); del.className="danger"; del.textContent="Delete"; del.addEventListener("click",()=>{tasks=tasks.filter(t=>t.id!==task.id);save();});
    row.append(check,details,del); list.append(row);
  });
}
$("taskForm").addEventListener("submit",e=>{
  e.preventDefault();
  tasks.push({id:Date.now(),title:$("taskTitle").value.trim(),subject:$("subject").value,due:$("due").value,done:false});
  $("taskTitle").value=""; save();
});
document.querySelectorAll(".tab").forEach(tab=>tab.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===tab));
  ["planner","helper","guide"].forEach(id=>$(id).classList.toggle("hidden",id!==tab.dataset.tab));
}));
function buildPrompt(){
  const q=$("question").value.trim();
  if(!q){$("promptOutput").textContent="Please add your homework question first.";return;}
  const prompt=`You are a patient, supportive tutor. Help me learn rather than simply doing the work for me.\nSubject: ${$("helpSubject").value}\nStudy level: ${$("level").value.trim()||"Not specified"}\nTask: ${$("helpMode").value}\n\nHomework question:\n${q}\n\nPlease use clear language appropriate to my level. Show reasoning in understandable steps, define unfamiliar terms, flag anything uncertain, and finish with a short check-your-understanding question. If this is an assessed task, help me create and understand my own answer rather than pretending you are me.`;
  $("promptOutput").textContent=prompt;
}
$("makePrompt").addEventListener("click",buildPrompt);
$("copyPrompt").addEventListener("click",async()=>{
  const text=$("promptOutput").textContent;
  try{await navigator.clipboard.writeText(text);$("copyPrompt").textContent="Copied!";setTimeout(()=>$("copyPrompt").textContent="Copy prompt",1600);}
  catch{$("promptOutput").focus?.();alert("Copy is not available here. Press and hold the prompt text to select and copy it.");}
});
$("openChat").addEventListener("click",()=>window.open("https://chatgpt.com/","_blank","noopener"));
renderTasks();
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("./sw.js").catch(()=>{});
