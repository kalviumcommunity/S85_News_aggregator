import { useNavigate } from "react-router-dom";

const NewsCard = ({ _id, title, content, author, url, publishedAt, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm">
        {author || "Unknown"} | {new Date(publishedAt).toLocaleDateString()}
      </p>
      <p className="mt-2">{content}</p>
      <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline block mt-2">
        Read More
      </a>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => navigate(`/edit/${_id}`)}
          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(_id)}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NewsCard;


// const NewsCard = ({ _id, title, content, author, url, publishedAt, onDelete }) => {
//     return (
//       <div className="p-4 border rounded bg-white shadow">
//         <h3 className="text-xl font-semibold">{title}</h3>
//         <p className="text-gray-600 text-sm">{author || "Unknown"} | {new Date(publishedAt).toLocaleDateString()}</p>
//         <p className="mt-2">{content}</p>
//         <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline block mt-2">Read More</a>
  
//         <button
//           onClick={() => onDelete(_id)}
//           className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
//         >
//           Delete
//         </button>
//       </div>
//     );
//   };
  
//   export default NewsCard;
  

// const NewsCard = ({ title, author, content, publishedAt, url }) => {
//     return (
//       <div className="bg-white shadow-md border rounded-lg p-4">
//         <h3 className="text-xl font-semibold">{title}</h3>
//         <p className="text-sm text-gray-600">{author} • {new Date(publishedAt).toLocaleDateString()}</p>
//         <p className="mt-2 text-gray-800">{content}</p>
//         {url && <img src={url} alt="News" className="mt-4 rounded" />}
//       </div>
//     );
//   };
  
//   export default NewsCard;
  