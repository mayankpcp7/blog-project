import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";
import { BlogCard } from "./CardsBlog";

type Blog = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    try {
      const res = await fetch("http://localhost:8787/myblogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch my blogs");

      const data = await res.json();
      console.log("Fetched blogs:", data); // Debug line
      setBlogs(data);
    } catch (err) {
      alert("Could not load your blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="bg-[#2c003e] min-h-screen text-white">
      <AppBar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-10">My Blogs</h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center">You haven't published any blogs yet.</p>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title ?? "Untitled"}
                description={
                  blog.content
                    ? blog.content.slice(0, 150) + "..."
                    : "No content available"
                }
                authorName="You"
                authorImage="https://randomuser.me/api/portraits/men/99.jpg"
                date={new Date(blog.createdAt).toLocaleDateString()}
                imageUrl="https://source.unsplash.com/random/800x400?military"
                onReadMore={() => navigate(`/blog/${blog.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
