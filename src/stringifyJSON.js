(function(){

  window.stringifyJSON = function(element){
    switch (getType(element)) {
      case "number":
      case "boolean":
        return "" + element;
      case "string":
        return escapeString(element);
      case "object":
        var objectContent = _.map(removeUndef(element), function(value, key){
          return stringifyJSON(key) + ":" + stringifyJSON(value);
        }).join(",");
        return "{" + objectContent + "}";
      case "array":
        var arrayContent = _.map(element, function(value){return stringifyJSON(value);}).join(",");
        return "[" + arrayContent + "]";
      case "undefined":
        return "";
      case "null":
        return "null";
    }
  };

  var escapeString = function(str){
    var newStr = _.map(str, function(value){
      if (value === '"' || value === '\\'){
        value = "\\" + value;
      }
      return value;
    }).join("");
    return '\"' + newStr + '\"';
  };

  var getType = function(element){
    var result = typeof element;
    if (Array.isArray(element)){
      result = "array";
    }
    if (element === null){
      result = "null";
    }
    return result;
  };

  var removeUndef = function(element) {
    return _.reduce(element, function(memo, value, key){
      if (value !== undefined){
        memo[key] = value;
        return memo;
      }
    },{});
  };

}())


