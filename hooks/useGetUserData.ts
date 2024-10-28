import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

// 사용자 데이터를 가져오는 비동기 함수
const fetchUsers = async (pageParam: number, searchValue: string) => {
  // 검색어가 없을 경우 GitHub 사용자 목록 API 호출
  const res = await (searchValue.length === 0 &&
    axios.get("https://api.github.com/users", {
      params: {
        per_page: 20,
        since: (pageParam - 1) * 20, // 다음 사용자 시작 위치
      },
    }));

  // 검색어가 있을 경우 GitHub 사용자 검색 API를 호출
  const searchRes = await (searchValue.length > 0 &&
    axios.get("https://api.github.com/search/users", {
      params: {
        per_page: 20,
        page: pageParam,
        q: `${encodeURIComponent(`${searchValue}`)} in:login`, // 검색 쿼리
      },
    }));
  return {
    data:
      searchValue.length === 0
        ? res &&
          res.data.map((item: { [key: string]: string | number }) => ({
            id: item.id,
            name: item.login,
            avatarUrl: item.avatar_url,
            selected: false,
          }))
        : searchRes &&
          searchRes.data.items.map((item: { [key: string]: string | number }) => ({
            id: item.id,
            name: item.login,
            avatarUrl: item.avatar_url,
            selected: false,
          })),
    page: pageParam, // 현재 페이지 번호
  };
};

// 사용자 데이터를 가져오는 hook
const useGetUserData = (searchValue: string) => {
  return useInfiniteQuery({
    queryKey: ["user-data", searchValue],
    queryFn: ({ pageParam }) => fetchUsers(pageParam, searchValue),
    initialPageParam: 1, // 초기 페이지 번호
    // 마지막 페이지가 9이거나 데이터가 20개 미만일 경우 더 이상 페이지가 없음
    getNextPageParam: lastPage => {
      const page = lastPage.page;
      if (lastPage.page === 9) return undefined;
      else if (lastPage.data.length < 20) return undefined;
      return page + 1;
    },
  });
};

export default useGetUserData;
