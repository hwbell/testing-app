import React from "react";
import { Fade, Button } from "reactstrap";
import { toolsImages } from "../assets/toolsImages";
import CalendarHeatmap from "react-calendar-heatmap";
import getRepoInfo from "../tools/functions/pingGitRepo";
import ReactTooltip from 'react-tooltip';

class SampleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      popoverMessage: null,
      name: "World Weather Map",
      repoName: "weather-world-map",
      gitLink: "https://github.com/hwbell/weather-world-map",
      link: "https://hb-world-weather-map.herokuapp.com/",
      image:
        "http://www.harrybell.me/static/media/world-weather-map.fc001390.jpg",
      description:
        "Explore the weather across the world using a map-based application.",
      modalDescription: `This app was made using the amazing utility of Mapbox. Click anywhere on the map
    to get the current, hourly, and daily weather forecast. Weather information was fetched from darksky.net's
    API and routed through a node.js backend. If you are making a map-based app, try Mapbox. Their 
    javascript library mapboxgl is really powerful.`,
      modalBG: "",
      tools: [
        "html5",
        "css3",
        "bootstrap",
        "javascript",
        "reactjs",
        "nodejs",
        "expressjs",
        "git",
        "heroku",
        "mapbox",
        "darksky",
      ],
      heatMapValues: null,
    };

    this.togglePopover = this.togglePopover.bind(this);
    this.pingRepo = this.pingRepo.bind(this);
    this.renderHeatMap = this.renderHeatMap.bind(this);
  }

  componentDidMount() {
    this.pingRepo(this.state.repoName);
  }

  pingRepo(repoName) {
    getRepoInfo(repoName)
      .then((data) => {
        this.setState({
          heatMapValues: data,
        });
      })
      .catch((e) => console.log(e));
  }

  togglePopover(tool) {
    if (tool) {
      this.setState({
        popoverMessage: tool,
      });
    }
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  renderHeatMap() {
    const startDate = this.state.heatMapValues[0].date;
    const endDate = this.state.heatMapValues[
      this.state.heatMapValues.length - 1
    ].date;

    console.log(this.state.heatMapValues);
    return (
      <CalendarHeatmap
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        values={this.state.heatMapValues}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        showWeekdayLabels={true}
        onClick={(value) =>
          alert(`There were ${value.count} commits to this app on ${value.date}`)
        }
      />
    );
  }

  render() {
    let imageId;

    return (
      <div className="center-all-row row project-card">
        <div className="col left-all-col" style={styles.textHolder}>
          <h3>{this.state.name}</h3>
          <p>{this.state.modalDescription}</p>

          <div className="row left-all-row" style={styles.toolsHolder}>
            {this.state.tools.map((tool, i) => {
              imageId = `${this.state.name.split(" ").join("")}-tool${i}`;
              return (
                <div className="" key={i}>
                  <a
                    target="_blank"
                    href={`https://www.google.com/search?q=${tool}`}
                    alt={`link to ${tool}`}
                  >
                    <img
                      onMouseOver={() => {
                        this.togglePopover(tool);
                      }}
                      onMouseLeave={() => {
                        this.togglePopover();
                      }}
                      id={imageId}
                      style={styles.toolImage}
                      src={toolsImages[tool]}
                      alt="no image"
                    />
                  </a>
                </div>
              );
            })}
          </div>

          {/* <div style={{minHeight: '45px'}}>
            <Fade in={this.state.popoverOpen} style={styles.fade}>
              {this.state.popoverMessage}
            </Fade>
          </div> */}

          {this.state.heatMapValues && this.renderHeatMap()}
          <ReactTooltip/>

          
        </div>

        <div className="col left-all-col" style={styles.imageHolder}>
          <img
            style={styles.image}
            src="http://www.harrybell.me/static/media/world-weather-map.fc001390.jpg"
            alt=""
          />
          <div className="left-all-row" style={{margin: '20px 0'}}>
            <a target="_blank" href={this.state.link} alt="link to app">
            <Button color="outline-primary">run app!</Button>
            </a>

            <a target="_blank" href={this.state.gitLink} alt="link to repo">
            <Button color="outline-info">see the code</Button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  card: {
    // width: '50%'
  },
  imageHolder: {
    padding: "25px",
    minWidth: "350px",
    maxWidth: "450px",
  },
  image: {
    // minWidth: "350px",
    maxWidth: "450px",
    width: "100%",
  },
  textHolder: {
    minWidth: "350px",
    maxWidth: "600px",
    padding: "25px 0 0 25px",
  },
  toolsHolder: {
    padding: "10px",
  },
  toolImage: {
    height: "40px",
    margin: "4px",
  },
  fade: {
    margin: "0px 20px 20px 20px",
  },
};
export default SampleCard;
