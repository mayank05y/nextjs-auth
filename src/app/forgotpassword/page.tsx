"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './forgotpassword.module.css';

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/users/forgotpassword", { email });
            setSuccess("Reset link sent to your email");
        } catch (error: any) {
            setError("An error occurred. Please try again.");
        }
        setLoading(false);
    }

    return (
        <div className={styles.forgotPasswordPage}>
            <form onSubmit={handleSubmit} className={`flex flex-col gap-2 max-w-sm mx-auto mt-10 ${styles.forgotPasswordForm}`}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    className={styles.input}
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                />
                <div className={styles.buttonGroup}>
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={() => router.push('/login')}
                    >
                        Go to Login
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </form>
        </div>
    )
}