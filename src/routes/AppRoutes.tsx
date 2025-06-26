import { Routes, Route } from "react-router-dom";
import ButtonGroup from "../components/ButtonGroup";
import GitSearch from "../pages/GitSearch";
import RepoExplorer from "../pages/RepoExplorer";
import GitTimeline from "../pages/GitTimeline";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ButtonGroup />} />
      <Route path="/page-search" element={<GitSearch />} />
      <Route path="/page-repo-explorer" element={<RepoExplorer />} />
      <Route path="/page-git-timeline" element={<GitTimeline />} />
    </Routes>
  );
}

export default AppRoutes;
