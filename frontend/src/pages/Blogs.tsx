import { BlogCard } from "./BlogCard";

const blogData = [
  {
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
  const handleReadMore = () => {
    console.log("Read more clicked!");
  };

  return (
    <section className="bg-print text-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold font-nunito text-[#39FF14] drop-shadow-[0_0_10px_#39FF14]">
            Latest Defense Stories
          </h2>
          <p className="mt-2 font-roboto text-white/70 text-lg">
            Explore tales of courage and power from our Army, Navy, and Air
            Force.
          </p>
        </div>

        <div className="space-y-10">
          {blogData.map((blog, index) => (
            <BlogCard key={index} {...blog} onReadMore={handleReadMore} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
