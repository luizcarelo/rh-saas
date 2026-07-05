import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

type AnalyticsData = {
  totalRecords: number;
  punctualityRate: number;
  overtimeMinutes: number;
  absenteeismRate: number;
};

export function AnalyticsPage() {
  const hoje = new Date().toISOString().slice(0, 10);

  const [start, setStart] = useState(hoje);
  const [end, setEnd] = useState(hoje);

  const [data, setData] = useState<AnalyticsData | null>(null);

  async function loadAnalytics() {
    const result = await apiRequest<AnalyticsData>(
      `/v1/analytics/overview?start=${start}&end=${end}`
    );

    setData(result);
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Analytics RH
      </h1>

      <div className="flex gap-4">

        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="rounded border p-2"
        />

        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="rounded border p-2"
        />

        <button
          onClick={loadAnalytics}
          className="rounded bg-cyan-600 px-4 py-2 text-white"
        >
          Atualizar
        </button>

      </div>

      {data && (

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="rounded-lg border border-white/10 p-4">
            <div className="text-sm">Registros</div>
            <div className="text-2xl font-bold">
              {data.totalRecords}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 p-4">
            <div className="text-sm">Pontualidade</div>
            <div className="text-2xl font-bold">
              {data.punctualityRate}%
            </div>
          </div>

          <div className="rounded-lg border border-white/10 p-4">
            <div className="text-sm">Horas Extras</div>
            <div className="text-2xl font-bold">
              {data.overtimeMinutes}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 p-4">
            <div className="text-sm">Absenteísmo</div>
            <div className="text-2xl font-bold">
              {data.absenteeismRate}%
            </div>
          </div>

        </div>

      )}

    </div>
  );
}
