'use client'
import { useState } from "react";
import { useTranslations } from "use-intl";
import { Asterix } from "../common/Asterix";

/**
 *
 * @author Gregory Albert <gregoryalbert1209@gmail.com>
 * @since 2024-11-27
 *
 * @returns {JSX.Element} ContactForm component
 */
export default function ContactForm(): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const t = useTranslations('contact-form');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: '', email: '', message: '' });
        setStatus('Message sent successfully!');
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {t('contact-us')}
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {t('subtitle')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {t('name')}
              <Asterix />
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-gold-primary focus:border-gold-primary"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t('email')}
              <Asterix />

            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-gold-primary focus:border-gold-primary"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              {t('message')}
              <Asterix />

            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-gold-primary focus:border-gold-primary"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gold-primary hover:bg-gold-secondary text-ivory font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-primary focus:ring-offset-2"
          >
            {t('send')}
          </button>
        </form>
        {status && (
          <p
            className={`mt-4 text-center font-medium ${status.includes('successfully')
                ? 'text-green-600'
                : 'text-red-600'
              }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
