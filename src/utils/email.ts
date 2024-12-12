import emailjs from '@emailjs/browser';
import { ContactFormData } from '../types/contact';
import { EMAIL_CONFIG } from './constants';

export const sendEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      EMAIL_CONFIG.PUBLIC_KEY
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};