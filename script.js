
document.addEventListener("DOMContentLoaded", () => {
  const settingsHome = document.getElementById("settings-home");
  const pages = document.querySelectorAll(".settings-page");

  // SETTINGS PAGE NAVIGATION
  document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      settingsHome.style.display = "none";

      pages.forEach(page => page.classList.remove("active"));

      const selectedPage = document.getElementById(
        "page-" + button.dataset.page
      );

      if (selectedPage) selectedPage.classList.add("active");
    });
  });

  document.querySelectorAll(".settings-back").forEach(button => {
    button.addEventListener("click", () => {
      pages.forEach(page => page.classList.remove("active"));
      settingsHome.style.display = "block";
    });
  });

  // CLOSE SETTINGS
  document.getElementById("settings-close")?.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  // FONT SELECTION
  const fonts = [
    "Roboto", "Poppins", "Montserrat", "Open Sans", "Lato",
    "Nunito", "Ubuntu", "Raleway", "Playfair Display",
    "Merriweather", "Oswald", "Bebas Neue", "Quicksand",
    "Dancing Script", "Pacifico", "Orbitron", "Space Grotesk",
    "Comfortaa", "Josefin Sans", "Cinzel"
  ];

  const fontGrid = document.getElementById("font-grid");

  fonts.forEach(font => {
    const button = document.createElement("button");
    button.className = "font-option";
    button.textContent = font;
    button.style.fontFamily = `"${font}", sans-serif`;

    button.addEventListener("click", () => {
      document.body.style.fontFamily = `"${font}", sans-serif`;
      localStorage.setItem("alex-font", font);

      document.querySelectorAll(".font-option").forEach(item => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");
    });

    fontGrid.appendChild(button);
  });

  const savedFont = localStorage.getItem("alex-font");

  if (savedFont) {
    document.body.style.fontFamily = `"${savedFont}", sans-serif`;

    document.querySelectorAll(".font-option").forEach(button => {
      if (button.textContent === savedFont) {
        button.classList.add("selected");
      }
    });
  }

  // FONT SIZE
  const fontSize = document.getElementById("font-size");
  const fontSizeValue = document.getElementById("font-size-value");

  function applyFontSize(value) {
    document.documentElement.style.setProperty("--launcher-font-size", value + "px");
    fontSizeValue.textContent = value + "px";
    localStorage.setItem("alex-font-size", value);
  }

  fontSize.addEventListener("input", () => {
    applyFontSize(fontSize.value);
  });

  const savedFontSize = localStorage.getItem("alex-font-size");
  if (savedFontSize) {
    fontSize.value = savedFontSize;
    applyFontSize(savedFontSize);
  }

  // THEME SELECTION
  document.querySelectorAll(".theme-option").forEach(button => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;

      document.documentElement.dataset.theme = theme;
      localStorage.setItem("alex-theme", theme);

      document.querySelectorAll(".theme-option").forEach(item => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");
    });
  });

  const savedTheme = localStorage.getItem("alex-theme");

  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;

    document.querySelectorAll(".theme-option").forEach(button => {
      if (button.dataset.theme === savedTheme) {
        button.classList.add("selected");
      }
    });
  }

  // SAVE SELECT AND RANGE SETTINGS
  const settingIds = [
    "home-icon-size",
    "wheel-size",
    "dock-count",
    "drawer-layout",
    "drawer-columns",
    "drawer-icon-size",
    "search-style",
    "animation-speed"
  ];

  settingIds.forEach(id => {
    const control = document.getElementById(id);
    if (!control) return;

    const key = "alex-setting-" + id;
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) control.value = savedValue;

    control.addEventListener("input", () => {
      localStorage.setItem(key, control.value);
    });

    control.addEventListener("change", () => {
      localStorage.setItem(key, control.value);
    });
  });

  // WALLPAPER PREVIEW AND SAVE
  const wallpaperInput = document.getElementById("wallpaper-upload");

  wallpaperInput?.addEventListener("change", () => {
    const file = wallpaperInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("Choose an image smaller than 3 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      localStorage.setItem("alex-wallpaper", event.target.result);
      document.body.style.backgroundImage =
        `url("${event.target.result}")`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    };

    reader.readAsDataURL(file);
  });

  const savedWallpaper = localStorage.getItem("alex-wallpaper");

  if (savedWallpaper) {
    document.body.style.backgroundImage = `url("${savedWallpaper}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }

  // BASIC PIN SETUP DEMO
  // This is not a secure screen lock. Native Android security
  // will be needed before using a PIN to protect the launcher.
  const savePinButton = document.getElementById("save-launcher-pin");

  savePinButton?.addEventListener("click", async () => {
    const pin = document.getElementById("launcher-pin").value;
    const confirmPin = document.getElementById("launcher-pin-confirm").value;
    const status = document.getElementById("pin-status");

    if (!/^\d{4,6}$/.test(pin)) {
      status.textContent = "Enter a PIN with 4 to 6 digits.";
      return;
    }

    if (pin !== confirmPin) {
      status.textContent = "The PINs do not match.";
      return;
    }

    status.textContent =
      "PIN setup preview only. Secure Android lock is not connected yet.";

    document.getElementById("launcher-pin").value = "";
    document.getElementById("launcher-pin-confirm").value = "";
  });

});
    
