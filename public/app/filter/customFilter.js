
var app = angular.module('app', []);

app.filter('myDate', function($filter) {    
    var angularDateFilter = $filter('date');
    return function(theDate) {
       return angularDateFilter(theDate, 'dd MMMM @ HH:mm:ss');
    }
});
app.filter('formatDate', function($filter) {
  return function (myDate) {
    if(typeof myDate === 'undefined') {
      return myDate;
    }
    var dateTokens = myDate.split("/");
    var month = parseInt(dateTokens[0]) - 1;
    var day = parseInt(dateTokens[1]);
    var year = parseInt(dateTokens[2]);
    var jsDate = new Date(year, month, day, 0, 0, 0, 0);
    
    return $filter('date')(jsDate.getTime(), 'fullDate');
  };
});
app.filter('makeUppercase', function () {
    return function (item) {
        return item.toUpperCase();
    };
});

app.filter('customCurrency', function() { 

  /* Create the return function and set the required parameter name to **input**
   setup optional parameters for the currency symbol and location (left or right of the amount) */
  return function(input, symbol, place) {

    // Ensure that we are working with a number
    if(isNaN(input)) {
      return input;
    } else {

      // Check if optional parameters are passed, if not, use the defaults
      var symbol = symbol || '$';
      var place = place === undefined ? true : place;

      // Perform the operation to set the symbol in the right location
      if( place === true) {
        return symbol + input;
      } else {
        return input + symbol;
      }

    }
  }

});

 app.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  });
 
app.filter('email',function(){
       var validateEmail = function(email) { 
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
       }
       return function(input){
            return validateEmail(input); 
       };
   });