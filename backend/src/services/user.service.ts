import User from "../models/user.model";
import { checkObjectId } from "../utils/check-objectid";
import { BadRequestError, NotFoundError } from "../utils/errors";

const getUsers = async () => {
  const users = await User.find().select("-password");

  if (!users) {
    throw new NotFoundError("Aucun utilisateur trouvé");
  }

  return users;
};

const getUser = async (id: string) => {
  if (!id) {
    throw new BadRequestError("ID is required");
  }

  if (!checkObjectId(id)) {
    throw new BadRequestError("Invalid ID");
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

const updateUser = async (id: string, userData: any) => {
  if (!id) {
    throw new BadRequestError("ID is required");
  }

  if (!checkObjectId(id)) {
    throw new BadRequestError("Invalid ID");
  }
  const user = await User.findByIdAndUpdate(id, userData, { new: true });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

const deleteUser = async (id: string) => {
  if (!id) {
    throw new BadRequestError("ID is required");
  }

  if (!checkObjectId(id)) {
    throw new BadRequestError("Invalid ID");
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export default { getUsers, getUser, updateUser, deleteUser };
