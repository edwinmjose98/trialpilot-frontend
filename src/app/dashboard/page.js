"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    fetchData(token);
  }, []);

  const fetchData = async (token) => {
    const headers = { "Authorization": `Bearer ${token}` };
    
    const alertsRes = await fetch("http://localhost:8000/api/v1/alerts", { headers });
    const alertsData = await alertsRes.json();
    setAlerts(alertsData);

    const patientsRes = await fetch("http://localhost:8000/api/v1/patients", { headers });
    const patientsData = await patientsRes.json();
    setPatients(patientsData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Active Patients</h2>
          <p className="text-4xl font-bold text-blue-600">{patients.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Open Alerts</h2>
          <p className="text-4xl font-bold text-red-500">{alerts.length}</p>
        </div>

          </div>
          <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Alerts</h2>
              {alerts.length === 0 ? (
                  <p className="text-gray-400 text-sm">No open alerts</p>
              ) : (
                  alerts.map((alert) => (
                      <div key={alert.id} className="border-l-4 border-red-500 pl-4 py-2 mb-3">
                          <p className="text-sm font-medium text-gray-800">{alert.alert_type}</p>
                          <p className="text-sm text-gray-500">{alert.message}</p>
                      </div>
                  ))
              )}
</div>
    </div>
  )
}