import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <img src="/imgs/logo.png" alt="" />
            <div>
                <h2>Important Links: </h2>
                <div className={styles.linksContainer}>
                    <Link className={styles.link} to={'/plates'}>Plates</Link>
                    <Link className={styles.link} to={'/profile'}>Profile</Link>
                    <Link className={styles.link} to={'/'}>Home Page</Link>
                </div>
            </div>
            <div>
                Developed by Bruno Machado.
                <a className={styles.link} href='https://www.linkedin.com/in/bruno-barbosa-machado-428880216?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BKXdwk44rRw%2Bi%2B4Z%2Fv%2B10hg%3D%3D'
                    target='_blank'>Click here!</a>
            </div>
        </footer>
    )
}