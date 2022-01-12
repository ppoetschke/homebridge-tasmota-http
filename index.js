var Service, Characteristic;
const axios = require('axios').default;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-sonoff-tasmota-http", "SonoffTasmotaHTTP", SonoffTasmotaHTTPAccessory);
}

function SonoffTasmotaHTTPAccessory(log, config) {
  this.log = log;
  this.config = config;
  this.name = config["name"]
  this.relay = config["relay"] || ""
  this.hostname = config["hostname"] || "sonoff"
  this.password = config["password"] || "";
  this.cachedState = "OFF";

  this.service = new Service.Outlet(this.name);

  this.service
    .getCharacteristic(Characteristic.On)
    .onGet(async () => {
      try {
        const response = await axios.get("http://" + this.hostname + "/cm?user=admin&password=" + this.password + "&cmnd=Power" + this.relay);
        const sonoff_reply = response.data; // {"POWER":"ON"}
        this.log("Sonoff HTTP: " + this.hostname + ", Relay " + this.relay + ", Get State: " + JSON.stringify(sonoff_reply));
        return sonoff_reply["POWER" + this.relay] === 'ON' ? 1 : 0;

      } catch (err) {
        this.log(`Sonoff Tasmota HTTP Error ${err}`);
      }
    }
    )
    .onSet(async (value) => {
      try {
        const newstate = value ? "%20On" : "%20Off";
        const response = await axios.get("http://" + this.hostname + "/cm?user=admin&password=" + this.password + "&cmnd=Power" + this.relay + newstate);
        const newValue = response.data["POWER" + this.relay] === 'ON' ? 1 : 0;
        this.service.updateCharacteristic(Characteristic.On, newValue);
      } catch (err) {
        this.log(`Sonoff Tasmota HTTP Error ${err}`);
      }
    });

  this.log("Sonoff Tasmota HTTP Initialized")
}


SonoffTasmotaHTTPAccessory.prototype.getServices = function () {
  return [this.service];
}
