const agents = {
  maki: { name: "Maki Hashane", image: "./agents/agent1.jpg", phone: "+27123456789" },
  mpho: { name: "Mphonyane Mpho", image: "./agents/agent2.jpg", phone: "+27123456789" },
  dave: { name: "Dave Santan", image: "./agents/agent3.avif", phone: "+27123456789" },
  gabone: { name: "Gabone Gucci", image: "./agents/agent4.jpg", phone: "+27123456789" },
  thabo: { name: "Thabo Chaotsane", image: "./agents/agent5.jpeg", phone: "+27123456789" },
  tlaba: { name: "Tlaba Tefo", image: "./agents/agent6.jpg", phone: "+27123456789" }
};

const properties = [
  { id: 1, title: "Modern Oceanview Villa", price: "R1,250,000", specs: "4 Beds • 3 Baths • 3,200 sqft", image: "./Properties/p1.jpg", agent: agents.thabo },
  { id: 2, title: "Downtown Penthouse Suite", price: "R890,000", specs: "2 Beds • 2 Baths • 1,500 sqft", image: "./Properties/p2.jpg", agent: agents.tlaba },
  { id: 3, title: "Suburban Family Estate", price: "R650,000", specs: "5 Beds • 4 Baths • 4,100 sqft", image: "./Properties/p3.jpg", agent: agents.maki },
  { id: 4, title: "Luxury Hillside Mansion", price: "R2,400,000", specs: "6 Beds • 5 Baths • 5,800 sqft", image: "./Properties/p4.jpg", agent: agents.dave },
  { id: 5, title: "Cozy Urban Loft", price: "R480,000", specs: "1 Bed • 1 Bath • 850 sqft", image: "./Properties/p5.jpg", agent: agents.gabone },
  { id: 6, title: "Lakeside Modern Home", price: "R1,100,000", specs: "4 Beds • 3 Baths • 2,900 sqft", image: "./Properties/p6.jpg", agent: agents.tlaba },
  { id: 7, title: "Contemporary Glass Cottage", price: "R720,000", specs: "3 Beds • 2 Baths • 1,800 sqft", image: "./Properties/p7.jpg", agent: agents.dave },
  { id: 8, title: "Skyline High-Rise Condominium", price: "R950,000", specs: "3 Beds • 2 Baths • 2,100 sqft", image: "./Properties/p8.jpg", agent: agents.thabo },
  { id: 9, title: "Rustic Countryside Manor", price: "R830,000", specs: "4 Beds • 4 Baths • 3,600 sqft", image: "./Properties/p9.jpg", agent: agents.thabo },
  { id: 10, title: "Beachfront Bungalow", price: "R1,650,000", specs: "3 Beds • 3 Baths • 2,400 sqft", image: "./Properties/p10.jpg", agent: agents.thabo }
];

const authSection = document.getElementById('auth-sec');
const mainApp = document.getElementById('main-web');
const loginForm = document.getElementById('log-form');
const registerForm = document.getElementById('reg-form');
const userDisplay = document.getElementById('Display');
const logoutBtn = document.getElementById('logout-btn');

function switchAuthTab(tab) {
  const loginTabBtn = document.getElementById('tab-login');
  const registerTabBtn = document.getElementById('tab-register');

  if (tab === 'login') {
    loginTabBtn.classList.add('active');
    registerTabBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  } else {
    registerTabBtn.classList.add('active');
    loginTabBtn.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  const user = { name, email, password };
  localStorage.setItem('user', JSON.stringify(user));

  alert('Account created! Logging you in...');
  loginUser(user);
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const savedUser = JSON.parse(localStorage.getItem('user'));

  if (savedUser && savedUser.email === email && savedUser.password === password) {
    loginUser(savedUser);
  } else {
    alert('Invalid credentials. Please register first!');
  }
});

function loginUser(user) {
  authSection.classList.add('hidden');
  mainApp.classList.remove('hidden');
  userDisplay.textContent = `Welcome, ${user.name}`;
  renderProperties();
}

logoutBtn.addEventListener('click', () => {
  mainApp.classList.add('hidden');
  authSection.classList.remove('hidden');
});

function renderProperties() {
  const propertyGrid = document.getElementById('property-grid');
  propertyGrid.innerHTML = '';

  properties.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'property-card';

    // Safe fallback if agent object is missing
    const agentName = item.agent ? item.agent.name : "Agent";
    const agentImg = item.agent ? item.agent.image : "";
    const agentPhone = item.agent ? item.agent.phone : "#";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="property-img" />
      <div class="property-details">
        <div class="price">${item.price}</div>
        <h3 class="title">${item.title}</h3>
        <p class="specs">${item.specs}</p>
        
        <div class="agent-info">
          <div class="agent-profile">
            <img src="${agentImg}" alt="${agentName}" class="agent-avatar" />
            <div>
              <span class="agent-label">Listing Agent</span>
              <span class="agent-name">${agentName}</span>
            </div>
          </div>
          <a href="tel:${agentPhone}" class="agent-phone">📞 Call</a>
        </div>
      </div>
    `;

    propertyGrid.appendChild(card);
  });
}