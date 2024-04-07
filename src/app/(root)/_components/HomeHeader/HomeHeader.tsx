import Image from "next/image";

function HomeHeader() {
  return (
    <header className="flex flex-col w-[100%] items-center h-[361px] sm:h-[260px]  z-40">
      <h2 className="text-[70px] font-['GmarketSansMedium'] m-0 relative right-[260px] sm:text-[40px] sm:right-0 md:text-[60px] md:right-48">
        <span className="text-[#fccf21]">오늘</span> 뭐 먹지?
      </h2>
      <div className="flex -mt-2 sm:mt-5 md:mt-1">
        <div className="">
          <Image
            src={`/images/main-image.png`}
            alt="main"
            width={389}
            height={528}
            className="sm:w-[100%]"
            priority
          />
        </div>

        <div className="text-[33px] absolute ml-[400px] mt-4 sm:hidden md:hidden">
          <p>무슨 음식을 먹을지</p>
          <p>고민될 때</p>
          <p>
            <span className="text-[#6ddb78] font-extrabold">투잇</span>으로
            골라보세요
          </p>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
