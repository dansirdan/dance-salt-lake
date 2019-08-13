module.exports = function (sequelize, DataTypes) {

  var Space = sequelize.define("Space", {
    // active: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },

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
