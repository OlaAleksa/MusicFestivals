import React, { Component } from "react"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
    Annotations,
    Annotation,
} from "react-simple-maps"
import { Motion, spring } from "react-motion"
import SmallInfo from "./smallInfo.jsx";
import firebase from './firebase.js';


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class AnimatedMap extends Component {
    constructor() {
        super();
        this.state = {
            center: [0,20],
            zoom: 1,
            info: null,
            festivals: [],
        };
        this.handleZoomIn = this.handleZoomIn.bind(this);
        this.handleZoomOut = this.handleZoomOut.bind(this);
        this.handleFestivalClick = this.handleFestivalClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleZoomIn() {
        this.setState({
            zoom: this.state.zoom * 2,
        })
    }
    handleZoomOut() {
        this.setState({
            zoom: this.state.zoom / 2,
        })
    }
    handleFestivalClick(festival) {
        this.setState({
            zoom: 2,
            center: festival.coordinates,
        })
    }
    handleReset() {
        this.setState({
            center: [0,20],
            zoom: 1,
        })
    }
    handleInfoClick(festival) {
        this.setState({
            info: <SmallInfo data={festival} clickClose={this.handleInfoEsc}/>
        })
    }
    handleInfoEsc = () => {
        this.setState({
            info:null
            })
    };

    render() {
        return (
            <div>
                {this.state.info}
                <div className="buttons">
                    <button onClick={this.handleZoomIn}>
                        {"Zoom in"}
                    </button>
                    <button onClick={this.handleZoomOut}>
                        {"Zoom out"}
                    </button>
                    <button onClick={this.handleReset}>
                        {"Reset"}
                    </button>
                </div>
                <Motion
                    defaultStyle={{
                        zoom: 1,
                        x: 0,
                        y: 20,
                    }}
                    style={{
                        zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
                        x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
                        y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
                    }}
                >
                    {({zoom,x,y}) => (
                        <ComposableMap
                            projectionConfig={{ scale: 205 }}
                            width={980}
                            height={551}
                            style={{
                                width: "100vw",
                                height: "100vh",
                            }}
                        >
                            <ZoomableGroup center={[x,y]} zoom={zoom}>
                                <Geographies geography="world-110m.json" >
                                    {(geographies, projection) =>
                                        geographies.map((geography, i) => geography.id !== "010" && (
                                            <Geography
                                                key={i}
                                                geography={geography}
                                                projection={projection}
                                                style={{
                                                    default: {
                                                        fill: "black",
                                                        stroke: "black",
                                                        strokeWidth: 0.75,
                                                        outline: "none",
                                                    },
                                                    hover: {
                                                        fill: getRandomColor(),
                                                        stroke: "#607D8B",
                                                        strokeWidth: 0.75,
                                                        outline: "none",
                                                    },
                                                    pressed: {
                                                        fill: getRandomColor(),
                                                        stroke: "#607D8B",
                                                        strokeWidth: 0.75,
                                                        outline: "none",
                                                    },
                                                }}
                                            />
                                        ))}
                                </Geographies>
                                <Annotations>
                                    {
                                        this.state.festivals.map((festival, i) => (
                                            <Annotation
                                            key={i}
                                            dx={-50}
                                            dy={30}
                                            subject={festival.coordinates}
                                            strokeWidth={1}
                                            stroke="#FFFFFF"
                                            >
                                                <text fill="#FFFFFF" onClick={() => this.handleInfoClick(festival)}>
                                                    {festival.name}
                                                </text>
                                            </Annotation>
                                        ))
                                    }
                                </Annotations>
                                <Markers>
                                    {this.state.festivals.map((festival, i) => (
                                        <Marker
                                            key={i}
                                            marker={festival}
                                            onClick={this.handleFestivalClick}
                                        >
                                            <circle
                                                cx={0}
                                                cy={0}
                                                r={6}
                                                fill= {getRandomColor()}
                                                stroke="#FFFFFF"
                                            />
                                        </Marker>
                                    ))}
                                </Markers>
                            </ZoomableGroup>
                        </ComposableMap>
                    )}
                </Motion>
            </div>
        );
    }

    componentDidMount() {
        const festivalsRef = firebase.database().ref('festivals');
        festivalsRef.on('value', (snapshot) => {
            let festivals = snapshot.val();
            let newState = [];
            for (let festival in festivals) {
                newState.push({
                    id: festival,
                    name: festivals[festival].name,
                    date: festivals[festival].date,
                    website: festivals[festival].website,
                    FB: festivals[festival].FB,
                    YT: festivals[festival].YT,
                    GoogleMaps: festivals[festival].GoogleMaps,
                    coordinates: festivals[festival].coordinates,
                    film: festivals[festival].film,
                });
            }
            this.setState({
                festivals: newState
            });
        });
    }
}

export default AnimatedMap