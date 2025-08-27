import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await connect();
    try {
        const user = await User.findById(params.id).select("username email _id");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching user details" }, { status: 500 });
    }
}