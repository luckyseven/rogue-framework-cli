const config = require('./config/config.js');
const Rogue  = require('rogue-framework');

const app = new Rogue(config);

app.listen(config.main.port, () => {
    console.log(`Rogue Framework is listening on port ${config.main.port}`)
});