import User from '../models/UserModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signIn = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ newUser }, '5uperM@n', { expiresIn: '1h' });
        res.status(201).json({ message: "User registered successfully", token, user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ user }, '5uperM@n', { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token, user: user });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
}

export { signIn, loginUser };