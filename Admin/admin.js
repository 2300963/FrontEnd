document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date-now').innerText = new Date().toDateString();
    loadDashboard();

    // 1. Search Logic Implementation
    const searchBar = document.getElementById('adminSearch');
    if(searchBar) {
        searchBar.addEventListener('keyup', function() {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll('#master-list-body tr');
            rows.forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
            });
        });
    }
});

// 2. Navigation Control
function showSection(sectionId, element) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    element.classList.add('active');
    document.getElementById('section-title').innerText = element.innerText;
}

// 3. Register Consumer
function registerConsumer() {
    const name = document.getElementById('res-name').value;
    const addr = document.getElementById('res-address').value;
    if(!name || !addr) return alert("Please fill details");

    // Generate Dog Tag ID
    const dogTag = "DT-" + (1000 + Math.floor(Math.random() * 9000));

    let data = JSON.parse(localStorage.getItem('bwrwsai_data')) || [];
    data.push({ 
        id: Date.now(), 
        tag: dogTag, 
        name: name, 
        address: addr, 
        status: 'pending' 
    });
    localStorage.setItem('bwrwsai_data', JSON.stringify(data));
    
    document.getElementById('res-name').value = '';
    document.getElementById('res-address').value = '';
    loadDashboard();
}

// 4. Delete Resident
function deleteResident(id) {
    if(confirm("Are you sure you want to remove this resident?")) {
        let data = JSON.parse(localStorage.getItem('bwrwsai_data')) || [];
        data = data.filter(r => r.id !== id);
        localStorage.setItem('bwrwsai_data', JSON.stringify(data));
        loadDashboard();
    }
}

// 5. Update Rate
function updateRate() {
    const val = document.getElementById('rate-input').value;
    if(!val) return alert("Enter rate");
    localStorage.setItem('bwrwsai_rate', val);
    alert("Water Rate Updated!");
    document.getElementById('rate-input').value = '';
    loadDashboard();
}

// 6. Data Loader
function loadDashboard() {
    const data = JSON.parse(localStorage.getItem('bwrwsai_data')) || [];
    const rate = localStorage.getItem('bwrwsai_rate') || "0.00";
    
    const totalStat = document.getElementById('stat-total');
    const pendingStat = document.getElementById('stat-pending');
    const rateStat = document.getElementById('stat-rate');
    const rateDisplay = document.getElementById('current-rate-display');

    if(totalStat) totalStat.innerText = data.length;
    if(pendingStat) pendingStat.innerText = data.filter(r => r.status === 'pending').length;
    if(rateStat) rateStat.innerText = `₱${rate}`;
    if(rateDisplay) rateDisplay.innerText = `₱${rate} / m³`;

    const tbody = document.getElementById('master-list-body');
    if(tbody) {
        tbody.innerHTML = data.map(r => `
            <tr>
                <td><span class="dog-tag">${r.tag}</span></td>
                <td><b>${r.name}</b><br><small style="color:gray;">${r.address}</small></td>
                <td><span class="badge ${r.status === 'pending' ? 'bg-red' : 'bg-green'}">${r.status.toUpperCase()}</span></td>
                <td><button class="btn-delete" onclick="deleteResident(${r.id})">Delete</button></td>
            </tr>
        `).join('');
    }
}