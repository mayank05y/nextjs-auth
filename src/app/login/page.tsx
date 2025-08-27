"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from './login.module.css';

export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("Login successful", response.data);
            toast.success("Login successful");
            router.push('/profile');
        } catch (error:any) {
            toast.error(error.response?.data?.error || error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className={styles.loginPage}>
            <form className={styles.loginForm} onSubmit={onLogin}>
                <h1>{loading ? "Processing" : "Login"}</h1>
                <label className={styles.label} htmlFor='email'>Email</label>
                <input
                    className={styles.input}
                    type='email'
                    id='email'
                    name='email'
                    autoComplete='username'
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder='Email'
                    required
                />
                <label className={styles.label} htmlFor='password'>Password</label>
                <input
                    className={styles.input}
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='current-password'
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder='Password'
                    required
                />
                <button
                    type="submit"
                    className={styles.button}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "No email or password entered" : "Login"}
                </button>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                    <Link href="/signup">Visit Signup Page</Link>
                    <Link href="/forgotpassword">Forgot Password?</Link>
                </div>
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                    <Link href="/resendverification" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        Resend verification Email
                    </Link>
                </div>
            </form>
        </div>
    )
}