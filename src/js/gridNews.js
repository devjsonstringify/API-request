var axios = require("axios"), //global variables
        _ = require("lodash"),
        $ = require("jquery"),
        progressively = require("./lazyLoading.js"),                  
        config = require("./config.js"),
        apiUrl = config.host,
        apiKey = config.api,
        importFunctions = require("./functions.js"),
        randomCountry = ['us', 'ph', 'sg'],
        source = _.sample(randomCountry, randomCountry.length),
        hideDropDownOptions = document.querySelector('#js-news-dropDown-options');


    

document.addEventListener("DOMContentLoaded", function (event) {
   hideDropDownOption('true');       
});



window.onload = function() {
  newsRequest();
  hideDropDownOption(); 
  isGridNewsIsVisible();
  
};

function isGridNewsIsVisible() {
  var checkJsGrid = _.isElement(document.querySelector('.js-grid-main'));
  var intervalCheck =  setInterval(() => { 
       checkJsGrid = _.isElement(checkJsGrid);      
  }, 1000);
 var result = checkJsGrid === true ? clearInterval(intervalCheck):  newsRequest(); 
}

function hideDropDownOption(visibility){
    if(visibility === 'true'){
        hideDropDownOptions.classList.add("invisible");        
    }else{
        hideDropDownOptions.classList.remove("invisible");
        hideDropDownOptions.classList.add("visible");   
    }
}

function newsRequest(){    
  
    const request = axios.get(apiUrl + "top-headlines?country=" + source + "&apiKey=" + apiKey);
    request.then(function (response) {

        var reStringify = JSON.stringify(response);
        var rejson = JSON.parse(reStringify);   
       

        if (rejson.data.status == "ok") {
            if (rejson.data) {           //if(rejson.data)
                for (var i = 0; i < 3; i++) {
                 var gridnews = "";
                        gridnews  += '<div class="js-grid-main">' +
                            '<div class="row">' +
                                '<div id="grid-8" class="col-8">' +
                                        '<div class="img-box">' +
                                            '<a href="' +  rejson.data.articles[1].url + '" target="_blank">' + 
                                               '<div class="progressive__bg progressive__img progressive--not-loaded NewsImgWrap" data-progressive=" '+ rejson.data.articles[1].urlToImage +' " style=" background-image: url(' + rejson.data.articles[1].urlToImage + ');">' + 
                                                    '<img class="newsImg" src="' + rejson.data.articles[1].urlToImage + '">' + 
                                                     '<div class="gradient-bg">' + '</div>' +
                                                '<div class="card-body-parent">'   + 
                                                        '<div class="card-body">' + 
                                                                    '<h5 class="card-title">' +  rejson.data.articles[1].title +'</h5>' +
                                                        '</div>' +
                                                                '<div class="card-footer">' +
                                                                    '<small class="text-muted">'+ rejson.data.articles[1].source.name + ' / ' + importFunctions.converTime(rejson.data.articles[1].publishedAt ) + '</small>' +
                                                                '</div>' + 
                                                        '</div>' + 
                                                    '</div>' + 
                                                '</a>' + 
                                            '</div>' + 
                                '</div>' +
                                
                                '<div id="grid-4" class="col-4">' +
                                            '<div class="row grid-4-row">' +
                                                '<div class="col grid-4-child-row">' +
                                                    '<div class="img-box">' +
                                                    '<a href="' +  rejson.data.articles[2].url + '" target="_blank">' + 
                                                        '<div class="progressive__bg progressive__img progressive--not-loaded NewsImgWrap" data-progressive=" '+ rejson.data.articles[2].urlToImage +' " style=" background: url(' + rejson.data.articles[2].urlToImage + ');">' +
                                                        '<img class="newsImg" src="' + rejson.data.articles[2].urlToImage + '">' + 
                                                           '<div class="gradient-bg">' + '</div>' +
                                                            '<div class="card-body-parent">'   + 
                                                            '<div class="card-body">' + 
                                                                '<h5 class="card-title">' +  rejson.data.articles[2].title +'</h5>' +
                                                                '<small class="text-muted">'+ rejson.data.articles[2].source.name + ' / ' + importFunctions.converTime(rejson.data.articles[2].publishedAt ) + '</small>' +
                                                            '</div>' +
                                                        '</div>' + 
                                                    '</div>' +
                                                     '</a>' + 
                                                 '</div>' +
                                                '</div>' +
                                            '<div class="col grid-4-child-row">' +
                                                '<div class="img-box">' +
                                                '<a href="' +  rejson.data.articles[3].url + '" target="_blank">' + 
                                                    '<div class="progressive__bg progressive__img progressive--not-loaded NewsImgWrap" data-progressive=" '+ rejson.data.articles[3].urlToImage +' " style=" background: url(' + rejson.data.articles[3].urlToImage + ');">' + 
                                                   '<img class="newsImg" src="' + rejson.data.articles[3].urlToImage + '">' +
                                                      '<div class="gradient-bg">' + '</div>' +
                                                        '<div class="card-body-parent">'   +  
                                                          '<div class="card-body">' + 
                                                                '<h5 class="card-title">' +  rejson.data.articles[3].title + '</h5>' +
                                                            '</div>' +
                                                                '<div class="card-footer">' +
                                                                '<small class="text-muted">'+ rejson.data.articles[3].source.name + ' / ' + importFunctions.converTime(rejson.data.articles[3].publishedAt ) + '</small>' +
                                                                '</div>' + 
                                                        '</div>' + 
                                                    '</div>' + 
                                                     '</a>' + 
                                                '</div>' + 
                                            '</div>' +	
                                        '</div>' +
                                '</div>' +                     		           
                    '</div>';
                  
                  
                } //for loops json
                document.querySelector(".js-grid-news").innerHTML = gridnews; 
                 progressively.lazyLoading();
            } //if(rejson.data)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

