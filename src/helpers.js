import {SUBJECTS, YEARS} from "./constans";

export function sortArrayByKey(array, key, direction) {
    return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        if (direction === "ascending") {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        } else {
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        }
    });
}

function containsObjectByKey(obj, list, key) {
    for (let i = 0; i < list.length; i++) {
        if (list[i][key] === obj[key]) {
            return i;
        }
    }
    return null;
}

export function avgByKey(array, key, avgKeys) {
    let result = [];
    for (let d of array) {
        let i = containsObjectByKey(d, result, key);
        if (i === null) {
            let e = {};
            e.value = 1;
            e[key] = d[key];
            for (let k of avgKeys) {
                e[k] = d[k];
            }
            result.push(e);
        } else {
            result[i].value++;
            for (let k of avgKeys) {
                result[i][k] += d[k];
            }
        }
    }

    for (let i = 0; i < result.length; i++) {
        for (let k of avgKeys) {
            result[i][k] = result[i][k] / result[i].value;
        }
    }

    return sortArrayByKey(result, "Period", "ascending");
}

export function sumGradesByExamType(array, exam, period) {
    let result = [];
    for (let d of array) {
        let i = containsObjectByKey(d, result, "Grade");
        if (d["Period"] === period) {
            if (i === null) {
                if (d["Exam"] === exam) {
                    let e = {};
                    e["Grade"] = d["Grade"];
                    e.name = "Oценка " + d["Grade"];
                    e.value = 1;
                    result.push(e);
                }
            } else {
                if (d["Exam"] === exam) {
                    result[i].value++;
                }
            }
        }
    }

    return sortArrayByKey(result, "Grade", "descending");
}

export function avgScoreBySchool(array, exam, period) {
    let result = [];
    for (let d of array) {
        let i = containsObjectByKey(d, result, "School");
        if (d["Period"] === period && d["Exam"] === exam) {
            if (i === null) {
                let e = {};
                e["Score"] = d["Score"];
                e["School"] = d["School"];
                e.value = 1;
                result.push(e);
            } else {
                result[i].value++;
                result[i]["Score"] += d["Score"];
            }
        }
    }

    for (let i = 0; i < result.length; i++) {
        result[i].avg = Math.round(result[i]["Score"] / result[i].value);
        result[i].name = result[i]["School"];
    }

    return result;
}

export function avgScoreByExamType(array) {
    let result = [];
    let key = "Period";

    for (let d of array) {
        let i = containsObjectByKey(d, result, key);
        if (i === null) {
            let e = {};

            if (d["Exam"] === "ЕГЭ") {
                e['OGE_value'] = 0;
                e['OGE_score'] = 0;
                e['EGE_value'] = 1;
                e['EGE_score'] = d["Score"];
            } else {
                e['EGE_value'] = 0;
                e['EGE_score'] = 0;
                e['OGE_value'] = 1;
                e['OGE_score'] = d["Score"];
            }

            e[key] = d[key];
            result.push(e);
        } else {
            if (d["Exam"] === "ЕГЭ") {
                result[i]['EGE_value'] += 1;
                result[i]['EGE_score'] += d["Score"];
            } else {
                result[i]['OGE_value'] += 1;
                result[i]['OGE_score'] += d["Score"];
            }
        }
    }

    for (let i = 0; i < result.length; i++) {
        result[i]['OGE_score'] /= result[i]["OGE_value"];
        result[i]['EGE_score'] /= result[i]["EGE_value"];
        result[i]['OGE_score'] = Math.round(result[i]['OGE_score']);
        result[i]['EGE_score'] = Math.round(result[i]['EGE_score']);
    }

    return sortArrayByKey(result, key, "ascending");
}

export function doBarChart(array, exam, subject, period) {
    let result = [
        {name: "0-30", value: 0},
        {name: "31-40", value: 0},
        {name: "41-50", value: 0},
        {name: "51-60", value: 0},
        {name: "61-70", value: 0},
        {name: "71-80", value: 0},
        {name: "81-90", value: 0},
        {name: "90-100", value: 0},
    ];

    for (let d of array) {
        if (d["Exam"] === exam && d["Subject"] === subject && d["Period"] === period) {
            let score = d["Score"];

            if (score <= 30) {
                result[0].value++;
            } else if (score <= 40) {
                result[1].value++
            } else if (score <= 50) {
                result[2].value++
            } else if (score <= 60) {
                result[3].value++
            } else if (score <= 70) {
                result[4].value++
            } else if (score <= 80) {
                result[5].value++
            } else if (score <= 90) {
                result[6].value++
            } else if (score <= 100) {
                result[7].value++
            }
        }
    }

    return result;
}

export function avgScoreBySubjects(array, exam) {
    let result = [];
    let key = "Period";

    for (let period of YEARS) {
        let e = {};
        e["Period"] = period.key;
        for (let subject of SUBJECTS) {
            e[subject.key] = 0;
            e[subject.key + "_v"] = 0;
        }
        result.push(e);
    }

    for (let d of array) {
        if (d["Exam"] === exam) {
            let i = containsObjectByKey(d, result, "Period");
            result[i][d["Subject"] + "_v"]++;
            result[i][d["Subject"]] += d["Score"];
        }
    }

    for (let i = 0; i < result.length; i++) {
        for (let s of SUBJECTS) {
            result[i][s.key] = Math.round(result[i][s.key] / result[i][s.key + "_v"]);
        }
    }

    return sortArrayByKey(result, key, 'ascending')
}
