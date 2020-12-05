import React from 'react'
import {Container, Grid, Icon, Image, Menu, Segment} from 'semantic-ui-react'

import barsgroup from '../assets/barsgroup.svg'
import history from "../history";
import {api} from "../http/API";
import Dashboards from "../components/Dashboards";
import DataTable from "../components/DataTable";
import Preferences from "../components/Preferences";
import Users from "../components/Users";
import Statistics from "../components/Statistics";

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'дашборды',
            data: []
        };
    }

    componentDidMount = async () => {
        await api.QueryData()
            .then((r) => {
                this.setState({data: r});
            })
    }

    renderSwitch(activeItem) {
        switch (activeItem) {
            case 'дашборды':
                return <Dashboards data={this.state.data}/>
            case 'таблица':
                return <DataTable data={this.state.data}/>
            case 'настройки':
                return <Preferences/>
            case 'пользователи':
                return <Users/>
            case 'статистика':
                return <Statistics/>
            default:
                return <Segment>Страница на стадии разработки</Segment>
        }
    }

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state;

        return (
            <Container>
                <Image src={barsgroup} onClick={() => this.handleItemClick(null, "")}
                       style={{padding: "20px"}} size='small'/>
                <Grid stackable columns={2}>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular icon='labeled'>
                            <Menu.Item
                                name='дашборды'
                                active={activeItem === 'дашборды'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='chart bar'/>
                                Дашборды
                            </Menu.Item>
                            <Menu.Item
                                name='таблица'
                                active={activeItem === 'таблица'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='table'/>
                                Таблица
                            </Menu.Item>
                            <Menu.Item
                                name='статистика'
                                active={activeItem === 'статистика'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='chart pie'/>
                                Статистика
                            </Menu.Item>
                            <i className="fa fa-users" aria-hidden="true"/>
                            <Menu.Item
                                name='пользователи'
                                active={activeItem === 'пользователи'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='users'/>
                                Пользователи
                            </Menu.Item>
                            <Menu.Item
                                name='настройки'
                                active={activeItem === 'настройки'}
                                onClick={this.handleItemClick}
                            >
                                <Icon name='settings'/>
                                Настройки
                            </Menu.Item>
                            <Menu.Item
                                name='выход'
                                active={activeItem === ''}
                                onClick={() => history.push('/logout')}
                            >
                                <Icon name='sign-out'/>
                                Выход
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        {this.renderSwitch(activeItem)}
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}
