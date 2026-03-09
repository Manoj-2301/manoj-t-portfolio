'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './services.module.scss';
import Link from 'next/link';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const SERVICES = [
    {
        id: 1,
        number: '01',
        title: 'UI Development',
        short: 'Pixel-perfect code from any design file.',
        desc: 'I translate Figma, Adobe XD, or Photoshop designs into clean, maintainable React/Next.js components with SCSS modules. Every pixel, every spacing token, every hover state — implemented exactly as designed.',
        tools: ['React', 'Next.js', 'SCSS', 'Figma'],
        color: '#6e9ef5',
        colorBg: 'rgba(110, 158, 245, 0.1)',
        colorBorder: 'rgba(110, 158, 245, 0.2)',
    },
    {
        id: 2,
        number: '02',
        title: 'Responsive Design',
        short: 'Looks great on every screen size.',
        desc: 'Mobile-first layouts built with fluid grids, custom breakpoints, and tested across devices. From 320px phones to 4K monitors — your site works and looks intentional at every width.',
        tools: ['CSS Grid', 'Flexbox', 'SCSS Mixins', 'Media Queries'],
        color: '#5ecb8a',
        colorBg: 'rgba(94, 203, 138, 0.1)',
        colorBorder: 'rgba(94, 203, 138, 0.2)',
    },
    {
        id: 3,
        number: '03',
        title: 'Figma to Code',
        short: 'Your design system, built into real components.',
        desc: 'Beyond just slicing designs — I read your Figma tokens, auto-layout rules, and component variants, then turn them into a living codebase that matches your design system 1:1.',
        tools: ['Figma', 'Design Tokens', 'React', 'Storybook'],
        color: '#a78bfa',
        colorBg: 'rgba(167, 139, 250, 0.1)',
        colorBorder: 'rgba(167, 139, 250, 0.2)',
    },
    {
        id: 4,
        number: '04',
        title: 'Animation & Motion',
        short: 'Interactions that feel alive.',
        desc: 'Purposeful animations using Framer Motion and GSAP — page transitions, scroll-triggered reveals, micro-interactions, and hover states that make your product feel premium without sacrificing performance.',
        tools: ['Framer Motion', 'GSAP', 'CSS Animations', 'Lottie'],
        color: '#fbbf24',
        colorBg: 'rgba(251, 191, 36, 0.1)',
        colorBorder: 'rgba(251, 191, 36, 0.2)',
    },
    {
        id: 5,
        number: '05',
        title: 'Performance Optimization',
        short: 'Fast, accessible, and production-ready.',
        desc: 'Image optimization, code splitting, lazy loading, and Core Web Vitals tuning. I build with Lighthouse scores in mind from day one — not as an afterthought.',
        tools: ['Next.js', 'Webpack', 'Lighthouse', 'Web Vitals'],
        color: '#fb7185',
        colorBg: 'rgba(251, 113, 133, 0.1)',
        colorBorder: 'rgba(251, 113, 133, 0.2)',
    },
    {
        id: 6,
        number: '06',
        title: 'UI/UX Consulting',
        short: 'Design reviews and UX improvements.',
        desc: 'Not sure why your conversion rate is low? I review your existing UI, identify friction points, and deliver a prioritized list of design and UX improvements with implementation-ready suggestions.',
        tools: ['Figma', 'User Flows', 'Heuristics', 'Prototyping'],
        color: '#2dd4bf',
        colorBg: 'rgba(45, 212, 191, 0.1)',
        colorBorder: 'rgba(45, 212, 191, 0.2)',
    },
];

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] } },
};

const headerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const lineVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

// ─────────────────────────────────────────────
// SERVICE CARD
// All per-card color values passed as inline styles
// so SCSS never needs to use var() inside rgba() or color-mix()
// ─────────────────────────────────────────────

const ServiceCard = ({ service }) => {
    const [expanded, setExpanded] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className={styles.service_card}
            variants={itemVariants}
            onClick={() => setExpanded(!expanded)}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
                // Pass safe inline styles — no CSS variable tricks needed
                borderColor: hovered ? service.colorBorder : undefined,
            }}
        >
            {/* Glow blob — color set inline, opacity toggled via Framer Motion */}
            <motion.div
                className={styles.card_glow}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: service.color }}
            />

            {/* Top row — number badge + expand arrow */}
            <div className={styles.card_top}>
                <span
                    className={styles.card_number}
                    style={{
                        color: service.color,
                        background: service.colorBg,
                        borderColor: service.colorBorder,
                    }}
                >
                    {service.number}
                </span>
                <motion.span
                    className={styles.card_arrow}
                    animate={{
                        rotate: expanded ? 45 : 0,
                        color: hovered ? service.color : '#8b93a8',
                    }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                    +
                </motion.span>
            </div>

            {/* Title + short description */}
            <h3 className={styles.card_title}>{service.title}</h3>
            <p className={styles.card_short}>{service.short}</p>

            {/* Expandable detail block */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        className={styles.card_detail}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <p className={styles.card_desc}>{service.desc}</p>
                        <div className={styles.card_tools}>
                            {service.tools.map(tool => (
                                <span key={tool} className={styles.tool_badge}>{tool}</span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom accent line — scaleX driven by Framer Motion */}
            <motion.div
                className={styles.card_line}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ background: service.color }}
            />
        </motion.div>
    );
};

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

const ServicesPage = () => {
    return (
        <div className={styles.page} id="services">
            <div className="contain-fluid">

                {/* Header */}
                <motion.div
                    className={styles.header}
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p className={styles.eyebrow} variants={lineVariants}>What I Do</motion.p>
                    <motion.h1 className={styles.title} variants={lineVariants}>
                        Services I<br /><span>Offer</span>
                    </motion.h1>
                    <motion.p className={styles.subtitle} variants={lineVariants}>
                        From design handoff to production deploy — I cover the full
                        front-end spectrum. Click any service to learn more.
                    </motion.p>
                </motion.div>

                {/* Services grid */}
                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {SERVICES.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className={styles.cta_block}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
                >
                    <p className={styles.cta_text}>
                        Have a project in mind? Let&apos;s talk about it.
                    </p>
                    <Link href="/contact" className={styles.cta_btn}>
                        Get in touch →
                    </Link>
                </motion.div>

            </div>
        </div>
    );
};

export default ServicesPage;