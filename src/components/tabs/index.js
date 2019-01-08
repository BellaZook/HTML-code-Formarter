import React from 'react';
import './tabs.css';
import CssClass from './CssClass';
import Menu from './Menu';
import Instructions from './Instructions';

class Tabs extends React.Component {
    state = {
        activeTab: 'Menu'
    }

    handleSetActiveTab = (event) => {
        console.log("radio was called")
        this.setState({
            activeTab: event.target.value
        });
    }

    openCity = (evt, tabName) => {
        // var i, tabcontent, tablinks;
        // tabcontent = document.getElementsByClassName("tabcontent");
        // for (i = 0; i < tabcontent.length; i++) {
        //     tabcontent[i].style.display = "none";
        // }
        // tablinks = document.getElementsByClassName("tablinks");
        // for (i = 0; i < tablinks.length; i++) {
        //     tablinks[i].className = tablinks[i].className.replace(" active", "");
        // }
        // document.getElementById(tabName).style.display = "block";
        // evt.currentTarget.className += " active";
    }

    componentDidMount = () => {
        // Get the element with id="defaultOpen" and click on it
        // document.getElementById("defaultOpen").click();
    }

    render() {
        return (
            <React.Fragment>
                <div className="tab">
                    <button className="tablinks" value="Menu" onClick={(event) => this.handleSetActiveTab(event, 'Menu')} id="defaultOpen">Menu</button>
                    <button className="tablinks" value="CSS" onClick={(event) => this.handleSetActiveTab(event, 'cssClass')}>CSS</button>
                    <button className="tablinks" value="Instructions" onClick={(event) => this.handleSetActiveTab(event, 'instructions')}>Instructions</button>
                </div>
                <Menu
                    selectedRadio={this.props.selectedRadio}
                    handleRadioChange={this.props.handleRadioChange}
                    handleAddColor={this.props.handleAddColor}
                    activeTab={this.state.activeTab}
                />
                <CssClass activeTab={this.state.activeTab} />
                <Instructions activeTab={this.state.activeTab} />
            </React.Fragment>
        );
    }
}



export default Tabs;


// <button className="tablinks" onClick={(event) => this.openCity(event, 'list')}>List</button>
//     <div id="list" className="tabcontent">
//         <p style={{ margin: 0 }}>Select some list tag, then click to change its background color</p>
//         <Button name="Red" color="color-red" />
//         <Button name="Blue" color="color-blue" />
//         <Button name="Black" color="color-black" />
//         <Button name="Green" color="color-green" />
//     </div>
