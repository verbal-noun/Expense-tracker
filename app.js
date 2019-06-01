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
            ID = 0;
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
        }
    };

})();

// A module to update the UI based on user input
var UIController = (function () {

    var DOMstrings =  {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };


    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be 'inc' or 'exp'
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },

        getDOMstrings:function() {
            return DOMstrings;
        }

    };

})();


// A module to bridge frontend and backend 
var controller = (function (budget, UIctrl) {

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

        // Get the field values 
        var input = UIController.getInput();
        // Prompting for a valid value entry 
        if (input.value == '') {
            alert('Please enter a valid amount.');
        }
        // Add item to the budget controller 

        // Add item to the UI 

        // Calculate the budget 

        // Display budget on the UI
    };
    return {
        init: function() {
            console.log("The application has started.");
            setUpEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();