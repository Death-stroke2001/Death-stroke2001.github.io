class Router {
  constructor() {
    this.screens = {};
    this.currentScreen = null;
    this.history = [];
    this.primaryScreens = ['home', 'brain', 'nourishment'];
    this.transitioning = false;
  }

  register(id, renderFn) {
    this.screens[id] = renderFn;
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    const hash = window.location.hash.slice(1) || 'home';
    window.location.hash = hash;
    this.handleRoute();
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const [screen, param] = hash.split('/');
    this.navigateTo(screen, param, false);
  }

  navigateTo(screenId, param, pushHistory = true) {
    if (this.transitioning) return;
    if (screenId === this.currentScreen) return;

    const screenEl = document.getElementById('screen-' + screenId);
    if (!screenEl) return;

    const currentEl = this.currentScreen
      ? document.getElementById('screen-' + this.currentScreen)
      : null;

    // Determine transition type
    const isPrimaryCurrent = this.primaryScreens.includes(this.currentScreen);
    const isPrimaryNext = this.primaryScreens.includes(screenId);
    const isBack = this.history.length > 0 && this.history[this.history.length - 1] === screenId;

    if (pushHistory && this.currentScreen) {
      if (isBack) {
        this.history.pop();
      } else {
        this.history.push(this.currentScreen);
      }
    }

    // Render screen content
    if (this.screens[screenId]) {
      this.screens[screenId](screenEl, param);
    }

    // Apply transitions
    this.transitioning = true;

    if (!currentEl) {
      screenEl.classList.add('active');
      this.transitioning = false;
    } else if (isPrimaryCurrent && isPrimaryNext) {
      // Tab switch: crossfade
      this.crossfade(currentEl, screenEl);
    } else if (isBack) {
      // Going back: slide right
      this.slideTransition(currentEl, screenEl, 'right');
    } else {
      // Going forward: slide left
      this.slideTransition(currentEl, screenEl, 'left');
    }

    this.currentScreen = screenId;
    window.location.hash = screenId;

    // Update bottom nav
    this.updateNav(screenId);
  }

  crossfade(from, to) {
    from.classList.add('fade-out');
    to.classList.add('fade-in');

    setTimeout(() => {
      from.classList.remove('active', 'fade-out');
      to.classList.remove('fade-in');
      to.classList.add('active');
      this.transitioning = false;
    }, 200);
  }

  slideTransition(from, to, direction) {
    if (direction === 'left') {
      from.classList.add('slide-out-left');
      to.classList.add('slide-in-right');
    } else {
      from.classList.add('slide-out-right');
      to.classList.add('slide-in-left');
    }

    setTimeout(() => {
      from.classList.remove('active', 'slide-out-left', 'slide-out-right');
      to.classList.remove('slide-in-right', 'slide-in-left');
      to.classList.add('active');
      to.scrollTop = 0;
      this.transitioning = false;
    }, 300);
  }

  back() {
    if (this.history.length > 0) {
      const prev = this.history[this.history.length - 1];
      this.navigateTo(prev, null, true);
    } else {
      this.navigateTo('home');
    }
  }

  updateNav(screenId) {
    document.querySelectorAll('.nav-item').forEach(item => {
      const target = item.dataset.screen;
      item.classList.toggle('active', target === screenId);
    });

    // Show/hide bottom nav
    const nav = document.getElementById('bottom-nav');
    if (nav) {
      nav.style.display = this.primaryScreens.includes(screenId) ? 'flex' : 'none';
    }
  }
}

const router = new Router();
