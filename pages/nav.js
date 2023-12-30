import { useState } from "react";
import { Switch, Heading, Box } from "@chakra-ui/react";
import LinearGraph from "../components/LinearGraph";
import ErrorState from "../components/ErrorState";

export default function Nav({ navs }) {
  const [isChecked, setIsChecked] = useState(false);
  const userId = 1;

  const processData = (isChecked) => {
    if (isChecked) {
      return Object.entries(navs.hourly_navs[userId])
        .map((nav) => {
          return {
            x: new Date(`${nav[0]}:00`).getTime(),
            y: nav[1],
          };
        })
        .sort((a, b) => a.x - b.x);
    }
    return Object.entries(navs.daily_navs[userId])
      .map((nav) => {
        return {
          x: new Date(`${nav[0]} 00:00`).getTime(),
          y: nav[1],
        };
      })
      .sort((a, b) => a.x - b.x);
  };

  if (!navs?.hourly_navs) {
    return (
      <ErrorState
        title="Something went wrong."
        description={"Failed to load data."}
      />
    );
  }

  let data = processData(isChecked);

  return (
    <Box margin={4}>
      <Heading pb="42px" size="md">
        Nav Trends
      </Heading>
      <span>Compute Hours</span>
      <Switch
        isChecked={isChecked}
        ml={2}
        onChange={() => setIsChecked(!isChecked)}
      />
      <LinearGraph data={data} />
    </Box>
  );
}

function generateDailyNavs(quantity) {
  let navs = {};
  let now = new Date().toISOString().split("T")[0];

  for (let i = 0; i < quantity; i++) {
    var precision = 100; // 2 decimals
    var randomnum =
      Math.floor(
        Math.random() * (500 * precision - 400 * precision) + 1 * precision
      ) /
      (1 * precision);

    navs[now] = randomnum;

    //going backwards in time
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    now = yesterday.toISOString().split("T")[0];
  }
  return navs;
}

function generateHourlyNavs(quantity) {
  let navs = {};
  let now = new Date().toISOString().split("T")[0];

  for (let i = 0; i < quantity; i++) {
    var precision = 100; // 2 decimals
    var randomnum =
      Math.floor(
        Math.random() * (500 * precision - 400 * precision) + 1 * precision
      ) /
      (1 * precision);

    for (let j = 0; j < 23; j++) {
      const hours = j < 10 ? "0" + j : j;
      navs[now + " " + hours] = randomnum;
    }

    //going backwards in time
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    now = yesterday.toISOString().split("T")[0];
  }
  return navs;
}
export async function getStaticProps() {
  const endpoint = "/navs";
  let navs = {};

  try {
    // const response = await fetch(`${process.env.BACKEND_API_URL}${endpoint}`);
    // const responseJson = await response.json();
    // if (!responseJson.detail) {
    //   navs = responseJson;
    // }

    navs = {
      daily_navs: {
        1: generateDailyNavs(500),
      },
      hourly_navs: {
        1: generateHourlyNavs(500),
      },
    };
  } catch (err) {
    console.error(
      `Failed to load data from endpoint ${endpoint}.`,
      err.message
    );
  }

  return {
    props: { navs },
  };
}
