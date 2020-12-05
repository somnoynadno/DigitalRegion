import React from "react";
import {Button, Divider, Input, Segment, Table} from "semantic-ui-react";
import {api} from "../http/API";
import moment from 'moment';
import 'moment/locale/ru';
import {Base64} from 'js-base64';

moment.locale('ru');

export default class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            selectedFile: null,
            successText: '',
            disabled: false
        }
    }

    componentDidMount = async () => {
        await api.GetUsers().then((users) => this.setState({users}));
    }

    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]});
    };

    onFileUpload = () => {
        this.setState({disabled: true});
        const formData = new FormData();

        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        let fr = new FileReader();
        fr.readAsText(this.state.selectedFile);

        fr.onloadend = async () => {
            let data = Base64.encode(fr.result.toString());
            await api.ImportCSV(data).then((r) => {
                this.setState({successText: "Загрузка прошла успешно"});
            })
        }
    };

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return <Segment>
            <h2>Школа №1</h2>
            <Input type="file" onChange={this.onFileChange} accept=".csv"/>
            <br/>
            <br/>
            <Button disabled={this.state.disabled} primary onClick={this.onFileUpload}>Загрузить CSV</Button>
            <span style={{color: "green"}}>{this.state.successText}</span>
            <Divider/>
            <h2>Все пользователи</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Школа</Table.HeaderCell>
                        <Table.HeaderCell>Логин</Table.HeaderCell>
                        <Table.HeaderCell>Добавлено строк</Table.HeaderCell>
                        <Table.HeaderCell>Последний вход</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.users.map((u, i) => {
                        return <Table.Row>
                            <Table.Cell><b>{i + 1}</b></Table.Cell>
                            <Table.Cell>{u["School"]}</Table.Cell>
                            <Table.Cell>{u["Username"]}</Table.Cell>
                            <Table.Cell>{u["DataUploads"]}</Table.Cell>
                            <Table.Cell>{moment(u["UpdatedAt"]).format("LL")}</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>

            </Table>
            <br/>
        </Segment>
    }
}
