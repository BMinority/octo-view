import { useEffect, useState } from "react";
import { fetchUser, fetchUserRepos } from "../services/githubServices";
import UserCard from "../components/UserCard";
import RepoCard from "../components/RepoCard";
import Spinner from "../components/Spinner";
import SearchButtons from "../components/SearchButtons";
import { FaBoxOpen, FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  location: string;
}

const GitSearch = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    try {
      const user = await fetchUser(username);
      setUserData(user);
      setPage(1);
      setError("");
    } catch {
      setUserData(null);
      setRepos([]);
      setError("Usuário não encontrado.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUsername("");
    setUserData(null);
    setRepos([]);
    setError("");
    setPage(1);
  };

  useEffect(() => {
    const getRepos = async () => {
      if (userData) {
        try {
          const repoData = await fetchUserRepos(userData.login, page, perPage);
          setRepos(repoData);
        } catch {
          setRepos([]);
        }
      }
    };

    getRepos();
  }, [userData, page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <section className="bc-git-search">
      <h2>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/arcade/64/search.png"
          alt="search"
        />
        Buscar usuário do GitHub
      </h2>

      <div className="bc-git-search__input-group">
        <input
          type="text"
          placeholder="Digite o username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <SearchButtons onSearch={handleSearch} onClear={handleClear} />
      </div>

      {loading && <Spinner />}
      {error && <p className="bc-git-search__error">{error}</p>}

      {userData && repos.length > 0 && (
        <div className="bc-git-search__content">
          <UserCard user={userData} />

          <div className="bc-git-search__repos">
            <h3>
              <FaBoxOpen /> Repositórios públicos
            </h3>

            {repos.map((repo) => (
              <RepoCard key={repo.name} {...repo} />
            ))}

            <div className="bc-git-search__pagination">
              <button onClick={handlePrevPage} disabled={page === 1}>
                <FaArrowLeft /> Anterior
              </button>
              <span>Página {page}</span>
              <button onClick={handleNextPage}>
                Próxima <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GitSearch;
