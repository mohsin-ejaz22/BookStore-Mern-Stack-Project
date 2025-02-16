import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-2  border-gray-500 rounded-lg px-3 py-2 m-4 relative hover:shadow-xl overflow-hidden ">
      <h2 className="absolute top-3 right-2 px-2 py-0.5 bg-red-300 rounded-lg">
        {book.publishYear}
      </h2>
      <h4 className="my-2 text-gray-500 text-sm break-all">{book._id}</h4>

      <div className="flex justify-start items-center gap-x-2 overflow-hidden">
        <PiBookOpenTextLight className="text-red-300 text-2xl shrink-0" />
        <h2 className="my-1 text-sm text-ellipsis overflow-hidden">
          {book.title}
        </h2>
      </div>

      <div className="flex justify-start items-center gap-x-2 overflow-hidden">
        <BiUserCircle className="text-red-300 text-2xl shrink-0" />
        <h2 className="my-1 text-sm text-ellipsis overflow-hidden">
          {book.author}
        </h2>
      </div>

      <div className="flex justify-between items-center gap-x-4 mt-4 p-4 flex-wrap">
        <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
        </Link>
      </div>

      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookSingleCard;
