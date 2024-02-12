import Page from "@/components/Page/Page";
import HomeHeader from "./_components/HomeHeader";
import OptionsList from "./_components/OptionsList";

export default function Home() {
  return (
    <Page>
      <div className="flex flex-col items-center pt-12 ">
        <HomeHeader />
        <OptionsList />
      </div>
    </Page>
  );
}
