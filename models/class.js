module.exports = function (sequelize, DataTypes) {

  const Class = sequelize.define("Class", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
        notEmpty: true
      }
    },
    instructorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    master: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    payment: {
      type: DataTypes.STRING,
      allowNull: false
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
    endTime: {
      type: DataTypes.TIME,
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



  });

  Class.associate = (models) => {
    Class.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Class;
};
