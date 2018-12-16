var editor = CodeMirror(document.getElementById('codeeditor'), {
  value: "//BEGIN (write your solution here)\n\n",
  mode:  "javascript",
  matchBrackets: true,
  lineNumbers: true
});

check_btn.onclick = function(){
    // получаем код
    var user_code = editor.getValue();

  	try{
  		eval(user_code);
  	} catch (e){
  		console.log("Неккоректный JS код\n" + e.toString());
  		return;
  	}
  	// Проверка наличия функции
  	if(typeof(weight) === "number"){
  		console.log("Переменная 'weight' корректна");

      if (c === 300000000) {
        console.log("Переменная 'c' корректна");

        if (energy === weight * (Math.pow(c, 2))) {
          console.log("Все правильно!");
        } else {
          console.log("Переменная 'energy' НЕкорректна");
        }

      } else {
        console.log("Переменная 'c' НЕкорректна");
      }
  	} else {
      console.log("Переменная 'weight' НЕкорректна");
    }
    var res = document.getElementsByClassName("res-container")[0];
    res.style.display="block";
}
