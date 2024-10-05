const app = require('./app');
const config = require('./config/config');

const PORT = config.development.port || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});