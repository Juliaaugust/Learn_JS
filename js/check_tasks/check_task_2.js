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
  	if(typeof squareOfSum === "function"){
  		console.log("Функция существует");
        //Проверка правильности работы функции
      if(squareOfSum(0, 0) === 0){
      	console.log("Тест 1 (0, 0) пройден!");
      }
      if(squareOfSum(1, -1) === 0){
      	console.log("Тест 2 (1, -1) пройден!");
      }
      if(squareOfSum(2, 5) === 49){
      	console.log("Тест 3 (2, 5) пройден!");
      }
      if(squareOfSum(-6, -4) === 100){
      	console.log("Тест 4 (-6, -4) пройден!");
      }
      if(squareOfSum(22, 0) === 484){
      	console.log("Тест 5 (22, 0) пройден!");
      }
      if(squareOfSum(0, -335) === 112225){
      	console.log("Тест 6 (0, -335) пройден!");
      }
  	} else {
      console.log("Функция не существует!");
    }

    var res = document.getElementsByClassName("res-container")[0];
    res.style.display="block";
}
