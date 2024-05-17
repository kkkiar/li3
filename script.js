// Массив для хранения транзакций
const transactions = [];

// Функция для добавления транзакции
function addTransaction() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const id = transactions.length + 1;
    const date = new Date().toLocaleString();

    const transaction = {
        id,
        date,
        amount: parseFloat(amount),
        category,
        description
    };

    transactions.push(transaction);
    addTransactionToTable(transaction);
    calculateTotal();
}

// Функция для добавления строки в таблицу
function addTransactionToTable(transaction) {
    const table = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    row.setAttribute('data-id', transaction.id);

    const idCell = row.insertCell(0);
    const dateCell = row.insertCell(1);
    const categoryCell = row.insertCell(2);
    const descriptionCell = row.insertCell(3);
    const actionCell = row.insertCell(4);

    idCell.textContent = transaction.id;
    dateCell.textContent = transaction.date;
    categoryCell.textContent = transaction.category;
    descriptionCell.textContent = transaction.description.split(' ').slice(0, 4).join(' ');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => deleteTransaction(transaction.id);
    actionCell.appendChild(deleteButton);

    if (transaction.amount > 0) {
        row.style.backgroundColor = 'lightgreen';
    } else {
        row.style.backgroundColor = 'lightcoral';
    }

    row.onclick = () => showDetailedDescription(transaction);
}

// Функция для удаления транзакции
function deleteTransaction(id) {
    const index = transactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        const row = document.querySelector(`[data-id='${id}']`);
        row.parentNode.removeChild(row);
        calculateTotal();
    }
}

// Функция для подсчета общей суммы
function calculateTotal() {
    const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    document.getElementById('totalAmount').textContent = totalAmount;
}

// Функция для отображения полного описания транзакции
function showDetailedDescription(transaction) {
    const detailedDescription = document.getElementById('detailedDescription');
    detailedDescription.textContent = `Полное описание: ${transaction.description}`;
}
