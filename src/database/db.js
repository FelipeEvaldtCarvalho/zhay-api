const knexfile = require("../../knexfile.js");
const knex = require("knex")(knexfile);
const { attachPaginate } = require("knex-paginate");
attachPaginate();

module.exports = knex;
