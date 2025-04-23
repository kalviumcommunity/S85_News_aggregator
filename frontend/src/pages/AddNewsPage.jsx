import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    source: "", // ✅ added
    publishedAt: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation to prevent empty submissions
    if (!formData.title || !formData.content || !formData.source || !formData.image) {
      alert("Please fill in title, content, source and image (used as URL).");
      return;
    }

    const payload = {
      title: formData.title,
      author: formData.author,
      content: formData.content,
      source: formData.source, // ✅ now added
      publishedAt: formData.publishedAt,
      url: formData.image, // ✅ matches schema field
    };

    try {
      const res = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        navigate("/news");
      } else {
        const errorData = await res.json();
        console.error("Error:", errorData);
        alert("Failed to submit news.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Server error, please try again later.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">➕ Add News</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="title" placeholder="Title" onChange={handleChange} value={formData.title} className="border p-2 rounded" />
        <input name="author" placeholder="Author" onChange={handleChange} value={formData.author} className="border p-2 rounded" />
        <input name="content" placeholder="Content" onChange={handleChange} value={formData.content} className="border p-2 rounded" />
        <input name="source" placeholder="Source (e.g. BBC)" onChange={handleChange} value={formData.source} className="border p-2 rounded" />
        <input name="publishedAt" placeholder="Date (optional)" onChange={handleChange} value={formData.publishedAt} className="border p-2 rounded" />
        <input name="image" placeholder="URL to article (must be unique)" onChange={handleChange} value={formData.image} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddNewsPage;
