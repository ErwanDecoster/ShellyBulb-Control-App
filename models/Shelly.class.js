const axios = require('axios');

module.exports = class Shelly {
  constructor(ip, username, password) {
    this.ip = ip;
    this.username = username;
    this.password = password;
    this.id = 0;
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.white = 0;
    this.gain = 0;
    this.temp = 3000;
    this.brightness = 1;
    this.ison = false;
    this.effect = 0;
    this.default_state = "last";
    this.auto_on = 0;
    this.auto_off = 0;
    this.power = 0;
    this.schedule = false;
    this.schedule_rules = null;
  }

  async connect() {
    try {
      const response = await axios.get("http://" + this.ip + "/status", {
        auth: {
            username: this.username,
            password: this.password
        }
      });
      console.log(response);
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(error.response.data);
        } else {
            console.error("Unknown error connecting!");
        }
    }
  }

  async turnOff() {
    try {
      await axios.post("http://" + this.ip + "/color/0", 
      null,
      {
        params: {
            turn: 'off',
        },
        auth: {
            username: this.username,
            password: this.password
        }
      });
      return true;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error : " + error.response.data);
        } else {
            console.error("Unknown error turning off the bulb!");
        }
        return false;
    }
  }

  async turnOn() {
    try {
      await axios.post("http://" + this.ip + "/light/0",
      null,
      {
        params: {
            turn: 'on',
        },
        auth: {
            username: this.username,
            password: this.password
        }
      });
      return true;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error : " + error.response.data);
        } else {
            console.error("Unknown error turning on the bulb!");
        }
        return false;
    }
  }

  async changeColor() {
    try {
      await axios.post("http://" + this.ip + "/color/0",
      null,
      {
        params: {
            mode: 'color',
            red: this.red,
            green: this.green,
            blue: this.blue,
        },
        auth: {
            username: this.username,
            password: this.password
        }
      });
      return true;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error : " + error.response.data);
        } else {
            console.error("Unknown error changing colors!");
        }
        return false;
    }
  }

  async modifyGain() {
    try {
      await axios.post("http://" + this.ip + "/color/0",
      null,
      {
        params: {
          mode: 'color',
          gain: this.gain,
        },
        auth: {
            username: this.username,
            password: this.password
        }
      });
      return true;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error : " + error.response.data);
        } else {
            console.error("Unknown error modifying gain!");
        }
        return false;
    }
  }

  async modifyBrightness() {
    try {
      await axios.post("http://" + this.ip + "/white/0",
      null,
      {
        params: {
          mode: 'white',
          brightness: this.brightness,
        },
        auth: {
            username: this.username,
            password: this.password
        }
      });
      return true;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error : " + error.response.data);
        } else {
            console.error("Unknown error modifying brightness!");
        }
        return false;
    }
  }

  async modifyTemperature() {
    try {
      await axios.post("http://" + this.ip + "/white/0",
      null,
      {
        params: {
          mode: 'white',
          temp: this.temp,
        },
        auth: {
            username: this.username,
            password: this.password
        }
      });
      return true;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error : " + error.response.data);
        } else {
            console.error("Unknown error modifying temperature!");
        }
        return false;
    }
  }

};
