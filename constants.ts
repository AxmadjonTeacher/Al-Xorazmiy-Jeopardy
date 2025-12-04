import { Category } from './types';

export const GAME_DATA: Category[] = [
  {
    title: 'Present Simple',
    questions: [
      {
        points: 100,
        question: "Polar bears don’t live in hot places",
        subtext: "(So’roqqa aylantiring)",
        answer: "Do polar bears live in hot places?"
      },
      {
        points: 200,
        question: "The lesson start at 8:30 everyday",
        subtext: "(Jumlada xato bormi?)",
        answer: "Ha (start = starts)"
      },
      {
        points: 300,
        question: "Lola washes her hair everyday",
        subtext: "(Inkorga aylantiring)",
        answer: "Lola doesn’t wash her hair everyday"
      },
      {
        points: 400,
        question: "My brother usually plays tennis at the weekend",
        subtext: "(Jumlani tarjima qiling)",
        answer: "Mening akam odatda hafta oxiri tennis o’ynaydi"
      },
      {
        points: 500,
        question: "He often goes to the gym in the morning",
        subtext: "(So’roqqa aylantiring)",
        answer: "Does he often go to the gym in the morning?"
      }
    ]
  },
  {
    title: 'Present Continuous',
    questions: [
      {
        points: 100,
        question: "She is swiming in the pool now",
        subtext: "(Jumlasidagi xatoni toping)",
        answer: "Swimming (double “m”)"
      },
      {
        points: 200,
        question: "I am walking along the street",
        subtext: "(Jumlasini tarjima qiling)",
        answer: "Men ko’cha bo’ylab ketyapman / sayr qilyapman"
      },
      {
        points: 300,
        question: "My dad is repairing the car now",
        subtext: "(Jumlasida xato bormi?)",
        answer: "Yo’q"
      },
      {
        points: 400,
        question: "Men hozir ingliz tilini o’rganyapman",
        subtext: "(Jumlasini tarjima qiling)",
        answer: "I’m learning English now / right now"
      },
      {
        points: 500,
        question: "She is having dinner with his family",
        subtext: "(Jumlada xato bormi?)",
        answer: "Ha (his = her)"
      }
    ]
  },
  {
    title: 'Past Simple',
    questions: [
      {
        points: 100,
        question: "They visited their grandparents last week",
        subtext: "(Jumlani inkorga aylantiring)",
        answer: "They didn’t visit their grandparents last week."
      },
      {
        points: 200,
        question: "She didn’t watch the movie yesterday",
        subtext: "(Jumlasini so’roqqa aylantiring)",
        answer: "Did she watch the movie yesterday?"
      },
      {
        points: 300,
        question: "My father cleaned the house yesterday",
        subtext: "(Jumlada xato bormi?)",
        answer: "Yo’q"
      },
      {
        points: 400,
        question: "Men kecha maktabga bordim",
        subtext: "(Jumlasini tarjima qiling)",
        answer: "I went to school yesterday."
      },
      {
        points: 500,
        question: "He buyed a new laptop last month",
        subtext: "(Jumladagi xatoni toping)",
        answer: "buyed = bought"
      }
    ]
  },
  {
    title: 'Wh-Questions',
    questions: [
      {
        points: 100,
        question: "“Where do you live?”",
        subtext: "(Savolga qisqa javob bering)",
        answer: "I live in ... (o’quvchi o’z hududini aytadi)"
      },
      {
        points: 200,
        question: "What is your mother doing?",
        subtext: "(Jumlani tarjima qiling)",
        answer: "Onangiz nima qilayapti?"
      },
      {
        points: 300,
        question: "My brother plays football after school",
        subtext: "(Who? bilan so’roq tuzing)",
        answer: "Who plays football after school?"
      },
      {
        points: 400,
        question: "They went to Samarkand last summer",
        subtext: "(Where? bilan so’roq tuzing)",
        answer: "Where did they go last summer?"
      },
      {
        points: 500,
        question: "She met her best friend yesterday",
        subtext: "(When? bilan so’roq tuzing)",
        answer: "When did she meet her best friend?"
      }
    ]
  },
  {
    title: 'Vocabulary',
    questions: [
      {
        points: 100,
        question: "“have breakfast”",
        subtext: "(P. Continuous jumla tuzing)",
        answer: "I’m having breakfast..."
      },
      {
        points: 200,
        question: "“swim”",
        subtext: "(Fe’lining 3 xil shaklini ayting)",
        answer: "swim – swam – swum"
      },
      {
        points: 300,
        question: "“write”",
        subtext: "(V2 shaklini ayting?)",
        answer: "wrote"
      },
      {
        points: 400,
        question: "“Idish-tovoq”",
        subtext: "(Ingiliz Tilda ayting?)",
        answer: "Utensils"
      },
      {
        points: 500,
        question: "Bad",
        subtext: "(Superlative shaklini ayting)",
        answer: "Worst"
      }
    ]
  }
];
