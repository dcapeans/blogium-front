import React, { useState, useEffect } from 'react';
import PostList from './PostList/PostList';
import axios from 'axios';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const request = axios.get("http://localhost:4000/posts")
    request.then((res) => {
      setPosts(res.data)
    })
    request.catch((err) => {
      alert("Ocorreu um erro inesperado")
    })

  }, []);

  return (
    <PostList name="Daily stories" posts={posts} />
  );
}
