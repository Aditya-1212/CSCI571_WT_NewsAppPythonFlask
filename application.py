from flask import Flask, jsonify, request
from newsapi import NewsApiClient
import json
import re
from collections import Counter

application = Flask(__name__)

newsapi = NewsApiClient(api_key='7f1424bb002640cea93540b44d00533e')

@application.route('/')
def homepage():
    return application.send_static_file("index.html")


# get top 5 headlines
@application.route('/top_headlines')
def top_headlines():
    top_headlines = newsapi.get_top_headlines(language='en',page_size=30)
    print(type(top_headlines))
    top_news_headlines = []
    top_news = top_headlines['articles']
    count = 5
    print(len(top_news))
    for i in range(len(top_news)):
        top = top_news[i]
        source = top['source']
        if(count > 0):
            if(source != None):
                if(source['id'] != None and source['id'] != '' and source['name'] != None and source['name'] != '' ):
                    if(top['author'] != '' and top['author'] != None and top['title'] != '' and top['title'] != None
                    and top['description'] != '' and top['description'] != None and top['url'] != '' and top['url'] != None
                    and top['urlToImage'] != '' and top['urlToImage'] != None and top['publishedAt'] != '' and top['publishedAt'] != None):
                        top_news_headlines.append(top)
                        count-=1

    print(top_news_headlines)
    # print(jsonify(top_headlines))
    return json.dumps(top_news_headlines)



@application.route('/cnn', methods=['GET', 'POST'])
def get_top_cnn_headlines():
    top_cnn_headlines = newsapi.get_top_headlines(sources='cnn',language='en',page_size=30)
    top_cnn_news = top_cnn_headlines['articles']
    top_cnn_head = []
    count_cnn = 4
    for i in range(len(top_cnn_news)):
        top_cnn = top_cnn_news[i]
        source_cnn = top_cnn['source']
        if(count_cnn > 0):
            if(source_cnn != None):
                if(source_cnn['id'] != None and source_cnn['id'] != '' and source_cnn['name'] != None and source_cnn['name'] != '' ):
                    if(top_cnn['author'] != '' and top_cnn['author'] != None and top_cnn['title'] != '' and top_cnn['title'] != None
                    and top_cnn['description'] != '' and top_cnn['description'] != None and top_cnn['url'] != '' and top_cnn['url'] != None
                    and top_cnn['urlToImage'] != '' and top_cnn['urlToImage'] != None and top_cnn['publishedAt'] != '' and top_cnn['publishedAt'] != None
                    and top_cnn['content'] != '' and top_cnn['content'] != None):
                        top_cnn_head.append(top_cnn)
                        count_cnn-=1
    return json.dumps(top_cnn_head)


@application.route('/fox', methods=['GET', 'POST'])
def get_top_fox_headlines():
    top_fox_headlines = newsapi.get_top_headlines(sources='fox-news',language='en',page_size=30)
    top_fox_news = top_fox_headlines['articles']
    top_fox_head = []
    count_fox = 4
    for i in range(len(top_fox_news)):
        top_fox = top_fox_news[i]
        source_fox = top_fox['source']
        if(count_fox > 0):
            if(source_fox != None):
                if(source_fox['id'] != None and source_fox['id'] != '' and source_fox['name'] != None and source_fox['name'] != '' ):
                    if(top_fox['author'] != '' and top_fox['author'] != None and top_fox['title'] != '' and top_fox['title'] != None
                    and top_fox['description'] != '' and top_fox['description'] != None and top_fox['url'] != '' and top_fox['url'] != None
                    and top_fox['urlToImage'] != '' and top_fox['urlToImage'] != None and top_fox['publishedAt'] != '' and top_fox['publishedAt'] != None
                    and top_fox['content'] != '' and top_fox['content'] != None):
                        top_fox_head.append(top_fox)
                        count_fox-=1
    return json.dumps(top_fox_head)



@application.route('/wordcloud_words')
def get_wordcloud_words():
    wordcloud_words = newsapi.get_top_headlines(page_size=30)
    articlesArr = []
    articles = wordcloud_words["articles"]
    for article in articles:
        title = article["title"]
        new_title = re.sub(r'[^\w\s]','',title)
        articlesArr += new_title.split()

    stopwords_file = open("stopwords_en.txt","r")
    stopwords_en = stopwords_file.readlines()
    print(stopwords_en)
    stop = []
    for word in stopwords_en:
        stop.append(word.strip())

    new = []
    for w in articlesArr:
        if(w.lower() not in stop) and (w not in stop):
            new.append(w);

    ctr = Counter(new)

    common = ctr.most_common(30)
    return json.dumps(common)

@application.route('/sources', methods=['GET', 'POST'])
def getSources():
    category = request.args.get('category')
    if(category=="all"):
        news = newsapi.get_sources(language='en',country='us')
    else:
        news = newsapi.get_sources(category=category,language='en',country='us')
    news_sources = news['sources']
    allSources = []
    for i in range(len(news_sources)):
        source = news_sources[i]
        if(source != None and source['id']!=None and source['name']!=None):
            allSources.append(source)
    return json.dumps(allSources);


@application.route('/search',methods=['GET', 'POST'])
def searchResults():
    keyword = request.args.get('keyword')
    startDate = request.args.get('startDate',None)
    endDate = request.args.get('endDate',None)
    source = request.args.get('source',None)
    results = []
    try:
        if(source == "all"):
            search_results = newsapi.get_everything(q=keyword, from_param=startDate, to=endDate, page_size=30, sort_by='publishedAt', language='en')
        else:
            search_results = newsapi.get_everything(q=keyword, sources=source, from_param=startDate, to=endDate, page_size=30, sort_by='publishedAt', language='en')
        # search_results['status'] = "Success"
        search_results = search_results['articles']

        for i in range(0,len(search_results)):
            search_result = search_results[i]
            source = search_result['source']
            if(source != None):
                if(source['name'] != None and source['name'] != '' ):
                        if(search_result['author'] != '' and search_result['author'] != None and search_result['title'] != '' and search_result['title'] != None
                        and search_result['description'] != '' and search_result['description'] != None and search_result['url'] != '' and search_result['url'] != None
                        and search_result['urlToImage'] != '' and search_result['urlToImage'] != None and search_result['publishedAt'] != '' and search_result['publishedAt'] != None):
                            results.append(search_result)
            # results.append(search_result)

    except Exception as e:
        error = {}
        error["status"] = e.exception["status"]
        error["code"] = e.exception["code"]
        error["message"] = e.exception["message"]
        return json.dumps(error)

    return json.dumps(results)

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
