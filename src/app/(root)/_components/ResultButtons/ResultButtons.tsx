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
    <div className="flex justify-center mt-20 gap-32">
      <Link
        href="/"
        className="flex items-center gap-4 bg-white w-[180px] justify-center h-[60px] rounded-[50px]"
      >
        <div className="text-[25px] text-[#696969]">다시 선택</div>
        <div className="relative w-[25px] h-[35px]">
          <Image
            src="/images/체크.png"
            alt="again"
            layout="fill"
            objectFit="cover"
            className="scale-75 overflow-visible"
          />
        </div>
      </Link>
      <button
        onClick={() => setReLoad((current) => !current)}
        className="w-[60px] h-[60px] bg-[#ffcd22] rounded-[50%]"
      >
        <div className="w-10 mx-auto h-[37px] relative">
          <Image
            src="/images/새로고침.png"
            alt="reload"
            layout="fill"
            objectFit="cover"
            // className="w-10 mx-auto"
          />
        </div>
      </button>
      <button
        onClick={handleClick}
        className="flex items-center gap-4 bg-white w-[180px] justify-center h-[60px] rounded-[50px]"
      >
        <div className="text-[25px] text-[#696969]">
          {isMapVisible ? "지도 닫기" : "지도 보기"}
        </div>
        <div className="w-[25px] h-[35px] relative">
          <Image
            src="/images/지도.png"
            alt="map"
            layout="fill"
            objectFit="cover"
            // className="w-[25px] "
          />
        </div>
      </button>
    </div>
  );
}

export default ResultButtons;
