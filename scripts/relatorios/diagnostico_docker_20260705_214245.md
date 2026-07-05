# DIAGNOSTICO DOCKER RH SAAS

Gerado em: 05/07/2026 21:42:45

## DOCKER VERSION

```
$ docker --version

Docker version 29.6.1, build 8900f1d
```

## DOCKER COMPOSE VERSION

```
$ docker compose version

Docker Compose version v5.2.0
```

## CONTAINERS

```
$ docker ps -a

CONTAINER ID   IMAGE                    COMMAND                  CREATED        STATUS        PORTS                                              NAMES
f0312f7ae38b   nginx:alpine             "/docker-entrypoint.…"   18 hours ago   Up 18 hours   0.0.0.0:4001->80/tcp, [::]:4001->80/tcp            rh_saas_web
ac5cc1a53c74   rh-saas-api              "docker-entrypoint.s…"   23 hours ago   Up 23 hours                                                      rh_saas_api
2c2a95948d73   redis:7-alpine           "docker-entrypoint.s…"   3 days ago     Up 3 days     6379/tcp                                           rh_saas_redis
14e33717c1ac   postgis/postgis:15-3.3   "docker-entrypoint.s…"   3 days ago     Up 3 days     5432/tcp                                           rh_saas_postgres
5ac7ee760092   dpage/pgadmin4           "/entrypoint.sh"         3 days ago     Up 3 days     443/tcp, 0.0.0.0:5050->80/tcp, [::]:5050->80/tcp   rh_saas_pgadmin
```

## IMAGENS

```
$ docker images

IMAGE                    ID             DISK USAGE   CONTENT SIZE   EXTRA
dpage/pgadmin4:latest    40fa840c5bb7        757MB          178MB   U    
nginx:alpine             54f2a904c251       93.3MB         26.9MB   U    
postgis/postgis:15-3.3   a2fc46b52819        825MB          206MB   U    
redis:7-alpine           6ab0b6e73817       57.8MB         16.8MB   U    
rh-saas-api:latest       b00349323c61       1.13GB          200MB   U
```

## VOLUMES

```
$ docker volume ls

DRIVER    VOLUME NAME
local     c52b4f8ccd7d5a1037799a1010849081a1623b871b9455c95f0db49969903709
local     f444ec2c3232524267ef851c42c0f124326fddfc44c1b22df341b50c0fefa789
```

## NETWORKS

```
$ docker network ls

NETWORK ID     NAME                   DRIVER    SCOPE
759e193a8efd   bridge                 bridge    local
ad82a7bb98d8   host                   host      local
f9b57b5712da   none                   null      local
fbd000558d3c   rh-saas_saas_network   bridge    local
ec57739fe3f0   rh_saas_network        bridge    local
```

## POSTGRES DETECTADO

- rh_saas_postgres

## INSPECT rh_saas_postgres

```
$ docker inspect rh_saas_postgres

[
    {
        "Id": "14e33717c1ac1544dd43301a7ece5bae2d87a636f6ea8959da263d97b63b1122",
        "Created": "2026-07-02T08:50:45.698898447Z",
        "Path": "docker-entrypoint.sh",
        "Args": [
            "postgres"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 155130,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2026-07-02T08:50:46.142368944Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:a2fc46b52819d25add4ed93d3da83e106e17ea3ace6883cce3791631c9820bb2",
        "ResolvConfPath": "/var/lib/docker/containers/14e33717c1ac1544dd43301a7ece5bae2d87a636f6ea8959da263d97b63b1122/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/14e33717c1ac1544dd43301a7ece5bae2d87a636f6ea8959da263d97b63b1122/hostname",
        "HostsPath": "/var/lib/docker/containers/14e33717c1ac1544dd43301a7ece5bae2d87a636f6ea8959da263d97b63b1122/hosts",
        "LogPath": "/var/lib/docker/containers/14e33717c1ac1544dd43301a7ece5bae2d87a636f6ea8959da263d97b63b1122/14e33717c1ac1544dd43301a7ece5bae2d87a636f6ea8959da263d97b63b1122-json.log",
        "Name": "/rh_saas_postgres",
        "RestartCount": 0,
        "Driver": "overlayfs",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "docker-default",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": [
                "/opt/rh-saas/data/postgres:/var/lib/postgresql/data:rw"
            ],
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "rh_saas_network",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "always",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                0,
                0
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "private",
            "Dns": null,
            "DnsOptions": null,
            "DnsSearch": null,
            "ExtraHosts": [],
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": null,
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": null,
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/acpi",
                "/proc/asound",
                "/proc/interrupts",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/sys/devices/virtual/powercap",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "Storage": {
            "RootFS": {
                "Snapshot": {
                    "Name": "overlayfs"
                }
            }
        },
        "Mounts": [
            {
                "Type": "bind",
                "Source": "/opt/rh-saas/data/postgres",
                "Destination": "/var/lib/postgresql/data",
                "Mode": "rw",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
        "Config": {
            "Hostname": "14e33717c1ac",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": true,
            "AttachStderr": true,
            "ExposedPorts": {
                "5432/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/15/bin",
                "GOSU_VERSION=1.16",
                "LANG=en_US.utf8",
                "PG_MAJOR=15",
                "PG_VERSION=15.4-1.pgdg110+1",
                "PGDATA=/var/lib/postgresql/data",
                "POSTGIS_MAJOR=3",
                "POSTGIS_VERSION=3.3.4+dfsg-1.pgdg110+1"
            ],
            "Cmd": [
                "postgres"
            ],
            "Image": "postgis/postgis:15-3.3",
            "Volumes": {
                "/var/lib/postgresql/data": {}
            },
            "WorkingDir": "",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "Labels": {
                "com.docker.compose.config-hash": "22f883da2038686aee6689f178c538902110441e53d73716589873f4aa1bccf2",
                "com.docker.compose.container-number": "1",
                "com.docker.compose.depends_on": "",
                "com.docker.compose.image": "sha256:a2fc46b52819d25add4ed93d3da83e106e17ea3ace6883cce3791631c9820bb2",
                "com.docker.compose.oneoff": "False",
                "com.docker.compose.project": "rh-saas",
                "com.docker.compose.project.config_files": "/opt/rh-saas/docker-compose.prod.yml",
                "com.docker.compose.project.working_dir": "/opt/rh-saas",
                "com.docker.compose.service": "postgres_db",
                "com.docker.compose.version": "5.2.0",
                "maintainer": "PostGIS Project - https://postgis.net",
                "org.opencontainers.image.description": "PostGIS 3.3.4+dfsg-1.pgdg110+1 spatial database extension with PostgreSQL 15 bullseye",
                "org.opencontainers.image.source": "https://github.com/postgis/docker-postgis"
            },
            "StopSignal": "SIGINT"
        },
        "NetworkSettings": {
            "SandboxID": "0303140525a836ea56893e57137e2b70b2d502e27602266e7b26428c431af3b6",
            "SandboxKey": "/var/run/docker/netns/0303140525a8",
            "Ports": {
                "5432/tcp": null
            },
            "Networks": {
                "rh_saas_network": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "rh_saas_postgres",
                        "postgres_db"
                    ],
                    "DriverOpts": null,
                    "GwPriority": 0,
                    "NetworkID": "ec57739fe3f05ad12eaf5a59da8306944095ba506b227d022151d769df1854d5",
                    "EndpointID": "2011f01696943c19cb7818872a4ec785915b2e462d227ccd3c56c262d1e96a94",
                    "Gateway": "172.19.0.1",
                    "IPAddress": "172.19.0.4",
                    "MacAddress": "fe:0b:4d:58:5f:55",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": [
                        "rh_saas_postgres",
                        "postgres_db",
                        "14e33717c1ac"
                    ]
                }
            }
        },
        "ImageManifestDescriptor": {
            "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
            "digest": "sha256:a2fc46b52819d25add4ed93d3da83e106e17ea3ace6883cce3791631c9820bb2",
            "size": 3871,
            "platform": {
                "architecture": "amd64",
                "os": "linux"
            }
        }
    }
]
```
