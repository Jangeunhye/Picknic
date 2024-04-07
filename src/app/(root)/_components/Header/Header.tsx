import { Noto_Sans } from "next/font/google";
import Link from "next/link";

const notoSans = Noto_Sans({
  weight: ["500"],
  subsets: ["latin"],
});

function Header() {
  return (
    <header className="flex items-center justify-between px-14 md:px-5 h-20 bg-[#ffcd22] sm:px-1">
      <Link
        href="/"
        className={` text-4xl font-bold text-white px-3 rounded-3xl sm:text-3xl`}
      >
        투잇
      </Link>
      <p
        className={`text-2xl sm:text-xl sm:pr-2 ${notoSans.className} text-[#aace38] `}
      >
        <span className="text-white "> TODAY EAT</span>
      </p>
    </header>
  );
}

export default Header;
