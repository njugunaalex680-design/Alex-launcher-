
// ALEX LAUNCHER

// CLOCK AND DATE
function updateClock() {
  const now = new Date();

  const clock = document.getElementById("clock");
  const date = document.getElementById("date");
  const statusTime = document.getElementById("status-time");

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (clock) clock.textContent = time;
  if (statusTime) statusTime.textContent = time;

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


// APP DRAWER
const drawer = document.getElementById("app-drawer");
const drawerGrid = document.getElementById("drawer-grid");
const drawerSearch = document.getElementById("drawer-search");
const drawerClose = document.getElementById("drawer-close");
const drawerHeading = document.getElementById("drawer-heading");

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

function displayApps() {
  if (!drawerGrid) return;

  const searchText = drawerSearch
    ? drawerSearch.value.toLowerCase().trim()
    : "";

  const filtered = apps
    .filter(app =>
      (activeCategory === "All" || app.category === activeCategory) &&
      app.name.toLowerCase().includes(searchText)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  drawerGrid.innerHTML = "";

  if (drawerHeading) {
    drawerHeading.textContent =
      activeCategory === "All" ? "All Applications" : activeCategory + " Apps";
  }

  if (filtered.length === 0) {
    drawerGrid.innerHTML =
      '<p class="drawer-empty">No apps found</p>';
    return;
  }

  filtered.forEach(app => {
    const button = document.createElement("button");
    button.className = "drawer-app";

    const icon = document.createElement("span");
    icon.className = "app-icon";
    icon.textContent = app.icon;

    const name = document.createElement("span");
    name.className = "app-name";
    name.textContent = app.name;

    button.append(icon, name);
    drawerGrid.appendChild(button);
  });
}


// OPEN DRAWER
function openDrawer() {
  if (!drawer) {
    console.error("App drawer element not found!");
    return;
  }

  drawer.classList.add("active");
  displayApps();

  if (drawerSearch) {
    drawerSearch.value = "";
  }
}


// CLOSE DRAWER
function closeDrawer() {
  if (drawer) drawer.classList.remove("active");
}

if (drawerClose) {
  drawerClose.addEventListener("click", closeDrawer);
}


// APPS WHEEL - DIRECT CONNECTION
const wheelItems = document.querySelectorAll(".wheel-item");

wheelItems.forEach(item => {
  const label = item.querySelector("p");

  if (label && label.textContent.trim() === "Apps") {
    item.style.cursor = "pointer";
    item.addEventListener("click", openDrawer);
  }
});


// BOTTOM DOCK
const openAppsButton = document.getElementById("open-apps");

if (openAppsButton) {
  openAppsButton.style.cursor = "pointer";
  openAppsButton.addEventListener("click", openDrawer);
}


// SEARCH
if (drawerSearch) {
  drawerSearch.addEventListener("input", displayApps);
}


// CATEGORIES
document.querySelectorAll(".drawer-categories button")
  .forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      document.querySelectorAll(".drawer-categories button")
        .forEach(item => item.classList.remove("selected"));

      button.classList.add("selected");
      displayApps();
    });
  });


// ALPHABET NAVIGATION
document.querySelectorAll(".drawer-alphabet button")
  .forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = "All";

      document.querySelectorAll(".drawer-categories button")
        .forEach(item => {
          item.classList.toggle(
            "selected",
            item.dataset.category === "All"
          );
        });

      if (drawerSearch) drawerSearch.value = "";

      displayApps();

      const letter = button.dataset.letter;

      const matchingApp = [...drawerGrid.querySelectorAll(".drawer-app")]
        .find(item =>
          item.querySelector(".app-name")
            .textContent.toUpperCase().startsWith(letter)
        );

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
  if (event.key === "Escape") closeDrawer();
});

displayApps();
   
