"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import styles from './profile.module.css';

export default function ProfilePage() {
    const [userDetails, setUserDetails] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error:any) {
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me");
            setUserDetails(response.data.user);
            setShowDetails(true);
        } catch (error: any) {
            console.error("Error fetching current user:", error);
            toast.error(error.response?.data?.error || error.message || "Failed to fetch user details");
            setUserDetails(null);
            setShowDetails(false);
        }
    };

    const handleToggleDetails = () => {
        if (showDetails) {
            setShowDetails(false);
        } else {
            getUserDetails();
        }
    };

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileCard}>
                <h1>Profile</h1>
                <hr/>
                <p>This is the profile page.</p>
                {userDetails && showDetails ? (
                    <>
                        <h2>Welcome, {userDetails.username}</h2>
                        <h4>
                            <Link href={`/profile/${userDetails._id}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
                                Click here for more details!
                            </Link>
                        </h4>
                    </>
                ) : ""}
                <hr/>
                <button onClick={logout} className={styles.button}>Logout</button>
                <button onClick={handleToggleDetails} className={styles.greenButton}>
                    {showDetails ? "Hide User Details" : "Get User Details"}
                </button>
            </div>
        </div>
    );
}