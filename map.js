const CITY_COORDS = {
  "New York, NY": [40.7128, -74.0060],
  "Los Angeles, CA": [34.0522, -118.2437],
  "Chicago, IL": [41.8781, -87.6298],
  "Austin, TX": [30.2672, -97.7431],
  "Miami, FL": [25.7617, -80.1918],
  "Seattle, WA": [47.6062, -122.3321],
  "Denver, CO": [39.7392, -104.9903],
  "Nashville, TN": [36.1627, -86.7816],
  "Phoenix, AZ": [33.4484, -112.0740],
  "Boston, MA": [42.3601, -71.0589],
  "London": [51.5074, -0.1278],
  "Manchester": [53.4808, -2.2426],
  "Edinburgh": [55.9533, -3.1883],
  "Bristol": [51.4545, -2.5879],
  "Birmingham": [52.4862, -1.8904],
  "Leeds": [53.8008, -1.5491],
  "Berlin": [52.5200, 13.4050],
  "Munich": [48.1351, 11.5820],
  "Hamburg": [53.5511, 9.9937],
  "Frankfurt": [50.1109, 8.6821],
  "Cologne": [50.9375, 6.9603],
  "Stuttgart": [48.7758, 9.1829],
  "Toronto, ON": [43.6510, -79.3470],
  "Vancouver, BC": [49.2827, -123.1207],
  "Montreal, QC": [45.5017, -73.5673],
  "Calgary, AB": [51.0447, -114.0719],
  "Ottawa, ON": [45.4215, -75.6972],
  "Edmonton, AB": [53.5461, -113.4938],
  "Sydney, NSW": [-33.8688, 151.2093],
  "Melbourne, VIC": [-37.8136, 144.9631],
  "Brisbane, QLD": [-27.4698, 153.0251],
  "Perth, WA": [-31.9505, 115.8605],
  "Adelaide, SA": [-34.9285, 138.6007],
  "Gold Coast, QLD": [-28.0167, 153.4000],
  "Paris": [48.8566, 2.3522],
  "Lyon": [45.7640, 4.8357],
  "Marseille": [43.2965, 5.3698],
  "Bordeaux": [44.8378, -0.5792],
  "Nice": [43.7102, 7.2620],
  "Toulouse": [43.6047, 1.4442],
  "Madrid": [40.4168, -3.7038],
  "Barcelona": [41.3851, 2.1734],
  "Valencia": [39.4699, -0.3774],
  "Seville": [37.3891, -5.9845],
  "Bilbao": [43.2630, -2.9350],
  "Malaga": [36.7213, -4.4214],
  "Lisbon": [38.7223, -9.1393],
  "Porto": [41.1579, -8.6291],
  "Algarve": [37.0194, -7.9304],
  "Braga": [41.5454, -8.4265],
  "Setúbal": [38.5244, -8.8882],
  "Amsterdam": [52.3676, 4.9041],
  "Rotterdam": [51.9244, 4.4777],
  "The Hague": [52.0705, 4.3007],
  "Utrecht": [52.0907, 5.1214],
  "Eindhoven": [51.4416, 5.4697],
  "Tokyo": [35.6762, 139.6503],
  "Osaka": [34.6937, 135.5023],
  "Kyoto": [35.0116, 135.7681],
  "Fukuoka": [33.5902, 130.4017],
  "Yokohama": [35.4437, 139.6380],
  "Dubai": [25.2048, 55.2708],
  "Abu Dhabi": [24.4539, 54.3773],
  "Sharjah": [25.3463, 55.4209],
  "Bangkok": [13.7563, 100.5018],
  "Chiang Mai": [18.7883, 98.9853],
  "Phuket": [7.9519, 98.3381],
  "Pattaya": [12.9236, 100.8825],
  "Hua Hin": [12.5684, 99.9577],
  "Mexico City (CDMX)": [19.4326, -99.1332],
  "Guadalajara": [20.6597, -103.3496],
  "Monterrey": [25.6866, -100.3161],
  "Playa del Carmen": [20.6296, -87.0739],
  "Mérida": [20.9674, -89.6237],
  "Oaxaca": [17.0523, -96.7216],
  "São Paulo": [-23.5505, -46.6333],
  "Rio de Janeiro": [-22.9068, -43.1729],
  "Florianópolis": [-27.5969, -48.5495],
  "Curitiba": [-25.4284, -49.2733],
  "Belo Horizonte": [-19.9167, -43.9345],
  "Bali": [-8.4095, 115.1889],
  "Jakarta": [-6.2088, 106.8456],
  "Yogyakarta": [-7.7956, 110.3695],
  "Ho Chi Minh City": [10.8231, 106.6297],
  "Hanoi": [21.0285, 105.8542],
  "Da Nang": [16.0544, 108.2022],
  "Cape Town": [-33.9249, 18.4241],
  "Johannesburg": [-26.2041, 28.0473],
  "Durban": [-29.8587, 31.0218],
  "Istanbul": [41.0082, 28.9784],
  "Antalya": [36.8969, 30.7133],
  "Izmir": [38.4192, 27.1287],
  "Manila": [14.5995, 120.9842],
  "Cebu": [10.3157, 123.8854],
  "Siargao": [9.8517, 126.0463],
  "Seoul": [37.5665, 126.9780],
  "Busan": [35.1796, 129.0756],
  "Jeju": [33.4996, 126.5312],
  "San Francisco, CA": [37.7749, -122.4194],
  "Santiago": [-33.4489, -70.6693],
  "Valparaíso": [-33.0472, -71.6127],
  "Viña del Mar": [-33.0246, -71.5518],
  "Bogotá": [4.7110, -74.0721],
  "Medellín": [6.2442, -75.5812],
  "Cartagena": [10.3910, -75.4794],
  "Buenos Aires": [-34.6037, -58.3816],
  "Córdoba": [-31.4201, -64.1888],
  "Mendoza": [-32.8895, -68.8458],
  "San José": [9.9281, -84.0907],
  "Tamarindo": [10.2993, -85.8400],
  "Puerto Viejo": [9.6582, -82.7562],
  "Shanghai": [31.2304, 121.4737],
  "Beijing": [39.9042, 116.4074],
  "Shenzhen": [22.5431, 114.0579],
  "Mumbai": [19.0760, 72.8777],
  "Bengaluru": [12.9716, 77.5946],
  "New Delhi": [28.6139, 77.2090],
  "Kolkata": [22.5726, 88.3639],
  "Chennai": [13.0827, 80.2707],
  "Hyderabad": [17.3850, 78.4867],
  "Pune": [18.5204, 73.8567],
  "Ahmedabad": [23.0225, 72.5714],
  "Cairo": [30.0444, 31.2357],
  "Alexandria": [31.2001, 29.9187],
  "Dahab": [28.5010, 34.5134],
  "Nairobi": [-1.2921, 36.8219],
  "Mombasa": [-4.0435, 39.6682],
  "Nakuru": [-0.3031, 36.0800],
  "Lagos": [6.5244, 3.3792],
  "Abuja": [9.0579, 7.4951],
  "Port Harcourt": [4.8156, 7.0498],
  "Casablanca": [33.5731, -7.5898],
  "Marrakech": [31.6295, -7.9811],
  "Rabat": [34.0209, -6.8416]
};

let exploreMap = null;

function initExploreMap() {
  if (exploreMap) return; // already initialized
  
  // Create map centered on Atlantic to show Europe and Americas
  exploreMap = L.map('world-map', {
    center: [30, 0],
    zoom: 2,
    scrollWheelZoom: true,
    minZoom: 2
  });

  // Vibrant Voyager tiles from CartoDB for a brighter look
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(exploreMap);

  // Custom marker icon style
  const markerOptions = {
    radius: 5,
    fillColor: "var(--accent)",
    color: "var(--bg)",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  // Loop through all countries in CITY_DATA to gather cities
  for (const [countryCode, cities] of Object.entries(CITY_DATA)) {
    cities.forEach(city => {
      const coords = CITY_COORDS[city.name];
      if (coords) {
          const marker = L.circleMarker(coords, markerOptions).addTo(exploreMap);
          
          // Hover interactions
          marker.on('mouseover', function(e) {
            this.setStyle({ fillColor: "var(--teal)", radius: 8, fillOpacity: 1 });
            this.bringToFront();
            
            // Generate popup dynamically to respect selected currency
            const cData = typeof COUNTRY_DATA !== 'undefined' ? COUNTRY_DATA[countryCode] : {};
            const cur = document.getElementById('map-currency-select').value || 'USD';
            
            // Safely convert costs using app.js functions if available, else fallback
            const conv = (amount) => {
              if (typeof fromUSD === 'function' && typeof fmtCurrency === 'function') {
                return fmtCurrency(fromUSD(amount, cur), cur);
              }
              return '$' + amount.toLocaleString();
            };
            
            const totalUSD = city.cost.rent + city.cost.food + city.cost.transport + city.cost.utilities + city.cost.dining;
            const rentUSD = city.cost.rent;
            const foodTransUSD = city.cost.food + city.cost.transport;

            const cityPop = typeof window.getCityPopulation === 'function' ? window.getCityPopulation(city.name) : 'N/A';

            const popupContent = `
              <div style="font-family: 'Inter', sans-serif; color: #fff; background: var(--card2); border-radius: 8px; padding: 5px; min-width: 200px;">
                <h4 style="margin: 0 0 5px 0; font-family: 'Outfit', sans-serif; font-size: 1.2rem; color: var(--accent); border-bottom: 1px solid var(--border); padding-bottom: 8px; display: flex; justify-content: space-between;">
                  ${city.name}
                  <span style="font-size:0.9rem; color:var(--muted)">${countryCode}</span>
                </h4>
                
                <div style="font-size:0.8rem; color:var(--muted); margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                  <span>👥 Population:</span>
                  <span style="color:#fff; font-weight:600">${cityPop}</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; border-bottom: 1px solid var(--border); padding-bottom: 8px;">
                  <div>
                    <div style="font-size: 0.75rem; color: var(--muted); text-transform: uppercase;">Est. Total</div>
                    <div style="font-weight: 600; color: var(--green);">${conv(totalUSD)}<span style="font-size:0.75rem; font-weight:normal">/mo</span></div>
                  </div>
                  <div>
                    <div style="font-size: 0.75rem; color: var(--muted); text-transform: uppercase;">Rent</div>
                    <div style="font-weight: 600;">${conv(rentUSD)}<span style="font-size:0.75rem; font-weight:normal">/mo</span></div>
                  </div>
                </div>

                <div style="font-size: 0.85rem; line-height: 1.5;">
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--muted)">Food & Transport:</span>
                    <span>${conv(foodTransUSD)}</span>
                  </div>
                  ${cData.qualityOfLife ? `
                  <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                    <span style="color: var(--muted)">Quality of Life:</span>
                    <span style="color: var(--yellow)">⭐ ${cData.qualityOfLife}/10</span>
                  </div>` : ''}
                  ${cData.visaDifficulty ? `
                  <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                    <span style="color: var(--muted)">Visa Diff.:</span>
                    <span style="color: ${cData.visaDifficulty === 'Easy' ? 'var(--green)' : cData.visaDifficulty === 'Medium' ? 'var(--yellow)' : 'var(--red)'}">${cData.visaDifficulty}</span>
                  </div>` : ''}
                  ${cData.healthcare ? `
                  <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                    <span style="color: var(--muted)">Healthcare:</span>
                    <span style="text-align: right; max-width: 60%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${cData.healthcare}">${cData.healthcare}</span>
                  </div>` : ''}
                </div>
              </div>
            `;
            
            this.setPopupContent(popupContent);
            this.openPopup();
          });
          
          marker.on('mouseout', function(e) {
            this.setStyle(markerOptions);
            this.closePopup();
          });

          // Bind empty popup initially
          marker.bindPopup('', {
            className: 'custom-map-popup',
            closeButton: false,
            minWidth: 150
          });
      }
    });
  }
}

// Ensure the popup background blends well and map looks vibrant
const style = document.createElement('style');
style.innerHTML = `
  .leaflet-layer {
    filter: saturate(1.2) contrast(1.05);
  }
  .leaflet-popup-content-wrapper {
    background: var(--card2) !important;
    color: var(--text) !important;
    border: 1px solid var(--border) !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
    border-radius: var(--radius-sm) !important;
    padding: 0 !important;
  }
  .leaflet-popup-tip {
    background: var(--card2) !important;
    border-top: 1px solid var(--border) !important;
    border-left: 1px solid var(--border) !important;
  }
  .leaflet-popup-content { margin: 10px 14px !important; }
`;
document.head.appendChild(style);

// Observe when explore page is shown to initialize/invalidate size
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.id === 'page-explore' && mutation.target.classList.contains('active')) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        initExploreMap();
        exploreMap.invalidateSize();
      }, 100);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const explorePage = document.getElementById('page-explore');
  if (explorePage) {
    observer.observe(explorePage, { attributes: true, attributeFilter: ['class'] });
    // If it's already active on load
    if (explorePage.classList.contains('active')) {
      initExploreMap();
    }
  }
});
