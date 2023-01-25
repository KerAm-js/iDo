import { LanguageType } from "../redux/types/prefs";
import {
  CALENDAR_DAY,
  EXPIRED,
  FOR_TODAY,
  FOR_TOMORROW,
  FOR_WEEK,
  LATER,
  NEXT_WEEK,
  TODAY,
  TOMORROW,
  YESTERDAY,
} from "./constants/periods";

export const languageTexts = {
  ru: {
    notifications: {
      taskReminder: {
        title: "Напоминание о задаче"
      },
      regularTaskIsAdded: {
        title: "Новая ежедневная задача 🔁",
        body: "Задача будет автоматически добавляться каждый день. Чтобы остановить повторение этой задачи, удалите или отредактируйте её последнюю копию.",
      },
      regularTaskRemoved: {
        title: "Ежедневная задача удалена ❌",
      },
      autoReminderEnabled: {
        title: "Автоматические напоминания",
        body: "К каждой задаче автоматически будет добавляться напоминание за 15 минут до времени выполнения"
      }
    },
    alerts: {
      taskUncompleting: {
        title: "Внимание!",
        subTitle: "Задача будет засчитана в статистике, как просроченная",
      },
      taskTimeIsNotChoosen: {
        title: "Пожалуйста, выберите дату выполнения задачи"
      }
    },
    sectionEmptyList: {
      [FOR_TODAY]: "Что делаем сегодня?",
      [FOR_WEEK]: "Какие планы на неделю?",
      [FOR_TOMORROW]: "Что планируете на завтра?",
      [EXPIRED]: "Нет просроченных задач",
      [LATER]: 'Нет задач на более позднее время',
      [CALENDAR_DAY]: 'На этот день задач не запланировано',
    },
    popupTitles: {
      taskCategories: "Категории задач",
      dateOfCompletion: "Дата выполнения",
      reminder: "Напоминание",
      language: "Язык",
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
      shorts: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
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
      ],
    },
    periods: {
      [EXPIRED]: "Просрочено",
      [YESTERDAY]: "Вчера",
      [TODAY]: "Сегодня",
      [FOR_TODAY]: "На сегодня",
      [TOMORROW]: "Завтра",
      [FOR_TOMORROW]: "На завтра",
      [LATER]: 'Позже',
      [CALENDAR_DAY]: 'Календарный день',
      minute: "Минута",
      hour: "Час",
      day: "День",
      days: "Дни",
      week: "Неделя",
      [FOR_WEEK]: "На неделю",
      [NEXT_WEEK]: "На след. неделю",
      weeks: "Недели",
      month: "Месяц",
      forMonth: "На месяц",
      months: "Месяцы",
      year: "Год",
      years: "Года",
      midnight: 'Полночь'
    },
    languages: {
      en: "Английский",
      ru: "Русский",
      ch: "Чеченский",
      de: "Немецкий",
    },
    words: {
      calendar: 'Календарь',
      nightTheme: "Ночной режим",
      version: "Версия",
      beta: "Бета",
      save: "Сохранить",
      delete: "Удалить",
      done: "Готово",
      time: "Время",
      choose: "Выбрать",
      task: "Задача",
      description: "Описание",
      completed: "Выполнено",
      cancel: "Отмена",
      close: 'Закрыть',
      ok: "Ок",
    },
    prefsTitles: {
      autoReminder: "Автоматические напоминания",
      disableCompletedTasksReminders: "Не напоминать о выполненных задачах"
    },
    periodsDeclination: {
      one: {
        minute: "Минута",
        hour: "Час",
        day: "День",
        week: "Неделя",
      },
      lessThan5: {
        minute: "Минуты",
        hour: "Часа",
        day: "Дня",
        week: "Недели",
      },
      equalAndMoreThan5: {
        minute: "Минут",
        hour: "Часов",
        day: "Дней",
        week: "Недель",
      },
    },
    screenTitles: {
      main: "Главная",
      preferences: "Настройки",
    },
    habitsPeriods: {
      daily: 'Ежедневно',
    }
  },
  en: {
    notifications: {
      taskReminder: {
        title: "Task reminder"
      },
      regularTaskIsAdded: {
        title: "New daily task 🔁",
        body: "The task will be added automatically every day. Delete or edit this task to stop it's repeating.",
      },
      regularTaskRemoved: {
        title: "Daily task removed ❌",
      },
      autoReminderEnabled: {
        title: "Automatic reminders",
        body: "A reminder will automatically be added to each task for 15 minutes before it's completion time"
      }
    },
    alerts: {
      taskUncompleting: {
        title: "Attention!",
        subTitle: "The task will be counted in the statistics as overdue",
      },
      taskTimeIsNotChoosen: {
        title: "Please, select a due date for the task"
      }
    },
    sectionEmptyList: {
      [FOR_TODAY]: "What are we doing today?",
      [FOR_WEEK]: "What are you planning for a week?",
      [FOR_TOMORROW]: "What are the plans for tomorrow?",
      [EXPIRED]: "No expired tasks",
      [LATER]: 'No tasks for a later time',
      [CALENDAR_DAY]: 'No tasks scheduled for this day',
    },
    popupTitles: {
      taskCategories: "Task categories",
      dateOfCompletion: "Date of completion",
      reminder: "Reminder",
      language: "Language",
    },
    words: {
      calendar: 'Calendar',
      nightTheme: "Night theme",
      version: "Version",
      beta: "Beta",
      save: "Save",
      delete: "Delete",
      done: "Done",
      time: "Time",
      choose: "Choose",
      task: "Task",
      description: "Description",
      completed: "Completed",
      cancel: "Cancel",
      close: 'Close',
      ok: "Ok",
    },
    screenTitles: {
      main: "Main",
      preferences: "Preferences",
    },
    prefsTitles: {
      autoReminder: "Automatic reminders",
      disableCompletedTasksReminders: "Don't remind about completed tasks"
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
      shorts: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    },
    months: {
      names: [
        "January",
        "February",
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
        "January",
        "February",
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
      ],
    },
    periods: {
      [EXPIRED]: "Expired",
      [YESTERDAY]: "Yesterday",
      [TODAY]: "Today",
      [TOMORROW]: "Tomorrow",
      [FOR_TODAY]: "For today",
      [FOR_TOMORROW]: "For tomorrow",
      [LATER]: 'later',
      [CALENDAR_DAY]: 'Calendar day',
      day: "Dat",
      days: "Days",
      week: "Week",
      [FOR_WEEK]: "For week",
      [NEXT_WEEK]: "Next week",
      weeks: "Weeks",
      month: "Month",
      forMonth: "For month",
      months: "Months",
      year: "Year",
      years: "Years",
      midnight: 'Midnight'
    },
    languages: {
      en: "English",
      ru: "Russian",
      ch: "Chechen",
      de: "Deutsch",
    },
    periodsDeclination: {
      one: {
        minute: "Minute",
        hour: "Hour",
        day: "Day",
        week: "Week",
      },
      moreThanOne: {
        minute: "Minutes",
        hour: "Hours",
        day: "Days",
        week: "Weeks",
      },
    },
    habitsPeriods: {
      daily: 'Daily',
    }
  },
  de: {
    notifications: {
      taskReminder: {
        title: "Aufgabenerinnerung"
      },
      regularTaskIsAdded: {
        title: "Neue Tagesaufgabe 🔁",
        body: "Die Aufgabe wird jeden Tag automatisch hinzugefügt. Um zu verhindern, dass sich diese Aufgabe wiederholt, löschen oder bearbeiten Sie die letzte Kopie.",
      },
      regularTaskRemoved: {
        title: "Tägliche Aufgabe entfernt ❌",
      },
      autoReminderEnabled: {
        title: "Automatische Erinnerungen",
        body: "15 Minuten vor Fälligkeit wird jeder Aufgabe automatisch eine Erinnerung hinzugefügt"
      }
    },
    alerts: {
      taskUncompleting: {
        title: "Aufmerksamkeit!",
        subTitle: "Die Aufgabe wird in der Statistik als überfällig gezählt",
      },
      taskTimeIsNotChoosen: {
        title: "Bitte wählen Sie ein Fälligkeitsdatum für die Aufgabe aus"
      }
    },
    sectionEmptyList: {
      [FOR_TODAY]: "Was machen wir heute?",
      [FOR_WEEK]: "Was sind deine Pläne für die Woche?",
      [FOR_TOMORROW]: "Was hast du für morgen vor?",
      [EXPIRED]: "Keine überfälligen Aufgaben",
      [LATER]: 'Keine Aufgaben für später',
      [CALENDAR_DAY]: 'Für diesen Tag sind keine Aufgaben geplant'
    },
    popupTitles: {
      taskCategories: "Aufgabenkategorie",
      dateOfCompletion: "Datum der Fertigstellung",
      reminder: "Erinnerung",
      language: "Sprache",
    },
    screenTitles: {
      main: "Startseite",
      preferences: "Einstellungen",
    },
    words: {
      calendar: 'Kalender',
      nightTheme: "Nachtmodus",
      beta: "Beta",
      version: "Ausführung",
      save: "Speichern",
      delete: "Löschen",
      done: "Bereit",
      time: "Zeit",
      choose: "Wählen",
      task: "Aufgabe",
      description: "Beschreibung",
      completed: "Erledigt",
      cancel: "Abbruch",
      close: "Schließen",
      ok: "Ok",
    },
    prefsTitles: {
      autoReminder: "Automatische Erinnerungen",
      disableCompletedTasksReminders: "Lassen Sie sich nicht an erledigte Aufgaben erinnern"
    },
    weekDays: {
      fulls: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
      ],
      shorts: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    },
    months: {
      names: [],
      fulls: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],
      shorts: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
      ],
    },
    periods: {
      [EXPIRED]: "Abgelaufen",
      [YESTERDAY]: "Gestern",
      [TODAY]: "Heute",
      [TOMORROW]: "Morgen",
      [FOR_TODAY]: "Für heute",
      [FOR_TOMORROW]: "Für morgen",
      [LATER]: 'Später',
      [CALENDAR_DAY]: 'Kalendertag',
      day: "Tag",
      days: "Tage",
      week: "Woche",
      [FOR_WEEK]: "Eine Woche lang",
      [NEXT_WEEK]: "Für die nächste Woche",
      weeks: "Wochen",
      month: "Monat",
      months: "Monate",
      year: "Jahr",
      years: "Jahre",
      midnight: "Mitternacht",
    },
    languages: {
      en: "Englisch",
      ru: "Russisch",
      ch: "Tschetschenisch",
      de: "Deutsch",
    },
    periodsDeclination: {
      one: {
        minute: "Minute",
        hour: "Stunde",
        day: "Tag",
        week: "Woche",
      },
      moreThanOne: {
        minute: "Minuten",
        hour: "Stunden",
        day: "Tage",
        week: "Wochen",
      },
    },
    habitsPeriods: {
      daily: 'Tagli',
    }
  },
  ch: {
    notifications: {
      taskReminder: {
        title: "ГIуллакх дагадаийтар"
      },
      regularTaskIsAdded: {
        title: "Керла хIор дийнан гIуллакх 🔁",
        body: "ХIара гIуллакх хIор дийнан къепйозан тIекхетар долуш ду. Нагахь хьайна и сацо лаахь, кху гIуллакхийн тIеххьара кеп хийца я къепйозан юкъара дIаяккха.",
      },
      regularTaskRemoved: {
        title: "ХIор дийнан гIуллакх сацадина ❌"
      },
      autoReminderEnabled: {
        title: "Ша-шаха дагадийтар",
        body: "ХIора гIуллакх цуьнан кхочушдаран хан тIекхачале 15 минот хьалха дагадоуьйтур долуш ду."
      }
    },
    alerts: {
      taskUncompleting: {
        title: "Тидам белахь!",
        subTitle: "ХIокху гIуллакхийн хан тиллина лорур ю хьуна",
      },
      taskTimeIsNotChoosen: {
        title: "Цкъа хьалха гIуллакх кхочушдаран хан харжа еза"
      }
    },
    sectionEmptyList: {
      [FOR_TODAY]: "Тахана хIун до вай?",
      [FOR_WEEK]: "Кху кIиранахь хIун дича бакъахь хира дара те?",
      [FOR_TOMORROW]: "Кханаьнна да хIумма дуй?",
      [EXPIRED]: "Тиллина хIумма а дац",
      [LATER]: 'Кхиъ тIаьхьа гIуллакхаш дац',
      [CALENDAR_DAY]: 'Кху даьнна плане хIоттийна гIуллакхаш дац'
    },
    popupTitles: {
      taskCategories: "ГIуллакхийн категориш",
      dateOfCompletion: "Кхочушдаран терахь",
      reminder: "Дагадаийтар",
      language: "Мотт",
    },
    screenTitles: {
      main: "Коьртнаг",
      preferences: "Нисдарш",
    },
    words: {
      calendar: 'Календарь',
      nightTheme: "Буьйсанан раж",
      beta: "Бета",
      version: "Верси",
      save: "Iалашдан",
      delete: "ДIадаккха",
      done: "Кийча ю",
      time: "Хан",
      choose: "Харжа",
      task: "ГIуллакх",
      description: "Хаам",
      completed: "Кхочушдина",
      cancel: "Юхадаккха",
      close: "ДIакъовла",
      ok: "Дика ду",
    },
    prefsTitles: {
      autoReminder: "Ша-шаха дагадаийтар",
      disableCompletedTasksReminders: "Кхочушдина гIулаккхаш дага ма дахкийта"
    },
    weekDays: {
      fulls: [
        "КIиранде",
        "Оршот",
        "Шинара",
        "Кхаара",
        "Еара",
        "ПIераска",
        "Шот",
      ],
      shorts: ["КI", "Ор", "Ши", "Кх", "Еа", "ПI", "Шо"],
    },
    months: {
      names: [],
      fulls: [
        "Кхолламан",
        "Чиллин",
        "Бекарг",
        "Оханан",
        "ХIутосург",
        "Асаран",
        "Мангалан",
        "Хьаьттан",
        "Тов-бецан",
        "Эсаран",
        "Лахьанан",
        "ГIуран",
      ],
      shorts: [
        "Кхл",
        "Члн",
        "Бкг",
        "Охн",
        "ХIт",
        "Аср",
        "Мнг",
        "Хьт",
        "Твб",
        "Эср",
        "Лхь",
        "ГIр",
      ],
    },
    periods: {
      [EXPIRED]: "Тиллина",
      [YESTERDAY]: "Селхана",
      [TODAY]: "Тахана",
      [TOMORROW]: "Кхана",
      [FOR_TODAY]: "Таханаьнна",
      [FOR_TOMORROW]: "Кханаьнна",
      [LATER]: 'ТIаьхьа',
      [CALENDAR_DAY]: 'Календаран де',
      minute: "Минот",
      hour: "Сахьт",
      day: "Де",
      days: "Денош",
      week: "КIира",
      weeks: "КIиранаш",
      [FOR_WEEK]: "КIиранна",
      [NEXT_WEEK]: "ТIедогIу кIиранна",
      month: "Бутт",
      months: "Беттанаш",
      year: "Шо",
      years: "Шеранаш",
      midnight: 'Ахбуьйса'
    },
    periodsDeclination: {
      minute: "Минот",
      hour: "Сахьт",
      day: "Де",
      week: "КIира",
    },
    languages: {
      en: "Ингалсан",
      ru: "Оьрсийн",
      ch: "Нохчийн",
      de: "Немцойн",
    },
    habitsPeriods: {
      daily: 'ХIор дийнахь',
    }
  },
};

export const lagnuages: Array<LanguageType> = ["ch", "en", "ru", "de"];
