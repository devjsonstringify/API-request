require("jquery");

var moment = require("moment"),
    _ = require("lodash"),    
    searchBtn = document.querySelector("#searchBtn"),
    displayAlert = document.querySelector("#displayAlert"),
    displayRequest = document.querySelector(".displayRequestData"),
    newsOpt = document.querySelector("#news-selection"),
    pageNavigation = document.querySelector(".pageNavigation"),
    spinner = document.querySelector(".spinner"),
    eleIsVisible = false,
    catOpt = document.querySelector("#cat-selection");

module.exports = {
    converTime: function (time) {
        var published = moment(time);
        var currTime = _.now();
        var result = published.from(currTime);
        return result;  
      },
    showError: function (error) {
        var showErr = "";
            showErr +=
                '<div id="displayAlert" class="alert alert-danger alert-dismissible fade show" role="alert">' +
                "<strong>Warning</strong> " +
                "Empty" +
                " " +
                error +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                "</button>";
            showErr += "</div>";
            document.querySelector(".errorDisplayer").innerHTML = showErr;
    },
    disabledBtn: function (visibilty) {
        var visibilty = visibilty === "true" ? searchBtn.setAttribute("disabled", "disabled") : searchBtn.removeAttribute("disabled");
    },
    showSpinner: function (visibilty) {     
        var visibilty = visibilty === "show" ? (spinner.style.display = "block") : (spinner.style.display = "none");
    },
    tempHide: function(visibility) {
        var toggleDropDown = document.querySelector('#js-news-dropDown-options');
        if(visibility === 'true'){
        toggleDropDown.classList.toggle("invisible");
        }else{
            toggleDropDown.classList.toggle("visible");
        }
    },
    randomSource: function(min){        
       var random = _.random(min, 20);
       if(random === random){
           return random;
       }
    }
};

