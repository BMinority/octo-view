import { motion } from "framer-motion";

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

interface UserCardProps {
  user: GitHubUser;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <motion.section
      className="bc-user-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <img src={user.avatar_url} alt={`Avatar de ${user.login}`} width={100} />
      <h3>
        {user.name} <span>({user.login})</span>
      </h3>
      <p>{user.bio}</p>
      <p>📍 {user.location}</p>
      <p>📦 Repositórios: {user.public_repos}</p>
      <p>👥 Seguidores: {user.followers}</p>
      <p>👤 Seguindo: {user.following}</p>
      <a href={user.html_url} target="_blank" rel="noreferrer">
        Ver perfil no GitHub
      </a>
    </motion.section>
  );
};

export default UserCard;
