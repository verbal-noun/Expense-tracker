// The backend module to handle calculations 
var budgetController = (function () {


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