/*
 * @Author: 刘林
 * @Date: 2021-04-20 10:44:53
 * @LastEditors: 刘林
 * @LastEditTime: 2021-04-20 17:17:27
 */
!(function () {
  const buttons = document.querySelectorAll('.opeartor-button div');
  const card = document.getElementById('card-color');
  let result = ``;
  buttons.forEach(element => {
    element.addEventListener('click', (e) => {
      const $this = e.target;
      const value = $this.innerText;
      if (value === '=') {
        card.innerHTML = calculate(result);
        result = calculate(result);
        return;
      }
      result += value;
      card.innerHTML = result;
    })
  })

  function calculate(str) {
    let newStr = str.replaceAll('+', ' + ')
      .replaceAll('-', ' - ')
      .replaceAll('×', ' × ')
      .replaceAll('÷', ' ÷ ');

    const hzArr = hzTranslate(newStr);
    return hzCalculate(hzArr);
  }

  function hzTranslate(str) {
    let arr = [], result = [];
    // 符号对应权值
    const map = new Map([
      ['+', 0],
      ['-', 0],
      ['×', 0.5],
      ['÷', 0.5],
    ]);

    //中缀表达式转后缀表达式
    str.split(' ').forEach(s => {
      // debugger
      if (parseFloat(s)) {
        result.push(parseFloat(s));
      } else {
        if ((arr.length == 0) || (map.get(s) >= map.get(arr[0]))) {
          arr.unshift(s);
        } else {
          if (map.get(s) < map.get(arr[0])) {
            result = [...result, ...arr];
            arr = [s]
          }
        }
      }
    })
    return [...result, ...arr];
  }

  function hzCalculate(hzArr) {
    let result = [];
    let back = 0;
    hzArr.forEach(item => {
      if (isNaN(item)) {
        const num1 = result.pop();
        const num2 = result.pop();
        switch (item) {
          case '+': back = num1 + num2; break;
          case '-': back = num1 - num2; break;
          case '×': back = num1 * num2; break;
          case '÷': back = num1 / num2; break;
        }
        result.unshift(back);
      } else {
        result.push(Number(item));
      }
    })
    return result.pop();
  }
})();