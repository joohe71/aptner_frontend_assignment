import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import TextInput from "@/elements/text-input";
import SearchIcon from "@/public/icons/search-icon";
import Switch from "@/elements/switch";
import Text from "@/elements/text";
import { theme } from "@/styles/theme";
import useGetUserData from "../hooks/useGetUserData";
import { useInView } from "react-intersection-observer";
import { Loader } from "@mantine/core";
import Card from "@/elements/card";

interface IPropsData {
  id: number; // 사용자 id
  name: string; // 사용자 이름
  selected: boolean; // 북마크 여부
  avatarUrl: string; // 썸네일 url
}

// RootPage 컴포넌트 정의
const RootPage = () => {
  const [searchValue, setSearchValue] = useState<string>(""); // 검색어 상태 관리
  const [checked, setChecked] = useState<boolean>(false); // 스위치 상태 관리 (북마크 필터링)
  const [bookmarkData, setBookmarkData] = useState<IPropsData[]>([]); // 북마크 데이터 상태 관리
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserData(searchValue); // 사용자 데이터 및 페이지네이션 관리
  const { ref, inView } = useInView(); // 스크롤 감지 hook

  // 북마크 변경 핸들러
  const onBookmarkChange = (value: IPropsData) => {
    const copied = { ...value, selected: !bookmarkData.map(item => item.id).includes(value.id) };
    const updateData = copied.selected ? [...bookmarkData, copied] : bookmarkData.filter(item => item.id !== copied.id);
    // 북마크 데이터 업데이트 및 sessionStorage에 저장
    setBookmarkData(updateData);
    sessionStorage.setItem("bookmark", JSON.stringify(updateData));
  };

  // ref 컴포넌트가 화면에 보일 떄 다음 페이지 데이터 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  // 초기 렌더링 시 sessionStorage에서 북마크 데이터 로드
  useEffect(() => {
    setBookmarkData(JSON.parse(sessionStorage.getItem("bookmark") ?? "[]"));
  }, []);

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

      <Section>
        {data?.pages[0] && (
          <Frame>
            {/* 북마크 필터링에 따라 사용자 카드 렌더링 => 전체일 경우 */}
            {!checked &&
              data.pages.map((item: { data: IPropsData[]; page: number }) =>
                item.data.map((value: IPropsData, index: number) => (
                  <Card
                    key={index}
                    name={value.name}
                    selected={bookmarkData.map(item => item.id).includes(value.id)} // 북마크 여부
                    avatarUrl={value.avatarUrl}
                    onBookmarkClick={() => onBookmarkChange(value)} // 북마크 클릭 핸들러
                  />
                )),
              )}
            {/* 북마크 필터링에 따라 사용자 카드 렌더링 => 북마크일 경우 */}
            {checked &&
              bookmarkData.map((value: IPropsData, index: number) => (
                <Card
                  key={index}
                  name={value.name}
                  selected={bookmarkData.map(item => item.id).includes(value.id)}
                  avatarUrl={value.avatarUrl}
                  onBookmarkClick={() => onBookmarkChange(value)}
                />
              ))}
            {/* 북마크가 없을 때 메시지 표시 */}
            {checked && bookmarkData.length === 0 && (
              <Text size="body3" color={theme.colors.gray[9]}>
                북마크한 데이터가 없습니다.
              </Text>
            )}
            {/* 검색 결과가 없을 때 메시지 표시 */}
            {!checked && data?.pages[0].data.length === 0 && (
              <Text size="body3" color={theme.colors.gray[9]}>
                {`"`}
                <b>{searchValue}</b>
                {`"`}에 대한 검색 결과가 없습니다.
              </Text>
            )}
          </Frame>
        )}
        {/* 더 많은 데이터가 있을 경우 로더 표시 */}
        {!checked && hasNextPage && (
          <LoaderWrapper ref={ref}>
            <Loader color={theme.colors.primary[2]} />
          </LoaderWrapper>
        )}
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
  padding-bottom: 40px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Frame = styled.div`
  width: 100%;
  max-width: 1200px; // 최대 너비를 설정
  display: flex;
  flex-wrap: wrap;
  gap: 40px;

  // 반응형 스타일
  @media (max-width: 1200px) {
    justify-content: center; // 중앙 정렬
  }

  @media (max-width: 900px) {
    gap: 20px; // 작은 화면에서 카드 간격 조정
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
