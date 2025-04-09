import { Schema, model, models } from "mongoose";
import { comparePassword, hashPassword } from "../utils/password";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await comparePassword(enteredPassword, this.password);
};

const User = models?.User || model("User", userSchema);

export default User;
