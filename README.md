![logo](calculator.png?raw=true)

# calculator

A calculator element with built in calculator functionality.

## install

    $ component install
    $ component build

## usage

Create a calculator element and append it to the body:

    var calculator = require('calulcator');

    var calc = calculator();

    document.body.appendChild(calc);

Listen for events:

    calc.on('button pressed', function(number){

      console.log('current number is: ' + number);

    });

    calc.on('confirm pressed', function(number){

      console.log('tick or equals button pressed, resulting number is: ' + number);

    });

    calc.on('clear pressed', function(){

      console.log('clear has been pressed and we can assume that the resulting number is 0');

    });

Pass in a map of buttons that you want included. Their position in the multidimensional array reflects their position on the board.

    var calculator([

      ['n1', 'n2', 'n3'],
      ['n4', 'n5', 'n6'],
      ['n7', 'n8', 'n9'],
      ['__', 'n0', 'nd'],
      ['_s', '_d', '_m'],
      ['_a', '_c', '_e']

    ]);

Here are the possible button mappings:

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

If you don't want to see the calculator display, pass `false` as the second argument:

    var calc = calculator(undefined, false);

Each button gets given a class name, so targetting individual buttons in CSS is easy:

    .equals{

      background-color: #333 /* make the equals button grey */

    }

Here are the list of button class names:

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
