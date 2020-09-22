/** 解决js浮点运算导致的精度问题
 *  calculatorjs
 */
import calc from 'calculatorjs';

function DIV(num1, num2) {
    // 除法运算
    if(typeof num1 !== 'number') {
        return console.error('除数必须是数字');
    }
    if(typeof num2 !== 'number') {
        return console.error('被除数必须是数字');
    }
    return calc.div(num1, num2);
}

function ADD(num1, num2) {
    // 加法运算
    return calc.add(num1, num2);
}

function MUL(num1, num2) {
    // 乘法运算
    return calc.mul(num1, num2);
}

function SUB(num1, num2) {
    // 减法运算
    return calc.sub(num1, num2);
}

function ROUND(num, round = 2) {
    // 保留小数位
    return calc.round(num, round);
}

export {
    ADD,
    SUB,
    MUL,
    DIV,
    ROUND,
}