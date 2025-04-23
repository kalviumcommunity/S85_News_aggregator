import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const NewsListPage = () => {
  const [newsList, setNewsList] = useState([]);

  const fetchNews = async () => {
    const res = await fetch("http://localhost:5000/api/news");
    const data = await res.json();
    setNewsList(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this news?");
    if (!confirmed) return;

    const res = await fetch(`http://localhost:5000/api/news/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setNewsList(prev => prev.filter(item => item._id !== id));
    } else {
      alert("Failed to delete the news.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">📰 News Feed</h2>
      <div className="grid gap-4">
        {newsList.length === 0 ? (
          <p>No news available yet.</p>
        ) : (
          newsList.map((item) => (
            <NewsCard key={item._id} {...item} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default NewsListPage;


// import { useEffect, useState } from "react";
// import NewsCard from "../components/NewsCard";

// const NewsListPage = () => {
//   const [newsList, setNewsList] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/news")
//       .then((res) => res.json())
//       .then((data) => setNewsList(data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">📰 News Feed</h2>
//       <div className="grid gap-4">
//         {newsList.length === 0 ? (
//           <p>No news available yet.</p>
//         ) : (
//           newsList.map((item) => <NewsCard key={item._id} {...item} />)
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewsListPage;
