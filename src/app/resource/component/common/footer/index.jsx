'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './footer.module.scss';
import Link from 'next/link';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '#resume' },
];

const SOCIAL_LINKS = [
    { name: 'GitHub', href: 'https://github.com/manojthapa', abbr: 'GH' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/manojthapa', abbr: 'LI' },
    { name: 'Dribbble', href: 'https://dribbble.com/manojthapa', abbr: 'DR' },
    { name: 'Twitter', href: 'https://twitter.com/manojthapa', abbr: 'TW' },
];

// ─────────────────────────────────────────────
// BACK TO TOP BUTTON
// ─────────────────────────────────────────────

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <motion.button
            className={styles.back_top}
            onClick={scrollToTop}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            aria-label="Back to top"
        >
            ↑
        </motion.button>
    );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="contain-fluid">``

                {/* ── Top section ── */}
                {false && (
                    <div className={styles.top}>

                        {/* Left — name + tagline */}
                        <div className={styles.brand}>
                            <div className={styles.logo}>Manoj</div>
                            <p className={styles.tagline}>
                                Building interfaces that feel<br />as good as they look.
                            </p>
                            <a href="mailto:manojthapa@email.com" className={styles.email}>
                                manojthapa@email.com
                            </a>
                        </div>

                        {/* Right — nav + social */}
                        <div className={styles.links_group}>

                            {/* Nav links */}
                            <div className={styles.link_col}>
                                <p className={styles.col_label}>Navigation</p>
                                <ul className={styles.link_list}>
                                    {NAV_LINKS.map((link) => (
                                        <li key={link.name}>
                                            <a href={link.href} className={styles.footer_link}>
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Social links */}
                            <div className={styles.link_col}>
                                <p className={styles.col_label}>Connect</p>
                                <ul className={styles.link_list}>
                                    {SOCIAL_LINKS.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.footer_link}
                                            >
                                                {link.name}
                                                <span className={styles.link_arrow}>↗</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                    </div>
                )}

                {/* ── Divider ── */}
                <div className={styles.divider} />

                {/* ── Bottom bar ── */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {year} Manoj Thapa. Designed & built by me.
                    </p>
                    <p className={styles.stack_note}>
                        Next.js · SCSS · Framer Motion
                    </p>
                    <BackToTop />
                </div>

            </div>
        </footer>
    );
};

export default Footer;