var CountDownTimerClass;
(function (CountDownTimerClass) {
    var created_num = 0;
    var Time = (function () {
        function Time(id, splitTimes, H, M, S, times, createdAt) {
            this.id = id;
            this.splitTimes = splitTimes;
            this.H = H;
            this.M = M;
            this.S = S;
            this.times = times;
            this.createdAt = createdAt;
            var setStr = this.numberToString;
            this.id = this.createId();
            this.setHMS();
            this.times = setStr(this.H) + ':' + setStr(this.M) + ':' + setStr(this.S);
        }
        Time.fromData = function (data) {
            return new Time(null, data, 0, 0, 0, '00:00:00', String(new Date()));
        };
        Time.prototype.createId = function () {
            return ++created_num;
        };
        Time.prototype.setTimesNumber = function (splitTimes, index) {
            return parseInt(splitTimes[index], 10);
        };
        Time.prototype.setHMS = function () {
            this.H = this.setTimesNumber(this.splitTimes, 0);
            this.M = this.setTimesNumber(this.splitTimes, 1);
            this.S = this.setTimesNumber(this.splitTimes, 2);
        };
        Time.prototype.numberToString = function (time) {
            var strTime = String(time);
            if (time < 10) {
                strTime = '0' + strTime;
            }
            return strTime;
        };
        Time.prototype.isFinal = function () {
            return Boolean(this.H == 0 && this.M == 0 && this.S == 0);
        };
        Time.prototype.setTimes = function () {
            var setStr = this.numberToString;
            this.times = setStr(this.H) + ':' + setStr(this.M) + ':' + setStr(this.S);
        };
        return Time;
    }());
    CountDownTimerClass.Time = Time;
})(CountDownTimerClass || (CountDownTimerClass = {}));
'use strict';
var e = eval, global = e('this');
var CountDownTimer;
(function (CountDownTimer) {
    var Time = CountDownTimerClass.Time;
    var CountDownTimerModel = (function () {
        function CountDownTimerModel(times, fn) {
            this.COUNT_DOWN_MSEC = 1000;
            this.callBackFunction = function () { };
            var that = this;
            this.setTimes(times);
            var countFunc = function () {
                that.countDown(function () {
                    that.times.setTimes();
                    if (fn) {
                        fn(that.times.times, that.times);
                    }
                    that.subscribe(that.callBackFunction);
                    countFunc();
                });
            };
            countFunc();
        }
        CountDownTimerModel.prototype.getTimesFormat = function (times) {
            var formatTime;
            if (typeof times === "number") {
                formatTime = this.computeDuration(times);
            }
            else {
                formatTime = times;
            }
            return formatTime;
        };
        CountDownTimerModel.prototype.countDown = function (fn) {
            var _this = this;
            var that = this;
            return setTimeout(function () {
                if (!(_this.times.H == 0 && _this.times.M == 0 && _this.times.S == 0)) {
                    that.countDownSecond();
                    fn();
                }
            }, that.COUNT_DOWN_MSEC);
        };
        CountDownTimerModel.prototype.countDownHour = function () {
            this.times.H--;
            if (this.times.H < 0) {
                this.times.H = 0;
            }
        };
        CountDownTimerModel.prototype.countDownMinute = function () {
            this.times.M--;
            if (this.times.M < 0) {
                this.times.M = 59;
                this.countDownHour();
            }
        };
        CountDownTimerModel.prototype.countDownSecond = function () {
            this.times.S--;
            if (this.times.S < 0) {
                this.times.S = 59;
                this.countDownMinute();
            }
        };
        CountDownTimerModel.prototype.setTimes = function (times) {
            this.times = Time.fromData(this.getTimesFormat(times).split(/:|：/g));
        };
        CountDownTimerModel.prototype.getTimes = function () {
            return this.times;
        };
        CountDownTimerModel.prototype.getTimesStr = function () {
            return this.times.times;
        };
        CountDownTimerModel.prototype.isFinal = function () {
            return this.times.isFinal();
        };
        CountDownTimerModel.prototype.computeDuration = function (ms) {
            var h = String(Math.floor(ms / 3600000) + 100).substring(1);
            var m = String(Math.floor((ms - h * 3600000) / 60000) + 100).substring(1);
            var s = String(Math.round((ms - h * 3600000 - m * 60000) / 1000) + 100).substring(1);
            return h + ':' + m + ':' + s;
        };
        CountDownTimerModel.prototype.subscribe = function (fn) {
            this.callBackFunction = fn;
            fn(this.times.times, this.times);
        };
        return CountDownTimerModel;
    }());
    CountDownTimer.CountDownTimerModel = CountDownTimerModel;
})(CountDownTimer || (CountDownTimer = {}));
if (typeof (module) !== 'undefined') {
    if (typeof (module).exports.CountDownTimer === 'undefined') {
        (module).exports.CountDownTimer = {};
    }
    (module).exports.CountDownTimer = CountDownTimer.CountDownTimerModel;
}
if (typeof (global) !== 'undefined') {
    if (typeof global['CountDownTimer'] === 'undefined') {
        global['CountDownTimer'] = {};
    }
    global['CountDownTimer'] = CountDownTimer.CountDownTimerModel;
}
