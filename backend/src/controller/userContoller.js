import { User } from "../module/userModel.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";

// LOGIN
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please Provide" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND)
              .json({ message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(httpStatus.UNAUTHORIZED)
              .json({ message: "Invalid credentials" });
        }

        const token = crypto.randomBytes(20).toString("hex");

        user.token = token;
        await user.save();

        return res.status(httpStatus.OK).json({ token });

    } catch (e) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


// REGISTER
const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(httpStatus.CONFLICT)
              .json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED)
          .json({ message: "User Registered" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { login, register };