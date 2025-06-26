import axios from "axios";

export const fetchUser = async (username: string) => {
  try {
    const respose = await axios.get(`https://api.github.com/users/${username}`);
    return respose.data;
  } catch (error) {
    throw new Error("Usuário não encontrado");
  }
};

export const fetchUserRepos = async (
  username: string,
  page = 1,
  perPage = 6
) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`
  );
  return response.data;
};
