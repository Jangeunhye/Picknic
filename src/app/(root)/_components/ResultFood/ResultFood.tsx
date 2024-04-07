import Image from "next/image";

function ResultFood({ finalFood }: { finalFood: string }) {
  return (
    <div className="font-semibold text-[65px] flex items-center gap-28 justify-center mx-auto w-[1100px] h-[400px] bg-white rounded-[50px]">
      <div>
        <p>지금</p>
        <p className="text-[#fccf21]">{finalFood}</p>
        <p>먹는건 어때?</p>
      </div>
      <div className="relative overflow-hidden rounded-[50%]  gradient-background-image w-[300px] h-[300px]">
        <Image
          src={`/images/foodImages/${finalFood}.webp`}
          alt="food"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
}

export default ResultFood;
