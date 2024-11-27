import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <div className="p-0 m-0 bg-gradient-to-br min-w-fit from-black from-70% min-h-full via-blue-800 to-black ">
      <section className="flex justify-center items-center rounded-xl border shadow-xl bg-inherit border-sky-300 shadow-cyan-600 min-h-[230px]">
        <h1 className="p-9 m-10 text-5xl font-extrabold text-center uppercase bg-transparent rounded-lg border opacity-80 text-neutral-200 px-[100px] border-sky-300 md:px-[150px] lg:px-[250px]">
          Submit <br /> Your Startup
        </h1>
      </section>

      <StartupForm />
    </div>
  );
};

export default Page;
