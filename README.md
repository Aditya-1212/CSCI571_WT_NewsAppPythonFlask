# CSCI571_WT_NewsAppPythonFlask
News App website with Flask (Python) backend
  
  ## Description
  Website that allows you to search for news information using the **Google News API** and the results will be displayed in card format.
 
 **Link to Google News API**<br/>
 https://newsapi.org/docs<br/>
 
 To access the Google News API using Python, you should use the Python Client Library
documented here:<br/>
https://newsapi.org/docs/client-libraries/python

The recommended tutorial for Flask and more importantly, routing, can be found at the following link:<br/>
https://flask.palletsprojects.com/en/1.1.x/

  **Search Funcationality**<br/>
  News article can be fetched using Keyword, Date range, Category and Source.
  
  **Word Cloud**<br/>
  Find the top 30 frequent words from the title of the news article sorted from most frequent to least frequent words.<br/>
  To display the list of frequent words, the **d3-cloud library** is to be used. The following links should suffice in helping you display the word cloud:<br/>
  https://github.com/jasondavies/d3-cloud/blob/master/examples/browserify.js<br/>
  https://www.d3-graph-gallery.com/graph/wordcloud_size.html

## Details
1. News articles from Google News API are fetched using Flask backend.
2. Next, XMLHTTPREQUEST is used to asynchronous calls to the Flask backend.
3. JSON object is received as response from the Flask Backend.
4. The response data is processed using Javascript and displayed using HTML & CSS.
