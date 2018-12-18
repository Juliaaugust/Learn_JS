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
  	if(typeof(weight) === "number"){
  		console.log("Переменная 'weight' корректна");

      if (c === 300000000) {
        console.log("Переменная 'c' корректна");

        if (energy === weight * (Math.pow(c, 2))) {
          console.log("Все правильно!");
          res_text.innerHTML = "Молодец!<br>Ваше решение абсолютно верное!";

        } else {
          console.log("Переменная 'energy' НЕкорректна");
          res_text.innerHTML = "Ошибка!<br>Переменная 'energy' НЕкорректна";
        }

      } else {
        console.log("Переменная 'c' НЕкорректна");
        res_text.innerHTML = "Ошибка!<br>Переменная 'c' НЕкорректна";
      }
  	} else {
      console.log("Переменная 'weight' НЕкорректна");
      res_text.innerHTML = "Ошибка!<br>Переменная 'weight' НЕкорректна";
    }
    var res = document.getElementsByClassName("res-container")[0];
    res.style.display="block";
    window.scrollY += 100;
}
