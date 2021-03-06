var editor = CodeMirror(document.getElementById('codeeditor'), {
  value: "//BEGIN (write your solution here)\n\n",
  mode:  "javascript",
  matchBrackets: true,
  lineNumbers: true
});

var graph = document.getElementsByClassName("graph")[0];
var res = document.getElementsByClassName("res-container")[0];
var res_text = document.getElementsByClassName("res_text")[0];
var more_text = document.getElementsByClassName("more_text")[0];
var more = document.getElementsByClassName("more")[0];
var graph_text = document.getElementsByClassName("graph_text")[0];

var lineDivWidth = document.getElementById('line-chart-width');
var lineDivLength = document.getElementById('line-chart-length');

var err = 0; // отслеживаем ошибку "содержание числовых значений переменных" (0 - такой ошибки нет, 1 - есть)

// доступ к данным из таблицы (для работы пользователя)
var table_width_arr = document.getElementsByClassName("td-avW");
var width_str = "";
var table_length_arr = document.getElementsByClassName("td-avL");
var length_str = "";

var table_width_pos_arr = document.getElementsByClassName("td-posW");
var width_pos_str = "";
var table_length_pos_arr = document.getElementsByClassName("td-posL");
var length_pos_str = "";

for (var i = 0; i < table_width_arr.length; i++) {
  width_str = width_str + table_width_arr[i].innerHTML + " ";
}
for (var i = 0; i < table_length_arr.length; i++) {
  length_str = length_str + table_length_arr[i].innerHTML + " ";
}

for (var i = 0; i < table_width_pos_arr.length; i++) {
  width_pos_str = width_pos_str + table_width_pos_arr[i].innerHTML + " ";
}
for (var i = 0; i < table_length_pos_arr.length; i++) {
  length_pos_str = length_pos_str + table_length_pos_arr[i].innerHTML + " ";
}

var width_arr = width_str.split(" ", table_width_arr.length); // массив данных 2 столбика 1 таблицы
var length_arr = length_str.split(" ", table_length_arr.length); // массив данных 2 столбика 2 таблицы
var width_pos_arr = width_pos_str.split(" ", table_width_pos_arr.length); // массив данных 1 столбика 1 таблицы
var length_pos_arr = length_pos_str.split(" ", table_length_pos_arr.length); // массив данных 1 столбика 2 таблицы
console.log(width_arr);
console.log(length_arr);
console.log(width_pos_arr);
console.log(length_pos_arr);

var correctTraceWidth = {
  x: width_pos_arr,
  y: width_arr,
  name: 'Средняя толщина плёнки',
  type: "scatter"
};
var correctTraceLength = {
  x: length_pos_arr,
  y: length_arr,
  name: 'Средняя толщина плёнки',
  type: "scatter"
};

// расчитываем значения avL и avW для доступа к ним пользователя
var fullSumW = fullSumL = 0;
for (var i = 0; i < width_arr.length; i++) {
  fullSumW += parseFloat(width_arr[i]);
}
for (var i = 0; i < length_arr.length; i++) {
  fullSumL += parseFloat(length_arr[i]);
}
var avL = fullSumL / length_arr.length;
var avW = fullSumW / width_arr.length;


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

    // проверка существования переменных и соотвествия их типу number
    if(typeof(Cp) === "number" && typeof(Cpk) === "number" && typeof(K) === "number" && typeof(sigma) === "number"
    && typeof(nominThick) === "number" && typeof(VGD) === "number" && typeof(NGD) === "number") {
      console.log("Переменные для расчета индексов потенциальной пригодности и подтвержденного качества заданы корректно");

      //Проверка правильности работы блока кода
      var passed_test = 0;
      var passed_graph_test = 0;

      // самостоятельно расчитываем значений переменных K, Cp и Cpk, чтобы потом сравнить их с пользовательскими
      var correctK = (Math.abs(250 - avL) ) / 0.5 - (255-245);
      var correctCp = (255-245) / (6 * 1.48);
      var correctCpk = (1 - correctK) * correctCp;

      // сравниваем расчитанные значения с пользовательскими
      if (nominThick == 250) {
        passed_test +=1;
      	var t1 ="Тест 1 (номинальная толщина пленки равна 250 мкм) пройден!";
      } else var t1 ="Тест 1 (номинальная толщина пленки равна 250 мкм) <b>НЕ</b> пройден!";

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

      if(K === correctK){
        passed_test +=1;
      	var t5 = "Тест 5 (значение К рассчитано верно) пройден!";
      } else var t5 = "Тест 5 (значение К рассчитано верно) <b>НЕ</b> пройден!";

      if(Cp === correctCp){
        passed_test +=1;
      	var t6 = "Тест 6 (значение Cp рассчитано верно) пройден!";
      } else var t6 = "Тест 6 (значение Cp рассчитано верно) <b>НЕ</b> пройден!";

      if(Cpk === correctCpk){
        passed_test +=1;
      	var t7 = "Тест 7 (значение Cpk рассчитано верно) пройден!";
      } else var t7 = "Тест 7 (значение Cpk рассчитано верно) <b>НЕ</b> пройден!";

      ////////////////////////////////// Графики ///////////////////////////////

      if (JSON.stringify(traceWidth) === JSON.stringify(correctTraceWidth)) {
        passed_graph_test += 1;
        var gt1 = "Тест 1 (данные для графика распределения толщины пленки по ширине) пройден!";
      } else var gt1 = "Тест 1 (данные для графика распределения толщины пленки по ширине) <b>НЕ</b> пройден!";

      if (JSON.stringify(traceLength) === JSON.stringify(correctTraceLength)) {
        passed_graph_test += 1;
        var gt2 = "Тест 2 (данные для графика распределения толщины пленки по длине) пройден!";
      } else var gt2 = "Тест 2 (данные для графика распределения толщины пленки по длине) <b>НЕ</b> пройден!";

      // максимальные и минимальные значения графиков
      var up = []
      var down = []
      for (var i = 0; i < width_pos_arr.length; i++){
        up.push(255);
        down.push(245)
      }
      var traceUp = {
        x: width_pos_arr,
        y: up,
        name: 'Верхняя допустимая граница',
        type: 'scatter'
      };
      var traceDown = {
          x: width_pos_arr,
          y: down,
          name: 'Нижняя допустимая граница',
          type: 'scatter'
        };

      var dataWidth = [traceWidth, traceUp, traceDown];
      var dataLength = [traceLength, traceUp, traceDown];

      if (typeof layoutW != "undefined") {
        passed_graph_test += 1;
        var gt3 = "Тест 3(объект layoutW существует) пройден!";

        if ("title" in layoutW) {
          passed_graph_test += 1;
          var gt4 = "Тест 4 (график распределения толщины пленки по ширине имеет заголовок) пройден!";
        } else var gt4 = "Тест 4 (график распределения толщины пленки по ширине имеет заголовок) <b>НЕ</b> пройден!";

      } else var gt3 = "Тест 3 (объект layoutW существует) <b>НЕ</b> пройден!";

      if (typeof layoutL != "undefined") {
        passed_graph_test += 1;
        var gt5 = "Тест 5 (объект layoutL существует) пройден!";

        if ("title" in layoutL) {
          passed_graph_test += 1;
          var gt6 = "Тест 6 (график распределения толщины пленки по длине имеет заголовок) пройден!";
        } else var gt6 = "Тест 6 (график распределения толщины пленки по длине имеет заголовок) <b>НЕ</b> пройден!";

      } else var gt5 = "Тест 5 (объект layoutL существует) <b>НЕ</b> пройден!";

      graph.onclick = function(){
        if (passed_graph_test === 6) {
          Plotly.plot( lineDivWidth, dataWidth, layoutW );
          Plotly.plot( lineDivLength, dataLength, layoutL );
        }
        else graph_text.innerHTML = gt1 + "<br>" + gt2 + "<br>" + gt3 + "<br>" + gt4 + "<br>" + gt5 + "<br>" + gt6;
      }
      /////////////////////// Конец проверки графиков //////////////////////////

      if (passed_test === 7) {
        res_text.innerHTML = "Молодец!<br>Расчет индексов Cp и Cpk абсолютно верный!";
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
        more_text.innerHTML = t1 + "<br>" + t2 + "<br>" + t3 + "<br>" + t4 + "<br>" + t5 + "<br>" + t6 + "<br>" + t7;
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
  graph_text.innerHTML = "";
  err = 0;
}
