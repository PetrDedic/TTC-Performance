// pages/vozidla/osobni/[brandName]/[specification].jsx

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { CircleSpinner } from "react-spinners-kit";
import supabase from "@/lib/supabaseClient";
import Hero from "@/components/Hero";
import styles from "./[id].module.css";

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
        <link rel="icon" href="TTC_WEB_Icon.svg" />
      </Head>
      <Navbar />
      <Hero
        image="/media/foto/vozidla.png"
        title={`${brandName.toUpperCase()} - ${engineData.specifications.toUpperCase()}`}
      />
      <main className={styles.detail}>
        {engineDetails ? (
          <>
            <div className={styles.string}>
              <div className={styles.row}>
                <div className={styles.param}>
                  ORIGINÁLNÍ <span>PARAMETRY</span>
                </div>
                <div className={styles.value}>
                  <p>
                    {engineDetails.original
                      .split(" ")[0]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> KW</span>
                  </p>
                  <span className={styles.border}></span>
                  <p>
                    {engineDetails.original
                      .split(" ")[1]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> PS</span>
                  </p>
                  <span className={styles.border}></span>
                  <p>
                    {engineDetails.original
                      .split(" ")[2]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> NM</span>
                  </p>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.param}>
                  MAXIMÁLNÍ <span>PARAMETRY</span>
                </div>
                <div className={styles.value}>
                  <p>
                    {engineDetails.maximal
                      .split(" ")[0]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> KW</span>
                  </p>
                  <span className={styles.border}></span>
                  <p>
                    {engineDetails.maximal
                      .split(" ")[1]
                      .toUpperCase()
                      .slice(0, -2)}
                    <span> PS</span>
                  </p>
                  <span className={styles.border}></span>
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
                <div className={styles.cards}>
                  {["optimal", "eco", "racing"].map((type) => (
                    <div
                      key={type}
                      className={`${styles.card} ${styles[type]}`}
                    >
                      <p className="name">{type.toUpperCase()}</p>
                      <p>
                        {engineDetails[type]
                          .split(" ")[0]
                          .toUpperCase()
                          .slice(0, -2)}
                        <span> KW</span>
                        <span className={styles.border}></span>
                        {engineDetails[type]
                          .split(" ")[1]
                          .toUpperCase()
                          .slice(0, -2)}
                        <span> PS</span>
                        <span className={styles.border}></span>
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
                className={styles.chart}
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
      </main>

      <Footer />
    </>
  );
};

export default Detail;
