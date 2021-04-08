# ServerCoordinator
## Para la ejecución del servidor coordinador deben ejecutarse los siguientes comandos

docker network create --driver bridge clocks

docker build -t servercoordinator .

docker run -dit --rm --name servercoordinator -p 4000:3000 --network clocks servercoordinator

# Servidor Coordinador 1.0.0 documentation

Servidor encargado de acceder a un servidor externo para mostrar la hora y ejecutar el algoritmo de berkeley para su sincronización
## Table of Contents

* [Channels](#channels)

## Channels

### **client/info** Channel

#### `subscribe` Operation

##### Message

*Crea las filas para mostrar en la tabla de servidores registrados desde el dashboard del servidor coordinador*

###### Payload

| Name | Type | Description | Accepted values |
|-|-|-|-|
| servers | array | Servers | _Any_ |
| servers.port | string | Puerto | _Any_ |
| servers.ip | string | IP | _Any_ |

> Examples of payload _(generated)_

```json
{
  "servers": [],
  "servers.port": "string",
  "servers.ip": "string"
}
```




### **server/connection** Channel

#### `subscribe` Operation

##### Message

*Permite la conexión para ejecutar el bash de creación de nueva instancia*

###### Payload

| Name | Type | Description | Accepted values |
|-|-|-|-|
| socket | string | Socket | _Any_ |

> Examples of payload _(generated)_

```json
{
  "socket": "string"
}
```




### **server/instance** Channel

#### `subscribe` Operation

##### Message

*Ejecuta el bash de creación de nueva instancia*

###### Payload

| Name | Type | Description | Accepted values |
|-|-|-|-|
| counter | integer | Contador de puertos | _Any_ |

> Examples of payload _(generated)_

```json
{
  "counter": 0
}
```



