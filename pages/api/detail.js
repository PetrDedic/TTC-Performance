import objectsData from "./detail.json";

export default async function handler(req, res) {
  const { detail } = req.query;

  try {
    const filteredData = objectsData.filter((data) => data.url == detail);

    // Return the filtered features
    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving features." });
  }
}
