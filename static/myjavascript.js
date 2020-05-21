function loadMainPage(){
  // loadWordCould();
  var dummy;

  // request for top 5 headlines
  var xhhtp1 = new XMLHttpRequest();
    xhhtp1.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        jsonObj1= JSON.parse(xhhtp1.responseText);
        console.log(jsonObj1);
        var slides = document.getElementsByClassName("Slides");
        var slider_images = document.getElementsByClassName("image-slider");
        var car_overlay = document.getElementsByClassName("car-overlay");
        i = 0;
        for(var j = 0; j < slides.length; j++){
          slide = slides[i];
          img = slider_images[i];
          car = car_overlay[i];
          slide.getElementsByTagName("a")[0].setAttribute("href",jsonObj1[i]['url']);
          img.setAttribute("src",jsonObj1[i]['urlToImage']);
          car.getElementsByTagName("h3")[0].innerHTML = jsonObj1[i]['title'];
          car.getElementsByTagName("p")[0].innerHTML = jsonObj1[i]['description'];
          i++;
        }
      }
    };
    xhhtp1.open("GET", "/top_headlines", true);
    xhhtp1.send();

    // // request cnn headlines
    var xhhtp2 = new XMLHttpRequest();
      xhhtp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          jsonObj2= JSON.parse(xhhtp2.responseText);
          console.log(jsonObj2);
          var cnn_id = document.getElementById("cnn");
          var cnn_cards = cnn_id.getElementsByClassName("card-link");
          var cnn_links = cnn_id.getElementsByClassName("anchor-link");
          for(var j = 0; j < cnn_cards.length; j++){
            cnn_links[j].setAttribute("href",jsonObj2[j]['url']);
            cnn_links[j].setAttribute("target","_blank");
            cnn_id.getElementsByClassName("cnn-image")[j].setAttribute("src",jsonObj2[j]['urlToImage']);
            cnn_id.getElementsByClassName("cnn-header")[j].innerHTML = "<b>" + jsonObj2[j]['title'] +"</b>";
            cnn_id.getElementsByClassName("cnn-desp")[j].innerHTML = jsonObj2[j]['description'];
          }
        }
      };
      xhhtp2.open("GET", "/cnn", true);
      xhhtp2.send();

      // request fox top_headlines
      var xhhtp3 = new XMLHttpRequest();
        xhhtp3.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            jsonObj3= JSON.parse(xhhtp3.responseText);
            console.log(jsonObj3);
            var fox_id = document.getElementById("fox");
            var cnn_cards = fox_id.getElementsByClassName("card-link");
            var cnn_links = fox_id.getElementsByClassName("anchor-link");
            for(var j = 0; j < cnn_cards.length; j++){
              cnn_links[j].setAttribute("href",jsonObj3[j]['url']);
              cnn_links[j].setAttribute("target","_blank");
              fox_id.getElementsByClassName("cnn-image")[j].setAttribute("src",jsonObj3[j]['urlToImage']);
              fox_id.getElementsByClassName("cnn-header")[j].innerHTML = "<b>" + jsonObj3[j]['title'] +"</b>";
              fox_id.getElementsByClassName("cnn-desp")[j].innerHTML = jsonObj3[j]['description'];
            }
          }
        };
        xhhtp3.open("GET", "/fox", true);
        xhhtp3.send();

        var xhhtp6 = new XMLHttpRequest();
          xhhtp6.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              jsonObj6= JSON.parse(xhhtp6.responseText);
              console.log(jsonObj6);
              var source = document.getElementById("source");
              var min = Math.min(jsonObj6.length,10);
              source.innerHTML = "<option value='all'>all</option>";
              for(var i = 0; i < min ; i++){
                var temp = "<option value='" + jsonObj6[i]['id'] + "'>" + jsonObj6[i]['name'] + "</option>";
                source.innerHTML += temp;
              }
            }
          };
          var url = "/sources?category=all";
          xhhtp6.open("GET", url, true);
          xhhtp6.send();



          var today = new Date();
          var todayString = today.getFullYear().toString() + "-" + (today.getMonth()+1).toString().padStart(2,0) + "-" + today.getDate().toString().padStart(2,0);
          document.getElementById("to-date").value = todayString;

          var from = new Date();
          from.setDate(from.getDate() - 7);
          var fromDate = from.getFullYear().toString() + "-" + (from.getMonth()+1).toString().padStart(2,0) + "-" + from.getDate().toString().padStart(2,0);
          document.getElementById("from-date").value = fromDate;

}


function getSources(){
  var val = document.getElementById("category").value;
  var xhhtp5 = new XMLHttpRequest();
    xhhtp5.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        jsonObj5= JSON.parse(xhhtp5.responseText);
        console.log(jsonObj5);
        var source = document.getElementById("source");
        var min = Math.min(jsonObj5.length,10);
        source.innerHTML = "<option value='all'>all</option>";
        for(var i = 0; i < min ; i++){
          var temp = "<option value='" + jsonObj5[i]['id'] + "'>" + jsonObj5[i]['name'] + "</option>";
          source.innerHTML += temp;
        }
      }
    };
    var url = "/sources?category="+val;
    xhhtp5.open("GET", url, true);
    xhhtp5.send();
}
function dateConvert(date){
  var year = date.substring(0, 4);
	var month = date.substring(5, 7);
	var day = date.substring(8, 10);
	return month + '/' + day + '/' + year;
}

function resetSources(){
  var xhhtp6 = new XMLHttpRequest();
    xhhtp6.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        jsonObj6= JSON.parse(xhhtp6.responseText);
        console.log(jsonObj6);
        var source = document.getElementById("source");
        var min = Math.min(jsonObj6.length,10);
        source.innerHTML = "<option value='all'>all</option>";
        for(var i = 0; i < min ; i++){
          var temp = "<option value='" + jsonObj6[i]['id'] + "'>" + jsonObj6[i]['name'] + "</option>";
          source.innerHTML += temp;
        }
      }
    };
    var url = "/sources?category=all";
    xhhtp6.open("GET", url, true);
    xhhtp6.send();
}

function viewSearchResults(what){
  if(what.Keyword.value.length == 0){
    return;
  }
  var from = new Date();
  var to = new Date();
  from = what.From.value;
  to = what.To.value;
  var compare = false;
  if(from <= to){
    var compare =true;
  }
  else{
    compare = false;
    alert("Incorrect Date");
  }
  console.log("here");
  if(compare == true){
      var xhhtp7 = new XMLHttpRequest();
      xhhtp7.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        jsonObj7= JSON.parse(xhhtp7.responseText);
        console.log(jsonObj7);
        if(jsonObj7['status'] == "error"){
          window.alert(jsonObj7['message']);
          return;

        }
        console.log("Searched Results");

        var results = document.getElementById('results');
        results.innerHTML = "";
        // var min_5 = Math.min(5,jsonObj7.length);
        if(jsonObj7.length == 0){
          results.innerHTML = "No Results";
          return;
        }
        for(var i = 0; i < 15; i++){
          var id = "Article" + i;
          console.log(id);
          var news_article = document.createElement('div');
          news_article.setAttribute("class","news-article");
          news_article.setAttribute("id",id);
          news_article.setAttribute("onclick","expandArticle('" +id + "'); event.stopPropagation();");
          var image = document.createElement('div');
          image.setAttribute("class","image");
          // image.setAttribute("onclick","expandArticle(this.parentNode)");
            var img = document.createElement('img');
            img.setAttribute("src",jsonObj7[i]['urlToImage']);
            img.setAttribute("onerror","this.src='/static/Broken-images.png';");
            image.appendChild(img);
          news_article.appendChild(image);
          //minimized div
          var min_desp = document.createElement('div');
          min_desp.setAttribute("class","results-desp");
          // min_desp.setAttribute("onclick","expandArticle(this.parentNode)");
            var min_title = document.createElement('p');
            min_title.setAttribute("class","article-title");
            min_title.innerHTML = "<strong>" + jsonObj7[i]['title'] +"</strong>";
            min_desp.appendChild(min_title);
            var min_description = document.createElement('p');
            min_description.setAttribute("class","article-desp")
            min_description.innerHTML = truncateString(jsonObj7[i]['description']) + "...";
            min_desp.appendChild(min_description);
          news_article.appendChild(min_desp);
          // expanded div
          var desp = document.createElement('div');
          desp.style.display = "none";
          desp.setAttribute("class","results-desp");
            var title = document.createElement('p');
            title.setAttribute("class","article-title");
            title.innerHTML = "<strong>" + jsonObj7[i]['title'] +"</strong>";
            desp.appendChild(title);
            var author = document.createElement('p');
            author.setAttribute("class","author");
            author.innerHTML = "<strong>Author: </strong>" + jsonObj7[i]['author'];
            author.style.display = "block";
            desp.appendChild(author);
            var source = document.createElement('p');
            source.setAttribute("class","article-source");
            source.innerHTML = "<strong>Source: </strong>" + jsonObj7[i]['source']['name'];
            source.style.display = "block";
            desp.append(source);
            var date = document.createElement('p');
            date.setAttribute("class","article-date");
            date.innerHTML ="<strong>Date: </strong>" + dateConvert(jsonObj7[i]['publishedAt']);
            date.style.display = "block";
            desp.appendChild(date);
            var description = document.createElement('p');
            description.setAttribute("class","article-desp")
            description.innerHTML = jsonObj7[i]['description'];
            desp.appendChild(description);
            var url = document.createElement('a');
            url.setAttribute("class","article-url");
            url.setAttribute("href",jsonObj7[i]['url']);
            url.setAttribute("target","_blank");
            url.innerHTML = "See Original Post";
            url.style.display = "block";
            desp.appendChild(url);
          news_article.appendChild(desp);

          var close = document.createElement('div');
          close.setAttribute("class","cross");
            var cross = document.createElement('span');
            cross.setAttribute("class","close");
            cross.innerHTML = "&times;";
            cross.setAttribute("onclick","minimizeArticle('" +id + "'); event.stopPropagation();");
          close.style.display = "none";
          close.appendChild(cross);
          news_article.appendChild(close);
          results.appendChild(news_article);

          if(i > 4){
            news_article.style.display = "none";
          }

        }
        //end of for
        var showMoreButton = document.createElement('input');
        showMoreButton.setAttribute("id","showMoreButton");
        showMoreButton.setAttribute("type","button");
        showMoreButton.setAttribute("class","showMore");
        showMoreButton.setAttribute("value","Show More");
        showMoreButton.setAttribute("onclick","showMoreArticles()");
        results.appendChild(showMoreButton);
        showMoreButton.style.display = "none";
        if(jsonObj7.length > 5){
          showMoreButton.style.display = "";
          showMoreButton.setAttribute("text-align","center");
        }
        var showLessButton = document.createElement('input');
        showLessButton.setAttribute("id","showLessButton");
        showLessButton.setAttribute("type","button");
        showLessButton.setAttribute("class","showMore");
        showLessButton.setAttribute("value","Show Less");
        showLessButton.setAttribute("onclick","showLessArticles()");
        showLessButton.style.display = "none";
        results.appendChild(showLessButton);
      }
    };
    var url = "/search?keyword="+what.Keyword.value+"&startDate="+what.From.value+"&endDate="+what.To.value+"&source="+what.source.value;
    xhhtp7.open("GET", url, true);
    xhhtp7.send();
  }
}

function truncateString(str){
  var splitedString = str.split(" ");
  var truncatedString = "";
  var characterCount = 0;
  for(var i = 0; i < splitedString.length; i++){
    var currentString = splitedString[i];
    if(characterCount + currentString.length <= 90){
      characterCount = characterCount + currentString.length+1;
      truncatedString = truncatedString + currentString + " ";
    }
    else{
      break;
    }
  }
  return truncatedString.substring(0,truncatedString.length - 1);
}

function showLessArticles(){
  var results = document.getElementById("results");
  var articles = document.getElementsByClassName("news-article");
  for(var i = 5; i <  15; i++){
    articles[i].style.display = "none";
  }
  document.getElementById("showMoreButton").style.display = "";
  document.getElementById("showLessButton").style.display = "none";
}

function showMoreArticles(){
  document.getElementById("showMoreButton").style.display = "none";
  var results = document.getElementById("results");
  var articles = document.getElementsByClassName("news-article");
  for(var i = 5; i <  15; i++){
    articles[i].style.display = "flex";
  }
  document.getElementById("showLessButton").style.display = "";
}

function expandArticle(id){
  console.log("Inside expand");
  console.log(id);
  var element = document.getElementById(id);
  var divs = element.getElementsByTagName('div');
  divs[1].style.display = "none";
  divs[2].style.display = "block";
  divs[3].style.display = "block";
  element.removeAttribute("onclick");
}
function minimizeArticle(id){
  var element = document.getElementById(id);
  console.log("Inside minimized");
  console.log(id);
  var divs = element.getElementsByTagName('div');
  divs[1].style.display = "block";
  divs[2].style.display = "none";
  divs[3].style.display = "none";
  element.setAttribute("onclick","expandArticle('" +id + "');");
}

function clearResults() {
  var keyword = document.getElementById("keyword");
  keyword.value = "";
  document.getElementById("category").value = "all";
  resetSources();
  var results = document.getElementById('results');
  results.innerHTML = "";
  var today = new Date();
  var todayString = today.getFullYear().toString() + "-" + (today.getMonth()+1).toString().padStart(2,0) + "-" + today.getDate().toString().padStart(2,0);
  document.getElementById("to-date").value = todayString;
  var from = new Date();
  from.setDate(from.getDate() - 7);
  var fromDate = from.getFullYear().toString() + "-" + (from.getMonth()+1).toString().padStart(2,0) + "-" + from.getDate().toString().padStart(2,0);
  document.getElementById("from-date").value = fromDate;
}
