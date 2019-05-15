var editor = CodeMirror(document.getElementById('codeeditor'), {
  value: "//BEGIN (write your solution here)\n\n",
  mode:  "javascript",
  matchBrackets: true,
  lineNumbers: true
});

var res = document.getElementsByClassName("res-container")[0];
var res_text = document.getElementsByClassName("res_text")[0];
var more_text = document.getElementsByClassName("more_text")[0];
var more = document.getElementsByClassName("more")[0];

var err = 0; // отслеживаем ошибку "содержание числовых значений переменных" (0 - такой ошибки нет, 1 - есть)

check_btn.onclick = function(){
    // получаем код
    var user_code = editor.getValue();

  	try{
  		eval(user_code);
  	} catch (e){
  		console.log("Неккоректный JS код\n" + e.toString());
      res_text.innerHTML = "Ошибка!<br>Неккоректный JS код";
      var t0 = e.toString();
      res.style.display="block";

      more.onclick = function(){
        more_text.innerHTML = t0;
      }

  		return;
  	}
  	// проверка существования переменных и соотвествия их типу number
  	if(typeof(Cp) === "number" && typeof(NGD) === "number" && typeof(VGD) === "number" && typeof(sigma) === "number"){
  		console.log("Переменные корректны – содержат числовые значения");

      //Проверка правильности работы блока кода
      var passed_test = 0;

      if (!(isNaN(Cp) && isNaN(VGD) && isNaN(NGD) && isNaN(sigma))){
        passed_test +=1;
      	var t1 = "Тест 1 (отсутствие NaN значений в переменных) пройден!";
      } else var t1 = "Тест 1 (отсутствие NaN значений в переменных) <b>НЕ</b> пройден!";

      if(VGD === 255){
        passed_test +=1;
      	var t2 ="Тест 2 (верхняя граница содержит значение 255) пройден!";
      } else var t2 ="Тест 2 (верхняя граница содержит значение 255) <b>НЕ</b> пройден!";

      if(NGD === 245){
        passed_test +=1;
      	var t3 = "Тест 3 (нижняя граница содержит значение 245) пройден!";
      } else var t3 = "Тест 3 (нижняя граница содержит значение 245) <b>НЕ</b> пройден!";

      if(sigma === 1.48){
        passed_test +=1;
      	var t4 = "Тест 4 (сигма содержит значение 1.48) пройден!";
      } else var t4 = "Тест 4 (сигма содержит значение 1.48) <b>НЕ</b> пройден!";

      if(Cp.toFixed(3) == 1.126){
        passed_test +=1;
      	var t5 = "Тест 5 (Cp содержит корректное значение) пройден!";
      } else var t5 = "Тест 5 (Cp содержит корректное значение) <b>НЕ</b> пройден!";

      // console.log(passed_test);

      if (passed_test === 5) {
        res_text.innerHTML = "Молодец!<br>Ваше решение абсолютно верное!";
      } else {
        res_text.innerHTML = "Ошибка!<br>Не все тесты пройдены!";
      }
  	} else {
      err = 1;
      res_text.innerHTML = "Ошибка!<br>Переменные <b>НЕ</b> корректны!<br>";

    }

    res.style.display="block";

    more.onclick = function(){
      if (err == 0) {
        more_text.innerHTML = t1 + "<br>" + t2 + "<br>" + t3 + "<br>" + t4 + "<br>" + t5;
      } else if (err == 1) {
        more_text.innerHTML = "Одна или несколько переменных НЕ содержит числовые значения";
      }
    }

    // скроллинг страницы вниз к блоку с результатом
    $("a.res_a").click(function () {
      var elementClick = $(this).attr("href");
      var destination = $(elementClick).offset().top;
      $('html').animate({ scrollTop: destination }, 1100);
      return false;
    });

    $("a.more_a").click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html').animate({ scrollTop: destination }, 1100);
        return false;
    });
}

var again_btn = document.getElementsByClassName("again")[0];
again_btn.onclick = function(){
  res.style.display="none";
  more_text.innerHTML = "";
  err = 0;
}
