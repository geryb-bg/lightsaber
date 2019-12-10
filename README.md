# Lightsaber

## Raspberry Pi Zero Setup

On your computer:

1. Download the lite version of [Raspbian](https://www.raspberrypi.org/downloads/raspbian/)
2. Download [Etcher](https://www.balena.io/etcher/)
3. Flash Raspbian onto the SD card
4. Take the SD card out and insert it back into your computer
5. In `boot` create an empty file called `ssh` (no extension)
6. Also in `boot` create a file called `wpa_supplicant.conf` and put the following:

    ```
    country=US
    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    update_config=1

    network={
    ssid="WIFI_SSID"
    scan_ssid=1
    psk="WIFI_PASSWORD"
    key_mgmt=WPA-PSK
    }
    ```
    Replace the SSID and Password with your WiFi information. Make sure this is correct!

Move the SD card to the Pi and plug it in. Wait a little while for it to start up and then ssh into it (you must be connected to the same network):
```
ssh pi@raspberrypi.local
```
The default password is `raspberry`

Run the following command to install updates to the Pi:
```
sudo apt-get update && sudo apt-get upgrade -y
```

### `sudo node` problems

Run this command: `n=$(which node); n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local`

## ADXL-345

In order to use the accelerometer we need to enable the i2c bus on the Pi and install a few libraries. Enable the i2c bus as follows:

- Install the following two things: `sudo apt-get install -y python-smbus` and `sudo apt-get install -y i2c-tools`
- Run the command `sudo raspi-config`
    - Go to **Interfacing Options**
    - Then **I2C**
    - Select **Yes**
- Run `sudo reboot` and wait for the Pi to reboot
- Test the i2c bus has been enabled by running `sudo i2cdetect -y 1`
- Install gcc `sudo apt-get install gcc`

References for the accelerometer:
- [ADXL-345 Sensor Library](https://github.com/skylarstein/adxl345-sensor)
- [I2C Bus Library](https://www.npmjs.com/package/i2c-bus)
- [Wiring](https://tutorials-raspberrypi.com/measuring-rotation-and-acceleration-raspberry-pi/)

## Sound

### Sound hat drivers

1. Install drivers for sound hat:
    - `git clone https://github.com/waveshare/WM8960-Audio-HAT`
    - `cd WM8960-Audio-HAT`
    - `sudo ./install.sh`
    - `sudo reboot`
2. After reboot check if driver installed: `sudo dkms status`
3. Check sound card: `aplay -l`
4. Test sound: `speaker-test -c2 -twav -l7`

### Library

Using the npm [play-sound](https://www.npmjs.com/package/play-sound) library

## Light

Install python lib: `sudo pip install rpi_ws281x`

### SPI Bus

Many distributions have a maximum SPI transfer of 4096 bytes. This can be changed in `/boot/cmdline.txt` by appending: `spidev.bufsiz=32768`

You have to change the GPU core frequency to 250 MHz, otherwise the SPI clock has the wrong frequency. Do this by adding the following line to `/boot/config.txt` and reboot: `core_freq=250`

## Button

Install GPIO lib for python: `sudo pip install RPi.GPIO`

## Bluetooth

We are using [bleno](https://github.com/noble/bleno) to turn the pi into a bluetooth peripheral. To install it:

1. `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`
2. `npm install bleno`

## PM2

So that the script starts up every time you reboot the pi use [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)

- Install: `sudo npm install pm2@latest -g`
- Start app: `sudo pm2 start index.js`
- Make sure it runs on startup:
    - `sudo pm2 startup`
    - `sudo pm2 save`

## Other links

- [3D model](https://ultimaker.com/learn/3d-printed-lightsaber-design-philosophy-and-printing-tips)
- Article: [Lightsaber prototyping with the Nordic Thingy:52](https://medium.com/@gerybbg/lightsaber-prototyping-with-the-nordic-thingy-52-890d54493b86)
- Article: [Lights and sounds with the Raspberry Pi Zero](https://medium.com/@gerybbg/lights-and-sounds-with-the-raspberry-pi-zero-d048f0c6983b)
- Talk: [So you wanna build a lightsaber?](https://www.youtube.com/watch?v=pAVG7oWOD-M)