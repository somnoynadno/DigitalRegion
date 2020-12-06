import React from 'react';
import {
    Bar,
    BarChart,
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
import {avgScoreByExamType, avgScoreBySchool, avgScoreBySubjects, doBarChart, sumGradesByExamType,} from "../helpers";
import {Divider, Segment, Select} from "semantic-ui-react";
import {COLORS, EXAMS, MATERIAL, SUBJECTS, YEARS} from "../constans";
import Statistics from "./Statistics";

const defaultYear = 2019;
const defaultExam = 'ЕГЭ';
const defaultSubject = 'Математика';

export default class Dashboards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            selectedYear: defaultYear,

            barChartYear: defaultYear,
            barChartSubject: defaultSubject,
            barChartExam: defaultExam,

            selectedExam: defaultExam,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({data: nextProps.data});
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                <Statistics/>
                <Segment style={{height: 300}}>
                    <h2 style={{textAlign: "center"}}>Динамика результатов</h2>
                    <ResponsiveContainer>
                        <LineChart
                            data={avgScoreByExamType([...this.state.data])}
                            margin={{
                                top: 10, right: 30, left: 20, bottom: 50,
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
                </Segment>
                <Segment style={{height: window.screen.width < 600 ? 400 : 470}}>
                    <div>
                        <h2 style={{textAlign: "center"}}>Оценки и средний балл по школам</h2>
                        <Select placeholder='Выберите год' options={YEARS} style={{float: "right"}}
                                onChange={(event, {value}) => {
                                    this.setState({selectedYear: value})
                                }} defaultValue={defaultYear}/>
                    </div>
                    <div style={{clear: "both"}}/>
                    <div style={{height: window.screen.width < 600 ? 200 : 300, width: "40%", float: "left"}}>
                        <h4>Результат ЕГЭ</h4>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={sumGradesByExamType(this.state.data, "ЕГЭ", this.state.selectedYear)}
                                     dataKey="value"
                                     outerRadius={window.screen.width < 600 ? 30 : 60}>
                                    {
                                        sumGradesByExamType(this.state.data, "ЕГЭ", this.state.selectedYear).map((entry, index) =>
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                                <Pie data={avgScoreBySchool(this.state.data, "ЕГЭ", this.state.selectedYear)}
                                     dataKey="avg" label
                                     innerRadius={window.screen.width < 600 ? 30 : 70} outerRadius={window.screen.width < 600 ? 40 : 90} fill="lightgray"/>
                                <Tooltip/>
                                <Legend payload={pieLegend} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{height: window.screen.width < 600 ? 200 : 300, width: "40%", float: "right"}}>
                        <h4>Результат ОГЭ</h4>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={sumGradesByExamType(this.state.data, "ОГЭ", this.state.selectedYear)}
                                     dataKey="value"
                                     outerRadius={window.screen.width < 600 ? 30 : 60} fill="blue">
                                    {
                                        sumGradesByExamType(this.state.data, "ОГЭ", this.state.selectedYear).map((entry, index) =>
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                                <Pie data={avgScoreBySchool(this.state.data, "ОГЭ", this.state.selectedYear)}
                                     dataKey="avg"
                                     innerRadius={window.screen.width < 600 ? 30 : 70} outerRadius={window.screen.width < 600 ? 40 : 90} fill="lightgray" label/>
                                <Tooltip/>
                                <Legend payload={pieLegend} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Segment>
                <Segment style={{height: 400}}>
                    <h2 style={{textAlign: "center"}}>Распределение баллов для предмета</h2>
                    <Select placeholder='Выберите год' options={YEARS} style={{float: "right"}}
                            onChange={(event, {value}) => {
                                this.setState({barChartYear: value})
                            }} defaultValue={defaultYear}/>
                    <Select placeholder='Выберите экзамен' options={EXAMS} style={{float: "right"}}
                            onChange={(event, {value}) => {
                                this.setState({barChartExam: value})
                            }} defaultValue={defaultExam}/>
                    <Select placeholder='Выберите предмет' options={SUBJECTS} style={{float: "right"}}
                            onChange={(event, {value}) => {
                                this.setState({barChartSubject: value})
                            }} defaultValue={defaultSubject}/>
                    <div style={{clear: "both"}}/>
                    <br/>
                    <ResponsiveContainer>
                        <BarChart
                            data={doBarChart(this.state.data, this.state.barChartExam,
                                this.state.barChartSubject, this.state.barChartYear)}
                            margin={{
                                top: 5, right: 30, left: 20,
                                bottom: window.screen.width < 920 ? (window.screen.width > 500 ? 150 : 210) : 120,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar animationDuration={3000} dataKey="value" name="Количество работ" fill="#8884d8"/>
                        </BarChart>
                    </ResponsiveContainer>
                    <br/>
                    <br/>
                </Segment>
                <Segment style={{height: 440, marginBottom: 30}}>
                    <h2 style={{textAlign: "center"}}>Динамика баллов по предметам</h2>
                    <Select placeholder='Выберите экзамен' options={EXAMS} style={{float: "right"}}
                            onChange={(event, {value}) => {
                                this.setState({selectedExam: value})
                            }} defaultValue={defaultExam}/>
                    <div style={{clear: "both"}}/>
                    <ResponsiveContainer>
                        <LineChart
                            data={avgScoreBySubjects([...this.state.data], this.state.selectedExam)}
                            margin={{
                                top: 10, right: 30, left: 20, bottom: 100,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="Period"/>
                            <YAxis domain={['auto', 'auto']}/>
                            <Tooltip/>
                            <Legend/>
                            {
                                SUBJECTS.map((s, i) => {
                                    return <Line key={i} name={s.key} type="monotone" dataKey={s.key}
                                                 stroke={MATERIAL[i]}/>
                                })
                            }
                        </LineChart>
                    </ResponsiveContainer>
                </Segment>
            </div>
        );
    }
}

Dashboards.propTypes = {
    data: PropTypes.array.required
};

let pieLegend = [];
for (let i = 0; i < COLORS.length; i++) pieLegend.push({ value: 5-i, type: 'rect', id: i, color: COLORS[i] });
