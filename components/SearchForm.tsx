import Form from "next/form";

import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="border-sky-100 max-w-3xl w-full min-h-[80px] bg-white border-[5px] rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5"
    >
      <input
        name="query"
        defaultValue={query}
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none"
        placeholder="Search Startups"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button>
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
