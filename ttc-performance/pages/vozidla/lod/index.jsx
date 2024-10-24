import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Link from "next/link";

const StyledRealizace = styled.main`
  background-image: url("../../Web_pozadi.svg");
  background-size: cover;
  background-position: top;

  width: 100%;
  height: auto;
  min-height: 100vh;

  color: #101c24;

  .hero {
    margin-bottom: 8rem;
    width: 100vw;
    height: 50vh;

    @media (max-width: 900px) {
      height: 90vh;
    }

    background-image: url("../../media/foto/vozidla.png");
    background-size: cover;
    background-position: center;

    display: flex;
    align-content: center;
    justify-content: center;

    color: white;

    div {
      align-self: center;
      text-align: center;

      h1 {
        font-size: 4rem;
        font-weight: bolder;
        line-height: 4.75rem;

        @media (max-width: 1280px) {
          font-size: 3rem;
        }
        @media (max-width: 600px) {
          font-size: 2rem;
        }
      }
      p {
        font-size: 2rem;
        font-weight: 100;

        @media (max-width: 1280px) {
          font-size: 1.5rem;
          letter-spacing: 0;
        }
        @media (max-width: 600px) {
          font-size: 1.5rem;
        }
      }
    }
  }

  .container {
    width: 80vw;
    margin: auto;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1.5rem;
    justify-content: center;

    .item {
      width: 8rem;
      white-space: nowrap;
      height: auto;
      padding: 1rem;
      background-color: #fff;
      transition: 150ms;
      font-size: 1rem;

      p {
        text-align: center;
        margin-bottom: 0.5rem;
        white-space: pre-wrap;
      }

      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);

      img {
        margin: auto;
        min-width: 4rem;
        width: 4rem;
        min-height: 3rem;
        height: 3rem;
        object-fit: contain;
      }

      &.active {
        background-color: #101c2499;
        color: white;
      }

      &:hover {
        cursor: pointer;
        color: white;
        background-color: #101c24;
      }
    }
  }

  ul {
    scroll-margin: 8rem;
    margin: auto;
    width: 85vw;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;

    h4 {
      font-size: 1.75rem;
      width: 100%;
      margin-top: 2rem;
      font-weight: 600;
    }
    p {
      margin-top: 1rem;
      font-size: 1.25rem;
      width: 100%;

      @media (max-width: 900px) {
        font-size: 1.15rem;
      }
    }

    li {
      font-size: 1.25rem;
      padding: 0.5rem;
      margin: 0.5rem;
      border-radius: 0.5rem;
      width: calc(50% - 1rem);
      text-align: left;

      @media (max-width: 900px) {
        width: calc(100% - 1rem);
        font-size: 1rem;
      }

      a {
        color: #e84048;
      }
    }
  }

  .nav {
    margin: auto;
    width: 85vw;
  }
`;

const Vozidla = () => {
  const [category, setCategory] = useState("");

  const [brands, setBrands] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/brands?category=boat`);
      const json = await res.json();
      const uniqueArr = json.filter((item, index) => {
        // Find the index of the first occurrence of the object with the same name
        const firstIndex = json.findIndex((obj) => obj.name === item.name);
        // Keep only the first occurrence of the object and remove the rest
        return index === firstIndex;
      });

      setBrands(uniqueArr);
    }
    fetchData();
  }, []);

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
        <div className="hero">
          <div>
            <h1>LODĚ</h1>
          </div>
        </div>
        <div className="nav">
          <Link href="/vozidla">Značky vozidel</Link>
          {` > Lodě`}
        </div>
        <div className="scroll-container container">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={category == brand.name ? "item active" : "item"}
              onClick={() => {
                setCategory(brand.name);
                document.getElementById("list").scrollIntoView();

                async function fetchModels() {
                  const res = await fetch(
                    `/api/models?` +
                      new URLSearchParams({
                        carName: brand.name,
                        category: "boat",
                      })
                  );
                  const json = await res.json();

                  const itemsWithIds = json.map((item) => {
                    return {
                      ...item,
                      id: Math.random(),
                    };
                  });

                  setFeatures(itemsWithIds[0].features);
                }
                fetchModels();
              }}
            >
              <p>{brand.name}</p>{" "}
              <img src={"/media/brands/" + brand.name + ".jpg"} alt="" />
            </div>
          ))}
        </div>

        <ul id="list">
          {features.map((feature) => {
            if (feature.tag == "h4") {
              return <h4 key={feature.id}>{feature.mark}</h4>;
            } else if (feature.tag == "p") {
              return <p key={feature.id}>{feature.mark}</p>;
            } else {
              return (
                <li key={feature.id}>
                  <Link
                    href={
                      "/vozidla/" +
                      feature.link.split("/")[6] +
                      "?name=" +
                      feature.mark +
                      " " +
                      category
                    }
                  >
                    {feature.mark}
                  </Link>
                </li>
              );
            }
          })}
        </ul>

        <p>&#8203;</p>
      </StyledRealizace>
      <Footer />
    </>
  );
};

export default Vozidla;
