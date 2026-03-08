'use client';

import React, { useState } from 'react';
import styles from './about.module.scss';
import Image from 'next/image';

const AboutMe = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='contain-fluid' id='about'>
            <div className={styles.about_wrap}>

                {/* ── Left: Text ── */}
                <div className={styles.about_left}>

                    {/* Eyebrow label */}
                    <div className={styles.about_label}>Who I am</div>

                    <h2 className={styles.about_heading}>About Me</h2>

                    {/* Gradient underline bar */}
                    <div className={styles.about_heading_bar}></div>

                    <div className={styles.about_text}>
                        <p>
                            I am Manoj Thapa, a Computer Science graduate with a Bachelor of Science
                            degree completed in 2023. I have a strong foundation in front-end development
                            and user-focused digital solutions, along with experience in customer service
                            and team-based project environments.
                        </p>
                        <p>
                            After graduating, I worked as a Customer Service Executive at 24/7.ai, where
                            I developed strong communication skills, problem-solving abilities, and a
                            customer-first mindset. From January 2025 to December 2025, I worked as a
                            Junior Front-End Developer at CraftNotion Pvt. Ltd., contributing to the
                            development of responsive and user-friendly web interfaces.
                        </p>

                        {isExpanded && (
                            <div className={styles.about_extra}>
                                <p>
                                    In my role as a front-end developer, I gained hands-on experience with
                                    design and prototyping tools such as Photoshop, Illustrator, and Figma,
                                    collaborating closely with designers and developers to translate concepts
                                    into functional interfaces. I have worked on projects including Korgee,
                                    Hack MACQS, and Ramanis Talkies, where teamwork, attention to detail,
                                    and clean UI implementation were key focuses.
                                </p>
                                <p>
                                    I am passionate about creating intuitive digital experiences and
                                    continuously improving my technical and design skills. I am eager to
                                    contribute to innovative projects and grow as a front-end professional.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={styles.read_more_btn}
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    </div>
                </div>

                {/* ── Right: Image ── */}
                <div className={styles.about_image}>
                    <Image
                        src="/images/manoj-image.png"
                        alt="Manoj Thapa"
                        fill
                        sizes="(max-width: 768px) 100vw, 44vw"
                    />
                </div>

            </div>
        </div>
    );
};

export default AboutMe;