"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    fetchPatients(token);
  }, []);

  const fetchPatients = async (token) => {
    const res = await fetch("http://localhost:8000/api/v1/patients", {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await res.json();
    setPatients(data);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Patients</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Enrollment Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{patient.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{patient.full_name}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-900">{patient.enrollment_date?.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}