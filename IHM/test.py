import serial
import time

try:
    ser = serial.Serial('COM4', 115200)  # Remplacer COM4 par le bon numéro de port

    time.sleep(2)  # Attendre que la connexion se stabilise

    while True:
        if ser.in_waiting > 0:  # Si des données sont disponibles
            data = ser.readline()  # Lire une ligne
            print(f"Data reçue: {data.decode('utf-8').strip()}")
        
except serial.SerialException as e:
    print(f"Erreur de connexion série: {e}")

finally:
    pass