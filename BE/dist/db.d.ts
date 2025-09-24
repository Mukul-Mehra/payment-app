import mongoose from "mongoose";
export declare const UserModel: mongoose.Model<{
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    email?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    email?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    email?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    email?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    email?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    firstName?: string | null;
    lastName?: string | null;
    password?: string | null;
    email?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const AccountModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId: mongoose.Types.ObjectId;
    balance: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=db.d.ts.map