import express from 'express';
import cors from 'cors';
import path from 'path';
import TCGdex from '@tcgdex/sdk';

const app = express();
const port = 3000;

// Initialize English SDK
const tcgdexEn = new TCGdex('en');

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint to fetch card details by ID and optional language
app.get('/api/card/:id', async (req, res) => {
    const cardId = req.params.id;
    const lang = req.query.lang as string || 'en';

    try {
        console.log(`Fetching card with ID: ${cardId} in language: ${lang}`);
        
        let card: any;

        // Fetch card details
        card = await tcgdexEn.fetchCard(cardId);
        
        

        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }

        console.log('Card fetched:', card);
        console.log('Card pricing info:', card.pricing);
        console.log('Card market price (EUR):', card.pricing.cardmarket.avg30);
        console.log('Card TCGPlayer pricing info:', card.pricing.tcgplayer);

        // Access pricing info
        const pricing = {
            eur: card.pricing.cardmarket.avg30,
            usd: card.pricing.tcgplayer ? {
                holo: card.pricing.tcgplayer.holo.marketPrice,
                normalLow: card.pricing.tcgplayer.normal.lowPrice,
            } : null
        };

        res.json({ card, pricing });
    } catch (error) {
        console.error('Error fetching card:', error);
        res.status(500).json({ error: 'Internal server error while fetching card' });
    }
});

// Search endpoint
app.get('/api/search', async (req, res) => {
    const name = req.query.name as string;
    const lang = req.query.lang as string || 'en';

    try {
        if (!name) return res.status(400).json({ error: 'Name query parameter is required' });
        console.log(`Searching cards with name: ${name} in language: ${lang}`);

        let filtered: any[] = [];
        const cards = await tcgdexEn.fetchCards();
        filtered = cards?.filter((c: any) => c.name.toLowerCase().includes(name.toLowerCase())) || [];

        res.json(filtered.slice(0, 20));
    } catch (error) {
        console.error('Error searching cards:', error);
        res.status(500).json({ error: 'Internal server error while searching' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
