import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quote from './pages/Quote';
import Params from './pages/Params';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/params" element={<Params />} />
            </Routes>
        </Router>
    );
};

export default App;
