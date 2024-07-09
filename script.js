const map = L.map('map', {
    worldCopyJump: true,
    minZoom: 2
}).setView([20, 0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const storyPoints = [
    {
        coords: [51.5074, -0.1278],
        title: "London: The Quantum Nexus",
        content: "In the shadows of Big Ben, you activate the Quantum Resonator. Reality shimmers, revealing hidden dimensions. You must navigate through layers of spacetime to uncover the first Cosmic Keystone.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
        artifact: "Quantum Resonator",
        ability: "Dimensional Shift",
        challenge: {
            question: "Unscramble this word to reveal a key quantum concept: EMENTANGELNMT",
            answer: "ENTANGLEMENT"
        }
    },
    {
        coords: [29.9792, 31.1342],
        title: "Giza: Echoes of Ancient Wisdom",
        content: "The Great Pyramid hums with otherworldly energy. Using the Quantum Resonator, you peer into the past and future simultaneously. The second Cosmic Keystone is hidden in plain sight, guarded by spectral pharaohs.",
        image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",
        artifact: "Ankh of Eternity",
        ability: "Temporal Vision",
        challenge: {
            question: "Solve this riddle: I am the beginning of eternity, the end of time and space, the beginning of every end, and the end of every race. What am I?",
            answer: "E"
        }
    },
    {
        coords: [27.1751, 78.0421],
        title: "Agra: The Temporal Taj",
        content: "At the Taj Mahal, you uncover a hidden chamber that exists outside of time. The third Cosmic Keystone pulses with chrono-energy. You must solve a paradox to claim it without unraveling the fabric of reality.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada",
        artifact: "Chronosphere",
        ability: "Paradox Manipulation",
        challenge: {
            question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
            answer: "Echo"
        }
    },
    {
        coords: [41.9028, 12.4964],
        title: "Rome: Whispers of the Cosmos",
        content: "Beneath the Vatican, an ancient starmap comes to life. It points to a convergence of universes. The fourth Cosmic Keystone is scattered across multiple realities. You must synchronize these realities to reform the Keystone.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        artifact: "Multiversal Compass",
        ability: "Reality Convergence",
        challenge: {
            question: "What has keys but can't open locks?",
            answer: "Piano"
        }
    },
    {
        coords: [1.3521, 103.8198],
        title: "Singapore: Futurescape Odyssey",
        content: "Singapore's skyline becomes a gateway to possible futures. The fifth Cosmic Keystone is hidden in a timeline where humanity has ascended beyond physical form. You must navigate the datastreams of a transcendent civilization.",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
        artifact: "Neuralnet Interface",
        ability: "Digital Ascension",
        challenge: {
            question: "Unscramble this word to reveal a key quantum concept: EMENTANGELNMT",
            answer: "ENTANGLEMENT"
        }
    },
    {
        coords: [-13.1631, -72.5450],
        title: "Machu Picchu: Cosmic Crossroads",
        content: "The ancient citadel resonates with cosmic frequencies. Here, the boundaries between dimensions are thinnest. The sixth Cosmic Keystone requires you to harmonize the energies of multiple universes simultaneously.",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
        artifact: "Harmonic Convergence Crystal",
        ability: "Multiversal Harmonization",
        challenge: {
            question: "What can travel around the world while staying in a corner?",
            answer: "Stamp"
        }
    },
    {
        coords: [35.6762, 139.6503],
        title: "Tokyo: Akashic Overload",
        content: "In Akihabara, you interface with the Akashic Records - the sum of all cosmic knowledge. The final Cosmic Keystone is an idea that can reshape reality. You must comprehend it without losing your sense of self.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
        artifact: "Cosmic Codex",
        ability: "Reality Rewrite",
        challenge: {
            question: "The more you take, the more you leave behind. What am I?",
            answer: "Footsteps"
        }
    },
    {
        coords: [37.7749, -122.4194],
        title: "San Francisco: The Omega Point",
        content: "At the convergence of all timelines, you face the ultimate challenge. With all seven Cosmic Keystones, you must decide the fate of the multiverse. Will you reset reality, merge all universes, or preserve the cosmic balance?",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        artifact: "Universal Core",
        ability: "Cosmic Restructuring",
        challenge: {
            question: "What has to be broken before you can use it?",
            answer: "Egg"
        }
    }
];

let currentPointIndex = -1;
const markers = [];

const customIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
});

storyPoints.forEach((point, index) => {
    const marker = L.marker(point.coords, {icon: customIcon}).addTo(map);
    marker.on('click', () => showStoryPoint(index));
    markers.push(marker);
});

function showStoryPoint(index) {
    currentPointIndex = index;
    const point = storyPoints[index];
    
    gsap.to("#story-panel", {duration: 0.5, opacity: 0, onComplete: () => {
        document.getElementById('location-title').textContent = point.title;
        document.getElementById('story-content').innerHTML = `
            <img src="${point.image}" alt="${point.title}">
            <p>${point.content}</p>
        `;
        
        setupChallenge(point.challenge);
        
        const collectArtifactBtn = document.getElementById('collect-artifact');
        const useAbilityBtn = document.getElementById('use-ability');
        
        collectArtifactBtn.textContent = `Collect ${point.artifact}`;
        useAbilityBtn.textContent = `Use ${point.ability}`;
        
        collectArtifactBtn.classList.remove('hidden');
        useAbilityBtn.classList.add('hidden');
        
        gsap.to("#story-panel", {duration: 0.5, opacity: 1});
    }});

    map.flyTo(point.coords, 10, {
        duration: 2
    });

    updateNavigation();
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = currentPointIndex <= 0;
    nextBtn.disabled = currentPointIndex >= storyPoints.length - 1;
}

function setupChallenge(challenge) {
    const miniGame = document.getElementById('mini-game');
    const description = document.getElementById('challenge-description');
    const input = document.getElementById('challenge-input');
    const submitBtn = document.getElementById('submit-challenge');

    description.textContent = challenge.question;
    input.value = '';
    miniGame.classList.remove('hidden');

    submitBtn.onclick = () => {
        if (input.value.toLowerCase() === challenge.answer.toLowerCase()) {
            showModal('Challenge Completed', 'You\'ve solved the cosmic challenge! The artifact is now yours to collect.');
            miniGame.classList.add('hidden');
            document.getElementById('collect-artifact').classList.remove('hidden');
        } else {
            showModal('Incorrect', 'That\'s not quite right. Try again!');
        }
    };
}

document.getElementById('collect-artifact').addEventListener('click', collectArtifact);
document.getElementById('use-ability').addEventListener('click', useAbility);

function collectArtifact() {
    const point = storyPoints[currentPointIndex];
    showModal(`${point.artifact} Collected!`, `You've acquired the ${point.artifact}. This cosmic relic resonates with otherworldly energy.`);
    document.getElementById('collect-artifact').classList.add('hidden');
    document.getElementById('use-ability').classList.remove('hidden');
}

function useAbility() {
    const point = storyPoints[currentPointIndex];
    showModal(`${point.ability} Activated!`, `You've used ${point.ability}. Reality bends to your will as you manipulate the fabric of spacetime.`);
}

function showModal(title, text) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.remove('hidden');
    
    gsap.from("#modal-content", {duration: 0.5, scale: 0.8, opacity: 0, ease: "back.out(1.7)"});
}

document.getElementById('modal-close').addEventListener('click', () => {
    gsap.to("#modal-content", {
        duration: 0.5,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => {
            document.getElementById('modal').classList.add('hidden');
            gsap.set("#modal-content", { y: 0, opacity: 1 }); // Reset for next opening
        }
    });
});

// Function to show modal with animation
function showModal(title, text) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.remove('hidden');

    gsap.fromTo("#modal-content", 
        { y: 50, opacity: 0 },
        { duration: 0.5, y: 0, opacity: 1, ease: "power2.out" }
    );
}

// Add keyboard event listener to close modal with 'Escape' key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !document.getElementById('modal').classList.contains('hidden')) {
        document.getElementById('modal-close').click();
    }
});

// Function to update progress
function updateProgress() {
    const progress = ((currentPointIndex + 1) / storyPoints.length) * 100;
    gsap.to("#progress-bar", { width: `${progress}%`, duration: 0.5, ease: "power2.out" });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentCategory].length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function startTimer() {
    timeLeft = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 20 : 15; // Adjusted hard difficulty to 15 seconds
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 5) {
            timerElement.classList.add('pulse');
        }
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            selectAnswer(-1); // -1 indicates no answer was selected
            setTimeout(() => nextQuestion(), 1500); // Move to next question after 1.5 seconds
        }
    }, 1000); // Changed to 1000ms for a normal 1-second interval
}

function updateTimerDisplay() {
    timerElement.textContent = timeLeft;
}

function selectAnswer(choiceIndex) {
    clearInterval(timerInterval);
    const buttons = choicesElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
}

// Modify showStoryPoint function to update progress
function showStoryPoint(index) {
    currentPointIndex = index;
    const point = storyPoints[index];
    
    gsap.to("#story-panel", {duration: 0.5, opacity: 0, onComplete: () => {
        document.getElementById('location-title').textContent = point.title;
        document.getElementById('story-content').innerHTML = `
            <img src="${point.image}" alt="${point.title}">
            <p>${point.content}</p>
        `;
        
        setupChallenge(point.challenge);
        
        gsap.to("#story-panel", {duration: 0.5, opacity: 1});
    }});

    map.flyTo(point.coords, 10, {
        duration: 2
    });

    updateNavigation();
    updateProgress();
}


// Initialize progress bar
updateProgress();

// You might want to add a completion modal when the journey is finished
function checkCompletion() {
    if (currentPointIndex === storyPoints.length - 1) {
        showModal("Journey Complete", "Congratulations! You've completed your cosmic odyssey. The multiverse is forever changed by your actions.");
    }
}

// Add this to your next button click event
document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPointIndex < storyPoints.length - 1) {
        showStoryPoint(currentPointIndex + 1);
        checkCompletion();
    }
});

// Function to add subtle parallax effect to the background
function addParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gsap.to("body", {
            backgroundPosition: `${50 + x * 10}% ${50 + y * 10}%`,
            duration: 0.5,
            ease: "power1.out"
        });
    });
}

addParallaxEffect();

// Call this function when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    showStoryPoint(0);
    updateProgress();
});