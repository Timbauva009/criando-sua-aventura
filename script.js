// ===============================
// Estado da aventura
// ===============================
const state = {
  currentScene: 'start',
  choicesMade: []
};

// ===============================
// Salvar e carregar progresso
// ===============================
function saveState() {
  localStorage.setItem('adventureState', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('adventureState');
  if (saved) {
    Object.assign(state, JSON.parse(saved));
  }
}

// ===============================
// Mostrar a cena correta
// ===============================
function showScene(sceneId) {
  const scenes = document.querySelectorAll('[data-scene]');
  scenes.forEach(scene => {
    scene.style.display = (scene.dataset.scene === sceneId) ? 'block' : 'none';
  });
  state.currentScene = sceneId;
  saveState();
}

// ===============================
// Lógica de escolhas
// ===============================
function choose(option) {
  state.choicesMade.push({ scene: state.currentScene, choice: option });
  saveState();

  // Transições conforme HTML que fizemos
  switch(state.currentScene) {
    case 'start':
      if(option === 'goLeft') showScene('leftPath');
      else if(option === 'goRight') showScene('rightPath');
      break;

    case 'leftPath':
      if(option === 'exploreCave') showScene('exploreCave');
      else if(option === 'returnStart') showScene('start');
      break;

    case 'rightPath':
      if(option === 'crossBridge') showScene('crossBridge');
      else if(option === 'returnStart') showScene('start');
      break;

    case 'exploreCave':
    case 'crossBridge':
      if(option === 'returnStart') showScene('start');
      break;

    default:
      console.warn('Cena desconhecida:', state.currentScene);
  }
}

// ===============================
// Inicialização
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  showScene(state.currentScene);

  const buttons = document.querySelectorAll('[data-choice]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      choose(btn.dataset.choice);
    });
  });
});