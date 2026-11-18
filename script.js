
// ALEX LAUNCHER - MAIN JAVASCRIPT

// CLOCK AND DATE
function updateClock() {
  const now = new Date();

  const clock = document.getElementById("clock");
  const date = document.getElementById("date");

  if (clock) {
    clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  if (date) {
    date.textContent = now.toLocaleDateString([], {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  }
}

updateClock();
setInterval(updateClock, 1000);


// APP DRAWER ELEMENTS
const drawer = document.getElementById("app-drawer");
const drawerGrid = document.getElementById("drawer-grid");
const drawerSearch = document.getElementById("drawer-search");
const drawerClose = document.getElementById("drawer-close");
const drawerHeading = document.getElementById("drawer-heading");


// SAMPLE APP LIST
// These are preview entries, not automatically detected phone apps.
const apps = [
  { name: "Calculator", icon: "🧮", category: "Tools" },
  { name: "Calendar", icon: "📅", category: "Productivity" },
  { name: "Camera", icon: "📷", category: "Media" },
  { name: "Chrome", icon: "🌐", category: "Tools" },
  { name: "Clock", icon: "⏰", category: "Tools" },
  { name: "Contacts", icon: "👥", category: "Social" },
  { name: "Drive", icon: "📁", category: "Productivity" },
  { name: "Files", icon: "📂", category: "Tools" },
  { name: "Gallery", icon: "🖼️", category: "Media" },
  { name: "Gmail", icon: "✉️", category: "Productivity" },
  { name: "Google", icon: "🔍", category: "Tools" },
  { name: "Maps", icon: "🗺️", category: "Tools" },
  { name: "Messages", icon: "💬", category: "Social" },
  { name: "Music", icon: "🎵", category: "Media" },
  { name: "Phone", icon: "📞", category: "Social" },
  { name: "Photos", icon: "🌄", category: "Media" },
  { name: "Play Store", icon: "▶️", category: "Tools" },
  { name: "Settings", icon: "⚙️", category: "Tools" },
  { name: "YouTube", icon: "▶️", category: "Media" },
  { name: "WhatsApp", icon: "💚", category: "Social" }
];

let activeCategory = "All";


// DISPLAY APPS
function displayApps() {
  if (!drawerGrid) return;

  const searchText = drawerSearch
    ? drawerSearch.value.toLowerCase().trim()
    : "";

  const filteredApps = apps
    .filter(app => {
      const matchesCategory =
        activeCategory === "All" ||
        app.category === activeCategory;

      const matchesSearch =
        app.name.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  drawerGrid.innerHTML = "";

  if (drawerHeading) {
    drawerHeading.textContent =
      activeCategory === "All"
        ? "All Applications"
        : activeCategory + " Apps";
  }

  if (filteredApps.length === 0) {
    drawerGrid.innerHTML =
      '<p class="drawer-empty">No apps found</p>';
    return;
  }

  filteredApps.forEach(app => {
    const button = document.createElement("button");
    button.className = "drawer-app";

    button.innerHTML = `
      <span class="app-icon">${app.icon}</span>
      <span class="app-name">${app.name}</span>
    `;

    drawerGrid.appendChild(button);
  });
}


// OPEN DRAWER
function openDrawer() {
  if (!drawer) return;

  drawer.classList.add("active");
  displayApps();

  if (drawerSearch) {
    drawerSearch.value = "";
    drawerSearch.focus();
  }
}


// CLOSE DRAWER
function closeDrawer() {
  if (drawer) {
    drawer.classList.remove("active");
  }
}

if (drawerClose) {
  drawerClose.addEventListener("click", closeDrawer);
}


// OPEN FROM APPS WHEEL
document.querySelectorAll(".wheel-item").forEach(item => {
  item.addEventListener("click", () => {
    if (item.textContent.trim().includes("Apps")) {
      openDrawer();
    }
  });
});


// OPEN FROM BOTTOM DOCK
const openAppsButton = document.getElementById("open-apps");

if (openAppsButton) {
  openAppsButton.addEventListener("click", openDrawer);
}


// SEARCH
if (drawerSearch) {
  drawerSearch.addEventListener("input", displayApps);
}


// CATEGORY FILTER
document.querySelectorAll(".drawer-categories button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".drawer-categories button")
      .forEach(item => item.classList.remove("selected"));

    button.classList.add("selected");
    activeCategory = button.dataset.category;

    displayApps();
  });
});


// ALPHABETICAL NAVIGATION
document.querySelectorAll(".drawer-alphabet button").forEach(button => {
  button.addEventListener("click", () => {
    if (activeCategory !== "All") {
      activeCategory = "All";

      document.querySelectorAll(".drawer-categories button")
        .forEach(item => {
          item.classList.toggle(
            "selected",
            item.dataset.category === "All"
          );
        });
    }

    if (drawerSearch) {
      drawerSearch.value = "";
    }

    displayApps();

    const letter = button.dataset.letter;
    const matchingApp = [...drawerGrid.querySelectorAll(".drawer-app")]
      .find(app => app.querySelector(".app-name")
        .textContent.toUpperCase().startsWith(letter));

    if (matchingApp) {
      matchingApp.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
});


// ESCAPE KEY
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeDrawer();
  }
});


// INITIAL DRAWER CONTENT
displayApps();
    
