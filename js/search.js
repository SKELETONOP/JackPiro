document.getElementById("search-btn").addEventListener("click", function() {
    let searchBar = document.getElementById("search-bar");
    searchBar.classList.toggle("active"); // Toggle class
    if (searchBar.classList.contains("active")) {
        searchBar.focus(); // Auto-focus when opened
    }
});

const searchBar = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");

// Function to search within the entire HTML page
function searchPageContent(query) {
    searchResults.innerHTML = ""; // Clear previous results
    if (query.length === 0) {
        searchResults.style.display = "none";
        return;
    }

    let matches = [];
    let elements = document.querySelectorAll("h1, h2, h3");

    elements.forEach(element => {
        if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
            matches.push({ text: element.textContent.trim(), element: element });
        }
    });

    if (matches.length > 0) {
        searchResults.style.display = "block";
        matches.forEach(match => {
            let div = document.createElement("div");
            div.classList.add("search-result-item");
            div.textContent = match.text;
            div.addEventListener("click", function() {
                searchBar.value = match.text; // Auto-fill search bar
                searchResults.style.display = "none"; // Hide results after selection
                match.element.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the selected result
                match.element.style.backgroundColor = "yellow"; // Temporarily highlight
                setTimeout(() => match.element.style.backgroundColor = "", 2000); // Remove highlight after 2 seconds
            });
            searchResults.appendChild(div);
        });
    } else {
        searchResults.style.display = "none"; // Hide if no results
    }
}

// Listen for typing in the search bar
searchBar.addEventListener("keyup", function(event) {
    let query = this.value.trim();
    searchPageContent(query);
});

// Hide results when clicking outside
document.addEventListener("click", function(event) {
    if (!document.querySelector(".search-container").contains(event.target)) {
        searchResults.style.display = "none";
    }
});
