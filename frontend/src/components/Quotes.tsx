export default function Quotes() {
  return (
    <div className="w-full h-full lg:px-6 py-8 flex items-center justify-center">
      <div className="w-full h-full p-8 flex flex-col justify-center">
        {/* Image Section */}
        <div className="flex justify-center mb-6">
          <img
            src="http://clipart-library.com/images/riLo5rk8T.jpg" // Replace with your path or URL
            alt="Warrior"
            className=" max-w-[200px] sm:max-w-[300px]  object-cover rounded-full border-4 border-[#39FF14] shadow-[0_0_20px_#39FF14] drop-shadow-[0_0_10px_#ffff]"
          />
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold uppercase font-roboto tracking-wide text-white text-center drop-shadow-[0_0_12px_#39FF14]">
          Echoes of Valor,
          <br />
          Words of Warriors
        </h1>

        {/* Quote */}
        <p className="mt-2 text-white text-center font-roboto text-base md:text-lg drop-shadow-[0_0_6px_#39FF14]">
          Let your courage speak loud in silence,
          <br />
          let your words echo through time.
        </p>
      </div>
    </div>
  );
}
