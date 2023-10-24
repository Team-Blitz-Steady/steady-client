import Introduce_Input from "@/components/_common/Input/introduce-input";
import Name_Input from "@/components/_common/Input/name-input";
import Search_Input from "@/components/_common/Input/search-input";
import Tag_Input from "@/components/_common/Input/tag-input";
import Title_Input from "@/components/_common/Input/title-input";

const Home = () => {
  return (
    <main>
      <Search_Input />
      <Name_Input />
      <Title_Input placeholder="제목을 입력해주세요." />
      <Tag_Input />
      <Introduce_Input />
    </main>
  );
};

export default Home;
