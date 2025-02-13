/**this is a file created for calculation module */

const sum = function(a,b){
    return a+b;

}
const mul = function(a,b){
    return a*b;
}
const p = 3.14;

module.exports = {
    add: sum,
    prod: mul,
    pie: p
}
