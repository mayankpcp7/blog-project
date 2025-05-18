import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogCard } from "./CardsBlog";
import AppBar from "../components/AppBar";

const staticBlogs = [
  {
    id: "operation-sindoor",
    title: "Operation Sindoor: Bravery Beyond Borders",
    description:
      "Operation Sindoor showcased the relentless spirit of the Indian Army during a daring cross-border rescue mission.",
    imageUrl:
      "https://english.cdn.zeenews.com/sites/default/files/2025/05/09/1745570-operation-sindoor.png",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    authorName: "Captain Arjun Mehra",
    date: "May 12, 2024",
  },
  {
    id: "guardians-of-the-sky",
    title: "Guardians of the Sky: Inside the IAF",
    description:
      "Explore how the Indian Air Force dominates the skies with cutting-edge aircraft and courageous pilots.",
    imageUrl:
      "https://tse2.mm.bing.net/th?id=OIF.UfjAkEN%2bDpNToLSRXzeW3w&pid=Api&P=0&h=180",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    authorName: "Wing Cmdr. Ritu Sharma",
    date: "April 20, 2024",
  },
  // add the rest of your static blogs here...
];

export const Feed = () => {
  const [createdBlogs, setCreatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch created blogs from your backend API
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setCreatedBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch created blogs:", err);
        setLoading(false);
      });
  }, []);

  const handleReadMore = (id: string) => {
    navigate(`/blog/${id}`);
  };

  const handleCreatePost = () => {
    navigate("/create");
  };

  return (
    <div className="bg-[#2c003e] text-white min-h-screen">
      {/* App Bar */}
    <AppBar/>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold font-nunito text-white drop-shadow-[0_0_10px_#2c003e]">
                Latest Defense Stories
              </h2>
              <p className="mt-2 font-roboto text-white/70 text-lg">
                Explore tales of courage and power from our Army, Navy, and Air
                Force.
              </p>
            </div>

            <div className="space-y-10">
              {/* Static blogs */}
              {staticBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  {...blog}
                  id={blog.id}
                  onReadMore={() => handleReadMore(blog.id)}
                />
              ))}

              {/* Created blogs */}
              {createdBlogs.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold mt-12 text-[#2c003e]">
                    User Created Blogs
                  </h3>
                  {createdBlogs.map((blog: any) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      title={blog.title}
                      description={blog.content.slice(0, 150) + "..."}
                      imageUrl={
                        blog.imageUrl || "https://via.placeholder.com/400x200"
                      }
                      authorImage={
                        blog.authorImage ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      authorName={blog.authorName || "Anonymous"}
                      date={new Date(blog.createdAt).toLocaleDateString()}
                      onReadMore={() => handleReadMore(blog.id)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Feed;
