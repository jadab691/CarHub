import React, { useRef } from "react";
import carhub from "../../public/carhub.jpg";

function Banner() {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 30;
    const y = ((e.clientY - top) / height - 0.5) * 30;
    imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
  };

  const resetPosition = () => {
    imgRef.current.style.transform = "translate(0px, 0px) scale(1)";
  };

  return (
    <>
      <div className="max-w-screen-2xl pt-24 pb-12 container mx-auto md:px-20 px-4 flex flex-col md:flex-row md:items-center md:mt-6 md:mb-16 gap-10">
        <div className="w-full md:w-1/2 order-2 md:order-0">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm mb-6">
            Trusted marketplace for modern car buyers and sellers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-5">
            Find the right car with confidence.
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-xl">
            Discover a refined selection of vehicles, browse verified listings,
            and connect with a smoother buying or selling experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/cars"
              className="rounded-full bg-blue-600 px-5 py-3 text-white shadow-sm hover:bg-blue-700"
            >
              Explore Cars
            </a>
            <a
              href="/buysale"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-slate-700 hover:bg-slate-50"
            >
              Start Selling
            </a>
          </div>
        </div>

        <div
          className="w-full md:w-1/2 flex justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={resetPosition}
        >
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <img
              ref={imgRef}
              src={carhub}
              alt="CarHub"
              className="rounded-[1.5rem] object-cover transition-transform duration-500 ease-out"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200" />
    </>
  );
}

export default Banner;
