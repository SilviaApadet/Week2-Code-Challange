// Select DOM elements
const addButton = document.getElementById('addBtn');
const clearButton = document.getElementById('clearBtn');
const itemInput = document.getElementById('itemInput');
const shoppingList = document.getElementById('shoppingList');

// Array to store shopping list items
let itemsArray = [];

// Function to render the list
function renderList() {
    shoppingList.innerHTML = ""; // Clear the list first
    itemsArray.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        if (item.purchased) li.classList.add('purchased');

        // Toggle purchase status on click
        li.addEventListener('click', () => {
            itemsArray[index].purchased = !itemsArray[index].purchased;
            saveToLocalStorage();
            renderList();
        });

        // Add Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editItem(index));

        // Add Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteItem(index));

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        shoppingList.appendChild(li);
    });
}

// Function to add a new item
function addItem() {
    const newItem = itemInput.value.trim();
    if (newItem !== "") {
        itemsArray.push({ name: newItem, purchased: false });
        saveToLocalStorage();
        itemInput.value = ""; // Clear input
        renderList();
    } else {
        alert("Please enter an item name.");
    }
}

// Function to clear the list
function clearList() {
    itemsArray = [];
    saveToLocalStorage();
    renderList();
}

// Function to edit an item
function editItem(index) {
    const newName = prompt("Edit item name:", itemsArray[index].name);
    if (newName !== null && newName.trim() !== "") {
        itemsArray[index].name = newName.trim();
        saveToLocalStorage();
        renderList();
    }
}

// Function to delete an item
function deleteItem(index) {
    itemsArray.splice(index, 1);
    saveToLocalStorage();
    renderList();
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(itemsArray));
}

// Load from localStorage
function loadFromLocalStorage() {
    const savedItems = localStorage.getItem('shoppingList');
    if (savedItems) {
        itemsArray = JSON.parse(savedItems);
        renderList();
    }
}

// Event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);

// Load data when page loads
loadFromLocalStorage();