const headers = new Headers();
headers.append("Accept", "application/json");

export const requestOptions = {
  method: "GET",
  headers,
  redirect: "follow",
} as const;

export const baseUrl = "https://www.dnd5eapi.co";
export const dndBeyond = "https://www.dndbeyond.com/monsters/";
