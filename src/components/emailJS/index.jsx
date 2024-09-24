
import React, { useState } from 'react';
import $ from 'jquery';

const EmailSender = () => {
  const [email, setEmail] = useState('carlos@gmail.com');
  const [name, setName] = useState('carlos');
  const [text, setText] = useState('Email de teste enviado pelo site.');


  const serviceID = 'service_6xyluw8';
  const templateID = 'template_6r5p2o7';
  const publicKey = 'dR_L-aG6FJty5DJqU';


  const sendEmail = () => {
    const data = {
      service_id: serviceID,
      template_id: templateID,
      user_id: publicKey,
      template_params: {
        'username': name,
        'email': email,
        'message': text
      }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(() => {
      alert('Your mail is sent!');
    }).fail((error) => {
      alert('Oops... ' + JSON.stringify(error));
    });
  };

  return (
    <div>
      <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Enter your message" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailSender;
