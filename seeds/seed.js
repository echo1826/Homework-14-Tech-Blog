const sequelize = require('../config/connection');
const seedPost=  require('./post-seed');

async function seedAll() {
    await sequelize.sync({
        force: true
    });
    await seedPost();
    process.exit(0);
}

seedAll();