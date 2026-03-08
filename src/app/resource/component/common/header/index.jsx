'use client';

import React, { useState, useEffect } from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    const links = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '/services' },
    ];

    // Add a stronger blur/shadow when user scrolls down
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='contain-fluid'>
            <div className={`${styles.portfolio_header} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.logo}>Manoj</div>

                <nav className={styles.nav_links}>
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`${styles.nav_link} ${pathname === link.href ? styles.active : ''}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                <Link href="/contact" className={styles.nav_contact}>
                    connect with me
                </Link>
            </div>
        </div>
    );
};

export default Header;