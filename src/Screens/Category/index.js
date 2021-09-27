import React, { useEffect, useState } from "react";

import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  Box,
  Select
} from "@chakra-ui/react";
import Layout from "../../layout";
import { useQuery, useMutation } from "react-query";
import { postData } from "../../api";

const Category = () => {
  const [state, setState] = useState({ name: "", parent: "" });
  // Queries
  const categories = useQuery("/v1/category");
  useEffect(() => {
    console.log(categories);
  }, [categories]);
  const createProduct = async () => {
    let response = await postData("/v1/product", state);
  };
  const mutation = useMutation(createProduct, {
    onSuccess: () => {
      alert("Product created successfully");
    }
  });
  const onSubmit = () => {
    mutation.mutate({
      id: Date.now(),
      title: "Create Product"
    });
  };
  return (
    <Layout title="Category">
      <Container style={{ marginTop: "20px" }}>
        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
          <Box w="100%">
            <FormControl id="name" isRequired>
              <FormLabel>Category Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter name"
                value={state.name}
                onChange={(e) => {
                  setState({ ...state, name: e.target.value });
                }}
              />
            </FormControl>
          </Box>
          <Box w="100%">
            {categories && categories?.data && (
              <FormControl id="name" isRequired>
                <FormLabel>Parent</FormLabel>
                <Select
                  placeholder="Select category"
                  value={state.parent}
                  onChange={(e) => {
                    setState({ ...state, parent: e.target.value });
                  }}
                >
                  {categories?.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          <Box w="100%">
            <FormControl id="name" isRequired>
              <Button colorScheme="blue" w="100%" onClick={onSubmit}>
                Submit
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Container>
    </Layout>
  );
};
export default Category;
