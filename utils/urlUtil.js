/**Internal Url */


function queryStrings(obj) {
  var str = ''
  for(var key in obj) {
    var q = key + '=' + obj[key]
    if(key == 'token') {
      q = key + '=' + encodeURIComponent(obj[key])
    }

    if(str == '')
      str = '?' + q
    else
      str = str + '&' + q   
  }  
  return str
}


function getUrl(name, orgId, params) {
  switch(name) {
    case "file":
      return fileUrl('/file/resource/' + orgId, params)
    case "postvoice":
      return jsonUrl('/json/voice/' + orgId, params)
    case "wxainfo":
      return jsonUrl('/json/wxainfo', params)
    case "wxalogin":
      return jsonUrl('/json/wxalogin', params)
    default:
      return "undefined url " + name;  
  }
}

function waUrl(name, options) {
  switch(name) {
    case "voice.index":
      return '/pages/voice/index' + queryStrings(options)
    case "index.index":
      return '/pages/index/index' + queryStrings(options)

    default:
      return "undefined url " + name;  
  }
}



module.exports.getUrl = getUrl
module.exports.waUrl = waUrl
