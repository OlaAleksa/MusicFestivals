import React from 'react';



    class SmallInfo extends React.Component {



        handleEsc= () => {
            if ( typeof this.props.clickClose === 'function' ){
                this.props.clickClose();
            }
        };
        render() {
            return <div className="box" onClick={this.handleEsc} style={{
                    backgroundImage: 'url("./img/triangles-1430105_1280.png")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    height: "70vh",
                    width: "100vw",
                    position: "absolute",
                    top: "128px",
                    textAlign: "center",
                    lineHeight: "20px",
                    fontSize: "20px",
                    fontWeight: "600",
            }}>
                <h1>{this.props.data.name}</h1>
                <p>{this.props.data.date}</p>
                <div className="icons">
                    <p><a href={this.props.data.website} target="_blank"><img src="./icons/iconfinder_blackwhite_2357309.png" alt="website"/></a></p>
                    <p><a href={this.props.data.FB} target="_blank"><img src="./icons/iconfinder_facebook_2119360.png" alt="facebook"/></a></p>
                    <p><a href={this.props.data.YT} target="_blank"><img src="./icons/iconfinder_youtube_2119371.png" alt="youtube"/></a></p>
                    <p><a href={this.props.data.GoogleMaps} target="_blank"><img src="./icons/2190978-64.png" alt="GoogleMaps"/></a></p>
                </div>
                <iframe width="660" height="350" src={this.props.data.film}
                        frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>

            </div>
        }
    }

export default SmallInfo