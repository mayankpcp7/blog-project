// Blogs.tsx
import { BlogCard } from "./CardsBlog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar";

const blogData = [
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
  {
    id: "ins-vikrant",
    title: "INS Vikrant: Powerhouse on Sea",
    description:
      "Take a deep dive into India's first indigenous aircraft carrier and what it means for national defense.",
    imageUrl:
      "https://www.slashgear.com/img/gallery/ins-vikrant-a-look-at-indias-destructive-and-massive-aircraft-carrier/the-courageous-ins-vikrant-is-armed-to-the-teeth-1747095699.jpg",
    authorImage: "https://randomuser.me/api/portraits/men/61.jpg",
    authorName: "Cmdr. Nikhil Rao",
    date: "March 18, 2024",
  },
  {
    id: "iaf-mirage-kargil",
    title: "IAF Mirage 2000 in Kargil",
    description:
      "Revisit the vital role of Mirage 2000 fighter jets in turning the tide during the Kargil conflict.",
    imageUrl:
      "https://tse4.mm.bing.net/th?id=OIP.WEv9Ft73nepvSkguGFyDpwHaFA&pid=Api&P=0&h=180",
    authorImage: "https://randomuser.me/api/portraits/men/45.jpg",
    authorName: "Group Captain Neeraj",
    date: "February 25, 2024",
  },
  {
    id: "submarine-warfare",
    title: "Submarine Warfare: India's Silent Warriors",
    description:
      "Discover how India’s navy silently secures the nation's maritime borders through its advanced submarines.",
    imageUrl:
      "https://tse4.mm.bing.net/th?id=OIP.jhs3BFfcV4waMiMyyZ6wJwHaEK&pid=Api&P=0&h=180",
    authorImage: "https://randomuser.me/api/portraits/men/73.jpg",
    authorName: "Lt. Aditya Singh",
    date: "January 15, 2024",
  },
  {
    id: "sarang-display-team",
    title: "Sarang Helicopter Display Team",
    description:
      "Get amazed by the aerial acrobatics of the Indian Air Force's Sarang helicopter team.",
    imageUrl:
      "https://www.ssbcrack.com/wp-content/uploads/2024/02/Sarang_Display_Team-.jpeg",
    authorImage: "https://randomuser.me/api/portraits/women/30.jpg",
    authorName: "Squadron Leader Anjali Rao",
    date: "December 3, 2023",
  },
];

export const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [createdBlogs, setCreatedBlogs] = useState([]);
  const navigate = useNavigate();

  const handleReadMore = (id: string) => {
    navigate(`/blog/${id}`);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setCreatedBlogs(data);
      } catch (error) {
        console.error("Failed to fetch created blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="relative text-white content-layer">
      {/* App Bar */}
      <AppBar />

      {/* Loader or Blog Content */}
      {loading ? (
        <div className="relative flex justify-center items-center h-[calc(100vh-80px)] z-10">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <section className="relative py-16 px-4 z-10 max-w-6xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold font-nunito text-white drop-shadow-[0_0_10px_#2c003e]">
              Latest Defense Stories
            </h2>
            <p className="mt-2 font-roboto text-white/70 text-lg">
              Explore tales of courage and power from our Army, Navy, and Air
              Force.
            </p>
          </div>

          <div
            className="space-y-10"
          >
            {[...createdBlogs, ...blogData].map((blog, index) => (
              <BlogCard
                key={index}
                {...blog}
                id={blog.id}
                onReadMore={() => handleReadMore(blog.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Custom scrollbar styles */}
      <style>{`
        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #2c003e transparent;
        }
        /* Chrome, Edge, Safari */
        *::-webkit-scrollbar {
          width: 8px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background-color: #2c003e;
          border-radius: 10px;
          border: 2px solid transparent;
        }
      `}</style>
    </div>
  );
};

export default Blogs;
