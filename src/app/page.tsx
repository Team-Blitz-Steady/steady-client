import Line from "@/components/_common/Line";

const Home = () => {
  return (
    <main>
      <Line className="h-[5px] w-[1300px] bg-st-gray-400" />
      <Line className="h-[1px] w-[1300px] bg-st-gray-200" />
      <Line className="h-[3px] w-[1000px] bg-st-gray-400" />
      <Line className="h-[2px] w-[1000px] bg-st-gray-100" />
      <Line className="h-[1px] w-[1000px] bg-st-gray-200" />
      <Line className="h-[5px] w-[750px] bg-st-gray-400" />
    </main>
  );
};

export default Home;
