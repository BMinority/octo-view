import { ImSearch } from "react-icons/im";
import { MdCleaningServices } from "react-icons/md";

interface SearchButtonsProps {
  onSearch: () => void;
  onClear: () => void;
}

const SearchButtons = ({ onSearch, onClear }: SearchButtonsProps) => {
  return (
    <>
      <button className="search-button" onClick={onSearch}>
        <ImSearch />
        Buscar
      </button>
      <button className="search-button" onClick={onClear}>
        <MdCleaningServices />
        Limpar
      </button>
    </>
  );
};

export default SearchButtons;
