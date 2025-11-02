// static/js/main.js
// Client-only data + behavior (no server needed)

// === Editable data block ===
// Change these arrays in this file if you want to update teachers, routine, management.
// Alternatively you can generate this file from a script before redeploying.
const DATA = {
  daily_routine: [
    { time: '06:30 AM', activity: 'Assembly' },
    { time: '07:00 AM', activity: 'First Period' },
    { time: '07:30 AM', activity: 'Second Period' },
    { time: '08:00 PM', activity: 'Lunch Break' },
    { time: '08:30 PM', activity: 'Afternoon Classes' }
  ],
  teachers: [
    { name: 'Suman Chaubey', subject: 'TGT Social Science' },
    { name: 'Farhan Maseeh', subject: 'TGT Urdu' },
    { name: 'Munni Devi', subject: 'TGT Social Sciene' },
	{ name: 'Kanchan Pandey', subject: 'TGT Hindi' },
    { name: 'Suhail Afsar', subject: 'TRE 1 Basic Urdu' },
    { name: 'Dinesh Kumar Singh', subject: 'Basic Grade General' },
	{ name: 'Akhauri Shalini', subject: 'Baisc Grade General' },
    { name: 'Rupam Kumari', subject: 'Basic Grade General' },
    { name: 'Vimala Kumari', subject: 'Basic Grade General' },
	{ name: 'Sunita Kumari', subject: 'Basic Grade General' },
    { name: 'Swati Kumari', subject: 'Basic Grade General' },
    { name: 'Vindhyavashni Dutt', subject: 'Basic Grade General' },
	{ name: 'Md. Vazeer Kureishi', subject: 'Basic Grade Urdu' },
    { name: 'Mujibur Rahman', subject: 'Basic Grade General' },
    { name: 'Chanda Kumari', subject: 'Basic Grade General' },
	{ name: 'Seema Kumari', subject: 'Basic Grade General' },
    { name: 'Shahina Khatoon', subject: 'Basic Grade General' },
    { name: 'Kumari Mala', subject: 'Basic Grade General (Nagar Shikshak)' },
	{ name: 'Chitranjan Tiwari', subject: 'Physical Education & Health Instratuctor' }
  ],
  management: [
    { role: 'Headmaster', name: 'Mr. Prabhakar Dubey' }
  ]
};
// === end editable block ===

// Load counts from counts.json (editable)
async function loadCounts(){
  try{
    const r = await fetch('/counts.json');
    if(!r.ok) throw new Error('counts.json missing');
    const c = await r.json();
    animateCount('students-count', c.students || 750, 1200);
    animateCount('teachers-count', c.teachers || 19, 1200);
  }catch(e){
    // fallback
    animateCount('students-count', 750, 1200);
    animateCount('teachers-count', 19, 1200);
  }
}

function animateCount(id, to, duration=1000){
  const el = document.getElementById(id);
  if(!el) return;
  const start = 0;
  const range = to - start;
  let startTime = null;
  function step(timestamp){
    if(!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime)/duration, 1);
    el.innerText = Math.floor(progress * range + start);
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function populateStaticLists(){
  const rlist = document.getElementById('routine-list');
  DATA.daily_routine.forEach(i=>{
    const div = document.createElement('div');
    div.className='p-4 border rounded-lg shadow-sm hover:shadow-md transition';
    div.innerHTML = `<div class="text-sm text-gray-500">${i.time}</div><div class="font-medium">${i.activity}</div>`;
    rlist.appendChild(div);
  });

  const tlist = document.getElementById('teachers-list');
  DATA.teachers.forEach(t=>{
    const d = document.createElement('div');
    d.className='p-4 bg-white rounded-lg shadow-sm';
    d.innerHTML = `<div class="font-semibold">${t.name}</div><div class="text-sm text-gray-500">${t.subject}</div>`;
    tlist.appendChild(d);
  });

  const mlist = document.getElementById('management-list');
  DATA.management.forEach(m=>{
    const dl = document.createElement('div');
    dl.className='p-4 border rounded-lg';
    dl.innerHTML = `<div class="font-medium">${m.role}</div><div class="text-sm text-gray-600">${m.name}</div>`;
    mlist.appendChild(dl);
  });
}

// Location helper: open Google Maps directions in a new tab
function handleGetDirections(){
  const city = document.getElementById('visitor-city').value.trim();
  const noteEl = document.getElementById('directions-note');
  const schoolCoords = { lat: 25.5920, lon: 84.0048 }; // approx coords for Ahirauli / Buxar
  if(!city){
    noteEl.innerText = 'Please enter your city to open directions.';
    return;
  }
  // Use Google Maps directions (opens in new tab). This does not require API key in URL.
  const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(city)}&destination=${schoolCoords.lat},${schoolCoords.lon}&travelmode=driving`;
  window.open(url, '_blank');
  noteEl.innerText = `Directions opened in a new tab.`;
}

// Contact form: we rely on Formspree or host-specific form handlers.
// Show a friendly message after submit.
function initContactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    // Let Formspree handle the POST; show user feedback
    setTimeout(()=>{ alert('Thanks — your message was sent.'); form.reset(); }, 400);
  });
}

// Mobile menu toggle (very small)
function initMobileToggle(){
  const btn = document.getElementById('mobile-toggle');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    // simple toggle to show/hide nav links (for small screens)
    const nav = document.querySelector('nav .md\\:hidden + div, nav .hidden.md\\:flex');
    // fallback: quickly scroll to nav anchors (we'll keep it simple)
    alert('On smaller screens, use the top links — small menu behavior can be customized later.');
  });
}

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  loadCounts();
  populateStaticLists();
  initContactForm();
  initMobileToggle();
});
