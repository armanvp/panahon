# Panahon
A full stack web application which runs on NodeJS and MongDB in the backend and receives temperature and humidity levels from an IoT project via HTTP. The front end uses AngularJS and Google Charts from graphing the temperature and humidity levels over a 24 hour period.

# Panahon IoT module
Panahon runs together with the Panahon IoT project which uses ESP8266 module and DHT22 sensor to get temperature and humidity levels. The Panahon IoT module connects to the Internet via Wifi and sends data via HTTP. The IoT Project can be found at https://github.com/armanvp/panahon-iot

# Registering an API Key
An API Key (which is the ESP8266 module's MAC Address) must be registered first on the Panahon NodeJS application so the server can accept the posted data. The module's MAC Address can be seen when the IoT module is hooked up to a TTL serial debugger.

To register the API key of the module, run the following command found in cli/ directory on the folder:
```
node panahon.js register AA:BB:CC:DD:EE:FF
```

# Other commands of cli/panahon.js
Unregisters the MAC Address
```
node panahon.js unregister AA:BB:CC:DD:EE:FF
```
List all registered MAC Address
```
node panahon.js list
```
Show Help
```
node panahon.js help
```
