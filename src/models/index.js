class Model {
  query;

  constructor({
    knex = require("../database/db.js"),
    name = "",
    tableName = "",
    selectableProps = [],
    timeout = 1000,
  }) {
    this.knex = knex;
    this.name = name;
    this.tableName = tableName;
    this.selectableProps = selectableProps;
    this.timeout = timeout;
    this.query = knex(tableName);
  }

  create(props) {
    delete props.id;
    return this.knex.insert(props).into(this.tableName).timeout(this.timeout);
  }

  findAll() {
    return this.knex
      .select(this.selectableProps)
      .from(this.tableName)
      .timeout(this.timeout);
  }

  find(filters) {
    return this.knex
      .select(this.selectableProps)
      .from(this.tableName)
      .where(filters)
      .timeout(this.timeout);
  }

  update(id, props) {
    delete props.id;

    return this.knex
      .update(props)
      .from(this.tableName)
      .where({
        id,
      })
      .timeout(this.timeout);
  }

  destroy(id) {
    return this.knex
      .del()
      .from(this.tableName)
      .where({
        id,
      })
      .timeout(this.timeout);
  }

  select(columns) {
    return this.knex.select(columns).from(this.tableName);
  }
}

module.exports = Model;
