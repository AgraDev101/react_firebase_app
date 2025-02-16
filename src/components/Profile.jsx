import Header from "./Header"
import { useEffect, useState } from "react"
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "../../firebase"

const Profile = () => {
    const [post, setPost] = useState("")
    const [postList, setPostList] = useState([])
    const [followingList, setFollowingList] = useState([])
    const [followerList, setFollowerList] = useState([])

    useEffect(() => {
        getPostList()
        fetchFollowingList()
        fetchFollowerList()
    }, [])

    const fetchFollowingList = async () => {
        try {
            const q = query(collection(db, "users"), where("userId", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q)
            const dataArray = querySnapshot.docs.map(doc => doc.data().following);
            setFollowingList(dataArray[0])
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const fetchFollowerList = async () => {
        try {
            const q = query(collection(db, "users"), where("userId", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q)
            const dataArray = querySnapshot.docs.map(doc => doc.data().followers);
            console.log(dataArray[0])
            setFollowerList(dataArray[0])
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const postRef = collection(db, "posts");

    const getPostList = async () => {
        try {
            const q = query(postRef, where("userId", "==", auth.currentUser.uid))
            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPostList(filteredData);
        } catch (err) {
          console.log("error");
        }
    };

    const addPost = async () => {
        await addDoc(postRef, {
            post: post,
            likes: 0,
            userId: auth.currentUser.uid
        })
    }

    const deletePost = async (id) => {
        const postToDelete = doc(db, "posts", id)
        await deleteDoc(postToDelete)
    }

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
            <h1 style={{
                textAlign: "center"
            }}>Profile Page</h1>
            <div style={{
                width: "400px",
                margin: "50px auto 0px auto"
            }}>
                <h5>Followers: {followerList ? followerList.length : 0}</h5>
                <h5>Following: {followingList ? followingList.length : 0}</h5>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Add Post</span>
                    <input onChange={(e) => setPost(e.target.value)} type="text" class="form-control" placeholder="post" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <button onClick={addPost} className="btn btn-primary">Add</button>
            </div>
            <div style={{
                width: "400px",
                margin: "20px auto 0px auto"
            }}>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Post Title</th>
                        <th scope="col">likes</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                postList.map((post, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{post.post}</td>
                                            <td>{post.likes}</td>
                                            <td>
                                                <button onClick={() => deletePost(task.id)} type="button" class="btn btn-danger btn-sm">Delete</button>
                                            </td>
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

export default Profile


    // async function getFollowing(userId) {
    //     const followingRef = collection(db, "users", userId, "following");
    //     const followingSnapshot = await getDocs(followingRef);
    
    //     const following = [];
    
    //     for (const docSnap of followingSnapshot.docs) {
    //         const followingId = docSnap.id; // Get following user's ID
    //         const userRef = doc(db, "users", followingId);
    //         const userSnap = await getDoc(userRef);
    
    //         if (userSnap.exists()) {
    //             const userData = userSnap.data();
    //             following.push({
    //                 id: followingId,
    //                 name: userData.name,
    //                 email: userData.email,
    //             });
    //         }
    //     }
    
    //     console.log(following);
    //     return following;
    // }