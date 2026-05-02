// Elements
const modal = document.getElementById('billModal');
const openBtn = document.getElementById('openModalBtn');
const billForm = document.getElementById('create-bill-form');
const tableBody = document.getElementById('billing-table-body');
const searchInput = document.getElementById('logSearch');

// 1. Search Logic
if (searchInput && tableBody) {
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.getElementsByTagName('tr');
        Array.from(rows).forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(filter) ? '' : 'none';
        });
    });
}

// 2. Modal Functions
if (openBtn) {
    openBtn.onclick = () => modal.classList.remove('hidden');
}

function closeModal() {
    if (modal) modal.classList.add('hidden');
}

// 3. Form Submission
if (billForm) {
    billForm.onsubmit = (e) => {
        e.preventDefault();
        const customer = document.getElementById('bill-customer').value;
        const reading = document.getElementById('bill-reading').value;
        const rate = document.getElementById('bill-rate').value;
        const date = new Date().toISOString().split('T')[0];
        const total = (parseFloat(reading) * parseFloat(rate)).toFixed(2);
        const dogTag = "DT-" + Math.floor(100 + Math.random() * 899);

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><span class="dog-tag">${dogTag}</span></td>
            <td>${date}</td>
            <td>${customer}</td>
            <td>${reading} m³</td>
            <td>₱${total}</td>
            <td><span class="status-pending">Pending</span></td>
            <td><button class="view-btn" onclick="viewInvoice('${customer}', '${reading}', '${rate}', '${total}')">View</button></td>
        `;

        tableBody.prepend(newRow);
        closeModal();
        billForm.reset();
    };
}

function viewInvoice(customer, reading, rate, total) {
    window.location.href = `invoice.html?customer=${customer}&reading=${reading}&rate=${rate}&total=${total}`;
}

window.onclick = (e) => { if (e.target == modal) closeModal(); }