'use strict';

function getSentimentScore(success) {
  var url = "http://access.alchemyapi.com/calls/url/URLGetTextSentiment?apikey=bbe45e509c665fbb2bd4660bdb587ca96479f2c0&outputMode=json&url="+escape(window.location.href)
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);
      success(resp.docSentiment.score);
    }
  };
  xhr.send();
}

function updateColor(val) {
  var data = String.fromCharCode(val);
  var url = "http://127.0.0.1:3000/write?data="+val;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);
    }
  };
  xhr.send();
}

console.log("NYTIMES. STARTING ANALYSIS");
getSentimentScore(function(score) {
  console.log("Sentiment Score: " + score);
  updateColor(score>0? 250: 0);
});