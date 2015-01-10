describe('moodule', function () {

  beforeEach(function () {
    moodule.clear();
  });

  describe('Describe: define', function () {

    it('should throw exception if id isnt a string', function () {
      expect(function () { moodule.define(undefined, undefined, undefined) }).toThrow();
      expect(function () { moodule.define(1, undefined, undefined) }).toThrow();
      expect(function () { moodule.define({}, undefined, undefined) }).toThrow();
      expect(function () { moodule.define([], undefined, undefined) }).toThrow();
      expect(function () { moodule.define('id', undefined, undefined) }).not.toThrow(new Error("moodule says the module 'id' is not a string."));
    });

    it('should throw exception when adding a non-unique id', function () {
      moodule.define('id', {});
      expect(function () { moodule.define('id', {}) }).toThrow();
    });

    it('should throw exception if dependencies are defined and not an array', function () {
      expect(function () { moodule.define('1', undefined, {}) }).toThrow();
      expect(function () { moodule.define('2', 1, {}) }).toThrow();
      expect(function () { moodule.define('3', {}, {}) }).toThrow();
      expect(function () { moodule.define('4', 'dependencies', {}) }).toThrow();
      expect(function () { moodule.define('5', [], {}) }).not.toThrow();
    });

    it('should throw exception if definition is not an object or array', function () {
      expect(function () { moodule.define('1', [], undefined) }).toThrow();
      expect(function () { moodule.define('2', [], 1) }).toThrow();
      expect(function () { moodule.define('3', [], 'definition') }).toThrow();
      expect(function () { moodule.define('4', [], []) }).toThrow();
      expect(function () { moodule.define('5', [], {}) }).not.toThrow();
      expect(function () { moodule.define('6', [], function () {}) }).not.toThrow();
    });

  });

  describe('Describe: require', function () {

    it('should throw exception if definition does not exist', function () {
      expect(function () { module.require('id', {}) }).toThrow();
    });

    it('should return module', function () {
      moodule.define('id', {a: 'a'});
      var theModule = moodule.require('id');

      expect(theModule.a).toBe('a');
    });

    it('should resolve all dependencies', function () {
      moodule.define('one', {a: '1', b: '2'});
      moodule.define('two', ['one'], function (one) { return { a: one.a } });
      moodule.define('three', ['one', 'two'], function (one, two) { return { a: two.a, b: one.b} });

      var theModule = moodule.require('three');
      expect(theModule.a).toBe('1');
      expect(theModule.b).toBe('2');
    });

    it('should return module many times', function () {
      moodule.define('id', {a: '1'});

      var theModule1 = moodule.require('id');
      var theModule2 = moodule.require('id');

      expect(theModule1).toBe(theModule2);
    });

  });

  describe('Describe: clear', function () {

    it('should remove all definitions and instances', function () {
      moodule.define('one', {});
      moodule.define('two', {});

      moodule.clear();

      expect(function () { moodule.require('one'); }).toThrow();
    });

  });

});