import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: Request) {
    await connect();
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user.isVerified) {
        return NextResponse.json({ error: "Email already verified" }, { status: 400 });
    }
    await sendEmail({ email: user.email, emailType: "VERIFY", userId: user._id });
    return NextResponse.json({ message: "Verification email sent" });
}