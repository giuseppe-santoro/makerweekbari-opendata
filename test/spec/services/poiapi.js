'use strict';

describe('Service: poiApi', function () {

  // load the service's module
  beforeEach(module('makerWeekApp'));

  // instantiate service
  var poiApi;
  beforeEach(inject(function (_poiApi_) {
    poiApi = _poiApi_;
  }));

  it('should do something', function () {
    expect(!!poiApi).toBe(true);
  });

});
