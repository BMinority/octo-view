import React, { useState, useEffect } from "react";
import {
  FaCode,
  FaCodeBranch,
  FaStar,
  FaRegCommentDots,
  FaCodePullRequest,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";
import SearchButtons from "../components/SearchButtons";

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
}

const iconMap: Record<string, React.ReactNode> = {
  PushEvent: <FaCode />,
  PullRequestEvent: <FaCodePullRequest />,
  WatchEvent: <FaStar />,
  ForkEvent: <FaCodeBranch />,
  IssueCommentEvent: <FaRegCommentDots />,
};

function GitTimeline() {
  const [username, setUsername] = useState("");
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    if (username.trim()) {
      fetchEvents();
    }
  }, [page]);

  const fetchEvents = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/events?page=${page}&per_page=${perPage}`
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar eventos. Verifique o nome de usuário.");
      }

      const data = await res.json();

      if (data.length === 0) {
        setError("Nenhuma atividade encontrada para este usuário.");
        setEvents([]);
      } else {
        setEvents(data);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao buscar eventos.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const groupByDate = (events: GitHubEvent[]) => {
    return events.reduce((acc: Record<string, GitHubEvent[]>, event) => {
      const date = new Date(event.created_at).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(event);
      return acc;
    }, {});
  };

  const filteredEvents = filter
    ? events.filter((event) => event.type === filter)
    : events;

  const groupedEvents = groupByDate(filteredEvents);

  const clearSearch = () => {
    setUsername("");
    setEvents([]);
    setFilter(null);
    setPage(1);
    setError("");
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bc-git-timeline">
      <h2>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/pin/100/calendar.png"
          alt="calendar"
        />
        Linha do Tempo do GitHub
      </h2>

      <div className="bc-git-timeline__input">
        <input
          type="text"
          placeholder="Digite o username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <SearchButtons
          onSearch={() => {
            setPage(1);
            fetchEvents();
          }}
          onClear={clearSearch}
        />
      </div>

      {error && (
        <p className="bc-git-timeline__error">
          <FaExclamationTriangle /> {error}
        </p>
      )}

      {events.length > 0 && (
        <div className="bc-git-timeline__filters">
          <button onClick={() => setFilter(null)}>Todos</button>
          {Object.keys(iconMap).map((key) => (
            <button
              key={key}
              className={filter === key ? "active" : ""}
              onClick={() => setFilter(key)}
            >
              {iconMap[key]} {key.replace("Event", "")}
            </button>
          ))}
        </div>
      )}

      {loading && <p>Carregando...</p>}

      {!loading &&
        Object.entries(groupedEvents).map(([date, events]) => (
          <div key={date} className="bc-git-timeline__group">
            <h4>{date}</h4>
            {events.map((event) => (
              <motion.div
                key={event.id}
                className="bc-git-timeline__event"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="bc-git-timeline__icon">
                  {iconMap[event.type] || <FaCode />}
                </span>
                <p>
                  <strong>{event.type.replace("Event", "")}</strong> em{" "}
                  {event.repo.name}
                </p>
              </motion.div>
            ))}
          </div>
        ))}

      {events.length > 0 && (
        <div className="bc-git-timeline__pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>
            <FaArrowLeft /> Anterior
          </button>
          <span>Página {page}</span>
          <button onClick={handleNextPage}>
            Próxima <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default GitTimeline;
