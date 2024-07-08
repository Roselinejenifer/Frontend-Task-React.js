import { IconButton } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <IconButton
      variant="link"
      aria-label="Favourite"
       onClick={onClick}
      colorScheme={isFavorite ? "red" : "blue"}
      icon={<FaHeart size={24} />}
    />
  );
};

export default FavoriteButton;
