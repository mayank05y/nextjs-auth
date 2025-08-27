"use client";

import axios from "axios";
import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from './resetpassword.module.css';

function ResetPasswordForm() {
    const params = useSearchParams();
    const token = params.get("token") || "";
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            setError("Passwords do not match!");
            return;
        }
        setLoading(true);
        try {
            await axios.post("/api/users/resetpassword", { token, password });
            setSuccess("Password is reset successfully!");
            console.log("Password is reset successfully!");
        } catch (error: any) {
            setError(error.response?.data?.error || error.message);
            console.log(error.response?.data?.error || error.message);
        }
        setLoading(false);
    };

    return (
        <div className={styles.resetPasswordPage}>
            <form onSubmit={handleSubmit} className={`flex flex-col gap-2 max-w-sm mx-auto mt-10 ${styles.resetPasswordForm}`}>
                <input
                    className={`${styles.input} border p-2`}
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter New Password"
                    required
                />
                <input
                    className={`${styles.input} border p-2`}
                    type="password"
                    id="confirm"
                    name="confirm"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Confirm New Password"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white p-2 rounded">
                        {loading ? "Resetting..." : "Reset Password"}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">{success}</p>}
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => router.push('/login')}
                >
                    Go to Login
                </button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}