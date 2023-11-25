const Loading = () => {
  return (
    <main className="relative flex flex-col items-center">
      <div className="relative flex h-250 w-screen bg-st-gray-75 md:h-350" />
      <section className="mb-20 mt-50 flex flex-col flex-wrap items-center justify-center overflow-hidden">
        <div className="w-3/4 text-2xl font-bold xl:w-full">🔥 인기 스테디</div>
        <div className="mt-20 flex h-220 flex-wrap items-center justify-center overflow-hidden">
          {Array.from({ length: 4 }).map((_, id) => (
            <div
              key={id}
              className="relative m-20 flex h-170 w-300 flex-col items-center justify-center gap-20 rounded-20 shadow-lg"
            />
          ))}
        </div>
      </section>
      <section className="flex w-3/4 flex-col items-center gap-5 xl:w-1300 ">
        <div className="h-5 w-full bg-st-gray-400" />
        {Array.from({ length: 10 }).map((_, id) => (
          <div
            key={id}
            className="flex min-h-130 w-full items-center justify-between rounded-5 bg-st-gray-50 md:px-50"
          >
            <div className="flex h-30 w-50 items-center justify-center rounded-50 bg-st-primary p-5 md:h-40 md:w-80">
              <div className="max-mobile:text-13 flex h-full w-full items-center justify-center rounded-50 bg-st-white text-10 font-bold md:text-16"></div>
            </div>
          </div>
        ))}
        <div className="h-5 w-full bg-st-gray-400" />
      </section>
      <section className="flex h-100 w-full items-center justify-center"></section>
    </main>
  );
};

export default Loading;
