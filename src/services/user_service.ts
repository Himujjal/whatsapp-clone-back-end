import userSchema, { IUserSchema } from "../models/user_model";

export async function createNewUser(
  username: string,
  password: string,
  email: string,
  image: string
): Promise<IUserSchema> {
  try {
    const newUserObj: IUserSchema = {
      username,
      password,
      lastSeen: new Date().toUTCString(),
      officer: false,
      email,
      image,
      products: [],
      resetPasswordToken: "",
      resetPasswordExpires: 0,
    };
    // @ts-ignore
    const user: IUserSchema = await userSchema.create(newUserObj);
    delete newUserObj.password;
    return { _id: user._id, ...newUserObj };
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
}

export async function createNewOfficer(
  username: string,
  password: string
): Promise<Partial<IUserSchema>> {
  try {
    // @ts-ignore
    const user: IUserSchema = await userSchema.create({
      username,
      password,
      lastSeen: new Date().toUTCString(),
      officer: true,
    });
    return {
      _id: user._id,
      username: user.username,
      lastSeen: user.lastSeen,
      officer: false,
      resetPasswordToken: user.resetPasswordToken,
      resetPasswordExpires: user.resetPasswordExpires,
      products: user.products,
      email: user.email,
      image: user.image,
    };
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
}

export async function updateUser({
  id,
  username,
  lastSeen,
  email,
  image,
  resetPasswordToken,
  resetPasswordExpires,
}: {
  id: string;
  username: string;
  lastSeen: string;
  email?: string;
  image?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
}): Promise<IUserSchema> {
  try {
    const newUserObj: IUserSchema = {
      _id: id,
      username,
      lastSeen,
      officer: false,
      products: [],
    };
    if (resetPasswordToken) newUserObj.resetPasswordToken = resetPasswordToken;
    if (resetPasswordExpires)
      newUserObj.resetPasswordExpires = resetPasswordExpires;
    if (image) newUserObj.image = image;
    if (email) newUserObj.email = email;

    await userSchema.findByIdAndUpdate(id, newUserObj);
    return {
      _id: newUserObj._id,
      username: newUserObj.username,
      lastSeen: newUserObj.lastSeen,
      officer: false,
      resetPasswordToken: newUserObj.resetPasswordToken,
      resetPasswordExpires: newUserObj.resetPasswordExpires,
      products: newUserObj.products,
      email: newUserObj.email,
      image: newUserObj.image,
    };
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
}

export async function getUserByUsername(
  username: string,
  officer = true
): Promise<IUserSchema> {
  try {
    const filterQuery: { username: string; officer?: any } = { username };
    if (officer) filterQuery.officer = { $eq: true };
    const user: IUserSchema = await userSchema.findOne(filterQuery);
    return user;
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
}

export async function getUserById(id: string): Promise<IUserSchema> {
  try {
    // @ts-ignore
    const user: IUserSchema = await userSchema.findById(id);
    return user;
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
}
export async function getUserByToken(
  resetPasswordToken: string
): Promise<IUserSchema> {
  try {
    // @ts-ignore
    const user: IUserSchema = await userSchema.findOne({ resetPasswordToken });
    return user;
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
}

export async function getAllUsers(username: string): Promise<IUserSchema[]> {
  try {
    let users: IUserSchema[] = await userSchema.find({
      username: { $ne: username },
      officer: { $eq: true },
    });
    users = JSON.parse(JSON.stringify(users));
    const res = users.map((u) => {
      const newU = { ...u };
      delete newU.password;
      return newU;
    });
    return res;
  } catch (err) {
    throw new Error("Error getting all users: " + err.message);
  }
}
