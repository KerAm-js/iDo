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
  notifications: {
    taskReminder: {
      title: {
        ru: "Напоминание о задаче",
        en: "Task reminder",
        de: "Aufgabenerinnerung",
        ch: "ГIуллакх дагадаийтар",
      },
    },
    regularTaskIsAdded: {
      title: {
        ru: "Новая ежедневная задача 🔁",
        en: "New daily task 🔁",
        de: "Neue Tagesaufgabe 🔁",
        ch: "Керла хIор дийнан гIуллакх 🔁",
      },
      body: {
        ru: "Задача будет автоматически добавляться каждый день. Чтобы остановить повторение этой задачи, удалите или отредактируйте её последнюю копию.",
        en: "The task will be added automatically every day. Delete or edit this task to stop it's repeating.",
        de: "Die Aufgabe wird jeden Tag automatisch hinzugefügt. Um zu verhindern, dass sich diese Aufgabe wiederholt, löschen oder bearbeiten Sie die letzte Kopie.",
        ch: "ХIара гIуллакх хIор дийнан къепйозан тIекхетар долуш ду. Нагахь хьайна и сацо лаахь, кху гIуллакхийн тIеххьара кеп хийца я къепйозан юкъара дIаяккха.",
      },
    },
    regularTaskRemoved: {
      title: {
        ru: "Ежедневная задача удалена ❌",
        en: "Daily task removed ❌",
        de: "Tägliche Aufgabe entfernt ❌",
        ch: "ХIор дийнан гIуллакх сацадина ❌",
      },
    },
    autoReminderEnabled: {
      title: {
        ru: "Автоматические напоминания",
        en: "Automatic reminders",
        de: "Automatische Erinnerungen",
        ch: "Ша-шаха дагадийтар",
      },
      body: {
        ru: "К каждой задаче автоматически будет добавляться напоминание за 15 минут до времени выполнения",
        en: "A reminder will automatically be added to each task for 15 minutes before it's completion time",
        de: "15 Minuten vor Fälligkeit wird jeder Aufgabe automatisch eine Erinnerung hinzugefügt",
        ch: "ХIора гIуллакх цуьнан кхочушдаран хан тIекхачале 15 минот хьалха дагадоуьйтур долуш ду.",
      },
    },
  },
  alerts: {
    taskUncompleting: {
      title: {
        ru: "Внимание!",
        en: "Attention!",
        de: "Aufmerksamkeit!",
        ch: "Тидам белахь!",
      },
      subTitle: {
        ru: "Задача будет засчитана в статистике, как просроченная",
        en: "The task will be counted in the statistics as overdue",
        de: "Die Aufgabe wird in der Statistik als überfällig gezählt",
        ch: "ХIокху гIуллакхийн хан тиллина лорур ю хьуна",
      },
    },
    taskTimeIsNotChoosen: {
      title: {
        ru: "Пожалуйста, выберите дату выполнения задачи",
        en: "Please, select a due date for the task",
        de: "Bitte wählen Sie ein Fälligkeitsdatum für die Aufgabe aus",
        ch: "Цкъа хьалха гIуллакх кхочушдаран хан харжа еза",
      },
    },
  },
  sectionEmptyList: {
    [FOR_TODAY]: {
      ru: "Что делаем сегодня?",
      en: "What are we doing today?",
      de: "Was machen wir heute?",
      ch: "Тахана хIун до вай?",
    },
    [FOR_WEEK]: {
      ru: "Какие планы на неделю?",
      en: "What are you planning for a week?",
      de: "Was sind deine Pläne für die Woche?",
      ch: "Кху кIиранахь хIун дича бакъахь хира дара те?",
    },
    [FOR_TOMORROW]: {
      ru: "Что планируете на завтра?",
      en: "What are the plans for tomorrow?",
      de: "Was hast du für morgen vor?",
      ch: "Кханаьнна да хIумма дуй?",
    },
    [EXPIRED]: {
      ru: "Нет просроченных задач",
      en: "No expired tasks",
      de: "Keine überfälligen Aufgaben",
      ch: "Тиллина хIумма а дац",
    },
    [LATER]: {
      ru: "Нет задач на более позднее время",
      en: "No tasks for a later time",
      de: "Keine Aufgaben für später",
      ch: "Кхиъ тIаьхьа гIуллакхаш дац",
    },
    [CALENDAR_DAY]: {
      ru: "На этот день задач не запланировано",
      en: "No tasks scheduled for this day",
      de: "Für diesen Tag sind keine Aufgaben geplant",
      ch: "Кху даьнна плане хIоттийна гIуллакхаш дац",
    },
  },
  popupTitles: {
    taskCategories: {
      ru: "Категории задач",
      en: "Task categories",
      de: "Aufgabenkategorie",
      ch: "ГIуллакхийн категориш",
    },
    dateOfCompletion: {
      ru: "Дата выполнения",
      en: "Date of completion",
      de: "Datum der Fertigstellung",
      ch: "Кхочушдаран терахь",
    },
    reminder: {
      ru: "Напоминание",
      en: "Reminder",
      de: "Erinnerung",
      ch: "Дагадаийтар",
    },
    language: {
      ru: "Язык",
      en: "Language",
      de: "Sprache",
      ch: "Мотт",
    },
  },
  weekDays: {
    fulls: [
      {
        ru: "Воскресенье",
        en: "Sunday",
        de: "Sonntag",
        ch: "КIиранде",
      },
      {
        ru: "Понедельник",
        en: "Monday",
        de: "Montag",
        ch: "Оршот",
      },
      {
        ru: "Вторник",
        en: "Tuesday",
        de: "Dienstag",
        ch: "Шинара",
      },
      {
        ru: "Среда",
        en: "Wednesday",
        de: "Mittwoch",
        ch: "Кхаара",
      },
      {
        ru: "Четверг",
        en: "Thursday",
        de: "Donnerstag",
        ch: "Еара",
      },
      {
        ru: "Пятница",
        en: "Friday",
        de: "Freitag",
        ch: "ПIераска",
      },
      {
        ru: "Суббота",
        en: "Saturday",
        de: "Samstag",
        ch: "Шот",
      },
    ],
    shorts: [
      {
        ru: "Вс",
        en: "Su",
        de: "So",
        ch: "КI",
      },
      {
        ru: "Пн",
        en: "Mo",
        de: "Mo",
        ch: "Ор",
      },
      {
        ru: "Вт",
        en: "Tu",
        de: "Di",
        ch: "Ши",
      },
      {
        ru: "Ср",
        en: "We",
        de: "Mi",
        ch: "Кх",
      },
      {
        ru: "Чт",
        en: "Th",
        de: "Do",
        ch: "Еа",
      },
      {
        ru: "Пт",
        en: "Fr",
        de: "Fr",
        ch: "ПI",
      },
      {
        ru: "Сб",
        en: "Sa",
        de: "Sa",
        ch: "Шо",
      },
    ],
  },
  months: {
    names: [
      {
        ru: "Январь",
        en: "January",
        de: "Januar",
        ch: "Кхолламан",
      },
      {
        ru: "Февраль",
        en: "February",
        de: "Februar",
        ch: "Чиллин",
      },
      {
        ru: "Март",
        en: "March",
        de: "März",
        ch: "Бекарг",
      },
      {
        ru: "Апрель",
        en: "April",
        de: "April",
        ch: "Оханан",
      },
      {
        ru: "Май",
        en: "May",
        de: "Mai",
        ch: "ХIутосург",
      },
      {
        ru: "Июнь",
        en: "June",
        de: "Juni",
        ch: "Асаран",
      },
      {
        ru: "Июль",
        en: "July",
        de: "Juli",
        ch: "Мангалан",
      },
      {
        ru: "Август",
        en: "August",
        de: "August",
        ch: "Хьаьттан",
      },
      {
        ru: "Сентябрь",
        en: "September",
        de: "September",
        ch: "Тов-бецан",
      },
      {
        ru: "Октябрь",
        en: "October",
        de: "Oktober",
        ch: "Эсаран",
      },
      {
        ru: "Ноябрь",
        en: "November",
        de: "November",
        ch: "Лахьанан",
      },
      {
        ru: "Декабрь",
        en: "December",
        de: "Dezember",
        ch: "ГIуран",
      },
    ],
    fulls: [
      {
        ru: "Января",
        en: "January",
        de: "Januar",
        ch: "Кхолламан",
      },
      {
        ru: "Февраля",
        en: "February",
        de: "Februar",
        ch: "Чиллин",
      },
      {
        ru: "Марта",
        en: "March",
        de: "März",
        ch: "Бекарг",
      },
      {
        ru: "Апреля",
        en: "April",
        de: "April",
        ch: "Оханан",
      },
      {
        ru: "Мая",
        en: "May",
        de: "Mai",
        ch: "ХIутосург",
      },
      {
        ru: "Июня",
        en: "June",
        de: "Juni",
        ch: "Асаран",
      },
      {
        ru: "Июля",
        en: "July",
        de: "Juli",
        ch: "Мангалан",
      },
      {
        ru: "Августа",
        en: "August",
        de: "August",
        ch: "Хьаьттан",
      },
      {
        ru: "Сентября",
        en: "September",
        de: "September",
        ch: "Тов-бецан",
      },
      {
        ru: "Октября",
        en: "October",
        de: "Oktober",
        ch: "Эсаран",
      },
      {
        ru: "Ноября",
        en: "November",
        de: "November",
        ch: "Лахьанан",
      },
      {
        ru: "Декабря",
        en: "December",
        de: "Dezember",
        ch: "ГIуран",
      },
    ],
    shorts: [
      {
        ru: "Янв",
        en: "Jan",
        de: "Jan",
        ch: "Кхл",
      },
      {
        ru: "Фев",
        en: "Feb",
        de: "Feb",
        ch: "Чил",
      },
      {
        ru: "Мар",
        en:  "Mar",
        de: "Mär",
        ch: "Бкг",
      },
      {
        ru: "Апр",
        en: "Apr",
        de: "Apr",
        ch: "Охн",
      },
      {
        ru: "Май",
        en: "May",
        de: "Mai",
        ch: "ХIт",
      },
      {
        ru: "Июн",
        en: "Jun",
        de: "Jun",
        ch: "Аср",
      },
      {
        ru: "Июл",
        en: "Jul",
        de: "Jul",
        ch: "Мнг",
      },
      {
        ru: "Авг",
        en: "Aug",
        de: "Aug",
        ch: "Хьт",
      },
      {
        ru: "Сен",
        en: "Sep",
        de: "Sep",
        ch: "Твб",
      },
      {
        ru: "Окт",
        en: "Oct",
        de: "Okt",
        ch: "Эср",
      },
      {
        ru: "Ноя",
        en: "Nov",
        de: "Nov",
        ch: "Лхь",
      },
      {
        ru: "Дек",
        en: "Dec",
        de: "Dez",
        ch: "ГIр",
      },
    ],
  },
  periods: {
    [EXPIRED]: {
      ru: "Просрочено",
      en: "Expired",
      de: "Abgelaufen",
      ch: "Тиллина",
    },
    [YESTERDAY]: {
      ru: "Вчера",
      en: "Yesterday",
      de: "Gestern",
      ch: "Селхана",
    },
    [TODAY]: {
      ru: "Сегодня",
      en: "Today",
      de: "Heute",
      ch: "Тахана",
    },
    [FOR_TODAY]: {
      ru: "На сегодня",
      en: "For today",
      de: "Für heute",
      ch: "Таханаьнна",
    },
    [TOMORROW]: {
      ru: "Завтра",
      en: "Tomorrow",
      de: "Morgen",
      ch: "Кхана",
    },
    [FOR_TOMORROW]: {
      ru: "На завтра",
      en: "For tomorrow",
      de: "Für morgen",
      ch: "Кханаьнна",
    },
    [LATER]: {
      ru: "Позже",
      en: "later",
      de: "Später",
      ch: "ТIаьхьа",
    },
    [CALENDAR_DAY]: {
      ru: "Календарный день",
      en: "Calendar day",
      de: "Kalendertag",
      ch: "Календаран де",
    },
    day: {
      ru: "День",
      en: "Day",
      de: "Tag",
      ch: "Де",
    },
    days: {
      ru: "Дни",
      en: "Days",
      de: "Tage",
      ch: "Денош",
    },
    week: {
      ru: "Неделя",
      en: "Week",
      de: "Woche",
      ch: "КIира",
    },
    [FOR_WEEK]: {
      ru: "На неделю",
      en: "For week",
      de: "Eine Woche lang",
      ch: "КIиранна",
    },
    [NEXT_WEEK]: {
      ru: "На след. неделю",
      en: "Next week",
      de: "Für die nächste Woche",
      ch: "ТIедогIу кIиранна",
    },
    weeks: {
      ru: "Недели",
      en: "Weeks",
      de: "Wochen",
      ch: "КIиранаш",
    },
    month: {
      ru: "Месяц",
      en: "Month",
      de: "Monat",
      ch: "Бутт",
    },
    months: {
      ru: "Месяцы",
      en: "Months",
      de: "Monate",
      ch: "Беттанаш",
    },
    year: {
      ru: "Год",
      en: "Year",
      de: "Jahr",
      ch: "Шо",
    },
    years: {
      ru: "Года",
      en: "Years",
      de: "Jahre",
      ch: "Шеранаш",
    },
    midnight: {
      ru: "Полночь",
      en: "Midnight",
      de: "Mitternacht",
      ch: "Ахбуьйса",
    },
  },
  languages: {
    en: {
      ru: "Английский",
      en: "English",
      de: "Englisch",
      ch: "Ингалсан",
    },
    ru: {
      ru: "Русский",
      en: "Russian",
      de: "Russisch",
      ch: "Оьрсийн",
    },
    ch: {
      ru: "Чеченский",
      en: "Chechen",
      de: "Tschetschenisch",
      ch: "Нохчийн",
    },
    de: {
      ru: "Немецкий",
      en: "Deutsch",
      de: "Deutsch",
      ch: "Немцойн",
    },
  },
  words: {
    rateApplication: {
      ru:"Оценить приложение",
      en:"Rate application",
      de:"RateAnwendung",
      ch:"Программин мах хадо",
    }, 
    complete: {
      ru:"Выполнить",
      en:"Complete",
      de:"Komplett",
      ch:"Кхочушдан",
    }, 
    calendar: {
      ru:"Календарь",
      en:"Calendar",
      de:"Kalender",
      ch:"Календарь",
    },
    nightTheme: {
      ru:"Ночной режим",
      en:"Night theme",
      de: "Nachtmodus",
      ch:"Буьйсанан раж",
    },
    version: {
      ru:"Версия",
      en:"Version",
      de:"Ausführung",
      ch:"Верси",
    },
    beta: {
      ru:"Бета",
      en:"Beta",
      de:"Beta",
      ch:"Бета",
    },
    save: {
      ru:"Сохранить",
      en: "Save",
      de:"Speichern",
      ch:"Iалашдан",
    },
    delete: {
      ru:"Удалить",
      en:"Delete",
      de:"Löschen",
      ch:"ДIадаккха",
    },
    done: {
      ru:"Готово",
      en:"Done",
      de:"Bereit",
      ch:"Кийча ю",
    },
    time: {
      ru:"Время",
      en:"Time",
      de:"Zeit",
      ch:"Хан",
    },
    choose: {
      ru:"Выбрать",
      en:"Choose",
      de:"Wählen",
      ch:"Харжа",
    },
    task: {
      ru:"Задача",
      en:"Task",
      de:"Aufgabe",
      ch:"ГIуллакх",
    },
    description: {
      ru:"Описание",
      en:"Description",
      de:"Beschreibung",
      ch:"Хаам",
    },
    completed: {
      ru:"Выполнено",
      en:"Completed",
      de:"Erledigt",
      ch:"Кхочушдина",
    },
    cancel: {
      ru:"Отмена",
      en:"Cancel",
      de:"Abbruch",
      ch:"Юхадаккха",
    },
    close: {
      ru:"Закрыть",
      en:"Close",
      de:"Schließen",
      ch:"ДIакъовла",
    },
    ok: {
      ru:"Ок",
      en:"Ok",
      de:"Ok",
      ch:"Дика ду",
    },
  },
  prefsTitles: {
    autoReminder: {
      ru:"Автоматические напоминания",
      en:"Automatic reminders",
      de:"Automatische Erinnerungen",
      ch:"Ша-шаха дагадаийтар",
    },
    disableCompletedTasksReminders: {
      ru:"Не напоминать о выполненных задачах",
      en:"Don't remind about completed tasks",
      de:"Lassen Sie sich nicht an erledigte Aufgaben erinnern",
      ch:"Кхочушдина гIулаккхаш дага ма дахкийта",
    },
  },
  periodsDeclination: {
    one: {
      minute: {
        ru:"Минута",
        en:"Minute",
        de:"Minute",
        ch:"Минот",
      },
      hour: {
        ru:"Час",
        en:"Hour",
        de:"Stunde",
        ch: "Сахьт",
      },
      day: {
        ru:"День",
        en:"Day",
        de:"Tag",
        ch:"Де",
      },
      week: {
        ru:"Неделя",
        en:"Week",
        de:"Woche",
        ch:"КIира",
      },
    },
    lessThan5: {
      minute: {
        ru:"Минуты",
        en:"Minutes",
        de:"Minuten",
        ch:"Минот",
      },
      hour: {
        ru:"Часа",
        en:"Hours",
        de:"Stunden",
        ch: "Сахьт",
      },
      day: {
        ru:"Дня",
        en:"Days",
        de:"Tage",
        ch:"Де",
      },
      week: {
        ru:"Недели",
        en:"Weeks",
        de:"Wochen",
        ch:"КIира",
      },
    },
    equalAndMoreThan5: {
      minute: {
        ru:"Минут",
        en:"Minutes",
        de:"Minuten",
        ch:"Минот",
      },
      hour: {
        ru:"Часов",
        en:"Hours",
        de:"Stunden",
        ch: "Сахьт",
      },
      day: {
        ru:"Дней",
        en:"Days",
        de:"Tage",
        ch:"Де",
      },
      week: {
        ru:"Недель",
        en:"Weeks",
        de:"Wochen",
        ch:"КIира",
      },
    },
  },
  screenTitles: {
    home: {
      ru:"Главная",
      en:"Main",
      de:"Startseite",
      ch:"Коьртнаг",
    },
    prefs: {
      ru:"Настройки",
      en:"Preferences",
      de:"Einstellungen",
      ch:"Нисдарш",
    },
  },
  habitsPeriods: {
    daily: {
      ru:"Ежедневно",
      en:"Daily",
      de:"Tagli",
      ch:"ХIор дийнахь",
    },
  },
};

export const lagnuages: Array<LanguageType> = ["ch", "en", "ru", "de"];
