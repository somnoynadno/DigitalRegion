import React from "react";
import {Button, Checkbox, Segment} from "semantic-ui-react";

export default class Preferences extends React.Component {
    render() {
        return <Segment>
            <h1>Ваши настройки</h1>
            <br/>
            <Checkbox label='Динамика результатов' defaultChecked/><br/><br/>
            <Checkbox label='Оценки за период' defaultChecked/><br/><br/>
            <Button onClick={() => console.log("TODO")} primary>Применить</Button>
        </Segment>
    }
}
