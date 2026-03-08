"use client";
import React from 'react';
import styles from './home.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const HomePageContent = () => {
	return (
		<div className='contain-fluid'>
			<div className={styles.hero_container}>

				{/* ── Left: Text Content ── */}
				<div className={styles.hero_content}>

					{/* Eyebrow label */}
					<div className={styles.hero_label}>
						<span className={styles.dot}></span>
						Available for work
					</div>

					<h1>
						Hi, I&apos;m
						<br />
						<span className={styles.hero_name}>Manoj Thapa</span>
						<span className={styles.hero_designation}>Front-End Developer & UI/UX Designer</span>
					</h1>

					<p>
						Building modern websites with clean design and seamless user experiences.
					</p>

					<div className={styles.hero_btns}>
						<Link
							href="/resume/manoj-resume.pdf"
							target='_blank'
							className={styles.hero_button}
						>
							Download Resume
						</Link>
						<button className={styles.hero_button_outline}>
							<span>Hire Me</span>
						</button>
					</div>
				</div>

				{/* ── Right: Image ── */}
				<div className={styles.hero_image}>
					<Image
						src="/images/manoj.png"
						alt="Manoj Thapa"
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						className={styles.hero_img}
						priority
					/>
				</div>

			</div>
		</div>
	);
};

export default HomePageContent;