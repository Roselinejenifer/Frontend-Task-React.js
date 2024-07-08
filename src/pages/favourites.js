"use client";

import { useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    }
  }, []);

  const toggleFavorite = (character) => {
    const updatedFavorites = favorites.some(
      (fav) => fav.name === character.name
    )
      ? favorites.filter((fav) => fav.name !== character.name)
      : [...favorites, character];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

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
      </Flex>
      <Box p={4}>
        {favorites.length > 0 ? (
          <SimpleGrid columns={[1, 2, 3, 5]} gap={8}>
            {favorites.map((character) => (
              <CharacterCard
                key={character}
                character={character}
                isFavorite={favorites.some((fav) => fav === character)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="80vh"
          >
            <Text fontSize="lg" fontWeight="medium" margin={5}>
              There are no favorite characters! Add your favorite characters.
            </Text>
            <Link href="/">
              <Button colorScheme={"red"}>Browse Characters</Button>
            </Link>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Favourites;
