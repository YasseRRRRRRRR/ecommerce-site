import Image from "next/image";
import React from "react";

const CascadingAvalanch = () => {
  const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Original array of image indices
  const originalImages = [1, 2, 3, 4, 5, 6];

  // Shuffle the array
  const shuffledImages = originalImages.sort(() => Math.random() - 0.5);

  return (
    <>
      <div className=" w-[400px] overflow-hidden wrapper flex justify-center">
        {shuffledImages.slice(0, 3).map((imageIndex, i) => (
          <div
            style={{
              animationDelay: `calc(15s / 3 * (${3 - i} - 1) * -1)`,
            }}
            className="item border-2 border-red-600 overflow-hidden"
            key={i}
          >
            <Image
              width={300}
              height={400}
              src={`/testimonials/${imageIndex}.jpg`}
              alt="Satisfied Customers"
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="w-[400px] overflow-hidden wrapper hidden xl:flex justify-center">
        {shuffledImages.slice(3).map((imageIndex, i) => (
          <div
            style={{
              animationDelay: `calc(15s / 3 * (${3 - i} - 1) * -1)`,
            }}
            className="reverse-item border-2 border-red-600 overflow-hidden"
            key={i}
          >
            <Image
              width={300}
              height={400}
              src={`/testimonials/${imageIndex}.jpg`}
              alt="Satisfied Customers"
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CascadingAvalanch;
