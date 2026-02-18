import { Box, Button, Card, CardActionArea, CardActions, CardContent, Container, Grid, Paper, styled, Typography } from "@mui/material";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

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

export default function PostList(){
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    // const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<string>();
    const [isSortedAscending, setIsSortedAscending] = useState<boolean>(true);

    const sortedPosts = useMemo(() => {
        const sorted = [...posts];
        if(sortBy === "title"){
            sorted.sort((a, b) => 
                isSortedAscending ?
                a.title.localeCompare(b.title) :
                b.title.localeCompare(a.title)
            );
        } else if(sortBy === "content"){
            sorted.sort((a, b) => 
                isSortedAscending ?
                a.content.localeCompare(b.content) :
                b.content.localeCompare(a.content)
            );
        } else if(sortBy === "user"){
            sorted.sort((a, b) => 
                isSortedAscending ?
                a.user.name.localeCompare(b.user.name) :
                b.user.name.localeCompare(a.user.name)
            );
        }
        return sorted;
    }, [posts, sortBy, isSortedAscending]);

    
    const reloadPosts = useCallback(async () => {
            const response = await fetch('http://localhost:5173/api/post');
            if(response.status !== 200){
                alert("Failed to fetch posts");
                return;
            }
            const data = await response.json();
            setPosts(data.records);
        }, []);


    const filteredPosts = useMemo(() => 
        sortedPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
    ), [sortedPosts, searchTerm]);

    useEffect(() => {
        reloadPosts();
    },[reloadPosts])

    return (
        <Container maxWidth={false} sx={{ width: '100%' }}>
            <h2>Posts</h2>
            <button onClick={reloadPosts}>Reload Posts</button>
            <select onChange={(e) => {
                setSortBy(e.target.value);
            }} value={sortBy}>
                <option value="">Sort By</option>
                <option value="title">Title</option>
                <option value="content">Content</option>
                <option value="user">User</option>
            </select>
            <button onClick={() => setIsSortedAscending(!isSortedAscending)}>
                {isSortedAscending ? "Ascending" : "Descending"}
            </button>
            <input 
                type="text" 
                placeholder="Search Posts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Grid container spacing={2}>
            {filteredPosts.map((post: any) => (
                <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardActionArea sx={{ flexGrow: 1 }} onClick={() => navigate(`/post/${post.id}`)}>
                            <CardContent>
                            <Typography 
                                gutterBottom 
                                variant="h5" 
                                component="div"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {post.title}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'text.secondary',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {post.content}
                            </Typography>
                            {post.user.name}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
            </Grid>
            </Box>


        </Container>
    )
}
