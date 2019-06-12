var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Уровень 1", "Уровень 2", "Уровень 3", "Уровень 4", "Уровень 5", "Уровень 6"],
    datasets: [{
      label: "Количество добавленных задач",
      data: [0.5, 2, 3, 0.5, 0.5, 0.5], // данные графика
      backgroundColor: ["Tomato", "orange", "Khaki", "SpringGreen", "DodgerBlue", "violet"],
      borderColor: ["red", "DarkOrange", "Gold", "MediumSeaGreen", "blue", "magenta"],
      hoverBackgroundColor: ["Salmon", "SandyBrown", "NavajoWhite", "LightGreen", "LightSkyBlue", "Plum"],
      hoverBorderColor: ["Tomato", "orange", "Khaki", "SpringGreen", "DodgerBlue", "violet"],
      borderWidth: 2
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var ctxPie = document.getElementById("pieChart").getContext("2d");
// ctxPie.canvas.width = 250;
// ctxPie.canvas.height = 250;
// ctxPie.render();
var pieChart = new Chart(ctxPie, {
  type: "pie",
  data: {
    labels: ["Студенты", "Преподаватели"],
    datasets: [{
      data: [12, 3], // данные графика
      backgroundColor: ["DeepPink", "lime"],
      hoverBackgroundColor: ["PaleVioletRed", "GreenYellow"]
    }]
  },

  options: {
    responsive: true,
    title: {
        display: true,
        text: 'Соотношение студентов и преподавателей'
    }
  }
});
