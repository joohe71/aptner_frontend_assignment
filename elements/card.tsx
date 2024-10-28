import BookmarkIcon from "@/public/icons/bookmark-icon";
import { Card as MantineCard, Image, Group } from "@mantine/core";
import Text from "./text";

interface IPropsCard {
  name: string;
  selected: boolean;
  avatarUrl: string;
  onBookmarkClick: () => void;
}

const Card = ({ name, selected, avatarUrl, onBookmarkClick }: IPropsCard) => {
  return (
    <MantineCard shadow="sm" padding="lg" radius="md" withBorder style={{ width: 270 }}>
      <MantineCard.Section>
        <Image
          src={
            avatarUrl ??
            "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          }
          height={160}
          alt="Norway"
        />
      </MantineCard.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={"bold"}>{name}</Text>
        <BookmarkIcon selected={selected} onBookmarkClick={onBookmarkClick} />
      </Group>
    </MantineCard>
  );
};

export default Card;
