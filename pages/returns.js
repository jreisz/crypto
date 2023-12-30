import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import ErrorState from "../components/ErrorState";

export default function Returns({ returns }) {
  if (returns.length === 0) {
    return (
      <ErrorState
        title="Something went wrong."
        description={"Failed to load data."}
      />
    );
  }

  return (
    <Box margin={4}>
      <Heading pb="42px" size="md">
        Returns By Symbol
      </Heading>
      <Box mx={12}>
        {returns
          .sort((a, b) =>
            a.symbol > b.symbol ? 1 : b.symbol > a.symbol ? -1 : 0
          )
          .map((ret) => {
            return (
              <Grid
                alignItems="center"
                borderBottom="1px"
                borderColor="gray.200"
                fontSize="16px"
                gap={4}
                padding={4}
                templateColumns="120px auto"
                _last={{ borderBottom: 0 }}
              >
                <GridItem>
                  <Text>
                    <strong>{ret.symbol}</strong>
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    color={parseFloat(ret.return) > 0 ? "#1ED86E" : "#F14A5A"}
                  >
                    <strong>{ret.return}</strong>
                  </Text>
                </GridItem>
              </Grid>
            );
          })}
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  const endpoint = "/top_10";
  let returns = [];

  returns = [
    {
      symbol: "BTC",
      return: 0.08752801003251982,
    },
    {
      symbol: "ETH",
      return: 0.02752801003251111,
    },
    {
      symbol: "ARK",
      return: -0.02752801003251111,
    },
    {
      symbol: "BTN",
      return: -0.02752801003251111,
    },
  ]
  
  // try {
  //   const responseTop10 = await fetch(
  //     `${process.env.BACKEND_API_URL}${endpoint}`
  //   );
  //   const { top_10: symbols } = await responseTop10.json();

  //   returns = await Promise.all(
  //     symbols.map(async (symbol) => {
  //       const responseReturns = await fetch(
  //         `${process.env.BACKEND_API_URL}/return_${symbol}`
  //       );
  //       const { return: ret } = await responseReturns.json();
  //       return {
  //         symbol,
  //         return: ret,
  //       };
  //     })
  //   );
  // } catch (err) {
  //   console.error(
  //     `Failed to load data from endpoint ${endpoint}.`,
  //     err.message
  //   );
  // }

  return {
    props: { returns },
  };
}
