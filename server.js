const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const logger = require('./middleware/logger');
const { handleErrors, notFound } = require('./middleware/errorMiddleware');

app.use(express.json());
app.use(logger);

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
