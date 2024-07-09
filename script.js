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
        content: "In the shadows of Big Ben, you stumble upon a hidden laboratory. Inside, a brilliant scientist has created a device that can manipulate the fabric of spacetime. As you activate it, reality begins to warp around you...",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
    },
    {
        coords: [29.9792, 31.1342],
        title: "Giza: Echoes of Ancient Wisdom",
        content: "The Great Pyramid pulses with an otherworldly energy. As you place the quantum device at its apex, a beam of light shoots into the cosmos. Suddenly, you're transported through time, witnessing the pyramid's construction and the secrets of the pharaohs...",
        image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368"
    },
    {
        coords: [27.1751, 78.0421],
        title: "Agra: The Temporal Taj",
        content: "At the Taj Mahal, you uncover a hidden chamber beneath the mausoleum. Inside, you find an artifact that resonates with your quantum device. As they interact, you're thrust into a series of parallel universes, each showing a different fate for this wonder of the world...",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada"
    },
    {
        coords: [41.9028, 12.4964],
        title: "Rome: Whispers of the Cosmos",
        content: "In the heart of Vatican City, you discover an ancient observatory. Your quantum device interfaces with the centuries-old instruments, revealing a map of the stars unlike any you've seen. It points to a distant galaxy, hinting at the next leg of your journey...",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5"
    },
    {
        coords: [1.3521, 103.8198],
        title: "Singapore: Futurescape Odyssey",
        content: "The futuristic skyline of Singapore blurs as your quantum device malfunctions. Reality flickers between past, present, and potential futures. In this temporal storm, you glimpse a utopian world and must decide whether to pursue it or return to your own time...",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd"
    },
    {
        coords: [-13.1631, -72.5450],
        title: "Machu Picchu: Cosmic Crossroads",
        content: "Atop the ancient Incan citadel, your quantum device resonates with the precise stonework. A portal opens, offering glimpses of other worlds and dimensions. You realize you're at a cosmic crossroads, with the power to shape the destiny of not just Earth, but the entire universe...",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377"
    },
    {
        coords: [35.6762, 139.6503],
        title: "Tokyo: Temporal Convergence",
        content: "In the neon-lit streets of Akihabara, your journey reaches its climax. The quantum device has led you to a secret society of time travelers. They reveal that your actions have been shaping the course of history across multiple timelines. Now, you must make a choice that will echo through eternity...",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf"
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