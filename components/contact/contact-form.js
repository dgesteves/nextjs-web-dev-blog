import styles from './contact-form.module.css'
import { useEffect, useState } from 'react'
import Notification from '../ui/notification'
import { sendContactData } from '../../lib/contact-utils'

function ContactForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  const onSubmitHandler = async evt => {
    evt.preventDefault()

    setRequestStatus('pending')

    try {
      await sendContactData({ email, name, message })
      setRequestStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (e) {
      setError(e.message || 'Something went wrong!')
      setRequestStatus('error')
    }
  }

  const renderNotification = status => {
    switch (status) {
      case 'pending':
        return {
          status,
          title: 'Sending message...',
          message: 'Your message is on its way!',
        }
      case 'success':
        return {
          status,
          title: 'Success!',
          message: 'Message sent successfully!',
        }
      case 'error':
        return {
          status,
          title: 'Error!',
          message: error,
        }
    }
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              value={name}
              required
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            id='message'
            rows='5'
            value={message}
            required
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {requestStatus && (
        <Notification details={renderNotification(requestStatus)} />
      )}
    </section>
  )
}

export default ContactForm
