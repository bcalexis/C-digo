var Promise = require('promise');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var cfenv = require('cfenv');
var _ = require('lodash');

var watsonAPI = (function(){
  var tone_analyzer = new ToneAnalyzerV3({
    'username': '',
    'password': '',
    'version_date': '2016-05-19'
  });
  var getSocialTone = function(text){
    return new Promise(function(fulfill,reject){
      tone_analyzer.tone({ 'text': text },
        function(err, tone) {
          if (err){
            console.log(err);
            reject(err);
          }else{
            //console.log(JSON.stringify(tone, null, 2));
            var cats = tone.document_tone.tone_categories;
            var tones = _.find(cats,{'category_id':'emotion_tone'});
            fulfill(_.maxBy(tones.tones,'score'));
          }
      });
    });
  };
  return {
    getSocialTone:getSocialTone
  };
})();
module.exports=watsonAPI;
