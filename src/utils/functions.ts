import axios from "axios";

export async function fetchData() {
  try {
    const response = await axios.get("https://pluga.co/ferramentas_search.json");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar ferramentas:", error);
    return [];
  }
}