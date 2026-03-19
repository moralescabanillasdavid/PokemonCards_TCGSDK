const searchBtn = document.getElementById('searchBtn');
const cardIdInput = document.getElementById('cardId');
const resultContainer = document.getElementById('result');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('errorMessage');

// Language toggle
const btnEn = document.getElementById('btnEn');
const btnJa = document.getElementById('btnJa');
let currentLang = 'en';

btnEn.addEventListener('click', () => setLanguage('en'));
btnJa.addEventListener('click', () => setLanguage('ja'));

function setLanguage(lang) {
    currentLang = lang;
    btnEn.classList.toggle('active', lang === 'en');
    btnJa.classList.toggle('active', lang === 'ja');
    const id = cardIdInput.value.trim();
    if (id) fetchCard(id);
}

// Elements to update
const cardImage = document.getElementById('cardImage');
const cardName = document.getElementById('cardName');
const cardType = document.getElementById('cardType');
const cardHP = document.getElementById('cardHP');
const cardDescription = document.getElementById('cardDescription');
const attacksList = document.getElementById('attacksList');
const cardSet = document.getElementById('cardSet');
const cardRarity = document.getElementById('cardRarity');

// Price elements
const cardPriceEUR = document.getElementById('cardPriceEUR');
const cardPriceUSD = document.getElementById('cardPriceUSD');

searchBtn.addEventListener('click', () => {
    const id = cardIdInput.value.trim();
    if (id) {
        fetchCard(id);
    }
});

cardIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const id = cardIdInput.value.trim();
        if (id) {
            fetchCard(id);
        }
    }
});

async function fetchCard(id) {
    // UI states
    showLoader();
    resultContainer.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        const response = await fetch(`/api/card/${id}?lang=${currentLang}`);
        if (!response.ok) {
            throw new Error('Card not found');
        }

        const card = await response.json();
        updateUI(card);
    } catch (error) {
        console.error('Error:', error);
        showError();
    } finally {
        hideLoader();
    }
}

function updateUI(card) {
    // Basic info
    cardImage.src = `${card.card.image}/high.webp`;
    cardImage.alt = card.card.name;
    cardName.textContent = card.card.name;
    cardType.textContent = card.card.types ? card.card.types.join(', ') : 'Unknown';
    cardHP.textContent = card.card.hp ? `HP ${card.card.hp}` : 'HP -';
    cardDescription.textContent = card.card.description || 'No description available for this card.';
    
    // Attacks
    attacksList.innerHTML = '';
    if (card.card.attacks && card.card.attacks.length > 0) {
        card.card.attacks.forEach(atk => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="atk-top">
                    <span>${atk.name}</span>
                    <span>${atk.damage || ''}</span>
                </div>
                ${atk.effect ? `<div class="atk-desc">${atk.effect}</div>` : ''}
            `;
            attacksList.appendChild(li);
        });
    } else {
        attacksList.innerHTML = '<li>No attacks listed.</li>';
    }

    // Set & Rarity
    cardSet.textContent = card.card.set.name;
    cardRarity.textContent = card.card.rarity || 'Common';

    // Prices
    const pricing = card.pricing; // Assuming pricing is inside the card object
    if (pricing) {
        cardPriceEUR.textContent = `€${pricing.eur ? pricing.eur : '0.00'}`;
        cardPriceUSD.textContent = `$${pricing.usd ? pricing.usd.holo : '0.00'}`;
    }

    resultContainer.classList.remove('hidden');
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showError() {
    errorMessage.classList.remove('hidden');
}

// Initial fetch
fetchCard('sv05-020');
