const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tokenRoutes = require('./routes/tokenRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const paramRoutes = require('./routes/paramRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/tokens', tokenRoutes);
app.use('/quotes', quoteRoutes);
app.use('/params', paramRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
