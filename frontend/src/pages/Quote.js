import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Quote = () => {
    const [quote, setQuote] = useState(null);
    const history = useNavigate();
    const location = useLocation();
    const data = location.state;
    const token = data.token;
    const chain = data.chain;
    const dsttoken = data.dsttoken;
    const dstchain = data.dstchain;
    const qty = data.quantity;
    console.log(qty);
   
    
    

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.post('https://bridge-5kh7.onrender.com/quotes', {
                    headers: {},
                    token: token,
                    chain: chain,
                    dsttoken: dsttoken,
                    dstchain: dstchain,
                    qty: qty,
                });
                setQuote(response.data.routes[0]);
                console.log(response.data.routes[0]);
            } catch (error) {
                console.error('Error fetching quote:', error);
            }
        };

        fetchQuote();
    }, [token, chain]);

    const handleBridge = () => {
        const data = {token: token, chain: chain, dsttoken: dsttoken, dstchain: dstchain, quantity: qty}
        history('/params', { state: data});
    };

    return (
        <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold text-white bg-slate-500 py-2 px-4 rounded-md text-center">Quote</h1>
    <div className="bg-slate-200 p-4 rounded-md shadow-md mt-4 flex justify-center items-center">
        {quote && (
            <div className="text-center">
                <p className="text-lg font-semibold mb-4">Source Quote Token Value: ${quote.srcQuoteTokenUsdValue}</p>
                <p className="text-lg font-semibold mb-4">Destination Quote Token Value: ${quote.dstQuoteTokenUsdValue}</p>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleBridge}
                >
                    Bridge
                </button>
            </div>
        )}
    </div>
</div>

    );
};

export default Quote;
