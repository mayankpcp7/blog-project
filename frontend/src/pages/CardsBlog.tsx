import React from "react";

export type BlogCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  authorImage: string;
  date: string;
  onReadMore: (id: string) => void;
};

export const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  authorName,
  authorImage,
  date,
  onReadMore,
}) => {
  return (
    <div className="bg-white border border-[#2c003e] rounded-2xl shadow-[0_0_20px_#2c003e60] hover:shadow-[0_0_30px_#2c003e80] transition duration-300 overflow-hidden flex flex-col-reverse md:flex-row">
      {/* Left Side - Content */}
      <div className="p-6 md:w-2/3 space-y-3 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-[#2c003e] font-nunito drop-shadow-[0_0_6px_#2c003e50]">
          {title}
        </h3>
        <p className="text-[#4b006a] font-roboto">{description}</p>

        <div className="flex items-center mt-4">
          <img
            src={authorImage}
            alt={authorName}
            className="w-10 h-10 rounded-full border border-[#2c003e] mr-3"
          />
          <div>
            <p className="text-sm text-[#2c003e] font-nunito font-semibold">
              {authorName}
            </p>
            <p className="text-xs text-[#6b006b] font-roboto font-semibold">
              Published on: {date}
            </p>
          </div>
        </div>

        <button
          onClick={() => onReadMore(id)}
          className="mt-4 w-fit px-4 py-2 bg-[#2c003e] text-white font-roboto font-semibold rounded hover:bg-[#39ff14] hover:text-black transition duration-300 shadow-[0_0_10px_#2c003e80]"
        >
          Read More
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/3 h-64 md:h-auto">
        <img
          src={imageUrl}
          alt="Blog Visual"
          className="w-full h-full object-cover border shadow-[0_0_10px_#2c003e] border-[#2c003e] md:rounded-r-2xl md:rounded-l-none rounded-b-2xl"
        />
      </div>
    </div>
  );
};

export default BlogCard;
