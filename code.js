var Benchmark = require('benchmark'),
    suite = new Benchmark.Suite,
    string = '01000110 01110010 01101001 01100101 01101110 01100100';

suite
    .add('One', function() {
        one(string);
    })
    .add('Two', function() {
        two(string);
    })
    .add('Three', function() {
        three(string);
    })
    .add('Four', function() {
        four(string);
    })
    .add('Five', function() {
        five(string);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });


const one = str => String.fromCharCode( ...str.split(' ').map(s => parseInt(s, 2)) );
const two = str => str.split(' ').map(s => String.fromCharCode(parseInt(s,2))).join('');
const three = str => String.fromCharCode.apply( String, str.split(' ').map(s => parseInt(s, 2)) );
const four = str => {
    var i = 0, tmp = '', newStr = '';

    do {
        tmp += str[i];
        i += 1;
        if (tmp.length % 9 === 0) {
            newStr += String.fromCharCode(parseInt(tmp, 2));
        }
    } while (i <= newStr.length);

    return newStr;
};
const five = str => {
    var c = '', r = '', i = 0;

    do {
        c = str.substr(i, 8);
        r += String.fromCharCode(parseInt(c, 2)); i += 9;
    } while (c);

    return r;
};