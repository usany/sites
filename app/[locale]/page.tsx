import { Projects } from "../components/projects";

export default async function Page({ params }) {
  const { locale } = await params;
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`Hi, I'm cb ahn. These are some of the projects I've worked on. You can find more on my GitHub.`}
      </p>
      <div className="my-8">
        <Projects />
      </div>
    </section>
  );
}
