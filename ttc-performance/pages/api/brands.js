import objectsData from "./brands.json";

export default function handler(req, res) {
  const { category } = req.query;

  // Filter objects by category
  const filteredObjects = objectsData.filter(
    (object) => object.category === category
  );

  // Send the filtered objects as a response
  res.status(200).json(filteredObjects);
}
