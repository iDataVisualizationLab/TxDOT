import React, {Component} from 'react';
import './Graph.css';
import Tabledata from './tableData';
import {withStyles} from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
    Paper,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    TextField,
    Container
} from '@material-ui/core';
import * as d3 from 'd3';
import {tip as d3tip} from "d3-v6-tip";

const styles = theme => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            width: '100%',
        },
        '& input': {
            width: '100%',
        },
    }
});

class Graph extends Component {
    constructor(props) {
        super(props);
        const margin = {top: 20, right: 80, bottom: 60, left: 120},
            width = 900 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        this.state = {
            margin,
            width,
            height,
            // row1:[],
            // rows:[],
            init: true
        }
    }

    colorGreenRed = d3.scaleLinear()
        .domain([0, 25])
        .range(["#0f0", "#f00"]);
    tip = d3tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html((d) => {
            var color = this.colorGreenRed(d.y);
            var html = "#Punchouts per Mile: <span style='color:" + color + "; font-weight: bold'>" + parseFloat(d.y).toFixed(2) + "</span><br>";
            html += "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Age (months):  <span style='color:white; font-weight: bold'>" + d.x + "</span>";
            return html;
        });

    componentDidMount() {
        this.tableCreate();
        this.parameterGraph();
    }

    init = true;

    componentDidUpdate(prevProps) {
        const init = ((this.props.init !== prevProps.init) && this.props.init);
        // console.log('-------------------------',init)
        this.init = init || this.init;
        // console.log('-------------------------this',this.init)
        if ((this.props.parameter !== prevProps.parameter) || this.init) {
            this.parameterGraph();
            if (this.refs.svg && this.state.xAxis && this.state.yAxis) {
                const svg = d3.select(this.refs.svg).select('g.content');
                svg.selectAll(".xaxis")
                    .attr("transform", "translate(0," + this.state.height + ")")
                    .call(this.state.xAxis);
                svg.selectAll(".yaxis")
                    .call(this.state.yAxis);
                if (this.init && this.state.dataset.length) {
                    //     debugger
                    //     svg.selectAll(".point")
                    //         .data(this.state.dataset).enter()
                    //         .append("circle")
                    //         .attr("class", "point")
                    //         .attr("r", 4)
                    //         .attr("cx", (d)=>this.state.xScale(d.x))
                    //         .attr("cy", (d)=> this.state.yScale(d.y))
                    //         .attr("fill", (d)=> this.colorGreenRed(d.y))
                    //         .attr("stroke-width", 0.5)
                    //         .attr("stroke","#000")
                    //         .on('mouseover', this.tip.show)
                    //         .on('mouseout', this.tip.hide)
                    //     svg.call(this.tip)
                    this.init = false;
                }
                // }else{
                //     svg.selectAll(".point")
                //         .data(this.state.dataset)
                //         .attr("cx", (d)=> this.state.xScale(d.x))
                //         .attr("cy", (d,i)=>this.state.yScale(d.y))
                //         .attr("fill", (d)=> this.colorGreenRed(d.y));
                // }
            }
        }
    }

    parameterGraph = () => {
        const width = this.state.width;
        const height = this.state.height;
        const rows = this.props.rows;
        var dataset = [];
        for (var i = 0; i < rows.length; i++) {
            var obj = {};
            obj.x = rows[i][0];
            obj.y = rows[i][12];
            dataset.push(obj);
        }
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d) {
                return d.x;
            })])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d) {
                return d.y;
            })])
            .range([height, 0]);
        var xAxis = d3.axisBottom(xScale)
            .tickSizeInner(-height)
            .tickSizeOuter(0)
            .tickPadding(10);

        var yAxis = d3.axisLeft(yScale)
            .tickSizeInner(-width)
            .tickSizeOuter(0)
            .tickPadding(10);

        var line = d3.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            });

        this.setState({xScale, yScale, xAxis, yAxis, line, dataset});
    }

    tableCreate = () => {

    }

    render() {
        const {classes} = this.props;
        return ((this.props.rows.length && this.state.dataset) ?
            <Grid container alignItems="center" direction={"column"} spacing={1}>
                <Grid item xs={11}>
                    <svg ref="svg"
                         width={this.state.width + this.state.margin.left + this.state.margin.right}
                         height={this.state.height + this.state.margin.top + this.state.margin.bottom}>
                        <g className="content"
                           transform={"translate(" + this.state.margin.left + "," + this.state.margin.top + ")"}>
                            <text className="xAxisText"
                                  style={{"textAnchor": "middle", "textShadow": "1px 1px 0 rgba(200, 200, 200, 0.7"}}
                                  fontFamily="sans-serif" fontSize="16px" x={this.state.width / 2}
                                  y={this.state.height + 40}>Age (months)
                            </text>
                            <text className="YAxisText"
                                  transform={"translate(" + (-50) + "," + this.state.height / 2 + ")" + " rotate(-90)"}
                                  style={{"textAnchor": "middle", "textShadow": "1px 1px 0 rgba(200, 200, 200, 0.7"}}
                                  fontFamily="sans-serif" fontSize="16px">Number of Punchouts per Mile
                            </text>
                            <g className="xaxis" transform={"translate(0," + this.state.height + ")"}></g>
                            <g className="yaxis"></g>
                            <path className="line" d={this.state.line(this.state.dataset)}/>
                            {this.state.dataset.map(d => <circle className="point" r={4} cx={this.state.xScale(d.x)}
                                                                 cy={this.state.yScale(d.y)}
                                                                 fill={this.colorGreenRed(d.y)}
                                                                 strokeWidth={0.5} stroke={"#000"}></circle>)}
                        </g>
                    </svg>
                </Grid><Grid item xs={11}><Tabledata AnalysisPunchouts={this.props.AnalysisPunchouts}
                                                     parameter={this.props.parameter} colorgreenred={this.colorGreenRed}
                                                     rows={this.props.rows}/></Grid></Grid> : '');
    }
}

export default withStyles(styles)(Graph);
