load('api_mqtt.js');
load('api_gpio.js');
load('api_config.js');

let pin = 4, topic = Cfg.get('device.id') + '/rpc';
let rele = 5;
GPIO.set_mode(pin, GPIO.MODE_INPUT);
GPIO.set_mode(rele, GPIO.MODE_OUTPUT);


GPIO.set_button_handler(pin, GPIO.NONE, GPIO.INT_EDGE_ANY, 200, function() {
  GPIO.toggle(rele);
  print('Toggle');
  MQTT.pub(Cfg.get('device.id') + '/sensor/', JSON.stringify({ result: {value: GPIO.read(pin)}}));

}, null);


MQTT.sub(Cfg.get('device.id') + '/rpc/#', function(conn, topic, msg) {
  print('Topic:', topic, 'mensaje:', msg);
}, null);