import { Link } from "react-router";

const JoinUs = () => {
  return (
    <section
      class="bg-linear-to-b from-cyan-50 to-blue-100 
dark:from-gray-900 dark:to-gray-800 lg:grid  lg:place-content-center "
    >
      <div class="mx-auto w-screen max-w-7xl px-4 py-10 md:py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div class=" mx-auto max-w-prose text-start md:text-center">
          <h1 class="text-2xl font-bold text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
            Get
            <strong class="text-cyan-600"> Started </strong>
            With HomeHero
          </h1>

          <p class="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            Become part of a trusted network where users and service providers
            connect, support, and grow together. Your journey to hassle-free
            home services starts here.
          </p>

          <div class="mt-4 flex justify-start md:justify-center gap-4 sm:mt-6">
            <Link
              to={"/auth/registration"}
              class="inline-block rounded border border-cyan-600 bg-cyan-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-cyan-700"
              href="#"
            >
              Join Now !
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
