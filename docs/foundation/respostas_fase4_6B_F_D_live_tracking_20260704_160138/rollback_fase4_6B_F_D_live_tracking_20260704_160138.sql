-- Rollback da validacao Sprint 4.6B-F-D
-- Gerado em: 20260704_160138

DELETE FROM location_tracking_points
WHERE id = 'f90234cf-724c-4816-9edb-465fd4baee9e';

DELETE FROM mobile_devices
WHERE id = 'cd2c9f47-17fb-42bb-8975-98b73f70e6a7'
  AND device_uid = 'fase-4-6B-F-D-20260704_160138';
