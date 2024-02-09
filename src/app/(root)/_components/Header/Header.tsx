import { Black_Han_Sans, Noto_Sans } from "next/font/google";
import Link from "next/link";

const blackHanSans = Black_Han_Sans({
  weight: ["400"],
  subsets: ["latin"],
});
const notoSans = Noto_Sans({
  weight: ["300"],
  subsets: ["latin"],
});

function Header() {
  return (
    <header className="flex items-center px-5 py-4 gap-3 border-b h-20 shadow-sm drop-shadow-sm">
      <Link href="/" className={`text-[45px] ${blackHanSans.className}`}>
        Picknic
      </Link>
      <p className={`text-[21px]  ${notoSans.className}`}>
        모두를 위한 음식 메뉴
      </p>
    </header>
  );
}

export default Header;
