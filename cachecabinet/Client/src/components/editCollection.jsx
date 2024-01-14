import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Navigate } from 'react-router-dom';
//import ReactQuill from 'react-quill';

function EditCollection({ id }) {
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState(null);

  useEffect(() => {
    fetch(`/editCollection/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch collection');
        }
        return response.json();
      })
      .then(collectionInfo => {
        setTitle(collectionInfo.title);
        setContent(collectionInfo.content);
        setDescription(collectionInfo.description);
      })
      .catch(error => {
        console.error('Error fetching collection:', error);
      });
  }, [id]);

  const [login, { data }] = useMutation(LOGIN_USER);

  const editCollection = async (event) => {
    event.preventDefault();
    
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      AuthService.login(token);
      setRedirect(true);
    } catch (e) {
      console.log(e);
    }
  };

  if (redirect) {
    return <Navigate to={'/collection/' + id} />;
  }

  return (
    <div className='editCollection'>
      <form onSubmit={editCollection}>
        <input
          type="text"
          placeholder={"Collection Name"}
          value={title}
          onChange={ev => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder={"Description"}
          value={description}
          onChange={ev => setDescription(ev.target.value)}
        />
        <input
          type="file"
          onChange={ev => setFiles(ev.target.files)}
        />
        {/*<ReactQuill
          placeholder={"Additional Details"}
          value={content}
          onChange={newValue => setContent(newValue)}
  />*/}
        <button style={{ marginTop: '15px' }}>Update Collection</button>
      </form>
    </div>
  );
}

export default EditCollection;
