interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
  }
  
  const expenseList = document.getElementById('expenseList') as HTMLUListElement;
  const addExpenseBtn = document.getElementById('addExpenseBtn') as HTMLButtonElement;
  
  let expenses: Expense[] = [];
  let idCounter = 1;
  
  function addExpense() {
    const descriptionInput = document.getElementById('description') as HTMLInputElement;
    const amountInput = document.getElementById('amount') as HTMLInputElement;
    const categoryInput = document.getElementById('category') as HTMLSelectElement;
  
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
  
    if (description === '' || isNaN(amount)) {
      alert('Please enter a valid description and amount.');
      return;
    }
  
    const newExpense: Expense = { id: idCounter++, description, amount, category };
    expenses.push(newExpense);
    displayExpense(newExpense);
    descriptionInput.value = '';
    amountInput.value = '';
  }
  
  function displayExpense(expense: Expense) {
    const listItem = document.createElement('li');
    listItem.classList.add('expense-item');
    listItem.innerHTML = `
      <strong>${expense.description}</strong>: $${expense.amount.toFixed(2)} (${expense.category})
      <button class="delete-btn" data-id="${expense.id}">Delete</button>
    `;
    expenseList.appendChild(listItem);
  
    const deleteBtn = listItem.querySelector('.delete-btn') as HTMLButtonElement;
    deleteBtn.addEventListener('click', deleteExpense);
  }
  
  function deleteExpense(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    const id = parseInt(target.dataset.id??"");
    if (isNaN(id)) {
        console.error('Invalid expense ID');
        return;
      }
    expenses = expenses.filter(expense => expense.id !== id);
    const listItem = target.parentElement;
    if (listItem) {
      listItem.remove();
    }
  }
  
  addExpenseBtn.addEventListener('click', addExpense);
  