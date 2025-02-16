import { useEffect, useState } from "react"
import Header from "../components/Header"
import { doc, collection, getDocs, increment, updateDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import FollowButton from "./Follow"

const Dashboard = () => {
    const [postList, setPostList] = useState([])

    const postRef = collection(db, "posts");

    useEffect(() => {
        getPostList()
    }, [])

    const incrementValue = async (id, userId) => {
        if (auth.currentUser.uid == userId) {
            return
        }
        const docRef = doc(db, 'posts', id);
        await updateDoc(docRef, {
            likes: increment(1)
        });
        window.location.reload()
    };

    const getPostList = async () => {
        try {
            const data = await getDocs(postRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPostList(filteredData);
        } catch (err) {
          console.log("error");
        }
    };

    if (!auth.currentUser) {
        return (
            <div>
                <Header />
                <h1>Not logged in</h1>
            </div>
        )
    }

    return (
        <>
            <Header />
            <h3 style={{
                margin: "25px 0px 0px 0px",
                textAlign: "center"
            }}>Dashboard Page</h3>
            <div style={{
                width: "400px",
                margin: "20px auto 0px auto"
            }}>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Posts</th>
                        <th scope="col">likes</th>
                        <th scope="col">Follow</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                postList.map((post, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{post.post}</td>
                                            <td>
                                                <span style={{marginRight: "5px"}}>{post.likes}</span>
                                                <button onClick={() => incrementValue(post.id, post.userId)} className="btn btn-primary btn-sm">+</button>
                                            </td>
                                            <td><FollowButton followId={post.userId} userId={auth.currentUser.uid}/></td>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Dashboard

// import React, { useState, useEffect } from 'react';
// import { getDoc, doc } from 'firebase/firestore';

// function FollowerList({ userId }) {
//   const [followers, setFollowers] = useState([]);

//   useEffect(() => {
//     const fetchFollowers = async () => {
//       try {
//         const userDoc = await getDoc(doc(db, 'users', userId));
//         if (userDoc.exists()) {
//           const followerIds = userDoc.data().followers;
//           const followerNames = [];

//           for (const followerId of followerIds) {
//             const followerDoc = await getDoc(doc(db, 'users', followerId));
//             if (followerDoc.exists()) {
//               followerNames.push(followerDoc.data().username);
//             }
//           }

//           setFollowers(followerNames);
//         } else {
//           console.log('User not found');
//         }
//       } catch (error) {
//         console.error('Error fetching followers:', error);
//       }
//     };

//     fetchFollowers();
//   }, [userId]);




