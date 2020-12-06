import React from "react";
import {Statistic, Segment, Select, Divider} from "semantic-ui-react";
import {EXAMS, YEARS} from "../constans";
import {api} from "../http/API";

const defaultPeriod = 2019;
const defaultExam = 'ЕГЭ';

export default class Statistics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stats: null,
            period: defaultPeriod,
            exam: defaultExam,
        };

        this.fetchStats.bind(this);
    }

    componentDidMount = async () => {
        await this.fetchStats();
    }

    fetchStats = async () => {
        if (this.state.exam && this.state.period) {
            await api.GetStats(this.state.exam, this.state.period).then((stats) => this.setState({stats}));
        }
    }

    render() {
        return <Segment style={{paddingBottom: 30}}>
            <h2 style={{textAlign: "center"}}>Самое важное</h2>
            <Select placeholder='Выберите год' options={YEARS} defaultValue={defaultPeriod}
                    onChange={async (event, {value}) => {
                        this.setState({period: value});
                        await this.fetchStats();
                    }} style={{float: "right"}}/>
            <Select placeholder='Выберите экзамен' options={EXAMS} defaultValue={defaultExam}
                    onChange={async (event, {value}) => {
                        this.setState({exam: value});
                        await this.fetchStats();
                    }} style={{float: "left"}}/>
                    <Divider hidden style={{clear: "both"}}/>
            {this.state.stats ?
                <div>
                    <Statistic.Group size="medium" widths='three'>
                        <Statistic color='teal'>
                            <Statistic.Value>{this.state.stats["TotalWorks"]}</Statistic.Value>
                            <Statistic.Label>Всего работ</Statistic.Label>
                        </Statistic>
                        <Statistic color='olive'>
                            <Statistic.Value>{this.state.stats["PassedPercentage"]}%</Statistic.Value>
                            <Statistic.Label>Процент сдачи</Statistic.Label>
                        </Statistic>
                        <Statistic color='yellow'>
                            <Statistic.Value>{this.state.stats["NumberOfTopWorks"]}</Statistic.Value>
                            <Statistic.Label>Стобальников</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                    <Divider hidden/>
                    <Statistic.Group size="tiny" widths='three'>
                        <Statistic color='green'>
                            <Statistic.Value>{this.state.stats["TopSchool"]}</Statistic.Value>
                            <Statistic.Label>Высший балл: {this.state.stats["TopScore"]}</Statistic.Label>
                        </Statistic>
                        <Statistic color='red'>
                            <Statistic.Value>{this.state.stats["WorstSchool"]}</Statistic.Value>
                            <Statistic.Label>Худший балл: {this.state.stats["WorstScore"]}</Statistic.Label>
                        </Statistic>
                        <Statistic color='violet'>
                            <Statistic.Value>{Math.round(this.state.stats["AverageGrade"] * 10) / 10}</Statistic.Value>
                            <Statistic.Label>Средняя оценка</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                    <Divider hidden/>
                    <Statistic.Group size="mini" widths='four'>
                        <Statistic color='green'>
                            <Statistic.Value>{this.state.stats["TopSubject"]}</Statistic.Value>
                            <Statistic.Label>Лучший предмет</Statistic.Label>
                        </Statistic>
                        <Statistic color='red'>
                            <Statistic.Value>{this.state.stats["WorstSubject"]}</Statistic.Value>
                            <Statistic.Label>Худший предмет</Statistic.Label>
                        </Statistic>
                        <Statistic color='brown'>
                            <Statistic.Value>{this.state.stats["TopStudent"]}</Statistic.Value>
                            <Statistic.Label>Лучший ученик</Statistic.Label>
                        </Statistic>
                        <Statistic color='yellow'>
                            <Statistic.Value>{this.state.stats["TopTotalScore"]}</Statistic.Value>
                            <Statistic.Label>Суммарный балл</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </div>
                : ''
            }
        </Segment>
    }
}
