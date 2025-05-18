// pages/CreateBlog.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateBlog = async () => {
    if (!title || !content) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if your API uses auth
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!res.ok) throw new Error("Failed to create blog");
      const data = await res.json();
      navigate(`/blog/${data.id}`);
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2c003e] min-h-screen text-white">
      <AppBar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-6">Create Blog</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 bg-white text-black mb-4 rounded"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full p-4 bg-white text-black mb-4 rounded"
        />

        <button
          onClick={handleCreateBlog}
          disabled={loading}
          className="bg-white text-[#2c003e] px-6 py-3 rounded hover:bg-green-400 transition"
        >
          {loading ? "Posting..." : "Publish Blog"}
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
