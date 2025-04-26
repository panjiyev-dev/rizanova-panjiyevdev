// DOM Elements
const heroCarousel = document.querySelector('.hero-carousel');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselIndicators = document.querySelectorAll('.carousel-indicators .indicator');
const carouselPrevBtn = document.querySelector('.carousel-container .prev-btn');
const carouselNextBtn = document.querySelector('.carousel-container .next-btn');

const releasesTrack = document.querySelector('.releases-track');
const releasesPrevBtn = document.querySelector('.releases-slider .prev-btn');
const releasesNextBtn = document.querySelector('.releases-slider .next-btn');

const clipsTrack = document.querySelector('.clips-track');
const clipsPrevBtn = document.querySelector('.clips-slider .prev-btn');
const clipsNextBtn = document.querySelector('.clips-slider .next-btn');

const audioPlayer = document.getElementById('audioPlayer');
const audioElement = document.getElementById('audioElement');
const playPauseBtn = document.querySelector('.play-pause-btn');
const prevSongBtn = document.querySelector('.prev-song-btn');
const nextSongBtn = document.querySelector('.next-song-btn');
const shuffleBtn = document.querySelector('.shuffle-btn');
const repeatBtn = document.querySelector('.repeat-btn');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const volumeBtn = document.querySelector('.volume-btn');
const volumeSlider = document.querySelector('.volume-slider');
const volumeProgress = document.querySelector('.volume-progress');

const allPlayButtons = document.querySelectorAll('.play-btn');

// Music Data
const songs = [
    {
        title: 'Sexta',
        artist: 'SHXZ, Avazbanov',
        cover: 'https://api.rizanova.uz/uploads/music/jpg/1745483376088.jpg',
        audio: 'https://storage.rizanova.uz/uploads/music/mp3/128/SHXZ__Axadjanov__Soxta_2025_1745483326477.mp3'
    },
    {
        title: 'Hech kim yo\'q',
        artist: 'Konsta',
        cover: 'https://api.rizanova.uz/uploads/music/jpg/1744958386936.jpg',
        audio: 'https://storage.rizanova.uz/uploads/music/mp3/128/Konsta__Hech_kim_yoq_2025_1744958357440.mp3'
    },
    {
        title: 'Lablaridan',
        artist: 'Zafar Ergashov, Firuz Ruzmetov',
        cover: 'https://api.rizanova.uz/uploads/music/jpg/1745479751931.jpg',
        audio: 'https://storage.rizanova.uz/uploads/music/mp3/128/Zafar_Ergashov__Firuz_Ruzmetov__Lablaridan_1745479727192.mp3'
    },
    {
        title: 'Qizim',
        artist: 'Lobarxon',
        cover: 'https://api.rizanova.uz/uploads/music/jpg/1745483800685.jpg',
        audio: 'https://storage.rizanova.uz/uploads/music/mp3/128/Lobarxon__Qizim_2025_1745483768303.mp3'
    }
];

// Current state
let currentSlide = 0;
let currentSong = 0;
let isPlaying = false;
let isShuffled = false;
let isRepeating = false;

// Hero Carousel Functionality
function showSlide(index) {
    // Hide all slides
    carouselSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all indicators
    carouselIndicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show the current slide and activate indicator
    carouselSlides[index].classList.add('active');
    carouselIndicators[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    let newIndex = currentSlide + 1;
    if (newIndex >= carouselSlides.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}

function prevSlide() {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
        newIndex = carouselSlides.length - 1;
    }
    showSlide(newIndex);
}

// Initialize carousel
showSlide(0);

// Auto slide every 5 seconds
let carouselInterval = setInterval(nextSlide, 5000);

// Reset interval when manually changing slides
function resetCarouselInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

// Event listeners for carousel
carouselPrevBtn.addEventListener('click', () => {
    prevSlide();
    resetCarouselInterval();
});

carouselNextBtn.addEventListener('click', () => {
    nextSlide();
    resetCarouselInterval();
});

carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        resetCarouselInterval();
    });
});

// Horizontal Sliders Functionality
function scrollSlider(element, direction, amount) {
    if (direction === 'left') {
        element.scrollBy({
            left: -amount,
            behavior: 'smooth'
        });
    } else {
        element.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    }
}

// Event listeners for releases slider
releasesPrevBtn.addEventListener('click', () => {
    scrollSlider(releasesTrack, 'left', 300);
});

releasesNextBtn.addEventListener('click', () => {
    scrollSlider(releasesTrack, 'right', 300);
});

// Event listeners for clips slider
clipsPrevBtn.addEventListener('click', () => {
    scrollSlider(clipsTrack, 'left', 300);
});

clipsNextBtn.addEventListener('click', () => {
    scrollSlider(clipsTrack, 'right', 300);
});

// Audio Player Functionality
function loadSong(index) {
    const song = songs[index];
    
    // Update song info
    document.querySelector('.song-title').textContent = song.title;
    document.querySelector('.song-artist').textContent = song.artist;
    document.querySelector('.song-image img').src = song.cover;
    
    // Update audio source
    audioElement.src = song.audio;
    
    // Reset progress
    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    
    currentSong = index;
}

function playSong() {
    audioPlayer.classList.add('active');
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
    audioElement.play();
}

function pauseSong() {
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
    audioElement.pause();
}

function playPauseToggle() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function prevSong() {
    let newIndex;
    
    if (isShuffled) {
        newIndex = Math.floor(Math.random() * songs.length);
    } else {
        newIndex = currentSong - 1;
        if (newIndex < 0) {
            newIndex = songs.length - 1;
        }
    }
    
    loadSong(newIndex);
    playSong();
}

function nextSong() {
    let newIndex;
    
    if (isShuffled) {
        newIndex = Math.floor(Math.random() * songs.length);
    } else {
        newIndex = currentSong + 1;
        if (newIndex >= songs.length) {
            newIndex = 0;
        }
    }
    
    loadSong(newIndex);
    playSong();
}

function toggleShuffle() {
    isShuffled = !isShuffled;
    if (isShuffled) {
        shuffleBtn.style.color = '#e91e63';
    } else {
        shuffleBtn.style.color = '#666';
    }
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    if (isRepeating) {
        repeatBtn.style.color = '#e91e63';
    } else {
        repeatBtn.style.color = '#666';
    }
}

function updateProgress(e) {
    const { duration, currentTime } = e.target;
    
    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Update time displays
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    
    if (duration) {
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        totalTimeEl.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;
    
    audioElement.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / width;
    
    audioElement.volume = volume;
    volumeProgress.style.width = `${volume * 100}%`;
    
    // Update volume icon
    if (volume === 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

function toggleMute() {
    if (audioElement.volume > 0) {
        // Store current volume before muting
        audioElement.dataset.prevVolume = audioElement.volume;
        audioElement.volume = 0;
        volumeProgress.style.width = '0%';
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        // Restore previous volume
        const prevVolume = audioElement.dataset.prevVolume || 1;
        audioElement.volume = prevVolume;
        volumeProgress.style.width = `${prevVolume * 100}%`;
        
        if (prevVolume < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
}

// Initialize audio player
loadSong(0);

// Event listeners for audio player
playPauseBtn.addEventListener('click', playPauseToggle);
prevSongBtn.addEventListener('click', prevSong);
nextSongBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
audioElement.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
volumeSlider.addEventListener('click', setVolume);
volumeBtn.addEventListener('click', toggleMute);

audioElement.addEventListener('ended', () => {
    if (isRepeating) {
        // Replay the same song
        audioElement.currentTime = 0;
        playSong();
    } else {
        // Play next song
        nextSong();
    }
});

// Play buttons on cards
allPlayButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // If index is within songs array range
        if (index < songs.length) {
            loadSong(index);
            playSong();
        } else {
            // Default to first song if index is out of range
            loadSong(0);
            playSong();
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.header-actions').prepend(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
    document.querySelector('.main-nav').classList.toggle('active');
});

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
            font-size: 20px;
            color: #666;
        }
        
        .main-nav {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 20px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            display: none;
            z-index: 1000;
        }
        
        .main-nav.active {
            display: block;
        }
        
        .main-nav ul {
            flex-direction: column;
            gap: 15px;
        }
    }
`;
document.head.appendChild(style);

// Initialize with default volume
audioElement.volume = 0.7;
volumeProgress.style.width = '70%';