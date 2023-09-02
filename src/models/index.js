module.exports = ({
  knex = require("../database/db.js"),
  name = "",
  tableName = "",
  selectableProps = [],
  timeout = 1000,
}) => {
  const query = knex.from(tableName);

  const create = (props) => {
    delete props.id;
    return knex.insert(props).into(tableName).timeout(timeout);
  };

  const findAll = () => {
    return knex.select(selectableProps).from(tableName).timeout(timeout);
  };

  const find = (filters) => {
    return knex
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout);
  };

  const update = (id, props) => {
    delete props.id;

    return knex
      .update(props)
      .from(tableName)
      .where({
        id,
      })
      .timeout(timeout);
  };

  const destroy = (id) => {
    return knex
      .del()
      .from(tableName)
      .where({
        id,
      })
      .timeout(timeout);
  };

  return {
    query,
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    update,
    destroy,
  };
};
