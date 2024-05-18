# ShellyBulb-Control-App

This is an ongoing project that aims to control Shelly Bulbs through a web interface. *The application is specifically designed to control Shelly Bulb RGBW model.* It utilizes Node.js, Express.js, MySQL, and EJS (Embedded JavaScript) for server-side rendering. The front-end is built using HTML, CSS, and JavaScript. The application allows users to connect to and control Shelly Bulbs, including turning them on/off and adjusting their settings. Please note that this project is currently a work in progress and further enhancements are being added.

## Features

- Connecting to Shelly Bulbs (auto-connect when entering the device): the application allows users to establish connections with their Shelly Bulbs by simply clicking on the bulb icon in the interface. The connection is automatically established.
- Controlling Bulb On/Off
- Adjusting Colorn and Gain in color mode or Brightness/Temperature in white mode
- Adding and deleting devices
- Real-time Updates (Work in Progress) : the interface provides real-time updates to reflect the current state of the connected Shelly Bulbs.

## Installation

1. Clone the repository
2. Navigate to the project directory: cd ShellyBulb-Control-App
3. Install dependencies: `npm install`
4. Configure the MySQL database connection by updating the configuration file.
5. Start the application: `node app`
6. Access the application in your browser at http://localhost:3000

Note: The ShellyBulb-Control-App requires a MySQL database to store the necessary information for connecting to and controlling Shelly Bulbs. Before running the application, ensure that you have a MySQL database set up and update the configuration file (config.js) with your database credentials.

## License

The ShellyBulb-Control-App is licensed under the MIT License.

## Disclaimer

Please note that this project is currently a work in progress, and there may be limitations or incomplete functionality. Use it at your own risk.
