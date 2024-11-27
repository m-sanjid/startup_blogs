import Form from "next/form";

import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="border-sky-100 hover:border-sky-500 w-1/2 min-h-[80px] bg-transparent hover:shadow-sky-500 hover:shadow-md  opacity-90 border-[1px] rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5 text-white"
    >
      <input
        name="query"
        defaultValue={query}
        className="flex-1 font-bold placeholder:font-semibold bg-inherit placeholder:text-black-100 w-full h-auto outline-none"
        placeholder="Search Startups"
      />

      <div className="flex bg-transparent gap-2">
        {query && <SearchFormReset />}

        <button>
          <Search className="size-9 stroke-2 hover:stroke-2 stroke-sky-500 bg-transparent hover:stroke-white" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
