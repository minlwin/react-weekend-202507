# Oracle Database on Docker

## For Oracle Registry
Login to Oracle Container Registry (https://container-registry.oracle.com) with oracle account.

Accecpt License aggrement for Oracle Database Enterprise Edition.

Generate Auth Token for docker login password.

```
docker login container-registry.oracle.com
username: your email
password: auth-token
```

Pull Database Image
```
docker pull container-registry.oracle.com/database/express:21.3.0-xe
```

## For Community Image
```
docker pull gvenzl/oracle-xe:21-slim
```