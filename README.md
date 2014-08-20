![logo](calculator.png?raw=true)

# calculator

It looks like a calculator and acts like a calculator.

## install

    $ component install
    $ component build

## usage

Create a calculator element and append it to the body:

```js
var calculator = require('calulcator');

var calc = calculator();

document.body.appendChild(calc);
```

Listen for events:

```js
calc.on('button', function(number, event){

  console.log('current number is: ' + number);

});

calc.on('confirm', function(number, event){

  console.log('tick or equals button pressed, resulting number is: ' + number);

});

calc.on('clear', function(event){

  console.log('clear has been pressed and we can assume that the resulting number is 0');

});
```

Pass in a map of buttons that you want included. Their position in the multidimensional array reflects their position on the board.

```js
var calculator([

  ['n1', 'n2', 'n3'],
  ['n4', 'n5', 'n6'],
  ['n7', 'n8', 'n9'],
  ['__', 'n0', 'nd'],
  ['_s', '_d', '_m'],
  ['_a', '_c', '_e']

]);
```

Here are the possible button mappings:

```
'n1' > /* 1 */
'n2' > /* 2 */
'n3' > /* 3 */
'n4' > /* 4 */
'n5' > /* 5 */
'n6' > /* 6 */
'n7' > /* 7 */
'n8' > /* 8 */
'n9' > /* 9 */
'n0' > /* 0 */
'nd' > /* decimal */
'_a' > /* add */
'_s' > /* subtract */
'_c' > /* clear */
'_m' > /* multiply */
'_d' > /* divide */
'_e' > /* equals */
'_t' > /* tick */
'__' > /* blank */
```

Add various options as the second argument:

```js
var calc = calculator(undefined,
    {
        display:true,                       /* whether to show the calculator display or not */
        decimals:2,                         /* the maximum number of decimal places to show */
        lib:'build/shennan-component/lib'   /* the path to the lib folder for the required assets */
    }
);
```

Each button gets given a class name, so targetting individual buttons in CSS is easy:

```css
.equals{

  background-color: #333 /* make the equals button grey */

}
```

Here are the list of button class names:

```
.number1{}
.number2{}
.number3{}
.number4{}
.number5{}
.number6{}
.number7{}
.number8{}
.number9{}
.number0{}
.decimal{}
.add{}
.subtract{}
.clear{}
.multiply{}
.divide{}
.equals{}
.tick{}
.blank{}
```

## api

### `var calc = calculator(buttons)`

Create a new calculator using the provided button config - an example config with all the buttons:

```js
var buttons = 
['n1', 'n2', 'n3'],
['n4', 'n5', 'n6'],
['n7', 'n8', 'n9'],
['__', 'n0', 'nd'],
['_s', '_d', '_m'],
['_a', '_c', '_e']
```

### `calc.clear()`

Clear the display of the calculator

### `calc.value(val)`

Get a numeric representation of the current display or set the value if an argument is passed

## events

### `calc.on('button', function(num, event){})`

called when a button is pressed with the current number

### `calc.on('confirm', function(num, event){})`

called when the equals or close button is pressed - passed the current number

### `calc.on('clear', function(event){})`

called when the display is reset

## license

MIT