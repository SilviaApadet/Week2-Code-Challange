
/// Array to store shopping list items
let shoppingList = [];

document.querySelector("#addBtn").onclick = function () {
    const newItemInput = document.querySelector("#new-item input");
    const newItem = newItemInput.value.trim();

    if (newItem.length === 0) {
        alert("Please enter an item.");
    } else {
        // Add item to the array
        shoppingList.push(newItem);

        // Add item to the DOM
        document.querySelector("#items").innerHTML += `
        <div class="item"> 
            <span id="item-name">
                ${newItem}
            </span>
            <button class="delete">
                <i class="fa fa-trash"></i>
            </button>
        </div>
        `;

        // Add delete functionality
        var current_items = document.querySelectorAll(".delete");
        for (var i = 0; i < current_items.length; i++) {
            current_items[i].onclick = function () {
                const itemName = this.previousElementSibling.textContent.trim();
                // Remove item from array
                shoppingList = shoppingList.filter(item => item !== itemName);

                // Remove item from DOM
                this.parentNode.remove();
            };
        }

        // Add purchased toggle functionality
        var items = document.querySelectorAll(".item");
        for (var i = 0; i < items.length; i++) {
            items[i].onclick = function () {
                this.classList.toggle("bought");
            };
        }

        // Add functionality to clear all items
        document.querySelector("#clearBtn").onclick = function () {
            // Clear the array
            shoppingList = [];

            // Clear the DOM
            document.querySelector("#items").innerHTML = "";
        };

        // Clear the input field
        newItemInput.value = "";
    }
};