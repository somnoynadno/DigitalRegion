import React from "react";
import {Container, Grid, Image, Message, Segment} from "semantic-ui-react";
import warn from '../assets/warn.png';

export class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
        this.code = window.location.search.toString().replace('?', '').split('=')[1];
    }

    render() {
        return <div>
            <Container>
                <Segment style={{marginTop: "100px", padding: "4%"}}>
                    <h1 style={{textAlign: "center"}}>Упс! Кажется, что-то пошло не так...</h1>
                    <hr/>
                    <br/>
                    <Grid centered columns='12'>
                        <Grid.Row>
                            <Grid.Column style={{minHeight: 64, minWidth: 64}} width={2}>
                                <Image src={warn} alt="..."/>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Message size={"huge"} negative>
                                    <Message.Header>{this.code}: {errors[this.code].text}</Message.Header>
                                    <p>{errors[this.code].description}</p>
                                </Message>
                            </Grid.Column>
                        </Grid.Row>
                        <hr/>
                        <br/>
                        <Grid.Row>
                            <i>Если вы считаете, что ошибка на нашей стороне, то сообщите об этом администратору.</i>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        </div>
    }
}


const errors = {
    "400": {
        text: "Некорректный запрос",
        description: "К сожалению, сервер не смог обработать ваш запрос"
    },
    "403": {
        text: "Доступ запрещён",
        description: "У вас недостаточно прав для этого действия"
    },
    "404": {
        text: "Элемент не найден",
        description: "Вы попытались обратиться к несуществующему элементу"
    },
    "405": {
        text: "Метод не поддерживается",
        description: "Метод вашего запроса не поддерживается сервером"
    },
    "408": {
        text: "Время ожидания истекло",
        description: "Превышено время ожидания запроса. Проверьте скорость вашего соеднинения."
    },
    "500": {
        text: "Ошибка сервера",
        description: "Произошла внутренняя ошибка сервера"
    },
    "503": {
        text: "Сервис недоступен",
        description: "Сервис временно недоступен, повторите попытку позже"
    },
    "504": {
        text: "Сервер не отвечает",
        description: "Превышено время ожидания запроса со стороны сервера"
    },
}
