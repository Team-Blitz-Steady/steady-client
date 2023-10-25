interface LineProps {
  className: string;
}

const Line = ({ className = "" }: LineProps) => {
  return <div className={className}></div>;
};

export default Line;
