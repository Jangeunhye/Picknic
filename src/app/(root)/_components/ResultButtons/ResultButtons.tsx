import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

function ResultButtons({
  isMapVisible,
  setIsMapVisible,
  setReLoad,
}: {
  isMapVisible: boolean;
  setIsMapVisible: Dispatch<SetStateAction<boolean>>;
  setReLoad: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = () => {
    setIsMapVisible((current) => !current);
  };

  return (
    <div className="flex justify-center items-center sm:mt-8 mt-20 gap-32 sm:w-full sm:justify-around sm:gap-0">
      <Link
        href="/"
        className="flex items-center gap-4 sm:gap-1 bg-white sm:w-28 sm:h-12 w-[180px] justify-center h-[60px] rounded-[50px]"
      >
        <div className="text-[25px] text-[#696969] sm:text-[15px]">
          다시 선택
        </div>
        <div className="relative w-[25px] h-[35px] sm:w-[25px] sm:h-[20px]">
          <Image
            src="/images/체크.png"
            alt="again"
            fill
            className="scale-75 overflow-visible object-cover"
          />
        </div>
      </Link>
      <button
        onClick={() => setReLoad((current) => !current)}
        className="w-[60px] h-[60px] sm:w-10 sm:h-10  bg-[#ffcd22] rounded-[50%]"
      >
        <div className="w-10 mx-auto h-[37px] sm:w-7 sm:h-7 relative">
          <Image
            src="/images/새로고침.png"
            alt="reload"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={60}
            height={60}
            className="object-cover"
          />
        </div>
      </button>
      <button
        onClick={handleClick}
        className="flex items-center gap-4 sm:gap-1 bg-white sm:w-28 sm:h-12 w-[180px] justify-center h-[60px] rounded-[50px]"
      >
        <div className="text-[25px] text-[#696969] sm:text-[15px]">
          {isMapVisible ? "지도 닫기" : "지도 보기"}
        </div>
        <div className="w-[25px] h-[35px] relative sm:w-[25px] sm:h-[33px]">
          <Image
            src="/images/지도.png"
            alt="map"
            fill
            className="scale-75 object-cover"
          />
        </div>
      </button>
    </div>
  );
}

export default ResultButtons;
