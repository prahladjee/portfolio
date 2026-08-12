/**
 * Portfolio Main Application Orchestrator - PRAHLAD JEE
 */

import { PORTFOLIO_DATA } from './data.js';
import { Scene3D } from './scene3d.js';
import { soundFx } from './audio.js';

class App {
  constructor() {
    this.scene3d = null;
    this.activeFilter = 'all';
    this.activeTheme = 'cyberpunk';
    this.init();
  }

  init() {
    // 1. Initialize 3D Canvas Scene
    const canvas = document.getElementById('webgl-canvas');
    if (canvas) {
      this.scene3d = new Scene3D(canvas);
      this.scene3d.onProjectClick = (projectData) => {
        soundFx.playClick();
        this.openProjectModal(projectData);
      };
    }

    // 2. Render UI Data
    this.renderProfile();
    this.renderProjects();
    this.renderSkills();
    this.renderEducation();
    this.renderTimeline();
    this.renderThemes();

    // 3. Attach Event Listeners
    this.bindEvents();

    // 4. Initialize Lucide Icons if loaded
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderProfile() {
    const p = PORTFOLIO_DATA.profile;

    const nameEl = document.getElementById('bio-name');
    if (nameEl) nameEl.textContent = p.name;

    const roleEl = document.getElementById('bio-role');
    if (roleEl) roleEl.textContent = p.role;

    const taglineEl = document.getElementById('bio-tagline');
    if (taglineEl) taglineEl.textContent = p.tagline;

    const descEl = document.getElementById('bio-description');
    if (descEl) descEl.textContent = p.bio;

    const philosophyEl = document.getElementById('bio-philosophy');
    if (philosophyEl) philosophyEl.textContent = `"${p.philosophy}"`;

    const avatarEl = document.getElementById('bio-avatar');
    if (avatarEl) avatarEl.src = p.avatar;

    const emailEl = document.getElementById('bio-email');
    if (emailEl) {
      emailEl.textContent = p.email;
      emailEl.href = `mailto:${p.email}`;
    }

    // Render Stats
    const statsContainer = document.getElementById('hero-stats-container');
    if (statsContainer) {
      statsContainer.innerHTML = p.stats.map(s => `
        <div class="stat-card">
          <span class="stat-value">${s.value}</span>
          <span class="stat-label">${s.label}</span>
        </div>
      `).join('');
    }
  }

  renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = PORTFOLIO_DATA.projects.filter(p =>
      this.activeFilter === 'all' || p.category === this.activeFilter
    );

    grid.innerHTML = filtered.map(p => `
      <div class="project-card glass-panel interactive-ui" data-project-id="${p.id}">
        <div class="project-card-image-wrap">
          <img src="${p.image}" alt="${p.title}" class="project-card-image" loading="lazy" />
          <span class="project-badge">${p.category.toUpperCase()}</span>
        </div>
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
        <div class="project-card-footer">
          <span class="view-details-link">Inspect Engineering Details <i data-lucide="arrow-right"></i></span>
        </div>
      </div>
    `).join('');

    // Re-bind click handlers on cards
    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => soundFx.playHover());
      card.addEventListener('click', () => {
        const projId = card.getAttribute('data-project-id');
        const proj = PORTFOLIO_DATA.projects.find(x => x.id === projId);
        if (proj) {
          soundFx.playClick();
          this.openProjectModal(proj);
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.skills.map(s => `
      <div class="skill-card glass-panel interactive-ui">
        <div class="skill-header">
          <span class="skill-name">
            <i data-lucide="${s.icon || 'code'}"></i> ${s.name}
          </span>
          <span class="skill-level-text">${s.level}%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" style="width: ${s.level}%;"></div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderEducation() {
    const container = document.getElementById('education-container');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.education.map(ed => `
      <div class="glass-panel interactive-ui" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">${ed.degree}</h3>
          <span class="mono-tag" style="color: var(--primary-color);">${ed.period}</span>
        </div>
        <p style="font-weight: 600; color: var(--text-secondary);">${ed.institution}</p>
        <p style="font-size: 0.9rem; color: var(--text-muted);">${ed.details}</p>
      </div>
    `).join('');
  }

  renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.experience.map(e => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content glass-panel interactive-ui">
          <h3 class="timeline-role">${e.role}</h3>
          <div class="timeline-meta">
            <span>${e.company}</span>
            <span>${e.period}</span>
          </div>
          <p class="section-description" style="text-align:left; margin:0 0 0.75rem 0;">${e.description}</p>
          <ul class="timeline-achievements">
            ${e.achievements.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  renderThemes() {
    const container = document.getElementById('theme-options');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.themePresets.map(t => `
      <button class="theme-chip ${t.id === this.activeTheme ? 'active' : ''}" data-theme-id="${t.id}">
        <span class="chip-dot" style="background: ${t.primary};"></span>
        ${t.name}
      </button>
    `).join('');

    container.querySelectorAll('.theme-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.getAttribute('data-theme-id');
        this.switchTheme(themeId);
      });
    });
  }

  switchTheme(themeId) {
    const theme = PORTFOLIO_DATA.themePresets.find(t => t.id === themeId);
    if (!theme) return;

    this.activeTheme = themeId;
    soundFx.playClick();

    // Update CSS Custom Properties
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--primary-glow', theme.primary + '66');
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--bg-color', theme.background);

    // Pass to Three.js engine
    if (this.scene3d) {
      this.scene3d.applyTheme(theme);
    }

    this.renderThemes();
  }

  openProjectModal(project) {
    const overlay = document.getElementById('project-modal');
    if (!overlay) return;

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-description').textContent = project.fullDescription;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = project.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');

    const statsContainer = document.getElementById('modal-stats');
    if (project.stats) {
      statsContainer.innerHTML = Object.entries(project.stats).map(([lbl, val]) => `
        <div class="modal-stat-item">
          <span class="modal-stat-val">${val}</span>
          <span class="modal-stat-lbl">${lbl}</span>
        </div>
      `).join('');
    }

    overlay.classList.add('active');
  }

  closeModal() {
    const overlay = document.getElementById('project-modal');
    if (overlay) {
      soundFx.playClick();
      overlay.classList.remove('active');
    }
  }

  bindEvents() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Mobile Hamburger Menu Toggle
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        soundFx.playClick();
        const isOpen = navMenu.classList.toggle('mobile-open');
        mobileToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Navigation Links Smooth Scroll + 3D Camera Section Travel
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('mouseenter', () => soundFx.playHover());
      link.addEventListener('click', (e) => {
        e.preventDefault();
        soundFx.playTransition();

        // Close mobile drawer when link is clicked
        if (navMenu) {
          navMenu.classList.remove('mobile-open');
          if (mobileToggle) {
            mobileToggle.innerHTML = `<i data-lucide="menu"></i>`;
            if (window.lucide) window.lucide.createIcons();
          }
        }

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const targetSection = link.getAttribute('href').replace('#', '');
        const targetEl = document.getElementById(targetSection);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }

        if (this.scene3d) {
          this.scene3d.navigateToSection(targetSection);
        }
      });
    });

    // Project Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => soundFx.playHover());
      btn.addEventListener('click', () => {
        soundFx.playClick();
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter');
        this.renderProjects();
      });
    });

    // Sound FX Toggle Button
    const soundToggle = document.getElementById('sound-toggle-btn');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        const isEnabled = soundFx.toggleSound();
        soundToggle.classList.toggle('active', isEnabled);
        this.showToast(isEnabled ? "Sound Effects Enabled" : "Sound Muted", isEnabled ? "volume-2" : "volume-x");
      });
    }

    // Modal Close Buttons
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    const overlay = document.getElementById('project-modal');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModal();
      });
    }

    // Contact Form Submit Handler (Email Transmission via Web3Forms or Fallback)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        soundFx.playClick();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i data-lucide="loader"></i> Transmitting...`;
        if (window.lucide) window.lucide.createIcons();

        const formData = new FormData(contactForm);
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const message = formData.get('message') || '';

        try {
          // Send via Web3Forms API (or fallback to Mailto link)
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });

          const result = await response.json();
          if (result.success) {
            this.showToast("Message sent to Prahlad's inbox successfully!", "send");
            contactForm.reset();
          } else {
            // Fallback: Open Mailto link directly
            const mailtoUrl = `mailto:prahladjee433@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
            window.location.href = mailtoUrl;
            this.showToast("Opening Email Client...", "mail");
          }
        } catch (err) {
          const mailtoUrl = `mailto:prahladjee433@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
          window.location.href = mailtoUrl;
          this.showToast("Opening Email Client...", "mail");
        } finally {
          submitBtn.innerHTML = `<i data-lucide="check"></i> Sent!`;
          if (window.lucide) window.lucide.createIcons();
          setTimeout(() => {
            submitBtn.innerHTML = origText;
            if (window.lucide) window.lucide.createIcons();
          }, 3000);
        }
      });
    }

    // Direct WhatsApp Form Action Button
    const whatsappBtn = document.getElementById('whatsapp-send-btn');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        soundFx.playClick();
        const nameInput = document.getElementById('sender-name');
        const emailInput = document.getElementById('sender-email');
        const msgInput = document.getElementById('sender-message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = msgInput ? msgInput.value.trim() : '';

        const text = `Hi Prahlad,%0A%0AMy Name: ${encodeURIComponent(name || 'Visitor')}%0AMy Email: ${encodeURIComponent(email || 'Not provided')}%0A%0AMessage:%0A${encodeURIComponent(message || 'I would like to connect with you regarding software/data engineering projects!')}`;
        const waUrl = `https://wa.me/919060707325?text=${text}`;
        window.open(waUrl, '_blank');
        this.showToast("Opening WhatsApp Chat...", "message-circle");
      });
    }
  }

  showToast(message, iconName = "info") {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="${iconName}"></i> ${message}`;
    container.appendChild(toast);

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
