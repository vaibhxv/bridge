import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Params = () => {
    const [params, setParams] = useState(null);
    const location = useLocation();
    const data = location.state;
    const token = data.token;
    const chain = data.chain;
    const dsttoken = data.dsttoken;
    const dstchain = data.dstchain;
    const qty = data.quantity;
    // 1000000000000000000

    useEffect(() => {
        const fetchParams = async () => {
            try {
                const response = await axios.post('https://bridge-5kh7.onrender.com/params', {
                    headers: {},
                    token: token,
                    chain: chain,
                    dsttoken: dsttoken,
                    dstchain: dstchain,
                    qty: qty,
                });
                setParams(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching params:', error);
            }
        };

        fetchParams();
    }, [token, chain]);

    return (
        <div>
            <h1>Transaction Parameters</h1>
            {params && (
                <div>
                    <p>Please check Console for parameters as they were not specified.</p>
                    {/* Display other parameters as needed */}
                </div>
            )}
        </div>
    );
};

export default Params;
