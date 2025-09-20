import { Router } from "express";
import { UserModel } from "./db.js";
export const router = Router();
import { z } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from './config.js';
import { authMiddleware } from "./middleware.js";
router.get("/", function (req, res) {
});
router.post("/signup", async function (req, res) {
    const requireBody = z.object({
        firstname: z.string().min(3).max(50),
        lastname: z.string().min(3).max(50),
        password: z.string().min(3).max(50),
        email: z.string().min(5).max(50).email()
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
    const user = await UserModel.create({
        firstName: firstname,
        lastName: lastname,
        password: password,
        email: email
    });
    const userId = user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    res.json({
        message: "SignUp Sucessfully",
        token: token
    });
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
//# sourceMappingURL=route.js.map