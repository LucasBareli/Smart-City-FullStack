import React from "react";

export default function CarouselSensor({ images, currentIndex, setCurrentIndex }) {
  const bigImage = images[currentIndex];

  return (
    <div className="flex justify-center items-center w-full !mt-10">
      <div className="flex items-center w-full max-w-[1200px]">
        <div className="relative w-[430px] h-[650px] rounded-lg overflow-hidden">
          <img
            src={bigImage.src}
            alt={bigImage.alt}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center !ml-10 !mt-20">
          <h2 className="text-[58px] font-semibold league-regular text-[#3C096C] leading-tight text-left max-w-[650px]">
            {bigImage.title}
          </h2>
          <p className="text-black font-thin league-regular text-[22px] !mt-4 text-left max-w-[900px]">
            {bigImage.text}
          </p>

          <div className="flex space-x-8 gap-7 !mt-10">
            {images.map(({ src, alt, label }, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-1 cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-40 h-40 rounded-lg object-cover !mt-40"
                />
                <span className="text-[16px] text-black league-regular font-bold">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
