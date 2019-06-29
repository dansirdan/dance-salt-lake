module.exports = function (sequelize, DataTypes) {

  var DefaultEvent = sequelize.define("DefaultEvent", {
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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
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
    number_of_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        notEmpty: true,
        isInt: true
      }
    },
    category_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1]
      }
    }
  });

  DefaultEvent.associate = (models) => {
    DefaultEvent.belongsToMany(models.User, { through: "DefaultEventUser" });
  };
  return DefaultEvent;
};
