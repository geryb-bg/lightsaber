import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(26, GPIO.IN, GPIO.PUD_UP)

if GPIO.input(26):
    print("1")
else:
    print("0")