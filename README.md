# CountDownTimerJS
CountDownTimerJS - RealTime CountDown Timer JavaScript Library

### これは何？
カウントダウンタイマー、JavaScriptライブラリです。

### demo
[デモページ](https://webcyou.github.io/countdown-timer-js/)

###  Quick start

**Clone the repo:**
```
git clone git@github.com:webcyou/countdown-timer-js.git
```

**Install with [Bower](http://bower.io):**
```
bower install countdown-timer.js
```

**Install with [npm](https://www.npmjs.com):**

```
npm install countdown-timer-js
```


### Basic Usage

```
<script src="countdown_timer.js"></script>
```

### Basic Format
```
"hh:mm:ss"
```


### Start DataSet

```
new CountDownTimer("hh:mm:ss", callBack);
```


**example**

```
new CountDownTimer("12:11:02", function(times, parameters) {
    console.log(times);
});
```
or

```
new CountDownTimer("12:11:2", function(times, parameters) {
    console.log(times);
});
```

or Unix Timestamp (milliseconds)

```
new CountDownTimer(953994, function(times, parameters) {
    console.log(times);
});
```

**subscribe**

```
let timer = new CountDownTimer("hh:mm:ss");

timer.subscribe(function(times, parameters) {
  ...
});

```


### CallBack


```
new CountDownTimer(Times, function(times, parameters) {
  ...
});
```

**time**

times: string
```
"hh:mm:ss"
```

prams: Time

### CallBack Parameters Reference

Time Object

| ParametersName | value         | Detail                | 
| --------------- |:---------------:| -------------------- |
| id | number | created date Id |
| splitTimes | string[] | [hours, minute, second] |
| H | number | hours |
| M | number | minute |
| S | number | minute |
| times | string | "hh:mm:ss" |
| isFinal | boolean | To become true is the one time of 00:00:00 . |
| createdAt | string | Time that was created |

### Public Function Reference

```
let timer = new CountDownTimer("hh:mm:ss");
```

| FunctionName | value         | Detail                | 
| --------------- |:---------------:| -------------------- |
| setTimes | string | "hh:mm:ss" change the times |
| getTimes | Time | get the Time Object |
| getTimesStr | string | "hh:mm:ss" get the times |
| isFinal | boolean | To become true is the one time of 00:00:00 |
| subscribe | Function | subscribe CallBack function |
| computeDuration | number to string | Unix Timestamp (milliseconds) convert to "hh:mm:ss" format |

### Start develop
```
npm install
gulp 
```

```
Server started http://localhost:8088
LiveReload started on port 35729
```

### Start Test

**mocha**
```
gulp mocha
```

**mocha watch**
```
gulp mocha.watch
```

### build Source

```
gulp dist
```

### Author
Daisuke Takayama
[Web帳](http://www.webcyou.com/)


### License
Copyright (c) 2017 Daisuke Takayama
Released under the [MIT license](http://opensource.org/licenses/mit-license.php)
