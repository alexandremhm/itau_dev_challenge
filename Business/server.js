const { app } = require('./app');

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server open on ${PORT} PORT`));
