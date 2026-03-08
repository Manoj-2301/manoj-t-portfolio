'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './resume.module.scss';
import Link from 'next/link';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const EXPERIENCE = [
    {
        id: 1,
        role: 'Junior Front-End Developer',
        company: 'CraftNotion Pvt. Ltd.',
        period: 'Jan 2025 — Dec 2025',
        type: 'Full-time',
        points: [
            'Built responsive React/Next.js interfaces from Figma designs with pixel-perfect accuracy.',
            'Developed and maintained SCSS module systems and reusable component libraries.',
            'Collaborated with designers and back-end developers in agile sprints.',
            'Improved page load performance by 30% through image optimization and code splitting.',
        ],
    },
    {
        id: 2,
        role: 'Customer Service Executive',
        company: '24/7.ai',
        period: '2023 — 2024',
        type: 'Full-time',
        points: [
            'Handled high-volume customer interactions with a strong resolution rate.',
            'Developed communication, problem-solving, and empathy skills in a fast-paced environment.',
            'Coordinated with cross-functional teams to resolve product and service issues.',
        ],
    },
];

const EDUCATION = [
    {
        id: 1,
        degree: 'Bachelor of Science — Computer Science',
        institution: 'University Name',
        period: '2019 — 2023',
        note: 'Focus on software engineering, data structures, and web technologies.',
    },
];

const SKILLS = [
    { category: 'Languages', items: ['HTML5', 'CSS3 / SCSS', 'JavaScript (ES6+)', 'TypeScript'] },
    { category: 'Frameworks', items: ['React', 'Next.js', 'Node.js (basic)'] },
    { category: 'Design', items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Framer'] },
    { category: 'Tools', items: ['Git / GitHub', 'VS Code', 'Storybook', 'Framer Motion', 'GSAP'] },
    { category: 'Concepts', items: ['Responsive Design', 'Component Architecture', 'Performance Optimization', 'Accessibility (WCAG)'] },
];

const PROJECTS_HIGHLIGHT = [
    { name: 'Korgee', desc: 'E-commerce platform — Next.js, SCSS, Figma' },
    { name: 'Hack MACQS', desc: 'Hackathon dashboard — React, Node.js' },
    { name: 'Ramanis Talkies', desc: 'Cinema booking UI — React, Figma' },
];

// ─────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────

const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

const staggerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
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
// SECTION TITLE component
// ─────────────────────────────────────────────

function SectionTitle({ children }) {
    return (
        <div className={styles.section_title}>
            <span>{children}</span>
            <div className={styles.section_line} />
        </div>
    );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function ResumePage() {
    return (
        <div className={styles.page}>
            <div className="contain-fluid">

                {/* ── Page Header ── */}
                <motion.div
                    className={styles.header}
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p className={styles.eyebrow} variants={lineVariants}>Resume</motion.p>
                    <motion.h1 className={styles.title} variants={lineVariants}>
                        Manoj<br /><span>Thapa</span>
                    </motion.h1>
                    <motion.p className={styles.subtitle} variants={lineVariants}>
                        Front-End Developer & UI/UX Designer
                    </motion.p>

                    {/* Download button */}
                    <motion.div variants={lineVariants}>
                        <Link
                            href="/resume/manoj-resume.pdf"
                            target="_blank"
                            className={styles.download_btn}
                        >
                            ↓ Download PDF
                        </Link>
                    </motion.div>
                </motion.div>

                {/* ── Main grid ── */}
                <div className={styles.grid}>

                    {/* ── LEFT COLUMN ── */}
                    <div className={styles.left_col}>

                        {/* Experience */}
                        <motion.div
                            className={styles.section}
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <SectionTitle>Experience</SectionTitle>

                            <motion.div
                                className={styles.timeline}
                                variants={staggerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {EXPERIENCE.map((exp) => (
                                    <motion.div
                                        key={exp.id}
                                        className={styles.timeline_item}
                                        variants={itemVariants}
                                    >
                                        <div className={styles.timeline_dot} />
                                        <div className={styles.timeline_content}>
                                            <div className={styles.exp_top}>
                                                <h3 className={styles.exp_role}>{exp.role}</h3>
                                                <span className={styles.exp_type}>{exp.type}</span>
                                            </div>
                                            <div className={styles.exp_meta}>
                                                <span className={styles.exp_company}>{exp.company}</span>
                                                <span className={styles.exp_period}>{exp.period}</span>
                                            </div>
                                            <ul className={styles.exp_points}>
                                                {exp.points.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Education */}
                        <motion.div
                            className={styles.section}
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <SectionTitle>Education</SectionTitle>

                            {EDUCATION.map((edu) => (
                                <div key={edu.id} className={styles.edu_item}>
                                    <h3 className={styles.edu_degree}>{edu.degree}</h3>
                                    <div className={styles.edu_meta}>
                                        <span className={styles.edu_inst}>{edu.institution}</span>
                                        <span className={styles.edu_period}>{edu.period}</span>
                                    </div>
                                    <p className={styles.edu_note}>{edu.note}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Projects */}
                        <motion.div
                            className={styles.section}
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <SectionTitle>Key Projects</SectionTitle>
                            <div className={styles.project_list}>
                                {PROJECTS_HIGHLIGHT.map((p) => (
                                    <div key={p.name} className={styles.project_item}>
                                        <span className={styles.project_name}>{p.name}</span>
                                        <span className={styles.project_desc}>{p.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/work" className={styles.view_all}>
                                View all projects →
                            </Link>
                        </motion.div>

                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className={styles.right_col}>

                        {/* Skills */}
                        <motion.div
                            className={styles.section}
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <SectionTitle>Skills</SectionTitle>

                            <motion.div
                                className={styles.skills_list}
                                variants={staggerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {SKILLS.map((group) => (
                                    <motion.div
                                        key={group.category}
                                        className={styles.skill_group}
                                        variants={itemVariants}
                                    >
                                        <p className={styles.skill_category}>{group.category}</p>
                                        <div className={styles.skill_tags}>
                                            {group.items.map((item) => (
                                                <span key={item} className={styles.skill_tag}>{item}</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Quick info card */}
                        <motion.div
                            className={styles.info_card}
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <div className={styles.info_row}>
                                <span className={styles.info_label}>Location</span>
                                <span className={styles.info_val}>Kathmandu, Nepal</span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.info_label}>Availability</span>
                                <span className={`${styles.info_val} ${styles.available}`}>
                                    <span className={styles.dot} /> Open to work
                                </span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.info_label}>Languages</span>
                                <span className={styles.info_val}>English, Nepali</span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.info_label}>Experience</span>
                                <span className={styles.info_val}>2+ years</span>
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            className={styles.cta_card}
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <p className={styles.cta_text}>
                                Interested in working together?
                            </p>
                            <Link href="/contact" className={styles.cta_btn}>
                                Get in touch →
                            </Link>
                        </motion.div>

                    </div>

                </div>

            </div>
        </div>
    );
}