document.addEventListener('DOMContentLoaded', () => {

    let total = 0;
    let buf = "0";
    let prevOp = null;

    const screen = document.querySelector('.screen');

    function buttonClick(value) {
        if (isNaN(parseFloat(value))) {
            handleSymbol(value);
        } else {
            handleNumber(value);
        }
        screen.innerText = buf;
    }


    function handleSymbol(symbol) {
        switch (symbol) {
            case 'C':
                buf = '0';
                total = 0;
                prevOp = null;
                break;
            case '=':
                if (prevOp === null) {
                    return;
                }
                flushOp(parseFloat(buf));
                prevOp = null;
                buf = total.toString();
                total = 0;
                break;
            case '←':
                if (buf.length === 1) {
                    buf = '0';
                } else {
                    buf = buf.substring(0, buf.length - 1);
                }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                handleMath(symbol);
                break;
        }
    }



    function handleMath(symbol) {
        if (buf === '0') {
            return;
        }
        const intBuf = parseFloat(buf);
        if (total === 0) {
            total = intBuf;
        } else {
            flushOp(intBuf);
        }
        prevOp = symbol;
        buf = '0';
    }

    

    function flushOp(intBuf) {
        if (prevOp === '+') {
            total += intBuf;
        } else if (prevOp === '-') {
            total -= intBuf;
        } else if (prevOp === '*') {
            total *= intBuf;
        } else if (prevOp === '/') {
            total /= intBuf;
        }
    }



    function handleNumber(numberStr) {
        if (buf === '0') {
            buf = numberStr;
        } else {
            buf += numberStr;
        }
    }

    

    function init() {
        const buttons = document.querySelectorAll('.cal-btn, .double, .triple');
        buttons.forEach(button => {
            button.addEventListener('click', function (event) {
                
                
                let value = event.target.textContent.trim();


                
                switch (value) {
                    case '×':
                        value = '*';
                        break;
                    case '÷':
                        value = '/';
                        break;
                    case '−':
                        value = '-';
                        break;
                    case '+':
                        value = '+';
                        break;
                    case '=':
                        value = '=';
                        break;
                    case '←':
                        value = '←';
                        break;
                    case 'C':
                    case 'c':
                        value = 'C';
                        break;
                }

                buttonClick(value);
            });
        });
    }

    init();
});

