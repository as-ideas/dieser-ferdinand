import React, { Component, PropTypes } from 'react';
import './Header.scss';

import { Link } from 'react-router-dom'

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeNavItem: 'Politics'
        }
    }

    isActive(itemName) {
        return itemName === this.state.activeNavItem;
    };

    toggleNavItem(itemName) {
        this.setState({
            activeNavItem: itemName
        });
    }

    render() {
        return (
            <header className='header__container'>
                <ul className='header__serviceList'>
                    <li className='header__serviceItem'>
                        Service
                    </li>
                    <li className='header__serviceItem'>
                        Archive
                    </li>
                    <li className='header__serviceItem' >
                        Search
                    </li>
                </ul>
                <h1 className='header__heading'>
                    <Link to='/'>
                        <img src='/assets/dieser_ferdinand.svg' alt='Dieser Ferdinant' />
                    </Link>
                </h1>
                <nav>
                    <ul className='header__navList'>
                        <li className={'header__navItem' + (this.isActive('Business') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Business')}>
                            <Link to='/'>Business</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Politics') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Politics')}>
                            <Link to='/'>Politics</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Design') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Design')}>
                            <Link to='/'>Design</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Science') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Science')}>
                            <Link to='/'>Science</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Culture') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Culture')}>
                            <Link to='/'>Culture</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Security') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Security')}>
                            <Link to='/'>Security</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Transportation') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Transportation')}>
                            <Link to='/'>Transportation</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Video') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Video')}>
                            <Link to='/'>Video</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Photo') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Photo')}>
                            <Link to='/'>Photo</Link>
                        </li>
                        <li className={'header__navItem' + (this.isActive('Gear') ? ' header__navItem--active' : '')} onClick={this.toggleNavItem.bind(this, 'Gear')}>
                            <Link to='/'>Gear</Link>
                        </li>

                    </ul>
                </nav>
            </header>
        );
    }
}
