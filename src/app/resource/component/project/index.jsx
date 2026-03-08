'use client';

import React, { useRef, useState } from 'react';
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    AnimatePresence,
} from 'framer-motion';
import styles from './project.module.scss';

// ── Project Data ──────────────────────────────────────────────────────────────

const projects = [
    {
        id: 1,
        name: 'Korgee',
        sub: 'E-commerce Platform',
        tag: 'Web App',
        bg: 'bg_blue',
        decoColor1: '#6e9ef5',
        decoColor2: '#3a6ad4',
        desc: 'A modern e-commerce experience with smooth cart interactions and optimized checkout flow.',
        stack: ['Next.js', 'SCSS', 'Figma'],
        link: '#',
    },
    {
        id: 2,
        name: 'Hack MACQS',
        sub: 'Hackathon Platform',
        tag: 'Dashboard',
        bg: 'bg_green',
        decoColor1: '#5ecb8a',
        decoColor2: '#2e9e5e',
        desc: 'Real-time hackathon management dashboard with team tracking and live leaderboard.',
        stack: ['React', 'Node.js', 'SCSS'],
        link: '#',
    },
    {
        id: 3,
        name: 'Ramanis Talkies',
        sub: 'Cinema Booking UI',
        tag: 'UI/UX',
        bg: 'bg_purple',
        decoColor1: '#a78bfa',
        decoColor2: '#7c3aed',
        desc: 'Seat selection and booking interface for a regional cinema chain. Focus on accessibility.',
        stack: ['React', 'Figma', 'CSS'],
        link: '#',
    },
    {
        id: 4,
        name: 'CraftNotion',
        sub: 'Agency Website',
        tag: 'Branding',
        bg: 'bg_amber',
        decoColor1: '#fbbf24',
        decoColor2: '#d97706',
        desc: 'Full agency website redesign with custom animations and a bold editorial layout.',
        stack: ['Next.js', 'GSAP', 'SCSS'],
        link: '#',
    },
    {
        id: 5,
        name: 'PortfolioKit',
        sub: 'Design System',
        tag: 'System',
        bg: 'bg_teal',
        decoColor1: '#2dd4bf',
        decoColor2: '#0d9488',
        desc: 'Reusable component library and design tokens built for rapid portfolio development.',
        stack: ['React', 'Storybook', 'SCSS'],
        link: '#',
    },
    {
        id: 6,
        name: 'NovaBlog',
        sub: 'Content Platform',
        tag: 'Blog',
        bg: 'bg_rose',
        decoColor1: '#fb7185',
        decoColor2: '#e11d48',
        desc: 'Minimal CMS-powered blog with dynamic routing, dark mode, and reading time estimates.',
        stack: ['Next.js', 'MDX', 'Tailwind'],
        link: '#',
    },
    {
        id: 7,
        name: 'Taskly',
        sub: 'Productivity App',
        tag: 'App',
        bg: 'bg_slate',
        decoColor1: '#94a3b8',
        decoColor2: '#475569',
        desc: 'Drag-and-drop kanban board with real-time sync, priority tagging, and deadline alerts.',
        stack: ['React', 'DnD Kit', 'Firebase'],
        link: '#',
    },
    {
        id: 8,
        name: 'FlowMetrics',
        sub: 'Analytics Dashboard',
        tag: 'Dashboard',
        bg: 'bg_indigo',
        decoColor1: '#818cf8',
        decoColor2: '#4f46e5',
        desc: 'Real-time analytics dashboard with interactive charts, filters, and export options.',
        stack: ['React', 'Recharts', 'SCSS'],
        link: '#',
    },
    {
        id: 9,
        name: 'AquaStore',
        sub: 'Product Landing',
        tag: 'Landing',
        bg: 'bg_cyan',
        decoColor1: '#22d3ee',
        decoColor2: '#0891b2',
        desc: 'High-conversion product landing page with scroll-triggered animations and 3D previews.',
        stack: ['Next.js', 'GSAP', 'Three.js'],
        link: '#',
    },
];

// Duplicate each row for seamless infinite loop
// Each row uses a different order so all 3 rows look distinct
const row1Items = [...projects, ...projects];
const row2Items = [...[...projects].reverse(), ...[...projects].reverse()];
const row3Items = [
    ...projects.slice(4),
    ...projects.slice(0, 4),
    ...projects.slice(4),
    ...projects.slice(0, 4),
];

// ── Infinite Marquee Row ──────────────────────────────────────────────────────
// Powered by Framer Motion useMotionValue + useAnimationFrame.
// When row is hovered: animation pauses instantly.
// When a card inside is hovered: tooltip animates in with AnimatePresence.

const InfiniteMarqueeRow = ({ items, direction = 'left', speed = 40 }) => {
    const x = useMotionValue(0);
    const isPaused = useRef(false);

    // Each card is 340px + 2×9px margin = 358px
    const ITEM_WIDTH = 358;
    const halfWidth = (items.length / 2) * ITEM_WIDTH;
    const dirSign = direction === 'left' ? -1 : 1;

    // Initialise right-direction rows at -halfWidth so loop starts correctly
    if (direction === 'right' && x.get() === 0) {
        x.set(-halfWidth);
    }

    useAnimationFrame((_, delta) => {
        if (isPaused.current) return;
        let next = x.get() + dirSign * (speed / 1000) * delta;
        // Seamless wraparound
        if (direction === 'left' && next <= -halfWidth) next = 0;
        if (direction === 'right' && next >= 0) next = -halfWidth;
        x.set(next);
    });

    return (
        <div
            className={styles.marquee_track}
            onMouseEnter={() => { isPaused.current = true; }}
            onMouseLeave={() => { isPaused.current = false; }}
        >
            <motion.div className={styles.marquee_row} style={{ x }}>
                {items.map((project, idx) => (
                    <ProjectCard
                        key={`${project.id}-${idx}`}
                        project={project}
                        isPausedRef={isPaused}
                    />
                ))}
            </motion.div>
        </div>
    );
};

// ── Project Card ──────────────────────────────────────────────────────────────

const ProjectCard = ({ project, isPausedRef }) => {
    const [hovered, setHovered] = useState(false);

    // Only activate card effects when the row is also paused
    const isActive = hovered;

    return (
        <div
            className={styles.project_card}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── Tooltip — AnimatePresence for smooth mount/unmount ── */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className={styles.card_tooltip}
                        // Start below, fade and slide up into position
                        initial={{ opacity: 0, y: 12, scale: 0.93 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{
                            duration: 0.22,
                            ease: [0.23, 1, 0.32, 1],
                        }}
                    >
                        <div className={styles.tooltip_inner}>
                            <p className={styles.tooltip_title}>{project.name}</p>
                            <p className={styles.tooltip_desc}>{project.desc}</p>
                            <div className={styles.tooltip_stack}>
                                {project.stack.map((tech) => (
                                    <span key={tech} className={styles.tooltip_tech}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <a href={project.link} className={styles.tooltip_link}>
                                View Project <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Card Body ── */}
            <motion.div
                className={styles.card_inner}
                animate={
                    isActive
                        ? {
                            scale: 1.045,
                            y: -7,
                            boxShadow:
                                '0 28px 60px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(110,158,245,0.4)',
                        }
                        : {
                            scale: 1,
                            y: 0,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
                        }
                }
                transition={{
                    duration: 0.38,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                {/* Gradient background — zooms in on hover */}
                <motion.div
                    className={`${styles.card_bg} ${styles[project.bg]}`}
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div
                        className={`${styles.card_deco} ${styles.deco_1}`}
                        style={{ background: project.decoColor1 }}
                    />
                    <div
                        className={`${styles.card_deco} ${styles.deco_2}`}
                        style={{ background: project.decoColor2 }}
                    />
                </motion.div>

                {/* Overlay for text legibility */}
                <div className={styles.card_overlay} />

                {/* Animated border glow ring */}
                <motion.div
                    className={styles.card_glow_ring}
                    animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Text — slides up slightly on hover */}
                <motion.div
                    className={styles.card_content}
                    animate={isActive ? { y: 0, opacity: 1 } : { y: 5, opacity: 0.85 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                >
                    <span className={styles.card_tag}>{project.tag}</span>
                    <div className={styles.card_name}>{project.name}</div>
                    <div className={styles.card_sub}>{project.sub}</div>
                </motion.div>
            </motion.div>
        </div>
    );
};

// ── Page Header Variants ──────────────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.13,
            delayChildren: 0.06,
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};

// ── Page Component ────────────────────────────────────────────────────────────

const WorkPage = () => {
    return (
        <div className={styles.work_page}>

            {/* ── Heading block ── */}
            <div className="contain-fluid">
                <motion.div
                    className={styles.work_header}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className={styles.work_label}
                        variants={childVariants}
                    >
                        Selected Work
                    </motion.div>

                    <motion.h1
                        className={styles.work_title}
                        variants={childVariants}
                    >
                        Projects I&apos;ve<br />
                        <span>Built & Shipped</span>
                    </motion.h1>

                    <motion.p
                        className={styles.work_subtitle}
                        variants={childVariants}
                    >
                        A collection of interfaces, platforms, and experiences
                        crafted with attention to detail and user-first thinking.
                    </motion.p>
                </motion.div>
            </div>

            {/* ── Three marquee rows ── */}
            <div className={styles.marquee_section}>

                {/* Row 1 → scrolls LEFT, speed 38 */}
                <InfiniteMarqueeRow items={row1Items} direction="left" speed={38} />

                {/* Row 2 → scrolls RIGHT, speed 32 */}
                <InfiniteMarqueeRow items={row2Items} direction="right" speed={32} />

                {/* Row 3 → scrolls LEFT, speed 26 (slowest) */}
                <InfiniteMarqueeRow items={row3Items} direction="left" speed={26} />

            </div>
        </div>
    );
};

export default WorkPage;