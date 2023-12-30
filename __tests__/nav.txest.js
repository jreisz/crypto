// import "@testing-library/jest-dom/extend-expect";
// import jestFetchMock from "jest-fetch-mock";
// import { render, screen } from "@testing-library/react";
// import Nav from "../pages/nav";

// jestFetchMock.enableMocks();

// describe("Nav", () => {
//   beforeEach(() => {
//     fetch.resetMocks();
//   });
//   describe("getStaticProps", () => {
//     it("should handle a successful api response without the expected data", async () => {
//       fetch.mockResponseOnce(JSON.stringify({ detail: "Not Found" }));
//       const response = await getStaticProps();
//       expect(response).toEqual(
//         expect.objectContaining({
//           props: {
//             navs: {},
//           },
//         })
//       );
//     });

//     it("should return an empty object when throw exception", async () => {
//       process.env.BACKEND_API_URL = "THROW";
//       const response = await getStaticProps();
//       expect(response).toEqual(
//         expect.objectContaining({
//           props: {
//             navs: {},
//           },
//         })
//       );
//     });

//     it("should call /navs api", async () => {
//       fetch.mockResponseOnce(
//         JSON.stringify({
//           daily_navs: {
//             1: {
//               "2022-10-31": 307.3377407051,
//             },
//           },
//           hourly_navs: {
//             1: {
//               "2023-02-18 02": 310.773831259032,
//             },
//           },
//         })
//       );

//       const response = await getStaticProps();
//       expect(response).toEqual(
//         expect.objectContaining({
//           props: {
//             navs: {
//               daily_navs: {
//                 1: {
//                   "2022-10-31": 307.3377407051,
//                 },
//               },
//               hourly_navs: {
//                 1: {
//                   "2023-02-18 02": 310.773831259032,
//                 },
//               },
//             },
//           },
//         })
//       );
//     });
//   });

//   describe("App", () => {
//     it("Displays 'Something went wrong' message when navs is an empty object", async () => {
//       render(<Nav navs={{}} />);

//       expect(screen.getByText(/Something went wrong./)).toBeInTheDocument();
//     });

//     it("Renders the Nav Page with a Chart", async () => {
//       render(
//         <Nav
//           navs={{
//             daily_navs: {
//               1: {
//                 "2022-10-31": 307.3377407051,
//               },
//             },
//             hourly_navs: {
//               1: {
//                 "2023-02-18 02": 310.773831259032,
//               },
//             },
//           }}
//         />
//       );
//       expect(
//         screen.queryByText(/Something went wrong./)
//       ).not.toBeInTheDocument();
//       expect(screen.queryByText(/Nav Trends/)).toBeInTheDocument();
//     });
//   });
// });
