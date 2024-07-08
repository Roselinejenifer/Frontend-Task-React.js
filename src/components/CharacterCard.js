import {
  Box,
  Image,
  Button,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

const CharacterCard = ({ character, onToggleFavorite, isFavorite }) => {
  const characterId = character?.url?.split("/")[5];

  return (
    <Card maxW="sm">
      <CardBody>
        <Box
          sx={{
            cursor: "pointer",
            transition: "transform 0.2s",
            "&:hover": {
              boxShadow: "0 0 4px 1px blue",
              transform: "scale(1.05)",
            },
          }}
        >
          <Link href={`/character/${characterId}`}>
            <Image
              src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
              alt={character.name}
              borderRadius="lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-character.png";
              }}
            />
          </Link>
          <Stack mt="6" spacing="3">
            <Heading size="sm">{character.name}</Heading>
          </Stack>
        </Box>
      </CardBody>
      <Divider />
      <CardFooter display="flex" justifyContent="space-between">
        <Link href={`/character/${characterId}`}>
          <Button variant="outline" colorScheme="blue">
            View Details
          </Button>
        </Link>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(character);
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
