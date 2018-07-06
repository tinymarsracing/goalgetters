import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import { FaClose, FaBars } from 'react-icons/lib/fa'
import styles from './header.module.css'

class Nav extends Component {
  state = {
    display: 'none'
  }

  toggleMobileNav = () => {
    this.setState((prevState) => ({
      display: prevState.display === 'none' ? 'block' : 'none'
    }))
  }

  render() {
    const { type, navigation } = this.props
    const { display } = this.state

    return (
      <Fragment>
        <nav className={styles[`${type}Nav`]} style={{ display: type === 'mobile' && display }}>
          <ul className={styles[`${type}Nav__items`]}>
            {navigation.map(navItem => (
              <li key={`${type}_${navItem.linkSlug}`} className={styles[`${type}Nav__item`]}>
                <Link to={`/${navItem.linkSlug}`} onClick={() => this.setState({ display: 'none'})}>{navItem.linkName}</Link>
              </li>
            ))}
          </ul>
          {/* <div className={styles[`${type}Nav__search`]}>
            <input type='text' placeholder='Suche...' />
            <input type='submit' value='Los!' />
          </div> */}
        </nav>
        {type === 'mobile' && (
          display === 'none'
            ? <div className={styles.hamburger} onClick={this.toggleMobileNav}>
                <FaBars />
              </div>
            : <div className={styles.cross} onClick={this.toggleMobileNav}>
              <FaClose />
            </div>
        )}
      </Fragment>
    )
  }
}

export default ({ title, navigation }) => (
  <div className={styles.header}>
    <div className={styles.title}>
      <Link to='/'>{title}</Link>
    </div>
    <Nav type='main' navigation={navigation} />
    <Nav type='mobile' navigation={navigation} />
  </div>
)