module.exports = function (sequelize, DataTypes) {

  var Performance = sequelize.define("Performance", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    photoLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: DataTypes.NOW,
        notEmpty: true
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    special: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Performance.associate = (models) => {
    Performance.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Performance;
};
