const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

  const User = sequelize.define("User", {
    // user_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: {
    //     args: true,
    //     msg: "User name already in use"
    //   },
    //   validate: {
    //     len: [6],
    //     not: [" "],
    //     notEmpty: true
    //   }
    // },
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
      validate: {
        len: [6],
        isEmail: true,
        notEmpty: true
      }
    }
  });

  User.associate = (models) => {
    User.belongsToMany(models.DefaultEvent, { through: "DefaultEventUser" });
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
