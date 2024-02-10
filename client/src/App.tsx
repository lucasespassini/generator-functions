import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Items = {
  uuid: string;
  description: string;
};

export const App = () => {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000");
      if (!response || !response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let isDone = false;
      while (!isDone) {
        const { done, value } = await reader.read();
        isDone = done;
        const jsonString = decoder.decode(value);
        const jsonData: Items = JSON.parse(jsonString);
        setItems((prev) => [...prev, jsonData]);
      }
    })();
  }, []);

  return (
    <Flex
      p={5}
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      gap={3}
    >
      {items.map(({ uuid, description }) => (
        <Card key={uuid} bgColor="#171717" color="#fff">
          <CardHeader>
            <Heading size="sm">{uuid}</Heading>
          </CardHeader>
          <CardBody py={2}>
            <Text>{description}</Text>
          </CardBody>
          <CardFooter justifyContent="flex-end">
            <Button size="sm" colorScheme="whatsapp">
              ver
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Flex>
  );
};
