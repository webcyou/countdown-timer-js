/*
 * Author: Daisuke Takayama
 */
/// <reference path='_all.ts' />

'use strict';
var e = eval, global: NodeJS.Global = e('this');

module CountDownTimer {
  import Time = CountDownTimerClass.Time;

  export class CountDownTimerModel {
    private COUNT_DOWN_MSEC: number = 1000;
    private callBackFunction: Function = () => {};
    private times: Time;

    constructor(
      times: any,
      fn?: Function
      ) {
      let that = this;
      this.times = Time.fromData(times.split(/:|：/g));

      let countFunc: Function = () => {
        that.countDown(() => {
          that.times.setTimes();

          if(fn) {
            fn(that.times.times, that.times);
          }
          that.subscribe(that.callBackFunction);
          countFunc();
        });
      };
      countFunc();
    }

    private countDown(fn: Function) {
      let that = this;

      return setTimeout(() => {
        if(!(this.times.H == 0 && this.times.M == 0 && this.times.S == 0)) {
          that.countDownSecond();
          fn();
        }
      }, that.COUNT_DOWN_MSEC);
    }

    private countDownHour(): void {
      this.times.H--;

      if(this.times.H < 0) {
        this.times.H = 0;
      }
    }

    private countDownMinute(): void {
      this.times.M--;

      if(this.times.M < 0) {
        this.times.M = 59;
        this.countDownHour();
      }
    }

    private countDownSecond(): void {
      this.times.S--;

      if(this.times.S < 0) {
        this.times.S = 59;
        this.countDownMinute();
      }
    }

    public setTimes(times: string): void {
      this.times = Time.fromData(times.split(/:|：/g));
    }

    public getTimes(): Time {
      return this.times;
    }

    public getTimesStr(): string {
      return this.times.times;
    }

    public isFinal(): boolean {
      return this.times.isFinal();
    }

    public subscribe(fn: Function): void {
      this.callBackFunction = fn;
      fn(this.times.times, this.times);
    }
  }
}


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
