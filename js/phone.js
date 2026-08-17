// Phone UI Simulator Logic for STHAPOR Portfolio (Gaming Removed)

class PhoneSimulator {
  constructor() {
    this.activeTab = 'home';
    this.audioContext = null;
    this.soundEnabled = true;
    this.init();
  }

  init() {
    this.setupBottomNav();
    this.setupAudio();
    this.renderScreen('home');
  }

  // Web Audio API Synthesizer for Micro-Interactions
  setupAudio() {
    window.addEventListener('click', (e) => {
      if (this.soundEnabled && (e.target.closest('.btn') || e.target.closest('.phone-nav-item') || e.target.closest('.card-btn'))) {
        this.playPopSound();
      }
    });
  }

  playPopSound(freq = 600, duration = 0.08) {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.audioContext.currentTime + duration);
      gain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Bottom Navigation inside Phone UI
  setupBottomNav() {
    const navItems = document.querySelectorAll('.phone-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetTab = item.dataset.tab;
        if (targetTab) {
          navItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          this.renderScreen(targetTab);
        }
      });
    });
  }

  // Dynamically render screen content inside Phone 2 with Vector SVGs
  renderScreen(tab) {
    const screenBody = document.getElementById('phoneScreenBody');
    if (!screenBody) return;

    this.activeTab = tab;
    const lang = document.documentElement.lang || 'en';
    const isKm = lang === 'km';

    switch (tab) {
      case 'home':
        screenBody.innerHTML = `
          <div class="phone-screen-content animate-fade">
            <div class="phone-profile-header">
              <div class="phone-avatar-container">
                <img src="./assets/images/sthapor_avatar.jpg" alt="STHAPOR Avatar" class="phone-avatar-img" onerror="this.src='https://api.dicebear.com/7.x/bottts/svg?seed=STHAPOR'">
                <span class="phone-status-dot"></span>
              </div>
              <h3 class="phone-user-name">STHAPOR <span class="badge-verified">✓</span></h3>
              <p class="phone-user-tag">@SthaporDev</p>
              <p class="phone-user-bio">${isKm ? 'អ្នកអភិវឌ្ឍន៍ច្នៃប្រឌិត & រចនា UI/UX ទំនើប' : 'Creative Developer & Modern UI/UX Designer'}</p>
            </div>

            <div class="phone-stats-grid">
              <div class="phone-stat-card">
                <span class="phone-stat-val">12+</span>
                <span class="phone-stat-lbl">${isKm ? 'គម្រោង' : 'Projects'}</span>
              </div>
              <div class="phone-stat-card highlight-lime">
                <span class="phone-stat-val">96%</span>
                <span class="phone-stat-lbl">${isKm ? 'ជំនាញ' : 'Figma'}</span>
              </div>
              <div class="phone-stat-card highlight-pink">
                <span class="phone-stat-val">100%</span>
                <span class="phone-stat-lbl">${isKm ? 'ប្តេជ្ញា' : 'Passionate'}</span>
              </div>
            </div>

            <div class="phone-action-box">
              <button class="phone-btn-primary" onclick="window.phoneSimulator.toggleFollow(this)">
                <span>${isKm ? '+ តាមដាន' : '+ Connect'}</span>
              </button>
            </div>

            <div class="phone-mini-section">
              <div class="phone-sec-title">
                <span>${isKm ? 'ឧបករណ៍ QR លឿន' : 'Quick QR Tool'}</span>
                <span class="mini-tag">Live</span>
              </div>
              <div class="mini-qr-box">
                <input type="text" id="miniQrInput" class="phone-input" value="https://sthapor.dev" placeholder="Type URL...">
                <div class="mini-qr-preview" id="miniQrPreview">
                  <svg width="60" height="60" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#1E1B18"/>
                    <rect x="10" y="10" width="30" height="30" fill="#A3E635"/>
                    <rect x="15" y="15" width="20" height="20" fill="#1E1B18"/>
                    <rect x="60" y="10" width="30" height="30" fill="#FF70A6"/>
                    <rect x="65" y="15" width="20" height="20" fill="#1E1B18"/>
                    <rect x="10" y="60" width="30" height="30" fill="#38BDF8"/>
                    <rect x="15" y="65" width="20" height="20" fill="#1E1B18"/>
                    <rect x="50" y="50" width="15" height="15" fill="#FAF7F0"/>
                    <rect x="70" y="70" width="15" height="15" fill="#A3E635"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'work':
        screenBody.innerHTML = `
          <div class="phone-screen-content animate-fade">
            <div class="phone-screen-header">
              <h4>${isKm ? 'គម្រោងលេចធ្លោ' : 'Featured Apps'}</h4>
              <span class="phone-badge">4 Apps</span>
            </div>
            
            <div class="phone-app-list">
              <div class="phone-app-card">
                <div class="app-icon lime">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                </div>
                <div class="app-info">
                  <h5>ToolNest</h5>
                  <p>All-in-one Utility Suite</p>
                </div>
                <span class="app-tag">Live</span>
              </div>

              <div class="phone-app-card">
                <div class="app-icon pink">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div class="app-info">
                  <h5>MEY AI Studio</h5>
                  <p>Creative AI Workspace</p>
                </div>
                <span class="app-tag">AI</span>
              </div>

              <div class="phone-app-card">
                <div class="app-icon blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div class="app-info">
                  <h5>Astra Social</h5>
                  <p>Social Platform Concept</p>
                </div>
                <span class="app-tag">Social</span>
              </div>

              <div class="phone-app-card">
                <div class="app-icon purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <div class="app-info">
                  <h5>NoteFlow</h5>
                  <p>Glass Productivity App</p>
                </div>
                <span class="app-tag">Glass</span>
              </div>
            </div>
          </div>
        `;
        break;

      case 'me':
        screenBody.innerHTML = `
          <div class="phone-screen-content animate-fade">
            <div class="phone-screen-header">
              <h4>${isKm ? 'ការកំណត់ & ប្រវត្តិ' : 'Profile & Settings'}</h4>
            </div>

            <div class="phone-settings-list">
              <div class="setting-item">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                  ${isKm ? 'ស្ទីលរចនា' : 'Design Theme'}
                </span>
                <span class="setting-val">Neo-Brutalist</span>
              </div>
              <div class="setting-item">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                  ${isKm ? 'សំឡេង' : 'Audio Sound'}
                </span>
                <button class="toggle-btn" onclick="window.phoneSimulator.toggleSound(this)">ON</button>
              </div>
              <div class="setting-item">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><circle cx="12" cy="12" r="10"/></svg>
                  ${isKm ? 'ភាសា' : 'Language'}
                </span>
                <span class="setting-val">${isKm ? 'ភាសាខ្មែរ (KM)' : 'English (EN)'}</span>
              </div>
              <div class="setting-item">
                <span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  ${isKm ? 'ស្ថានភាព' : 'Status'}
                </span>
                <span class="setting-val online">Available</span>
              </div>
            </div>
          </div>
        `;
        break;
    }
  }

  toggleFollow(btn) {
    const isKm = document.documentElement.lang === 'km';
    if (btn.classList.contains('following')) {
      btn.classList.remove('following');
      btn.innerHTML = `<span>${isKm ? '+ តាមដាន' : '+ Connect'}</span>`;
    } else {
      btn.classList.add('following');
      btn.innerHTML = `<span>${isKm ? '✓ បានភ្ជាប់' : '✓ Connected'}</span>`;
    }
  }

  toggleSound(btn) {
    this.soundEnabled = !this.soundEnabled;
    btn.textContent = this.soundEnabled ? 'ON' : 'OFF';
    btn.style.backgroundColor = this.soundEnabled ? '#A3E635' : '#FF70A6';
  }
}

// Initialize on window load
window.addEventListener('DOMContentLoaded', () => {
  window.phoneSimulator = new PhoneSimulator();
});
