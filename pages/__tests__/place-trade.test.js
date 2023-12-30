import "@testing-library/jest-dom/extend-expect";
import jestFetchMock from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";
import PlaceTrade from "../place-trade";
import { getStaticProps } from "../place-trade";
jestFetchMock.enableMocks();

describe("Place Trade", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe("getStaticProps", () => {
    it("Should retrieve the list of symbols", async () => {
      fetch.mockResponseOnce(
        JSON.stringify([
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
        ])
      );

      const response = await getStaticProps();
      expect(response).toEqual(
        expect.objectContaining({
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
        })
      );
    });
  });

  describe("App", () => {
    it("Displays 'Something went wrong' message when symbols is an empty array", async () => {
      render(<PlaceTrade symbols={[]} />);

      expect(screen.getByText(/Something went wrong./)).toBeInTheDocument();
    });
  });
});
