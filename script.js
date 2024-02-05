"use strict";

//
//Основные переменные
//
const firstOfAllEl = document.getElementById("firstOfAll");
const mySelect = document.getElementById("mySelect");
const headerEl = document.getElementById("header");
const mainEl = document.getElementById("main");
let TimerEl = document.createElement("div");
TimerEl.classList.add("hidden");

let WhatWeekNumber;
let RealWeekNumber;
let dayCout = 0;
let timetable;
let d = new Date();
let currentWeekday = d.getDay();
let realWeelDay;
let invertFlag = false;

//
//Определяет четная неделя или нет
//
/* function IsWeekEven(date) {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let today = new Date(year, month, 0).getTime();
  let now = new Date().getTime();
  let week = Math.round((now - today) / (1000 * 60 * 60 * 24 * 7));
  //для проверки 86400000 * 7 - неделяв мс
  if (week % 2) {
    console.log("Текущая неделя - вторая");
    return false;
  } else {
    console.log("Текущая неделя - первая");
    return true;
  }
} */

//
//Проверяем, есть ли реверс недель
//
Date.prototype.getWeek = function () {
  let onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};
let currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 6); //+6  +13
/* console.log(currentDate); /// */
let weekNumber = currentDate.getWeek();
function isEvenWeek(weekNumber) {
  return weekNumber % 2 === 0;
}
isEvenWeek(weekNumber);
//
if (localStorage.getItem("weekRevers") === null) {
  WhatWeekNumber = isEvenWeek(weekNumber);
} else {
  if (+localStorage.getItem("weekRevers")) {
    WhatWeekNumber = isEvenWeek(weekNumber);
    WhatWeekNumber = !WhatWeekNumber;
  } else {
    WhatWeekNumber = isEvenWeek(weekNumber);
  }
}
RealWeekNumber = WhatWeekNumber;
//
//смещает дни недель в более удобный вид (понедельник - 1, воскресенье - 7, а не 0)
//
function normalWeekDay(weekday) {
  if (weekday == 0) {
    setTimeout(() => {
      let TimeCont = document.querySelector(".countdown-container");
      try {
        TimeCont.parentNode.removeChild(TimeCont);
      } catch (error) {}
    }, 1000);
    return 1; //если воскресенье, то будет отрисовывать понедельник следующей недели
  } else {
    return weekday;
  }
}

/* if (d.getDay() == 0) {
  WhatWeekNumber = !WhatWeekNumber;
} */

currentWeekday = normalWeekDay(currentWeekday);
realWeelDay = currentWeekday;

//Старт программы - пользователь выбирает нужный вуз
//переменная timetable берет сссылку на нужный объект
//стартовый блок исчезает, на место проррисовываются дни недели и рассписание

/* currentWeekday = 1;
realWeelDay = 1;
 */

//
//Ставим название вузов в опции
//
for (const obj of tabels) {
  let optionElement = document.createElement("option");
  optionElement.value = obj.name;
  optionElement.text = obj.name;
  mySelect.appendChild(optionElement);
}
//
//Кликаем по опции - загружается нужное расписание
//
let selectedOption = "";
mySelect.addEventListener("change", function ChoosingUniversity() {
  if (
    localStorage.getItem("University") == null ||
    localStorage.getItem("University") == "undefined"
  ) {
    //берем нужный вуз
    selectedOption = this.value;
    for (const obj of tabels) {
      if (obj.name == selectedOption) {
        timetable = obj;
        console.log(obj);
      }
    }
    //
    //SwitchUniversity();
    localStorage.setItem("University", selectedOption);
  }

  //скрываем поле выбора вуза, хедер и мейн показываем
  firstOfAllEl.classList.toggle("hidden");
  headerEl.classList.toggle("hidden");
  mainEl.classList.toggle("hidden");

  RecolorTheWeek(currentWeekday); //меняем цвет дня, чтобы было понятно что-за сейчас неделя
  PreRender(currentWeekday); //определяем сколько недель в рассписании и начинаем отрисовку расписания
});

/* //
//Свич - Выбор Универа
//
function SwitchUniversity() {
  switch (selectedOption) {
    case "ДГУ: ИСИТ 3":
      timetable = timetable_isit3;
      break;
    case "ДГУ: ПИвЭиУ 1":
      timetable = timetable_PI1;
      break;
    case "ДХУ: Об.дерева 1":
      timetable = timetable_DHY_derevo1;
      break;
    case "ДХУ: Об.дерева 2":
      timetable = timetable_DHY_derevo2;
      break;
    case "ДХУ: Об.дерева 3":
      timetable = timetable_DHY_derevo3;
      break;
  }
}
 */

//убрать переход по ссылке в кнопке с инфой
let b22 = document.getElementById("b22");
b22.addEventListener("click", function (event) {
  event.preventDefault();
});

//
//смена темы
//
let theme_timetable = "day";

function ChangeTheme() {
  if (theme_timetable == "day") {
    theme_timetable = "night";
    localStorage.setItem("theme_timetable", theme_timetable.toString());
    document.body.style.background = "#36434d";
  } else {
    theme_timetable = "day";
    localStorage.setItem("theme_timetable", theme_timetable.toString());
    document.body.style.background = "#e2ebf1";
  }
}

//
//Взаимодействие с попапом
//
let popupBg = document.querySelector(".popup__bg"); // Фон попап окна
let popup = document.querySelector(".popup"); // Само окно
let openPopupButtons = document.querySelectorAll(".open-popup"); // Кнопки для показа окна
let closePopupButton = document.querySelector(".close-popup"); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => {
  // Перебираем все кнопки
  button.addEventListener("click", (e) => {
    // Для каждой вешаем обработчик событий на клик
    e.preventDefault(); // Предотвращаем дефолтное поведение браузера
    popupBg.classList.add("active"); // Добавляем класс 'active' для фона
    popup.classList.add("active"); // И для самого окна
  });
});

closePopupButton.addEventListener("click", () => {
  // Вешаем обработчик на крестик
  popupBg.classList.remove("active"); // Убираем активный класс с фона
  popup.classList.remove("active"); // И с окна
});

document.addEventListener("click", (e) => {
  // Вешаем обработчик на весь документ
  if (e.target === popupBg) {
    // Если цель клика - фот, то:
    popupBg.classList.remove("active"); // Убираем активный класс с фона
    popup.classList.remove("active"); // И с окна
  }
});

//
//Функция для всех кнопок недель - перерисовывает расписание под нужный день недели
//
function WeekButton(name) {
  let buttons = document.querySelectorAll("#button-container button");
  dayCout = 0;

  TimerEl.classList.add("hidden");
  normalWeekDay(d.getDay());

  //очистка желтого цвета
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("recolor2");
  }

  //если выбран другой день, новая прорисовка, но без времени
  //если тот же день, то он опять перерисовывается
  for (let i = 0; i < buttons.length; i++) {
    if (name == currentWeekday) {
      mainEl.innerHTML = "";
      PreRender(currentWeekday);
      break;
    }

    if (i == currentWeekday - 1) {
      continue;
    }

    if (i == name - 1) {
      mainEl.innerHTML = "";
      buttons[i].classList.add("recolor2");
      PreRender(i + 1);
      continue;
    }
  }
  currentWeekday = name;
  //console.log(currentWeekday);
}

//
//Меняет неделю с первой на вторую или наоборот
//
function ChangeWeek() {
  let buttons = document.querySelectorAll("#button-container button");
  let YellowWeekday = realWeelDay;

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains("recolor2")) {
      YellowWeekday = i + 1;
    }
  }

  if (WhatWeekNumber == false) {
    WhatWeekNumber = true;
    dayCout = 0;
    mainEl.innerHTML = "";
    PreRender(YellowWeekday);
  } else {
    WhatWeekNumber = false;
    dayCout = 0;
    mainEl.innerHTML = "";
    PreRender(YellowWeekday);
  }

  TimerEl.classList.toggle("hidden");

  //

  //
}

//
//Кнопка меняющая чередования недель
//
function ChangeWeekForever() {
  let buttons = document.querySelectorAll("#button-container button");
  let YellowWeekday = realWeelDay;

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains("recolor2")) {
      YellowWeekday = i + 1;
    }
  }

  if (WhatWeekNumber == false) {
    WhatWeekNumber = true;
    dayCout = 0;
    mainEl.innerHTML = "";
    PreRender(YellowWeekday);
  } else {
    WhatWeekNumber = false;
    dayCout = 0;
    mainEl.innerHTML = "";
    PreRender(YellowWeekday);
  }

  if (localStorage.getItem("weekRevers") === null) {
    localStorage.setItem("weekRevers", 1);
  } else {
    if (+localStorage.getItem("weekRevers")) {
      localStorage.setItem("weekRevers", 0);
    } else {
      localStorage.setItem("weekRevers", 1);
    }
  }

  popupBg.classList.remove("active");
  popup.classList.remove("active");
}

//
//Кнопка для смены училища на другой
//
function ChangeUniversity() {
  localStorage.setItem("University", "undefined");
  setTimeout(() => {
    window.location.reload();
  }, 50);
}

//
//Функция перекрашивает цвет кнопки недели, которая сейчас идет
//
function RecolorTheWeek(currentWeekday) {
  const buttons = document.querySelectorAll("#button-container button");

  for (let i = 0; i < buttons.length; i++) {
    if (i == currentWeekday - 1) {
      //console.log(i);
      buttons[i].classList.toggle("recolor");
    }
  }

  //анимация
  let y = 0;

  if (window.screen.availHeight > window.screen.availWidth) {
    for (let i = 0; i <= buttons.length; i++) {
      setTimeout(() => {
        try {
          buttons[i].classList.add("bttn");
        } catch {}
        anime({
          targets: `.bttn`,
          translateY: 200,
          duration: 700,
        });
      }, y);
      y += 80;
    }
  } else {
    for (let i = buttons.length; i >= 0; i--) {
      setTimeout(() => {
        try {
          buttons[i].classList.add("bttn");
        } catch {}
        anime({
          targets: `.bttn`,
          translateY: 10,
        });
      }, y);
      y += 70;
    }
  }

  anime({
    targets: `.btnn-other`,
    translateX: -10,
  });
}

//
//Пререндер расписания
//
function PreRender(currentWeekday) {
  //если расписания не существует
  if (timetable == undefined) {
    localStorage.removeItem("University");
    location.reload();
  }
  if (timetable.twoWeek) {
    //Это нужно, чтобы раз и поменять первую и вторую неделю местами
    if (invertFlag && WhatWeekNumber == true) {
      console.log("Отрисовка второй недели");
      for (let key in timetable.secondWeek) {
        renderTable(timetable.secondWeek[key], currentWeekday);
      }
    } else if (invertFlag && WhatWeekNumber == false) {
      console.log("Отрисовка первой недели");
      for (let key in timetable.firstWeek) {
        renderTable(timetable.firstWeek[key], currentWeekday);
      }
    } //нормальная отрисовка недель
    else {
      if (WhatWeekNumber == true) {
        let i = 0;
        //console.log("Отрисовка первой недели");
        for (let key in timetable.firstWeek) {
          i++;
          if (currentWeekday == i)
            renderTable(timetable.firstWeek[key], currentWeekday);
        }
      } else {
        let i = 0;
        //console.log("Отрисовка второй недели");
        for (let key in timetable.secondWeek) {
          i++;
          if (currentWeekday == i)
            renderTable(timetable.secondWeek[key], currentWeekday);
        }
      }
    }
  } //одна неделя
  else {
    let i = 0;
    for (let key in timetable.firstWeek) {
      i++;
      if (currentWeekday == i)
        renderTable(timetable.firstWeek[key], currentWeekday);
    }
  }

  CreateName();
}

//для работы свайпов
//свайп = смена дня недели
//
try {
  mainEl.addEventListener("touchstart", handleTouchStart, false);
  mainEl.addEventListener("touchmove", handleTouchMove, false);
  let x1 = null;
  let x2 = null;
  //на сколько пикселей нужно подвинуть, чтобы сработал свайп
  let x_index = 400;

  function handleTouchStart(e) {
    const firstTouch = e.touches[0];
    x1 = firstTouch.clientX;
  }

  function handleTouchMove(e) {
    if (!x1) return false;
    x2 = e.touches[0].clientX;
    let xDiff = x2 - x1;
    if (Math.abs(xDiff) < x_index) return false;
    //
    if (xDiff > 0) {
      //console.log("ЛЕВО");
      if (+currentWeekday - 1 == 0) {
        WeekButton(6);
        ChangeWeek();
      } else {
        WeekButton(+currentWeekday - 1);
      }
      //
    } else {
      //console.log("ПРАВО");
      if (+currentWeekday + 1 == 7) {
        WeekButton(1);
        ChangeWeek();
      } else {
        WeekButton(+currentWeekday + 1);
      }
      //
    }
    x1 = null;
  }
} catch {}

//Клик тремя пальцами = смена недели
//
//
try {
  mainEl.addEventListener("touchstart", function (event) {
    if (event.touches.length >= 3) {
      ChangeWeek();
      event.preventDefault();
    }
  });
} catch {}

//
//Отрисовка расписания
//
async function renderTable(arr, currentWeekday) {
  let flag = true;
  let timerFlag = true;
  const buttons = document.querySelectorAll("#button-container button");
  dayCout++;

  //создание дня
  mainEl.innerHTML = ``;

  const dayEl = document.createElement("div");
  dayEl.classList.add("day");
  mainEl.appendChild(dayEl);

  //если нет пар
  if (arr.length == 0) {
    dayEl.innerHTML = `
          <br>
          <center><h1 style="font-size: 3em;">Сегодня занятий нет!</h1></center>
          <br><br>
          <center><a href="https://youtu.be/aI-PT_8JD_U?si=qr_59xkKVNhWm2up" target="_blank"><img src="cat.jpeg" id="img2"></a></center>
          <br><br>
          `;
    flag = false;
  }

  //если одна неделя - убираем кнопку смены недель
  let ChangeButton = document.querySelector(".changeWeek123");
  let ChangeButton2 = document.querySelector(".changeWeek333");

  if (timetable.twoWeek == false) {
    ChangeButton.classList.add("hidden");
    ChangeButton2.classList.add("hidden");
  }

  for (let i = 0; i < arr.length; i++) {
    if (!flag) break;

    let LessonEl = document.createElement("div");
    LessonEl.classList.add("hidden");
    TimerEl.classList.add("Timer");

    //создание урока
    let timestart = arr[i];
    i++;
    let timefinish = arr[i];
    i++;
    let subject = arr[i];
    i++;
    let teacher = arr[i];
    i++;
    let auditorium = arr[i];

    LessonEl.innerHTML = `
          <div class="container">
          <div class="small-container">
              <div class="box-ttime1">
                  <p>${timestart}</p>
                </div>
                <div class="box-ttime2">
                  <p>${timefinish}</p>
                </div>
          </div>
          <div class="tiny-container"></div>
          <div class="large-container">
              <div class="box-info"><p class="pad2">${subject}</p></div>
              <div class="box-info">
                  <div class="box-name"><p class="pad2">${teacher}</p></div>
                  <div class="box-auditorium"><p class="pad2">${auditorium}</p></div>
              </div>
          </div>
        </div> `;

    //добавляем урок
    dayEl.appendChild(LessonEl);

    //
    //добавляем время
    //
    timestart = standartToMs(timestart);
    timefinish = standartToMs(timefinish);
    /*   console.log(timestart);
    console.log(timefinish); */
    let timeNow = getCurrentTimeSinceDayStart();

    //таймер появляется только в текущий день недели
    if (currentWeekday != realWeelDay) {
      timerFlag = false;
    }

    if (timeNow >= timestart && timeNow < timefinish && timerFlag) {
      timerFlag = false;
      //отрисовка времени до конца текущей пары
      TimerEl.innerHTML = `
                <section class="countdown-container">
                <div>
                <div class="pad1"><p>Текущее занятие</p></div>
                <div class="pad1"><p>Осталось:</p></div>
                </div>
                <div class="days-container hidden">
                  <div class="days"></div>
                  <div class="days-label">days</div>
                </div>
                
                <div class="hours-container">
                  <div class="hours"></div>
                  <div class="hours-label">Час</div>
                </div>
                
                <div class="minutes-container">
                  <div class="minutes"></div>
                  <div class="minutes-label">Мин</div>
                </div>
                
                <div class="seconds-container">
                  <div class="seconds"></div>
                  <div class="seconds-label">Сек</div>
                </div>
                
              </section>
            `;

      //старт таймера
      //таймер срабатывает только в текущий день недели
      if (true) {
        dayEl.appendChild(TimerEl);
        let min = (timefinish - timeNow) / 60 / 1000;
        countDownClock(min, "minutes");
      }
    }

    if (timeNow < timestart && timerFlag) {
      timerFlag = false;
      //console.log("Часы должны появиться");

      //отрисовка времени до ближайщей пары
      TimerEl.innerHTML = `
                  <section class="countdown-container">
                  <div>
                  <div class="pad1"><p>До ближайшего занятия</p></div>
                  <div class="pad1"><p>осталось:</p></div>
                  </div>
                  <div class="days-container hidden">
                    <div class="days"></div>
                    <div class="days-label">days</div>
                  </div>
                  
                  <div class="hours-container">
                    <div class="hours"></div>
                    <div class="hours-label">час</div>
                  </div>
                  
                  <div class="minutes-container">
                    <div class="minutes"></div>
                    <div class="minutes-label">мин</div>
                  </div>
                  
                  <div class="seconds-container">
                    <div class="seconds"></div>
                    <div class="seconds-label">сек</div>
                  </div>
                  
                </section>
              `;

      //старт таймера
      if (true) {
        dayEl.appendChild(TimerEl);
        let min = (timestart - timeNow) / 60 / 1000;
        countDownClock(min, "minutes");
      }
    }
  }

  //
  //Добавление анимации
  //

  let x = () => {
    document.querySelector("body").classList.add("NoOverflow");
    let y = 50;
    for (const child of dayEl.children) {
      //console.log(child.tagName);
      if (child.classList.contains("Timer")) {
        continue;
      }
      if (child.tagName == "DIV") {
        setTimeout(() => {
          child.classList.remove("hidden");
          child.classList.add("lesson");
          anime({
            targets: `.${child.className}`,
            translateX: 1300,
          });
        }, y);
        y += 100;
      } else {
      }
    }
    setTimeout(() => {
      if (WhatWeekNumber == RealWeekNumber) {
        //console.log("Таймер появился");
        TimerEl.classList.remove("hidden");
      }
    }, 1200);
  };

  x();

  //небольшой отступ в конце
  let bottom = document.createElement("div");
  bottom.innerHTML = "<br>";
  mainEl.appendChild(bottom);
}

//
//Таймер функция -
//
const countDownClock = (number = 100, format = "seconds") => {
  const d = document;
  const daysElement = d.querySelector(".days");
  const hoursElement = d.querySelector(".hours");
  const minutesElement = d.querySelector(".minutes");
  const secondsElement = d.querySelector(".seconds");
  let countdown;
  convertFormat(format);

  function convertFormat(format) {
    switch (format) {
      case "seconds":
        return timer(number);
      case "minutes":
        return timer(number * 60);
      case "hours":
        return timer(number * 60 * 60);
      case "days":
        return timer(number * 60 * 60 * 24);
    }
  }

  function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(countdown);
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    daysElement.textContent = Math.floor(seconds / 86400);
    hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
    minutesElement.textContent = Math.floor(((seconds % 86400) % 3600) / 60);
    secondsElement.textContent =
      seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

    let t1 = Math.floor((seconds % 86400) / 3600);
    let t2 = Math.floor(((seconds % 86400) % 3600) / 60);
    let t3 = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

    //если время таймера вышло - сайт обновляется

    let buttons = document.querySelectorAll("#button-container button");
    let flag2 = true;

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].classList.contains("recolor2")) {
        flag2 = false;
      }
    }

    if (t1 == 0 && t2 == 0 && t3 == 1 && flag2) {
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }
};

//
//перевести время типа 3:45 в миллисекудны
//
function standartToMs(t) {
  return (
    Number(t.split(":")[0]) * 60 * 60 * 1000 +
    Number(t.split(":")[1]) * 60 * 1000
  );
}

//
//получить текщее колличество миллисекунд с начала дня
//
function getCurrentTimeSinceDayStart() {
  let now = new Date(); // текущая дата и время
  let startOfDay = new Date(); // начало текущего дня
  startOfDay.setHours(0, 0, 0, 0); // обнуляем часы, минуты, секунды и миллисекунды
  let millisecondsSinceStartOfDay = now - startOfDay; // разница между текущей датой и началом дня
  return millisecondsSinceStartOfDay; // выводим количество миллисекунд
}

//
//Обновление страницы в определенное время (00:00)
//
function refreshAt(hours, minutes, seconds) {
  var now = new Date();
  var then = new Date();

  if (
    now.getHours() > hours ||
    (now.getHours() == hours && now.getMinutes() > minutes) ||
    (now.getHours() == hours &&
      now.getMinutes() == minutes &&
      now.getSeconds() >= seconds)
  ) {
    then.setDate(now.getDate() + 1);
  }
  then.setHours(hours);
  then.setMinutes(minutes);
  then.setSeconds(seconds);

  var timeout = then.getTime() - now.getTime();
  setTimeout(function () {
    window.location.reload(true);
  }, timeout);
}

refreshAt(0, 0, 0);

//
//Названия вуза + какая неделя
//
function CreateName() {
  let firstOrSecond;
  let name = document.getElementById("NameUniversity");
  //недели в текстовом виде
  if (WhatWeekNumber == true) {
    firstOrSecond = "Первая неделя";
  } else {
    firstOrSecond = "Вторая неделя";
  }

  //если всего одна неделя, то будет показываться только имя вуза
  if (timetable.twoWeek == true) {
    name.innerHTML = `<h1>${timetable.name}	&emsp; ${firstOrSecond}</h1>`;
  } else {
    name.innerHTML = `<h1>${timetable.name}</h1>`;
  }
}

//
//при запуске страницы
//
function startt() {
  //если уже есть расписание - оно загрузится моментально
  if (
    localStorage.getItem("University") != null &&
    localStorage.getItem("University") != "undefined"
  ) {
    selectedOption = localStorage.getItem("University");
    console.log();
    for (const obj of tabels) {
      if (obj.name == selectedOption) {
        timetable = obj;
        console.log(obj);
      }
    }
    firstOfAllEl.classList.toggle("hidden");
    headerEl.classList.toggle("hidden");
    mainEl.classList.toggle("hidden");

    RecolorTheWeek(currentWeekday); //меняем цвет дня, чтобы было понятно что-за сейчас неделя
    PreRender(currentWeekday); //определяем сколько недель в рассписании и начинаем отрисовку расписания
  }
  //Тема приложения. Если локал сторадж пуст - то ставим стандартную тему
  if (isNaN(localStorage.getItem("theme_timetable"))) {
    localStorage.setItem("theme_timetable", 1);
    ChangeColor(1);
  }
  if (localStorage.getItem("theme_timetable") == null) {
    localStorage.setItem("theme_timetable", 1);
    ChangeColor(1);
  } else {
    let theme = +localStorage.getItem("theme_timetable");
    ChangeColor(theme);
  }
  //
  console.log("Старт");
}
//
//Смена темы
//
let metaTagColor1 = document.querySelector('meta[name="theme-color"]');
let metaTagColor2 = document.querySelector(
  'meta[name="msapplication-navbutton-color"]'
);
let metaTagColor3 = document.querySelector(
  'meta[name="apple-mobile-web-app-status-bar-style"]'
);

const showExamBtn = document.getElementById("showExamBtn");
showExamBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Отменяем стандартное действие
});

function showExam() {
  //скрываем хэдер и мейн
  let main = document.querySelector(".main");
  let header = document.querySelector(".header");
  if (main.classList.contains("hidden")) {
    main.classList.remove("hidden");
    header.classList.remove("hidden");
    //скрываем блок с экз
    let examDiv = document.querySelector(".examDiv");
    examDiv.classList.add("hidden");
    let examBody = document.querySelector(".examBody");
    examBody.innerHTML = "";
  } else {
    main.classList.add("hidden");
    header.classList.add("hidden");
    //показываем блок экзаменов
    let examDiv = document.querySelector(".examDiv");
    let examHeader = document.querySelector(".examHeader");
    examDiv.classList.remove("hidden");
    examHeader.innerHTML = timetable.name + " — Экзамены";
    //отображаем сами экзамены
    let examBody = document.querySelector(".examBody");
    let listContainer = document.createElement("ol");
    timetable.exam.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      listContainer.appendChild(listItem);
    });
    examBody.appendChild(listContainer);
    //скрываем попап
    popupBg.classList.remove("active");
    popup.classList.remove("active");
    //добавляем изображение
    let examImg = document.querySelector(".examImg");
    examImg.innerHTML = `
    <center><a href="https://youtu.be/KwKJ6gtOGpQ?si=rQOg87OQKRpGahd3" target="_blank"><img src="cat2.jpeg" id="img2"></a></center>
    `;
  }
}

function ChangeColor(theme_number) {
  switch (theme_number) {
    case 1:
      //console.log("первый цвет");
      document.querySelector("body").classList.add("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#212529");
      document.documentElement.style.setProperty("--color-button", "#6c757d");
      document.documentElement.style.setProperty("--color-active", "#adb5bd");
      document.documentElement.style.setProperty("--color-day", "#adb5bd");
      document.documentElement.style.setProperty("--color-click", "#f0f0f0");
      document.documentElement.style.setProperty("--color-time", "#41484E");
      document.documentElement.style.setProperty("--color-info", "#495057");
      document.documentElement.style.setProperty("--color-pop", "#eeeeee");
      metaTagColor1.setAttribute("content", "#41484E");
      metaTagColor2.setAttribute("content", "#41484E");
      metaTagColor3.setAttribute("content", "#41484E");
      break;
    case 2:
      document.querySelector("body").classList.remove("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#BAC5D7");
      document.documentElement.style.setProperty("--color-button", "#53699e");
      document.documentElement.style.setProperty("--color-active", "#acadd2");
      document.documentElement.style.setProperty("--color-day", "#312c4d");
      document.documentElement.style.setProperty("--color-click", "#252542");
      document.documentElement.style.setProperty("--color-time", "#3c90b8");
      document.documentElement.style.setProperty("--color-info", "#acadd2");
      document.documentElement.style.setProperty("--color-pop", "#3c90b8");
      metaTagColor1.setAttribute("content", "#3c90b8");
      metaTagColor2.setAttribute("content", "#3c90b8");
      metaTagColor3.setAttribute("content", "#3c90b8");
      break;
    case 3:
      document.querySelector("body").classList.remove("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#d1b3ab");
      document.documentElement.style.setProperty("--color-button", "#985e5a");
      document.documentElement.style.setProperty("--color-active", "#693431");
      document.documentElement.style.setProperty("--color-day", "#940c11");
      document.documentElement.style.setProperty("--color-click", "#c31016");
      document.documentElement.style.setProperty("--color-time", "#e42424");
      document.documentElement.style.setProperty("--color-info", "#fc9c74");
      document.documentElement.style.setProperty("--color-pop", "#e42424");
      metaTagColor1.setAttribute("content", "#e42424");
      metaTagColor2.setAttribute("content", "#e42424");
      metaTagColor3.setAttribute("content", "#e42424");
      break;
    case 4:
      document.querySelector("body").classList.remove("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#fafafa");
      document.documentElement.style.setProperty("--color-button", "#0494a1");
      document.documentElement.style.setProperty("--color-active", "lightblue");
      document.documentElement.style.setProperty("--color-day", "#523b30");
      document.documentElement.style.setProperty("--color-click", "#204747");
      document.documentElement.style.setProperty("--color-time", "#f4bc84");
      document.documentElement.style.setProperty("--color-info", "#d6b8b5");
      document.documentElement.style.setProperty("--color-pop", "#f4bc84");
      metaTagColor1.setAttribute("content", "#fafafa");
      metaTagColor2.setAttribute("content", "#fafafa");
      metaTagColor3.setAttribute("content", "#fafafa");
      break;
    case 5:
      document.querySelector("body").classList.add("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#040404");
      document.documentElement.style.setProperty("--color-button", "#dd7600");
      document.documentElement.style.setProperty("--color-active", "#c4b59d");
      document.documentElement.style.setProperty("--color-day", "#ff5d00");
      document.documentElement.style.setProperty("--color-click", "#ff4d00");
      document.documentElement.style.setProperty("--color-time", "#c75f28");
      document.documentElement.style.setProperty("--color-info", "#dc7c48");
      document.documentElement.style.setProperty("--color-pop", "#dc7c48");
      metaTagColor1.setAttribute("content", "#040404");
      metaTagColor2.setAttribute("content", "#040404");
      metaTagColor3.setAttribute("content", "#040404");
      break;
    case 6:
      document.querySelector("body").classList.remove("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#98bc82");
      document.documentElement.style.setProperty("--color-button", "#beb775");
      document.documentElement.style.setProperty("--color-active", "#74ab63");
      document.documentElement.style.setProperty("--color-day", "#27401d");
      document.documentElement.style.setProperty("--color-click", "#3f572c");
      document.documentElement.style.setProperty("--color-time", "#61873e");
      document.documentElement.style.setProperty("--color-info", "#8eac50");
      document.documentElement.style.setProperty("--color-pop", "#3f572c");
      metaTagColor1.setAttribute("content", "#98bc82");
      metaTagColor2.setAttribute("content", "#98bc82");
      metaTagColor3.setAttribute("content", "#98bc82");
      break;
  }
  /*   console.log(metaTagColor1);
  console.log(metaTagColor2);
  console.log(metaTagColor3); */
  //
}
function NewColorInStorage() {
  let theme_number = +localStorage.getItem("theme_timetable");
  theme_number++;
  if (theme_number == 7) theme_number = 1;
  localStorage.setItem("theme_timetable", theme_number);
  ChangeColor(theme_number);
}

startt();
