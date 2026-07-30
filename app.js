// ======================================================
// SteigleiterCheck v0.2
// app.js
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

        clone.querySelector(".nummer").textContent =
            leiter.nummer;

        clone.querySelector(".kunde").textContent =
            leiter.kunde;

        clone.querySelector(".standort").textContent =
            leiter.standort;

        clone.querySelector(".hersteller").textContent =
            "🏭 " + leiter.hersteller;

        clone.querySelector(".baujahr").textContent =
            "📅 " + leiter.baujahr;

        clone.querySelector(".hoehe").textContent =
            "📏 " + leiter.hoehe;

        clone.querySelector(".sprossen").textContent =
            "🪜 " + leiter.sprossen + " Sprossen";

        const status = clone.querySelector(".status");

        switch (leiter.status) {

            case "gelb":
                status.classList.add("yellow");
                break;

            case "rot":
                status.classList.add("red");
                break;

            default:
                break;

        }

        clone.querySelector(".leiter-card")
            .addEventListener("click", () => {

                // später Detailseite

                alert(
                    "Steigleiter " +
                    leiter.nummer +
                    "\n\nDiese Seite bauen wir als Nächstes."
                );

            });

        cards.appendChild(clone);

    });

}

// -------------------------------
// Suche
// -------------------------------

search.addEventListener("input", () => {

    const text =
        search.value.toLowerCase();

    const gefiltert =
        leitern.filter(leiter =>

            leiter.nummer.toLowerCase().includes(text)

            ||

            leiter.kunde.toLowerCase().includes(text)

            ||

            leiter.standort.toLowerCase().includes(text)

            ||

            leiter.hersteller.toLowerCase().includes(text)

        );

    renderLeitern(gefiltert);

});

// -------------------------------

ladeLeitern();fetch('data/leitern.json').then(r=>r.json()).then(d=>{const l=document.getElementById('list');const s=document.getElementById('search');const draw=f=>{l.innerHTML='';d.filter(x=>JSON.stringify(x).toLowerCase().includes((f||'').toLowerCase())).forEach(x=>{let c=document.createElement('div');c.className='card';c.innerHTML='<b>'+x.nummer+'</b><br>'+x.kunde+'<br>'+x.standort+'<br>'+x.hersteller;l.appendChild(c);});};draw('');s.oninput=e=>draw(e.target.value);});
