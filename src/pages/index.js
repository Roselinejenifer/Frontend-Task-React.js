import { useState, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  Spinner,
  Image,
  Button,
} from "@chakra-ui/react";
import CharacterCard from "../components/CharacterCard";
import Pagination from "@/components/Pagination";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    }
    return [];
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCharacters(data.results.slice(0, 10));
        setTotalCharacters(data.count);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const toggleFavorite = (character) => {
    const updatedFavorites = favorites.some(
      (fav) => fav.name === character.name
    )
      ? favorites.filter((fav) => fav.name !== character.name)
      : [...favorites, character];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          color="blue.500"
          mb={4}
        />
        <Text fontSize="lg" fontWeight="medium">
          Loading characters...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Box position={"relative"}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={4}
        sx={{
          boxShadow: "0 0 1px 0px black",
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgColor: "white",
        }}
      >
        <Image
          src={`https://cdn.worldvectorlogo.com/logos/star-wars-4.svg`}
          alt="StarWars Characters"
          width={100}
          height={10}
        />
        <Link href="/favourites">
          <Button
            justifyContent={"space-between"}
            alignItems={"center"}
            colorScheme={"red"}
          >
            <FaHeart size={18} />
            <Text as="h1" pl={2}>
              Favourites
            </Text>
          </Button>
        </Link>
      </Flex>
      <Box p={4}>
        <SimpleGrid columns={[1, 2, 3, 5]} gap={8}>
          {characters.map((character) => {
            const isFavorite = favorites.some(
              (fav) => fav.name === character.name
            );
            return (
              <CharacterCard
                key={character.name}
                character={character}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            );
          })}
        </SimpleGrid>
        <Pagination
          page={page}
          setPage={setPage}
          totalCharacters={totalCharacters}
          itemsPerPage={itemsPerPage}
        />
      </Box>
    </Box>
  );
};

export default CharacterList;
