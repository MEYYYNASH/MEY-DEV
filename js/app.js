// Main Application Controller for BORMEY.DEV Portfolio

const MESSAGE_TEMPLATES = {
  web: "សួស្តី BORMEY! ខ្ញុំចង់បង្កើតគេហទំព័រទំនើប និងឆ្លើយតបលឿនមួយសម្រាប់អាជីវកម្មរបស់ខ្ញុំ។ តើពួកយើងអាចពិភាក្សាអំពីតម្លៃ និងកាលវិភាគបានទេ?",
  uiux: "សួស្តី BORMEY! ខ្ញុំមានគំនិត App/Website មួយ ហើយចង់អោយអ្នករចនា UI/UX លើ Figma ឲ្យមានភាពទាក់ទាញ និងទាន់សម័យ។",
  consult: "ជម្រាបសួរ! ខ្ញុំចង់សាកសួរព័ត៌មានបន្ថែម និងប្រឹក្សាយោបល់បច្ចេកវិទ្យាអំពីគម្រោងឌីជីថលថ្មីមួយ។",
  collab: "ជម្រាបសួរ ពេជ្រពេញបូណ៌មី! ខ្ញុំចាប់អារម្មណ៍លើស្នាដៃរបស់អ្នកខ្លាំងណាស់ ហើយចង់អញ្ជើញអ្នកមកសហការលើគម្រោងរួមមួយ។"
};

class AppController {
  constructor() {
    this.currentTheme = localStorage.getItem('sthapor_theme') || 'light';
    this.currentSkillTab = 'dev';
    this.currentProjectFilter = 'all';
    
    this.init();
  }

  init() {
    this.setupPreloader();
    this.applyTheme(this.currentTheme);
    this.renderSkills(this.currentSkillTab);
    this.renderProjects(this.currentProjectFilter);
    this.setupEventListeners();
    this.setupIslandNav();
    this.setupContactModal();
    this.setupCvModal();
    this.setupMessageTemplates();
  }

  // Preloader Loading Screen Animation
  setupPreloader() {
    const preloader = document.getElementById('preloader');
    const fillBar = document.getElementById('preloaderFill');

    if (preloader && fillBar) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 25) + 15;
        if (progress >= 100) {
          progress = 100;
          fillBar.style.width = '100%';
          clearInterval(interval);
          setTimeout(() => {
            preloader.classList.add('hidden');
          }, 400);
        } else {
          fillBar.style.width = `${progress}%`;
        }
      }, 100);
    }
  }

  setupEventListeners() {
    // Theme Switcher Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(nextTheme);
      });
    }

    // Skill Tabs
    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentSkillTab = tab.dataset.tab;
        this.renderSkills(this.currentSkillTab);
      });
    });

    // Project Filter Buttons
    const projectFilters = document.querySelectorAll('.filter-btn');
    projectFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        projectFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentProjectFilter = btn.dataset.filter;
        this.renderProjects(this.currentProjectFilter);
      });
    });

    // Project Modal Close logic
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalBackdrop = document.getElementById('projectModal');
    if (modalCloseBtn && modalBackdrop) {
      modalCloseBtn.addEventListener('click', () => this.closeModal());
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) this.closeModal();
      });
    }
  }

  // Quick Message Template Chips Click Handler
  setupMessageTemplates() {
    const chips = document.querySelectorAll('.template-chip');
    const msgInput = document.getElementById('contactMsgInput');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const templateKey = chip.dataset.template;
        if (MESSAGE_TEMPLATES[templateKey] && msgInput) {
          msgInput.value = MESSAGE_TEMPLATES[templateKey];
          msgInput.focus();

          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
      });
    });
  }

  // CV Modal Controller
  setupCvModal() {
    const cvBtn = document.getElementById('cvModalBtn');
    const cvModal = document.getElementById('cvModal');
    const cvCloseBtn = document.getElementById('cvModalCloseBtn');

    if (cvBtn && cvModal) {
      cvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cvModal.classList.add('active');
      });
    }

    if (cvCloseBtn && cvModal) {
      cvCloseBtn.addEventListener('click', () => {
        cvModal.classList.remove('active');
      });
      cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) cvModal.classList.remove('active');
      });
    }
  }

  // Floating Mobile Tap Button Island Controller
  setupIslandNav() {
    const islandItems = document.querySelectorAll('.island-nav-item');
    islandItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const targetId = item.getAttribute('href');

        if (targetId === '#contact' || item.dataset.contact === 'true') {
          e.preventDefault();
          this.openContactModal();
          return;
        }

        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          e.preventDefault();
          islandItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          targetSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Setup Compact Contact & Socials Modal
  setupContactModal() {
    document.querySelectorAll('a[href="#contact"], button[data-contact="true"], .btn-contact').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.openContactModal();
      });
    });

    const contactModal = document.getElementById('contactModal');
    const contactCloseBtn = document.getElementById('contactModalCloseBtn');

    if (contactCloseBtn && contactModal) {
      contactCloseBtn.addEventListener('click', () => this.closeContactModal());
      contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) this.closeContactModal();
      });
    }

    const compactForm = document.getElementById('compactContactForm');
    if (compactForm) {
      compactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactSubmit();
      });
    }
  }

  openContactModal() {
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
      contactModal.classList.add('active');
    }
  }

  closeContactModal() {
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
      contactModal.classList.remove('active');
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sthapor_theme', theme);

    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'light' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    }
  }

  renderSkills(category) {
    const container = document.getElementById('skillsGrid');
    if (!container) return;

    const skillsList = PORTFOLIO_DATA.skills[category] || [];

    if (category === 'tools') {
      container.innerHTML = skillsList.map(skill => `
        <div class="skill-card tool-card pop-card animate-fade">
          <div class="tool-icon-wrapper">${skill.svg}</div>
          <h4 class="skill-title">${skill.name}</h4>
          <div class="skill-meter-bg">
            <div class="skill-meter-fill" style="width: ${skill.level}%"></div>
          </div>
          <span class="skill-pct">${skill.level}% ជំនាញ</span>
        </div>
      `).join('');
    } else {
      container.innerHTML = skillsList.map(skill => `
        <div class="skill-card pop-card animate-fade">
          <div class="skill-card-top">
            <h4 class="skill-title">${skill.name}</h4>
            <span class="skill-tag">${skill.tag}</span>
          </div>
          <div class="skill-meter-bg">
            <div class="skill-meter-fill" style="width: ${skill.level}%"></div>
          </div>
          <div class="skill-card-bottom">
            <span class="skill-pct">${skill.level}%</span>
            <span class="skill-status">${skill.level >= 90 ? 'ជំនាញខ្ពស់' : 'កម្រិតមធ្យម'}</span>
          </div>
        </div>
      `).join('');
    }
  }

  renderProjects(filter) {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    let list = PORTFOLIO_DATA.projects;

    if (filter !== 'all') {
      list = list.filter(p => p.category === filter);
    }

    container.innerHTML = list.map(project => `
      <div class="project-card pop-card animate-fade">
        <div class="project-card-banner" style="background: ${project.bgGradient}">
          <span class="project-badge">${project.badge}</span>
          <h3 class="project-card-title">${project.title}</h3>
        </div>

        <div class="project-card-body">
          <p class="project-card-desc">${project.desc}</p>
          
          <div class="project-tags">
            ${project.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>

          <div class="project-card-actions">
            <button class="btn btn-secondary btn-sm" onclick="app.openProjectModal('${project.id}')">
              <span>មើលលម្អិត</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </button>
            <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-icon" title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  openProjectModal(projectId) {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalBody');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-project-header" style="background: ${project.bgGradient}">
        <span class="project-badge">${project.badge}</span>
        <h2>${project.title}</h2>
      </div>

      <div class="modal-project-body">
        <p class="modal-desc">${project.desc}</p>

        <h4>លក្ខណៈពិសេសចម្បង:</h4>
        <ul class="modal-feature-list">
          ${project.features.map(f => `
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align: middle; margin-right: 6px; color: var(--accent-pink);"><polyline points="20 6 9 17 4 12"/></svg>
              ${f}
            </li>
          `).join('')}
        </ul>

        <h4>បច្ចេកវិទ្យាប្រើប្រាស់:</h4>
        <div class="project-tags">
          ${project.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>

        <div class="modal-actions">
          <a href="${project.github}" target="_blank" class="btn btn-primary">
            <span>មើល Code លើ GitHub</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <button class="btn btn-secondary" onclick="app.closeModal()">
            បិទ
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('active');
  }

  handleContactSubmit() {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="vertical-align: middle; margin-right: 6px;"><polyline points="20 6 9 17 4 12"/></svg> សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ! អរគុណសម្រាប់ការទាក់ទង។`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
    const compactForm = document.getElementById('compactContactForm');
    if (compactForm) compactForm.reset();
    
    // Clear template active state
    document.querySelectorAll('.template-chip').forEach(c => c.classList.remove('active'));

    this.closeContactModal();
  }
}

// Global App Instance
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
