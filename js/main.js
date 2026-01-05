document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('login-page')) {
        setupLoginPage();
    }
    if (document.body.classList.contains('banner-body') || document.getElementById('main-music')) {
        setupHeader();
    }
    if (document.body.classList.contains('main-content-body')) {
        setupDashboard();
    }
    if (document.querySelector('.binary-wall') || document.getElementById('calc-display-broken')) {
        setupDeadCalc();
    }
});
window.goHome = function () {
    try {
        if (window.parent && window.parent.document) {
            const frameset = window.parent.document.querySelector('frameset');
            if (frameset) frameset.rows = "0,*";
            const mainFrameElement = window.parent.document.getElementsByName('main')[0];
            if (mainFrameElement) {
                mainFrameElement.src = "pages/dashboard.html";
            }
        }
    } catch (e) {
        console.error("Navigation error:", e);
        window.top.location.reload();
    }
    return false;
};
window.openService = function (url) {
    try {
        if (window.parent && window.parent.document) {
            const frameset = window.parent.document.querySelector('frameset');
            if (frameset) {
                frameset.rows = "85,*";
                frameset.setAttribute('rows', '85,*');
            }
        }
    } catch (e) {
        console.error("Frame resize error:", e);
    }
    setTimeout(() => {
        window.location.href = url;
    }, 100);
};
function setupLoginPage() {
    const audio = document.getElementById('login-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    if (!audio) return;
    let isManuallyPaused = false;
    audio.volume = 0.4;
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    isManuallyPaused = false;
                    playPauseBtn.textContent = '❚❚';
                }).catch(e => console.error("Audio playback failed:", e));
            } else {
                audio.pause();
                isManuallyPaused = true;
                playPauseBtn.textContent = '▶';
            }
        });
    }
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            audio.muted = !audio.muted;
            muteBtn.textContent = audio.muted ? '🔇' : '🔊';
        });
    }
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
            audio.muted = false;
            muteBtn.textContent = '🔊';
        });
    }
    audio.addEventListener('play', () => { if (playPauseBtn) playPauseBtn.textContent = '❚❚'; });
    audio.addEventListener('pause', () => { if (playPauseBtn) playPauseBtn.textContent = '▶'; });
    
    function tryPlay() {
        if (!isManuallyPaused && audio.paused) {
            audio.play().catch(e => { });
        }
    }
    tryPlay();
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach(evt => {
        document.body.addEventListener(evt, tryPlay, { once: false });
    });
    audio.addEventListener('ended', () => { if (!isManuallyPaused) audio.play(); });
}
function setupHeader() {
    const audio = document.getElementById('main-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    if (!audio) return;
    let isManuallyPaused = false;
    audio.volume = 0.4;
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    isManuallyPaused = false;
                    playPauseBtn.textContent = '❚❚';
                }).catch(e => console.error("Audio playback failed:", e));
            } else {
                audio.pause();
                isManuallyPaused = true;
                playPauseBtn.textContent = '▶';
            }
        });
    }
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            audio.muted = !audio.muted;
            muteBtn.textContent = audio.muted ? '🔇' : '🔊';
        });
    }
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
            audio.muted = false;
            muteBtn.textContent = '🔊';
        });
    }
    audio.addEventListener('play', () => { if (playPauseBtn) playPauseBtn.textContent = '❚❚'; });
    audio.addEventListener('pause', () => { if (playPauseBtn) playPauseBtn.textContent = '▶'; });
    function tryPlay() {
        if (!isManuallyPaused && audio.paused) {
            audio.play().catch(e => { });
        }
    }
    tryPlay();
    ['click', 'keydown', 'mousemove', 'touchstart'].forEach(evt => {
        document.body.addEventListener(evt, tryPlay, { once: false });
    });
    audio.addEventListener('ended', () => { if (!isManuallyPaused) audio.play(); });
    setInterval(() => {
        if (!isManuallyPaused && audio.paused) {
            audio.play().catch(() => { });
        }
    }, 2000);
}
function setupDashboard() {
    
    const serviceToggle = document.getElementById('service-toggle');
    const serviceDrawer = document.getElementById('service-drawer');
    if (serviceToggle && serviceDrawer) {
        serviceToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            serviceDrawer.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (serviceDrawer.classList.contains('active') &&
                !serviceDrawer.contains(e.target) &&
                e.target !== serviceToggle) {
                serviceDrawer.classList.remove('active');
            }
        });
    }
    
    const rightPanel = document.getElementById('right-panel');
    const toggleBtn = document.getElementById('toggle-btn');
    const toggleIcon = document.getElementById('toggle-icon');
    if (toggleBtn && rightPanel) {
        toggleBtn.addEventListener('click', () => {
            rightPanel.classList.toggle('collapsed');
            if (toggleIcon) {
                toggleIcon.textContent = rightPanel.classList.contains('collapsed') ? '◀' : '▶';
            }
        });
    }
    
    const playPauseBtn = document.getElementById('main-play-pause-btn');
    const muteBtn = document.getElementById('main-mute-btn');
    const volumeSlider = document.getElementById('main-volume-slider');
    try {
        const bannerWindow = window.parent.frames['banner'];
        if (bannerWindow) {
            
            const checkAudio = setInterval(() => {
                const audio = bannerWindow.document.querySelector('audio');
                if (audio && playPauseBtn) {
                    clearInterval(checkAudio);
                    
                    playPauseBtn.textContent = audio.paused ? '▶' : '❚❚';
                    if (muteBtn) muteBtn.textContent = audio.muted ? '🔇' : '🔊';
                    if (volumeSlider) volumeSlider.value = audio.volume;
                    
                    playPauseBtn.addEventListener('click', () => {
                        audio.paused ? audio.play() : audio.pause();
                    });
                    if (muteBtn) {
                        muteBtn.addEventListener('click', () => {
                            audio.muted = !audio.muted;
                            muteBtn.textContent = audio.muted ? '🔇' : '🔊';
                        });
                    }
                    if (volumeSlider) {
                        volumeSlider.addEventListener('input', (e) => {
                            audio.volume = e.target.value;
                            audio.muted = false;
                            muteBtn.textContent = '🔊';
                        });
                    }
                    
                    audio.addEventListener('play', () => playPauseBtn.textContent = '❚❚');
                    audio.addEventListener('pause', () => playPauseBtn.textContent = '▶');
                    audio.addEventListener('volumechange', () => {
                        if (volumeSlider) volumeSlider.value = audio.volume;
                        if (muteBtn) muteBtn.textContent = audio.muted ? '🔇' : '🔊';
                    });
                }
            }, 500); 

            
            setTimeout(() => clearInterval(checkAudio), 5000);
        }
    } catch (e) {
        console.warn("Audio sync warning:", e);
    }
    
    try {
        if (window.parent && window.parent.document) {
            const frameset = window.parent.document.querySelector('frameset');
            if (frameset) {
                frameset.rows = "0,*";
            }
        }
    } catch (e) { }
}
function setupDeadCalc() {
    
    function toggleHeaderAudio(shouldPlay) {
        try {
            const bannerWindow = window.parent.frames['banner'] || window.parent.frames[0];
            if (bannerWindow) {
                const playPauseBtn = bannerWindow.document.getElementById('play-pause-btn');
                const audio = bannerWindow.document.querySelector('audio');
                if (audio && playPauseBtn) {
                    if (shouldPlay && audio.paused) {
                        playPauseBtn.click();
                    }
                    else if (!shouldPlay && !audio.paused) {
                        playPauseBtn.click();
                    }
                }
            }
        } catch (e) {
            console.warn("Audio sync error:", e);
        }
    }
    toggleHeaderAudio(false); 
    window.addEventListener('unload', () => {
        toggleHeaderAudio(true); 
    });
}
