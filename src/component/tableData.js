import React,{ Component } from 'react';
import * as d3 from 'd3';
import {withStyles} from "@material-ui/core/styles";

class Tabledata  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        }
        this.handleInput();
        // var r = 12 * this.props.parameter.DesignLife - 1;
        // this.props.AnalysisPunchouts(this.props.rows[r][12]);
    }
    componentDidUpdate(prevProps) {
        if (this.props.rows!==prevProps.rows){
            this.handleInput();
            // var r = 12 * this.props.parameter.DesignLife - 1;
            // this.props.AnalysisPunchouts(this.props.rows[r][12]);
        }
    }

    handleInput() {
        const rows = this.props.rows;
        var minArray = [];
        var maxArray = [];
        for (var j = 0; j < rows[0].length; j++) {
            minArray.push(1000000000);
            maxArray.push(0);
        }
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].length; j++) {
                if (rows[i][j] > maxArray[j])
                    maxArray[j] = rows[i][j];
                if (rows[i][j] < minArray[j])
                    minArray[j] = rows[i][j];
            }
        }
        this.colorRedBlues = [];
        for (var j = 0; j < rows[0].length; j++) {
            var colorScale = d3.scaleLinear()
                .domain([minArray[j], (minArray[j] + maxArray[j]) / 2, maxArray[j]])
                .range(["#55f", "white", "#f55"]);
            this.colorRedBlues.push(colorScale);
        }
    }

    titles = ["Age (Month)","Age (Year)", "Modulus of Rupture (psi)","Modulus of Elasticity (ksi)"
        ,"Concrete Stress (T) (psi)"
        ,"Concrete Stress (E) (psi)"
        ,"Total Concrete Stress (psi)"
        ,"Stress to Strength Ratio (psi/psi)"
        ,"Number of Load Repetitions to Failure"
        ,"Number of Load Repetitions"
        ,"Pavement Damage"
        ,"Cumulative Damage"
        ,"Number of Punchouts per Mile"]
    render() {
        debugger
        var r = 12 * this.props.parameter.DesignLife - 1;
        if (this.colorRedBlues&&this.props.rows[r]) {
            var color = this.props.colorgreenred(this.props.rows[r][12]);
            return (<div>
                <div id="div_CRCP_PERFORMANCE"><b>CRCP PERFORMANCE</b><br/>
                    Number of Punchouts per Mile:<input type="TEXT" disabled style={{
                        "background-color": color,
                        textAlign: "center",
                        fontSize: 17,
                        fontWeight: "bold"
                    }} value={parseFloat(this.props.rows[r][12]).toFixed(2)} size="7"/><br/><br/>
                </div>
                <div id="divCheckbox1"><input type="checkbox" id="checkbox1"
                                              onChange={(event) => this.setState({visible: event.target.checked})}/>
                    <label for="checkbox1"> Analysis Result </label></div>
                <table style={{width: '99%', fontSize: '12px', display: this.state.visible ? 'table' : 'none'}}
                       border="1" id="analysisTable">
                    <tr style={{backgroundColor: "#888"}}>
                        {this.titles.map(t => <td>{t}</td>)}
                    </tr>
                    {this.props.rows.map(r => <tr>{r.map((c, j) => <td style={{
                        textAlign: 'right',
                        backgroundColor: (j === 12) ? this.props.colorgreenred(c) : this.colorRedBlues[j](c),
                        paddingRight: '10px',
                        paddingTop: '0px',
                        paddingBottom: '0px'
                    }}>
                        {([1, 2, 3, 12, 8, 9, 5, 6, 7, 10, 11].indexOf(j) !== -1) ? parseFloat(c).toFixed((j == 1 || j == 12) ? 2 : ((j == 2 || j == 3 || j == 8 || j == 9) ? 0 : ((j == 5 || j == 6) ? 1 : ((j == 7) ? 3 : 4)))) : c}
                    </td>)}</tr>)}
                </table>
            </div>)
        }else
            return ''
    }
}

export default Tabledata;
