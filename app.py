from flask import Flask, render_template, request, jsonify
import random
from datetime import datetime

app = Flask(__name__)

# Sample flight data
FLIGHTS_DATA = [
    {
        "id": 1,
        "airline": "Air India",
        "flight_number": "AI-201",
        "from_code": "HYD",
        "from_city": "Hyderabad",
        "to_code": "DEL",
        "to_city": "Delhi",
        "departure_time": "06:30",
        "arrival_time": "08:45",
        "duration": "2h 15m",
        "price": 5499,
        "seats": 180,
        "available_seats": 24,
        "flight_type": "Non-stop"
    },
    {
        "id": 2,
        "airline": "IndiGo",
        "flight_number": "6E-345",
        "from_code": "BOM",
        "from_city": "Mumbai",
        "to_code": "BLR",
        "to_city": "Bengaluru",
        "departure_time": "09:15",
        "arrival_time": "10:45",
        "duration": "1h 30m",
        "price": 3899,
        "seats": 180,
        "available_seats": 18,
        "flight_type": "Non-stop"
    },
    {
        "id": 3,
        "airline": "SpiceJet",
        "flight_number": "SG-789",
        "from_code": "DEL",
        "from_city": "Delhi",
        "to_code": "HYD",
        "to_city": "Hyderabad",
        "departure_time": "14:20",
        "arrival_time": "16:50",
        "duration": "2h 30m",
        "price": 4699,
        "seats": 180,
        "available_seats": 12,
        "flight_type": "Non-stop"
    },
    {
        "id": 4,
        "airline": "Emirates",
        "flight_number": "EK-512",
        "from_code": "BOM",
        "from_city": "Mumbai",
        "to_code": "DXB",
        "to_city": "Dubai",
        "departure_time": "02:30",
        "arrival_time": "05:15",
        "duration": "3h 45m",
        "price": 28999,
        "seats": 300,
        "available_seats": 8,
        "flight_type": "Non-stop"
    },
    {
        "id": 5,
        "airline": "Singapore Airlines",
        "flight_number": "SQ-432",
        "from_code": "BLR",
        "from_city": "Bengaluru",
        "to_code": "SIN",
        "to_city": "Singapore",
        "departure_time": "23:45",
        "arrival_time": "07:30",
        "duration": "4h 45m",
        "price": 22499,
        "seats": 280,
        "available_seats": 15,
        "flight_type": "Non-stop"
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/flights')
def get_flights():
    from_city = request.args.get('from', '')
    to_city = request.args.get('to', '')
    
    filtered = FLIGHTS_DATA.copy()
    
    if from_city:
        filtered = [f for f in filtered if f['from_code'] == from_city]
    
    if to_city:
        filtered = [f for f in filtered if f['to_code'] == to_city]
    
    return jsonify({
        "success": True,
        "flights": filtered
    })

@app.route('/api/cities')
def get_cities():
    cities = set()
    for flight in FLIGHTS_DATA:
        cities.add((flight['from_code'], flight['from_city']))
        cities.add((flight['to_code'], flight['to_city']))
    
    city_list = [{"code": code, "name": name} for code, name in sorted(cities)]
    
    return jsonify({
        "success": True,
        "cities": city_list
    })

if __name__ == '__main__':
    print("=" * 50)
    print("🚀 AEROJET FLIGHT BOOKING SYSTEM STARTING...")
    print("=" * 50)
    print("🌐 Open your browser and go to: http://localhost:5000")
    print("📡 API Endpoints:")
    print("   - http://localhost:5000/              (Main Page)")
    print("   - http://localhost:5000/api/flights   (Flight Data)")
    print("   - http://localhost:5000/api/cities    (City List)")
    print("=" * 50)
    app.run(debug=True, port=5000)