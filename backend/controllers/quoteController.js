const axios = require('axios');

const getQuote = async (req, res) => {
    try{
        const {chain, token, qty, dstchain, dsttoken} = req.body;
        console.log(req.body);
        const response = await axios.get(`https://aggregator-api.xy.finance/v1/quote?srcChainId=${chain}&srcQuoteTokenAddress=${token}&srcQuoteTokenAmount=${qty}&dstChainId=${dstchain}&dstQuoteTokenAddress=${dsttoken}&slippage=5`);
        res.json(response.data);
    } catch(e) {
        res.status(500).json({ error: 'Error fetching tokens' });
    }
};

module.exports = { getQuote };
