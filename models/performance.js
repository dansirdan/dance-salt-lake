module.exports = function (sequelize, DataTypes) {

  var Performance = sequelize.define("Performance", {
    // active: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // },
    title: {
      type: DataTypes.STRING,
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
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    payment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    photoLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        isEmail: true,
        notEmpty: true
      }
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
