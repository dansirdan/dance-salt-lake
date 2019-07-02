module.exports = function (sequelize, DataTypes) {

  var Space = sequelize.define("Space", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    squareFootage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        notEmpty: true,
        isInt: true
      }
    }
  });

  Space.associate = (models) => {
    Space.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Space;
};
