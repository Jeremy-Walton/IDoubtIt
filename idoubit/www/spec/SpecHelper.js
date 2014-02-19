Object.prototype.toJSON = function(){
  this.className = this.constructor.name;
  return this;
}

Object.prototype.fromJSON = function(json){
  var object = JSON.parse(json);
  object.__proto__ = window[object.className].prototype;
  return object;
}