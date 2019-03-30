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

    // проверка существования переменных и соотвествия их типу number
    if(typeof(square) === "number" && typeof(triangle) === "number" && typeof(circle) === "number" && typeof(figure) === "number") {
      console.log("Переменные заданы корректно");
      if(square === 5){
    		console.log("Переменная 'square' корректна");

        if (triangle === square + 12) {
          console.log("Переменная 'triangle' корректна");

          if (circle === (square + triangle) * 3) {
            console.log("Переменная 'circle' корректна");


            if (figure === square + triangle + circle) {
              console.log("Все правильно!");
              res_text.innerHTML = "Молодец!<br>Ваше решение абсолютно верное!";

            } else {
              console.log("Переменная 'figure' НЕкорректна");
              res_text.innerHTML = "Ошибка!<br>Переменная 'figure' НЕкорректна";
            }

          } else {
            console.log("Переменная 'circle' НЕкорректна");
            res_text.innerHTML = "Ошибка!<br>Переменная 'circle' НЕкорректна";
          }

        } else {
          console.log("Переменная 'triangle' НЕкорректна");
          res_text.innerHTML = "Ошибка!<br>Переменная 'triangle' НЕкорректна";
        }
    	} else {
        console.log("Переменная 'square' НЕкорректна");
        res_text.innerHTML = "Ошибка!<br>Переменная 'square' НЕкорректна";
      }
    }
    else {
      console.log("Ошибка в объявлении переменных!");
      res_text.innerHTML = "Ошибка!<br>Проверьте правильность написания переменных и/или соответствие их числовому типу.";
    }

    var res = document.getElementsByClassName("res-container")[0];
    res.style.display="block";
    window.scrollY += 100;
}
