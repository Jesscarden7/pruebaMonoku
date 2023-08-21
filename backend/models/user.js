const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
  },
  { timestamps: true },
);

// No retornar la contraseña
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
};

module.exports = model("User", UserSchema);
