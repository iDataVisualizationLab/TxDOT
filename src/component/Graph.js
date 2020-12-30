import React,{ Component } from 'react';
import './Graph.css';
import Tabledata from './tableData';
import {withStyles} from '@material-ui/core/styles';
import {Grid,Typography,Button,Paper,Stepper,Step,StepLabel,StepContent,TextField,Container} from '@material-ui/core';
import * as d3 from 'd3';
import { tip as d3tip } from "d3-v6-tip";
import stress from './data/stress.csv'

const styles = theme=> ({
    root: {
        width:'100%',
        '& .MuiTextField-root': {
            width: '100%',
        },
        '& input': {
            width: '100%',
        },
    }
});

class Graph extends Component{
    constructor(props) {
        super(props);
        const margin = {top: 20, right: 80, bottom: 60, left: 120},
            width = 900 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        this.state={
            margin,
            width,
            height,
            row1:[],
            rows:[],
            init:true
        }
    }
    colorGreenRed = d3.scaleLinear()
        .domain([0, 25])
        .range(["#0f0", "#f00"]);
    tip = d3tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html((d) =>{
            var color =  this.colorGreenRed(d.y);
            var html = "#Punchouts per Mile: <span style='color:"+color+"; font-weight: bold'>" + parseFloat(d.y).toFixed(2) + "</span><br>";
            html += "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Age (months):  <span style='color:white; font-weight: bold'>" + d.x + "</span>";
            return html;
        });
    componentDidMount() {
        d3.tsv(stress).then(data_=>{
            this.setState({data: data_});
            this.recompute();
            this.tableCreate();
            this.parameterGraph();
        });
    }
    init = true;
    componentDidUpdate(prevProps) {
        const init = ((this.props.init !== prevProps.init)&&this.props.init);
        // console.log('-------------------------',init)
        this.init = init||this.init;
        // console.log('-------------------------this',this.init)
        if ((this.props.parameter !== prevProps.parameter) ||this.init) {
            this.recompute();
            this.parameterGraph();
            if (this.state.data && this.refs.svg && this.state.xAxis && this.state.yAxis) {
                const svg = d3.select(this.refs.svg).select('g.content');
                svg.selectAll(".xaxis")
                    .attr("transform", "translate(0," + this.state.height + ")")
                    .call(this.state.xAxis);
                svg.selectAll(".yaxis")
                    .call(this.state.yAxis);
                if (this.init&&this.state.dataset.length){
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
                    this.init = false;}
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
    recompute = ()=>{
        const data = this.state.data;
        let rowIndexStress = 9;
        let row1 = [];
        const rows = [];

        row1.push( 1 );
        row1.push( row1[0]/ 12 );
        row1.push( this.props.parameter.F8);
        row1.push( 57000 / 7.5 * row1[2] / 1000 );
        row1.push( +data[rowIndexStress-2]["STR (T)"] );
        row1.push( data[rowIndexStress-2]["STR (E)"] * row1[3] / 5000 )
        row1.push( row1[4] + row1[5] )
        row1.push( row1[6] / row1[2] )
        row1.push( 11800 * Math.pow(row1[7],fatigue(this.props.parameter.F19) ))
        row1.push( lane(this.props.parameter.C24)
            * this.props.parameter.C25 * 1000000 / 12 / this.props.parameter.C18 )
        row1.push( row1[9] / row1[8] )
        row1.push( row1[10] )
        row1.push( 18.985 / (1 + 5 * Math.pow(row1[11],-1.1)) )
        rows.push(row1);    // Add to the array

        //console.log(+document.getElementById("C18").value);
        for (var i=0; i<this.props.parameter.C18;i++){
            //debugger;
            if (i!=0)
                rowIndexStress = 8;
            for (var j=0;j<12; j++){
                if (i==0 && j==0)
                    ;
                    //If counterYear = 1 And counterMonth = 1 Then
                //      'If First Year than Omit Calculation of First Month, Already Done
                else {
                    rowIndexStress = rowIndexStress + 1
                    let row2 = [];
                    row2.push( row1[0] + 1 )
                    row2.push( row2[0]/ 12 );
                    // Cells(rowIndex, 2) = Cells(rowIndex, 1).Value / 12
                    row2.push( this.props.parameter.F8
                        * Math.pow((30 * row2[0] / (4 + 0.85 * 30 * row2[0])), 0.5) );
                    // Cells(rowIndex, 3) = Sheets("Input").Range("F8").Value * ((30 * Cells(rowIndex, 1).Value / (4 + 0.85 * 30 * Cells(rowIndex, 1).Value))) ^ 0.5
                    row2.push( 57000 / 7.5 * row2[2] / 1000 );
                    // Cells(rowIndex, 4) = 57000 / 7.5 * Cells(rowIndex, 3) / 1000
                    row2.push( +data[rowIndexStress-2]["STR (T)"] );
                    // Cells(rowIndex, 5) = Sheets("Stress").Cells(rowIndexStress, 38).Value
                    row2.push( data[rowIndexStress-2]["STR (E)"] * row2[3] / 5000 );
                    // Cells(rowIndex, 6) = Sheets("Stress").Cells(rowIndexStress, 39).Value * Cells(rowIndex, 4) / 5000
                    row2.push( row2[4] + row2[5] );
                    // Cells(rowIndex, 7) = Cells(rowIndex, 5).Value + Cells(rowIndex, 6).Value
                    row2.push( row2[6] / row2[2] );
                    // Cells(rowIndex, 8) = Cells(rowIndex, 7).Value / Cells(rowIndex, 3).Value
                    row2.push( 11800 * Math.pow(row2[7],fatigue(this.props.parameter.F19)) );
                    // Cells(rowIndex, 9) = 11800 * Cells(rowIndex, 8).Value ^ fatigue(Sheets("Input").Range("F19").Value)
                    row2.push( row1[9] );
                    // Cells(rowIndex, 10) = Cells(rowIndex - 1, 10).Value
                    row2.push( row2[9] / row2[8] );
                    // Cells(rowIndex, 11) = Cells(rowIndex, 10).Value / Cells(rowIndex, 9).Value
                    row2.push( row1[11] + row2[10] )
                    // Cells(rowIndex, 12) = Cells(rowIndex - 1, 12).Value + Cells(rowIndex, 11).Value
                    row2.push( 18.985 / (1 + 5 * Math.pow(row2[11],-1.1)) )
                    // Cells(rowIndex, 13) = 18.985 / (1 + 5 * Cells(rowIndex, 12).Value ^ -1.1)
                    if (rowIndexStress == 13)
                        rowIndexStress = 1
                    rows.push(row2);
                    row1=row2;
                }
            }
        }
        this.setState({row1,rows,rowIndexStress})
        function lane(n) {
            if (n <= 2)
                return 1;
            else if (n >= 4)
                return 0.6;
            else
                return 0.7;
        }

        function fatigue(k) {
            if (k < 200)
                return k * 0.0221 - 15.97;
            else if (k < 300)
                return k * 0.0164 - 14.83;
            else if (k < 500)
                return k * 0.0038 - 11.05;
            else if (k < 1000)
                return k * 0.00033 - 9.31;
            else
                return k * 0.00071 - 9.69;
        }
    };
    parameterGraph = ()=>{
        const width = this.state.width;
        const height = this.state.height;
        const rows = this.state.rows;
        var dataset =[];
        for (var i=0;i<rows.length;i++){
            var obj={};
            obj.x = rows[i][0];
            obj.y = rows[i][12];
            dataset.push(obj);
        }
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d){ return d.x; })])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d){ return d.y; })])
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
            .x(function(d) { return xScale(d.x); })
            .y(function(d) { return yScale(d.y); });

        this.setState({xScale,yScale,xAxis,yAxis,line,dataset});
    }

    tableCreate = ()=>{

    }
    render() {
        const { classes } = this.props;
        return (   (this.state.rows.length&&this.state.dataset)?<Grid container alignItems="center" direction={"column"} spacing={1}>
            <Grid item xs={11}>
            <svg ref="svg"
            width={this.state.width+this.state.margin.left+this.state.margin.right}
            height={this.state.height+this.state.margin.top+this.state.margin.bottom}>
            <g className="content" transform={"translate(" + this.state.margin.left + "," + this.state.margin.top + ")"}>
                <text className="xAxisText" style={{"textAnchor":"middle","textShadow":"1px 1px 0 rgba(200, 200, 200, 0.7"}}
                fontFamily="sans-serif" fontSize="16px" x={this.state.width/2} y ={this.state.height+40}>Age (months)</text>
                <text className="YAxisText"
                      transform={"translate("+(-50)+","+this.state.height/2+")"+" rotate(-90)"}
                      style={{"textAnchor": "middle", "textShadow": "1px 1px 0 rgba(200, 200, 200, 0.7"}}
                      fontFamily="sans-serif" fontSize="16px">Number of Punchouts per Mile
                </text>
                <g className="xaxis" transform={"translate(0," + this.state.height + ")"}></g>
                <g className="yaxis"></g>
                <path className="line" d={this.state.line(this.state.dataset)}/>
                {this.state.dataset.map(d=><circle className="point" r={4} cx={this.state.xScale(d.x)}
                                        cy={this.state.yScale(d.y)} fill={this.colorGreenRed(d.y)}
                strokeWidth={0.5} stroke={"#000"}></circle>)}
            </g>
        </svg></Grid><Grid item xs={11}><Tabledata parameter={this.props.parameter} colorgreenred={this.colorGreenRed} rows={this.state.rows}/></Grid></Grid>:'');
    }
}
export default withStyles(styles) (Graph);
