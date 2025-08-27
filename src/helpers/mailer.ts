import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {

        // generate a random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // create a hashed token
        const hashedToken = await bcrypt.hash(resetToken, 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 3600000})

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken, 
                forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
    
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const mailOptions = {
            from: "mayank@gmail.com",
            to: email,
            subject: emailType === "VERIFY" 
                                    ? "Verify your email"
                                    : "Reset your password",
            html: emailType === "VERIFY"
                ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${resetToken}">here</a> to verify your email.<br/>Or copy and paste the link below:<br/>${process.env.DOMAIN}/verifyemail?token=${resetToken}</p>`
                : `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${resetToken}">here</a> to reset your password.<br/>Or copy and paste the link below:<br/>${process.env.DOMAIN}/resetpassword?token=${resetToken}</p>`
        };

        // send the email
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);       
    }
}