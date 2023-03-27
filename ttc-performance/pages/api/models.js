import objectsData from "./brands.json";

export default async function handler(req, res) {
  const { category, carName } = req.query;

  try {
    const filteredData = objectsData
      .filter((data) => data.name == carName)
      .filter((data) => data.category == category);

    // Return the filtered features
    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving features." });
  }
}
