
// ALEX LAUNCHER

// Live clock
function updateClock() {
  const now = new Date();

  const clock = document.getElementById("clock");
  const date = document.getElementById("date");
  const statusTime = document.getElementById("status-time");

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  if (clock) clock.textContent = time;
  if (statusTime) statusTime.textContent = time;

  if (date) {
    date.textContent = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  }
}

updateClock();
setInterval(updateClock, 1000);

// Application search
const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    document.querySelectorAll(".app, .wheel-item")
      .forEach(item => {
        const name = item.textContent.toLowerCase();

        item.style.display =
          name.includes(query) ? "" : "none";
      });
  });
}

// App wheel interaction
document.querySelectorAll(".wheel-item").forEach(item => {
  item.addEventListener("click", () => {
    const name = item.querySelector("p")?.textContent;

    if (name === "Apps") {
      window.dispatchEvent(
        new CustomEvent("open-app-drawer")
      );
    } else {
      console.log("Selected:", name);
    }
  });
});

console.log("Alex Launcher initialized successfully.");
               
