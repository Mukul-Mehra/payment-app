import { Router } from "express";
import { AccountModel, UserModel } from "./db.js";
export const router = Router();
import { z } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from './config.js';
import { authMiddleware } from "./middleware.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
router.get("/me", authMiddleware, async function (req, res) {
    const user = await UserModel.findById(req.userId).select("firstName lastName email");
    res.send(user);
});
router.post("/signup", async function (req, res) {
    const requireBody = z.object({
        firstname: z.string().min(3).max(50),
        lastname: z.string().min(3).max(50),
        password: z.string().min(3).max(50),
        email: z.string().min(5).max(50)
    });
    const parsedData = requireBody.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "incorrect Format"
        });
        return;
    }
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const email = req.body.email;
    const existingUser = await UserModel.findOne({
        email: email
    });
    if (existingUser) {
        res.status(411).json({
            message: "Email already taken"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
        firstName: firstname,
        lastName: lastname,
        password: hashedPassword,
        email: email
    });
    const userId = user._id;
    //creating User Accout
    await AccountModel.create({
        userId,
        balance: 1 + Math.random() * 10000
    });
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    res.json({
        message: "SignUp Sucessfully",
        token: token
    });
});
router.post("/signin", async function (req, res) {
    try {
        // 1. Validate input
        const requireBody = z.object({
            email: z.string().min(5).max(50).email(),
            password: z.string().min(3).max(50),
        });
        const parsedData = requireBody.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({ message: "Incorrect format" });
        }
        const { email, password } = parsedData.data;
        // 2. Find user by email
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser || !existingUser.password) {
            return res.status(404).json({ message: "User not found" });
        }
        // 3. Compare password with bcrypt hash
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid password" });
        }
        // 4. Issue JWT
        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: "1h" } // token valid for 1 hour
        );
        // 5. Send response
        return res.json({
            message: "Signin successful",
            token,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
router.put("/user", authMiddleware, async (req, res) => {
    const schema = z.object({
        firstname: z.string().min(3).max(50).optional(),
        lastname: z.string().min(3).max(50).optional(),
        password: z.string().min(3).max(50).optional(),
    });
    const parsedData = schema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data format",
        });
    }
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.userId, // comes from authMiddleware
        {
            ...(parsedData.data.firstname && { firstName: parsedData.data.firstname }),
            ...(parsedData.data.lastname && { lastName: parsedData.data.lastname }),
            ...(parsedData.data.password && { password: parsedData.data.password }),
        }, { new: true } // return updated user
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            message: "User updated successfully",
            user: {
                firstname: updatedUser.firstName,
                lastname: updatedUser.lastName,
                email: updatedUser.email,
            },
        });
    }
    catch (err) {
        res.status(500).json({ message: "Error updating user" });
    }
});
router.get("/users/bulk", authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const users = await UserModel.find({
            $and: [
                {
                    $or: [
                        { firstName: { $regex: filter, $options: "i" } },
                        { lastName: { $regex: filter, $options: "i" } }
                    ]
                },
                { _id: { $ne: req.userId } } // ✅ exclude logged-in user
            ]
        });
        res.json({
            user: users.map(user => ({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});
//# sourceMappingURL=route.js.map