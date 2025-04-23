// src/pages/EditNewsPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    publishedAt: "",
    url: "",
    category: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          author: data.author || "",
          content: data.content || "",
          publishedAt: data.publishedAt?.slice(0, 10) || "",
          url: data.url || "",
          category: data.category || "",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      navigate("/news");
    } else {
      alert("Failed to update news.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">✏️ Edit News</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="title" placeholder="Title" onChange={handleChange} value={formData.title} className="border p-2 rounded" />
        <input name="author" placeholder="Author" onChange={handleChange} value={formData.author} className="border p-2 rounded" />
        <input name="content" placeholder="Content" onChange={handleChange} value={formData.content} className="border p-2 rounded" />
        <input name="publishedAt" placeholder="Date" type="date" onChange={handleChange} value={formData.publishedAt} className="border p-2 rounded" />
        <input name="url" placeholder="Image/URL" onChange={handleChange} value={formData.url} className="border p-2 rounded" />
        <input name="category" placeholder="Category" onChange={handleChange} value={formData.category} className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
};
export default EditNewsPage;
