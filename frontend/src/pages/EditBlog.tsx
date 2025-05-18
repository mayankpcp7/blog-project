import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Blog {
  title: string;
  content: string;
}

function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog>({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/blog/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog({ title: data.title, content: data.content });
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to load blog for editing.");
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, ...blog }),
      });

      const result = await res.json();

      if (res.ok) {
        navigate(`/blog/${id}`);
      } else {
        alert(result?.error || "Failed to update blog.");
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("An error occurred while updating the blog.");
    }
  };

  if (loading) return <div className="p-4">Loading blog...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          rows={10}
          placeholder="Content"
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />
        <button
          type="submit"
          className="bg-green-500 px-5 py-2 rounded hover:bg-green-600"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
