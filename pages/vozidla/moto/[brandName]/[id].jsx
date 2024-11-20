// pages/vozidla/osobni/[brandName]/[specification].jsx

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import styled from "styled-components";
import { CircleSpinner } from "react-spinners-kit";
import supabase from "@/lib/supabaseClient";

const StyledDetail = styled.main`
  padding: 6rem 0 8rem 0;

  width: 100%;
  height: auto;

  color: #101c24;

  h1 {
    font-size: 2rem;
    font-weight: 900;
    line-height: 2rem;
    text-align: center;
    padding: 2rem;
    padding-bottom: 0rem;

    @media (max-width: 1280px) {
      font-size: 1.75rem;
      padding-bottom: 1rem;
    }
    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
  p.support {
    font-size: 1.5rem;
    font-weight: 100;
    letter-spacing: 0.25rem;
    text-align: center;

    @media (max-width: 1280px) {
      font-size: 1.25rem;
      letter-spacing: 0;
    }
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
  h2 {
    font-size: 2rem;
    font-weight: 900;
    line-height: 2rem;
    text-align: center;
    padding: 2rem;

    @media (max-width: 1280px) {
      font-size: 1.75rem;
    }
    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }

  .string {
    width: 100%;

    height: auto;
    margin: 4rem 0;
    padding: 4rem 27.7vw;

    background-color: #101c24;
    color: white;

    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (max-width: 1280px) {
      gap: 4rem;
    }

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @media (max-width: 1280px) {
        flex-direction: column;
        gap: 2.5rem;
      }

      font-weight: bold;
      font-size: 1.25rem;

      * {
        justify-self: center;

        justify-content: center;
      }

      &:nth-of-type(even) .param,
      &:nth-of-type(even) p {
        color: #e84048;
      }

      .param {
        width: min-content;
        text-align: left;
        line-height: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;

        @media (max-width: 1280px) {
          margin: auto;
          text-align: center;
        }

        span {
          font-weight: 100;
          font-size: 1rem;
          color: white;
          margin-right: auto;

          @media (max-width: 1280px) {
            margin: 0.5rem auto;
          }
        }
      }
      .value {
        text-align: left;
        font-size: 2rem;
        display: flex;
        height: min-content;
        gap: 2rem;

        span {
          font-weight: normal;
          color: white;
        }
      }
    }
  }

  .border {
    border-left: 2px solid gray;
  }

  .cards {
    height: auto;
    width: 80vw;
    margin: 4rem auto;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4rem;

    .card {
      width: max-content;
      height: auto;
      padding: 3rem 2rem;
      font-size: 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: white;
      border-radius: 1rem;

      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);

      &.racing p {
        color: #e84048;
        span {
          color: #101c24;
        }
        span:nth-of-type(even) {
          border-left: #101c24 1px solid;
        }
      }
      &.eco p {
        color: #39ff14;
        span {
          color: #101c24;
        }
        span:nth-of-type(even) {
          border-left: #101c24 1px solid;
        }
      }

      p {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        &:first-of-type {
          color: #101c24;
          font-weight: 900;
        }
        font-weight: bold;
        span {
          font-weight: normal;
        }
      }
    }
  }

  .chart {
    width: 75vw;
    max-height: 75vh;
    object-fit: contain;
    margin: 8rem auto;
  }
`;

export async function getStaticPaths() {
  // Do not prefetch paths; generate on-demand
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { brandName, id } = params;

  // Fetch engine data along with model_id and related brand information
  const { data: engineData, error: engineError } = await supabase
    .from("engines")
    .select("id, specifications, model_id, models ( brand_id )")
    .eq("id", id)
    .maybeSingle();

  if (engineError || !engineData) {
    console.log(engineError);
    return { notFound: true };
  }
  console.log("engineData: ", engineData);

  // Fetch the brand name from `brands` based on `brand_id`
  const { data: brandData, error: brandError } = await supabase
    .from("brands")
    .select("name")
    .eq("id", engineData.models.brand_id)
    .single();

  if (brandError || !brandData || brandData.name !== brandName) {
    console.log(brandError);
    return { notFound: true };
  }
  console.log("brandData: ", brandData);

  // Fetch the engine details from `engine_details` using `engine_id`
  const { data: engineDetailsData, error: detailsError } = await supabase
    .from("engine_details")
    .select("*")
    .eq("engine_id", engineData.id)
    .limit(1)
    .single();

  if (detailsError || !engineDetailsData) {
    console.log(detailsError);
    return { notFound: true };
  }

  return {
    props: {
      brandName: brandData.name,
      engineDetails: engineDetailsData,
      engineData: engineData,
    },
    revalidate: 3600, // Revalidate every hour
  };
}

const Detail = ({ brandName, engineDetails, engineData }) => {
  console.log(engineData);
  return (
    <>
      <Head>
        <title>
          {brandName} - {engineData.specifications}
        </title>
        <meta
          name="description"
          content="Detailed specifications for selected engine."
        />
        <link
          rel="icon"
          href="/media/Premium Package/Logos (Vector Format)/Transparent.svg"
        />
      </Head>
      <Navbar />

      <StyledDetail>
        <h1>
          {brandName.toUpperCase()} - {engineData.specifications.toUpperCase()}
        </h1>
        <p className="support">VYLADĚNO NA ZKUŠEBNĚ</p>

        {engineDetails ? (
          <>
            <div className="string">
              <div className="row">
                <div className="param">
                  ORIGINÁLNÍ <span>PARAMETRY</span>
                </div>
                <div className="value">
                  <p>
                    {engineDetails.original
                      .split(" ")[0]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> KW</span>
                  </p>
                  <span className="border"></span>
                  <p>
                    {engineDetails.original
                      .split(" ")[1]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> PS</span>
                  </p>
                  <span className="border"></span>
                  <p>
                    {engineDetails.original
                      .split(" ")[2]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> NM</span>
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="param">
                  MAXIMÁLNÍ <span>PARAMETRY</span>
                </div>
                <div className="value">
                  <p>
                    {engineDetails.maximal
                      .split(" ")[0]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> KW</span>
                  </p>
                  <span className="border"></span>
                  <p>
                    {engineDetails.maximal
                      .split(" ")[1]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> PS</span>
                  </p>
                  <span className="border"></span>
                  <p>
                    {engineDetails.maximal
                      .split(" ")[2]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> NM</span>
                  </p>
                </div>
              </div>
            </div>

            {engineDetails.eco && (
              <>
                <h2>3 RŮZNÉ VARIANTY ÚPRAV</h2>
                <div className="cards">
                  {["optimal", "eco", "racing"].map((type) => (
                    <div key={type} className={`card ${type}`}>
                      <p className="name">{type.toUpperCase()}</p>
                      <p>
                        {engineDetails[type]
                          .split(" ")[0]
                          .toUpperCase()
                          .slice(0, -2)}
                        <span> KW</span>
                        <span className="border"></span>
                        {engineDetails[type]
                          .split(" ")[1]
                          .toUpperCase()
                          .slice(0, -2)}
                        <span> PS</span>
                        <span className="border"></span>
                        {engineDetails[type]
                          .split(" ")[2]
                          .toUpperCase()
                          .slice(0, -2)}
                        <span> NM</span>
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {engineDetails.chart_url && (
              <img
                className="chart"
                src={engineDetails.chart_url}
                alt="Dyno chart"
              />
            )}
          </>
        ) : (
          <div style={{ margin: "20vh auto", width: "min-content" }}>
            <CircleSpinner size={100} color="grey" />
          </div>
        )}
      </StyledDetail>

      <Footer />
    </>
  );
};

export default Detail;
