/// <reference path='../_all.ts' />

module CountDownTimerClass {
  var created_num = 0;

  export class Time {
    constructor(
      public id: number,
      public splitTimes: string[],
      public H: number,
      public M: number,
      public S: number,
      public times: string,
      public createdAt: string
      ) {
      let setStr = this.numberToString;

      this.id = this.createId();
      this.setHMS();
      this.times = setStr(this.H) + ':' + setStr(this.M) + ':' + setStr(this.S);
    }

    static fromData(data: any): Time {
      return new Time(
        null,
        data,
        0,
        0,
        0,
        '00:00:00',
        String(new Date())
      );
    }

    private createId(): number {
      return ++created_num;
    }

    private setTimesNumber(splitTimes: string[], index: number): number {
      return parseInt(splitTimes[index], 10);
    }

    private setHMS() {
      this.H = this.setTimesNumber(this.splitTimes, 0);
      this.M = this.setTimesNumber(this.splitTimes, 1);
      this.S = this.setTimesNumber(this.splitTimes, 2);
    }

    private numberToString(time: number): string {
      let strTime: string = String(time);

      if(time < 10) {
        strTime = '0' + strTime;
      }

      return strTime;
    }

    public isFinal(): boolean {
      return Boolean(this.H == 0 && this.M == 0 && this.S == 0);
    }

    public setTimes() {
      let setStr = this.numberToString;
      this.times = setStr(this.H) + ':' + setStr(this.M) + ':' + setStr(this.S);
    }

  }
}