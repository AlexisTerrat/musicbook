module.exports = function(sequelize, Datatypes) {
  return sequelize.define('Tag', {
    name: {
      type: Datatypes.STRING,
      allowNull: false
    }
  });
};
