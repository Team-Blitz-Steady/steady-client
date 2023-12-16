const Title = ({ title }: { title: string }) => {
  return (
    <div className="min-w-fit px-40 py-20 font-bold sm:text-20 md:text-25 lg:text-30">
      {title}
    </div>
  );
};

export default Title;
