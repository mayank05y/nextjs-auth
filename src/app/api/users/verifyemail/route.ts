import { connect } from "@/dbConfig/dbConfig";
import { NextRequest , NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        // Find all users with a non-expired verifyToken
        const users = await User.find({ verifyTokenExpiry: { $gt: Date.now() } });

        let user = null;
        for (const u of users) {
            const isMatch = await bcrypt.compare(token, u.verifyToken);
            if (isMatch) {
                user = u;
                break;
            }
        }

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}