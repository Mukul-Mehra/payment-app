import { Router } from "express";
import { AccountModel } from "./db.js";
export const accountrouter = Router();
import { authMiddleware } from "./middleware.js";
import mongoose from "mongoose";
accountrouter.get("/balance", authMiddleware, async function (req, res) {
    const account = await AccountModel.findOne({
        userId: req.userId
    });
    const balance = account?.balance;
    res.json({
        balance: account?.balance
    });
    console.log(balance);
});
accountrouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    // Fetch the accounts within the transaction
    const account = await AccountModel.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toAccount = await AccountModel.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    // Perform the transfer
    await AccountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});
//# sourceMappingURL=accountRoutes.js.map