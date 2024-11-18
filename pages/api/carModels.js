import brandsData from "./brands.json";
import detailsData from "./detail.json";

export default function handler(req, res) {
  const searchUrl = req.query.link;
  const carModels = [];

  // Iterate through each brand in the brands.json file
  brandsData.forEach((brand) => {
    const { name, category, url } = brand;

    // Iterate through each feature in the brand's "features" array
    brand.features.forEach((feature) => {
      if (feature.link === searchUrl) {
        // Find the detail object in details.json that matches the feature link
        const detail = detailsData.find((detail) => detail.url === searchUrl);

        if (detail) {
          // Add the car model info to the array of car models
          const { mark } = feature;
          const { ORIGINALHODNOTY, MAXIMAL } = detail;
          const carModel = {
            name,
            category,
            mark,
            url,
            ORIGINALHODNOTY,
            MAXIMAL,
          };
          carModels.push(carModel);
        }
      }
    });
  });

  res.status(200).json(carModels);
}
