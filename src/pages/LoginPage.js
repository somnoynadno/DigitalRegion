import React from 'react';

import {Button, Container, Form, Grid, Input, Segment} from "semantic-ui-react";
import {api} from "../http/API";
import history from "../history";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorText: ''
        };

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        await api.LoginUser(this.state.username, this.state.password)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    localStorage.setItem('token', resp["token"]);
                    localStorage.setItem('user_id', resp["user_id"]);
                    history.push('/');
                } else {
                    this.setState({errorText: "Неверные логин или пароль"});
                }
            })
    }

    render() {
        return <Container>
            <Grid stackable columns={3} centered>
                <Grid.Row style={{margin: "5% auto"}}>
                    <Grid.Column>
                        <Segment raised>
                            <h1>Вход на сайт</h1>
                            <br />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field
                                    control={Input}
                                    type='text'
                                    label='Логин'
                                    placeholder='Введите логин'
                                    required
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    type='password'
                                    label='Пароль'
                                    placeholder='Введите пароль'
                                    required
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <div style={{color: "red"}}>{this.state.errorText}</div>
                                <br />
                                <Form.Field style={{float: "left"}} control={Button}>Войти</Form.Field>
                                <br style={{clear: "both"}} />
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    }
}
