module.exports = function (sequelize, DataTypes) {

  var Space = sequelize.define("Space", {
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   len: [1],
      //   notEmpty: true
      // }
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      // allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   len: [1],
      //   notEmpty: true
      // }
    },
    squareFootage: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    numPeople: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   min: 1,
      //   notEmpty: true,
      //   isInt: true
      // }
    },
    // photoLink: {
    //   type: DataTypes.STRING,
    //   // allowNull: false,
    //   // validate: {
    //   //   notEmpty: true,
    //   //   isUrl: true
    //   // }
    // },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   len: [1],
      //   notEmpty: true
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        unique: true,
        isEmail: true
      }
    }
  });

  Space.associate = (models) => {
    Space.belongsTo(models.User, {
      foreignKey: {
        // allowNull: false
      }
    });
  };
  return Space;
};
