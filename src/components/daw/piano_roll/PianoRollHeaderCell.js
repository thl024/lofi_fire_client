/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react'
import {connect} from "react-redux";

const pianoRollRowHeaderTextStyle = css`
  color: #FFFFFF;
  font-size: 1vw;
  padding-left: 5px;
  margin: 0 0 0 0;
`

class PianoRollHeaderCell extends React.Component {

    // Should component update to prevent individual cells from being updated when data matrix is changed at one element
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.playIndex === -1 || // Lazy, just rerender all header cells when stop is called
            nextProps.playIndex === this.props.i || // Current cell is on the tick; add styling
            nextProps.playIndex === this.props.i+1; // Update previous cell to remove styling
    }

    render() {
        console.log("Render Piano Roll Header Cell " + this.props.i);

        // Number every 4 elements
        let headerText = "";
        if (this.props.i % 4 === 0) {
            headerText = this.props.i/4;
        }

        // Color in ticks during playback
        let color = "#757575";
        if (this.props.i === this.props.playIndex) {
            color = "#FF9800";
        }
        let pianoRollRowHeaderItem = css`
          flex-grow: 1;
          background-color: ${color};
        `

        return <div css={pianoRollRowHeaderItem} key={"h"+this.props.i.toString()}>
            <p css={pianoRollRowHeaderTextStyle}>{headerText}</p>
        </div>

    }
}

// Redux connection
export default connect(
    (state) => {
        return {
            playIndex: state.playIndex,
        }}
)(PianoRollHeaderCell)