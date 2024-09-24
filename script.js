// Theme switching functionality
const modeSwitch = document.getElementById("modeSwitch");
const body = document.body;
const headers = document.querySelectorAll("h1, h2");
const containers = document.querySelectorAll(".container");
const navbar = document.querySelector(".navbar");
const footer = document.querySelector(".footer");
const storyLinks = document.querySelectorAll(".story-link");
const header = document.querySelector("header");

modeSwitch.addEventListener("change", function () {
    body.classList.toggle("dark");
    headers.forEach((header) => header.classList.toggle("dark"));
    containers.forEach((container) => container.classList.toggle("dark"));
    navbar.classList.toggle("dark");
    footer.classList.toggle("dark");
    storyLinks.forEach((link) => link.classList.toggle("dark"));
    header.classList.toggle("dark");
});

// Section switching functionality
const links = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll(".container");

// Show the default section (home) on initial load
sections.forEach((section) => {
    section.style.display = section.id === "home" ? "block" : "none";
});

// Handle navbar link clicks for section switching
links.forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const targetId = this.getAttribute("href").substring(1);

        sections.forEach((section) => {
            section.style.display = section.id === targetId ? "block" : "none";
        });

        // Clear story content when switching sections
        if (targetId !== "stories") {
            const storyContent = document.getElementById("story-content");
            storyContent.innerHTML = ''; // Clear previous story content
            storyContent.style.display = 'none'; // Hide story content div
        }
    });
});

// Story navigation from stories section
document.addEventListener("DOMContentLoaded", function () {
    const storyLinks = document.querySelectorAll(".story-link");
    const storyContent = document.getElementById("story-content");

    storyLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const file = link.getAttribute("data-file");

            fetch(`stories/${file}`) // Fetch the story file from the stories directory
                .then(response => {
                    if (!response.ok) { // Check if the response is not ok
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    console.log("AAAAAAAAAAAA")
                    return response.text();
                })
                .then(data => {
                    console.log("BBBBBBBBBBBBBB", data)
                    storyContent.innerHTML = data; // Set the story content
                    storyContent.style.display = 'block'; // Show story content
                })
                .catch(error => console.error("Error loading story:", error));
        });
    });
});
