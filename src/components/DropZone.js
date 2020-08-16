import React from "react";

class DropZone extends React.Component {
    render() {
        return (
            <>
            <label htmlFor="upload-button">
            <div className={this.props.divClassName}>
                <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={this.props.handleChange}
                />
                <div className={this.props.innerDivClassName}> <label className={this.props.labelClassName}>{this.props.text}</label></div>
            </div>
            </label>
            </>

        )
    }
}

export default DropZone
