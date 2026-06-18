// بسيط: تخزين محلي، عرض، إضافة، تعديل، حذف، مشاركة
const tasksKey = 'task2_tasks_v1';
let tasks = [];

const el = id=>document.getElementById(id);
const dialog = el('task-dialog');
const form = el('task-form');
const titleIn = el('task-title');
const descIn = el('task-desc');
const typeIn = el('task-type');
const noteIn = el('task-note');
const tasksList = el('tasks-list');
const noTasks = el('no-tasks');
let editId = null;

function load() {
  try{
    tasks = JSON.parse(localStorage.getItem(tasksKey) || '[]');
  }catch(e){ tasks = [] }
  if(tasks.length===0){
    // عين بعض الأمثلة
    tasks = [
      {id: genId(), title:'تصميم صورة منشور عرض', desc:'تصميم صورة للعرض الأسبوعي بحجم 1080x1080', type:'تصميم', note:'ألوان ماركة العميل', created: Date.now()},
      {id: genId(), title:'كتابة تعليق دعائي', desc:'بناء تعليق بثلاث جمل مع هاشتاجات', type:'تعليق', note:'لغة رسمية', created: Date.now()}
    ];
    save();
  }
  render();
}

function save(){
  localStorage.setItem(tasksKey, JSON.stringify(tasks));
  render();
}

function render(){
  tasksList.innerHTML='';
  if(tasks.length===0){ noTasks.style.display='block'; return }
  noTasks.style.display='none';
  tasks.slice().reverse().forEach(t=>{
    const card = document.createElement('div'); card.className='task-card';
    card.innerHTML = `
      <h4>${escapeHtml(t.title)}</h4>
      <div class="task-meta">${escapeHtml(t.type)} • ${new Date(t.created).toLocaleString()}</div>
      <p>${escapeHtml(t.desc || '')}</p>
      <div class="task-actions">
        <button class="btn edit" data-id="${t.id}">تعديل</button>
        <button class="btn delete" data-id="${t.id}">حذف</button>
        <button class="btn share" data-id="${t.id}">مشاركة</button>
      </div>
    `;
    tasksList.appendChild(card);
  });
  // Events
  tasksList.querySelectorAll('.btn.edit').forEach(b=>b.onclick = e=>{
    const id=b.dataset.id; openEdit(id);
  });
  tasksList.querySelectorAll('.btn.delete').forEach(b=>b.onclick = e=>{
    const id=b.dataset.id;
    if(confirm('هل تريد حذف هذه المهمة؟')){ tasks = tasks.filter(x=>x.id!==id); save(); }
  });
  tasksList.querySelectorAll('.btn.share').forEach(b=>b.onclick = e=>{
    const id=b.dataset.id; shareTask(id);
  });
}

function openAdd(){
  editId=null; dialog.showModal(); el('dialog-title').textContent='أضف مهمة';
  titleIn.value=''; descIn.value=''; typeIn.value='نشر'; noteIn.value='';
}

function openEdit(id){
  const t = tasks.find(x=>x.id===id);
  if(!t) return;
  editId = id;
  el('dialog-title').textContent='تعديل مهمة';
  titleIn.value = t.title; descIn.value = t.desc || ''; typeIn.value = t.type || 'نشر'; noteIn.value = t.note || '';
  dialog.showModal();
}

function genId(){ return Math.random().toString(36).slice(2,9) }

form.onsubmit = (e)=>{
  e.preventDefault();
  const data = { title: titleIn.value.trim(), desc: descIn.value.trim(), type: typeIn.value, note: noteIn.value.trim() };
  if(!data.title) return alert('الرجاء وضع عنوان للمهمة');
  if(editId){
    const idx = tasks.findIndex(x=>x.id===editId);
    if(idx!==-1){ tasks[idx] = {...tasks[idx], ...data}; }
  } else {
    tasks.push({id: genId(), ...data, created: Date.now()});
  }
  save();
  dialog.close();
};

el('cancel-task').onclick = ()=>dialog.close();
el('open-add').onclick = openAdd;
el('open-add-hero').onclick = openAdd;

function shareTask(id){
  const t = tasks.find(x=>x.id===id);
  if(!t) return;
  const text = `${t.title}\n${t.desc}\n#Task2`;
  // فتح خيارات المشاركة العامة
  const url = location.origin + location.pathname + '?task=' + encodeURIComponent(id);
  if(navigator.share){
    navigator.share({title:t.title,text, url}).catch(()=>{});
  } else {
    // افتح نافذة مشاركة على تويتر كمثال
    const tw = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text + '\n' + url);
    window.open(tw, '_blank', 'noopener');
  }
}

function escapeHtml(s){ if(!s) return ''; return s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

load();
