/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { test, setTrackerData, setLinks, setHeaderProps } from './actions';
import reducer from './reducer';

import styles from '../../style.css';
import Profile from './Profile';
import { Link, withRouter } from "react-router-dom";

// import Button from 'react-bootstrap/Button';
const key = 'home';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SmoothImage from 'react-smooth-image'
import ImageFadeIn from 'react-image-fade-in'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import RingLoader from "react-spinners/RingLoader";

import Tracker from './Tracker'
import { variance } from 'd3';



class EmpData extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {
      empStructure: [],
      positionForDrop: ""
    }
  }

  async onFormSubmit(value) {
    
    await this.setState({
      positionForDrop: ""
    })
    var nodesArray = [], xArray = [], yArray = []

    console.log(value);
    let setPriority;
    console.log(value.position.substring(0,2))
    if(value.position.substring(0,2) === "TL"){
      setPriority = 3;
    }
    else{
      setPriority = 2
    }

    let insertObject = {name: value.position, priority: setPriority, pos: value.position.substring(0,2) }, checkIndex;
    this.props.position.map((val, index) => {
      if(val.priority === setPriority){
        checkIndex = index
   
      }
    })
    this.props.position.splice(checkIndex+1, 0, insertObject)

    console.log(this.props.position)
    this.props.links.push({source: value.reportsto, target: value.position })
    console.log(this.props.links)

    
    await this.props.setLinks(this.props.links, this.props.position);
    
    nodesArray =  await this.makeXYArray(this.props.position, nodesArray, xArray, yArray)
    
    var data_acy = {
      nodes: nodesArray,
      links: this.props.links
    }
    await this.props.test("hello")
    await this.props.setTrackerData("")

    await this.props.setTrackerData(data_acy)
    console.log(data_acy)
    await this.setState({
      positionForDrop: this.props.position
    })
  }


   makeXYArray(position, nodesArray, xArray, yArray ){
    for(var i=0; i<position.length;i++){

      if(i==0){
        xArray.push(100);
        yArray.push(100);
      }
      else{
        yArray.push((i + 1)*70);

        if(i%2 === 0){
          xArray.push(30)
        }
        else{
          xArray.push(200);
        }
      }
      
    }



    this.props.position.map((val, index) => {
      nodesArray.push({id: val.name, x: xArray[index], y: yArray[index]})
    })
   return nodesArray;
  }

  async componentDidMount(){
    var nodesArray = [], xArray = [], yArray = []
    var position = [{name: "CEO", priority: 1, pos: "CEO"},{name: "PM1", priority: 2, pos: "PM"},{name: "PM3", priority: 2, pos: "PM"},{name: "PM2", priority: 2, pos: "PM"},{name: "TL1", priority: 3, pos: "TL"},{name: "TL2", priority: 3, pos: "TL"} ]

    var links = [{ source: "CEO", target: "PM1" }, { source: "CEO", target: "PM2" }, { source: "PM1", target: "TL1" }, { source: "PM1", target: "TL2" }, {source: "CEO", target: "PM3"}]

    await this.props.setLinks(links, position);
    
    await this.setState({
      positionForDrop: this.props.position
    })

    nodesArray =  this.makeXYArray(this.props.position, nodesArray, xArray, yArray)
    
    var data_acy = {
      nodes: nodesArray,
      links: this.props.links
    }
    await this.props.test("hello")
    await this.props.setTrackerData(data_acy)
    
    console.log(this.props.trackerVal)
  }

  render() {
    const {trackerVal} = this.props
    return (
      <div>
       { this.state.positionForDrop && <Profile 
        onSubmit={this.onFormSubmit}
        links={this.props.links}
        position={this.props.position}
        />}
        
        {trackerVal && 
        <div>
          <Tracker 
            trackerVal = {trackerVal}
            links = {this.props.links}
            setHeaderProps={this.props.setHeaderProps}
            header = {this.props.header}
            under={this.props.under}
          />
        </div>}

        <div>
        <div>
          {this.props.header &&
          <div>
          <p style={{paddingTop: '150px', fontSize: '23px'}}>{this.props.header} has under {this.props.under.length !==0 ? this.props.under.map(val=> val): 'no child'}</p>
          </div>
          
          }

        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  debugger
 return({
  testVal: state.empReducer.testVal,
  trackerVal: state.empReducer.trackerVal,
  links: state.empReducer.links,
  position: state.empReducer.position,
  header: state.empReducer.header,
  under: state.empReducer.under
 })
}
// };
// const withSaga = injectSaga({ key: 'EmpData', saga });

export function mapDispatchToProps(dispatch) {
  return {
    test: val => dispatch(test(val)),
    setTrackerData: val => dispatch(setTrackerData(val)),
    setLinks: (links, position) => dispatch(setLinks(links, position)),
    setHeaderProps: (header, under) => dispatch(setHeaderProps(header, under))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  
  memo,
  withRouter
)(EmpData);
