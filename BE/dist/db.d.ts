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
//# sourceMappingURL=db.d.ts.map