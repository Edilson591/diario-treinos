const exerciseOptions = [
  "Supino reto",
  "Supino inclinado",
  "Supino declinado",
  "Crucifixo",
  "Cross Over",
  "Peck Deck",
  "Flexão de braço",

  "Barra fixa",
  "Puxada frontal",
  "Remada baixa",
  "Remada curvada",
  "Remada unilateral",
  "Pulldown",
  "Levantamento terra",

  "Desenvolvimento",
  "Arnold Press",
  "Elevação lateral",
  "Elevação frontal",
  "Crucifixo inverso",
  "Face Pull",
  "Encolhimento",

  "Rosca direta",
  "Rosca alternada",
  "Rosca martelo",
  "Rosca Scott",
  "Rosca concentrada",
  "Rosca inversa",

  "Tríceps pulley",
  "Tríceps corda",
  "Tríceps francês",
  "Tríceps testa",
  "Tríceps coice",
  "Mergulho",

  "Agachamento livre",
  "Agachamento frontal",
  "Agachamento sumô",
  "Leg Press",
  "Hack Squat",
  "Cadeira extensora",
  "Mesa flexora",
  "Cadeira flexora",
  "Afundo",
  "Passada",
  "Bulgarian Split Squat",
  "Stiff",
  "Terra romeno",

  "Hip Thrust",
  "Elevação pélvica",
  "Glúteo na polia",
  "Abdução",
  "Adução",

  "Panturrilha em pé",
  "Panturrilha sentada",
  "Panturrilha no Leg Press",

  "Abdominal reto",
  "Abdominal infra",
  "Abdominal oblíquo",
  "Prancha",
  "Prancha lateral",
  "Elevação de pernas",
  "Ab Wheel",

  "Esteira",
  "Bicicleta",
  "Elíptico",
  "Escada",
  "Remo",

  "Burpee",
  "Mountain Climber",
  "Kettlebell Swing",
  "Farmer Walk",
  "Thruster"
];




const form = document.getElementById('exercise-form');
const exercisesList = document.getElementById('exercises-list');
const filterDay = document.getElementById('filter-day');
const exerciseInput = document.getElementById("exercise-name");
const suggestions = document.getElementById("exercise-suggestions");
const sets = document.getElementById('exercise-sets');
const name = document.getElementById('exercise-name')
const day = document.getElementById('exercise-day')

const reps = document.getElementById('exercise-reps');

const weight = document.getElementById('exercise-weight');

let exercises = JSON.parse(localStorage.getItem('trainingDiary')) || [];

function save() {
  localStorage.setItem('trainingDiary', JSON.stringify(exercises));
}

function render() {
  const filter = filterDay.value;
  const filtered = filter === 'Todos'
    ? exercises
    : exercises.filter(e => e.day === filter);

  if (filtered.length === 0) {
    exercisesList.innerHTML =
      '<div class="text-center text-gray-500 italic py-8">Nenhum exercício registrado.</div>';
    return;
  }

  exercisesList.innerHTML = filtered.map((ex) => {
    const realIndex = exercises.indexOf(ex);
    return `
      <div class="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3.5 transition gap-3 flex-wrap">
        <div class="flex items-center flex-wrap gap-3">
          <span class="font-semibold text-gold-400 min-w-[130px]">${escapeHtml(ex.name)}</span>
          <span class="text-xs text-gray-300 bg-white/10 px-2.5 py-1 rounded-full">${ex.sets} x ${ex.reps}</span>
          <span class="text-xs text-gray-300 bg-white/10 px-2.5 py-1 rounded-full">${ex.weight} kg</span>
          <span class="text-xs font-semibold text-dark-900 bg-gold-400 px-2.5 py-1 rounded-full">${ex.day}</span>
        </div>
        <button class="btn-remove text-xs text-red-400 border border-red-400/50 hover:bg-red-400/10 px-3 py-1.5 rounded-lg transition cursor-pointer" data-index="${realIndex}">Excluir</button>
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const dayValue = day.value;
  const nameValue = name.value.trim();
  const setsValues = sets.value;
  const repsValues = reps.value.trim();
  const weightValues = weight.value.trim();


  let isValid = true;

  clearError('exercise-name');
  clearError('exercise-day');
  clearError('exercise-sets');
  clearError('exercise-reps');
  clearError('exercise-weight');


  if (!nameValue) {
    showError('exercise-name', 'Informe o nome do exercício.');
    isValid = false;
  }

  if (!dayValue) {
    showError('exercise-day', 'Selecione um dia.');
    isValid = false;
  }

  if (!setsValues) {
    showError('exercise-sets', 'Informe a quantidade de séries.');
    isValid = false;
  }

  if (!repsValues) {
    showError('exercise-reps', 'Informe as repetições.');
    isValid = false;
  }

  if (!weightValues) {
    showError('exercise-weight', 'Informe a carga.');
    isValid = false;
  }

  if (!isValid) return;


  exercises.push({ name: nameValue, day: dayValue, sets: setsValues, reps:repsValues, weight: weightValues });
  save();
  render();
  form.reset();
});

function initExerciseEvents() {

  name.addEventListener("input", function () {
    if (this.value.length > 0) {
      clearError('exercise-name');
    }
  });

  day.addEventListener("change", function () {
    if (this.value.length > 0) {
      clearError('exercise-day');
    }
  });

  sets.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 0) {
      clearError('exercise-sets');
    }
  });

  reps.addEventListener("input", function () {
    this.value = this.value
      .replace(/[^\d-]/g, '')
      .replace(/-+/g, '-')
      .replace(/(.*?)-(.*?)-.*/, '$1-$2');

    if (this.value.length > 0) {
      clearError('exercise-reps');
    }
  });

  weight.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');

    if (this.value.length > 0) {
      clearError('exercise-weight');
    }
  });

  exercisesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
      const index = parseInt(e.target.dataset.index);
      exercises.splice(index, 1);
      save();
      render();
    }
  });

  exerciseInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    if (!value) {
      suggestions.classList.add("hidden");
      return;
    }

    const filtered = exerciseOptions.filter(exercise =>
      exercise.toLowerCase().includes(value)
    );

    suggestions.innerHTML = filtered
      .map(exercise => `
        <div class="px-3 py-2 text-gray-200 hover:bg-gold-400 hover:text-dark-900 cursor-pointer transition">
          ${exercise}
        </div>
      `)
      .join("");

    suggestions.classList.toggle("hidden", filtered.length === 0);
  });

  suggestions.addEventListener("click", (e) => {
    if (e.target.textContent) {
      exerciseInput.value = e.target.textContent.trim();
      suggestions.classList.add("hidden");
    }
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".relative")) {
      suggestions.classList.add("hidden");
    }
  });

}


function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(`${inputId}-error`);

  input.classList.remove('border-white/20');
  input.classList.add('border-red-500');

  error.textContent = message;
  error.classList.remove('hidden');
}



function clearError(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(`${inputId}-error`);

  input.classList.remove('border-red-500');
  input.classList.add('border-white/20');

  error.textContent = '';
  error.classList.add('hidden');
}


filterDay.addEventListener('change', render);

render();
initExerciseEvents();
