import { createContext, useEffect, useState } from "react";
import $ from 'jquery';

export const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {

  const asadas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const names = ["Karina", "Carla", "Amanda", "Jéssica", "Flávia", "Renata", "Mariana", "Juliana", "Fernanda", "Patrícia", "Ana", "Maria", "Joana", "Luciana", "Larissa", "Lorena"];

  const [chosenName, setChosenName] = useState(names[Math.floor(Math.random() * names.length)])
  const [mess, setMess] = useState([{ text: `Olá eu sou a ${chosenName}, sua assistente hoje. Como posso te ajudar?`, isUser: false }])

  // const [mess, setMess] = useState([{ text: `Primeiramente me diga seu nome e sobrenome, número de telefone e email(se tiver)`, isUser: false }])

  const [openModal, setOpenModal] = useState(false);



  // Header Menu 

  const [menu, setMenu] = useState(false);






  //EMAIL JS 

  const [email, setEmail] = useState('carlos@gmail.com');
  const [name, setName] = useState('carlos');
  const [text, setText] = useState(['Email de teste enviado pelo site.', 'dasdasdasdasdasdasd']);

  const conversa = [
    { isUser: false, text: `Olá eu sou a ${chosenName}, sua assistente hoje. Como posso te ajudar?` },
    { isUser: true, text: "Oi! Estou bem, obrigado." },
    { isUser: false, text: "Qual é o seu hobby favorito?" },
    { isUser: true, text: "Adoro ler livros e fazer caminhadas." },
    { isUser: false, text: "Você já viajou para algum lugar exótico?" },
    { isUser: true, text: "Sim, visitei o Nepal e fiz uma trilha até o Monte Everest!" },
    // Adicione mais mensagens conforme necessário
  ];

  const serviceID = 'service_r5i6cjv';
  const templateID = 'template_6r5p2o7';
  const publicKey = 'dR_L-aG6FJty5DJqU';


  //LEAD TEMPLATE

  const templateIdTwo = 'template_l6svrjh';

  // const messageList = localStorage.getItem('messageList') ? JSON.parse(localStorage.getItem('messageList')) : [];

  const [messageList, setMessageList] = useState([{ text: `Olá! Antes de começarmos, poderia fornecer seu nome completo, número de telefone e, se possível, seu email? Isso nos ajudará a garantir um atendimento mais eficiente. Obrigado!`, isUser: false }])


  const [a,setA] = useState(true)



  const sendEmail = (abcd) => {
    const data = {
      service_id: serviceID,
      template_id: templateID,
      user_id: publicKey,
      template_params: {
        'username': name,
        'email': email,
        'message': abcd.map((item) => item.text).join(''),
      }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(() => {
      // alert('Your mail is sent!');
      console.log("email enviado!");
    }).fail((error) => {
      alert('Oops... ' + JSON.stringify(error));
    });
  };



  const sendEmailTwo = (abcd) => {
    const data = {
      service_id: serviceID,
      template_id: templateIdTwo,
      user_id: publicKey,
      template_params: {
        'username': name,
        'email': email,
        'message': abcd.map((item) => item.text).join(''),
      }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(() => {
      alert('Your mail is sent!');
      console.log("email enviado!");
    }).fail((error) => {
      alert('Oops... ' + JSON.stringify(error));
    });
  };


  const [popUp, setPopUp] = useState(false)
  const [isTyping, setIsTyping] = useState(0)


  return (
    <ModalContext.Provider value={{ names, chosenName, setChosenName, mess, asadas, setOpenModal, openModal, sendEmail, sendEmailTwo,
     menu, setMenu, messageList, setMessageList, a, setA,popUp, setPopUp, isTyping, setIsTyping}}>
      {children}
    </ModalContext.Provider>
  );
};

