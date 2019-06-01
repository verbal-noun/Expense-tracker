// The backend module to handle calculations 
var budgetController = (function () {
    // Object to track expenses 
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    // Object to track income
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    // Object to hold all items 
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        itemAdder: function(type, des, val) {
            var newItem;
            // A ID to track each items in exp and inc 
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Determining item type 
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // Adding new item to the suitable array in data object 
            data.allItems[type].push(newItem);
            // Returning new item 
            return newItem;
            
        },
        // A module to test the data structure 
        testing: function(){
            console.log(data);
        }
    
    };

})();

// A module to update the UI based on user input
var UIController = (function () {

    var DOMstrings =  {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },

        addListItem: function(obj, type){

            var html, newHtml, element;

            // Create HTML string with placeholder text 
            if(type === 'inc'){
                // The HTML class we want to add
                element = DOMstrings.incomeContainer;

                // Placeholder HTML
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description"> %description% </div>' +
            '<div class="right clearfix"> <div class="item__value"> %value% </div> <div class="item__delete">' + 
            '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            } else if(type === 'exp') {
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description"> %description% </div>' +
                '<div class="right clearfix"> <div class="item__value"> %value% </div>  <div class="item__percentage">21%</div>' + 
                '<div class="item__delete">' + '<button class="item__delete--btn"><i class="ion-ios-close-outline">' +
                '</i></button> </div> </div> </div>';
            }

            // Replace placeholder with actual value 
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert HTML into the DOM 
            // 'beforeend' makes the newHtml insert as the last child of that element 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml); 

        },

        getDOMstrings:function() {
            return DOMstrings;
        }

    };

})();


// A module to bridge frontend and backend 
var controller = (function (budget, UIctrl) {

    // A function which initates all event listeners 
    var setUpEventListeners = function() {

        // Importing the class names 
        var DOM = UIController.getDOMstrings();
        // Action when Return/Enter pressed or green add button is pressed 
        document.querySelector(DOM.inputBtn).addEventListener('click', addItems);
        document.addEventListener("keypress", function (event) {
        // When Enter is pressed in keyboard 
            if (event.keyCode == 13 || event.which == 13) {

            addItems();
            }
        });
    };
   
    // Adding new items 
    var addItems = function () {
        var input, newItem;
        // Get the field values 
        input = UIController.getInput();
        // Prompting for a valid value entry 
        if (input.value == '') {
            alert('Please enter a valid amount.');
        }

        // Add item to the budget controller 
        newItem = budget.itemAdder(input.type, input.description, input.value);
        // Add item to the UI 
        UIctrl.addListItem(newItem, input.type);

        // Calculate the budget 

        // Display budget on the UI
    };
    return {
        // A initialization function 
        init: function() {
            console.log("The application has started.");
            setUpEventListeners();
        }
    };
})(budgetController, UIController);

// Initiating the application 
controller.init();