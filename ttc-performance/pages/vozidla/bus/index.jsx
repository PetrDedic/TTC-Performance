import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import ScrollContainer from "react-indiana-drag-scroll";
import { Show } from "../../../components/Show";
import { If } from "../../../components/Show";
import Link from "next/link";

const StyledRealizace = styled.main`
  background-image: url("../../bg.svg");
  background-size: cover;
  background-position: top;

  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  h1 {
    font-size: 5rem;
    letter-spacing: -4px;
    font-weight: 900;
    text-align: center;
    margin: 8rem 0;
  }

  .container {
    width: 100%;
    height: auto;
    display: flex;
    gap: 1.5rem;
    margin: 2rem;

    .item {
      width: auto;
      white-space: nowrap;
      height: 100%;
      padding: 1rem;
      background-color: #cfcfcf;
      transition: 150ms;
      font-size: 1.25rem;

      &.active {
        background-color: #101c2499;
      }

      &:hover {
        cursor: pointer;
        color: white;
        background-color: #101c24;
      }
    }
  }

  ul {
    margin: auto;
    width: 85vw;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;

    li {
      font-size: 1.5rem;
      padding: 0.5rem;
      margin: 0.5rem;
      border-radius: 0.5rem;
      width: calc(50% - 1rem);
      text-align: left;

      span {
        font-weight: bold;
      }
    }
  }
  .nav {
    margin: auto;
    width: 85vw;
  }
`;

const cars = [
  {
    name: "Agrale Bus",
    params: [
      "Omnibus MA 12.0 3,8l E5 112kW / 152PS",
      "Omnibus MA 12.0 4,8l 110kW / 150PS",
      "Omnibus MA 15.0 4,8l 136kW / 185PS",
      "Omnibus MA 8.5 4,8l 110kW / 150PS",
      "Omnibus MA 8.5 CF 4,8l 136kW / 185PS",
      "Omnibus MA 9.2 4.8l 110kW / 150PS",
      "Omnibus MA10.0 4,8l 110kW / 150PS",
      "Omnibus MT 12.0 3,8l E5 118kW / 160PS",
      "Omnibus MT 12.0 3,9l E3 118kW / 160PS",
    ],
  },
  {
    name: "Daewoo Bus",
    params: ["BX 212 316kW / 430PS", "FX 212 316kW / 430PS"],
  },
  {
    name: "DAF Bus",
    params: [
      "Bus EEV VDL 9186 360 267kW / 363PS",
      "Bus EURO 6 10.8 R6 290 210kW / 286PS",
      "Bus EURO 6 10.8 R6 320 240kW / 326PS",
      "Bus EURO 6 10.8 R6 370 271kW / 369PS",
      "Bus EURO 6 10.8 R6 400 291kW / 396PS",
      "Bus EURO 6 10.8 R6 440 321kW / 437PS",
      "Bus EURO 6 12.9 R6 410 303kW / 412PS",
      "Bus EURO 6 12.9 R6 460 339kW / 461PS",
      "Bus EURO 6 12.9 R6 510 376kW / 511PS",
      "Bus EURO 6 BOVA 12.9 V6 460 341kW / 464PS",
      "SB 4000 XF250C 250kW / 340PS",
      "SB 4000 XF280C 280kW / 381PS",
      "SB 4000 XFF315C 315kW / 428PS",
    ],
  },
  {
    name: "Irisbus",
    params: [
      "Arway EURO 5 7.8 V6 330 243kW / 330PS",
      "Arway EURO EEV 7.8 V6 380 279kW / 379PS",
      "Crossway EURO 5 Le 7.8 V6 330 243kW / 330PS",
      "Crossway EURO 5 Le 7.8 V6 380 279kW / 379PS",
      "Crossway EURO 6 Le 6.7 V6 285 210kW / 286PS",
      "Crossway EURO 6 Le 8.7 V6 360 265kW / 360PS",
      "Crossway EURO 6 Line 6.7 V6 320 235kW / 320PS",
      "Crossway EURO 6 Line 8.7 V6 360 265kW / 360PS",
      "Crossway EURO 6 Pro 8.7 V6 360 265kW / 360PS",
      "Crossway EURO 6 Pro 8.7 V6 400 294kW / 400PS",
      "Crossway EURO EEV Le 5.9 V6 265 194kW / 264PS",
      "Crossway EURO EEV Le 5.9 V6 300 221kW / 301PS",
      "Magelys EURO 6 Line 8.7 V6 400 294kW / 400PS",
      "Magelys EURO 6 Lounge 8.7 V6 400 294kW / 400PS",
      "Magelys EURO 6 Pro 8.7 V6 400 294kW / 400PS",
      "Urbanway EURO 6 6.7 V6 285 210kW / 286PS",
      "Urbanway EURO 6 8.7 V6 310 228kW / 310PS",
      "Urbanway EURO 6 8.7 V6 360 265kW / 360PS",
    ],
  },
  {
    name: "Isuzu Bus",
    params: [
      "Bus S EURO 5 S8001 Novolux 5.2 V4 155 114kW / 155PS",
      "Bus S EURO 6 Citiport 6.7 V6 382 281kW / 382PS",
      "Bus S EURO 6 Visigo 6.7 V6 255 188kW / 256PS",
    ],
  },
  {
    name: "MAN Bus",
    params: [
      "LION S EURO 6 Coach 12.4 V6 430 317kW / 431PS",
      "LION S EURO 6 Coach 12.4 V6 470 346kW / 471PS",
      "LION S EURO 6 Coach 12.4 V6 510 376kW / 511PS",
      "LION S EURO 6 REGIO C 10.5 V6 320 235kW / 320PS",
      "LION S EURO 6 REGIO C 10.5 V6 360 265kW / 360PS",
      "LION S EURO 6 REGIO C 10.5 V6 400 294kW / 400PS",
      "Lions 12l R6 228kW / 310PS",
      "Lions 12l R6 301kW / 409PS",
      "Lions 6.9l R6 206kW / 280PS",
    ],
  },
  {
    name: "Mercedes Bus",
    params: [
      "Citaro OM 457 12l R6 240kW / 326PS",
      "Citaro OM 906 6,37l R6 170kW / 231PS",
      "Citaro OM 906 6,37l R6 210kW / 286PS",
      "Citaro OM 906 6.4l R6 180kW / 245PS",
      "Citaro OM 457 12l R6 185kW / 252PS",
      "Citaro OM 457 12l R6 220kW / 299PS",
      "Citaro OM 457 12l R6 260kW / 354PS",
      "Citaro OM 906 6.4l R6 205kW / 279PS",
      "Cito OM 904 4,24l 130kW / 177PS",
      "Conecto OM 457 12l R6 220kW / 299PS",
      "Conecto OM 457 12l R6 260kW / 354PS",
      "Conecto OM 906 6,37l R6 205kW / 279PS",
      "Conecto OM 457 12l R6 185kW / 252PS",
      "CONECTO EURO 5 BUS 12.0 V6 354 260kW / 354PS",
      "CONECTO EURO 5/EEV BUS 7.2 V6 286 210kW / 286PS",
      "Integro OM 457 12l R6 300kW / 408PS",
      "Integro OM 926 7,20l R6 210kW / 286PS",
      "Integro OM 457 12l R6 185kW / 252PS",
      "Integro OM 457 12l R6 220kW / 299PS",
      "Integro OM 457 12l R6 260kW / 354PS",
      "Intouro OM 457 R6 12l 220kW / 299PS",
      "Intouro OM 457 R6 12l 260kW / 354PS",
      "Intouro OM 457 R6 12l 300kW / 408PS",
      "Intouro OM 926 R6 7,20l 210kW / 286PS",
      "Medio Classic 4.3l R4 130kW / 177PS",
      "Medio ECO 4.3l R4 110kW / 150PS",
      "Setra EURO 4 Euro4 12.0 V6 429 315kW / 428PS",
      "Setra EURO 4 Euro4 15.9 V8 505 371kW / 505PS",
      "Setra EURO 5 400 12.0 V6 300 221kW / 301PS",
      "Setra EURO 5 400 12.0 V6 430 316kW / 430PS",
      "Setra EURO 5 400 15.9 V8 477 351kW / 477PS",
      "Setra EURO 6 500 10.8 V6 360 265kW / 360PS",
      "Setra EURO 6 500 10.8 V6 396 291kW / 396PS",
      "Setra EURO 6 500 10.8 V6 430 316kW / 430PS",
      "Setra EURO 6 500 12.8 V6 477 351kW / 477PS",
      "Setra EURO 6 500 12.8 V6 512 376kW / 511PS",
      "Setra EURO 6 500 7.7 V6 300 221kW / 301PS",
      "Setra EURO 6 500 7.7 V6 354 260kW / 354PS",
      "Tourino OM 906 6.4l R6 180kW / 245PS",
      "Tourino OM 926 7.20l R6 210kW / 286PS",
      "Tourino OM 906 6.4l R6 205kW / 279PS",
      "Tourismo OM 457 12l R6 185kW / 252PS",
      "Tourismo OM 457 12l R6 220kW / 299PS",
      "Tourismo OM 457 12l R6 260kW / 354PS",
      "Tourismo OM 457 12l R6 300kW / 408PS",
      "Tourismo OM 457 12l R6 310kW / 422PS",
      "Tourismo OM 457 12l R6 315kW / 428PS",
      "Tourismo OM 457 12l R6 335kW / 456PS",
      "Tourismo OM 542 15,90l V6 320kW / 435PS",
      "Tourismo OM 542 15,90l V6 350kW / 476PS",
      "Tourismo OM 542 15,90l V6 370kW / 503PS",
      "Tourismo EURO 5/EEV 12.0 V6 355 261kW / 355PS",
      "Tourismo EURO 5/EEV 12.0 V6 430 316kW / 430PS",
      "Tourismo EURO 6 10.7 V6 361 265kW / 360PS",
      "Tourismo EURO 6 10.7 V6 396 291kW / 396PS",
      "Touro OM 457 R6 12l 260kW / 354PS",
      "Touro OM 457 R6 12l 310kW / 422PS",
      "Travego OM 457 12l R6 300kW / 408PS",
      "Travego OM 542 15,90l V6 320kW / 435PS",
      "Travego OM 542 15,90l V6 350kW / 476PS",
      "Travego OM 457 12l R6 260kW / 354PS",
      "Travego OM 457 12l R6 310kW / 422PS",
      "Travego EURO 6 RHD 10.6 V6 430 316kW / 430PS",
    ],
  },
  {
    name: "Neoplan",
    params: [
      "Centroliner 12l R6 162kW / 220PS",
      "Centroliner 12l R6 206kW / 280PS",
      "Centroliner 12l R6 265kW / 360PS",
      "Centroliner 12l R6 301kW / 409PS",
      "Cityliner 12.8l R6 338kW / 460PS",
      "Cityliner 12l R6 301kW / 409PS",
      "Euroliner 12l R6 265kW / 360PS",
      "Euroliner 12l R6 301kW / 409PS",
      "Euroliner 12l V6 260kW / 354PS",
      "Euroliner 12l V6 300kW / 408PS",
      "Skyliner 16l V8 350kW / 476PS",
      "Starliner 12.8l R6 338kW / 460PS",
      "Starliner 12l R6 301kW / 409PS",
      "Tourliner 12.8l R6 338kW / 460PS",
      "Tourliner 12l R6 301kW / 409PS",
      "Trendliner 12l R6 265kW / 360PS",
      "Trendliner 12l R6 301kW / 409PS",
      "Trendliner 12l V6 260kW / 354PS",
      "Trendliner 12l V6 300kW / 408PS",
    ],
  },
  {
    name: "Sor",
    params: [
      "C EURO 6 C10,5 6.7 V6 251 185kW / 252PS",
      "C EURO 6 C12 6.7 V6 286 210kW / 286PS",
      "C EURO 6 C9,5 6.7 V6 251 185kW / 252PS",
    ],
  },
  {
    name: "VDL Bus",
    params: [
      "Bus SB EURO 3 SB-230 9.2 V6 310 228kW / 310PS",
      "Bus SB EURO 5 SB-180 6.7 V6 255 188kW / 256PS",
      "Bus SB EURO 5 SB-200 6.7 V6 256 188kW / 256PS",
      "Bus SB EURO 6 SB-200 6.7 V6 255 188kW / 256PS",
      "Bus SB EURO 6 SB-230 8.7 V6 310 228kW / 310PS",
    ],
  },
  {
    name: "Volvo Bus",
    params: [
      "Bus SB EURO 3 SB-230 9.2 V6 310 228kW / 310PS",
      "Bus SB EURO 5 SB-180 6.7 V6 255 188kW / 256PS",
      "Bus SB EURO 5 SB-200 6.7 V6 256 188kW / 256PS",
      "Bus SB EURO 6 SB-200 6.7 V6 255 188kW / 256PS",
      "Bus SB EURO 6 SB-230 8.7 V6 310 228kW / 310PS",
    ],
  },
];

const Vozidla = () => {
  const [category, setCategory] = useState("");
  const filteredData = cars.filter((item) => item.name === category);

  return (
    <>
      <Head>
        <title>TTC Performance</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/media/Premium Package/Logos (Vector Format)/Transparent.svg"
        />
      </Head>
      <Navbar />
      <StyledRealizace>
        <img src="./media/foto/realizace.png" alt="" />
        <h1>Autobusy</h1>
        <div className="nav">
          <Link href="/vozidla">Značky vozidel</Link>
          {` > Autobusy`}
        </div>
        <ScrollContainer className="scroll-container container">
          {cars.map((car) => (
            <div
              key={car.name}
              className="item"
              onClick={() => setCategory(car.name)}
            >
              <p>{car.name}</p>
            </div>
          ))}
        </ScrollContainer>

        {filteredData.map((item) => (
          <ul key={item}>
            {item?.params?.map((par) => {
              const first = par.split(" ")[0];
              const second = par.split(" ")[1];
              var parts = par.split(" ");
              parts.shift();
              parts.shift();
              return (
                <li key={par}>
                  <span>
                    {first} {second}
                  </span>{" "}
                  {parts.join(" ")}
                </li>
              );
            })}
          </ul>
        ))}

        <p>&#8203;</p>
      </StyledRealizace>
      <Footer />
    </>
  );
};

export default Vozidla;
