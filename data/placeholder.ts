import { EmailPlaceHolder } from "@/types/email.type";
import { Email } from "@prisma/client";

export const fakeEmails : EmailPlaceHolder[] = [
  {
    id: 1,
    from: {
      idUser: 1,
      email: "yilive-seca51@gmail.com",
      name: "Industry Internship",
    },
    to: {
      idUser: 999,
      email: "honghaocp@gmail.com",
      name: "Hong Hao",
    },
    subject: "[Batch 44] Admission test on May 17, 2024",
    content:
      "Generate up to 10,000 fake or unregistered email addresses in bulk using completely randomized names and user ids. You can specify the domain name or choose between the most commonly used email providers including Gmail, Yahoo, Outlook, Protonmail, and AOL. The local part of the email address is completely random and there is no guarantee that it will be an unregistered email address, though the probability that they are free is extremely high (99.99% for random and pronounceable ids).",
    time: "24/12/2024 09:15:00",
  },
  {
    id: 2,
    from: {
      idUser: 2,
      email: "suki_234@gmail.com",
      name: "BC05",
    },
    to: {
      idUser: 999,
      email: "honghaocp@gmail.com",
      name: "Hong Hao",
    },
    subject: "[Batch 44] Admission test on May 18, 2024",
    content:
      "Kindly be informed that you are requested to join IQ Test with the schedule as below:",
    time: "11/12/2023 10:15:00",
  },
  {
    id: 3,
    from: {
      idUser: 1,
      email: "yilive-seca51@gmail.com",
      name: "Industry Internship",
    },
    to: {
      idUser: 999,
      email: "honghaocp@gmail.com",
      name: "Hong Hao",
    },
    subject: "[Batch 42] Admission test on October 19, 2024",
    content: "Lorem is a random article to test elements",
    time: "10/12/2023 09:15:00",
  },
  {
    id: 4,
    from: {
      idUser: 3,
      email: "leibang_kt05@gmail.com",
      name: "Economics KT05",
    },
    to: {
      idUser: 999,
      email: "honghaocp@gmail.com",
      name: "Hong Hao",
    },
    subject: "[Batch 41] Admission test on September 20, 2024",
    content: "21/05/2024",
    time: "12/12/2020 09:15:00",
  },
  {
    id: 5,
    from: {
      idUser: 1,
      email: "yilive-seca51@gmail.com",
      name: "Industry Internship",
    },
    to: {
      idUser: 999,
      email: "honghaocp@gmail.com",
      name: "Hong Hao",
    },
    subject: "[Batch 45] Admission test on May 21, 2024",
    content:
      "If you need a custom SVG icon (not available in the Material Icons) you can use the SvgIcon wrapper. This component extends the native <svg> element:",
    time: "24/12/2019 12:20:00",
  },
  {
    id: 500,
    from: {
      idUser: 4,
      email: "sunchei-seca51@gmail.com",
      name: "Batch 44",
    },
    to: {
      idUser: 999,
      email: "honghaocp@gmail.com",
      name: "Hong Hao",
    },
    subject: "[Batch 44] Admission test on August 22, 2024",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error consectetur earum quasi eos aspernatur cupiditate assumenda ullam recusandae porro, itaque nam nobis voluptate dignissimos neque dolor quaerat placeat dolore! Explicabo.",
    time: "24/12/2019 10:15:00",
  },
];

export const fakeSendEmails = [
    {
        id: 1,
        from: {
            idUser: 999,
            email: 'honghaocp@gmail.com',
            name: 'Hong Hao',
        },
        to: {
            idUser: 999,
            email: 'yasuo_batch45@gmail.com',
            name: 'Yasuo',
        },
        subject: '[Batch 45] Update your CV',
        content:
            'Generate up to 10,000 fake or unregistered email addresses in bulk using completely randomized names and user ids. You can specify the domain name or choose between the most commonly used email providers including Gmail, Yahoo, Outlook, Protonmail, and AOL. The local part of the email address is completely random and there is no guarantee that it will be an unregistered email address, though the probability that they are free is extremely high (99.99% for random and pronounceable ids).',
        time: '24/12/2019 09:15:00',
    },
    {
        id: 2,
        from: {
            idUser: 999,
            email: 'honghaocp@gmail.com',
            name: 'Hong Hao',
        },
        to: {
            idUser: 1,
            email: 'yilive-seca51@gmail.com',
            name: 'Industry Internship',
        },
        subject: 'Hopefuly to join your orginization',
        content: 'Kindly be informed that you are requested to join IQ Test with the schedule as below:',
        time: '11/11/2020 10:15:00',
    },
];