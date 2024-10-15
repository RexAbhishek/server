import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return res.status(409).json({ message: "Email is already taken!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    const adminObject = newAdmin.toObject();
    delete adminObject.__v;
    delete adminObject.password;
    delete adminObject.createdAt;
    delete adminObject.updatedAt;

    return res.status(201).json(adminObject);
  } catch (error) {
    console.error("Error registering user:", error.message);
    next(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) {
      return res.status(404).json({ message: "User not found! 😟" });
    }
    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const adminObject = validAdmin.toObject();
    delete adminObject._id;
    delete adminObject.password;
    delete adminObject.createdAt;
    delete adminObject.updatedAt;
    delete adminObject.__v;
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(adminObject);
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been logged out!👍🏻" });
  } catch (error) {
    next(error);
    console.error("Error adding video:", error);
    return res.status(500).json({ message: error.message });
  }
};