import React, { useState, useEffect, useRef } from 'react';
import { updateDoc, arrayUnion, getDocs, where, collection, query, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';

function FollowButton({followId, userId, id}) {
    let [isFollowing, setIsFollowing] = useState(false);

    if (followId == userId) {
      return
    }
    
    async function handleFollow() {

        const q = query(collection(db, "users"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            following: arrayUnion(followId)
          });
        }

        const q2 = query(collection(db, "users"), where("userId", "==", followId));
        const querySnapshot2 = await getDocs(q2)
        if (!querySnapshot2.empty) {
          const docRef2 = querySnapshot2.docs[0].ref;
          await updateDoc(docRef2, {
            followers: arrayUnion(userId)
          });
        setIsFollowing(true)
      }
    }

    async function handleUnfollow() {
      const q = query(collection(db, "users"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          following: arrayRemove(followId)
        });
      }

      const q2 = query(collection(db, "users"), where("userId", "==", followId));
      const querySnapshot2 = await getDocs(q2)
      if (!querySnapshot2.empty) {
        const docRef2 = querySnapshot2.docs[0].ref;
        await updateDoc(docRef2, {
          followers: arrayRemove(userId)
      });
      
      setIsFollowing(false)
}}

  return (
    <button className='btn btn-primary btn-sm' onClick={isFollowing ? handleUnfollow : handleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;