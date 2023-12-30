import "@testing-library/jest-dom/extend-expect";
import jestFetchMock from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";
import Returns from "../returns";
import { getStaticProps } from "../returns";

jestFetchMock.enableMocks();

describe("Returns", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe("getStaticProps", () => {
    it("should return an empty array when throw exception", async () => {
      process.env.BACKEND_API_URL = "THROW";
      const response = await getStaticProps();
      expect(response).toEqual(
        expect.objectContaining({
          props: {
            returns: [],
          },
        })
      );
    });

    it("should call /return_{symbol} api", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          top_10: ["BTC", "ETH"],
        })
      );
      fetch.mockResponseOnce(
        JSON.stringify({
          return: 0.08752801003251982,
        })
      );
      fetch.mockResponseOnce(
        JSON.stringify({
          return: 0.02752801003251111,
        })
      );
      const response = await getStaticProps();
      expect(response).toEqual(
        expect.objectContaining({
          props: {
            returns: [
              {
                symbol: "BTC",
                return: 0.08752801003251982,
              },
              {
                symbol: "ETH",
                return: 0.02752801003251111,
              },
            ],
          },
        })
      );
    });
  });

  describe("App", () => {
    it("Displays 'Something went wrong' message when returns is an empty array", async () => {
      render(<Returns returns={[]} />);

      expect(screen.getByText(/Something went wrong./)).toBeInTheDocument();
    });

    it("Renders the Returns Page and populate items into the Table", async () => {
      render(
        <Returns
          returns={[
            {
              symbol: "BTC",
              return: 0.08752801003251982,
            },
            {
              symbol: "ETH",
              return: 0.02752801003251111,
            },
          ]}
        />
      );
      expect(
        screen.queryByText(/Something went wrong./)
      ).not.toBeInTheDocument();

      expect(screen.queryByText(0.02752801003251111)).toBeInTheDocument();
      expect(screen.queryByText(/ETH/)).toBeInTheDocument();
    });
  });
});
