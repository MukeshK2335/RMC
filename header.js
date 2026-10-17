(function () {
  const headerHTML = `
    <header class="site-header">
      <a class="brand" href="index.html#home" aria-label="IEEE Returning Mothers Conference home">
        <img class="brand-logo" src="logo.webp" alt="IEEE Returning Mothers Conference">
      </a>
      <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-controls="site-navigation" aria-expanded="false">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3 7h26M3 16h26M3 25h26" />
        </svg>
      </button>
      <nav class="site-nav" id="site-navigation" aria-label="Main navigation" hidden>
        <a href="index.html#home">HOME</a>
        <a href="about.html">ABOUT US</a>
        <a href="rmday.html">RMDay</a>
        <a href="career-fair.html">CAREER FAIR</a>
        <a href="ideathon-pitchfest.html">IDEATHON & PITCHFEST</a>
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" type="button" aria-expanded="false" aria-controls="tracks-submenu">
            <span>TRACKS</span>
          </button>
          <div class="nav-dropdown-menu" id="tracks-submenu">
            <a href="health-and-wellbeing.html">HEALTH &amp; WELL-BEING</a>
            <a href="reskilling-upskilling.html">RESKILLING &amp; UPSKILLING</a>
            <a href="visibility-branding.html">VISIBILITY &amp; BRANDING</a>
          </div>
        </div>
        <a href="gallery.html">GALLERY</a>
        <a href="awards.html">AWARDS</a>
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" type="button" aria-expanded="false" aria-controls="sponsors-submenu">
            <span>SPONSORS</span>
          </button>
          <div class="nav-dropdown-menu" id="sponsors-submenu">
            <a href="become-sponsor.html">BECOME A SPONSOR</a>
            <a href="sponsors.html">SPONSORS 2026</a>
          </div>
        </div>
      </nav>
    </header>
  `;

  const mount = document.querySelector('[data-site-header]');
  if (mount) {
    mount.outerHTML = headerHTML;
  }

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.type = 'button';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.title = 'Back to top';
  backToTop.hidden = true;
  backToTop.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 19V5m-7 7 7-7 7 7" />
    </svg>
  `;
  document.body.appendChild(backToTop);

  const updateBackToTopVisibility = () => {
    backToTop.hidden = window.scrollY < 320;
  };

  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
  updateBackToTopVisibility();
  backToTop.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const siteNavigation = document.querySelector('#site-navigation');

  if (!menuToggle || !siteNavigation) return;

  const dropdowns = [...siteNavigation.querySelectorAll('.nav-dropdown')];

  const closeDropdown = () => {
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');
      const menu = dropdown.querySelector('.nav-dropdown-menu');
      if (!toggle || !menu) return;
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  };

  const closeNavigation = () => {
    closeDropdown();
    siteNavigation.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  menuToggle.addEventListener('click', () => {
    const isOpening = siteNavigation.hidden;
    siteNavigation.hidden = !isOpening;
    menuToggle.setAttribute('aria-expanded', String(isOpening));
    menuToggle.setAttribute('aria-label', isOpening ? 'Close navigation menu' : 'Open navigation menu');
  });

  dropdowns.forEach((dropdown) => {
    const dropdownToggle = dropdown.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.nav-dropdown-menu');
    if (!dropdownToggle || !dropdownMenu) return;

    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent immediate closing if clicking the toggle
      const isOpen = dropdownMenu.classList.toggle('is-open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  siteNavigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) closeNavigation();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !siteNavigation.hidden) {
      closeNavigation();
      menuToggle.focus();
    }
  });
})();
