import Avatar from "@/components/_common/Avatar";

const Home = () => {
  return (
    <main>
      <div>This is Main</div>
      <h1 className="text-3xl font-bold underline">Hello, Steady!</h1>
      <Avatar
        src={
          "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
        }
        size={100}
      />
    </main>
  );
};

export default Home;
