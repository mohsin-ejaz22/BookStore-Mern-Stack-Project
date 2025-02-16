import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State for errors
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!title.trim()) formErrors.title = "Title is required.";
    if (!author.trim()) formErrors.author = "Author is required.";
    if (!publishYear) formErrors.publishYear = "Publish Year is required.";
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSaveBook = () => {
    if (!validateForm()) return; // Stop submission if validation fails

    const data = { title, author, publishYear };
    setLoading(true);

    axios.post('http://localhost:2000/books', data)
      .then(() => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your book has been added successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 409) {
          setErrors({ title: "A book with this title already exists." });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`border-2 px-4 py-2 w-full ${errors.title ? 'border-red-500' : 'border-gray-500'}`}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div className='my-4'>
          <label className='text-xl text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={`border-2 px-4 py-2 w-full ${errors.author ? 'border-red-500' : 'border-gray-500'}`}
          />
          {errors.author && <p className="text-red-500">{errors.author}</p>}
        </div>

        <div className='my-4'>
          <label className='text-xl text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className={`border-2 px-4 py-2 w-full ${errors.publishYear ? 'border-red-500' : 'border-gray-500'}`}
          />
          {errors.publishYear && <p className="text-red-500">{errors.publishYear}</p>}
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
