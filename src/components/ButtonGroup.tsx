import { useNavigate } from "react-router-dom";
const ButtonGroup = () => {
  const navigate = useNavigate();

  return (
    <div className="bc-button-group">
      <h2>Escolha uma funcionalidade:</h2>
      <div className="bc-button-group__buttons">
        <button onClick={() => navigate("/page-search")}>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/stickers/100/search.png"
            alt="search"
          />
          DevFinder
        </button>
        <button onClick={() => navigate("/page-repo-explorer")}>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/stickers/100/box.png"
            alt="box"
          />
          GitRepoExplorer
        </button>
        <button onClick={() => navigate("/page-git-timeline")}>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/stickers/100/delivery-time.png"
            alt="delivery-time"
          />
          GitHubTimeline
        </button>
      </div>
    </div>
  );
};

export default ButtonGroup;
