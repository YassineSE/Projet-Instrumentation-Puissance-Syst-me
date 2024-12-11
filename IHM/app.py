from flask import Flask, render_template, request, jsonify
import serial
import threading

app = Flask(__name__)

# Configuration UART
UART_PORT = '/dev/ttyACM0'  # Port UART pour la STM32
UART_BAUDRATE = 115200        # Baudrate

"""
# Activation de l'uart
try:
    ser = serial.Serial(UART_PORT, UART_BAUDRATE, timeout=1)
except serial.SerialException as e:
    print(f"Erreur de connexion série: {e}")
"""
# Variables globales
current_temperature = None
running = False

# Lire la température depuis la STM32
def read_temperature():
    global current_temperature, running

    # Activation de l'uart
    try:
        ser = serial.Serial(UART_PORT, UART_BAUDRATE, timeout=1)
        while running:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').strip()
                print(f"Received: {line}")
                try:
                    current_temperature = float(line)
                except ValueError:
                    print("Erreur de conversion de la température.")
    except serial.SerialException as e:
        print(f"Erreur de connexion série: {e}")

    

# Route to serve the main page
@app.route('/')
def index():
    return render_template('index.html')  # Serve index.html from templates/

# Route pour démarrer l'acquisition
@app.route('/start', methods=['POST'])
def start():
    global running
    if running:
        return jsonify({"message": "Acquisition déjà en cours"}), 400

    # Démarrer l'acquisition
    running = True
    thread = threading.Thread(target=read_temperature)
    thread.start()

    return jsonify({"message": "Acquisition démarrée"}), 200

# Route pour envoyer des nouvelles valeurs sans arrêter l'acquisition
@app.route('/set_values', methods=['POST'])
def set_values():
    # Récupérer les données envoyées par le frontend
    data = request.json
    desired_temp = data.get('desired_temp')
    kp = data.get('kp')
    ki = data.get('ki')
    kd = data.get('kd')

    # Envoyer les données à la STM32 via UART
    if ser.is_open:
        try:
            command = f"{desired_temp},{kp},{ki},{kd}\n"
            ser.write(command.encode('utf-8'))
            print(f"Envoyé à la STM32 : {command}")
            return jsonify({"message": f"Envoyé : {command} à la STM32"}), 200
        except serial.SerialException as e:
            return jsonify({"error": f"Erreur UART : {str(e)}"}), 500
    else:
        return jsonify({"error": "Port UART non ouvert"}), 500

# Endpoint pour arrêter l'acquisition
@app.route('/stop', methods=['POST'])
def stop():
    global running
    running = False
    return jsonify({"message": "Acquisition arrêtée"}), 200

# Endpoint pour récupérer la température actuelle
@app.route('/current_temp', methods=['GET'])
def get_current_temp():
    global current_temperature
    if current_temperature is not None:
        return jsonify({"current_temp": current_temperature}), 200
    else:
        return jsonify({"current_temp": "Aucune donnée reçue"}), 200

if __name__ == '__main__':
    app.run(debug=True)
