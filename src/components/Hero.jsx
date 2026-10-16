export function Hero() {
  return (
    <section 
      id="hero" 
      className="relative bg-slate-900 text-white py-24 sm:py-32 flex items-center justify-center min-h-[80vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.65)), url("./public/image/BackImage.avif")`
      }}
    >
      <div className="max-w-full w-full mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Discover Your Next Unforgettable Journey
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto">
            Explore handpicked destinations, custom tour packages, and unique travel experiences around the globe.
          </p>
          <div className="pt-2">
            <a 
              href="#packages" 
              className="inline-block bg-sky-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:bg-sky-700 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Explore Packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}