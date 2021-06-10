import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useHistory, useParams } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function PostEditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const request = axios.get(`http://localhost:4000/posts/${postId}`)
    request.then((res) => {
      setPost(res.data)
      setTitle(res.data.title);
      setCoverUrl(res.data.coverUrl);
      setContent(res.data.content);
    })
    request.catch((err) => {
      alert("Ocorreu um erro inesperado")
    })   
  }, [postId]);

  

  function onPostSaveButtonClick() {
    setSaveButtonDisable(true)
    const body = {
      title,
      coverUrl,
      content
    }
    const request = axios.put(`http://localhost:4000/posts/${postId}`, body)
    request.then((res) => {
      setSaveButtonDisable(false)
      history.push("/")
    })
    request.catch((err) => {
      setSaveButtonDisable(false)
      alert("Ocorreu um erro inesperado")
    })
  }

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
      isSaveButtonDisabled={isSaveButtonDisabled}
    />
  );
}
