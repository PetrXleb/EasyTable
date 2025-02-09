const lessonsTime = {
  l1: ['8:30', '10:05'],
  l2: ['10:15', '11:50'],
  l3: ['12:20', '13:55'],
  l4: ['14:10', '15:20'],
  l5: ['15:30', '16:40'],
  l6: ['16:50', '17:40'],
};

let timetable_isit4 = {
  name: 'ДГУ: ИСИТ 4',
  twoWeek: true,
  exam: [
    'Управление данными',
    'Роботизированные комплексы и системы',
    'Разработка и управление IT проектами',
  ],
  firstWeek: {
    Monday: [
      lessonsTime.l3[0],
      lessonsTime.l3[1],
      'Упр данными 2п/г',
      'Руденко А.И.',
      '2.12',

      lessonsTime.l4[0],
      lessonsTime.l4[1],
      'Управление данными лек',
      'Шахабудинов Я.М.',
      '2.1',

      lessonsTime.l5[0],
      lessonsTime.l5[1],
      'Упр данными 1п/г',
      'Руденко А.И.',
      '2.12',
    ],
    Tuesday: [],
    Wednesday: [
      lessonsTime.l2[0],
      lessonsTime.l2[1],
      'Разраб и упр IT проектами лек',
      'Махмудов Б.Э.',
      '3.6',

      lessonsTime.l3[0],
      lessonsTime.l3[1],
      'Робот компл и системы лек',
      'Гаджиев А.М.',
      '4.4',

      lessonsTime.l4[0],
      lessonsTime.l4[1],
      'Упр данными 1п/г | Робот компл и системы 2 п/г',
      'Руденко А.И. | Гаджиев А.М.',
      '2.11 | ВЦ',

      lessonsTime.l5[0],
      lessonsTime.l5[1],
      'Робот компл и системы 1 п/г',
      'Гаджиев А.М.',
      'ВЦ',
    ],
    Thursday: [],
    Friday: [
      lessonsTime.l1[0],
      lessonsTime.l1[1],
      'Разраб и упр IT проектами пр',
      'Махмудов Б.Э.',
      '2.1',

      lessonsTime.l2[0],
      lessonsTime.l2[1],
      'Разраб и упр IT проектами пр',
      'Махмудов Б.Э.',
      '3.5',

      lessonsTime.l3[0],
      lessonsTime.l3[1],
      'Упр данными лек',
      'Шахабудинов Я.М.',
      '4.6',
    ],
    Saturday: [
      lessonsTime.l1[0],
      lessonsTime.l1[1],
      'Робот компл и системы 1 п/г',
      'Гаджиев А.М.',
      '2.9',

      lessonsTime.l2[0],
      lessonsTime.l2[1],
      'Робот компл и системы лек',
      'Гаджиев А.М.',
      '4.4',

      lessonsTime.l3[0],
      lessonsTime.l3[1],
      'Робот компл и системы 2 п/г',
      'Гаджиев А.М.',
      '2.9',
    ],
    Sunday: [],
  },
  secondWeek: {
    Monday: [
      lessonsTime.l3[0],
      lessonsTime.l3[1],
      'Упр данными 2 п/г',
      'Руденко А.И.',
      '2.12',

      lessonsTime.l4[0],
      lessonsTime.l4[1],
      'Упр данными лек',
      'Шахабудинов Я.М.',
      '4.4',

      lessonsTime.l5[0],
      lessonsTime.l5[1],
      'Упр данными 1 п/г',
      'Руденко А.И.',
      '2.12',
    ],
    Tuesday: [
      lessonsTime.l3[0],
      lessonsTime.l3[1],
      'Робот компл и системы 2 п/г',
      'Гаджиев А.М.',
      '2.12',

      lessonsTime.l4[0],
      lessonsTime.l4[1],
      'Робот компл и системы лек',
      'Гаджиев А.М.',
      '4.4',

      lessonsTime.l5[0],
      lessonsTime.l5[1],
      'Робот компл и системы 1 п/г',
      'Гаджиев А.М.',
      '2.12',
    ],
    Wednesday: [
      lessonsTime.l1[0],
      lessonsTime.l1[1],
      'Робот компл и системы лек',
      'Гаджиев А.М.',
      '4.4',

      lessonsTime.l2[0],
      lessonsTime.l2[1],
      'Разраб и упр IT проектами лек',
      'Махмудов Б.Э.',
      '2.1',

      lessonsTime.l3[0],
      lessonsTime.l3[1],
      'Упр данными 2 п/г',
      'Руденко А.И.',
      'ВЦ',
    ],
    Thursday: [],
    Friday: [
      lessonsTime.l2[0],
      lessonsTime.l2[1],
      'Робот компл и системы 1п/г',
      'Гаджиев А.М.',
      'ВЦ',

      lessonsTime.l3[0],
      lessonsTime.l3[1],
      'Разраб и упр IT проектами пр',
      'Махмудов Б.Э.',
      '2.1',

      lessonsTime.l4[0],
      lessonsTime.l4[1],
      'Разраб и упр IT проектами лек',
      'Махмудов Б.Э.',
      '4.6',

      lessonsTime.l5[0],
      lessonsTime.l5[1],
      'Робот компл и системы 2п/г',
      'Гаджиев А.М.',
      'ВЦ',
    ],
    Saturday: [],
    Sunday: [],
  },
};

const tabels = [timetable_isit4];
