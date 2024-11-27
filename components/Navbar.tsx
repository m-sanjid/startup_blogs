import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="sticky py-3 px-5 w-screen bg-black shadow-md hover:shadow-lg backdrop-blur-lg shadow-cyan-500/50 font-work-sans hover:border-b-1 hover:border-cyan-500/50 hover:shadow-cyan-500/50">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            className="p-0 m-0 rounded-lg border-cyan-500 shadow-md outline-none border-b-1 shadow-cyan-500"
            src="/logo.png"
            alt="logo"
            width={120}
            height={30}
          />
        </Link>

        <div className="flex gap-5 items-center text-cyan-600">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="sm:hidden size-6" />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="text-cyan-600 sm:hidden size-6" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
