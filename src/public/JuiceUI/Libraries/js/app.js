let currentDisplayMode = "dark";

const updateDisplayModeIcons = () => {
    document.querySelectorAll(".display-mode-icon").forEach((el) => {
        if (currentDisplayMode == "dark") {
            el.innerHTML = `<i class="fas fa-moon"></i>`;
        } else if (currentDisplayMode == "moonlight") {
            el.innerHTML = `<i class="fas fa-sun"></i>`;
        } else {
            el.innerHTML = `<i class="fas fa-adjust"></i>`;
        }
    });
};

const toggleDisplayMode = () => {
    if (currentDisplayMode == "dark") {
        window.localStorage.setItem("displayMode", "moonlight");
        currentDisplayMode = "moonlight";
        document.getElementById("themekit-css").href = "./Libraries/sass/themekit/main-moonlight.css";
    } else if (currentDisplayMode == "moonlight") {
        window.localStorage.setItem("displayMode", "light");
        currentDisplayMode = "light";
        document.getElementById("themekit-css").href = "./Libraries/sass/themekit/main-light.css";
    } else {
        window.localStorage.setItem("displayMode", "dark");
        currentDisplayMode = "dark";
        document.getElementById("themekit-css").href = "./Libraries/sass/themekit/main-dark.css";
    }
    updateDisplayModeIcons();
};

window.addEventListener("DOMContentLoaded", (evt) => {
    if (window.localStorage.getItem("displayMode") == null) {
        // Match with system dark mode
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            window.localStorage.setItem("displayMode", "dark");
        }
        // Match with system light mode
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            window.localStorage.setItem("displayMode", "light");
        }
        // Literally choose the middle option 
        else {
            window.localStorage.setItem("displayMode", "moonlight");
        }
    }

    currentDisplayMode = window.localStorage.getItem("displayMode");

    if (currentDisplayMode == "dark") {
        document.getElementById("themekit-css").href = "./Libraries/sass/themekit/main-dark.css";
    } else if (currentDisplayMode == "moonlight") {
        document.getElementById("themekit-css").href = "./Libraries/sass/themekit/main-moonlight.css";
    } else {
        document.getElementById("themekit-css").href = "./Libraries/sass/themekit/main-light.css";
    }

    updateDisplayModeIcons();
});