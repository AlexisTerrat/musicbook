module.exports = function(sequelize, Datatypes) {
  return sequelize.define('Item', {
    title: {
      type: Datatypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      onload: function(connector) {
        connector.Item.belongsToMany(connector.Tag, { through: 'ItemTag' });
        connector.Tag.belongsToMany(connector.Item, { through: 'ItemTag' });
      }
    }
  });
};
