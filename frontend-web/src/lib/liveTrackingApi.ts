import { apiRequest } from "./api";

export type FoundationEmployee = {
  id: string;
  clientId?: string;
  employeeExternalRef?: string | null;
  firstName?: string;
  lastName?: string;
  cpf?: string | null;
  email?: string | null;
  departmentId?: string | null;
  jobPositionId?: string | null;
  jobFunctionId?: string | null;
  admissionDate?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RegisterMobileDevicePayload = {
  employeeProfileId?: string;
  deviceUid: string;
  platform?: string;
  model?: string;
  appVersion?: string;
};

export type MobileDeviceFoundation = {
  id: string;
  clientId?: string;
  employeeProfileId?: string | null;
  deviceUid: string;
  platform?: string | null;
  model?: string | null;
  appVersion?: string | null;
  isActive?: boolean;
  lastSeenAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateLocationTrackingPointPayload = {
  employeeProfileId: string;
  deviceId?: string;
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  address?: string;
  source?: string;
  trackedAt?: string;
  metadata?: Record<string, unknown>;
};

export type LocationTrackingPointFoundation = {
  id: string;
  clientId?: string;
  employeeProfileId?: string | null;
  deviceId?: string | null;
  trackedAt?: string;
  latitude: string | number;
  longitude: string | number;
  accuracyMeters?: string | number | null;
  address?: string | null;
  source?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

export async function getFoundationEmployees() {
  return apiRequest<FoundationEmployee[]>("/v1/foundation/hr/employees");
}

export async function registerLiveTrackingDevice(
  payload: RegisterMobileDevicePayload,
) {
  return apiRequest<MobileDeviceFoundation>(
    "/v1/foundation/live-tracking/device",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function sendLiveTrackingLocation(
  payload: CreateLocationTrackingPointPayload,
) {
  return apiRequest<LocationTrackingPointFoundation>(
    "/v1/foundation/live-tracking/location",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function getLiveTrackingPoints() {
  return apiRequest<LocationTrackingPointFoundation[]>(
    "/v1/foundation/live-tracking/points",
  );
}

export async function getLatestLiveTrackingPoints() {
  return apiRequest<LocationTrackingPointFoundation[]>(
    "/v1/foundation/live-tracking/latest",
  );
}

export function getOrCreateBrowserDeviceUid() {
  const storageKey = "rh_live_tracking_device_uid";
  const existing = localStorage.getItem(storageKey);

  if (existing) {
    return existing;
  }

  const generated =
    "web-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 10);

  localStorage.setItem(storageKey, generated);

  return generated;
}
