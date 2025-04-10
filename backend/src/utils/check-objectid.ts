import mongoose from "mongoose";

export const checkObjectId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};
