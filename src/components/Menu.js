import React from "react";
import { withRouter } from "react-router-dom";

class Menu extends React.Component {
state={
    currentSelectedMenu:null,
}
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentSelectedMenu !== null) {
            switch (this.state.currentSelectedMenu) {
                case 1:
                    return (this.props.history.push("/add-new"));
                case 2:
                    return (this.props.history.push("/edit"));
                case 3:
                    return (this.props.history.push("/list"));
                default:
                    localStorage.removeItem('user')
                    this.props.history.push("/")

            }
        }
    }
    render(){

        let pages = [
            {name: 'LogOut',
                num: 1},
            {name: 'Add New',
                num: 2},
            {name: 'Edit',
                num: 3},
            {name: 'List',
                num: 4},
        ];

        return (
            <div className="c-menu">
                <ul className="c-list">
                    {pages.map((page, index) =><MenuItem clicked={()=>this.setState({currentSelectedMenu:index})} key={index} page={page}/>)}
                </ul>
            </div>
        )};
};
export default withRouter(Menu)

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li onClick={this.props.clicked} className={`c-list__item c-list__item--${this.props.page.num}`}>
                <a className="c-list__link">{this.props.page.name}</a>
            </li>
        )
    }
}
