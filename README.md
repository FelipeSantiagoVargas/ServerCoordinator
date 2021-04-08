# ServerCoordinator

docker network create --driver bridge clocks

docker build -t servercoordinator .

docker run -dit --rm --name servercoordinator -p 4000:3000 --network clocks servercoordinator


# Sincronizacion de relojes 1.0.0 documentation

Sincronización de relojes mediante el uso del Algoritmo de Berkeley
## Table of Contents

* [Channels](#channels)

## Channels

### **server/connection** Channel

#### `subscribe` Operation

##### Message

*Envía la hora del cliente y también un objeto con la actualización de las horas y su respectivo ajuste*

###### Payload

| Name | Type | Description | Accepted values |
|-|-|-|-|
| server/dateServer | string | Envía la hora del cliente | _Any_ |
| server/info | object | Emite la información con la hora actual, el ajuste y la nueva hora | _Any_ |
| server/info.actualDate | string | - | _Any_ |
| server/info.adjust | number | - | _Any_ |
| server/info.newDate | string | - | _Any_ |

> Examples of payload _(generated)_

```json
{
  "server/dateServer": "string",
  "server/info": {
    "actualDate": "string",
    "adjust": 0,
    "newDate": "string"
  }
}
```




### **servercoordinator/info** Channel

#### `subscribe` Operation

##### Message

*Obtiene la lista de servidores para mostrarlas en el dashboard*

###### Payload

| Name | Type | Description | Accepted values |
|-|-|-|-|
| servercoordinator/servers | array | Lista de servidores. | _Any_ |
| servercoordinator/servers.ip | string | - | _Any_ |
| servercoordinator/servers.port | string | - | _Any_ |

> Examples of payload _(generated)_

```json
{
  "servercoordinator/servers": []
}
```

