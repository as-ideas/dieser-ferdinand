import React, { Component, PropTypes } from 'react';
import './CoinWidget.scss';

import LoginModal from '../LoginModal/LoginModal';
import TopUpModal from '../TopUpModal/TopUpModal';
import HistoryModal from '../HistoryModal/HistoryModal';
import UtilsService from '../../services/UtilsService';
import WalletService from '../../services/WalletService';
import AuthService from '../../services/AuthService';

import EventService from '../../services/EventService';

export default class CoinWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            accountData: {},
            loginModalOpen: false,
            topUpModalOpen: false,
            historyModalOpen: false,
            authorized: false,
            showBalance: false
        };

        EventService.addListener('unlockedArticle', () => {
            this.syncAccountData().then(() => {
                this.popUpBalance();
            });
        });

        EventService.addListener('topedUp', () => {
            this.syncAccountData().then(() => {
                this.popUpBalance();
            });
        });

        EventService.addListener('balanceExceeded', () => {
            this.popUpBalance();
        });


        EventService.addListener('notAuthorized', () => {
            this.setState({
                open: true
            });
        });

    }

    popUpBalance() {
        if (this.state.open === false) {
            this.setState({
                showBalance: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        showBalance: false
                    });
                }, 1500);
            });
        }
    }

    componentDidMount() {
        if (AuthService.checkLoggedIn()) {
            this.syncAccountData().then(() => {
                this.setState({
                    authorized: true
                })
            });
        }
    }

    syncAccountData() {
        return WalletService.getAccountData()
            .then((data) => {
                this.setState({
                    accountData: data
                });
            })
            .catch((e) => {
                console.error(e.message)
            });
    }

    toggleOpen() {
        this.setState({
            open: !this.state.open
        });
    }

    onLoginSuccessful() {
        this.setState({
            authorized: true,
            loginModalOpen: false
        }, () => {
            setTimeout(() => {
                this.syncAccountData().then(
                    this.setState({
                        open: true
                    })
                );
            }, 100);
        });
    }

    onChargeSuccessful(data) {
        this.setState({
            topUpModalOpen: false
        }, () => {
            this.syncAccountData()
        });
    }

    onChargeFailed(e) {
        console.error(e);
        alert('Failed');
    }

    login() {
        this.setState({
            open: false,
            loginModalOpen: true
        });
    }

    topUp() {
        this.setState({
            open: false,
            topUpModalOpen: true
        });
    }

    logout() {
        this.setState({
            open: false
        }, () => {
            setTimeout(() => {
                AuthService.logout();
                this.setState({
                    authorized: false
                });
            }, 400);
        });


    }

    showHistory() {
        this.setState({
            open: false,
            historyModalOpen: true
        });
    }

    closeTopUpModal() {
        this.setState({
            topUpModalOpen: false
        });
    }

    closeLoginModal() {
        this.setState({
            loginModalOpen: false
        });
    }

    closeHistoryModal() {
        this.setState({
            historyModalOpen: false
        });
    }


    render() {
        let mainItem = (
            <button key='mainButton' onClick={this.toggleOpen.bind(this)} className='coinWidget__actionItem coinWidget__actionItem--main' >
                <img src='/assets/icons/ideas_contentcoin_logo_mitkreis.svg' alt='Content Coins' />
            </button >
        );

        let authItem = this.state.authorized ?
            (
                <button key='logoutButton' className='coinWidget__actionItem coinWidget__actionItem--auth' onClick={this.logout.bind(this)}>
                    <img src='/assets/icons/ideas_contentcoin_icon_logout.svg' alt='logout' />
                    <p className='coinWidget__itemText'>Logout</p>
                </button>
            ) : (
                <button key='loginButton' className='coinWidget__actionItem coinWidget__actionItem--auth' onClick={this.login.bind(this)}>
                    <img src='/assets/icons/ideas_contentcoin_icon_login.svg' alt='logout' />
                    <p className='coinWidget__itemText'>Login</p>
                </button>
            );

        let itemList = this.state.authorized ? [
            mainItem,
            authItem,
            < button key='topUpButton' className='coinWidget__actionItem coinWidget__actionItem--topUp' onClick={this.topUp.bind(this)}>
                <img src='/assets/icons/ideas_contentcoin_icon_charge.svg' alt='topUp' />
                <p className='coinWidget__itemText'>Top up</p>
            </button >,
            <button key='historyButton' className='coinWidget__actionItem coinWidget__actionItem--history' onClick={this.showHistory.bind(this)}>
                <img src='/assets/icons/ideas_contentcoin_icon_history2.svg' alt='history' />
                <p className='coinWidget__itemText'>history</p>
            </button>,
            <button key='balanceButton' className={'coinWidget__actionItem coinWidget__actionItem--balance' + (this.state.showBalance ? ' coinWidget__actionItem--open' : '')}>
                {UtilsService.formatBalance(this.state.accountData.balance)}
                <p className='coinWidget__itemText'>balance</p>
            </button>
        ] : [
                mainItem,
                authItem
            ];


        let loginModal = this.state.loginModalOpen ? (
            <LoginModal
                onLoginSuccessful={this.onLoginSuccessful.bind(this)}
                onClose={this.closeLoginModal.bind(this)}
            />
        ) : null;

        let topUpModal = this.state.topUpModalOpen ? (
            <TopUpModal
                onChargeSuccessful={this.onChargeSuccessful.bind(this)}
                onChargeFailed={this.onChargeFailed.bind(this)}
                onClose={this.closeTopUpModal.bind(this)}
            />
        ) : null;

        let historyModal = this.state.historyModalOpen ? (
            <HistoryModal
                onClose={this.closeHistoryModal.bind(this)}
            />
        ) : null;

        return (
            <div className='coinWidget__container'>
                <div className={'coinWidget__actionList' + (this.state.open ? ' coinWidget__actionList--open' : '')}>
                    {itemList}
                </div>
                {loginModal}
                {topUpModal}
                {historyModal}
            </div>
        );
    }
}