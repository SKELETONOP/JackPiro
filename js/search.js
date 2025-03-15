document.addEventListener("DOMContentLoaded", function () {
    function setupSearch(inputId, buttonId, resultsId) {
        const searchInput = document.getElementById(inputId);
        const searchButton = document.getElementById(buttonId);
        const searchResults = document.getElementById(resultsId);

        if (!searchInput || !searchButton || !searchResults) return;

        // Show/hide search bar on button click (for mobile)
        searchButton.addEventListener("click", function () {
            searchInput.classList.toggle("active");
            if (searchInput.classList.contains("active")) {
                searchInput.focus();
            }
            const query = searchInput.value.trim();
            if (query) {
                searchPageContent(query);
            }
        });

        // Trigger search on typing (Fix for mobile)
        searchInput.addEventListener("input", function () {
            let query = this.value.trim();
            searchPageContent(query);
        });

        // Trigger search on pressing Enter
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevents page refresh
                searchButton.click();
            }
        });

        // Function to search within the entire HTML page
        function searchPageContent(query) {
            searchResults.innerHTML = ""; // Clear previous results

            if (query.length === 0) {
                searchResults.style.display = "none";
                return;
            }

            let matches = [];
            let elements = document.querySelectorAll("h1, h2, h3, p, li");

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
                    
                    // Click event: Scroll to selected result & highlight
                    div.addEventListener("click", function () {
                        searchInput.value = match.text; // Autofill search bar
                        searchResults.style.display = "none"; // Hide results after selection
                        match.element.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the result
                        match.element.style.backgroundColor = "yellow"; // Temporary highlight
                        setTimeout(() => match.element.style.backgroundColor = "", 2000); // Remove highlight after 2s
                    });

                    searchResults.appendChild(div);
                });
            } else {
                searchResults.style.display = "none"; // Hide if no results
            }
        }
    }

    // Setup search for both desktop and mobile
    setupSearch("search-bar", "search-btn", "search-results");   // Desktop
    setupSearch("mean-search-bar", "mean-search-btn", "mean-search-results"); // Mobile
});

// Hide results when clicking outside
document.addEventListener("click", function(event) {
    if (!event.target.closest(".search-container, .mean-bar")) {
        document.getElementById("search-results")?.style.display = "none";
        document.getElementById("mean-search-results")?.style.display = "none";
    }
});
