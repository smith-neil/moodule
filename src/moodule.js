// eat mor chikin
(function (factory) {

  this.moodule = factory();

})(function () {

  var instances         = {};
  var moduleDefinitions = {};

  return {
    define  : define,
    require : require,
    clear   : clear
  }

  function define(id, dependencies, definition) {
    if (definition == undefined) {
      definition   = dependencies;
      dependencies = [];
    }

    if (!isString(id))
      throw new Error("moodule says the module '" + id + "' is not a string.");
    if (has(moduleDefinitions, id) || has(instances, id))
      throw new Error("moodule says the module '" + id + "' is already defined.");
    if (!isArray(dependencies))
      throw new Error("moodle says the dependencies must be an array.");
    if (!isObject(definition) && !isFunction(definition))
      throw new Error("moodle says the module definition must be an object or function.");

    moduleDefinitions[id] = {
      dependencies: dependencies,
      fn: isFunction(definition) ? definition : function () { return definition; }
    };
  }

  function require(id) {
    try {
      return resolve(id);
    } catch (e) {
      if (e instanceof RangeError)
        throw new Error("moodule says circular dependencies are bad.");
      else
        throw e;
    }
  }

  function resolve(id) {
    if (has(instances, id)) {
      return instances[id];
    }

    var definition = moduleDefinitions[id];
    
    if (!definition)
      throw new Error("moodule says the module '" + id + "' is not defined.");

    var dependencies = [];
    for (var i = 0; i < definition.dependencies.length; i++) {
      var dep = resolve(definition.dependencies[i]);
      dependencies.push(dep);
    }

    var obj = definition.fn.apply(undefined, dependencies);

    instances[id] = obj;
    delete moduleDefinitions[id];

    return obj;
  }

  function clear() {
    instances         = {};
    moduleDefinitions = {};
  }

  function isFunction (arg) {
    return checkType(arg, 'Function');
  }

  function isString (arg) {
    return checkType(arg, 'String');
  }

  function isArray (arg) {
    return checkType(arg, 'Array');
  }

  function isObject (arg) {
    return checkType(arg, 'Object');
  }

  function checkType(arg, type) {
    return Object.prototype.toString.call(arg) === '[object ' + type + ']';
  }

  function has(object, key) {
    return object ? Object.prototype.hasOwnProperty.call(object, key) : false;
  }

});