import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
type User = {
    id: number;
    name: string;
    email: string;
}
type Post = {
    id: number;
    user: User;
    title: string;
    content: string;
}

export default function PostDetail(){
    const { id } = useParams();
    const [post, setPost] = useState<Post>();
    const navigate = useNavigate();
    const back = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:5173/api/post/${id}`);
            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [id]);
    
    if(!post){
        return <div>Post not found</div>
    }

    return <div>
        <div>title: {post.title}</div>
        <div>content: {post.content}</div>
        <button  onClick={back}>Back</button>
    </div>
}
