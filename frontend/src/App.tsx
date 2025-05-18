import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Create from "./pages/CreateBlog";
import Feed from "./pages/Feed";
import MyBlogs from "./pages/MyBlogs"; // ✅ new
import EditBlog from "./pages/EditBlog";// ✅ new

function App() {
  return (
    <div className="min-h-screen bg-[#2c003e] text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
