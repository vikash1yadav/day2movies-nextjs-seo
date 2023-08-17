import { useRouter } from 'next/router';


// interface SearchBarProps {
//   value: string;
//   setValue: (val: string) => void;
// }
const iconButtonClass =
  "ml-3 p-2 border border-inputPlaceholder hover:bg-bg2 rounded-md";


const SearchBar = ({ setValue, value }) => {
  const router = useRouter();

  const handleInput = (e) => setValue(e.currentTarget.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) router.push({ pathname: `/search/${value.toLowerCase()}` });
    setValue('');
  };

  return (
    <div className="flex items-center w-full md:w-auto">
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search"
          value={value}
          onChange={handleInput}
          // aria-label="search"
          className="text-[black] p-[5px] transition-width w-full md:w-60 md:focus:w-80 lg:focus:w-96 py-1.5 focus:border-accent border-b-2 border-inputBorder placeholder-inputPlaceholder focus:outline-none"
          // transition-width w-full md:w-60 md:focus:w-80 lg:focus:w-96 py-1.5 focus:border-accent bg-bgFull border-b-2 border-inputBorder placeholder-inputPlaceholder focus:outline-none
        />
      </form>
      <a
        aria-label="View On GitHub"
        title="View On GitHub"
        href=""
        target="_blank"
        rel="noopener noreferrer"
        className={iconButtonClass}
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </a>
    </div>
  );
};

export default SearchBar;
