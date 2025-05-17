// BlogCard.tsx
import React from "react";

export type BlogCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  date: string;
  onReadMore: () => void;
};

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  imageUrl,
  authorName,
  authorImage,
  date,
  onReadMore,
}) => {
  return (
    <div className="bg-print bg-[#00000094] bg-cover bg-center border border-[#39FF14] rounded-2xl shadow-[0_0_20px_#39FF14] hover:shadow-[0_0_30px_#39FF14] transition duration-300 overflow-hidden flex flex-col-reverse md:flex-row">
      {/* Left Side - Content */}
      <div className="p-6 md:w-2/3 bg-[#00000094]  space-y-3 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white font-nunito drop-shadow-[0_0_8px_#39FF14]">
          {title}
        </h3>
        <p className="text-white/80 font-roboto">{description}</p>

        <div className="flex items-center mt-4">
          <img
            src={authorImage}
            alt={authorName}
            className="w-10 h-10 rounded-full border border-[#39FF14] mr-3"
          />
          <div>
            <p className="text-sm text-white font-nunito font-semibold">
              {authorName}
            </p>
            <p className="text-xs text-white/60 font-roboto font-semibold">
              Published on: {date}
            </p>
          </div>
        </div>

        <button
          onClick={onReadMore}
          className="mt-4 w-fit px-4 py-2 bg-[#39FF14] font-roboto text-black font-semibold rounded hover:bg-[#2aff10] transition duration-300 shadow-[0_0_10px_#39FF14]"
        >
          Read More
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/3 bg-[#00000094] h-64 md:h-auto">
        <img
          src={imageUrl}
          alt="Blog Visual"
          className="w-full h-full object-cover border shadow-[0_0_10px_#39FF14] border-[#39FF14] md:rounded-r-2xl md:rounded-l-none rounded-b-2xl"
        />
      </div>
    </div>
  );
};

export default BlogCard;
