Object.prototype.toJSON = function(){
    this.className = this.constructor.name;
    return this;
}

Object.fromJSON = function(input){
	var object = JSON.parse(input);
	object.__proto__ = window[object.className].prototype;
	Object.objectConverter(object);
	return object;
}

Object.toObject = function(genericObject){
	genericObject.__proto__ = window[genericObject.className].prototype;

	Object.objectConverter(genericObject);

	return genericObject;
}

Object.objectConverter = function(genericObject) {
	for (thing in genericObject) {
		obj = genericObject[thing];
		if(obj.constructor.name === "Array") {
			Object.objectConverter(obj);
		} else {
			if (obj.constructor.name === "Object" && obj.className !== "undefined") {
				obj.__proto__ = window[obj.className].prototype;
				Object.objectConverter(obj);
			}
		}
	}
	return;
}