const form = document.getElementById('wasteForm');
const wasteList = document.getElementById('wasteList');

let wastes = JSON.parse(localStorage.getItem('wastes')) || [];

function save() {
  localStorage.setItem('wastes', JSON.stringify(wastes));
}

function render() {
  wasteList.innerHTML = '';

  wastes.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'waste-card' + (item.cleaned ? ' cleaned' : '');

    div.innerHTML = `
      <div>
        <strong>${item.city}, ${item.state}</strong> (${item.type})
        <p>${item.address}</p>
        <p>${item.description}</p>
        <strong>Status: ${item.cleaned ? 'Cleaned' : 'Pending'}</strong>
      </div>
      <div class="actions">
        <button onclick="toggle(${index})">✔</button>
        <button onclick="toggle(${index})">ᴒ</button>
        <button onclick="removeWaste(${index})">✖</button>
      </div>
    `;

    wasteList.appendChild(div);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  wastes.push({
    state: state.value,
    city: city.value,
    address: address.value,
    type: wasteType.value,
    description: description.value,
    cleaned: false
  });

  save();
  render();
  form.reset();
});

function toggle(index) {
  wastes[index].cleaned = !wastes[index].cleaned;
  save();
  render();
}

function removeWaste(index) {
  wastes.splice(index, 1);
  save();
  render();
}

render();
