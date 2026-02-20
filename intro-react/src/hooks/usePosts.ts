import { useCallback, useEffect } from "react";
import type { PostListResponse } from "../types";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { postActions } from "../store/postSlice";

export function usePosts(){
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.post.posts);
    const dataState = useAppSelector((state) => state.post.dataState);

    const reload = useCallback(async () => {
        dispatch(postActions.setDataState('loading'));
        try {
            const response = await fetch('http://localhost:5173/api/post');
            if(response.status !== 200){
                dispatch(postActions.setDataState('error'));
                return;
            }
            const data: PostListResponse = await response.json();
            dispatch(postActions.setPosts(data));
            dispatch(postActions.setDataState('fulfilled'));
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            dispatch(postActions.setDataState('error'));
        }
    }, [dispatch]);

    // Auto-fetch on mount if not already loaded
    useEffect(() => {
        if (dataState === 'pending') {
            reload();
        }
    }, [dataState, reload]);

    return {
        posts: posts?.records || [],
        count: posts?.info.count || 0,
        state: dataState || 'pending',
        reload
    };
}