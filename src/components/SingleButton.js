import React from "react";
import {Link} from "react-router-dom";

class SingleButton extends React.Component{
    render() {
        return(
            <div className={this.props.buttonDiv}>
            <Link to={this.props.route}> <button  onClick={this.props.onClick} type={this.props.type} className={this.props.className} onClick={this.props.onClick}><label className={this.props.labelClassName}>{this.props.text}</label> </button></Link>
            </div>
        )
    }
}
export default SingleButton
