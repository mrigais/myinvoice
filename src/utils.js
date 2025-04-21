import emailjs from 'emailjs-com';
import { EJS_PUB_KEY, EJS_SERVICE_ID, EJS_TEMPLATE_ID } from './constants';

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  export const sendEmail = async (invoice, reminder) => {
    let message = `
    Invoice Details:

    To: ${invoice.to}
    Due Date: ${invoice.dueDate}
    Status: ${invoice.status}
    Notes: ${invoice.notes}

    Items:
    ${invoice.items.map((item, i) => ` ${i + 1}. ${item.description} - ${item.quantity} x ${item.rate} = ${item.quantity * item.rate}`).join('\n')}
    
    Total: ${invoice.items.reduce((total, item) => total + item.quantity * item.rate, 0)}
`;
    if(reminder){
        message = `This is a REMINDER email for \n` + message
    }
   
    try {
    const res = await emailjs.send(
      EJS_SERVICE_ID,
      EJS_TEMPLATE_ID,
      {message: message, 
        to_name: invoice.to
      },
      EJS_PUB_KEY
    );

    return { status: res.status || (res.text === 'OK' ? 200 : 500) };
  } catch (error) {
    console.error('Email sending error:', error);
    return { status: 500, error };
  }
  };
  