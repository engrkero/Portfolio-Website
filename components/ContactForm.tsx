import React, { useState, useEffect } from 'react';
import { SendIcon, SpinnerIcon } from './icons';

type FormState = {
  status: 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';
  message: string;
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    _replyto: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [formState, setFormState] = useState<FormState>({ status: 'IDLE', message: '' });

  useEffect(() => {
    const validate = () => {
      const newErrors: { [key: string]: string } = {};

      if (touched.name && !formData.name.trim()) {
        newErrors.name = 'Full Name is required.';
      }

      if (touched._replyto) {
        if (!formData._replyto.trim()) {
          newErrors._replyto = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData._replyto)) {
          newErrors._replyto = 'Email is invalid.';
        }
      }

      if (touched.subject) {
        if (!formData.subject.trim()) {
          newErrors.subject = 'Subject is required.';
        } else if (formData.subject.trim().length < 5) {
          newErrors.subject = 'Subject must be at least 5 characters long.';
        }
      }

      if (touched.message) {
        if (!formData.message.trim()) {
          newErrors.message = 'Message is required.';
        } else if (formData.message.trim().length < 10) {
          newErrors.message = 'Message must be at least 10 characters long.';
        }
      }
      setErrors(newErrors);
    };
    validate();
  }, [formData, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData._replyto.trim() !== '' &&
    formData.subject.trim() !== '' &&
    formData.message.trim() !== '' &&
    Object.keys(errors).length === 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({
      name: true,
      _replyto: true,
      subject: true,
      message: true,
    });

    if (!isFormValid) {
      return;
    }

    setFormState({ status: 'SUBMITTING', message: '' });
    
    const emailJsData = {
      service_id: 'service_8dahcgn',
      template_id: 'template_7v5gy0k',
      user_id: 'g3UReINHkzHP4_W1S',
      template_params: formData,
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailJsData),
      });

      if (response.ok) {
        setFormState({ status: 'SUCCESS', message: "Thanks for your message! I'll get back to you soon." });
        setFormData({ name: '', _replyto: '', subject: '', message: '' });
        setTouched({});
      } else {
        throw new Error('Failed to send email.');
      }
    } catch (error) {
      setFormState({ status: 'ERROR', message: 'Something went wrong. Please try again.' });
    }
  };

  if (formState.status === 'SUCCESS') {
    return (
      <div className="w-full p-8 bg-white rounded-lg shadow-xl text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h3>
        <p className="text-gray-600">{formState.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-8 bg-white rounded-lg shadow-xl text-left">
      <form noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mb-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 py-3 bg-gray-100 border-2 rounded-lg text-gray-800 placeholder-transparent focus:outline-none transition ${
                touched.name && errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F0544F]'
              }`}
              placeholder="Full Name"
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            />
            <label htmlFor="name" className={`absolute left-4 -top-3.5 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-sm ${
              touched.name && errors.name ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500 peer-focus:text-[#F0544F]'
            }`}>
              Full Name
            </label>
            {touched.name && errors.name && <p id="name-error" className="text-red-500 text-xs mt-1 absolute">{errors.name}</p>}
          </div>
          <div className="relative">
            <input
              type="email"
              name="_replyto"
              id="email"
              required
              value={formData._replyto}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full px-4 py-3 bg-gray-100 border-2 rounded-lg text-gray-800 placeholder-transparent focus:outline-none transition ${
                touched._replyto && errors._replyto ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F0544F]'
              }`}
              placeholder="Email Address"
              aria-invalid={touched._replyto && !!errors._replyto}
              aria-describedby={touched._replyto && errors._replyto ? "email-error" : undefined}
            />
             <label htmlFor="email" className={`absolute left-4 -top-3.5 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-sm ${
              touched._replyto && errors._replyto ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500 peer-focus:text-[#F0544F]'
            }`}>
              Email Address
            </label>
            {touched._replyto && errors._replyto && <p id="email-error" className="text-red-500 text-xs mt-1 absolute">{errors._replyto}</p>}
          </div>
        </div>
        <div className="relative mb-8">
           <input
            type="text"
            name="subject"
            id="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`peer w-full px-4 py-3 bg-gray-100 border-2 rounded-lg text-gray-800 placeholder-transparent focus:outline-none transition ${
              touched.subject && errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F0544F]'
            }`}
            placeholder="Subject"
            aria-invalid={touched.subject && !!errors.subject}
            aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
          />
          <label htmlFor="subject" className={`absolute left-4 -top-3.5 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-sm ${
            touched.subject && errors.subject ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500 peer-focus:text-[#F0544F]'
          }`}>
            Subject
          </label>
          {touched.subject && errors.subject && <p id="subject-error" className="text-red-500 text-xs mt-1 absolute">{errors.subject}</p>}
        </div>
        <div className="relative mb-8">
           <textarea
            name="message"
            id="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`peer w-full px-4 py-3 bg-gray-100 border-2 rounded-lg text-gray-800 placeholder-transparent focus:outline-none transition ${
              touched.message && errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F0544F]'
            }`}
            placeholder="Your Message"
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={touched.message && errors.message ? "message-error" : undefined}
          ></textarea>
           <label htmlFor="message" className={`absolute left-4 -top-3.5 text-sm bg-white px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-sm ${
            touched.message && errors.message ? 'text-red-500 peer-focus:text-red-500' : 'text-gray-500 peer-focus:text-[#F0544F]'
          }`}>
            Message
          </label>
          {touched.message && errors.message && <p id="message-error" className="text-red-500 text-xs mt-1 absolute">{errors.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            disabled={formState.status === 'SUBMITTING' || !isFormValid}
            className="w-full flex items-center justify-center gap-2 px-10 py-3 bg-[#F0544F] text-white text-lg font-bold rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0544F] disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0"
          >
            {formState.status === 'SUBMITTING' ? (
                <>
                    <SpinnerIcon />
                    Sending...
                </>
            ) : (
                <>
                    Send Message <SendIcon />
                </>
            )}
          </button>
        </div>
        {formState.status === 'ERROR' && <p className="mt-4 text-center text-red-600">{formState.message}</p>}
      </form>
    </div>
  );
};

export default ContactForm;