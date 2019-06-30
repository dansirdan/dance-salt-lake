module.exports = function (sequelize, DataTypes) {

  const Class = sequelize.define("Class", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    master: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    instructorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
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
    level: {
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
  });

  Class.associate = (models) => {
    Class.belongsToMany(models.User, { through: "ClassUser" });
  };
  return Class;
};
