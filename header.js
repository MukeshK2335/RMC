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
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" type="button" aria-expanded="false" aria-controls="tracks-submenu">
            <span>TRACKS</span>
          </button>
          <div class="nav-dropdown-menu" id="tracks-submenu">
            <a href="index.html#tracks">INNOVATION CHALLENGE</a>
            <a href="index.html#tracks">JUNIOR EINSTEIN</a>
            <a href="index.html#tracks">MAKER FAIR</a>
            
          </div>
        </div>
        <a href="gallery.html">GALLERY</a>
        <a href="awards.html">AWARDS</a>
      </nav>
    </header>
  `;

  const mount = document.querySelector('[data-site-header]');
  if (mount) {
    mount.outerHTML = headerHTML;
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const siteNavigation = document.querySelector('#site-navigation');

  if (!menuToggle || !siteNavigation) return;

  const dropdownToggle = siteNavigation.querySelector('.nav-dropdown-toggle');
  const dropdownMenu = siteNavigation.querySelector('.nav-dropdown-menu');

  const closeDropdown = () => {
    if (!dropdownToggle || !dropdownMenu) return;
    dropdownMenu.classList.remove('is-open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
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

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent immediate closing if clicking the toggle
      const isOpen = dropdownMenu.classList.toggle('is-open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

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
