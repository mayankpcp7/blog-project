export default function Quotes() {
  return (
    <div className="w-full h-full lg:px-6 py-8 flex items-center justify-center">
      <div className="w-full h-full p-8 flex flex-col justify-center">
        {/* Title */}
        <h1 className="text-xl sm:text-3xl lg:text-4xl italic font-bold uppercase font-roboto tracking-wide text-white text-center drop-shadow-[0_0_12px_#2c003e]">
          Echoes of Valor,
          <br />
          Words of Warriors
        </h1>

        {/* Quote */}
        <p className="mt-2 text-white text-center font-roboto text-base md:text-lg drop-shadow-[0_0_6px_#2c003e]">
          Let your courage speak loud in silence,
          <br />
          let your words echo through time.
        </p>

        {/* Note */}
        <div className="mt-8 bg-white/10 border max-w-[500px] mx-auto border-white/20 backdrop-blur-md p-4 rounded-xl text-center text-sm text-white shadow-[0_0_8px_#ffffff50]">
          <p className="font-semibold uppercase text-sm md:text-lg tracking-wide">Note:</p>
          <p className="mt-1 font-roboto">
            Any kind of <span className="text-red-400 font-bold">abusive</span>{" "}
            or
            <span className="text-pink-400 font-bold">
              {" "}
              nudity-related language
            </span>{" "}
            is strictly prohibited. Let your words reflect dignity and honor.
          </p>
        </div>
      </div>
    </div>
  );
}
