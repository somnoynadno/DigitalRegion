import React from 'react'
import {Pagination, Table} from 'semantic-ui-react'
import PropTypes from "prop-types";
import {sortArrayByKey} from "../helpers";

const maxOnPage = 50;

export default class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            // pagination
            activePage: 1,
            displayedData: this.props.data.slice(0, maxOnPage),
            // sorting
            column: null,
            direction: null
        }

        this.changeSort.bind(this);
    }

    changeSort = (column) => {
        let direction = this.state.direction === 'ascending' ? 'descending' : 'ascending';
        let sortedData = sortArrayByKey([...this.state.data], column, direction);
        this.setState({
            data: sortedData, column, displayedData: sortedData.slice(0, maxOnPage), activePage: 1, direction
        });
    }

    handlePaginationChange = (e, {activePage}) => {
        let displayedData = this.state.data.slice((activePage - 1) * maxOnPage, (activePage) * maxOnPage);
        this.setState({displayedData, activePage});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({data: nextProps.data});
    }

    render() {
        const {column, displayedData, direction} = this.state;

        return <Table sortable celled fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'ID' ? direction : null}
                        onClick={() => this.changeSort("ID")}
                    >#</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'School' ? direction : null}
                        onClick={() => this.changeSort("School")}
                    >Школа</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'Student' ? direction : null}
                        onClick={() => this.changeSort("Student")}
                    >Ученик</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'Exam' ? direction : null}
                        onClick={() => this.changeSort("Exam")}
                    >Экзамен</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'Period' ? direction : null}
                        onClick={() => this.changeSort("Period")}
                    >Год</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'Subject' ? direction : null}
                        onClick={() => this.changeSort("Subject")}
                    >Предмет</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'Score' ? direction : null}
                        onClick={() => this.changeSort("Score")}
                    >Балл</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'Grade' ? direction : null}
                        onClick={() => this.changeSort("Grade")}
                    >Оценка</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {displayedData.map((elem, i) => {
                    return <Table.Row key={i}>
                        <Table.Cell><b>{elem["ID"]}</b></Table.Cell>
                        <Table.Cell>{elem["School"]}</Table.Cell>
                        <Table.Cell>{elem["Student"]}</Table.Cell>
                        <Table.Cell>{elem["Exam"]}</Table.Cell>
                        <Table.Cell>{elem["Period"]}</Table.Cell>
                        <Table.Cell>{elem["Subject"]}</Table.Cell>
                        <Table.Cell>{elem["Score"]}</Table.Cell>
                        <Table.Cell>{elem["Grade"]}</Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>

            <Pagination
                activePage={this.state.activePage}
                onPageChange={this.handlePaginationChange}
                totalPages={Math.ceil(this.state.data.length / maxOnPage)}
            />
        </Table>
    }
}

DataTable.propTypes = {
    data: PropTypes.array.required
};
