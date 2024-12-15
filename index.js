// Retrieve existing shopping list from localStorage or initialize an empty array
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const shoppingListElement = document.getElementById('shoppingList');
const clearButton = document.getElementById('clearButton');

// Function to save list to localStorage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Function to render the shopping list
function renderList() {
    shoppingListElement.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        listItem.classList.toggle('purchased', item.purchased);

        // Add event listener to mark item as purchased
        listItem.addEventListener('click', () => {
            shoppingList[index].purchased = !shoppingList[index].purchased;
            saveToLocalStorage();
            renderList();
        });

        // Add double-click event to edit the item
        listItem.addEventListener('dblclick', () => {
            const newValue = prompt('Edit item:', item.name);
            if (newValue) {
                shoppingList[index].name = newValue.trim();
                saveToLocalStorage();
                renderList();
            }
        });

        shoppingListElement.appendChild(listItem);
    });
}

// Function to add an item to the list
addButton.addEventListener('click', () => {
    const item = itemInput.value.trim();
    if (item) {
        shoppingList.push({ name: item, purchased: false });
        saveToLocalStorage();
        renderList();
        itemInput.value = '';
    } else {
        alert('Please enter a valid item.');
    }
});

// Add event listener for "Enter" key to add items
itemInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addButton.click();
    }
});

// Add event listener to clear the list
clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the list?')) {
        shoppingList = [];
        saveToLocalStorage();
        renderList();
    }
});

// Render the list on page load
renderList();