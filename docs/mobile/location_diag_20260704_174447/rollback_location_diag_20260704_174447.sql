-- Rollback Mobile-A5-LOCATION-DIAG
-- Gerado em: 20260704_174447

DELETE FROM location_tracking_points
WHERE id = '212f4a5e-e215-4f48-9ba7-ebd925c857ba';

DELETE FROM mobile_devices
WHERE id = 'cc5ac973-5d50-4ba3-9d29-1c05d2abd0a4';
