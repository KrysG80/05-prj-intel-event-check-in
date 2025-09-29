
const form = document.getElementById('checkInForm'); 
const nameInput = document.getElementById('attendeeName');
const teamSelect = document.getElementById('teamSelect');

const teamCounters = {
  water: document.getElementById('waterCount'),
  zero: document.getElementById('zeroCount'),
  power: document.getElementById('powerCount'),
};


const attendanceCountEl = document.getElementById('attendanceCount');
const maxCountEl = document.getElementById('maxCount');
const progressBar = document.getElementById('progressBar');

const greetingEl = document.getElementById('greeting');


let count = Number(attendanceCountEl?.textContent) || 0;
const maxCount = Number(maxCountEl?.textContent) || 50;

if (maxCountEl) maxCountEl.textContent = maxCount;


function updateProgress() {
  const percentNumber = Math.round((count / maxCount) * 100);
  if (progressBar) {
    progressBar.style.width = `${percentNumber}%`;
    progressBar.setAttribute('aria-valuenow', String(percentNumber));
  }
}

function updateAttendanceCount() {
  if (attendanceCountEl) attendanceCountEl.textContent = String(count);
}

function incrementTeam(teamKey) {
  const el = teamCounters[teamKey];
  if (!el) return;
  const current = parseInt(el.textContent || '0', 10);
  el.textContent = String(current + 1);
}

function showGreeting(name, teamName) {
  if (!greetingEl) return;
  greetingEl.textContent = `🎉 Welcome, ${name} from ${teamName}!`;
  greetingEl.style.display = "block";   // 👈 add this
}


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const team = teamSelect.value; 
  const teamName = teamSelect.selectedOptions?.[0]?.text || '';

  if (!name || !team) return; 


  count += 1;
  updateAttendanceCount();
  updateProgress();
  incrementTeam(team);
  showGreeting(name, teamName);

  
  form.reset();
});
