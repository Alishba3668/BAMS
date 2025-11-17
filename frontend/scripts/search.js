const api = "http://192.168.137.1:5000";   // ✔ YOUR BACKEND URL

document.getElementById("searchBtn").addEventListener("click", performSearch);

async function performSearch() {
    const type = document.getElementById("filterType").value;
    const keyword = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("results");

    if (!keyword) {
        resultsDiv.innerHTML = "<p>Please enter something to search.</p>";
        return;
    }

    let url = "";

    if (type === "dept") url = `${api}/search/dept/${keyword}`;
    if (type === "class") url = `${api}/search/class/${keyword}`;
    if (type === "student") url = `${api}/search/student/${keyword}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data || data.length === 0) {
            resultsDiv.innerHTML = "<p>No results found.</p>";
            return;
        }

        resultsDiv.innerHTML = `
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;

    } catch (err) {
        resultsDiv.innerHTML = "<p>Error fetching results.</p>";
        console.error(err);
    }
}
