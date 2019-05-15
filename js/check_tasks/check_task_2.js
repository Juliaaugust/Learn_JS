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

// доступ к данным из таблицы (для работы пользователя)
var table_width_arr = document.getElementsByClassName("td-avW");
var width_str = "";
var table_length_arr = document.getElementsByClassName("td-avL");
var length_str = "";

for (var i = 0; i < table_width_arr.length; i++) {
  width_str = width_str + table_width_arr[i].innerHTML + " ";
}
for (var i = 0; i < table_length_arr.length; i++) {
  length_str = length_str + table_length_arr[i].innerHTML + " ";
}
var width_arr = width_str.split(" ", table_width_arr.length); // массив данных 2 столбика 1 таблицы
var length_arr = length_str.split(" ", table_length_arr.length); // массив данных 2 столбика 2 таблицы
console.log(width_arr);
console.log(length_arr);

check_btn.onclick = function(){
    // получаем код
    var user_code = editor.getValue();

  	try{
  		eval(user_code);
  	} catch (e){
  		console.log("Неккоректный JS код\n" + e.toString());
      res_text.innerHTML = "Ошибка!<br>Неккоректный JS код";

      var catchErr = e.toString();
      res.style.display="block";

      more.onclick = function(){
        more_text.innerHTML = catchErr;
      }
  		return;
  	}

    // проверка существования переменных и соотвествия их типу number  && typeof(sumL) === "number" && typeof(sumW) === "number"
    if(typeof(avL) === "number" && typeof(avW) === "number") {
      console.log("Переменные для расчета средних значений заданы корректно");

      //Проверка правильности работы блока кода
      var passed_test = 0;

      // самостоятельно расчитываем суммы табличных значений, чтобы потом сравнить их с пользовательскими
      var correctSumW = correctSumL = 0;
      for (var i = 0; i < width_arr.length; i++) {
      	correctSumW += parseFloat(width_arr[i]);
      }
      for (var i = 0; i < length_arr.length; i++) {
      	correctSumL += parseFloat(length_arr[i]);
      }

      // сравниваем расчитанные значения с пользовательскими
      if (correctSumW == sumW) {
        passed_test +=1;
      	var t1 ="Тест 1 (сумма значений средней толщины по ширине рулона) пройден!";
      } else var t1 ="Тест 1 (сумма значений средней толщины по ширине рулона) <b>НЕ</b> пройден!";

      if (correctSumL == sumL) {
        passed_test +=1;
      	var t2 ="Тест 2 (сумма значений средней толщины по длине рулона) пройден!";
      } else var t2 ="Тест 2 (сумма значений средней толщины по длине рулона) <b>НЕ</b> пройден!";

      if ((correctSumL / length_arr.length)  == avL) {
        passed_test +=1;
      	var t3 ="Тест 3 (средняя толщина рулона по длине) пройден!";
      } else var t3 ="Тест 3 (средняя толщина рулона по длине) <b>НЕ</b> пройден!";

      if ((correctSumW / width_arr.length) == avW) {
        passed_test +=1;
      	var t4 ="Тест 4 (средняя толщина рулона по ширине) пройден!";
      } else var t4 ="Тест 4 (средняя толщина рулона по ширине) <b>НЕ</b> пройден!";

      // console.log(passed_test);

      if (passed_test === 4) {
        res_text.innerHTML = "Молодец!<br>Ваше решение абсолютно верное!";
      } else {
        res_text.innerHTML = "Ошибка!<br>Не все тесты пройдены!";
      }

    } else {
      err = 1;
      console.log("Ошибка в объявлении переменных!");
      res_text.innerHTML = "Ошибка!<br>Переменные <b>НЕ</b> корректны!";
    }

    res.style.display="block";

    more.onclick = function(){
      if (err == 0) {
        more_text.innerHTML = t1 + "<br>" + t2 + "<br>" + t3 + "<br>" + t4;
      } else if (err == 1) {
        more_text.innerHTML = "Одна или несколько переменных НЕ содержит числовые значения!<br>"
        + "Проверьте правильность написания переменных для расчета средних значений и/или соответствие их числовому типу.";
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
