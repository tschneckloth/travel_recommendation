let locations;

let baseUrl;

if (window.location.hostname === "localhost") {
    baseUrl = "http://localhost:8080";
} else {
    baseUrl = "https://tschneckloth.github.io/travel_recommendation";
}

document.addEventListener("DOMContentLoaded", (e) => {
    const jsonUrl = `${baseUrl}/assets/json/travel_recommendation_api.json`;

    fetch(jsonUrl)
        .then((response) => response.json())
        .then((data) => {
            locations = [
                ...data.countries.flatMap((country) =>
                    country.cities.map((loc) => ({
                        name: loc.name,
                        details: loc,
                        keywords: ["country", "countries", loc.name.toLowerCase()],
                    }))
                ),
                ...data.temples.map((loc) => ({
                    name: loc.name,
                    details: loc,
                    keywords: ["temple", "temples", loc.name.toLowerCase()],
                })),
                ...data.beaches.map((loc) => ({
                    name: loc.name,
                    details: loc,
                    keywords: ["beach", "beaches", loc.name.toLowerCase()],
                })),
            ];
        });

    const btnSearch = document.getElementById("btnSearch");
    btnSearch.addEventListener("click", (e) => {
        e.preventDefault();

        const searchValue = document.getElementById("search").value;

        if (searchValue == "") {
            alert("Please enter a destination or keyword");
            return;
        }

        const results = getMatches(searchValue);

        displayMatches(results);
    });

    const btnClear = document.getElementById("btnClear");
    btnClear.addEventListener("click", (e) => {
        e.preventDefault();
        clearSearchInput();
        clearResults();
    });
});

function getMatches(searchValue) {
    const pattern = new RegExp(searchValue, "i");
    return locations.filter((loc) => loc.keywords.some((keyword) => pattern.test(keyword)));
}

function genDestinationHtml({ name, imageUrl, description, timezone }) {
    const destination = document.createElement("div");
    destination.className = "col overlay";

    const img = document.createElement("img");
    img.src = `${baseUrl}/assets/img/${imageUrl}`;
    img.alt = name;
    img.className = "img-fluid rounded";

    const destName = document.createElement("div");
    destName.innerText = name;
    destName.className = "my-2 bold";

    const destDesc = document.createElement("div");
    destDesc.innerText = description;
    destDesc.className = "my-2";

    const curTime = getCountryDate(name, timezone).toString();
    const destTime = document.createElement("div");
    destTime.id = "destTime";
    destTime.innerText = `Approximate time: ${curTime}`;
    destTime.className = "my-2";

    const visitBtn = document.createElement("button");
    visitBtn.innerText = "Visit";
    visitBtn.className = "rounded w-25";

    destination.appendChild(img);
    destination.appendChild(destName);
    destination.appendChild(destDesc);
    destination.appendChild(destTime);
    destination.appendChild(visitBtn);

    return destination;
}

function displayMatches(results) {
    const destinations = document.getElementById("destinations");

    clearResults();

    if (results.length < 1) {
        alert("Oops! Nothing matching your search was found");
    }

    results.forEach((result) => {
        const dest = genDestinationHtml(result.details);
        destinations.appendChild(dest);
    });
}

function getCountryDate(country, timezone) {
    const options = { timeZone: timezone, hour12: true, hour: "numeric", minute: "numeric" };
    return new Date().toLocaleTimeString("en-US", options);
}

function clearSearchInput() {
    const search = document.getElementById("search");
    search.value = "";
    search.focus();
}

const clearResults = () => {
    const destinations = document.getElementById("destinations");
    destinations.innerText = "";
};
