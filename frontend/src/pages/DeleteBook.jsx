import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios.delete(`http://localhost:2000/books/${id}`)
          .then(() => {
            setLoading(false);
            Swal.fire({
              title: "Deleted!",
              text: "Your book has been deleted.",
              icon: "success"
            }).then(() => {
              navigate('/');
            });
          })
          .catch((error) => {
            setLoading(false);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting. Please check the console.",
              icon: "error"
            });
            console.log(error);
          });
      }
    });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl mb-4'>Are you sure you want to delete this book?</h3>
        <button
          className='p-4 bg-red-600 text-white rounded-lg w-full hover:bg-red-700 transition duration-300'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
