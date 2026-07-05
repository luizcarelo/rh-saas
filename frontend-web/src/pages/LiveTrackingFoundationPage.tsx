import { useEffect, useMemo, useState } from "react";

import {
  FoundationEmployee,
  LocationTrackingPointFoundation,
  MobileDeviceFoundation,
  getFoundationEmployees,
  getLatestLiveTrackingPoints,
  getLiveTrackingPoints,
  getOrCreateBrowserDeviceUid,
  registerLiveTrackingDevice,
  sendLiveTrackingLocation,
} from "../lib/liveTrackingApi";

type UiStatus = "idle" | "loading" | "success" | "error";

function formatEmployeeName(employee: FoundationEmployee) {
  const firstName = employee.firstName || "";
  const lastName = employee.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  if (fullName) {
    return fullName;
  }

  return employee.email || employee.id;
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function pointLabel(point: LocationTrackingPointFoundation) {
  return `${point.latitude}, ${point.longitude}`;
}

export function LiveTrackingFoundationPage() {
  const [employees, setEmployees] = useState<FoundationEmployee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [device, setDevice] = useState<MobileDeviceFoundation | null>(null);
  const [points, setPoints] = useState<LocationTrackingPointFoundation[]>([]);
  const [latestPoints, setLatestPoints] = useState<LocationTrackingPointFoundation[]>([]);
  const [status, setStatus] = useState<UiStatus>("idle");
  const [message, setMessage] = useState("");
  const [lastCoordinates, setLastCoordinates] = useState<{
    latitude: number;
    longitude: number;
    accuracy?: number;
  } | null>(null);

  const selectedEmployee = useMemo(
    () => employees.find((employee) => employee.id === selectedEmployeeId),
    [employees, selectedEmployeeId],
  );

  async function loadEmployees() {
    setStatus("loading");
    setMessage("Carregando colaboradores Foundation...");

    try {
      const data = await getFoundationEmployees();
      setEmployees(data);

      if (!selectedEmployeeId && data.length > 0) {
        setSelectedEmployeeId(data[0].id);
      }

      setStatus("success");
      setMessage("Colaboradores carregados com sucesso.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erro ao carregar colaboradores.");
    }
  }

  async function refreshPoints() {
    setStatus("loading");
    setMessage("Atualizando pontos de rastreamento...");

    try {
      const [allPoints, latest] = await Promise.all([
        getLiveTrackingPoints(),
        getLatestLiveTrackingPoints(),
      ]);

      setPoints(allPoints);
      setLatestPoints(latest);
      setStatus("success");
      setMessage("Pontos atualizados com sucesso.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erro ao atualizar pontos.");
    }
  }

  async function handleRegisterDevice() {
    if (!selectedEmployeeId) {
      setStatus("error");
      setMessage("Selecione um colaborador antes de registrar o dispositivo.");
      return null;
    }

    setStatus("loading");
    setMessage("Registrando dispositivo web...");

    try {
      const deviceUid = getOrCreateBrowserDeviceUid();

      const registeredDevice = await registerLiveTrackingDevice({
        employeeProfileId: selectedEmployeeId,
        deviceUid,
        platform: "WEB",
        model: navigator.userAgent.slice(0, 200),
        appVersion: "frontend-validation",
      });

      setDevice(registeredDevice);
      setStatus("success");
      setMessage("Dispositivo registrado com sucesso.");

      return registeredDevice;
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erro ao registrar dispositivo.");
      return null;
    }
  }

  function getBrowserLocation() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocalização não disponível neste navegador."));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 30000,
      });
    });
  }

  async function handleSendCurrentLocation() {
    if (!selectedEmployeeId) {
      setStatus("error");
      setMessage("Selecione um colaborador antes de enviar localização.");
      return;
    }

    setStatus("loading");
    setMessage("Capturando localização do navegador...");

    try {
      const activeDevice = device || (await handleRegisterDevice());

      if (!activeDevice) {
        return;
      }

      const position = await getBrowserLocation();

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      setLastCoordinates({
        latitude,
        longitude,
        accuracy,
      });

      setMessage("Enviando ponto GPS para a Foundation...");

      await sendLiveTrackingLocation({
        employeeProfileId: selectedEmployeeId,
        deviceId: activeDevice.id,
        latitude,
        longitude,
        accuracyMeters: accuracy,
        source: "WEB",
        trackedAt: new Date().toISOString(),
        metadata: {
          origem: "frontend-web",
          tela: "LiveTrackingFoundationPage",
          userAgent: navigator.userAgent,
        },
      });

      setStatus("success");
      setMessage("Localização enviada com sucesso.");

      await refreshPoints();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erro ao enviar localização.");
    }
  }

  useEffect(() => {
    loadEmployees();
    refreshPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusClass =
    status === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : status === "success"
        ? "border-green-200 bg-green-50 text-green-700"
        : status === "loading"
          ? "border-blue-200 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Foundation
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Live Tracking
          </h1>
          <p className="max-w-3xl text-sm text-slate-600">
            Tela simples de validação do Live Tracking usando mobile_devices e
            location_tracking_points. Esta fase não utiliza mapa.
          </p>
        </div>
      </div>

      <div className={`rounded-xl border p-4 text-sm ${statusClass}`}>
        {message || "Pronto para validar Live Tracking."}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            1. Colaborador e dispositivo
          </h2>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Colaborador Foundation
              </span>
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={selectedEmployeeId}
                onChange={(event) => {
                  setSelectedEmployeeId(event.target.value);
                  setDevice(null);
                }}
              >
                <option value="">Selecione...</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {formatEmployeeName(employee)} - {employee.status || "sem status"}
                  </option>
                ))}
              </select>
            </label>

            {selectedEmployee ? (
              <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <p>
                  <strong>ID:</strong> {selectedEmployee.id}
                </p>
                <p>
                  <strong>E-mail:</strong> {selectedEmployee.email || "-"}
                </p>
                <p>
                  <strong>Status:</strong> {selectedEmployee.status || "-"}
                </p>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadEmployees}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Recarregar colaboradores
              </button>

              <button
                type="button"
                onClick={handleRegisterDevice}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Registrar dispositivo web
              </button>
            </div>

            {device ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                <p>
                  <strong>Device ID:</strong> {device.id}
                </p>
                <p>
                  <strong>Device UID:</strong> {device.deviceUid}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            2. Enviar localização atual
          </h2>

          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-600">
              O navegador solicitará permissão de localização. O ponto será enviado
              para location_tracking_points.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSendCurrentLocation}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Capturar e enviar localização
              </button>

              <button
                type="button"
                onClick={refreshPoints}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Atualizar listas
              </button>
            </div>

            {lastCoordinates ? (
              <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <p>
                  <strong>Latitude:</strong> {lastCoordinates.latitude}
                </p>
                <p>
                  <strong>Longitude:</strong> {lastCoordinates.longitude}
                </p>
                <p>
                  <strong>Precisão:</strong> {lastCoordinates.accuracy ?? "-"} m
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Últimas localizações por colaborador
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-2">Employee Profile</th>
                <th className="px-3 py-2">Coordenadas</th>
                <th className="px-3 py-2">Precisão</th>
                <th className="px-3 py-2">Origem</th>
                <th className="px-3 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {latestPoints.map((point) => (
                <tr key={point.id} className="border-b border-slate-100">
                  <td className="px-3 py-2">{point.employeeProfileId || "-"}</td>
                  <td className="px-3 py-2">{pointLabel(point)}</td>
                  <td className="px-3 py-2">{point.accuracyMeters || "-"}</td>
                  <td className="px-3 py-2">{point.source || "-"}</td>
                  <td className="px-3 py-2">{formatDate(point.trackedAt)}</td>
                </tr>
              ))}
              {latestPoints.length === 0 ? (
                <tr>
                  <td className="px-3 py-4 text-slate-500" colSpan={5}>
                    Nenhuma última localização encontrada.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Pontos recentes
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Employee Profile</th>
                <th className="px-3 py-2">Device</th>
                <th className="px-3 py-2">Coordenadas</th>
                <th className="px-3 py-2">Origem</th>
                <th className="px-3 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => (
                <tr key={point.id} className="border-b border-slate-100">
                  <td className="px-3 py-2">{point.id}</td>
                  <td className="px-3 py-2">{point.employeeProfileId || "-"}</td>
                  <td className="px-3 py-2">{point.deviceId || "-"}</td>
                  <td className="px-3 py-2">{pointLabel(point)}</td>
                  <td className="px-3 py-2">{point.source || "-"}</td>
                  <td className="px-3 py-2">{formatDate(point.trackedAt)}</td>
                </tr>
              ))}
              {points.length === 0 ? (
                <tr>
                  <td className="px-3 py-4 text-slate-500" colSpan={6}>
                    Nenhum ponto recente encontrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
