export default function Contact() {
  return (
    <div className="px-8 py-16 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>

      <form className="space-y-4">
        <input className="border w-full p-2" placeholder="Name" />
        <input className="border w-full p-2" placeholder="Email" />
        <textarea className="border w-full p-2" placeholder="Message" />
        <button className="bg-black text-white px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
}
