import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import { geoMercator, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import * as d3 from "d3";
import county from "./data/texas-counties"
import {districts,districtCode,counties} from "./ulti.jsx"
const styles = theme => ({
    root: {
        width: '100%',
        position:'relative',
        '& .label text': {
          fontSize:14,
            textAnchor: 'middle'
        },
        '& .tooltip': {
          position: 'absolute',
          display:'none',
            pointerEvents:'none',
            transform:'translate(3px,3px)'
        },
        '& .bold': {
            fontWeight: 'bold',
        },

        '& .raster': {
            fill: 'none',
            opacity: 1
        },

        '& .neutral-county': {
            fill: '#FFF',
            opacity: 0.4
        },
        '& .highlighted-county': {
            fill: '#C00',
            opacity: 0.6
        },

        '& .neutral-county, .highlighted-county': {
            stroke: '#6E6E6E',
            strokeOpacity: 0.6,
            strokeWidth: '0.7px'
        },
        '& .counties': {
            fill: 'none',
            stroke: '#6E6E6E',
            strokeOpacity: 0.4,
            strokeWidth: '0.5px'
        },
        '& .state-border': {
            fill: 'none',
            stroke: '#6E6E6E',
            strokeOpacity: 0.7,
            strokeWidth: '1px'
        },
        '& .city-marker': {
            fill: 'none',
            opacity: 0.6,
            strokeWidth: '2px',
            stroke: '#000'
        },
        '& .capital-marker': {
            fill: 'goldenrod',
            opacity: 1,
            strokeWidth: '3px',
            stroke: '#000',
            strokeOpacity: 0.6
        },

        '& .text-note': {
            fontSize: '15px',
            fontWeight: 500,
            color: '#000',
            opacity: 0.6,
            lineHeight: '18px',
            margin: 0,
            textShadow: '1px  1px 0 white, 1px -1px 0 white, -1px  1px 0 white, -1px -1px 0 white'
        },

        '& .city-label': {
            textAnchor: 'middle',
            margin: 0,
            fontSize: '15px',
            lineHeight: '14px',
            fontWeight: 500,
            textAlign: 'right',
            opacity: 0.6,
            color: '#000',
            textShadow: '1px  1px 0 white, 1px -1px 0 white, -1px  1px 0 white, -1px -1px 0 white'
        },

        '& .legend': {
            fontSize: '15px',
            lineHeight: '24px',
            fontWeight: 500,
            color: '#333'
        },

        '& .label-line': {
            stroke: '#000',
            strokeWidth: '1.5px',
            strokeOpacity: 1,
            opacity: 0.8,
            fill: 'none'
        },

        '& .state-label': {
            fontWeight: 500,
            textTransform: 'uppercase',
            textAnchor: 'middle',
            opacity: 0.3,
            color: '#000',
            fontSize: '24px',
            lineHeight: '28px',
            letterSpacing: '0.6em'
        },

        '& .distance-scale': {
            fontSize: '11px',
            lineHeight: '11px',
            position: 'absolute',
            fontWeight: 500,
            textTransform: 'uppercase',
            color: '#000'
        },

        '& .distance-scale-line': {
            stroke: '#000',
            strokeWidth: 1,
            strokeOpacity: 1,
            opacity: 1,
            fill: '#000',
            shapeRendering: 'crispEdges'
        }

    }
});

class District extends Component {
    svgRef = React.createRef();
    zoom = {k:1,x:0,y:0};
    map_width=600;
    map_height=450;

    projection = geoMercator()
        .center([ -99.43,31.47 ])
        .translate([ this.map_width/2, this.map_height/2 ])
        .scale([ 2000 ]);
    constructor(props) {
        super(props);
        this.state = {
            target:props.target,
            geographies: [],
            Name:undefined,
            highlighto:{}
        };
    }

    componentDidMount() {
        const geographies = [];
        debugger
        for ( let district in districts){
            const geo = topojson.merge(county, county.objects['texas-counties'].geometries.filter(function(d) { return counties[d.properties.NAME][0]===district; }))
            if(!districtCode[district])
                debugger
            geographies.push({geometry:geo,properties:{NAME:district,Label:districtCode[district]},type: "Feature"})
        }
        geographies.forEach(d=>{
            d.path = geoPath().projection(this.projection)(d);
            d.centroid = geoPath().projection(this.projection).centroid(d);
        });
        const highlighto = {...districts};
        if(this.props.highlight)
            this.props.highlight.forEach(d=>highlighto[d]=1);
        this.setState({geographies,highlighto,target:this.props.target});
        if (this.svgRef){
            let svg = d3.select(this.svgRef.current);
                // .select('g.content')
            svg.call(d3.zoom().scaleExtent([1, 10]).on('zoom',(event)=>{
                svg.select('g.content').attr('transform', event.transform);
                this.zoom = event.transform
                }))
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.highlight!==this.props.highlight){
            const highlighto = {};
            this.props.highlight.forEach(d=>highlighto[d]=1);
            this.setState({highlight:this.props.highlight,highlighto})
        }
        if(prevProps.target!==this.props.target){
            this.setState({target:(this.props.target??'')})
        }
    }
    render(){
        const {classes} = this.props;
        const {target,highlighto} = this.state;
        const {geographies} = this.state;
        const {map_width,map_height,projection} = this;
        return <div className={classes.root}>
            <svg width={ map_width } height={ map_height } viewBox={`0 0 ${map_width} ${map_height}`} ref={this.svgRef}>
                <g className="content">
                    <g className="countries">
                        {
                            geographies.map((d,i) => (
                                <path
                                    key={ `path-${ i }` }
                                    d={ d.path }
                                    className="country"
                                    // fill={ `rgba(38,50,56,${ 1 / geographies.length * i})` }
                                    fill={(d.properties.NAME===target) ?'#17dd75':(highlighto[d.properties.NAME]?(this.state.Name===d.properties.NAME?'#3adddd':'steelBlue'):`rgba(38,50,56,1)` )}
                                    stroke="#FFFFFF"
                                    strokeWidth={ 0.5 }
                                    onMouseOver={(event)=>{this.setState({Name:d.properties.NAME,x:(d3.pointer(event)[0]-this.zoom.x)/this.zoom.k,y:(d3.pointer(event)[1]/this.zoom.y)/this.zoom.k});}}
                                    style={{pointerEvents:highlighto[d.properties.NAME]?'all':'none'}}
                                    onMouseOut={()=>{this.setState({Name:undefined})}}
                                    onClick={()=>{this.props.selected(d.properties.NAME)}}
                                />
                            ))
                        }
                        {/*{*/}
                        {/*    <path*/}
                        {/*        key={'hovered'}*/}
                        {/*        d={ geoPath().projection(projection)(d) }*/}
                        {/*        className="country"*/}
                        {/*        // fill={ `rgba(38,50,56,${ 1 / geographies.length * i})` }*/}
                        {/*        fill={(d.properties.NAME===target) ?'#17dd75':(highlighto[d.properties.NAME]?(this.state.Name===d.properties.NAME?'#3adddd':'steelBlue'):`rgba(38,50,56,1)` )}*/}
                        {/*        stroke="#FFFFFF"*/}
                        {/*        strokeWidth={ 0.5 }*/}
                        {/*        onMouseEnter={(event)=>{this.setState({Name:d.properties.NAME,x:(d3.pointer(event)[0]-this.zoom.x)/this.zoom.k,y:(d3.pointer(event)[1]/this.zoom.y)/this.zoom.k});}}*/}
                        {/*        onMouseOut={()=>{this.setState({Name:undefined})}}*/}
                        {/*        onClick={()=>{this.props.selected(d.properties.NAME)}}*/}
                        {/*        style={{pointerEvents:'none'}}*/}
                        {/*    />*/}
                        {/*}*/}
                    </g>
                    <g className="label">
                        {
                            geographies.map((d, i) => (
                                <text
                                    key={`path-${i}`}
                                    // fill={ `rgba(38,50,56,${ 1 / geographies.length * i})` }
                                    x={d.centroid[0]}
                                    y={d.centroid[1]}
                                    fill={(d.properties.NAME === target) ? 'black' : (highlighto[d.properties.NAME] ? (this.state.Name === d.properties.NAME ? 'black' : 'black') : `gray`)}
                                    style={{pointerEvents: 'none'}}
                                >
                                    {d.properties.Label}
                                </text>
                            ))
                        }
                    </g>
                </g>
                {/*<g id={'legend'} transform={`translate(${map_width-165},${map_height-80})`} style={{fontSize:14}}>*/}
                {/*    <g transform={`translate(${10},${-17})`}>*/}
                {/*        <text x={-40} y={0} dy={10} fill={'#8a8a8a'}>Click on map to select District</text>*/}
                {/*    </g>*/}
                {/*    <g transform={`translate(${10},${13})`}>*/}
                {/*        <rect width={10} height={10} fill={'rgba(38,50,56,1)'}/>*/}
                {/*        <text x={15} y={0} dy={10}> Not selectable</text>*/}
                {/*    </g>*/}
                {/*    <g transform={`translate(${10},${33})`}>*/}
                {/*        <rect width={10} height={10} fill={'steelBlue'}/>*/}
                {/*        <text x={15} y={0} dy={10}> Selectable</text>*/}
                {/*    </g>*/}
                {/*    /!*<g transform={`translate(${10},${53})`}>*!/*/}
                {/*    /!*    <rect width={10} height={10} fill={'#3adddd'}/>*!/*/}
                {/*    /!*    <text x={15} y={0} dy={10}> Highlighted</text>*!/*/}
                {/*    /!*</g>*!/*/}
                {/*    <g transform={`translate(${10},${53})`}>*/}
                {/*        <rect width={10} height={10} fill={'#17dd75'}/>*/}
                {/*        <text x={15} y={0} dy={10}> Selected</text>*/}
                {/*    </g>*/}
                {/*</g>*/}
            </svg>
            {/*<Card className="tooltip" style={{display:this.state.Name?'block':'none',left:this.state.x,top:this.state.y}}>*/}
            <div className="tooltip bold" style={{display:this.state.Name?'block':'none',left:10,top:10, fontSize:20, padding:5,backgroundColor:'rgba(255,255,255,0.49)'}}>
                {this.state.Name}
            </div>
        </div>
    }
}

export default withStyles(styles)(District);
