import { LanguageType } from '../redux/types/prefs';
import { LanguageTextsType } from '../types/languageTexts';
import { EXPIRED, FOR_TODAY, FOR_TOMORROW, FOR_WEEK, NEXT_WEEK, TODAY, TOMORROW, YESTERDAY } from './constants/periods';

export const languageTexts: LanguageTextsType = {
  ru: {
    sectionEmptyList: {
      [FOR_TODAY]: 'Что делаем',
      [FOR_WEEK]: 'Что планируете',
      [FOR_TOMORROW]: 'Какие планы',
      [EXPIRED]: 'Нет просроченных задач',
    },
    popupTitles: {
      taskCategories: 'Категории задач',
      dateOfCompletion: 'Дата выполнения',
      reminder: 'Напоминание',
      language: 'Язык'
    },
    weekDays: {
      fulls: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      ],
      shorts: [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
      ]
    },
    months: {
      names: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      fulls: [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ],
      shorts: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ]
    },
    periods: {
      [EXPIRED]: 'Просрочено',
      [YESTERDAY]: 'Вчера',
      [TODAY]: 'Сегодня',
      [FOR_TODAY]: 'На сегодня',
      [TOMORROW]: 'Завтра',
      [FOR_TOMORROW]: 'На завтра',
      day: 'День',
      days: 'Дни',
      week: 'Неделя',
      [FOR_WEEK]: 'На неделю',
      [NEXT_WEEK]: 'На след. неделю',
      weeks: 'Недели',
      month: 'Месяц',
      forMonth: 'На месяц',
      months: 'Месяцы',
      year: 'Год',
      years: 'Года',
    },
    languages: {
      en: 'Английский',
      ru: 'Русский',
      ch: 'Чеченский',
      de: 'Немецкий'
    },
    words: {
      nightTheme: 'Ночной режим',
      version: 'Версия',
      beta: 'Бета',
      save: 'Сохранить',
      done: 'Готово',
      time: 'Время',
      choose: 'Выбрать',
      task: 'Задача',
      description: 'Описание'
    },
    screenTitles: {
      main: 'Главная',
      preferences: 'Настройки'
    }
  },
  en: {
    sectionEmptyList: {
      [FOR_TODAY]: 'What are we doing',
      [FOR_WEEK]: 'What are you planning',
      [FOR_TOMORROW]: 'What are the plans',
      [EXPIRED]: 'No expired tasks',
    },
    popupTitles: {
      taskCategories: 'Task categories',
      dateOfCompletion: 'Date of completion',
      reminder: 'Reminder',
      language: 'Language'
    },
    words: {
      nightTheme: 'Night theme',
      version: 'Version',
      beta: 'Beta',
      save: 'Save',
      done: 'Done',
      time: 'Time',
      choose: 'Choose',
      task: 'Task',
      description: 'Description'
    },
    screenTitles: {
      main: 'Main',
      preferences: 'Preferences'
    },
    weekDays: {
      fulls: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      ],
      shorts: [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
      ]
    },
    months: {
      names: [
        'January',
        'February',
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      fulls: [
        'January',
        'February',
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      shorts: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
    },
    periods: {
      [EXPIRED]: 'Expired',
      [YESTERDAY]: 'Yesterday',
      [TODAY]: 'Today',
      [TOMORROW]: 'Tomorrow',
      [FOR_TODAY]: 'For today',
      [FOR_TOMORROW]: 'For tomorrow',
      day: 'Dat',
      days: 'Days',
      week: 'Week',
      [FOR_WEEK]: 'For week',
      [NEXT_WEEK]: 'Next week',
      weeks: 'Weeks',
      month: 'Month',
      forMonth: 'For month',
      months: 'Months',
      year: 'Year',
      years: 'Years',
    },
    languages: {
      en: 'English',
      ru: 'Russian',
      ch: 'Chechen',
      de: 'Deutsch'
    }
  },
  de: {
    sectionEmptyList: {
      [FOR_TODAY]: '',
      [FOR_WEEK]: '',
      [FOR_TOMORROW]: '',
      [EXPIRED]: '',
    },
    popupTitles: {
      taskCategories: 'Категории задач',
      dateOfCompletion: 'Дата выполнения',
      reminder: 'Напоминание',
      language: 'Язык'
    },
    screenTitles: {
      main: 'Main',
      preferences: 'Preferences'
    },
    words: {
      nightTheme: 'Ночной режим',
      beta: 'Бета',
      version: 'Версия',
      save: 'Сохранить',
      done: 'Готово',
      time: 'Время',
      choose: 'Выбрать',
      task: 'Задача',
      description: 'Описание'
    },
    weekDays: {
      fulls: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      ],
      shorts: [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
      ]
    },
    months: {
      names: [],
      fulls: [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
      ],
      shorts: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ]
    },
    periods: {
      [EXPIRED]: 'Expired',
      [YESTERDAY]: 'Вчера',
      [TODAY]: 'Сегодня',
      [TOMORROW]: 'TOMORROW',
      [FOR_TODAY]: 'For today',
      [FOR_TOMORROW]: 'For tomorrow',
      day: '',
      days: '',
      week: '',
      [FOR_WEEK]: '',
      [NEXT_WEEK]: '',
      weeks: '',
      month: '',
      months: '',
      year: '',
      years: '',
    },
    languages: {
      en: 'Английский',
      ru: 'Русский',
      ch: 'Чеченский',
      de: 'Немецкий'
    }
  },
  ch: {
    sectionEmptyList: {
      [FOR_TODAY]: '',
      [FOR_WEEK]: '',
      [FOR_TOMORROW]: '',
      [EXPIRED]: '',
    },
    popupTitles: {
      taskCategories: 'Категории задач',
      dateOfCompletion: 'Дата выполнения',
      reminder: 'Напоминание',
      language: 'Язык'
    },
    screenTitles: {
      main: 'Main',
      preferences: 'Preferences'
    },
    words: {
      nightTheme: 'Ночной режим',
      beta: 'Бета',
      version: 'Версия',
      save: 'Сохранить',
      done: 'Готово',
      time: 'Время',
      choose: 'Выбрать',
      task: 'Задача',
      description: 'Описание'
    },
    weekDays: {
      fulls: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      ],
      shorts: [
        "Вс",
        "Пн",
        "Вт",
        "Ср",
        "Чт",
        "Пт",
        "Сб",
      ]
    },
    months: {
      names: [],
      fulls: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      shorts: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ]
    },
    periods: {
      [EXPIRED]: 'Expired',
      [YESTERDAY]: 'Селхана',
      [TODAY]: 'Тахана',
      [TOMORROW]: 'Кхана',
      [FOR_TODAY]: 'For today',
      [FOR_TOMORROW]: 'For tomorrow',
      day: 'Де',
      days: 'Денош',
      week: 'КIира',
      weeks: 'КIиранаш',
      [FOR_WEEK]: '',
      [NEXT_WEEK]: '',
      month: 'Бутт',
      months: 'Беттанаш',
      year: 'Шо',
      years: 'Шеранаш',
    },
    languages: {
      en: 'Ингалсанк',
      ru: 'Оьрсийн',
      ch: 'Нохчийн',
      de: 'Немцойн'
    }
  },
}

export const lagnuages: Array<LanguageType> = ['ch', 'en', 'ru', 'de'];