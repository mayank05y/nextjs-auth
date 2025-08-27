"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import axios from 'axios';
import { toast } from "react-hot-toast"
import styles from './signup.module.css';

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: ''
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("Signup success", response.data);
            router.push('/login');
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length>0 && user.password.length>0 && user.username.length>0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className={styles.signupPage}>
            <form className={styles.signupForm}>
                <h1>{ loading ? "Processing" : "Signup" }</h1>
                <label className={styles.label} htmlFor='username'>Username</label>
                <input
                    className={styles.input}
                    type='text'
                    id='username'
                    name='username'
                    autoComplete='username'
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder='Username'
                />
                <label className={styles.label} htmlFor='email'>Email</label>
                <input
                    className={styles.input}
                    type='email'
                    id='email'
                    name='email'
                    autoComplete='email'
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder='Email'
                />
                <label className={styles.label} htmlFor='password'>Password</label>
                <input
                    className={styles.input}
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='new-password'
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder='Password'
                />
                <button
                    onClick={onSignup}
                    className={styles.button}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? "No signup" : "Signup"}
                </button>
                <Link href='/login'>Visit login page</Link>
            </form>
        </div>
    )
}