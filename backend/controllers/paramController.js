const axios = require('axios');

const getParams = async (req, res) => {
    try{
        const {chain, token, qty, dstchain, dsttoken} = req.body;
        console.log(req.body);
        const response = await axios.get(`https://aggregator-api.xy.finance/v1/buildTx?srcChainId=${chain}&srcQuoteTokenAddress=${token}&srcQuoteTokenAmount=${qty}&dstChainId=${dstchain}&dstQuoteTokenAddress=${dsttoken}&slippage=1&receiver=0xb6EFA1C3679f1943f8aC4Fc9463Cc492435c6C92`);
        res.json(response.data);
    } catch(e) {
        res.status(500).json({ error: 'Error fetching tokens' });
    }
};

module.exports = { getParams };
