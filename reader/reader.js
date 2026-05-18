document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date-now').innerText = new Date().toDateString();
    applyProfile();
    syncSystemSettings();
    fixMissingSerials(); 
    loadReaderList();
});

let systemRate = 0;
let selectedId = null;

// Profile Logic
function applyProfile() {
    const user = JSON.parse(localStorage.getItem('reader_profile')) || { name: "Mark Joseph", photo: "0dffa7be-1c3f-4441-b6c3-610058515618.jpg" };
    // Update navbar name if you add a span for it, or just use current logic
}

function openSettingsModal() {
    const user = JSON.parse(localStorage.getItem('reader_profile')) || { name: "Mark Joseph" };
    document.getElementById('edit-name').value = user.name;
    document.getElementById('settings-modal').classList.remove('hidden');
}

function closeSettingsModal() { document.getElementById('settings-modal').classList.add('hidden'); }

// Search Logic
function filterTable() {
    const input = document.getElementById("search-input").value.toUpperCase();
    const rows = document.getElementById("reader-list-body").getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const text = rows[i].textContent || rows[i].innerText;
        rows[i].style.display = text.toUpperCase().includes(input) ? "" : "none";
    }
}

// Data Logic
function syncSystemSettings() {
    const rawRate = localStorage.getItem('bwrwsai_rate');
    systemRate = (rawRate && !isNaN(rawRate)) ? parseFloat(rawRate) : 10.00;
    document.getElementById('display-rate').innerText = `₱${systemRate.toFixed(2)} / m³`;
}

function fixMissingSerials() {
    let residents = JSON.parse(localStorage.getItem('bwrwsai_data')) || [];
    let updated = false;
    residents = residents.map((r, index) => {
        if (!r.meterSerial) {
            updated = true;
            return { ...r, meterSerial: `MS-2026-${100 + index}`, connectionStatus: "Active" };
        }
        return r;
    });
    if(updated) localStorage.setItem('bwrwsai_data', JSON.stringify(residents));
}

function loadReaderList() {
    const data = JSON.parse(localStorage.getItem('bwrwsai_data')) || [];
    const tbody = document.getElementById('reader-list-body');
    tbody.innerHTML = '';

    data.forEach(r => {
        const isDone = r.status === 'completed';
        const conn = r.connectionStatus || "Active";
        tbody.innerHTML += `
            <tr>
                <td><b>${r.name}</b><br><small style="color:gray;">${r.meterSerial}</small></td>
                <td><span class="badge ${isDone ? 'bg-green' : 'bg-red'}">${isDone ? 'LOGGED' : 'PENDING'}</span></td>
                <td><span style="font-size:0.8rem;">● ${conn}</span></td>
                <td style="font-weight: 600;">${isDone ? `₱${r.total_bill}` : '---'}</td>
                <td>
                    ${isDone ? `<button disabled style="opacity:0.5; cursor:not-allowed; border:none; background:none;">✔ Saved</button>` : 
                    `<button class="submit-btn" style="padding: 6px 12px; font-size: 0.8rem;" onclick="openModal(${r.id}, '${r.name}')">Enter Reading</button>`}
                </td>
            </tr>
        `;
    });
}

function openModal(id, name) {
    selectedId = id;
    document.getElementById('target-name').innerText = name;
    document.getElementById('reading-modal').classList.remove('hidden');
}

function closeModal() { document.getElementById('reading-modal').classList.add('hidden'); }

function saveReading() {
    const currentVal = parseFloat(document.getElementById('meter-input').value);
    if(isNaN(currentVal) || currentVal < 0) return alert("Valid reading required.");

    let data = JSON.parse(localStorage.getItem('bwrwsai_data')) || [];
    const resIndex = data.findIndex(r => r.id === selectedId);
    const res = data[resIndex];

    const consumption = currentVal - (res.previousReading || 0);
    if(consumption < 0) return alert("Reading cannot be lower than previous.");

    data[resIndex] = {
        ...res,
        status: 'completed',
        consumption: consumption,
        total_bill: (consumption * systemRate).toFixed(2),
        readingDate: new Date().toLocaleDateString()
    };

    localStorage.setItem('bwrwsai_data', JSON.stringify(data));
    closeModal();
    loadReaderList();
}