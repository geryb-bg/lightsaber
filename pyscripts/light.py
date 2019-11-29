#!/usr/bin/env python3
# ref: https://github.com/rpi-ws281x/rpi-ws281x-python

import time
from rpi_ws281x import PixelStrip, Color
import sys

# LED strip configuration:
LED_COUNT = 44        # Number of LED pixels.
LED_PIN = 10          # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10          # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
LED_INVERT = False    # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

MID_LED = 22

strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
strip.begin()

for i in range(MID_LED):
    strip.setPixelColor(i, Color(int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3])))
    strip.setPixelColor(LED_COUNT-i, Color(int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3])))
    strip.show()
    time.sleep(0.0200)

print('done')