'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './contact.module.scss';

// ─────────────────────────────────────────────
// CONTACT INFO ITEMS
// ─────────────────────────────────────────────

const CONTACT_INFO = [
    {
        label: 'Email',
        value: 'manojthapa.uiux@gmail.com',
        href: 'mailto:manojthapa.uiux@gmail.com',
        icon: '✉',
    },
    {
        label: 'WhatsApp',
        value: 'Chat via WhatsApp',
        href: 'https://wa.me/+918639563091', // Change this!
        icon: '💬',
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/manojthapa',
        href: 'www.linkedin.com/in/manoj-thapa-715430228',
        icon: '↗',
    },
    {
        label: 'GitHub',
        value: 'github.com/manojthapa',
        href: 'https://github.com/Manoj-2301',
        icon: '↗',
    },
    {
        label: 'Location',
        value: 'Hyderabad, India',
        href: null,
        icon: '◎',
    },
];

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────

const headerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const lineVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

// ─────────────────────────────────────────────
// FORM
// ─────────────────────────────────────────────

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

function ContactForm() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
    const [errors, setErrors] = useState({});

    // Simple client-side validation
    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.message.trim()) e.message = 'Message is required';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setStatus('sent');
                setForm(INITIAL_FORM);
            } else {
                setStatus('idle');
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('idle');
            alert('Failed to send message. Please try again.');
        }
    };

    if (status === 'sent') {
        return (
            <motion.div
                className={styles.success_block}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className={styles.success_icon}>✓</div>
                <h3 className={styles.success_title}>Message sent!</h3>
                <p className={styles.success_text}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                    className={styles.success_reset}
                    onClick={() => setStatus('idle')}
                >
                    Send another
                </button>
            </motion.div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

            {/* Name + Email row */}
            <div className={styles.form_row}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Manoj Thapa"
                        value={form.name}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.name ? styles.input_error : ''}`}
                    />
                    <AnimatePresence>
                        {errors.name && (
                            <motion.span
                                className={styles.error}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {errors.name}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.email ? styles.input_error : ''}`}
                    />
                    <AnimatePresence>
                        {errors.email && (
                            <motion.span
                                className={styles.error}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {errors.email}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Subject */}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="subject">
                    Subject <span className={styles.optional}>(optional)</span>
                </label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Project inquiry, Collaboration, etc."
                    value={form.subject}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            {/* Message */}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, timeline, or just say hi..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.input_error : ''}`}
                />
                <AnimatePresence>
                    {errors.message && (
                        <motion.span
                            className={styles.error}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            {errors.message}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Submit */}
            <motion.button
                type="submit"
                className={styles.submit_btn}
                disabled={status === 'sending'}
                whileHover={{ y: -2, boxShadow: '0 0 28px rgba(110,158,245,0.4)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
            >
                {status === 'sending' ? (
                    <span className={styles.sending}>Sending...</span>
                ) : (
                    <>Send Message →</>
                )}
            </motion.button>

        </form>
    );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function ContactPage() {
    return (
        <div className={styles.page} id="contact">
            <div className="contain-fluid">

                {/* Header */}
                <motion.div
                    className={styles.header}
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p className={styles.eyebrow} variants={lineVariants}>Get In Touch</motion.p>
                    <motion.h1 className={styles.title} variants={lineVariants}>
                        Let&apos;s Work<br /><span>Together</span>
                    </motion.h1>
                    <motion.p className={styles.subtitle} variants={lineVariants}>
                        Have a project in mind or just want to say hi?
                        My inbox is always open.
                    </motion.p>
                </motion.div>

                {/* Two-column layout */}
                <div className={styles.layout}>

                    {/* Left — Contact info */}
                    <motion.div
                        className={styles.info_col}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                    >
                        <p className={styles.info_intro}>
                            I&apos;m available for freelance projects, full-time roles,
                            and collaborations. Response time is usually within 24 hours.
                        </p>

                        <div className={styles.info_list}>
                            {CONTACT_INFO.map((item) => (
                                <motion.div
                                    key={item.label}
                                    className={styles.info_item}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className={styles.info_icon}>{item.icon}</span>
                                    <div className={styles.info_text}>
                                        <span className={styles.info_label}>{item.label}</span>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.info_value}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className={styles.info_value}>{item.value}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Availability badge */}
                        <div className={styles.availability}>
                            <span className={styles.avail_dot} />
                            Available for new projects
                        </div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        className={styles.form_col}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <ContactForm />
                    </motion.div>

                </div>

            </div>
        </div>
    );
}