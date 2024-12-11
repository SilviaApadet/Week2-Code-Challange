document.querySelector("#addBtn").onclick = function() {
    if(document.querySelector("#new item input").value.length == 0){
       alert("Please enter an item.")
    }
    else {
       document.querySelector('#items').innerHTML += 
       `
       <div class = "item"> 
           <span id= "item-name">
           ${document.querySelector("#new-item input").value} 
           </span>
           <button class = "delete">
            <i class="fa fa-trash"></i>
           </button>
       </div>
       `;

       var current_items = document.querySelectorAll(".delete");
       for(var i=0; i<current_items.length; i++) {
           current_items[i].onclick = function(){
               this.parentNode.remove();
           }
       }

       var items = document.querySelectorAll(".item");
       for(var i=0; i<items.length; i++) {
           items[i].onclick = function() {
               this.classList.toggle('bought');
           }
       }
       // Add functionality to clear all items in the list
        document.querySelector("#clearBtn").onclick = function() {
        // Clear the entire items container
         document.querySelector("#items").innerHTML = "";
        }

       document.querySelector("#new item input").value = "";
    }
}