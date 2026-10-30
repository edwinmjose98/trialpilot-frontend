"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Protocols() {
  const [protocols, setProtocols] = useState([]);
  const [file, setFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/"); return; }
    fetchProtocols(token);
  }, []);

  const fetchProtocols = async (token) => {
    const res = await fetch("http://localhost:8000/api/v1/protocols", {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await res.json();
    setProtocols(data);
  };

  const handleParse = async () => {
    if (!file) return alert("Select a PDF first");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/api/v1/protocols/1/parse-pdf", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    alert(`Parsed: ${data.visits_created} visits created`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Protocols</h1>

      <div className="mb-6 flex items-center gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm text-gray-600"
        />
        <button
          onClick={handleParse}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          Parse Protocol PDF
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {protocols.map((protocol) => (
              <tr key={protocol.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{protocol.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{protocol.title}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {protocol.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}