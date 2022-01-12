# homebridge-sonoff-tasmota-http

This is a plugin for [homebridge](https://github.com/nfarina/homebridge) which makes it possible to control Sonoff Basic devices with [Tasmota](https://github.com/arendst/Sonoff-Tasmota) firmware through HTTP only

The Tasmota compatible version of the plugin is 5.11.0 and later

# Information
```
http://sonoff/cm?cmnd=Power
http://sonoff/cm?cmnd=Power%20On
http://sonoff/cm?cmnd=Power%20Off
```

## Example config

```json
{
  "accessory": "SonoffTasmotaHTTP",
  "name": "Sonoff",
  "hostname": "The hostname of the Sonoff device"
}
```

## Multiple Relays

```json
{
  "accessory": "SonoffTasmotaHTTP",
  "name": "Sonoff",
  "relay": "2",
  "hostname": "The hostname of the Sonoff device"
}
```

## Password specified in Web Interface

```json
{
  "accessory": "SonoffTasmotaHTTP",
  "name": "Sonoff",
  "password": "The password from the web interface",
  "hostname": "The hostname of the Sonoff device"
}
```
