const axios = require('axios');

const getChains = async (req, res) => {
    try {
        const response = await axios.get('https://aggregator-api.xy.finance/v1/supportedChains');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tokens' });
    }
};

const getTokens = async (req, res) => {
    try {
        const {chainID} = req.body;
        console.log(chainID);
        const response = await axios.get(`https://aggregator-api.xy.finance/v1/recommendedTokens`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tokens' });
    }
};

module.exports = { getTokens, getChains };
