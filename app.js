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

    // Function to calculate the total items of an array 
    var calculateTotal = function(type) {
        var sum = 0;
        // Adding all values up 
        data.allItems[type].forEach(function(curr) {
            sum += curr.value;
        });
        data.totals[type] = sum;
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
        },
        budget: 0,
        percentage: -1
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

        calculateBudget: function() {
            // Add all items income and expense 
            calculateTotal('inc');
            calculateTotal('exp');

            // Calculate budget = income - expense 
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate percentaile of expense is of the budget 
            data.percentage = (data.totals.exp / data.totals.inc) * 100;
        },

        testing: function() {
            return data;
        }
    };

})();


//----------------------------------------------------------------------------------------------------------------------//


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
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) 
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

        // Method to clear existing fields of data 
        clearFields: function() {
            var fields, arrField;
            // Selecting the input fields 
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + 
            DOMstrings.inputValue);    

            arrField = Array.prototype.slice.call(fields); // Converting list to array 

            // Clear out each of the input fields 
            arrField.forEach(function(current, index, array) {
                current.value = "";
            });
            // Focus on the item description after each entry 
            arrField[0].focus();
        },

        getDOMstrings: function() {
            return DOMstrings;
        } 

    };

})();


// ----------------------------------------------------------------------------------------------------------------------//


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

    var updateBudget = function() {

        //  Calculate the budget 
        
        // Return the budget 

        // Display the budget on the UI 

    };   
    // Adding new items 
    var addItems = function () {
        var input, newItem;
        // Get the field values 
        input = UIController.getInput();

        // Checking input validity 
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // Add item to the budget controller 
            newItem = budget.itemAdder(input.type, input.description, input.value);

            // Add item to the UI 
            UIctrl.addListItem(newItem, input.type);

            // Clear input fields 
            UIctrl.clearFields(); 

            // Calculate and update the budget 
            updateBudget();
        }
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