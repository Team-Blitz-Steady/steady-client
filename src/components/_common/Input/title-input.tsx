interface InputProp {
  placeholder: string;
}

const Title_Input = ({ placeholder = "제목을 입력해주세요." }: InputProp) => {
  return (
    <div>
      <input
        className="w-[1000px] h-[60px] font-bold text-3xl outline-none mt-[10px] pl-[5px] pr-[5px]"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Title_Input;
