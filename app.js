// ======================================================
// SteigleiterCheck v0.2
// app.js (fixed)
// ======================================================

const cards = document.getElementById("cards");
const search = document.getElementById("search");
const template = document.getElementById("leiter-template");

let leitern = [];

// -------------------------------
// Daten laden
// -------------------------------

async function ladeLeitern() {
    try {
        const response = await fetch("data/leitern.json");
        if (!response.ok) throw new Error("Netzwerkfehler beim Laden der Daten");
        leitern = await response.json();
        renderLeitern(leitern);
    } catch (error) {
        console.error(error);
        cards.innerHTML = `
        <div class="leiter-card">
            <div class="content">
                <h2>Fehler</h2>
                <p>Leiterdaten konnten nicht geladen werden.</p>
            </div>
        </div>
        `;
    }
}

// -------------------------------
// Karten zeichnen
// -------------------------------

function renderLeitern(daten) {
    cards.innerHTML = "";

    daten.forEach(leiter => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".nummer").textContent = leiter.nummer || "–";
        clone.querySelector(".kunde").textContent = leiter.kunde || "–";
        clone.querySelector(".standort").textContent = leiter.standort || "–";
        clone.querySelector(".hersteller").textContent = "🏭 " + (leiter.hersteller || "–");
        clone.querySelector(".baujahr").textContent = "📅 " + (leiter.baujahr || "–");
        clone.querySelector(".hoehe").textContent = "📏 " + (leiter.hoehe || "–");
        clone.querySelector(".sprossen").textContent = "🪜 " + ((leiter.sprossen !== undefined) ? leiter.sprossen + " Sprossen" : "–");

        const status = clone.querySelector(".status");
        // Remove previous status classes (in case template re-used)
        status.classList.remove("yellow", "red", "green");

        switch ((leiter.status || "").toLowerCase()) {
            case "gelb":
                status.classList.add("yellow");
                break;
            case "rot":
                status.classList.add("red");
                break;
            case "gruen":
            case "grün":
            case "green":
                status.classList.add("green");
                break;
            default:
                // no status class
                break;
        }

        const card = clone.querySelector(".leiter-card");
        if (card) {
            card.addEventListener("click", () => {
                // später Detailseite
                alert(
                    "Steigleiter " +
                    (leiter.nummer || "") +
                    "\n\nDiese Seite bauen wir als Nächstes."
                );
            });
            cards.appendChild(clone);
        }
    });
}

// -------------------------------
// Suche
// -------------------------------

search.addEventListener("input", () => {
    const text = (search.value || "").toLowerCase();

    const gefiltert = leitern.filter(leiter => {
        const nummer = (leiter.nummer || "").toLowerCase();
        const kunde = (leiter.kunde || "").toLowerCase();
        const standort = (leiter.standort || "").toLowerCase();
        const hersteller = (leiter.hersteller || "").toLowerCase();

        return (
            nummer.includes(text) ||
            kunde.includes(text) ||
            standort.includes(text) ||
            hersteller.includes(text)
        );
    });

    renderLeitern(gefiltert);
});

// -------------------------------

ladeLeitern();
