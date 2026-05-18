document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Date
    const dateNow = document.getElementById('date-now');
    if (dateNow) dateNow.innerText = new Date().toDateString();

    // 2. Search Functionality
    const billSearch = document.getElementById('billSearch');
    const tableBody = document.getElementById('billing-log-body');

    if (billSearch && tableBody) {
        billSearch.addEventListener('keyup', () => {
            const filter = billSearch.value.toLowerCase();
            const rows = tableBody.getElementsByTagName('tr');
            Array.from(rows).forEach(row => {
                row.style.display = row.innerText.toLowerCase().includes(filter) ? '' : 'none';
            });
        });
    }

    // 3. Modal Toggling
    const billModal = document.getElementById('billModal');
    const createBtn = document.getElementById('createNewBill');
    const closeBtn = document.getElementById('closeBillModal');

    if (createBtn) createBtn.onclick = () => billModal.classList.remove('hidden');
    if (closeBtn) closeBtn.onclick = () => billModal.classList.add('hidden');

    // 4. FUNCTIONAL: Create New Bill Logic
    const billForm = document.getElementById('new-bill-form');
    if (billForm && tableBody) {
        billForm.onsubmit = (e) => {
            e.preventDefault();

            // Collect Data from inputs
            const dogTag = document.getElementById('billTag').value;
            const reading = document.getElementById('billReading').value;
            const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            
            // Basic calculation example (e.g., 15 pesos per m3)
            const rate = 15; 
            const totalAmount = (reading * rate).toFixed(2);

            // Create new row element
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><span class="dog-tag">${dogTag}</span></td>
                <td>${dateStr}</td>
                <td>Pending Assignment</td>
                <td>${reading} m³</td>
                <td>₱${totalAmount}</td>
                <td><span style="color: #ef4444; font-weight: bold;">Unpaid</span></td>
                <td><button class="view-btn action-view" data-id="${dogTag}">View</button></td>
            `;

            // Add to top of the table
            tableBody.prepend(newRow);

            // Close modal and reset form
            billModal.classList.add('hidden');
            billForm.reset();
            
            // Optional: Update stats after adding
            updateDashboardStats(); 
        };
    }

    // 5. View Action Redirect
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-view')) {
            const dogTag = e.target.getAttribute('data-id');
            window.location.href = `invoice.html?customer=New%20Customer&reading=${encodeURIComponent(dogTag)}`;
        }
    });
});

function updateDashboardStats() {
    const unpaidEl = document.getElementById('stat-unpaid');
    if (unpaidEl) {
        let currentUnpaid = parseInt(unpaidEl.innerText);
        unpaidEl.innerText = currentUnpaid + 1;
    }
}