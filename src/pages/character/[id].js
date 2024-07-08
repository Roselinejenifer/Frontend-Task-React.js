import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Box,
  Image,
  List,
  ListItem,
  Flex,
  Spinner,
  Heading,
  Badge,
  Divider,
  SimpleGrid,
  Grid,
  Text,
} from "@chakra-ui/react";

const CharacterDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(null);
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [starShips, setStarShips] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (id) {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const character = await response.json();
        setCharacter(character);

        const films = character?.films || [];
        const filmsData = await Promise.all(
          films.map((film) => fetch(film).then((res) => res.json()))
        );
        setFilms(filmsData);

        const starships = character?.starships || [];
        const starShipsData = await Promise.all(
          starships.map((starship) => fetch(starship).then((res) => res.json()))
        );
        setStarShips(starShipsData);

        const vehicles = character?.vehicles || [];
        const vehiclesData = await Promise.all(
          vehicles.map((vehicles) => fetch(vehicles).then((res) => res.json()))
        );
        setVehicles(vehiclesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box mx="auto" p={6}>
      <Grid
        templateColumns={{ base: "1fr", lg: "3fr 1fr" }}
        gap={6}
        height={"100%"}
      >
        <Flex
          bg="white"
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
          height={{ base: "auto", md: "90vh" }}
          direction={{ base: "column", md: "row" }}
        >
          <Image
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={character?.name}
            objectFit="cover"
            borderRadius="lg"
            m={6}
          />
          <Box
            p={6}
            textAlign="left"
            sx={{ height: "90vh", width: "auto", overflow: "scroll" }}
          >
            <Heading as="h1" size="xl" mb={4}>
              {character?.name}
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={5}>
              <Badge colorScheme="green" sx={{ p: 1 }}>
                Height: {character?.height}
              </Badge>
              <Badge colorScheme="purple" sx={{ p: 1 }}>
                Mass: {character?.mass}
              </Badge>
              <Badge colorScheme="blue" sx={{ p: 1 }}>
                Hair Color: {character?.hair_color}
              </Badge>
              <Badge colorScheme="yellow" sx={{ p: 1 }}>
                Skin Color: {character?.skin_color}
              </Badge>
              <Badge colorScheme="red" sx={{ p: 1 }}>
                Eye Color: {character?.eye_color}
              </Badge>
              <Badge colorScheme="orange" sx={{ p: 1 }}>
                Birth Year: {character?.birth_year}
              </Badge>
              <Badge colorScheme="teal" sx={{ p: 1 }}>
                Gender: {character?.gender}
              </Badge>
            </SimpleGrid>
            {starShips.length > 0 && (
              <>
                <Heading as="h3" size="md" my={4}>
                  Starships
                </Heading>
                <SimpleGrid columns={[1, 2, 3]} spacing={2}>
                  {starShips?.map((starShip) => {
                    return (
                      <Box
                        key={starShip?.url}
                        sx={{
                          p: 2,
                          border: "1px solid gray",
                          borderRadius: "20px",
                          background: "#EFEFEF",
                        }}
                      >
                        <Box>
                          <Heading size="sm" textAlign={"center"} mb={2}>
                            {starShip?.name}
                          </Heading>
                          <Box>
                            <Text fontSize={14}>
                              <span style={{ fontWeight: "600" }}>
                                Model :{" "}
                              </span>
                              {starShip?.model}
                            </Text>
                            <Text fontSize={14}>
                              <span style={{ fontWeight: "600" }}>
                                Manufacturer :{" "}
                              </span>
                              {starShip?.manufacturer}
                            </Text>
                            <Text fontSize={14}>
                              <span style={{ fontWeight: "600" }}>Cost : </span>
                              {starShip?.cost_in_credits}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </>
            )}
            {vehicles.length > 0 && (
              <>
                <Heading as="h3" size="md" my={4}>
                  Vehicles
                </Heading>
                <SimpleGrid columns={[1, 2, 3]} spacing={2} mb={8}>
                  {vehicles?.map((vehicle) => {
                    return (
                      <Box
                        key={vehicle?.url}
                        sx={{
                          p: 2,
                          border: "1px solid gray",
                          borderRadius: "20px",
                          background: "#EFEFEF",
                        }}
                      >
                        <Box>
                          <Heading size="sm" textAlign={"center"} mb={2}>
                            {vehicle?.name}
                          </Heading>
                          <Box>
                            <Text fontSize={14}>
                              <span style={{ fontWeight: "600" }}>
                                Model :{" "}
                              </span>
                              {vehicle?.model}
                            </Text>
                            <Text fontSize={14}>
                              <span style={{ fontWeight: "600" }}>
                                Manufacturer :{" "}
                              </span>
                              {vehicle?.manufacturer}
                            </Text>
                            <Text fontSize={14}>
                              <span style={{ fontWeight: "600" }}>Cost : </span>
                              {vehicle?.cost_in_credits}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </>
            )}
          </Box>
        </Flex>

        <Box bg="white" boxShadow="md" borderRadius="lg" p={6}>
          <Heading as="h2" size="lg" mb={4}>
            Films
          </Heading>
          <Divider mb={4} />
          <List spacing={3}>
            {films?.map((film) => (
              <ListItem key={film?.episode_id} fontSize="lg">
                {film?.title}
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Box>
  );
};

export default CharacterDetail;
