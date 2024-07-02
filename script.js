let state = {
    health: 100,
    happiness: 100,
    evolutionStage: 0,
    evolveThresholds: [
        { health: 150, happiness: 150, stage: 1, class: 'creature1' },
        { health: 250, happiness: 250, stage: 2, class: 'creature2' }
    ]
};

function updateUI() {
    document.getElementById('health').innerText = state.health;
    document.getElementById('happiness').innerText = state.happiness;
    const eggElement = document.getElementById('petEgg');
    if (state.evolutionStage > 0) {
        eggElement.className = `egg ${state.evolveThresholds[state.evolutionStage].class}`;
    } else {
        eggElement.className = 'egg';
    }
}

function interact(action) {
    if (action === 'feed') {
        state.health = Math.min(state.health + 10, 300);
    } else if (action === 'play') {
        state.happiness = Math.min(state.happiness + 10, 300);
    } else if (action === 'clean') {
        state.health = Math.min(state.health + 5, 300);
        state.happiness = Math.min(state.happiness + 5, 300);
    }
    triggerAnimation();
    checkEvolution();
    updateUI();
}

function checkEvolution() {
    for (let threshold of state.evolveThresholds) {
        if (state.health >= threshold.health && state.happiness >= threshold.happiness && state.evolutionStage < threshold.stage) {
            state.evolutionStage = threshold.stage;
        }
    }
}

function triggerAnimation() {
    const eggElement = document.getElementById('petEgg');
    eggElement.classList.add('animate');
    setTimeout(() => eggElement.classList.remove('animate'), 500);
}

updateUI();
