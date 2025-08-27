import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: Request, context: any) {
    const { params } = context;
    await connect();
    try {
        const user = await User.findById(params.id).select("username email _id");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user });
    } catch (error: any) {
        console.error("Error in GET /api/users/[id]:", error);
        return NextResponse.json({ error: error.message || "Error fetching user details" }, { status: 500 });
    }
}