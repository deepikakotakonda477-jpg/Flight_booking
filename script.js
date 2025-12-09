// DOM Elements
const flightsList = document.getElementById('flightsList');
const searchFlightsBtn = document.getElementById('searchFlights');
const fromCitySelect = document.getElementById('fromCity');
const toCitySelect = document.getElementById('toCity');
const departureDateInput = document.getElementById('departureDate');
const returnDateInput = document.getElementById('returnDate');
const travelerCount = document.getElementById('travelerCount');
const increaseTravelersBtn = document.getElementById('increaseTravelers');
const decreaseTravelersBtn = document.getElementById('decreaseTravelers');

// Demo flights data
const DEMO_FLIGHTS = [
    {
        id: 1,
        airline: "Air India",
        flightNumber: "AI-201",
        from: "HYD",
        fromCity: "Hyderabad",
        to: "DEL",
        toCity: "Delhi",
        departure: "06:30",
        arrival: "08:45",
        duration: "2h 15m",
        price: 5499,
        seats: 24,
        type: "Non-stop"
    },
    {
        id: 2,
        airline: "IndiGo",
        flightNumber: "6E-345",
        from: "BOM",
        fromCity: "Mumbai",
        to: "BLR",
        toCity: "Bengaluru",
        departure: "09:15",
        arrival: "10:45",
        duration: "1h 30m",
        price: 3899,
        seats: 18,
        type: "Non-stop"
    },
    {
        id: 3,
        airline: "SpiceJet",
        flightNumber: "SG-789",
        from: "DEL",
        fromCity: "Delhi",
        to: "HYD",
        toCity: "Hyderabad",
        departure: "14:20",
        arrival: "16:50",
        duration: "2h 30m",
        price: 4699,
        seats: 12,
        type: "Non-stop"
    },
    {
        id: 4,
        airline: "Emirates",
        flightNumber: "EK-512",
        from: "BOM",
        fromCity: "Mumbai",
        to: "DXB",
        toCity: "Dubai",
        departure: "02:30",
        arrival: "05:15",
        duration: "3h 45m",
        price: 28999,
        seats: 8,
        type: "Non-stop"
    },
    {
        id: 5,
        airline: "Singapore Airlines",
        flightNumber: "SQ-432",
        from: "BLR",
        fromCity: "Bengaluru",
        to: "SIN",
        toCity: "Singapore",
        departure: "23:45",
        arrival: "07:30",
        duration: "4h 45m",
        price: 22499,
        seats: 15,
        type: "Non-stop"
    }
];

// Set default dates
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    departureDateInput.value = tomorrow.toISOString().split('T')[0];
    returnDateInput.value = nextWeek.toISOString().split('T')[0];
    
    departureDateInput.min = today.toISOString().split('T')[0];
    returnDateInput.min = today.toISOString().split('T')[0];
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Create flight card
function createFlightCard(flight) {
    return `
        <div class="flight-card" data-id="${flight.id}">
            <div class="flight-header">
                <div class="airline">
                    <i class="fas fa-plane"></i> ${flight.airline}
                </div>
                <div class="flight-number">${flight.flightNumber}</div>
            </div>
            <div class="route">
                <div class="city">
                    <div class="city-code">${flight.from}</div>
                    <div class="city-name">${flight.fromCity}</div>
                    <div class="time">${flight.departure}</div>
                </div>
                <div class="duration">
                    <div class="duration-line"></div>
                    <div>${flight.duration}</div>
                    <small>${flight.type}</small>
                </div>
                <div class="city">
                    <div class="city-code">${flight.to}</div>
                    <div class="city-name">${flight.toCity}</div>
                    <div class="time">${flight.arrival}</div>
                </div>
            </div>
            <div class="flight-details">
                <div><i class="fas fa-chair"></i> Available: ${flight.seats}</div>
                <div><i class="fas fa-suitcase"></i> ${flight.type}</div>
            </div>
            <div class="flight-price">
                <div class="price">${formatCurrency(flight.price)}</div>
                <button class="btn-book" onclick="alert('Booking feature coming soon!')">
                    <i class="fas fa-ticket-alt"></i> Book Now
                </button>
            </div>
        </div>
    `;
}

// Display flights
function displayFlights(flights) {
    flightsList.innerHTML = '';
    
    if (flights.length === 0) {
        flightsList.innerHTML = `
            <div class="no-flights">
                <i class="fas fa-plane-slash"></i>
                <h3>No Flights Found</h3>
                <p>Try adjusting your search criteria</p>
                <button class="btn-search" onclick="resetFilters()" style="margin-top: 1rem;">
                    <i class="fas fa-redo"></i> Reset Filters
                </button>
            </div>
        `;
        return;
    }
    
    flights.forEach(flight => {
        flightsList.innerHTML += createFlightCard(flight);
    });
}

// Reset filters
function resetFilters() {
    fromCitySelect.value = '';
    toCitySelect.value = '';
    travelerCount.textContent = '1';
    setDefaultDates();
    filterFlights();
}

// Filter flights
function filterFlights() {
    const fromCity = fromCitySelect.value;
    const toCity = toCitySelect.value;
    
    let filtered = DEMO_FLIGHTS;
    
    if (fromCity) {
        filtered = filtered.filter(flight => flight.from === fromCity);
    }
    
    if (toCity) {
        filtered = filtered.filter(flight => flight.to === toCity);
    }
    
    displayFlights(filtered);
}

// Initialize
function initApp() {
    console.log('🚀 AeroJet Flight Booking Initializing...');
    
    // Set default dates
    setDefaultDates();
    
    // Display initial flights
    displayFlights(DEMO_FLIGHTS);
    
    // Event listeners
    searchFlightsBtn.addEventListener('click', () => {
        searchFlightsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        setTimeout(() => {
            filterFlights();
            searchFlightsBtn.innerHTML = '<i class="fas fa-search"></i> Search Flights';
        }, 500);
    });
    
    fromCitySelect.addEventListener('change', filterFlights);
    toCitySelect.addEventListener('change', filterFlights);
    
    increaseTravelersBtn.addEventListener('click', () => {
        let count = parseInt(travelerCount.textContent);
        if (count < 9) {
            travelerCount.textContent = count + 1;
        }
    });
    
    decreaseTravelersBtn.addEventListener('click', () => {
        let count = parseInt(travelerCount.textContent);
        if (count > 1) {
            travelerCount.textContent = count - 1;
        }
    });
    
    // Route tags
    document.querySelectorAll('.route-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const route = tag.textContent.split(' → ');
            fromCitySelect.value = route[0];
            toCitySelect.value = route[1];
            filterFlights();
        });
    });
    
    // Login/Signup buttons
    document.querySelector('.btn-login').addEventListener('click', () => {
        alert('Login feature coming soon!');
    });
    
    document.querySelector('.btn-signup').addEventListener('click', () => {
        alert('Sign up feature coming soon!');
    });
    
    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            alert(`${btn.textContent} feature coming soon!`);
        });
    });
    
    console.log('✅ AeroJet Ready!');
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);