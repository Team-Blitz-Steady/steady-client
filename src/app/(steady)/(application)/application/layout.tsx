const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-10 max-sm:w-400 sm:w-450 md:w-600 lg:w-800 xl:w-1000">
      {children}
    </div>
  );
};

export default ApplicationLayout;
