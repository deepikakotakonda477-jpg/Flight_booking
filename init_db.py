import sqlite3

con = sqlite3.connect("database.db")
cur = con.cursor()

# Delete old tables
cur.execute("DROP TABLE IF EXISTS flights")
cur.execute("DROP TABLE IF EXISTS bookings")

# Create Flights Table
cur.execute("""
CREATE TABLE flights(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT,
    destination TEXT,
    date TEXT,
    airline TEXT,
    duration TEXT,
    price INTEGER
)
""")

# Create Bookings Table
cur.execute("""
CREATE TABLE bookings(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_id INTEGER,
    passenger_name TEXT,
    passenger_age INTEGER
)
""")

# Airports
airports = [
    "Hyderabad (HYD)", "Delhi (DEL)", "Mumbai (BOM)", "Bangalore (BLR)", "Chennai (MAA)",
    "Kolkata (CCU)", "Pune (PNQ)", "Ahmedabad (AMD)", "Jaipur (JAI)", "Kochi (COK)",
    "Visakhapatnam (VTZ)", "Goa (GOI)", "Lucknow (LKO)", "Patna (PAT)", "Indore (IDR)",
    "Coimbatore (CJB)", "Bhubaneswar (BBI)", "Nagpur (NAG)", "Guwahati (GAU)", "Mangalore (IXE)"
]

# Sample Airlines
airlines = ["Air India", "IndiGo", "Vistara", "SpiceJet", "Akasa Air"]

# Insert sample flight data
import random

for src in airports:
    for dest in airports:
        if src != dest:
            for i in range(1, 4):  # 3 flights per route
                cur.execute("""
                INSERT INTO flights (source, destination, date, airline, duration, price)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    src,
                    dest,
                    "2024-12-" + str(random.randint(10, 30)),
                    random.choice(airlines),
                    f"{random.randint(1, 3)}h {random.randint(0, 59)}m",
                    random.randint(2500, 12000)
                ))

con.commit()
con.close()

print("Database created successfully with sample flights!")
