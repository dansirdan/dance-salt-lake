const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Name or Organization already in use"
      },
      validate: {
        len: [6],
        // not: [" "],
        notEmpty: true
      }
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
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
    space: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
        not: [" "],
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email already in use"
      },
      validate: {
        len: [6],
        isEmail: true,
        notEmpty: true
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Class, {
      onDelete: "cascade"
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Performance, {
      onDelete: "cascade"
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Audition, {
      onDelete: "cascade"
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Space, {
      onDelete: "cascade"
    });
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};
