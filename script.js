// ==========================================
// GLOBAL VARIABLES & STATE
// ==========================================
let allTools = [];
let filteredTools = [];
let currentCategory = "all";
let currentSort = "name";
let currentView = "grid";
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
let displayedItems = 12;
let searchTerm = "";
// Observers (initialized later)
let scrollRevealObserver = null;
let countersObserver = null;
// Hero particles state
let heroParticles = {
  canvas: null,
  ctx: null,
  particles: [],
  mouse: { x: null, y: null, active: false },
  animationId: null,
  options: {
    count: 0,
    speed: 0.3,
    connectDist: 120,
    repelDist: 100,
    size: [1, 2.4],
  },
};

// ==========================================
// TOOLS DATA
// ==========================================
const toolsData = [
  // Educational Games
  {
    id: 1,
    name: "Flexbox Froggy",
    description:
      "A fun game to learn CSS Flexbox by helping Froggy and friends reach their lilypad homes.",
    url: "https://flexboxfroggy.com/",
    category: "games",
    tags: ["flexbox", "css", "game", "interactive"],
    icon: "fas fa-frog",
    difficulty: "beginner",
    popularity: 95,
  },
  {
    id: 2,
    name: "CSS Grid Garden",
    description:
      "Learn CSS Grid layout by watering your carrot garden in this engaging puzzle game.",
    url: "https://cssgridgarden.com/",
    category: "games",
    tags: ["grid", "css", "game", "layout"],
    icon: "fas fa-seedling",
    difficulty: "beginner",
    popularity: 92,
  },
  {
    id: 3,
    name: "CSS Diner",
    description:
      "Practice CSS selectors by completing 32 levels of this fun dining-themed game.",
    url: "https://flukeout.github.io/",
    category: "games",
    tags: ["selectors", "css", "game"],
    icon: "fas fa-utensils",
    difficulty: "intermediate",
    popularity: 88,
  },
  {
    id: 4,
    name: "Flexbox Defense",
    description:
      "Tower defense game where you position towers using CSS Flexbox properties.",
    url: "http://www.flexboxdefense.com/",
    category: "games",
    tags: ["flexbox", "css", "game", "defense"],
    icon: "fas fa-chess-rook",
    difficulty: "intermediate",
    popularity: 85,
  },
  {
    id: 5,
    name: "Grid Critters",
    description:
      "Master CSS Grid with this adventure game featuring cute critters.",
    url: "https://gridcritters.com/",
    category: "games",
    tags: ["grid", "css", "game", "paid"],
    icon: "fas fa-bug",
    difficulty: "intermediate",
    popularity: 80,
  },
  {
    id: 6,
    name: "Service Workies",
    description: "Learn Service Workers through an interactive adventure game.",
    url: "https://serviceworkies.com/",
    category: "games",
    tags: ["service-workers", "pwa", "game"],
    icon: "fas fa-cogs",
    difficulty: "advanced",
    popularity: 75,
  },

  // CSS Tools & Generators
  {
    id: 7,
    name: "CSS Gradient",
    description:
      "Generate beautiful CSS gradients with this easy-to-use gradient generator.",
    url: "https://cssgradient.io/",
    category: "css-tools",
    tags: ["gradient", "css", "generator", "background"],
    icon: "fas fa-palette",
    difficulty: "beginner",
    popularity: 98,
  },
  {
    id: 8,
    name: "Animate.css",
    description:
      "Just-add-water CSS animations library with ready-to-use, cross-browser animations.",
    url: "https://animate.style/",
    category: "css-tools",
    tags: ["animation", "css", "library", "effects"],
    icon: "fas fa-magic",
    difficulty: "beginner",
    popularity: 96,
  },
  {
    id: 9,
    name: "Animista",
    description:
      "CSS animation library with on-demand generation and customizable animations.",
    url: "https://animista.net/",
    category: "generators",
    tags: ["animation", "css", "generator", "keyframes"],
    icon: "fas fa-play-circle",
    difficulty: "intermediate",
    popularity: 90,
  },
  {
    id: 10,
    name: "Get Waves",
    description:
      "Generate beautiful SVG wave shapes for your website sections.",
    url: "https://getwaves.io/",
    category: "generators",
    tags: ["svg", "waves", "generator", "design"],
    icon: "fas fa-wave-square",
    difficulty: "beginner",
    popularity: 87,
  },
  {
    id: 11,
    name: "Blobmaker",
    description:
      "Create random, unique, and organic-looking SVG shapes quickly.",
    url: "https://www.blobmaker.app/",
    category: "generators",
    tags: ["svg", "shapes", "generator", "organic"],
    icon: "fas fa-circle",
    difficulty: "beginner",
    popularity: 85,
  },
  {
    id: 12,
    name: "Clippy",
    description:
      "CSS clip-path maker by Bennett Feely. Create complex shapes with CSS.",
    url: "https://bennettfeely.com/clippy/",
    category: "css-tools",
    tags: ["clip-path", "css", "shapes", "generator"],
    icon: "fas fa-cut",
    difficulty: "intermediate",
    popularity: 88,
  },

  // Performance Tools
  {
    id: 13,
    name: "PageSpeed Insights",
    description:
      "Analyze your website performance and get suggestions for improvements.",
    url: "https://pagespeed.web.dev/",
    category: "performance",
    tags: ["performance", "speed", "optimization", "google"],
    icon: "fas fa-tachometer-alt",
    difficulty: "beginner",
    popularity: 95,
  },
  {
    id: 14,
    name: "GTmetrix",
    description: "Comprehensive website speed and performance analysis tool.",
    url: "https://gtmetrix.com/",
    category: "performance",
    tags: ["performance", "speed", "analysis", "monitoring"],
    icon: "fas fa-chart-line",
    difficulty: "intermediate",
    popularity: 90,
  },
  {
    id: 15,
    name: "Pingdom",
    description:
      "Website monitoring and performance testing from multiple locations.",
    url: "https://www.pingdom.com/",
    category: "performance",
    tags: ["monitoring", "uptime", "performance", "testing"],
    icon: "fas fa-satellite-dish",
    difficulty: "intermediate",
    popularity: 85,
  },
  {
    id: 16,
    name: "WebPageTest",
    description:
      "Advanced web performance testing with detailed waterfall charts.",
    url: "https://www.webpagetest.org/",
    category: "performance",
    tags: ["performance", "testing", "waterfall", "analysis"],
    icon: "fas fa-stopwatch",
    difficulty: "advanced",
    popularity: 88,
  },

  // Learning Resources
  {
    id: 17,
    name: "MDN Web Docs",
    description: "Comprehensive documentation for web technologies by Mozilla.",
    url: "https://developer.mozilla.org/",
    category: "learning",
    tags: ["documentation", "reference", "html", "css", "javascript"],
    icon: "fas fa-book",
    difficulty: "all",
    popularity: 99,
  },
  {
    id: 18,
    name: "W3Schools",
    description:
      "Learn web technologies with tutorials, references, and exercises.",
    url: "https://www.w3schools.com/",
    category: "learning",
    tags: ["tutorial", "learning", "reference", "examples"],
    icon: "fas fa-graduation-cap",
    difficulty: "beginner",
    popularity: 94,
  },
  {
    id: 19,
    name: "Frontend Mentor",
    description:
      "Improve your frontend skills by building real projects with professional designs.",
    url: "https://www.frontendmentor.io/",
    category: "learning",
    tags: ["projects", "challenges", "practice", "portfolio"],
    icon: "fas fa-laptop-code",
    difficulty: "intermediate",
    popularity: 92,
  },
  {
    id: 20,
    name: "CSS Battle",
    description:
      "The first CSS code-golfing game! Replicate targets with shortest CSS code.",
    url: "https://cssbattle.dev/",
    category: "learning",
    tags: ["css", "challenge", "game", "code-golf"],
    icon: "fas fa-sword",
    difficulty: "intermediate",
    popularity: 86,
  },

  // Utilities
  {
    id: 21,
    name: "Can I Use",
    description:
      "Check browser support for CSS, HTML5, SVG, and other web technologies.",
    url: "https://caniuse.com/",
    category: "utilities",
    tags: ["browser", "support", "compatibility", "reference"],
    icon: "fas fa-question-circle",
    difficulty: "beginner",
    popularity: 97,
  },
  {
    id: 22,
    name: "CSS Shake",
    description: "CSS classes to move your DOM with shake animations.",
    url: "https://elrumordelaluz.github.io/csshake/",
    category: "css-tools",
    tags: ["animation", "shake", "css", "effects"],
    icon: "fas fa-hand-rock",
    difficulty: "beginner",
    popularity: 75,
  },
  {
    id: 23,
    name: "Haikei",
    description:
      "Generate unique SVG design assets including shapes, patterns, and backgrounds.",
    url: "https://haikei.app/",
    category: "generators",
    tags: ["svg", "design", "patterns", "backgrounds"],
    icon: "fas fa-shapes",
    difficulty: "beginner",
    popularity: 89,
  },
  {
    id: 24,
    name: "Hero Patterns",
    description:
      "A collection of repeatable SVG background patterns for your web projects.",
    url: "https://heropatterns.com/",
    category: "design",
    tags: ["patterns", "svg", "backgrounds", "design"],
    icon: "fas fa-th",
    difficulty: "beginner",
    popularity: 84,
  },

  // Design Tools
  {
    id: 25,
    name: "Fancy Border Radius",
    description: "Generate organic-looking shapes with border-radius in CSS.",
    url: "https://9elements.github.io/fancy-border-radius/",
    category: "design",
    tags: ["border-radius", "shapes", "css", "organic"],
    icon: "fas fa-circle-notch",
    difficulty: "intermediate",
    popularity: 82,
  },
  {
    id: 26,
    name: "CSS Separator Generator",
    description: "Generate beautiful section separators for your website.",
    url: "https://wweb.dev/resources/css-separator-generator",
    category: "generators",
    tags: ["separator", "section", "css", "divider"],
    icon: "fas fa-grip-lines",
    difficulty: "beginner",
    popularity: 78,
  },
  {
    id: 27,
    name: "Browser Frame",
    description:
      "Wrap your screenshots in different browser frames for presentations.",
    url: "https://browserframe.com/",
    category: "design",
    tags: ["browser", "frame", "screenshot", "mockup"],
    icon: "fas fa-window-maximize",
    difficulty: "beginner",
    popularity: 76,
  },
  {
    id: 28,
    name: "Neumorphism Generator",
    description:
      "Generate soft UI CSS code with this neumorphism/soft UI generator.",
    url: "https://neumorphism.io/",
    category: "generators",
    tags: ["neumorphism", "soft-ui", "css", "design"],
    icon: "fas fa-cube",
    difficulty: "intermediate",
    popularity: 83,
  },

  // Additional Tools
  {
    id: 29,
    name: "CSS Grid Generator",
    description: "Interactive tool to generate CSS Grid layout code.",
    url: "https://css-grid-generator.netlify.app/",
    category: "generators",
    tags: ["grid", "css", "layout", "generator"],
    icon: "fas fa-th-large",
    difficulty: "intermediate",
    popularity: 87,
  },
  {
    id: 30,
    name: "Flexbox Generator",
    description: "Visual tool for generating CSS Flexbox layouts.",
    url: "https://loading.io/flexbox/",
    category: "generators",
    tags: ["flexbox", "css", "layout", "visual"],
    icon: "fas fa-arrows-alt",
    difficulty: "beginner",
    popularity: 86,
  },
  {
    id: 31,
    name: "CSS Box Shadow Generator",
    description: "Generate CSS box-shadow effects with a visual interface.",
    url: "https://cssgenerator.org/box-shadow-css-generator.html",
    category: "generators",
    tags: ["box-shadow", "css", "effects", "generator"],
    icon: "fas fa-square",
    difficulty: "beginner",
    popularity: 85,
  },
  {
    id: 32,
    name: "CSS Triangle Generator",
    description: "Generate CSS triangles with borders for arrows and callouts.",
    url: "http://apps.eky.hk/css-triangle-generator/",
    category: "generators",
    tags: ["triangle", "css", "shapes", "arrows"],
    icon: "fas fa-play",
    difficulty: "intermediate",
    popularity: 73,
  },

  // New CSS Tools and Generators
  {
    id: 33,
    name: "CSS Buttons",
    description:
      "Beautiful collection of CSS button styles and animations for your projects.",
    url: "https://cssbuttons.io/",
    category: "css-tools",
    tags: ["buttons", "css", "components", "animations"],
    icon: "fas fa-hand-pointer",
    difficulty: "beginner",
    popularity: 89,
  },
  {
    id: 34,
    name: "UIVerse",
    description:
      "Open-source UI elements made with CSS & HTML. Copy and paste beautiful components.",
    url: "https://uiverse.io/",
    category: "design-tools",
    tags: ["ui", "components", "css", "html", "copy-paste"],
    icon: "fas fa-puzzle-piece",
    difficulty: "beginner",
    popularity: 92,
  },
  {
    id: 35,
    name: "CSS Loader Generator",
    description:
      "Generate beautiful CSS loading animations and spinners for your website.",
    url: "https://10015.io/tools/css-loader-generator",
    category: "generators",
    tags: ["loaders", "spinners", "animations", "css"],
    icon: "fas fa-spinner",
    difficulty: "beginner",
    popularity: 85,
  },
  {
    id: 36,
    name: "CSS Checkbox Generator",
    description:
      "Create custom CSS checkboxes with various styles and animations.",
    url: "https://10015.io/tools/css-checkbox-generator",
    category: "generators",
    tags: ["checkbox", "forms", "css", "ui"],
    icon: "fas fa-check-square",
    difficulty: "intermediate",
    popularity: 78,
  },
  {
    id: 37,
    name: "CSS Switch Generator",
    description:
      "Generate modern toggle switches and buttons with CSS animations.",
    url: "https://10015.io/tools/css-switch-generator",
    category: "generators",
    tags: ["switch", "toggle", "forms", "css"],
    icon: "fas fa-toggle-on",
    difficulty: "intermediate",
    popularity: 80,
  },
  {
    id: 38,
    name: "CSS Clip Path Generator",
    description:
      "Visual tool to create complex CSS clip-path shapes for modern designs.",
    url: "https://10015.io/tools/css-clip-path-generator",
    category: "css-tools",
    tags: ["clip-path", "shapes", "css", "generator"],
    icon: "fas fa-cut",
    difficulty: "intermediate",
    popularity: 82,
  },
  {
    id: 39,
    name: "CSS Background Pattern Generator",
    description:
      "Create stunning CSS background patterns and textures for your designs.",
    url: "https://10015.io/tools/css-background-pattern-generator",
    category: "generators",
    tags: ["backgrounds", "patterns", "css", "textures"],
    icon: "fas fa-th",
    difficulty: "beginner",
    popularity: 86,
  },
  {
    id: 40,
    name: "CSS Cubic Bezier Generator",
    description:
      "Create custom CSS animation timing functions with visual bezier curve editor.",
    url: "https://10015.io/tools/css-cubic-bezier-generator",
    category: "css-tools",
    tags: ["animations", "timing", "bezier", "css"],
    icon: "fas fa-chart-line",
    difficulty: "advanced",
    popularity: 74,
  },
  {
    id: 41,
    name: "CSS Glassmorphism Generator",
    description:
      "Generate modern glassmorphism effects with backdrop blur and transparency.",
    url: "https://10015.io/tools/css-glassmorphism-generator",
    category: "css-tools",
    tags: ["glassmorphism", "blur", "modern", "css"],
    icon: "fas fa-eye-dropper",
    difficulty: "intermediate",
    popularity: 88,
  },
  {
    id: 42,
    name: "CSS Text Glitch Effect Generator",
    description:
      "Create cyberpunk-style text glitch effects and animations with CSS.",
    url: "https://10015.io/tools/css-text-glitch-effect-generator",
    category: "css-tools",
    tags: ["glitch", "text-effects", "animations", "cyberpunk"],
    icon: "fas fa-bolt",
    difficulty: "advanced",
    popularity: 79,
  },
  {
    id: 43,
    name: "CSS Gradient Generator",
    description:
      "Advanced CSS gradient generator with multiple colors and directions.",
    url: "https://10015.io/tools/css-gradient-generator",
    category: "generators",
    tags: ["gradients", "colors", "css", "backgrounds"],
    icon: "fas fa-palette",
    difficulty: "beginner",
    popularity: 90,
  },
  {
    id: 44,
    name: "CSS Box Shadow Generator",
    description:
      "Create multiple layered box shadows with live preview and CSS output.",
    url: "https://10015.io/tools/css-box-shadow-generator",
    category: "css-tools",
    tags: ["shadows", "css", "effects", "generator"],
    icon: "fas fa-square",
    difficulty: "beginner",
    popularity: 84,
  },
  {
    id: 45,
    name: "CSS Border Radius Generator",
    description:
      "Generate complex border radius values for unique rounded corner shapes.",
    url: "https://10015.io/tools/css-border-radius-generator",
    category: "css-tools",
    tags: ["border-radius", "shapes", "css", "corners"],
    icon: "fas fa-circle",
    difficulty: "beginner",
    popularity: 81,
  },
  {
    id: 46,
    name: "Font Awesome Pro Free",
    description:
      "Free collection of Font Awesome Pro icons for your projects (unofficial).",
    url: "https://github.com/RealNath/Font-Awesome-Pro-Free",
    category: "design-tools",
    tags: ["icons", "font-awesome", "free", "github"],
    icon: "fab fa-font-awesome",
    difficulty: "beginner",
    popularity: 77,
  },
];

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  allTools = [...toolsData];
  filteredTools = [...allTools];

  // Register Service Worker
  registerServiceWorker();

  // Initialize theme
  initializeTheme();

  // Render featured tools
  renderFeaturedTools();

  // Render initial tools
  renderTools();

  // Update favorites count
  updateFavoritesCount();

  // Setup event listeners
  setupEventListeners();

  // Animations & counters
  initScrollReveal();
  initCounters();
  initInteractiveBackground();
  initHeroParticles();

  // Show scroll to top button when needed
  handleScrollToTop();
}

// ==========================================
// THEME MANAGEMENT
// ==========================================
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeToggleIcon(newTheme);
  // Re-tint hero particles to match theme
  restartHeroParticles();
}

function updateThemeToggleIcon(theme) {
  const themeToggle = document.getElementById("themeToggle");
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  // Theme toggle
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", debounce(handleSearch, 300));

  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => handleCategoryFilter(btn));
  });

  // Sort dropdown
  document.getElementById("sortSelect").addEventListener("change", handleSort);

  // View toggle
  document.getElementById("viewToggle").addEventListener("click", toggleView);

  // Favorites button
  document
    .getElementById("favoritesBtn")
    .addEventListener("click", showFavoritesModal);

  // Modal close buttons
  document
    .getElementById("closeFavorites")
    .addEventListener("click", closeFavoritesModal);
  document
    .getElementById("closeToolModal")
    .addEventListener("click", closeToolModal);

  // Close modals on backdrop click
  document.getElementById("favoritesModal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeFavoritesModal();
  });

  document.getElementById("toolModal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeToolModal();
  });

  // Load more button
  document
    .getElementById("loadMoreBtn")
    .addEventListener("click", loadMoreTools);

  // Scroll to top
  document.getElementById("scrollToTop").addEventListener("click", scrollToTop);

  // Handle scroll events
  window.addEventListener("scroll", handleScrollToTop);

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts);

  // Hero CTA buttons
  setupHeroCTAButtons();

  // Scroll indicator
  setupScrollIndicator();

  // Enhanced navbar functionality
  setupEnhancedNavbar();

  // Enhanced search functionality
  setupEnhancedSearch();

  // Brand click handler
  const navBrand = document.getElementById("navBrand");
  if (navBrand) {
    navBrand.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Mobile menu functionality
  setupMobileMenu();

  // Footer category links
  setupFooterCategoryLinks();
}

// ==========================================
// MOBILE MENU FUNCTIONALITY
// ==========================================
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  const mobileThemeToggle = document.getElementById("mobileThemeToggle");
  const mobileFavoritesBtn = document.getElementById("mobileFavoritesBtn");
  const mobileFavoritesCount = document.querySelector(
    ".mobile-favorites-count"
  );

  if (!mobileMenuToggle || !mobileMenu) return;

  // Toggle mobile menu
  mobileMenuToggle.addEventListener("click", () => {
    const isActive = mobileMenuToggle.classList.contains("active");

    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Sync mobile search with main search
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", (e) => {
      const mainSearchInput = document.getElementById("searchInput");
      if (mainSearchInput) {
        mainSearchInput.value = e.target.value;
        // Trigger the search
        const event = new Event("input", { bubbles: true });
        mainSearchInput.dispatchEvent(event);
      }
    });
  }

  // Mobile theme toggle
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", () => {
      toggleTheme();
      closeMobileMenu();
    });
  }

  // Mobile favorites button
  if (mobileFavoritesBtn) {
    mobileFavoritesBtn.addEventListener("click", () => {
      showFavoritesModal();
      closeMobileMenu();
    });
  }

  // Update mobile favorites count
  if (mobileFavoritesCount) {
    const updateMobileFavoritesCount = () => {
      mobileFavoritesCount.textContent = favorites.length;
    };

    // Initial update
    updateMobileFavoritesCount();
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });
}

function setupFooterCategoryLinks() {
  const footerCategoryLinks = document.querySelectorAll(
    ".footer-category-link"
  );

  footerCategoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const category = link.dataset.category;

      // Update the current category
      currentCategory = category;

      // Update filter buttons to show the selected category as active
      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.category === category) {
          btn.classList.add("active");
        }
      });

      // Reset displayed items for new category
      displayedItems = 12;

      // Filter and render tools
      filterAndRenderTools();

      // Scroll to tools section smoothly
      const toolsSection = document.querySelector(".tools-section");
      if (toolsSection) {
        toolsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Update URL hash (optional, for better UX)
      history.pushState(null, "", `#${category}`);
    });
  });
}

function openMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.classList.add("active");
    mobileMenu.classList.add("active");
    document.body.classList.add("mobile-menu-open");

    // Sync search input values
    const mainSearchInput = document.getElementById("searchInput");
    const mobileSearchInput = document.getElementById("mobileSearchInput");
    if (mainSearchInput && mobileSearchInput) {
      mobileSearchInput.value = mainSearchInput.value;
    }

    // Announce to screen readers
    announceToScreenReader("Mobile menu opened");
  }
}

function closeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.classList.remove("mobile-menu-open");

    // Announce to screen readers
    announceToScreenReader("Mobile menu closed");
  }
}

// ==========================================
// ACCESSIBILITY HELPERS
// ==========================================
function respectsReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function announceToScreenReader(message) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}

// ==========================================
// HERO INTERACTIVE ELEMENTS
// ==========================================
function setupHeroCTAButtons() {
  // Explore Tools button
  const exploreToolsBtn = document.getElementById("exploreToolsBtn");
  if (exploreToolsBtn) {
    exploreToolsBtn.addEventListener("click", () => {
      const controlsSection = document.querySelector(".controls-section");
      if (controlsSection) {
        controlsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Add a subtle pulse effect to highlight the filter controls (unless reduced motion is preferred)
      if (!respectsReducedMotion()) {
        setTimeout(() => {
          const filterControls = document.querySelector(".filter-controls");
          if (filterControls) {
            filterControls.style.animation = "pulse 1s ease-in-out";
            setTimeout(() => {
              filterControls.style.animation = "";
            }, 1000);
          }
        }, 500);
      }
      // Announce navigation to screen readers
      announceToScreenReader("Navigated to tools and resources section");
    });
  }

  // Play Games button
  const playGamesBtn = document.getElementById("playGamesBtn");
  if (playGamesBtn) {
    playGamesBtn.addEventListener("click", () => {
      // Filter by games category
      currentCategory = "games";
      const gameFilterBtn = document.querySelector('[data-category="games"]');
      if (gameFilterBtn) {
        // Update active filter button
        document
          .querySelectorAll(".filter-btn")
          .forEach((btn) => btn.classList.remove("active"));
        gameFilterBtn.classList.add("active");

        // Filter and scroll to results
        filterAndRenderTools();
        setTimeout(() => {
          const controlsSection = document.querySelector(".controls-section");
          if (controlsSection) {
            controlsSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
        // Announce filter change to screen readers
        announceToScreenReader("Filtered to show educational games");
      }
    });
  }

  // Learn More button
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", () => {
      // Filter by learning category
      currentCategory = "learning";
      const learningFilterBtn = document.querySelector(
        '[data-category="learning"]'
      );
      if (learningFilterBtn) {
        // Update active filter button
        document
          .querySelectorAll(".filter-btn")
          .forEach((btn) => btn.classList.remove("active"));
        learningFilterBtn.classList.add("active");

        // Filter and scroll to results
        filterAndRenderTools();
        setTimeout(() => {
          const controlsSection = document.querySelector(".controls-section");
          if (controlsSection) {
            controlsSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
        // Announce filter change to screen readers
        announceToScreenReader("Filtered to show learning resources");
      }
    });
  }
}

function setupScrollIndicator() {
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    const scrollToContent = () => {
      const controlsSection = document.querySelector(".controls-section");
      if (controlsSection) {
        controlsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        // Announce to screen readers
        announceToScreenReader("Navigated to tools and resources section");
      }
    };

    // Handle click and keyboard events
    scrollIndicator.addEventListener("click", scrollToContent);

    scrollIndicator.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToContent();
      }
    });

    // Hide scroll indicator when user scrolls down
    let lastScrollTop = 0;
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const heroHeight = document.querySelector(".hero")?.offsetHeight || 0;

      if (scrollTop > heroHeight * 0.3) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.transform = "translateX(-50%) translateY(20px)";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.transform = "translateX(-50%) translateY(0)";
      }

      lastScrollTop = scrollTop;
    });
  }
}

// ==========================================
// ENHANCED NAVBAR FUNCTIONALITY
// ==========================================
function setupEnhancedNavbar() {
  const navbar = document.querySelector(".navbar");
  const hero = document.querySelector(".hero");
  let lastScrollTop = 0;
  let isNavbarVisible = false;

  if (!navbar || !hero) return;

  // Initially show navbar if user refreshes page while scrolled
  if (window.pageYOffset > hero.offsetHeight * 0.2) {
    navbar.classList.add("visible", "scrolled");
    isNavbarVisible = true;
  }

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = hero.offsetHeight;
    const scrollThreshold = heroHeight * 0.3;

    // Show/hide navbar based on scroll position
    if (scrollTop > scrollThreshold && !isNavbarVisible) {
      navbar.classList.add("visible");
      isNavbarVisible = true;
    } else if (scrollTop <= scrollThreshold && isNavbarVisible) {
      navbar.classList.remove("visible", "scrolled");
      isNavbarVisible = false;
    }

    // Add scrolled class for additional styling when user scrolls further
    if (scrollTop > heroHeight * 0.5) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });

  // Handle navbar glassmorphism on window focus/blur for better performance
  window.addEventListener("focus", () => {
    navbar.style.backdropFilter = "blur(25px)";
  });

  window.addEventListener("blur", () => {
    navbar.style.backdropFilter = "blur(15px)";
  });
}

// ==========================================
// ENHANCED SEARCH FUNCTIONALITY
// ==========================================
function setupEnhancedSearch() {
  const searchContainer = document.getElementById("searchContainer");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const searchSuggestions = document.getElementById("searchSuggestions");

  if (!searchInput || !searchClear || !searchSuggestions) return;

  let currentSuggestionIndex = -1;
  let searchTimeout = null;

  // Handle input changes
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    // Toggle clear button visibility
    if (value) {
      searchContainer.classList.add("has-value");
    } else {
      searchContainer.classList.remove("has-value");
    }

    // Debounced search suggestions
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (value.length >= 2) {
        showSearchSuggestions(value);
      } else {
        hideSearchSuggestions();
      }
    }, 200);
  });

  // Handle clear button
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchContainer.classList.remove("has-value");
    hideSearchSuggestions();
    searchInput.focus();
    // Clear current search
    searchTerm = "";
    filterAndRenderTools();
  });

  // Handle keyboard navigation in suggestions
  searchInput.addEventListener("keydown", (e) => {
    const suggestions =
      searchSuggestions.querySelectorAll(".search-suggestion");

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        currentSuggestionIndex = Math.min(
          currentSuggestionIndex + 1,
          suggestions.length - 1
        );
        highlightSuggestion(suggestions);
        break;
      case "ArrowUp":
        e.preventDefault();
        currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, -1);
        highlightSuggestion(suggestions);
        break;
      case "Enter":
        if (
          currentSuggestionIndex >= 0 &&
          suggestions[currentSuggestionIndex]
        ) {
          e.preventDefault();
          selectSuggestion(suggestions[currentSuggestionIndex]);
        }
        break;
      case "Escape":
        hideSearchSuggestions();
        searchInput.blur();
        break;
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
      hideSearchSuggestions();
    }
  });

  // Handle search input focus/blur
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim().length >= 2) {
      showSearchSuggestions(searchInput.value.trim());
    }
  });

  searchInput.addEventListener("blur", (e) => {
    // Delay hiding to allow clicking on suggestions
    setTimeout(() => {
      if (!searchContainer.contains(document.activeElement)) {
        hideSearchSuggestions();
      }
    }, 150);
  });
}

function showSearchSuggestions(query) {
  const searchSuggestions = document.getElementById("searchSuggestions");
  const searchInput = document.getElementById("searchInput");

  if (!searchSuggestions || !allTools) return;

  // Generate suggestions based on tools data
  const suggestions = generateSearchSuggestions(query);

  if (suggestions.length === 0) {
    hideSearchSuggestions();
    return;
  }

  // Render suggestions
  searchSuggestions.innerHTML = suggestions
    .map(
      (suggestion, index) => `
    <div class="search-suggestion" data-index="${index}" data-query="${
        suggestion.query
      }" data-category="${suggestion.category || ""}">
      <i class="${
        suggestion.icon
      } search-suggestion-icon" aria-hidden="true"></i>
      <span class="search-suggestion-text">${suggestion.text}</span>
      ${
        suggestion.category
          ? `<span class="search-suggestion-category">${suggestion.category}</span>`
          : ""
      }
    </div>
  `
    )
    .join("");

  // Add click handlers to suggestions
  searchSuggestions
    .querySelectorAll(".search-suggestion")
    .forEach((suggestion) => {
      suggestion.addEventListener("click", () => selectSuggestion(suggestion));
    });

  // Show suggestions
  searchSuggestions.classList.add("visible");
  searchInput.setAttribute("aria-expanded", "true");
  currentSuggestionIndex = -1;
}

function hideSearchSuggestions() {
  const searchSuggestions = document.getElementById("searchSuggestions");
  const searchInput = document.getElementById("searchInput");

  if (searchSuggestions) {
    searchSuggestions.classList.remove("visible");
  }
  if (searchInput) {
    searchInput.setAttribute("aria-expanded", "false");
  }
  currentSuggestionIndex = -1;
}

function highlightSuggestion(suggestions) {
  suggestions.forEach((suggestion, index) => {
    suggestion.classList.toggle(
      "highlighted",
      index === currentSuggestionIndex
    );
  });
}

function selectSuggestion(suggestionElement) {
  const query = suggestionElement.getAttribute("data-query");
  const category = suggestionElement.getAttribute("data-category");
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.value = query;
  }

  // If it's a category suggestion, filter by category
  if (category && category !== "search") {
    currentCategory = category;
    const filterBtn = document.querySelector(`[data-category="${category}"]`);
    if (filterBtn) {
      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      filterBtn.classList.add("active");
    }
  }

  // Apply search/filter
  searchTerm = query.toLowerCase();
  filterAndRenderTools();

  hideSearchSuggestions();

  // Scroll to results
  setTimeout(() => {
    const controlsSection = document.querySelector(".controls-section");
    if (controlsSection) {
      controlsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 100);

  // Announce to screen readers
  announceToScreenReader(`Search applied: ${query}`);
}

function generateSearchSuggestions(query) {
  const suggestions = [];
  const queryLower = query.toLowerCase();

  // Add direct search suggestion
  suggestions.push({
    text: `Search for "${query}"`,
    query: query,
    icon: "fas fa-search",
  });

  // Find matching tool names
  const matchingTools = allTools
    .filter(
      (tool) =>
        tool.name.toLowerCase().includes(queryLower) ||
        tool.description.toLowerCase().includes(queryLower) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(queryLower))
    )
    .slice(0, 3);

  matchingTools.forEach((tool) => {
    suggestions.push({
      text: tool.name,
      query: tool.name,
      icon: tool.icon || "fas fa-tool",
      category: "search",
    });
  });

  // Add category suggestions
  const categories = [
    { name: "Educational Games", key: "games", icon: "fas fa-gamepad" },
    { name: "CSS Tools", key: "css-tools", icon: "fas fa-palette" },
    {
      name: "Performance Tools",
      key: "performance",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "Learning Resources",
      key: "learning",
      icon: "fas fa-graduation-cap",
    },
  ];

  const matchingCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(queryLower)
  );

  matchingCategories.forEach((cat) => {
    suggestions.push({
      text: `Browse ${cat.name}`,
      query: query,
      category: cat.key,
      icon: cat.icon,
    });
  });

  return suggestions.slice(0, 6); // Limit to 6 suggestions
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
function handleSearch(e) {
  searchTerm = e.target.value.toLowerCase().trim();
  filterAndRenderTools();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================
// FILTERING & SORTING
// ==========================================
function handleCategoryFilter(button) {
  // Update active button
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  currentCategory = button.dataset.category;
  displayedItems = 12;
  filterAndRenderTools();
}

function handleSort(e) {
  currentSort = e.target.value;
  filterAndRenderTools();
}

function filterAndRenderTools() {
  // Filter by category
  let filtered =
    currentCategory === "all"
      ? [...allTools]
      : allTools.filter((tool) => tool.category === currentCategory);

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        tool.category.toLowerCase().includes(searchTerm)
    );
  }

  // Sort tools
  filtered.sort((a, b) => {
    switch (currentSort) {
      case "name":
        return a.name.localeCompare(b.name);
      case "category":
        return a.category.localeCompare(b.category);
      case "popularity":
        return b.popularity - a.popularity;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  filteredTools = filtered;
  renderTools();
}

// ==========================================
// FEATURED TOOLS RENDERING
// ==========================================
function renderFeaturedTools() {
  const featuredSection = document.getElementById("featured-carousel-section");
  const carouselTrack = document.getElementById("carouselTrack");

  if (!featuredSection || !carouselTrack) return;

  // Select featured tools based on high popularity and different categories
  const featuredToolIds = [];

  const featuredTools = allTools.filter((tool) =>
    featuredToolIds.includes(tool.id)
  );

  // Hide section if no featured tools available
  if (featuredTools.length === 0) {
    hideFeaturedSection(featuredSection);
    return;
  }

  // Show section with smooth animation
  showFeaturedSection(featuredSection);

  // Add loading state
  showFeaturedLoadingState(carouselTrack);

  // Simulate loading for better UX
  setTimeout(() => {
    carouselTrack.innerHTML = featuredTools
      .map((tool) => createFeaturedCarouselCard(tool))
      .join("");

    // Setup carousel functionality with enhanced features
    const carouselCleanup = setupFeaturedCarousel(featuredTools.length);

    // Store cleanup function globally for potential reuse
    window.featuredCarouselCleanup = carouselCleanup;

    // Setup event listeners for featured cards
    setupFeaturedCardListeners();

    // Remove loading state
    hideFeaturedLoadingState(carouselTrack);
  }, 300);
}

function hideFeaturedSection(featuredSection) {
  featuredSection.style.opacity = "0";
  featuredSection.style.transform = "translateY(-20px)";
  featuredSection.style.pointerEvents = "none";

  setTimeout(() => {
    featuredSection.style.display = "none";
  }, 300);
}

function showFeaturedSection(featuredSection) {
  featuredSection.style.display = "block";
  featuredSection.style.pointerEvents = "auto";

  // Trigger reflow
  featuredSection.offsetHeight;

  featuredSection.style.opacity = "1";
  featuredSection.style.transform = "translateY(0)";
}

function showFeaturedLoadingState(carouselTrack) {
  carouselTrack.innerHTML = `
    <div class="featured-loading-container">
      <div class="featured-loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <p class="featured-loading-text">Loading featured tools...</p>
    </div>
  `;
}

function hideFeaturedLoadingState(carouselTrack) {
  const loadingContainer = carouselTrack.querySelector(
    ".featured-loading-container"
  );
  if (loadingContainer) {
    loadingContainer.style.opacity = "0";
    setTimeout(() => {
      loadingContainer.remove();
    }, 200);
  }
}

function createFeaturedCarouselCard(tool) {
  const isFavorited = favorites.includes(tool.id);
  const categoryIcon = getCategoryIcon(tool.category);

  return `
    <div class="featured-carousel-card" 
         data-tool-id="${tool.id}" 
         data-category="${tool.category}"
         role="listitem"
         tabindex="0"
         aria-labelledby="tool-${tool.id}-title"
         aria-describedby="tool-${tool.id}-desc">
      <div class="featured-carousel-header">
        <i class="${tool.icon} featured-carousel-icon" aria-hidden="true"></i>
        <button class="favorite-btn ${isFavorited ? "favorited" : ""}" 
                data-tool-id="${tool.id}" 
                title="${isFavorited ? "Remove from" : "Add to"} favorites"
                aria-label="${isFavorited ? "Remove" : "Add"} ${tool.name} ${
    isFavorited ? "from" : "to"
  } favorites">
          <i class="fas fa-heart" aria-hidden="true"></i>
        </button>
      </div>
      
      <div class="featured-carousel-content">
        <h3 class="featured-carousel-title" id="tool-${tool.id}-title">${
    tool.name
  }</h3>
        <p class="featured-carousel-description" id="tool-${tool.id}-desc">${
    tool.description
  }</p>
      </div>
        
      <div class="featured-carousel-footer">
        <span class="featured-carousel-category" role="text" aria-label="Category: ${formatCategory(
          tool.category
        )}">
          <i class="${categoryIcon}" aria-hidden="true"></i>
          ${formatCategory(tool.category)}
        </span>
        <a href="${tool.url}" class="featured-carousel-launch" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="Try ${tool.name} (opens in new tab)">
          Try <i class="fas fa-external-link-alt" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  `;
}

function setupFeaturedCarousel(totalItems) {
  const carouselTrack = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const indicatorsContainer = document.getElementById("carouselIndicators");

  if (!carouselTrack || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const itemsPerView = getItemsPerView();
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Create indicators
  const indicatorCount = Math.ceil(totalItems / itemsPerView);
  indicatorsContainer.innerHTML = Array.from(
    { length: indicatorCount },
    (_, i) =>
      `<button class="carousel-dot ${
        i === 0 ? "active" : ""
      }" data-index="${i}"></button>`
  ).join("");

  // Update carousel position with enhanced animations
  function updateCarousel(direction = "none") {
    const translateX = currentIndex * (100 / itemsPerView);

    // Add transition class for smooth animation
    carouselTrack.classList.add("carousel-transitioning");

    // Apply transform with perspective for 3D effect
    carouselTrack.style.transform = `translateX(-${translateX}%) rotateY(0deg)`;

    // Add direction-based animation classes
    if (direction === "next") {
      carouselTrack.classList.add("slide-next");
    } else if (direction === "prev") {
      carouselTrack.classList.add("slide-prev");
    }

    // Remove animation classes after transition
    setTimeout(() => {
      carouselTrack.classList.remove(
        "carousel-transitioning",
        "slide-next",
        "slide-prev"
      );
    }, 500);

    // Update indicators with animation and accessibility
    document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      const isActive = i === Math.floor(currentIndex / itemsPerView);

      if (isActive && !dot.classList.contains("active")) {
        dot.classList.add("dot-activating");
        setTimeout(() => dot.classList.remove("dot-activating"), 300);
      }

      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive.toString());
      dot.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    // Update button states with visual feedback and accessibility
    updateNavigationButtons();
    updateIndicatorAttributes();
  }

  function updateNavigationButtons() {
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex >= maxIndex;

    // Previous button
    prevBtn.disabled = isPrevDisabled;
    prevBtn.classList.toggle("nav-disabled", isPrevDisabled);
    prevBtn.style.opacity = isPrevDisabled ? "0.4" : "1";

    // Next button
    nextBtn.disabled = isNextDisabled;
    nextBtn.classList.toggle("nav-disabled", isNextDisabled);
    nextBtn.style.opacity = isNextDisabled ? "0.4" : "1";
  }

  // Event listeners with enhanced feedback
  prevBtn.addEventListener("click", (e) => {
    if (currentIndex > 0) {
      addButtonRipple(e, prevBtn);
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel("prev");
    }
  });

  nextBtn.addEventListener("click", (e) => {
    if (currentIndex < maxIndex) {
      addButtonRipple(e, nextBtn);
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateCarousel("next");
    }
  });

  // Enhanced button ripple effect
  function addButtonRipple(event, button) {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("button-ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Indicator clicks with smooth transitions
  document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.addEventListener("click", (e) => {
      addButtonRipple(e, dot);
      const newIndex = i * itemsPerView;
      const direction = newIndex > currentIndex ? "next" : "prev";
      currentIndex = newIndex;
      updateCarousel(direction);
    });
  });

  // Enhanced Auto-play with visual indicators
  let autoPlayInterval;
  let isAutoPlaying = true;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
        updateCarousel("reset");
      } else {
        currentIndex++;
        updateCarousel("next");
      }
    }, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    isAutoPlaying = false;
  }

  function resumeAutoPlay() {
    if (!isAutoPlaying) {
      isAutoPlaying = true;
      startAutoPlay();
    }
  }

  // Start initial auto-play
  startAutoPlay();

  // Enhanced pause/resume on interaction
  carouselTrack.addEventListener("mouseenter", () => {
    stopAutoPlay();
    carouselTrack.classList.add("carousel-paused");
  });

  carouselTrack.addEventListener("mouseleave", () => {
    carouselTrack.classList.remove("carousel-paused");
    setTimeout(() => {
      resumeAutoPlay();
    }, 1000); // Brief delay before resuming
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  carouselTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carouselTrack.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  carouselTrack.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const deltaX = startX - endX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0 && currentIndex < maxIndex) {
        currentIndex++;
      } else if (deltaX < 0 && currentIndex > 0) {
        currentIndex--;
      }
      updateCarousel();
    }
  });

  // Keyboard navigation
  carouselTrack.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel("prev");
          announceCarouselStatus();
        }
        break;
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel("next");
          announceCarouselStatus();
        }
        break;
      case "Home":
        e.preventDefault();
        currentIndex = 0;
        updateCarousel("prev");
        announceCarouselStatus();
        break;
      case "End":
        e.preventDefault();
        currentIndex = maxIndex;
        updateCarousel("next");
        announceCarouselStatus();
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        // Toggle auto-play on spacebar/enter
        if (isAutoPlaying) {
          stopAutoPlay();
          announceStatus("Carousel paused");
        } else {
          resumeAutoPlay();
          announceStatus("Carousel resumed");
        }
        break;
    }
  });

  // Screen reader announcements
  function announceCarouselStatus() {
    const currentPage = Math.floor(currentIndex / itemsPerView) + 1;
    const totalPages = Math.ceil(totalItems / itemsPerView);
    const itemsOnPage = Math.min(itemsPerView, totalItems - currentIndex);

    announceStatus(
      `Page ${currentPage} of ${totalPages}, showing ${itemsOnPage} tools`
    );
  }

  function announceStatus(message) {
    const statusElement = document.getElementById("carousel-status");
    if (statusElement) {
      statusElement.textContent = message;
    }
  }

  // Update indicator accessibility attributes
  function updateIndicatorAttributes() {
    document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      const isActive = i === Math.floor(currentIndex / itemsPerView);
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", isActive.toString());
      dot.setAttribute("aria-label", `Go to page ${i + 1}`);
      dot.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  // Responsive resize handling with performance optimization
  const debouncedResize = debounce(() => {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView !== itemsPerView) {
      // Recalculate carousel layout
      const indicatorCount = Math.ceil(totalItems / newItemsPerView);
      const newMaxIndex = Math.max(0, totalItems - newItemsPerView);

      // Adjust current index if necessary
      if (currentIndex > newMaxIndex) {
        currentIndex = newMaxIndex;
      }

      // Recreate indicators
      indicatorsContainer.innerHTML = Array.from(
        { length: indicatorCount },
        (_, i) =>
          `<button class="carousel-dot ${
            i === 0 ? "active" : ""
          }" data-index="${i}" 
           role="tab" 
           aria-selected="${i === 0}" 
           aria-label="Go to page ${i + 1}" 
           tabindex="${i === 0 ? "0" : "-1"}"></button>`
      ).join("");

      // Re-setup indicator listeners
      document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.addEventListener("click", (e) => {
          addButtonRipple(e, dot);
          const newIndex = i * newItemsPerView;
          const direction = newIndex > currentIndex ? "next" : "prev";
          currentIndex = newIndex;
          updateCarousel(direction);
        });
      });

      updateCarousel();
      updateIndicatorAttributes();
    }
  }, 150);

  window.addEventListener("resize", debouncedResize);

  // Performance: Use requestAnimationFrame for smooth animations
  const optimizedUpdateCarousel = (direction = "none") => {
    requestAnimationFrame(() => {
      updateCarousel(direction);
    });
  };

  // Setup intersection observer for performance
  setupIntersectionObserver();

  // Initialize with accessibility
  updateCarousel();
  announceCarouselStatus();
  updateIndicatorAttributes();

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", debouncedResize);
    clearInterval(autoPlayInterval);
  };
}

function getItemsPerView() {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1024) return 2;
  if (width < 1400) return 3;
  return 4;
}

// Performance optimization utilities
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer for lazy loading
function setupIntersectionObserver() {
  const featuredSection = document.getElementById("featured-carousel-section");
  if (!featuredSection || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section is visible, ensure carousel is active
          entry.target.classList.add("carousel-active");
          // Preload images in visible cards
          preloadVisibleImages(entry.target);
        } else {
          // Section is not visible, pause auto-play for performance
          entry.target.classList.remove("carousel-active");
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.1,
    }
  );

  observer.observe(featuredSection);
  return observer;
}

function preloadVisibleImages(section) {
  const visibleCards = section.querySelectorAll(".featured-carousel-card");
  visibleCards.forEach((card) => {
    const lazyImages = card.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  });
}

function setupFeaturedCardListeners() {
  // Favorite buttons for featured carousel cards
  document
    .querySelectorAll(".featured-carousel-card .favorite-btn")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(parseInt(btn.dataset.toolId));
      });
    });

  // Featured carousel cards (for modal)
  document.querySelectorAll(".featured-carousel-card").forEach((card) => {
    // Add click animation effect (excluding the launch link and favorite button)
    card.addEventListener("click", (e) => {
      if (
        !e.target.closest(".featured-carousel-launch") &&
        !e.target.closest(".favorite-btn")
      ) {
        // Add click ripple effect
        addRippleEffect(e, card);
        showToolModal(parseInt(card.dataset.toolId));
      }
    });

    // Add hover animation for icon
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".featured-carousel-icon");
      if (icon && !card.hasAttribute("data-animated")) {
        icon.style.transform = "scale(1.1) rotateY(180deg)";
        card.setAttribute("data-animated", "true");

        setTimeout(() => {
          icon.style.transform = "";
          card.removeAttribute("data-animated");
        }, 300);
      }
    });
  });
}

// ==========================================
// RENDERING FUNCTIONS
// ==========================================
function renderTools() {
  const toolsGrid = document.getElementById("toolsGrid");
  const noResults = document.getElementById("noResults");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (filteredTools.length === 0) {
    toolsGrid.innerHTML = "";
    noResults.style.display = "block";
    loadMoreBtn.style.display = "none";
    return;
  }

  noResults.style.display = "none";

  const toolsToShow = filteredTools.slice(0, displayedItems);

  toolsGrid.innerHTML = toolsToShow
    .map((tool) => createToolCard(tool))
    .join("");

  // Show/hide load more button
  if (filteredTools.length > displayedItems) {
    loadMoreBtn.style.display = "block";
  } else {
    loadMoreBtn.style.display = "none";
  }

  // Mark cards for reveal-on-scroll and observe
  const cards = toolsGrid.querySelectorAll(".tool-card");
  cards.forEach((card, index) => {
    card.classList.add("reveal");
    // Stagger with up to 4 delay steps
    card.classList.add(`reveal-delay-${(index % 4) + 1}`);
    observeReveal(card);
  });

  // Setup tool card event listeners
  setupToolCardListeners();
}

function createToolCard(tool) {
  const isFavorited = favorites.includes(tool.id);
  const categoryIcon = getCategoryIcon(tool.category);

  return `
        <div class="tool-card" data-tool-id="${tool.id}" data-category="${
    tool.category
  }">
            <div class="tool-header">
                <i class="${tool.icon} tool-icon"></i>
                <div class="tool-actions">
                    <button class="favorite-btn ${
                      isFavorited ? "favorited" : ""
                    }" 
                            data-tool-id="${tool.id}" title="Add to favorites">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="tool-content">
                <h3 class="tool-title">${tool.name}</h3>
                <p class="tool-description">${tool.description}</p>
                
                <div class="tool-meta">
                    <span class="tool-category">
                        <i class="${categoryIcon}"></i>
                        ${formatCategory(tool.category)}
                    </span>
                    <div class="tool-tags">
                        ${tool.tags
                          .slice(0, 3)
                          .map((tag) => `<span class="tool-tag">${tag}</span>`)
                          .join("")}
                    </div>
                </div>
                
                <a href="${
                  tool.url
                }" target="_blank" rel="noopener noreferrer" class="tool-link" 
                   onclick="trackToolClick('${tool.name}')">
                    Visit Tool
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
}

function getCategoryIcon(category) {
  const icons = {
    games: "fas fa-gamepad",
    "css-tools": "fas fa-palette",
    performance: "fas fa-tachometer-alt",
    learning: "fas fa-graduation-cap",
    generators: "fas fa-magic",
    utilities: "fas fa-tools",
    design: "fas fa-paint-brush",
  };
  return icons[category] || "fas fa-star";
}

function formatCategory(category) {
  const formatted = {
    games: "Educational Games",
    "css-tools": "CSS Tools",
    performance: "Performance",
    learning: "Learning",
    generators: "Generators",
    utilities: "Utilities",
    design: "Design",
  };
  return formatted[category] || category;
}

function addRippleEffect(event, element) {
  // Ripple effect disabled - no visual effect on card click
  return;
}

function setupToolCardListeners() {
  // Favorite buttons
  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(parseInt(btn.dataset.toolId));
    });
  });

  // Tool cards (for modal)
  document.querySelectorAll(".tool-card").forEach((card) => {
    // Add click animation effect
    card.addEventListener("click", (e) => {
      if (
        !e.target.closest(".tool-link") &&
        !e.target.closest(".favorite-btn")
      ) {
        // Add click ripple effect
        addRippleEffect(e, card);
        showToolModal(parseInt(card.dataset.toolId));
      }
    });

    // Add hover sound effect trigger (visual feedback)
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".tool-icon");
      if (icon && !card.hasAttribute("data-animated")) {
        icon.style.transform = "scale(1.1) rotateY(180deg)";
        card.setAttribute("data-animated", "true");

        setTimeout(() => {
          icon.style.transform = "";
          card.removeAttribute("data-animated");
        }, 300);
      }
    });
  });
}

// ==========================================
// FAVORITES FUNCTIONALITY
// ==========================================
function toggleFavorite(toolId) {
  const index = favorites.indexOf(toolId);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(toolId);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesCount();

  // Update button state
  const btn = document.querySelector(`[data-tool-id="${toolId}"].favorite-btn`);
  if (btn) {
    btn.classList.toggle("favorited");
  }

  // Show notification
  showNotification(
    index > -1 ? "Removed from favorites" : "Added to favorites",
    index > -1 ? "info" : "success"
  );
}

function updateFavoritesCount() {
  const count = favorites.length;
  const countElement = document.querySelector(".favorites-count");
  countElement.textContent = count;
  countElement.style.display = count > 0 ? "block" : "none";
}

function showFavoritesModal() {
  const modal = document.getElementById("favoritesModal");
  const favoritesList = document.getElementById("favoritesList");

  if (favorites.length === 0) {
    favoritesList.innerHTML = `
            <div class="empty-favorites">
                <i class="fas fa-heart-broken"></i>
                <p>No favorites yet! Start exploring and add tools you love.</p>
            </div>
        `;
  } else {
    const favoriteTools = allTools.filter((tool) =>
      favorites.includes(tool.id)
    );
    favoritesList.innerHTML = favoriteTools
      .map(
        (tool) => `
            <div class="favorite-item" style="padding: 1rem; border-bottom: 1px solid var(--border-color);">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <i class="${tool.icon}" style="font-size: 1.5rem; color: var(--primary-color);"></i>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; color: var(--text-primary);">${tool.name}</h4>
                        <p style="margin: 0.5rem 0 0; color: var(--text-secondary); font-size: var(--font-size-sm);">
                            ${tool.description}
                        </p>
                    </div>
                    <a href="${tool.url}" target="_blank" rel="noopener noreferrer" 
                       style="padding: 0.5rem 1rem; background: var(--primary-color); color: var(--text-inverse); 
                              text-decoration: none; border-radius: var(--border-radius); font-size: var(--font-size-sm);">
                        Visit
                    </a>
                </div>
            </div>
        `
      )
      .join("");
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeFavoritesModal() {
  const modal = document.getElementById("favoritesModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ==========================================
// TOOL MODAL
// ==========================================
function showToolModal(toolId) {
  const tool = allTools.find((t) => t.id === toolId);
  if (!tool) return;

  const modal = document.getElementById("toolModal");
  const modalTitle = document.getElementById("modalToolName");
  const toolDetail = document.getElementById("toolDetail");

  modalTitle.textContent = tool.name;

  toolDetail.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <i class="${
              tool.icon
            }" style="font-size: 4rem; color: var(--brand-lemonade); margin-bottom: 1rem;"></i>
            <h3 style="margin: 0; color: var(--text-primary);">${tool.name}</h3>
            <p style="color: var(--text-secondary); margin: 0.5rem 0;">${
              tool.description
            }</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Category</h4>
            <span class="tool-category">
                <i class="${getCategoryIcon(tool.category)}"></i>
                ${formatCategory(tool.category)}
            </span>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Tags</h4>
            <div class="tool-tags">
                ${tool.tags
                  .map((tag) => `<span class="tool-tag">${tag}</span>`)
                  .join("")}
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Difficulty Level</h4>
            <span style="padding: 0.25rem 0.75rem; background: var(--bg-secondary); color: var(--text-secondary); 
                         border-radius: 50px; font-size: var(--font-size-sm); text-transform: capitalize;">
                ${tool.difficulty}
            </span>
        </div>
        
        <div style="text-align: center;">
            <a href="${
              tool.url
            }" target="_blank" rel="noopener noreferrer" class="tool-link" 
               onclick="trackToolClick('${tool.name}')">
                Visit ${tool.name}
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeToolModal() {
  const modal = document.getElementById("toolModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ==========================================
// VIEW TOGGLE
// ==========================================
function toggleView() {
  const toolsGrid = document.getElementById("toolsGrid");
  const viewToggle = document.getElementById("viewToggle");
  const icon = viewToggle.querySelector("i");

  if (currentView === "grid") {
    currentView = "list";
    toolsGrid.classList.add("list-view");
    icon.className = "fas fa-th";
  } else {
    currentView = "grid";
    toolsGrid.classList.remove("list-view");
    icon.className = "fas fa-list";
  }

  localStorage.setItem("viewMode", currentView);
}

// ==========================================
// LOAD MORE FUNCTIONALITY
// ==========================================
function loadMoreTools() {
  displayedItems += 12;
  renderTools();
}

// ==========================================
// SCROLL TO TOP
// ==========================================
function handleScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ==========================================
// ANIMATIONS: SCROLL REVEAL & COUNTERS
// ==========================================
function prefersReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion()) {
    revealEls.forEach((el) => el.classList.add("revealed"));
    return;
  }

  if (!scrollRevealObserver) {
    scrollRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            scrollRevealObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
  }

  revealEls.forEach((el) => scrollRevealObserver.observe(el));
}

function observeReveal(el) {
  if (!el) return;
  if (prefersReducedMotion()) {
    el.classList.add("revealed");
    return;
  }
  if (!scrollRevealObserver) {
    initScrollReveal();
  } else {
    scrollRevealObserver.observe(el);
  }
}

function initCounters() {
  // Ensure total tools reflects actual data
  const totalToolsEl = document.getElementById("totalTools");
  if (totalToolsEl) {
    totalToolsEl.dataset.target = String(allTools.length);
    if (!totalToolsEl.dataset.suffix) totalToolsEl.dataset.suffix = "+";
  }

  const statEls = document.querySelectorAll(".stat-number");

  const setFinal = (el) => {
    const target = parseInt(el.dataset.target || "0", 10) || 0;
    const suffix = el.dataset.suffix || "";
    el.textContent = target.toLocaleString() + suffix;
  };

  if (prefersReducedMotion()) {
    statEls.forEach(setFinal);
    return;
  }

  if (!countersObserver) {
    countersObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            animateCount(el);
            countersObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );
  }

  statEls.forEach((el) => countersObserver.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.dataset.target || "0", 10) || 0;
  const suffix = el.dataset.suffix || "";
  const duration = parseInt(el.dataset.duration || "1200", 10);

  const startTime = performance.now();
  const startVal = 0;

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  // Initialize display before animating
  el.textContent = (0).toLocaleString() + suffix;
  requestAnimationFrame(step);
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    document.getElementById("searchInput").focus();
  }

  // Escape to close modals
  if (e.key === "Escape") {
    closeFavoritesModal();
    closeToolModal();
  }

  // Ctrl/Cmd + / for help (could add a help modal later)
  if ((e.ctrlKey || e.metaKey) && e.key === "/") {
    e.preventDefault();
    showNotification(
      "Keyboard Shortcuts: Ctrl+K (Search), Esc (Close), Ctrl+/ (Help)",
      "info"
    );
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        border-left: 4px solid var(--primary-color);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform var(--transition-smooth);
        max-width: 300px;
    `;

  if (type === "success") {
    notification.style.borderLeftColor = "#10b981";
  } else if (type === "error") {
    notification.style.borderLeftColor = "#ef4444";
  }

  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Hide notification
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function trackToolClick(toolName) {
  // Analytics tracking would go here
  console.log(`Tool clicked: ${toolName}`);
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Intersection Observer for lazy loading (if needed for images)
const observerOptions = {
  root: null,
  rootMargin: "50px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Service Worker registration (for PWA functionality)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// ==========================================
// HERO PARTICLES BACKGROUND
// ==========================================
function initHeroParticles() {
  // Enhanced accessibility and performance checks
  if (shouldDisableParticles()) return;

  const canvas = document.getElementById("heroParticles");
  if (!canvas) return;

  heroParticles.canvas = canvas;
  heroParticles.ctx = canvas.getContext("2d");

  // Add alpha for better compositing performance
  if (heroParticles.ctx) {
    heroParticles.ctx.globalCompositeOperation = "source-over";
  }

  setupHeroParticlesCanvas();
  seedHeroParticles();
  bindHeroParticlesEvents();
  startHeroParticles();
}

function setupHeroParticlesCanvas() {
  const canvas = heroParticles.canvas;
  if (!canvas) return;

  // Size canvas to match the hero section which now takes full width
  const hero = canvas.parentElement; // .hero
  const heroRect = hero.getBoundingClientRect();

  // Use full viewport width and hero height for complete coverage
  const canvasWidth = window.innerWidth; // Full viewport width
  const canvasHeight = heroRect.height; // Hero section height

  // Handle high DPI displays efficiently
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Set canvas dimensions
  canvas.width = Math.floor(canvasWidth * dpr);
  canvas.height = Math.floor(canvasHeight * dpr);
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  // Scale context for high DPI
  heroParticles.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Responsive particle count based on screen size and performance
  const area = canvasWidth * canvasHeight;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

  let baseCount;
  if (isTablet) {
    baseCount = Math.floor(area / 12000);
    heroParticles.options.connectDist = 100;
  } else {
    // Desktop only now (mobile is disabled)
    baseCount = Math.floor(area / 9000);
    heroParticles.options.connectDist = 120; // Longer connections on desktop
  }

  // Clamp particle count with responsive limits (no mobile anymore)
  const minCount = 40;
  const maxCount = isTablet ? 120 : 160;

  heroParticles.options.count = Math.max(
    minCount,
    Math.min(maxCount, baseCount)
  );
}

function themeParticleColors() {
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const lemonade =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--brand-lemonade")
      .trim() || "#B8FB3C";
  const electric =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--brand-electric")
      .trim() || "#030454";
  if (theme === "dark") {
    return {
      dot: hexToRgba(lemonade, 0.9),
      link: hexToRgba(lemonade, 0.28),
      bg: "transparent",
    };
  }
  return {
    dot: hexToRgba(electric, 0.85),
    link: hexToRgba(electric, 0.22),
    bg: "transparent",
  };
}

function seedHeroParticles() {
  const { count, speed, size } = heroParticles.options;
  const canvas = heroParticles.canvas;
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: size[0] + Math.random() * (size[1] - size[0]),
    });
  }
  heroParticles.particles = particles;
}

function bindHeroParticlesEvents() {
  const canvas = heroParticles.canvas;
  const hero = canvas.parentElement; // .hero

  const onPointerMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    heroParticles.mouse.x = e.clientX - rect.left;
    heroParticles.mouse.y = e.clientY - rect.top;
    heroParticles.mouse.active = true;
  };

  const onPointerLeave = () => {
    heroParticles.mouse.active = false;
  };

  // Throttled resize handler for better performance
  let resizeTimeout;
  const throttledResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      restartHeroParticles();
    }, 150); // 150ms debounce
  };

  hero.addEventListener("pointermove", onPointerMove);
  hero.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("resize", throttledResize);

  // Handle orientation change on mobile devices
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      restartHeroParticles();
    }, 300); // Delay to ensure viewport has updated
  });

  // Performance optimization: pause particles when not in view
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!heroParticles.animationId) {
              startHeroParticles();
            }
          } else {
            stopHeroParticles();
          }
        });
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    observer.observe(hero);
  }
}

function startHeroParticles() {
  cancelAnimationFrame(heroParticles.animationId);
  const loop = () => {
    drawHeroParticles();
    heroParticles.animationId = requestAnimationFrame(loop);
  };
  loop();
}

function stopHeroParticles() {
  cancelAnimationFrame(heroParticles.animationId);
}

function restartHeroParticles() {
  if (!heroParticles.canvas) return;

  // Check if particles should be disabled for performance or accessibility
  if (shouldDisableParticles()) {
    stopHeroParticles();
    heroParticles.ctx.clearRect(
      0,
      0,
      heroParticles.canvas.width,
      heroParticles.canvas.height
    );
    return;
  }

  stopHeroParticles();
  setupHeroParticlesCanvas();
  seedHeroParticles();
  startHeroParticles();
}

function shouldDisableParticles() {
  // Disable for users who prefer reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Disable on mobile devices (768px and below)
  const isMobile = window.innerWidth <= 768;

  // Disable on very low-end devices (less than 2GB RAM estimate)
  const isLowEndDevice =
    navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  // Disable if battery is critically low (if API is available)
  const isBatteryLow =
    navigator.getBattery &&
    navigator.getBattery().then &&
    navigator
      .getBattery()
      .then((battery) => battery.level < 0.2 && !battery.charging);

  return prefersReducedMotion || isMobile || isLowEndDevice;
}

function drawHeroParticles() {
  const ctx = heroParticles.ctx;
  const canvas = heroParticles.canvas;
  if (!ctx || !canvas) return;
  const colors = themeParticleColors();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const parts = heroParticles.particles;
  const { connectDist, repelDist } = heroParticles.options;
  const mouse = heroParticles.mouse;

  // Move and draw dots
  ctx.fillStyle = colors.dot;
  for (let p of parts) {
    // Mouse repulsion
    if (mouse.active && mouse.x != null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < repelDist) {
        const force = (repelDist - dist) / repelDist; // 0..1
        p.vx += (dx / (dist || 1)) * force * 0.2;
        p.vy += (dy / (dist || 1)) * force * 0.2;
      }
    }

    p.x += p.vx;
    p.y += p.vy;

    // Soft wrap edges
    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;
    if (p.y < -10) p.y = canvas.height + 10;
    if (p.y > canvas.height + 10) p.y = -10;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw links
  ctx.strokeStyle = colors.link;
  ctx.lineWidth = 1;
  for (let i = 0; i < parts.length; i++) {
    for (let j = i + 1; j < parts.length; j++) {
      const a = parts[i];
      const b = parts[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = dx * dx + dy * dy;
      const max = connectDist * connectDist;
      if (dist < max) {
        const alpha = 1 - dist / max;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.9, alpha));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
}

function hexToRgba(hex, alpha) {
  let c = hex.replace("#", "");
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  const n = parseInt(c, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ==========================================
// INTERACTIVE BACKGROUND (tools section)
// ==========================================
function initInteractiveBackground() {
  const section = document.querySelector(".tools-section");
  if (!section) return;

  let frameRequested = false;
  let lastPos = { x: 0.5, y: 0.5 };

  const updateVars = (x, y, isInSection = false) => {
    section.style.setProperty("--mouse-x", `${x * 100}%`);
    section.style.setProperty("--mouse-y", `${y * 100}%`);
    // Show/hide spotlight based on whether cursor is over tools section
    section.style.setProperty("--spotlight-opacity", isInSection ? "0.6" : "0");
  };

  const onMove = (evt) => {
    // Calculate mouse position relative to viewport for full-width spotlight
    const x = evt.clientX / window.innerWidth;
    const y = evt.clientY / window.innerHeight;

    // Check if mouse is over the tools section
    const rect = section.getBoundingClientRect();
    const isInSection =
      evt.clientX >= rect.left &&
      evt.clientX <= rect.right &&
      evt.clientY >= rect.top &&
      evt.clientY <= rect.bottom;

    lastPos = {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
      inSection: isInSection,
    };
    if (!frameRequested) {
      frameRequested = true;
      requestAnimationFrame(() => {
        updateVars(lastPos.x, lastPos.y, lastPos.inSection);
        frameRequested = false;
      });
    }
  };

  // Listen to the entire document for full-width spotlight
  document.addEventListener("mousemove", onMove);
  document.addEventListener("pointermove", (e) => {
    if (
      e.pointerType === "mouse" ||
      e.pointerType === "pen" ||
      e.pointerType === "touch"
    ) {
      onMove(e);
    }
  });
  // Init center
  updateVars(lastPos.x, lastPos.y);
}

// ==========================================
// SERVICE WORKER REGISTRATION
// ==========================================
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered successfully:",
            registration.scope
          );

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            console.log("Service Worker update found");

            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New version available, show update notification
                showUpdateNotification();
              }
            });
          });
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    });
  }
}

function showUpdateNotification() {
  // Create update notification
  const notification = document.createElement("div");
  notification.className = "update-notification";
  notification.innerHTML = `
    <div class="update-content">
      <i class="fas fa-download"></i>
      <span>A new version is available!</span>
      <button class="update-btn" onclick="updateApp()">Update</button>
      <button class="dismiss-btn" onclick="dismissUpdate(this)">×</button>
    </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Show with animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);
}

function updateApp() {
  window.location.reload();
}

function dismissUpdate(btn) {
  const notification = btn.closest(".update-notification");
  notification.classList.remove("show");
  setTimeout(() => {
    notification.remove();
  }, 300);
}
