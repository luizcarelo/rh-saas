# INVENTARIO POSTGRES RH SAAS

05/07/2026 21:43:56

## USUARIOS

```
docker exec rh_saas_postgres psql -U postgres -l


ERRO:
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  role "postgres" does not exist
```

## DATABASES

```
docker exec rh_saas_postgres psql -U postgres -At -c "SELECT datname FROM pg_database ORDER BY datname"


ERRO:
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  role "postgres" does not exist
```

## ROLES

```
docker exec rh_saas_postgres psql -U postgres -At -c "SELECT rolname FROM pg_roles ORDER BY rolname"


ERRO:
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  role "postgres" does not exist
```

## EXTENSIONS

```
docker exec rh_saas_postgres psql -U postgres -At -c "SELECT extname FROM pg_extension ORDER BY extname"


ERRO:
psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  role "postgres" does not exist
```
