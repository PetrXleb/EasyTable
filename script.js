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
let dayCout = 0;
let timetable;
let d = new Date();
let currentWeekday = d.getDay();
let realWeelDay;
let invertFlag = false;

//
//Определяет четная неделя или нет
//
function IsWeekEven(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const msInWeek = 604800000;
  const weekNumber = Math.ceil(
    ((date - oneJan) / msInWeek + oneJan.getDay() + 1) / 7
  );

  const isSunday = date.getDay() === 0;
  const previousWeekIsOdd = (weekNumber + (isSunday ? -1 : 0)) % 2 === 1;
  return !previousWeekIsOdd;
}

//
//Проверяем, есть ли реверс недель
//
if (localStorage.getItem("weekRevers") == null) {
  WhatWeekNumber = IsWeekEven(new Date());
} else {
  if (+localStorage.getItem("weekRevers")) {
    WhatWeekNumber = IsWeekEven(new Date());
    WhatWeekNumber = !WhatWeekNumber;
  } else {
    WhatWeekNumber = IsWeekEven(new Date());
  }
}

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

if (d.getDay() == 0) {
  WhatWeekNumber = !WhatWeekNumber;
}

currentWeekday = normalWeekDay(currentWeekday);
realWeelDay = currentWeekday;

//
//таким будет выглядить объект расписания
//
//['','','','','','','','','','','','','','','',], - 3 пары
let timetable_isit2 = {
  name: "ДГУ: ИСИТ 2",
  twoWeek: true,
  firstWeek: {
    Monday: [
      "8:30",
      "23:59",
      "Теория информации. Лекция",
      "Муртузалиева А.А.",
      "3.14",
      "10:20",
      "11:55",
      "Теория информации. Лекция",
      "Муртузалиева А.А.",
      "3.14",
      "12:20",
      "13:55",
      "Проф.ин.яз. 1п/г",
      "Муртузалиева А.А.",
      "3.14",
    ],
    Tuesday: [
      "8:30",
      "10:05",
      "Философия",
      " Саркарова Н.А.",
      "2.1",
      "10:20",
      "11:55",
      "Т/прогр 1п/г | ОС 2п/г",
      "Магомедова С.Р. | Бакмаев А.Ш.",
      "ВЦ | 2.12",
    ],
    Wednesday: [
      "8:30",
      "10:05",
      "Техн. прогр-ия лек.",
      "Магомедова С.Р.",
      "4.13",
      "10:20",
      "11:55",
      "Вер и стат. пр.",
      "Магомедова Е.С.",
      "4.17",
      "12:20",
      "13:55",
      "Вер и стат. лек.",
      "Магомедова Е.С.",
      "4.17",
    ],
    Thursday: [
      "8:30",
      "10:05",
      "ОС 1п/г | Т/прогр 2п/г",
      " Бакмаев А.Ш. | Магомедова С.Р.",
      "2.12 | ВЦ",
      "10:20",
      "11:55",
      "Физра",
      "Не указано",
      "Не указано",
      "12:20",
      "13:55",
      "Техн. прогр-ия пр.",
      "Магомедова С.Р.",
      "4.13",
    ],
    Friday: [
      "8:30",
      "23:05",
      "ООП 2п/г",
      "Муртузалиев М.О.",
      "ВЦ",
      "10:20",
      "11:55",
      "ООП 1п/г  | Проф.ин.яз. 2п/г",
      "Муртузалиев М.О. | Мутаева С.",
      "ВЦ | 4.17",
      "12:20",
      "13:55",
      "ООП л.",
      "Муртузалиев М.О.",
      "4.16",
    ],
    Saturday: [],
  },
  secondWeek: {
    Monday: [
      "8:30",
      "10:05",
      "Теория информации. Лекция",
      "Муртузалиева А.А.",
      "4.4",
      "10:20",
      "11:55",
      "Теория информации. Лекция",
      "Муртузалиева А.А.",
      "4.4",
    ],
    Tuesday: [
      "8:30",
      "10:05",
      "Философия",
      " Саркарова Н.А.",
      "2.1",
      "10:20",
      "11:55",
      "ОС 1п/г | Т/прогр 2п/г",
      " Бакмаев А.Ш. | Магомедова С.Р.",
      "2.12 | ВЦ",
    ],
    Wednesday: [
      "8:30",
      "10:05",
      "Т/прогр 1п/г | ОС 2п/г",
      "Магомедова С.Р. | Бакмаев А.Ш.",
      "ВЦ | 2.12",
      "10:20",
      "11:55",
      "Вер и стат. лек.",
      "Магомедова Е.С.",
      "4.6",
      "12:20",
      "13:55",
      "Опер. сист. л.",
      "Бакмаев А.Ш.",
      "2.12",
      "14:10",
      "15:45",
      "Опер. сист. л.",
      "Бакмаев А.Ш.",
      "2.12",
    ],
    Thursday: [
      "8:30",
      "10:05",
      "Техн. прогр-ия лек.",
      "Магомедова С.Р.",
      "4.16",
      "10:20",
      "11:55",
      "Физра",
      "Не указано",
      "Не указано",
    ],
    Friday: [
      "8:30",
      "23:59",
      "ООП 1п/г | Проф.ин.яз 2п/г",
      "Муртузалиев М.О. | Мутаева С.",
      "ВЦ | 4.17",
      "10:20",
      "11:55",
      "Проф.ин.яз 1п/г | ООП 2п/г",
      "Мутаева С. | Муртузалиев М.О. ",
      "4.17| ВЦ",
      "12:20",
      "13:55",
      "ООП л.",
      "Муртузалиев М.О.",
      "4.4",
    ],
    Saturday: [
      "8:30",
      "23:05",
      "ЭПОвСУП",
      " Алиев Г.Х.",
      "3.14",
      "10:20",
      "11:55",
      "ЭПОвСУП",
      " Алиев Г.Х.",
      "3.14",
    ],
  },
};

/* let timetable_isit3 = {
  name: 'ДГУ: ИСИТ 3',
  twoWeek: false,
  firstWeek:    {
                      Monday:   ['8:30','10:05','1Теория информации. 2Лекция','Муртузалиева А.А.','3.14','10:20','11:55','Теория информации. Лекция','Муртузалиева А.А.','3.14','12:20','13:55','Проф.ин.яз. 1п/г','Муртузалиева А.А.','3.14',],
                      Tuesday:  ['23:59','10:05','211Теория информации. 2Лекция','Муртузалиева А.А.','3.14','23:20','23:55','Теория информации. Лекция','Муртузалиева А.А.','3.14','12:20','23:55','Проф.ин.яз. 1п/г','Муртузалиева А.А.','3.14',],
                      Wednesday:['8:30','23:55','3Теория информации. 2Лекция','Муртузалиева А.А.','3.14','10:20','11:55','Теория информации. Лекция','Муртузалиева А.А.','3.14','12:20','13:55','Проф.ин.яз. 1п/г','Муртузалиева А.А.','3.14',],
                      Thursday: ['8:30','10:05','4Теория информации. 2Лекция','Муртузалиева А.А.','3.14','10:20','11:55','Теория информации. Лекция','Муртузалиева А.А.','3.14','12:20','13:55','Проф.ин.яз. 1п/г','Муртузалиева А.А.','3.14',],
                      Friday:   ['8:30','10:05','5Теория информации. 2Лекция','Муртузалиева А.А.','3.14','10:20','11:55','Теория информации. Лекция','Муртузалиева А.А.','3.14','12:20','13:55','Проф.ин.яз. 1п/г','Муртузалиева А.А.','3.14',],
                      Saturday: ['8:30','10:05','6Теория информации. 2Лекция','Муртузалиева А.А.','3.14','10:20','11:55','Теория информации. Лекция','Муртузалиева А.А.','3.14','12:20','13:55','Проф.ин.яз. 1п/г','Муртузалиева А.А.','3.14',],
                      Sunday:   ['8:30','10:05','7Теория информации. 2Лекция','Муртузалиева А.А.','3.14','10:20','11:55','Теория информации. Лекция','Муртузалиева А.А.','3.14','12:20','13:55','Проф.ин.яз. 1п/г','Муртузалиева А.А.','3.14',],
                  },
} */

let timetable_Kaluga6a = {
  name: "МБОУ СОШ 46 - 6а",
  twoWeek: false,
  firstWeek: {
    Monday: [
      "8:30",
      "9:10",
      "Русский яз.",
      "Билецкая Алла Николаевна",
      "Не указано",
      "23:59",
      "10:00",
      "Матем.",
      "Иванова Елена Викторовна",
      "№46",
      "10:10",
      "10:50",
      "Русский яз.",
      "Билецкая Алла Николаевна",
      "Не указано",
      "11:05",
      "11:45",
      "Англ.яз.",
      "Мазина Виктория Юрьевна",
      "Не указано",
      "11:55",
      "12:35",
      "Технологии",
      "Сидельников Виктор Николаевич",
      "Мастерские",
      "12:45",
      "13:15",
      "Технологии",
      "Сидельников Виктор Николаевич",
      "Мастерские",
    ],
    Tuesday: [
      "8:30",
      "9:15",
      "Лит-ра",
      "Билецкая Алла Николаевна",
      "Не указано",
      "9:30",
      "10:15",
      "Биология",
      "Колесникова Наталья Александровна",
      "Не указано",
      "10:30",
      "11:15",
      "Русский яз.",
      "Билецкая Алла Николаевна",
      "Не указано",
      "11:30",
      "12:15",
      "География",
      "Колесникова Наталья Александровна",
      "№46",
      "12:30",
      "13:15",
      "Матем.",
      "Иванова Елена Викторовна",
      "Не указано",
      "13:25",
      "14:10",
      "Физ-ра",
      "Гурина Ольга Анатольевна",
      "Не указано",
    ],
    Wednesday: [
      "8:30",
      "9:15",
      "Русский яз.",
      "Билецкая Алла Николаевна",
      "№23",
      "9:30",
      "10:15",
      "Родная лит-ра",
      "Билецкая Алла Николаевна",
      "Не указано",
      "10:30",
      "11:15",
      "Матем.",
      "Иванова Елена Викторовна",
      "№46",
      "11:30",
      "12:15",
      "Англ.яз.",
      "Мазина Виктория Юрьевна",
      "Не указано",
      "12:30",
      "13:15",
      "Музыка",
      "Иванченко Татьяна Николаевна",
      "№3",
      "13:25",
      "14:10",
      "История",
      "Каранина Арина Сергеевна",
      "№30",
    ],
    Thursday: [
      "8:30",
      "9:10",
      "Русский яз.",
      "Билецкая Алла Николаевна",
      "№23",
      "9:20",
      "10:00",
      "Физ-ра",
      "Гурина Ольга Анатольевна",
      "Не указано",
      "10:30",
      "11:15",
      "Лит-ра",
      "Билецкая Алла Николаевна",
      "Не указано",
      "11:30",
      "12:15",
      "Матем.",
      "Иванова Елена Викторовна",
      "№46",
      "12:30",
      "13:15",
      "Англ. яз.",
      "Мазина Виктория Юрьевна",
      "Не указано",
    ],
    Friday: [
      "8:30",
      "23:55",
      "Матем.",
      "Иванова Елена Викторовна",
      "№46",
      "9:30",
      "10:15",
      "ИЗО",
      "Домбровский Станислав Вадимович",
      "Не указано",
      "10:30",
      "11:15",
      "Русский яз.",
      "Билецкая Алла Николаевна",
      "Не указано",
      "11:30",
      "12:15",
      "История",
      "Каранина Арина Сергеевна",
      "№30",
      "12:30",
      "13:15",
      "Обществознание",
      "Каранина Арина Сергеевна",
      "№30",
      "13:25",
      "14:10",
      "Лит-ра",
      "Билецкая Алла Николаевна",
      "№23",
    ],
    Saturday: [],
    Sunday: [],
  },
};

//
//
//Старт программы - пользователь выбирает нужный вуз
//переменная timetable берет сссылку на нужный объект
//стартовый блок исчезает, на место проррисовываются дни недели и рассписание
//
//

/* currentWeekday = 1;
realWeelDay = 1;
 */

let selectedOption = "";

mySelect.addEventListener("change", function ChoosingUniversity() {
  if (
    localStorage.getItem("University") == null ||
    localStorage.getItem("University") == "undefined"
  ) {
    //берем нужный вуз
    selectedOption = this.value;
    SwitchUniversity();

    localStorage.setItem("University", selectedOption);
  }

  //скрываем поле выбора вуза, хедер и мейн показываем
  firstOfAllEl.classList.toggle("hidden");
  headerEl.classList.toggle("hidden");
  mainEl.classList.toggle("hidden");

  RecolorTheWeek(currentWeekday); //меняем цвет дня, чтобы было понятно что-за сейчас неделя
  PreRender(currentWeekday); //определяем сколько недель в рассписании и начинаем отрисовку расписания
});

//
//Свич - Выбор Универа
//
function SwitchUniversity() {
  switch (selectedOption) {
    case "ДГУ: ИСИТ 2":
      timetable = timetable_isit2;
      break;
    case "ДГУ: ИСИТ 3":
      timetable = timetable_isit3;
      break;
    case "МБОУ СОШ 46":
      timetable = timetable_Kaluga6a;
  }
}

/* 
                      Monday:   ['','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',],
                    
                      Tuesday:  ['','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',],
                      Wednesday:['','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',],
                      Thursday: ['','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',],
                      Friday:   ['','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',],
                      Saturday: ['','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',],
                      Sunday:   ['','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',
                      '','','','','',],
                  },
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

  if (localStorage.getItem("weekRevers") == null) {
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
          <center><a href="https://youtu.be/RrHAxTdj3pM" target="_blank"><img src="2.jpg" id="img2"></a></center>
          <br>
          <br>
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
      console.log("Часы должны появиться");

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
      TimerEl.classList.remove("hidden");
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
    SwitchUniversity();

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

function ChangeColor(theme_number) {
  switch (theme_number) {
    case 1:
      console.log("первый цвет");
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
    case 2:
      document.querySelector("body").classList.remove("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#BAC5D7");
      document.documentElement.style.setProperty("--color-button", "#53699e");
      document.documentElement.style.setProperty("--color-active", "#acadd2");
      document.documentElement.style.setProperty("--color-day", "#312c4d");
      document.documentElement.style.setProperty("--color-click", "#484984");
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
      document.querySelector("body").classList.add("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#212529");
      document.documentElement.style.setProperty("--color-button", "#6c757d");
      document.documentElement.style.setProperty("--color-active", "#adb5bd");
      document.documentElement.style.setProperty("--color-day", "#adb5bd");
      document.documentElement.style.setProperty("--color-click", "#ced4da");
      document.documentElement.style.setProperty("--color-time", "#41484E");
      document.documentElement.style.setProperty("--color-info", "#495057");
      document.documentElement.style.setProperty("--color-pop", "#eeeeee");
      metaTagColor1.setAttribute("content", "#41484E");
      metaTagColor2.setAttribute("content", "#41484E");
      metaTagColor3.setAttribute("content", "#41484E");
      break;
    case 5:
      document.querySelector("body").classList.add("colorFontWhite");
      document.documentElement.style.setProperty("--color-a", "#040404");
      document.documentElement.style.setProperty("--color-button", "#dd7600");
      document.documentElement.style.setProperty("--color-active", "#c4b59d");
      document.documentElement.style.setProperty("--color-day", "#ff5d00");
      document.documentElement.style.setProperty("--color-click", "#db5a04");
      document.documentElement.style.setProperty("--color-time", "#c75f28");
      document.documentElement.style.setProperty("--color-info", "#dc7c48");
      document.documentElement.style.setProperty("--color-pop", "#dc7c48");
      metaTagColor1.setAttribute("content", "#040404");
      metaTagColor2.setAttribute("content", "#040404");
      metaTagColor3.setAttribute("content", "#040404");
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
  if (theme_number == 6) theme_number = 1;
  localStorage.setItem("theme_timetable", theme_number);
  ChangeColor(theme_number);
}

startt();
