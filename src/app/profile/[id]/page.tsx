import axios from "axios";
import Link from "next/link";
import styles from './profileId.module.css';

export default async function UserProfile({ params }: any) {
    const userId = params.id;
    let userDetails = null;

    try {
        const response = await axios.get(`${process.env.DOMAIN}/api/users/${userId}`);
        userDetails = response.data.user;
    } catch (error: any) {
        console.error("Error fetching user details:", error);
    }

    return (
        <div className={styles.profileIdPage}>
            <div className={styles.profileIdCard}>
                <h1>Profile Details</h1>
                <hr/>
                {userDetails ? (
                    <div className={styles.detailsBox}>
                        <p><strong>Username:</strong> {userDetails.username}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                        <p><strong>Profile ID:</strong> {userDetails._id}</p>
                    </div>
                ) : (
                    <p>User not found.</p>
                )}
                <Link href="/profile" className={styles.backLink}>
                    Go back to Profile Page
                </Link>
            </div>
        </div>
    );
}