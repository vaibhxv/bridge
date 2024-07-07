import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button"

  
const Home = () => {
    const [tokens, setTokens] = useState([]);
    const [chains, setChains] = useState([]);
    const [dsttokens, setdstTokens] = useState([]);
    const [dstchains, setdstChains] = useState([]);
    const [selectedToken, setSelectedToken] = useState('');
    const [tokenId, setTokenId] = useState(1);
    const [address, setAddress] = useState('');
    const [selectedChain, setSelectedChain] = useState('');

    const [selecteddstToken, setSelecteddstToken] = useState('');
    const [selecteddstChain, setSelecteddstChain] = useState('');
    const [dstaddress, setdstAddress] = useState('');
    const [qty, setQty] = useState('');
    const history = useNavigate();

    useEffect(() => {
        const fetchChains = async () => {
            try {
                const response = await axios.get('http://localhost:8080/tokens');
                setChains(response.data.supportedChains);
                setdstChains(response.data.supportedChains);
                fetchTokens(tokenId);
            } catch (error) {
                console.error('Error fetching chains:', error);
            }
        };
        
       

        fetchChains();
    }, []);

    const fetchTokens = async (tokenId) => {
        try {
            const response = await axios.get(`https://aggregator-api.xy.finance/v1/recommendedTokens?chainId=${tokenId}`);
            setTokens(response.data.recommendedTokens);
            
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    }
    const fetchdstTokens = async (tokenId) => {
        try {
            const response = await axios.get(`https://aggregator-api.xy.finance/v1/recommendedTokens?chainId=${tokenId}`);
            setdstTokens(response.data.recommendedTokens);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    }

    const onChangedstValue = async(e) => {
        fetchdstTokens(e.target.value);
    }

    const onChangeddstToken = async(e) => {
        setdstAddress(e.target.value);
    }

    const onChangeValue = async (e) => {
       setTokenId(e.target.value);
       // console.log(e.target.value);
        fetchTokens(e.target.value);
    }
    const onChangeToken = async(e) => {
        setAddress(e.target.value);

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {token: address, chain: selectedChain, dsttoken: dstaddress, dstchain: selecteddstChain, quantity: qty}
        history('/quote', { state: data });
       console.log(data);
        
        
    };
    
    return (
        <div className="container mx-auto px-4 py-8"> 
            <h1 className='text-2xl font-bold mb-4'>Select Token and Chain</h1>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="token">
                Select Source Token
                    </label>
                
                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)} onChangeCapture={onChangeToken}>
                    {tokens.map((token) => (
                        <option key={token.id} value={token.address}>
                            {token.name}
                            
                        
                        </option>
                    ))} 
                </select>
                </div>
                <div className='mb-4'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chain">
                Select Source Chain
                     </label>
               
                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={selectedChain} onChange={(e) => setSelectedChain(e.target.value)} onChangeCapture={onChangeValue}>
                    
                        {chains.map((token) => (
                            
                        <option key={token.id} value={token.chainId}>
                           
                            {token.name}
                    
                        </option>
                    ))}
                </select>
                </div>
                <div className='mb-4'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chain">
                Input quantity
                     </label>
               <input value={qty} onChange={(e)=>{setQty(e.target.value)}} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
                </div>
                <div className='mb-4'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="token">
                Select Destination Token
                    </label>
                
                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={selecteddstToken} onChange={(e) => setSelecteddstToken(e.target.value)} onChangeCapture={onChangeddstToken}>
                    {dsttokens.map((token) => (
                        <option key={token.id} value={token.address}>
                            {token.name}
                            
                        
                        </option>
                    ))} 
                </select>
                </div>
                <div className='mb-4'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chain">
                Select Destination Chain
                     </label>
               
                <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={selecteddstChain} onChange={(e) => setSelecteddstChain(e.target.value)} onChangeCapture={onChangedstValue}>
                    
                        {dstchains.map((token) => (
                            
                        <option key={token.id} value={token.chainId}>
                           
                            {token.name}
                    
                        </option>
                    ))}
                </select>
                </div>
                <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit" variant="outline">Get Quote</Button>
               
            </form>
            
        </div>
    );
};

export default Home;
