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
        ability: "Dimensional Shift"
    },
    {
        coords: [29.9792, 31.1342],
        title: "Giza: Echoes of Ancient Wisdom",
        content: "The Great Pyramid hums with otherworldly energy. Using the Quantum Resonator, you peer into the past and future simultaneously. The second Cosmic Keystone is hidden in plain sight, guarded by spectral pharaohs.",
        image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368",
        artifact: "Ankh of Eternity",
        ability: "Temporal Vision"
    },
    {
        coords: [27.1751, 78.0421],
        title: "Agra: The Temporal Taj",
        content: "At the Taj Mahal, you uncover a hidden chamber that exists outside of time. The third Cosmic Keystone pulses with chrono-energy. You must solve a paradox to claim it without unraveling the fabric of reality.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada",
        artifact: "Chronosphere",
        ability: "Paradox Manipulation"
    },
    {
        coords: [41.9028, 12.4964],
        title: "Rome: Whispers of the Cosmos",
        content: "Beneath the Vatican, an ancient starmap comes to life. It points to a convergence of universes. The fourth Cosmic Keystone is scattered across multiple realities. You must synchronize these realities to reform the Keystone.",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        artifact: "Multiversal Compass",
        ability: "Reality Convergence"
    },
    {
        coords: [1.3521, 103.8198],
        title: "Singapore: Futurescape Odyssey",
        content: "Singapore's skyline becomes a gateway to possible futures. The fifth Cosmic Keystone is hidden in a timeline where humanity has ascended beyond physical form. You must navigate the datastreams of a transcendent civilization.",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
        artifact: "Neuralnet Interface",
        ability: "Digital Ascension"
    },
    {
        coords: [-13.1631, -72.5450],
        title: "Machu Picchu: Cosmic Crossroads",
        content: "The ancient citadel resonates with cosmic frequencies. Here, the boundaries between dimensions are thinnest. The sixth Cosmic Keystone requires you to harmonize the energies of multiple universes simultaneously.",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
        artifact: "Harmonic Convergence Crystal",
        ability: "Multiversal Harmonization"
    },
    {
        coords: [35.6762, 139.6503],
        title: "Tokyo: Akashic Overload",
        content: "In Akihabara, you interface with the Akashic Records - the sum of all cosmic knowledge. The final Cosmic Keystone is an idea that can reshape reality. You must comprehend it without losing your sense of self.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
        artifact: "Cosmic Codex",
        ability: "Reality Rewrite"
    },
    {
        coords: [37.7749, -122.4194],
        title: "San Francisco: The Omega Point",
        content: "At the convergence of all timelines, you face the ultimate challenge. With all seven Cosmic Keystones, you must decide the fate of the multiverse. Will you reset reality, merge all universes, or preserve the cosmic balance?",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        artifact: "Universal Core",
        ability: "Cosmic Restructuring"
    }
];

let currentPointIndex = -1;
const markers = [];
let cosmicEnergy = 0;

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

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPointIndex > 0) {
        showStoryPoint(currentPointIndex - 1);
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPointIndex < storyPoints.length - 1) {
        showStoryPoint(currentPointIndex + 1);
    }
});

document.getElementById('collect-artifact').addEventListener('click', collectArtifact);
document.getElementById('use-ability').addEventListener('click', useAbility);

function collectArtifact() {
    const point = storyPoints[currentPointIndex];
    showModal(`${point.artifact} Collected!`, `You've acquired the ${point.artifact}. This cosmic relic resonates with otherworldly energy.`);
    document.getElementById('collect-artifact').classList.add('hidden');
    document.getElementById('use-ability').classList.remove('hidden');
    updateCosmicEnergy(20);
}

function useAbility() {
    const point = storyPoints[currentPointIndex];
    showModal(`${point.ability} Activated!`, `You've used ${point.ability}. Reality bends to your will as you manipulate the fabric of spacetime.`);
    updateCosmicEnergy(-10);
}

function updateCosmicEnergy(amount) {
    cosmicEnergy += amount;
    cosmicEnergy = Math.max(0, Math.min(100, cosmicEnergy));
    document.getElementById('energy-bar').style.width = `${cosmicEnergy}%`;
    
    if (cosmicEnergy >= 100) {
        showModal("Cosmic Apotheosis", "You've reached the pinnacle of cosmic energy. The multiverse bends to your will!");
    } else if (cosmicEnergy <= 0) {
        showModal("Energy Depleted", "Your cosmic energy is depleted. Collect more artifacts to continue your journey.");
    }
}

function showModal(title, text) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.remove('hidden');
}

document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

// Initialize with the first story point
showStoryPoint(0);

// Add a pulsing effect to the markers
function pulseMarker(marker) {
    gsap.to(marker._icon, {
        scale: 1.2,
        opacity: 0.8,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
    });
}

markers.forEach(pulseMarker);

// Add Three.js background effect
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF });

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 1;

function animateStars() {
    requestAnimationFrame(animateStars);
    stars.rotation.y += 0.0002;
    renderer.render(scene, camera);
}

animateStars();

// Resize handler
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});