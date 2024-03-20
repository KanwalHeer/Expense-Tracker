var expenseList = document.getElementById('expenseList');
var addExpenseBtn = document.getElementById('addExpenseBtn');
var expenses = [];
var idCounter = 1;
function addExpense() {
    var descriptionInput = document.getElementById('description');
    var amountInput = document.getElementById('amount');
    var categoryInput = document.getElementById('category');
    var description = descriptionInput.value.trim();
    var amount = parseFloat(amountInput.value);
    var category = categoryInput.value;
    if (description === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount.');
        return;
    }
    var newExpense = { id: idCounter++, description: description, amount: amount, category: category };
    expenses.push(newExpense);
    displayExpense(newExpense);
    descriptionInput.value = '';
    amountInput.value = '';
}
function displayExpense(expense) {
    var listItem = document.createElement('li');
    listItem.classList.add('expense-item');
    listItem.innerHTML = "\n      <strong>".concat(expense.description, "</strong>: $").concat(expense.amount.toFixed(2), " (").concat(expense.category, ")\n      <button class=\"delete-btn\" data-id=\"").concat(expense.id, "\">Delete</button>\n    ");
    expenseList.appendChild(listItem);
    var deleteBtn = listItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteExpense);
}
function deleteExpense(event) {
    var _a;
    var target = event.target;
    var id = parseInt((_a = target.dataset.id) !== null && _a !== void 0 ? _a : "");
    if (isNaN(id)) {
        console.error('Invalid expense ID');
        return;
    }
    expenses = expenses.filter(function (expense) { return expense.id !== id; });
    var listItem = target.parentElement;
    if (listItem) {
        listItem.remove();
    }
}
addExpenseBtn.addEventListener('click', addExpense);
