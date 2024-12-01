import { auth } from "@/auth";
import CreatePageTitle from "@/components/CreatePageTitle";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <div className="p-0 m-0 bg-gradient-to-br min-w-fit from-black from-70% min-h-full via-blue-800 to-black ">
      <section className="flex justify-center items-center rounded-xl border shadow-xl bg-inherit border-sky-300 shadow-blue-600 min-h-[230px]">
        <CreatePageTitle />
      </section>
      <section className="pt-5">
        <StartupForm />
      </section>
    </div>
  );
};

export default Page;
