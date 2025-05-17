import Auth from "../components/Auth";
import Quotes from "../components/Quotes";

const Signup = () => {
  return (
    <div className="md:h-screen w-full bg-print grid md:grid-cols-2">
      {/* Left - Quotes Section */}
      <div className="flex flex-col  bg-[#00000094] items-center justify-center py-6 md:py-0">
        <Quotes />
      </div>

      {/* Right - Auth Section */}
      <div className="flex flex-col items-center pb-6 bg-[#00000094]  justify-center md:py-0">
        <Auth />
      </div>
    </div>
  );
};

export default Signup;
