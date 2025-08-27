import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    await connect();
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("username email _id");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user });
    } catch (error: any) {
        console.error("Error in GET /api/users/me:", error);
        return NextResponse.json({ error: error.message || "Error fetching user details" }, { status: 500 });
    }
}