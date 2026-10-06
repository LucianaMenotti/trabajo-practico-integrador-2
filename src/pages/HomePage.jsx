import { useFetch } from "../hooks/useFetch";

export default function HomePage() {
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/api/articles"
  );

  if (isLoading) {
    return <p className="text-center mt-10">Cargando artículos...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center mt-10">No hay artículos publicados.</p>;
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Artículos</h1>

      {data.map((article) => (
        <article key={article.id} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <p className="text-gray-700 mt-2">{article.excerpt}</p>
          <p className="text-sm text-gray-500 mt-2">
            Autor: {article.author ? article.author.username : "Desconocido"}
          </p>
        </article>
      ))}
    </main>
  );
}