import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import ErrorState from "../components/ErrorState";
import Disclaimer from "../components/Disclaimer";
import ddMMyyhhmmssToDate from "../helpers/ddMMyyhhmmssToDate";

export default function PlaceTrade({ symbols }) {
  const [trades, setTrades] = useState([]);
  const [symbol, setSymbol] = useState("");

  const toast = useToast();

  const submitTrade = async () => {
    //for the demo only, remember to remove it
    toast({
      description: "",
      duration: 5000,
      isClosable: true,
      status: "error",
      title: "Trade failed.",
      variant: "error",
    });

    return;

    try {
      const response = await fetch(
        `${
          process.env.FRONTEND_URL || "http://localhost:7500"
        }/api/place-trade/${symbol}`,
        {
          method: "POST",
        }
      );
      if (response.status === 502) {
        toast({
          description: "",
          duration: 5000,
          isClosable: true,
          status: "error",
          title: "Trade failed.",
          variant: "error",
        });
        return;
      }

      const trade = await response.json();

      setTrades([...trades, { ...trade, symbol }]);

      toast({
        description: "",
        duration: 5000,
        isClosable: true,
        status: "success",
        title: "Trade placed.",
        variant: "success",
      });
    } catch (err) {
      console.log(err);

      toast({
        description: "",
        duration: 5000,
        isClosable: true,
        status: "error",
        title: "Trade failed.",
        variant: "error",
      });
    }
  };

  if (symbols?.length === 0) {
    return (
      <ErrorState
        title="Something went wrong."
        description={"Failed to load data."}
      />
    );
  }

  return (
    <Box margin={4} height="800px">
      <Heading pb="42px" size="md">
        Place a Trade
      </Heading>
      <Box mb={4}>
        <HStack>
          <Select
            focusBorderColor="none"
            instanceId="symbol"
            onChange={(element) => {
              if (element && element.vaule !== symbol) {
                setSymbol(element.value);
              }
            }}
            onInputChange={(inputValue, { action }) => {
              if (action !== "input-blur" && action !== "menu-close") {
                setSymbol(inputValue);
              }
            }}
            options={symbols.map((s) => ({
              label: s,
              value: s,
            }))}
            placeholder="Select a symbol..."
            size="sm"
          />
          <Button
            isDisabled={
              symbol === "" ||
              ![
                "BTC",
                "ETH",
                "XRP",
                "BCH",
                "LTC",
                "ADA",
                "AVAX",
                "BNB",
                "TRX",
                "DOT",
              ].includes(symbol.toUpperCase())
            }
            onClick={submitTrade}
            size="sm"
          >
            Buy
          </Button>
        </HStack>
      </Box>
      <Card mx={12}>
        <CardHeader>
          <Heading size="xs" textTransform="uppercase">
            Summary
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {trades.map((t) => (
              <Grid
                alignItems="center"
                borderBottom="1px"
                borderColor="gray.200"
                fontSize="16px"
                gap={4}
                key={t.id}
                padding={4}
                templateColumns="240px 120px auto"
                _last={{ borderBottom: 0 }}
              >
                <GridItem>
                  <Text>
                    <strong>
                      {ddMMyyhhmmssToDate(t.date).toLocaleString()}
                    </strong>
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>
                    <strong>{t.symbol}</strong>
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>
                    <strong>{t.price}</strong>
                  </Text>
                </GridItem>
              </Grid>
            ))}
          </Stack>
        </CardBody>
      </Card>
      <Disclaimer maxWidth="1000px">
        <strong>
          Sometimes trade operations fail due to the server is busy. In those
          cases we recommend to retry.
        </strong>
      </Disclaimer>
    </Box>
  );
}

export async function getStaticProps() {
  //Mocked functionality for the autocomplete input control.
  return {
    props: {
      symbols: [
        "BTC",
        "ETH",
        "XRP",
        "BCH",
        "LTC",
        "ADA",
        "AVAX",
        "BNB",
        "TRX",
        "DOT",
      ],
    },
  };
}
