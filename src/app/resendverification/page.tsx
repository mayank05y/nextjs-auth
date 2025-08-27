"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./resendverification.module.css";

export default function ResendVerificationPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/users/resendverification", { email });
            toast.success("Verification email sent!");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to resend verification email");
        }
        setLoading(false);
    };

    return (
        <div className={styles.resendVerificationPage}>
            <form className={styles.resendVerificationForm} onSubmit={handleResend}>
                <h1>Resend Verification Email</h1>
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Sending..." : "Resend Email"}
                </button>
            </form>
        </div>
    );
}