const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-1000 flex-col gap-20">{children}</div>;
};

export default ApplicationLayout;
