#!/usr/bin/env python3
# ref: https://github.com/rpi-ws281x/rpi-ws281x-python

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

strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
strip.begin()

def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)

for j in range(256):
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, wheel((int(i * 256 / strip.numPixels()) + j) & 255))
    strip.show()

print('done')