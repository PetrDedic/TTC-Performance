import supabase from "./supabaseClient";

/**
 * Fetch all image sections from the database
 * @returns {Promise<Array>} Array of image sections
 */
export const getAllImageSections = async () => {
  const { data, error } = await supabase
    .from("image_sections")
    .select("*")
    .order("section_name", { ascending: true });

  if (error) {
    console.error("Error fetching image sections:", error);
    return [];
  }

  return data || [];
};

/**
 * Fetch a specific image section by its key
 * @param {string} sectionKey - The key of the section to fetch
 * @returns {Promise<Object|null>} The image section or null if not found
 */
export const getImageSectionByKey = async (sectionKey) => {
  const { data, error } = await supabase
    .from("image_sections")
    .select("*")
    .eq("section_key", sectionKey)
    .single();

  if (error) {
    console.error(
      `Error fetching image section with key "${sectionKey}":`,
      error
    );
    return null;
  }

  return data;
};

/**
 * Fetch multiple image sections by their keys
 * @param {Array<string>} sectionKeys - Array of section keys to fetch
 * @returns {Promise<Array>} Array of image sections
 */
export const getImageSectionsByKeys = async (sectionKeys) => {
  const { data, error } = await supabase
    .from("image_sections")
    .select("*")
    .in("section_key", sectionKeys)
    .order("section_name", { ascending: true });

  if (error) {
    console.error("Error fetching image sections by keys:", error);
    return [];
  }

  return data || [];
};

/**
 * Get image URLs for a specific section
 * @param {string} sectionKey - The key of the section
 * @returns {Promise<Array>} Array of image URLs
 */
export const getImageUrlsForSection = async (sectionKey) => {
  const section = await getImageSectionByKey(sectionKey);
  return section?.image_urls || [];
};
