import { useState } from "react";
import styled from "@emotion/styled";
import TextInput from "@/elements/text-input";
import SearchIcon from "@/public/icons/search-icon";
import Switch from "@/elements/switch";
import Text from "@/elements/text";
import { theme } from "@/styles/theme";

// RootPage 컴포넌트 정의
const RootPage = () => {
  const [searchValue, setSearchValue] = useState<string>(""); // 검색어 상태 관리
  const [checked, setChecked] = useState<boolean>(false); // 스위치 상태 관리 (북마크 필터링)

  return (
    <Container>
      <Section>
        <Wrapper>
          {/* 사용자 검색을 위한 텍스트 입력 컴포넌트 */}
          <TextInput
            value={searchValue}
            placeholder={"사용자 이름을 검색해주세요"}
            onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            icon={<SearchIcon />}
            width="80%"
            disabled={checked}
          />
          {/* 스위치 컴포넌트 (북마크 필터링 기능) */}
          <Switch
            checked={checked}
            onSwitchChange={() => setChecked(prev => !prev)}
            onLabel={
              <Text size={"body5"} weight="bold" color="white">
                북마크
              </Text>
            }
            offLabel={
              <Text size={"body5"} weight="bold" color={theme.colors.gray[5]}>
                전체
              </Text>
            }
          />
        </Wrapper>
      </Section>
    </Container>
  );
};

export default RootPage;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
