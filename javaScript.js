const agents = {
  sarah: {
    name: "Sarah Jenkins",
    image: "images/agents/sarah.jpg",
    phone: "+1 (555) 234-5678"
  },
  marcus: {
    name: "Marcus Vance",
    image: "images/agents/marcus.jpg",
    phone: "+1 (555) 876-5432"
  },
  elena: {
    name: "Elena Rostova",
    image: "images/agents/elena.jpg",
    phone: "+1 (555) 345-6789"
  }
};

const properties = [
  { id: 1, title: "Modern Oceanview Villa", price: "$1,250,000", specs: "4 Beds • 3 Baths • 3,200 sqft", image: "images/houses/house1.jpg", agent: agents.sarah },
  { id: 2, title: "Downtown Penthouse Suite", price: "$890,000", specs: "2 Beds • 2 Baths • 1,500 sqft", image: "images/houses/house2.jpg", agent: agents.marcus },
  { id: 3, title: "Suburban Family Estate", price: "$650,000", specs: "5 Beds • 4 Baths • 4,100 sqft", image: "images/houses/house3.jpg", agent: agents.elena },
  { id: 4, title: "Luxury Hillside Mansion", price: "$2,400,000", specs: "6 Beds • 5 Baths • 5,800 sqft", image: "images/houses/house4.jpg", agent: agents.sarah },
  { id: 5, title: "Cozy Urban Loft", price: "$480,000", specs: "1 Bed • 1 Bath • 850 sqft", image: "images/houses/house5.jpg", agent: agents.marcus },
  { id: 6, title: "Lakeside Modern Home", price: "$1,100,000", specs: "4 Beds • 3 Baths • 2,900 sqft", image: "images/houses/house6.jpg", agent: agents.elena },
  { id: 7, title: "Contemporary Glass Cottage", price: "$720,000", specs: "3 Beds • 2 Baths • 1,800 sqft", image: "images/houses/house7.jpg", agent: agents.sarah },
  { id: 8, title: "Skyline High-Rise Condominium", price: "$950,000", specs: "3 Beds • 2 Baths • 2,100 sqft", image: "images/houses/house8.jpg", agent: agents.marcus },
  { id: 9, title: "Rustic Countryside Manor", price: "$830,000", specs: "4 Beds • 4 Baths • 3,600 sqft", image: "images/houses/house9.jpg", agent: agents.elena },
  { id: 10, title: "Beachfront Bungalow", price: "$1,650,000", specs: "3 Beds • 3 Baths • 2,400 sqft", image: "images/houses/house10.jpg", agent: agents.sarah }
];

const authSection = document.getElementById('auth-sec');
const mainApp = document.getElementById('main-web');
const loginForm = document.getElementById('log-form');
const registerForm = document.getElementById('reg-form');
const userDisplay = document.getElementById('user-display');
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

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="property-img" />
      <div class="property-details">
        <div class="price">${item.price}</div>
        <h3 class="title">${item.title}</h3>
        <p class="specs">${item.specs}</p>
        
        <div class="agent-info">
          <div class="agent-profile">
            <img src="${item.agent.image}" alt="${item.agent.name}" class="agent-avatar" />
            <div>
              <span class="agent-label">Listing Agent</span>
              <span class="agent-name">${item.agent.name}</span>
            </div>
          </div>
          <a href="tel:${item.agent.phone}" class="agent-phone">📞 Call</a>
        </div>
      </div>
    `;

    propertyGrid.appendChild(card);
  });
}