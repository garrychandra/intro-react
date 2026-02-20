import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useAppSelector } from "../hooks/useAppSelector";
import type { Post } from "../types";

export default function PostDetail(){
    const { id } = useParams();
    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    // Try to get post from Redux store first
    const postsFromStore = useAppSelector((state) => state.post.posts?.records);
    
    const back = () => {
        navigate(-1);
    }

    useEffect(() => {
        // First, check if the post is already in the Redux store
        const postFromStore = postsFromStore?.find(p => p.id === id);
        
        if (postFromStore) {
            setPost(postFromStore);
            setIsLoading(false);
        } else {
            // If not in store, fetch from API
            const fetchPost = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(`http://localhost:5173/api/post/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch post');
                    }
                    const data = await response.json();
                    setPost(data);
                } catch (error) {
                    console.error('Error fetching post:', error);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchPost();
        }
    }, [id, postsFromStore]);
    
    if(isLoading){
        return <div>Loading...</div>
    }
    
    if(!post){
        return <div>Post not found</div>
    }

    return <div>
        <div>title: {post.title}</div>
        <div>content: {post.content}</div>
        <div>author: {post.user.name}</div>
        <button onClick={back}>Back</button>
    </div>
}
