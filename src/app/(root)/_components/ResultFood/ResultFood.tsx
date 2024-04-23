import Image from "next/image";

function ResultFood({ finalFood }: { finalFood: string }) {
  return (
    <div className="font-semibold text-[65px] flex items-center gap-28 justify-center mx-auto w-[1000px] md:w-full sm:w-full sm:justify-around  sm:text-3xl sm:gap-0 sm:h-56 sm:mx-auto md:text-6xl  h-[400px] bg-white rounded-[50px]">
      <div>
        <p>지금</p>
        <p className="text-[#fccf21]">{finalFood}</p>
        <p>먹는건 어때?</p>
      </div>
      <div className="relative overflow-hidden rounded-[50%] gradient-background-image w-[300px] h-[300px] sm:w-[150px] sm:h-[150px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_URL}/images/foodImages/${finalFood}.webp`}
          alt="food"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

export default ResultFood;
