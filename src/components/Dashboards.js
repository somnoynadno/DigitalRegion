import React from 'react';
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import PropTypes from 'prop-types';
import {avgScoreByExamType, avgScoreBySchool, sumGradesByExamType,} from "../helpers";
import {Divider, Select} from "semantic-ui-react";

const COLORS = ['#4caf50', '#cddc39', '#ffc107', '#f44336'];
const YEARS = [
    {key: 2015, value: 2015, text: '2015'},
    {key: 2016, value: 2016, text: '2016'},
    {key: 2017, value: 2017, text: '2017'},
    {key: 2018, value: 2018, text: '2018'},
    {key: 2019, value: 2019, text: '2019'},
]

export default class Dashboards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            selectedYear: 2019
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({data: nextProps.data});
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                <div style={{height: 240, marginBottom: 30}}>
                    <h2 style={{textAlign: "center"}}>Динамика результатов</h2>
                    <ResponsiveContainer>
                        <LineChart
                            data={avgScoreByExamType([...this.state.data])}
                            margin={{
                                top: 10, right: 30, left: 20, bottom: 30,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="Period"/>
                            <YAxis domain={['auto', 'auto']}/>
                            <Tooltip/>
                            <Legend/>
                            <Line name="Средний балл ОГЭ" type="monotone" dataKey="OGE_score" stroke="green"/>
                            <Line name="Средний балл ЕГЭ" type="monotone" dataKey="EGE_score" stroke="blue"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <Divider/>
                <div style={{height: 300}}>
                    <div>
                        <h2 style={{textAlign: "center"}}>Оценки и средний балл по школам</h2>
                        <Select placeholder='Выберите год' options={YEARS} style={{float: "right"}}
                                onChange={(event, {value}) => {
                                    this.setState({selectedYear: value})
                                }}/>
                    </div>
                    <div style={{clear: "both"}}/>
                    <div style={{height: 300, width: "40%", float: "left"}}>
                        <h4>Результат ЕГЭ</h4>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={sumGradesByExamType(this.state.data, "ЕГЭ", this.state.selectedYear)}
                                     dataKey="value"
                                     outerRadius={60}>
                                    {
                                        sumGradesByExamType(this.state.data, "ЕГЭ", this.state.selectedYear).map((entry, index) =>
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                                <Pie data={avgScoreBySchool(this.state.data, "ЕГЭ", this.state.selectedYear)}
                                     dataKey="avg"
                                     innerRadius={70} outerRadius={90} fill="lightgray" label/>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{height: 300, width: "40%", float: "right"}}>
                        <h4>Результат ОГЭ</h4>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={sumGradesByExamType(this.state.data, "ОГЭ", this.state.selectedYear)}
                                     dataKey="value"
                                     outerRadius={60} fill="blue">
                                    {
                                        sumGradesByExamType(this.state.data, "ОГЭ", this.state.selectedYear).map((entry, index) =>
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                                <Pie data={avgScoreBySchool(this.state.data, "ОГЭ", this.state.selectedYear)}
                                     dataKey="avg"
                                     innerRadius={70} outerRadius={90} fill="lightgray" label/>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboards.propTypes = {
    data: PropTypes.array.required
};
