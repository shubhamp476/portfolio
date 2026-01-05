export default function Admin() {
  return (
    <div className="px-8 py-16 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Blog</h1>

      <input className="border w-full p-2 mb-4" placeholder="Title" />
      <input className="border w-full p-2 mb-4" placeholder="Image URL" />
      <textarea className="border w-full p-2 mb-4" placeholder="Content" />
      <button className="bg-black text-white px-4 py-2">
        Publish
      </button>
    </div>
  );
}
