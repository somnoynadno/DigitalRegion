import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import PropTypes from 'prop-types';
import {avgScoreByExamType} from "../helpers";


export default class Dashboards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({data: nextProps.data});
    }

    render() {
        return (
            <div style={{width: "100%", height: 300}}>
                <h2 style={{textAlign: "center"}}>Динамика среднего балла</h2>
                <ResponsiveContainer>
                    <LineChart
                        width={500}
                        height={300}
                        data={avgScoreByExamType([...this.state.data])}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="Period"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line name="Средний балл ОГЭ" type="monotone" dataKey="OGE_score" stroke="green"/>
                        <Line name="Средний балл ЕГЭ" type="monotone" dataKey="EGE_score" stroke="blue"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

Dashboards.propTypes = {
    data: PropTypes.array.required
};
