
import React, { useEffect, memo } from 'react';
import { Graph } from "react-d3-graph";

// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
    ],
};


  const myConfig = {
    nodeHighlightBehavior: true,
  
    directed: true,
    staticGraph: true,
    width: "280px",
    height: '2000px',
    maxZoom: '1.0',
    minZoom: '1.0',
    node: {
      color: "blue",
      size: 250,
      highlightStrokeColor: "darkBlue",
      fontSize: 12,
      highlightFontSize: 14
    },
    link: {
      highlightColor: "red",
      color: "#007bffa1",
      fontSize: 10
    },
  };
  


class Tracker extends React.Component {
    constructor(props) {
      super(props);
      this.onMouseOver = this.onMouseOver.bind(this)
      this.state = {
        header: '',
        under: '',
        rerender: true
      }
    }
    componentDidMount(){
        
    }
  

    async onMouseOver(props){
      var underArray = []
      console.log(props)
      this.props.links.map((val, index)  => {
        if(val.source === props){
          underArray.push(val.target);
        }
      })
      console.log(underArray);
      await this.setState({
        rerender: false
      })
       this.props.setHeaderProps(props, underArray)
      // this.setState({
      //   header: props,
      //   under: underArray
      // })
    }

     shouldComponentUpdate(props, state){
     if(this.state.rerender === false){
       return false;
     }
    }

    render() {
        const {trackerVal, links} = this.props
      return (
        <div>
        <div style={{position: 'absolute', right: '150px'}}>
          <div style={{marginBottom: '-80px'}}><h2>2.Employees tree listing</h2><p>(Hover on nodes to see info)</p></div>
      { trackerVal &&   <div><Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={trackerVal}
            config={myConfig}
            // onClickNode={onClickNode}
            // onDoubleClickNode={onDoubleClickNode}
            // onRightClickNode={onRightClickNode}
            // onClickGraph={onClickGraph}
            // onClickLink={onClickLink}
            // onRightClickLink={onRightClickLink}
            onMouseOverNode={this.onMouseOver}
            // onMouseOutNode={onMouseOutNode}
            // onMouseOverLink={onMouseOverLink}
            // onMouseOutLink={onMouseOutLink}
            // onNodePositionChange={onNodePositionChange}
        /></div>}
        </div> 

        </div>
        
      )
    
    
    }
    
    
    }

export default Tracker

