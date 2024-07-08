import React from "react";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Pagination = ({ page, setPage, totalCharacters, itemsPerPage }) => {
  const totalPages = Math.ceil(totalCharacters / itemsPerPage);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Box pt={12} pb={10} display="flex" justifyContent="center">
      <HStack spacing={2}>
        <IconButton
          aria-label="Previous Page"
          icon={<ArrowBackIcon />}
          onClick={handlePrev}
          disabled={page === 1}
          variant="outline"
          colorScheme="blue"
          sx={{ borderRadius: "full" }}
        />
        <Box fontSize="xl" fontWeight="semibold">
          Page {page} of {totalPages}
        </Box>
        <IconButton
          aria-label="Next Page"
          icon={<ArrowForwardIcon />}
          onClick={handleNext}
          disabled={page === totalPages}
          variant="outline"
          colorScheme="blue"
          sx={{ borderRadius: "full" }}
        />
      </HStack>
    </Box>
  );
};

export default Pagination;
