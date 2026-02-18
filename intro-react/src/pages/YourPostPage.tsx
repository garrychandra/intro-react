import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Box, Grid, Card, CardActionArea, CardContent, Typography, Button, Modal } from "@mui/material";
import type { Post, PostListResponse } from '../types';

export default function YourPostPage() {
  const userInfo = useAppSelector(state => state.auth.userInfo)
  const [posts, setPosts] = React.useState<Post[]>([]);
  const id = userInfo?.id;
  const [openPostId, setOpenPostId] = React.useState<string | null>(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editContent, setEditContent] = React.useState('');

  const handleOpen = (post: Post) => {
    setOpenPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleClose = () => {
    setOpenPostId(null);
    setEditTitle('');
    setEditContent('');
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const deletePost = async (postId: String) => {
    try {
      const response = await fetch(`http://localhost:5173/api/post/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5173/api/post?userId=${id}`);
        const data: PostListResponse = await response.json();
        setPosts(data.records || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    }
    if (id) {
      fetchPosts();
    }
  }, [id]);

  return (
    posts.length > 0 ? (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2}>
          {posts.map((post: Post, index: number) => (
            <Grid key={post.id || index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea sx={{ flexGrow: 1 }}>
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
                    {post.user?.name}
                    <br />
                    <Button onClick={() => handleOpen(post)}>Edit</Button>
                    <Modal
                      open={openPostId === post.id}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                          />
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={4}
                            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                          />
                          <Button variant="contained" color="primary" onClick={async () => {
                            const edit = JSON.stringify({
                              title: editTitle,
                              content: editContent,
                              status: post.status,
                            })
                            const response = await fetch(`http://localhost:5173/api/post/${post.id}`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: edit,
                            });
                            if (response.ok) {
                              setPosts(prevPosts =>
                                prevPosts.map(p =>
                                  p.id === post.id
                                    ? { ...p, title: editTitle, content: editContent }
                                    : p
                                )
                              );
                            }
                            handleClose();
                          }}>Update</Button>
                          <Button onClick={handleClose}>Cancel</Button>
                        </Typography>
                      </Box>
                    </Modal>
                    <Button variant="contained" color="error" onClick={(e) => {
                      e.stopPropagation();
                      deletePost(post.id);
                    }}>
                      Delete
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    ) : (
      <Box sx={{ flexGrow: 1, width: '100%', p: 2 }}>
        <Typography>No posts found.</Typography>
      </Box>
    )
  )
}

