import React from "react";
import {Button, Checkbox, Segment} from "semantic-ui-react";

export default class Preferences extends React.Component {
    render() {
        return <Segment>
            <h1>Ваши настройки</h1>
            <br/>
            <Checkbox disabled label='Динамика среднего балла по экзамену' defaultChecked/><br/><br/>
            <Checkbox disabled label='Динамика баллов по предметам' defaultChecked/><br/><br/>
            <Checkbox disabled label='Оценки за выбранный период' defaultChecked/><br/><br/>
            <Checkbox disabled label='Распределение баллов для предмета' defaultChecked/><br/><br/>
            <Button onClick={() => console.log("TODO")} primary>Применить</Button>
        </Segment>
    }
}
