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
  	if(typeof sum === "function"){
  		console.log("Функция существует");

      //Тест проверить правильность работы
    	if(sum(2, 3) === 5){
    		console.log("Функция работает корректно");
    	}
  	} else {
      console.log("Функция не существует");
    }

}
