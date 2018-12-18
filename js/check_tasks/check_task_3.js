var editor = CodeMirror(document.getElementById('codeeditor'), {
  value: "//BEGIN (write your solution here)\n\n",
  mode:  "javascript",
  matchBrackets: true,
  lineNumbers: true
});

var res_text = document.getElementsByClassName("res_text")[0];

check_btn.onclick = function(){
    // получаем код
    var user_code = editor.getValue();

  	try{
  		eval(user_code);
  	} catch (e){
  		console.log("Неккоректный JS код\n" + e.toString());
      res_text.innerHTML = "Ошибка!<br>Неккоректный JS код";
  		return;
  	}
  	// Проверка наличия функции
  	if(typeof squareOfSum === "function"){
  		console.log("Функция существует");

      //Проверка правильности работы функции
      var passed_test = 0;
      if(squareOfSum(0, 0) === 0){
      	console.log("Тест 1 (0, 0) пройден!");
        passed_test +=1;
      }
      if(squareOfSum(1, -1) === 0){
      	console.log("Тест 2 (1, -1) пройден!");
        passed_test +=1;
      }
      if(squareOfSum(2, 5) === 49){
      	console.log("Тест 3 (2, 5) пройден!");
        passed_test +=1;
      }
      if(squareOfSum(-6, -4) === 100){
      	console.log("Тест 4 (-6, -4) пройден!");
        passed_test +=1;
      }
      if(squareOfSum(22, 0) === 484){
      	console.log("Тест 5 (22, 0) пройден!");
        passed_test +=1;
      }
      if(squareOfSum(0, -335) === 112225){
      	console.log("Тест 6 (0, -335) пройден!");
        passed_test +=1;
      }

      if (passed_test === 6) {
        res_text.innerHTML = "Молодец!<br>Ваше решение абсолютно верное!";
      } else {
        res_text.innerHTML = "Ошибка!<br>Не все тесты пройдены!";
      }

  	} else {
      console.log("Функция не существует!");
      res_text.innerHTML = "Ошибка!<br>Функция не существует";
    }

    var res = document.getElementsByClassName("res-container")[0];
    res.style.display="block";
}
