import { motion } from "framer-motion";

interface RepoCardProps {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

const RepoCard = ({
  name,
  description,
  html_url,
  language,
  stargazers_count,
}: RepoCardProps) => {
  return (
    <motion.article
      className="bc-repo-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4>{name}</h4>

      <p>{description || "Sem descrição."}</p>

      <p className="bc-repo-card__info">
        <img
          src="https://img.icons8.com/color/48/document--v1.png"
          alt="Ícone de linguagem"
          width={24}
          height={24}
        />
        Linguagem: {language || "Não definida"}
      </p>

      <p className="bc-repo-card__info">
        <img
          src="https://img.icons8.com/fluency/48/star--v1.png"
          alt="Ícone de estrela"
          width={24}
          height={24}
        />
        Stars: {stargazers_count}
      </p>

      <a href={html_url} target="_blank" rel="noreferrer">
        Ver repositório
      </a>
    </motion.article>
  );
};

export default RepoCard;
