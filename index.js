var emitter = require('emitter');

var default_buttons = [

	['n1', 'n2', 'n3'],
	['n4', 'n5', 'n6'],
	['n7', 'n8', 'n9'],
	['__', 'n0', 'nd'],
	['_s', '_d', '_m'],
	['_a', '_c', '_e'],

]

var symbols = {

	n1:"symbol-0001.png",
	n2:"symbol-0002.png",
	n3:"symbol-0003.png",
	n4:"symbol-0004.png",
	n5:"symbol-0005.png",
	n6:"symbol-0006.png",
	n7:"symbol-0007.png",
	n8:"symbol-0008.png",
	n9:"symbol-0009.png",
	n0:"symbol-0010.png",
	nd:"symbol-0011.png", /* decimal */
	_a:"symbol-0012.png", /* add */
	_s:"symbol-0013.png", /* subtract */
	_c:"symbol-0014.png", /* clear */
	_m:"symbol-0015.png", /* multiply */
	_d:"symbol-0016.png", /* divide */
	_e:"symbol-0017.png", /* equals */
	_t:"symbol-0018.png", /* tick */
  __:null 							/* blank */

}

var chars = {

	n0:"0",
  n1:"1",
  n2:"2",
  n3:"3",
  n4:"4",
  n5:"5",
  n6:"6",
  n7:"7",
  n8:"8",
  n9:"9",
  nd:".",
  _a:"+", 			/* add */
	_s:"-", 			/* subtract */
	_m:"&times;",	/* multiply */
	_d:"&divide;" /* divide */

}

var class_names = {

	n1:"number1",
	n2:"number2",
	n3:"number3",
	n4:"number4",
	n5:"number5",
	n6:"number6",
	n7:"number7",
	n8:"number8",
	n9:"number9",
	n0:"number0",
	nd:"decimal",
	_a:"add",
	_s:"subtract",
	_c:"clear",
	_m:"multiply",
	_d:"divide",
	_e:"equals",
	_t:"tick",
	__:"blank"

}

var default_config = {

	display:true,
	decimals:2,
	integers:10,
	lib:'build/shennan-calculator/lib'

}

module.exports = function(buttons, config){

	for(var i in default_config){

		if(typeof config[i] === 'undefined')
			config[i] = default_config[i];

	}

	return new Calculator(buttons || default_buttons, config);

}

function Calculator(buttons, config){

	var n1 = '';
	var n2 = '';
	var operator;
	var operator_active;
	var btns = [];

	var calc = emitter( create_element('div', 'calculator') );

	var row_height = config.display ? 90 / (buttons.length + 1) : 90 / buttons.length;

	var display_row = create_element('div', 'row');

	display_row.style.height = row_height + '%';

	var display = display_row.appendChild( create_element('div', 'display') );

	var display_inner = display.appendChild( create_element('div', 'inner') );

	if(config.display){

		calc.appendChild( display_row );

	}

	for(var i in buttons){

		var cell_width = 100 / buttons[i].length

		var row = create_element('div', 'row');

		row.style.height = row_height + '%';

		calc.appendChild(row);

		for(var j in buttons[i]){

			var cell = create_element('div', 'cell');

			cell.style.width = cell_width + '%';
			cell.style.left = cell_width * parseInt(j) + '%';

			if(symbols[buttons[i][j]]){

				var symbol = buttons[i][j];

				var button = create_button( symbols[symbol], class_names[symbol] );

				button.setAttribute('data-symbol', symbol);

				btns.push(button);

				cell.appendChild(button);

				if(symbol === '_e' || symbol === '_t'){

					button.onclick = confirm_pressed;

				}else if(symbol === '_c'){

					button.onclick = clear_pressed;

				}else{

					button.onclick = button_pressed;

				}
			}

			row.appendChild(cell);

		}
	}

	function confirm_pressed(e){

		equals();

		render();

		calc.emit('confirm', get_current_number());

	}

	function clear_pressed(e){

		var n1 = '';
		var n2 = '';
		var operator = undefined;
		var operator_active = undefined;

		render();

		calc.emit('clear');

	}

	function button_pressed(e){

		var button = e.currentTarget;

		var symbol = button.getAttribute('data-symbol');

		var op = !/n./.test(symbol);

		if(op){

			if(!operator_active) equals(operator);

			operator = symbol;

		}else{

			if(operator){

				n2 += chars[symbol];

			}else{

				n1 += chars[symbol];

			}
		}

		operator_active = op ? button : undefined;

		render();

		calc.emit('button', get_current_number());

	}

	function equals(){

		var nn1 = Number(n1);
		var nn2 = Number(n2);
		
		switch(operator){

			case '_d':
				nn1 /= nn2;
				n2 = '';
				break;
			case '_s':
				nn1 -= nn2;
				n2 = '';
				break;
			case '_m':
				nn1 *= nn2;
				n2 = '';
				break;
			case '_a':
				nn1 += nn2;
				n2 = '';
				break;

		}
		
		n1 = String(round(nn1, config.decimals));

	}

	function render(){

		render_display();
		render_buttons();
		
	}

	function render_display(){

		display_inner.innerHTML = get_current_number_string();

	}

	function render_buttons(){

		var regex = /active/;

		for(var i in btns){

			if(btns[i] !== operator_active){

				btns[i].className = btns[i].className.replace(regex, '');

			}else{

				if(!regex.test(operator_active.className)){

					operator_active.className += ' active';

				}
			}
		}
	}

	function get_current_number_string(){

		var n = !n2.length ? n1 : n2;

		// add sign if we're dealing with negative number to start
		prepend = (operator === '_s' && n1 === '0') ? '-' : '';

		return n === '0' ? prepend : prepend + n;

	}

	function get_current_number(){

		return !n2.length ? Number(n1) : Number(n2);

	}

	function round(number, places) {

    return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);

	}

	function create_element(tagname, classes, id){

		if(!document)
			throw new Error('There is no document object!');

		var el = document.createElement(tagname);

		if(typeof id === 'string')
			el.id = id;

		if(typeof classes === 'string')
			el.className = classes;

		if(classes instanceof Array)
			el.className = classes.join(' ');

		return el;

	}

	function create_button(icon, classes){

		if(classes instanceof Array)
			classes.push('button');

		if(typeof classes === 'string')
			classes += ' button';

		var button = create_element('img', classes);

		button.src = config.lib + '/imgs/' + icon;

		button.draggable = false;
		button.ondragstart = function(){ return false; }

		return button;

	}

	return calc;

}