require("bootstrap/dist/css/bootstrap.min.css"); //require component
require("jquery");
require("bootstrap");
require("./gridNews.js");

var moment = require("moment"),
    axios = require("axios"), //global variables
    _ = require("lodash"),
    config = require("./config.js"),
    importFunctions = require("./functions.js"),
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
newsOpt.addEventListener("change", IsnotValid);
catOpt.addEventListener("change", IsnotValid);


function IsnotValid(error){
     if (newsOpt.options[newsOpt.selectedIndex].index === 0) {
            importFunctions.showError("source");
            importFunctions.showSpinner();
            importFunctions.disabledBtn("true");
        } else if (catOpt.options[catOpt.selectedIndex].index === 0) {
            importFunctions.showError("category");
            importFunctions.showSpinner();
            importFunctions.disabledBtn("true");
        searchBtn.disabled = "disabled";
        } else {
            eleIsVisible = true;
            importFunctions.disabledBtn();
            $("#displayAlert").alert("close");
        } 
}


function sourceSelected() {
    //news option
    var source =
        newsOpt !== null ? newsOpt.options[newsOpt.selectedIndex].value : "";
    var cat = catOpt !== null ? catOpt.options[catOpt.selectedIndex].value : "";
    if (eleIsVisible) {
        importFunctions.showSpinner("show");
        newsRequest(source, cat);
    } else {
        importFunctions.showError("both source and category");
        importFunctions.disabledBtn("true");
    }
} //end of sourceSelected


function newsRequest(source, cat) {
    //request api

    const request = axios.get( apiUrl + "top-headlines?country=" + source + "&category=" + cat + "&apiKey=" + apiKey,
        {
            onDownloadProgress: function (event) { }
        }
    );
    request
        .then(function (response) {
            var reStringify = JSON.stringify(response);
            var rejson = JSON.parse(reStringify);

            if (rejson.data.status == "ok") {
                if (rejson.data) {

                   
                    //if(rejson.data)
                    var newsHtml = "";
                    newsHtml +=
                        '<h5 class="card-header">' +
                        newsOpt.options[newsOpt.selectedIndex].text +
                        " " +
                        "Latest news" +
                        "</h5>";
                    newsHtml += '<ul class="newsList container">';
                    for (var i = 0; i < 8; i++) {
                        if (
                            rejson.data.articles[i].author != null ||
                            rejson.data.articles[i].urlToImage != null ||
                            rejson.data.articles[i].description != null
                        ) {

                            
                            newsHtml +=
                                '<li class="newsItem">' +
                                '<div class="newsWrapper">' +
                                '<figure class="newsContent">' +
                                '<div class="NewsImgWrap" style=" background: url(' +
                                rejson.data.articles[i].urlToImage +
                                ');">' +
                                '<img class="newsImg" src="' +
                                rejson.data.articles[i].urlToImage +
                                '">' +
                                "</div>" +
                                "<figcaption>" +
                                "<h2>" +
                                '<a href="' +
                                rejson.data.articles[i].url +
                                '" target="_blank">' +
                                rejson.data.articles[i].title +
                                "</a>" +
                                "</h2>" +
                                '<p class="newsDesc">' +
                                _.truncate(
                                    rejson.data.articles[i].description,
                                    {
                                        length: 150,
                                        omission: " [...]"
                                    }
                                ) +
                                "</p>" +
                                "</figcaption>" +
                                "</figure>" +
                                '<div class="card-body">' +
                                '<p class="card-link">' +
                                rejson.data.articles[i].source.name +
                                "</p>" +
                                '<p class="card-link publishedTime">' +
                                importFunctions.converTime(
                                    rejson.data.articles[i].publishedAt
                                ) +  
                                "</p>" +
                                "</div>" +
                                "</div>" +
                                "</li>";
                        } // if (rejson.data.articles.length > 0
                    } //for loops json
                    newsHtml += "</ul>";
                    document.querySelector(
                        ".displayRequestData"
                    ).innerHTML = newsHtml;
                    importFunctions.showSpinner();
                } //if(rejson.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
} //newsRequest
