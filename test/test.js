var assert = require('power-assert');

var CountDownTimer = require('../dist/countdown_timer.js');

describe('CountUpTimer', function() {
  var timmer = new global.CountDownTimer('10:23:54');

  it('Create Instance', function() {
    assert(timmer instanceof Object);
  });

  describe('Public Function', function() {
    describe('getTimes', function() {
      var time = timmer.getTimes();

      it('Time Object', function() {
        assert(typeof time === "object");
      });

      it('id', function() {
        assert(typeof time.id == "number");
      });

      it('splitTimes', function() {
        assert(typeof time.splitTimes[0] === "string");
        assert(typeof time.splitTimes[1] === "string");
        assert(typeof time.splitTimes[2] === "string");

        assert(time.splitTimes[0] === "10");
        assert(time.splitTimes[1] === "23");
        assert(time.splitTimes[2] === "54");
      });

      it('H', function() {
        assert(typeof time.H === "number");
        assert(time.H === 10);
      });

      it('M', function() {
        assert(typeof time.M === "number");
        assert(time.M === 23);
      });

      it('S', function() {
        assert(typeof time.S === "number");
        assert(time.S === 54);
      });

      it('times', function() {
        assert(typeof time.times === "string");
      });

      it('isFinal', function() {
        assert(typeof time.isFinal() === "boolean");
        assert(time.isFinal() === false);
      });

      it('createdAt', function() {
        assert(typeof time.createdAt === "string");
      });

    });

    describe('getTimesStr', function() {
      it('check type', function() {
        assert(typeof timmer.getTimesStr() === "string");
      });
    });

    describe('computeDuration', function() {
      it('change format', function() {
        assert(timmer.computeDuration(953994) === "00:15:54");
      });
    });

    describe('isFinal', function() {
      it('check type', function() {
        assert(typeof timmer.isFinal() === "boolean");
      });
      it('check value', function() {
        assert(timmer.isFinal() === false);
      });
    });

  });
});
