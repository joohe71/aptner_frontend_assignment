import { theme } from "@/styles/theme";

interface IPropsBookmarkIcon {
  selected: boolean; // 북마크 선택 여부
  onBookmarkClick: () => void; // 북마크 아이콘 클릭 시 호출되는 함수
}

// BookmarkIcon 컴포넌트 정의
const BookmarkIcon = ({ selected, onBookmarkClick }: IPropsBookmarkIcon) =>
  // selected 상태에 따라 다른 SVG 아이콘을 렌더링
  selected ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onBookmarkClick}
    >
      <path d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill={theme.colors.primary[2]} />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onBookmarkClick}
    >
      <path
        d="M17 3H7C5.9 3 5.01 3.9 5.01 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z"
        fill={"black"}
      />
    </svg>
  );

export default BookmarkIcon;
