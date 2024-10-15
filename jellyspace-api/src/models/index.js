// models/index.js
const Bid = require('./bid');
const Project = require('./project');

// Define relationships
Project.hasMany(Bid, { foreignKey: 'projectId', as: 'bids' }); // Adding alias 'bids'
Bid.belongsTo(Project, { foreignKey: 'projectId' });


module.exports = { Bid, Project };