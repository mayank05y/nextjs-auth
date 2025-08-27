import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function POST(request: NextRequest) {
    
    const { token, password } = await request.json();
    
    try { 
        // Find all users with a non-expired forgotPasswordToken:
        const users = await User.find({
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });
        
        // Compare each token with each user's hashed token:
        let user = null;
            for (const u of users) {
                const isMatch = await bcryptjs.compare(token, u.forgotPasswordToken);
                if (isMatch) {
                    user = u;
                    break;
                }
            }

        if (!user) {
            return NextResponse.json({ 
                error: 'Invalid or expired token!'
                }, { status: 400 });
        }
    
        // Update user's password and clear the token fields:
        user.password = await bcryptjs.hash(password, 10);
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ 
            message: 'Password is reset successfully!',
            success: true 
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
            }, { status: 500 });
    }
}