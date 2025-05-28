import React from "react";
import { CgArrowDownR } from "react-icons/cg";

export default function CarouselSensor2({ items, currentIndex, onNext, onPrev }) {
  const currentItem = items[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center !mt-20 p-8 bg-[#F9F9F9] rounded-lg max-w-[1650px] relative">
      <div className="flex w-full items-start justify-between">
        <div className="max-w-[1200px] pr-8">
          <p className="text-black font-thin text-[32px] league-regular !ml-40 !mt-10">
            {currentItem.text}
          </p>
        </div>

        <div className="flex mt-4 justify-end w-full">
          <div className="!mr-15">
            <button onClick={onPrev} className="!mr-2">
              <CgArrowDownR className="text-black text-2xl transform rotate-90 cursor-pointer hover:text-[#17CF96]" />
            </button>
            <button onClick={onNext} className="!mr-2 !mt-80">
              <CgArrowDownR className="text-black text-2xl transform -rotate-90 cursor-pointer hover:text-[#17CF96]" />
            </button>
          </div>
        </div>

        <div className="w-300">
          <img
            src={currentItem.image}
            alt="Carrossel Item"
            className="rounded-lg object-cover w-full h-95"
          />
        </div>
      </div>
    </div>
  );
}
