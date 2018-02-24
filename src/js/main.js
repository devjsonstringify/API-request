

require ('bootstrap/dist/css/bootstrap.min.css');
require ('jquery');
require ('bootstrap');

var axios = require("axios"), //global variables
_ = require("lodash"), 
config = require("./config.js"),
apiUrl = config.host,  
apiKey = config.api,
searchBtn = document.querySelector("#searchBtn"),
displayAlert = document.querySelector("#displayAlert"),
displayRequest = document.querySelector(".displayRequestData"),
newsOpt = document.querySelector("#news-selection"),
pageNavigation = document.querySelector(".pageNavigation"),
spinner = document.querySelector(".spinner"),
eleIsVisible = false,
catOpt = document.querySelector("#cat-selection");

searchBtn.addEventListener("click", sourceSelected); //on click
newsOpt.addEventListener("change",  IsnotValid);
catOpt.addEventListener("change", IsnotValid);

function showError(error) { //show error if empty options
    var showErr = '';
    showErr += '<div id="displayAlert" class="alert alert-danger alert-dismissible fade show" role="alert">' +
        '<strong>Oh my gosh!</strong> ' + ' ' + 'Empty news!' +  ' '  + error + 
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>';
    showErr += '</div>';
    document.querySelector('.errorDisplayer').innerHTML = showErr;   
}

function disabledBtn(visibilty) { // disable and enable btn
    var visibilty = (visibilty === 'true') ? searchBtn.setAttribute('disabled', 'disabled') : searchBtn.removeAttribute('disabled'); 
}

function IsnotValid(error){ //check if user select default value

    if ( newsOpt.options[newsOpt.selectedIndex].index === 0 ){ 
        showError('source');   
        showSpinner();
        disabledBtn('true');       
    }else if ( catOpt.options[catOpt.selectedIndex].index === 0 ){
        showError('category');  
        showSpinner();  
        disabledBtn('true');
        searchBtn.disabled = "disabled";       
    } else{
        eleIsVisible = true;
        disabledBtn();
        $('#displayAlert').alert('close');
    }
}

function sourceSelected() { //news option
    var source = newsOpt !== null ? newsOpt.options[newsOpt.selectedIndex].value : '';
    var cat = catOpt !== null ? catOpt.options[catOpt.selectedIndex].value : '';
    if (eleIsVisible){        
        showSpinner('show');
        newsRequest(source, cat);                
    }else{
        showError('source and category');
        disabledBtn('true');
    }    
} //end of sourceSelected

function showSpinner(visibilty){   //loader spinner      
    var visibilty = (visibilty === 'show') ? spinner.style.display = 'block' : spinner.style.display = 'none' ;
}

function newsRequest(source, cat) {  //request api

  const request = axios.get(apiUrl + 'top-headlines?country=' + source + '&category=' + cat + '&apiKey=' + apiKey, {
        onDownloadProgress: function (event) {}
    }); 
    request.then(function (response) { 
           
            var reStringify = JSON.stringify(response);
            var rejson = JSON.parse(reStringify);
        console.log(rejson);

            if (rejson.data.status == 'ok') {

                if (rejson.data) {  //if(rejson.data)
                                           //start
                         var newsHtml = '';
                         newsHtml += '<h5 class="card-header">' + newsOpt.options[newsOpt.selectedIndex].text + ' ' + 'Latest news' + '</h5>';
                         newsHtml += '<ul class="newsList container">';
                         for (var i = 0; i < 8; i++) {
                             if (rejson.data.articles[i].author != null || rejson.data.articles[i].urlToImage != null || rejson.data.articles[i].description != null) {

                            newsHtml += '<li class="newsItem">' + 
                            '<div class="newsWrapper">' +
                            '<figure class="newsContent">' +
                                '<div class="NewsImgWrap" style=" background: url(' + rejson.data.articles[i].urlToImage +');">' + 
                                '<img class="newsImg" src="' + rejson.data.articles[i].urlToImage + '">' +
                                '</div>' +
                                '<figcaption>' + 
                                '<h2>' + '<a href="' + rejson.data.articles[i].url + '" target="_blank">' + rejson.data.articles[i].title + '</a>' + '</h2>' +
                                '<p class="newsDesc">' +
                                     _.truncate(rejson.data.articles[i].description, {
                                    'length': 150,
                                    'omission': ' [...]'
                                    }) + 
                                '</p>' + 
                                '</figcaption>' +
                            '</figure>' +
                                '<div class="card-body">' +
                                '<p class="card-link">' + rejson.data.articles[i].source.name + '</p>' +
                                '<p class="card-link">' + rejson.data.articles[i].publishedAt + '</p>' +
                                '</div>' +
                            '</div>' +
                            '</li>';   
                             } // if (rejson.data.articles.length > 0                                            
                         } //for loops json
                         newsHtml += '</ul>'; 
                         document.querySelector('.displayRequestData').innerHTML = newsHtml;
                         showSpinner();    
                } //if(rejson.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}//newsRequest







































// function newsRequest(source, cat) {
//     // Make a request for a user with a given ID
//     //axios.get('https://newsapi.org/v2/top-headlines?sources=' + userSelection + '&language=' + userCatSelection + '&
//     axios.get(apiUrl + 'top-headlines?sources=' + source + '&language=' + cat + '&apiKey=' + apiKey)
//         .then(function (response) {
//             var reStringify = JSON.stringify(response);
//             var rejson = JSON.parse(reStringify);

//             if (rejson.data.status == 'ok'){
//                console.log(rejson.data.articles[1].source.name); 
//                 //console.log(requestBtn);
//             }          
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }