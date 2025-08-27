"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from './verifyemail.module.css';

export default function VerifyEmailPage(){

    //to get the token from the URL
    const [token, setToken] = useState("");

    //to check if user is verified
    const [verified, setVerified] = useState(false);

    //to check if there is an error
    const [error, setError] = useState(false);

    //to extract the token from the URL
    useEffect(() => {
        //here we will take token as everything from right of "=" in the URL as token,
        //[1] indicates the 2nd element of the array
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    //if there is a change in the token, we will run this:
    useEffect(() => {
        if(token.length > 0){
            const verifyUserEmail = async () => {
                try {
                    await axios.post("/api/users/verifyemail", { token });
                    setVerified(true);
                } catch (error:any) {
                    setError(true);
                    console.log(error.response.data);
                }
            }
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className={styles.verifyEmailPage}>
            <div className={styles.verifyEmailCard}>
                <h1 className={styles.heading}>Verify Email</h1>
                <div className={styles.tokenBox}>
                    {token ? `${token}` : "No token"}
                </div>
                {verified && (
                    <div className={styles.success}>
                        Email verified
                        <br />
                        <Link href="/login" className={styles.link}>Go to Login</Link>
                    </div>
                )}
                {error && (
                    <div className={styles.error}>
                        Error verifying email
                    </div>
                )}
            </div>
        </div>
    )
}