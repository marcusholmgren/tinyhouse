import { Request } from "express";
import { Database, User } from "../types";

export async function authorize(
    db: Database,
    req: Request
): Promise<User | null> {
    const token = req.get("X-CSRF-TOKEN");
    const viewer = await db.users.findOne<User>({
        _id: req.signedCookies.viewer,
        token: token,
    });

    return viewer;
}
