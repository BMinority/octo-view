import { useState, useEffect } from "react";
import { MdEditDocument } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import SearchButtons from "../components/SearchButtons";

interface RepoItem {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

const RepoExplorer = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=10`
      );
      setRepos(response.data.items);
      setTotalCount(response.data.total_count);
    } catch (err) {
      setError("Erro ao buscar repositórios.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setRepos([]);
    setTotalCount(0);
    setPage(1);
  };

  useEffect(() => {
    if (query) handleSearch();
  }, [page]);

  return (
    <div className="bc-repo-explorer">
      <h2>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/isometric/50/box.png"
          alt="box"
        />{" "}
        GitRepoExplorer: Busque repositórios
      </h2>

      <div className="bc-repo-explorer__controls">
        <input
          type="text"
          placeholder="Ex: react, weather, portfolio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButtons
          onSearch={() => {
            setPage(1);
            handleSearch();
          }}
          onClear={handleClear}
        />
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && repos.length > 0 && (
        <p className="bc-repo-explorer__total">
          🔍 {totalCount.toLocaleString()} repositórios encontrados
        </p>
      )}

      <div className="bc-repo-explorer__results">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h3>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.full_name}
              </a>
            </h3>
            <p>{repo.description}</p>
            <p id="bc-count-repo">
              <i className="star-icon icon">
                <IoStarSharp />
              </i>
              {repo.stargazers_count}
              <i className="doc-icon icon">
                <MdEditDocument />
              </i>{" "}
              {repo.language || "Não especificada"}
            </p>
            <p>
              <strong>
                Owner:{" "}
                <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
                  {repo.owner.login}
                </a>
              </strong>
            </p>
          </div>
        ))}
      </div>

      {repos.length > 0 && (
        <div className="bc-repo-explorer__pagination">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            <FaArrowLeft />
            Anterior
          </button>
          <span>Página {page}</span>
          <button onClick={() => setPage((p) => p + 1)}>
            Próxima <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default RepoExplorer;
