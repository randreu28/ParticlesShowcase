import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const isRouter = useRouter();
  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="py-4 text-white z-10">
        <div className="justify-between flex w-full max-w-6xl m-auto px-3">
          <Link href="/">
            <a className={isRouter.asPath == "/" ? "hover:opacity-50 duration-200 text-rose-400" : "hover:opacity-50 duration-200"}>Vanilla Three.js</a>
          </Link>
          <Link href="/fiver">
            <a className={isRouter.asPath == "/fiver" ? "hover:opacity-50 duration-200 text-rose-400" : "hover:opacity-50 duration-200"}>React-Three-Fiver</a>
          </Link>
        </div>
      </header>
      <main className="fixed">{children}</main>
      <footer className="z-10">
        <div className="max-w-6xl m-auto flex flex-col sm:flex-row justify-between pt-2 px-3 text-gray-500">
          <a
            className="underline text-blue-400 my-auto py-2"
            href="mailto:randreu28@gmail.com"
          >
            randreu28@gmail.com
          </a>

          <div className="flex space-x-4 py-5">
            <a
              className="my-auto"
              href="https://www.behance.net/RubenChiquin"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="h-8 w-auto fill-current text-white hover:cursor-pointer hover:opacity-75 duration-200"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.228 15.01H6V13h2.261c1.878 0 2.003 2.01-.033 2.01zm6.758-2.677h3.018c-.117-1.715-2.73-1.977-3.018 0zM8.182 9H6v2h2.389c1.673 0 1.937-2-.207-2zM24 5v14a5 5 0 01-5 5H5a5 5 0 01-5-5V5a5 5 0 015-5h14a5 5 0 015 5zM14 8h5V7h-5v1zm-3.552 3.618c1.907-.974 1.837-4.55-1.813-4.604H4v9.978h4.311c4.522 0 4.445-4.534 2.137-5.374zm9.487.602c-.274-1.763-1.528-2.95-3.583-2.95-2.094 0-3.352 1.34-3.352 3.947C13 15.848 14.367 17 16.416 17s3.106-1.135 3.4-2h-2.111c-.736.855-2.893.521-2.767-1.353h5.06c.01-.634-.012-1.089-.063-1.427z"></path>
              </svg>
            </a>
            <a
              className="my-auto"
              href="https://www.linkedin.com/in/rubén-chiquin-0a153721a/"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="h-8 w-auto fill-current text-white hover:cursor-pointer hover:opacity-75 duration-200"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"></path>
              </svg>
            </a>
            <a
              className="my-auto"
              href="https://github.com/randreu28"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="h-8 w-auto fill-current text-white hover:cursor-pointer hover:opacity-75 duration-200"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <div className="flex pb-5 px-3 m-auto pt-5 border-t border-gray-500 text-gray-500 text-sm flex-col md:flex-row max-w-6xl">
            © Copyright 2020. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
