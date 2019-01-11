import React, { Component } from "react";
import "./styles/inline-svg.css"
import DisplayFormattedCode from "../components/DisplayCode";
import './styles/styling.css'
import splitStringIntoArrayOfStrings from "./helpers/splitStringIntoArrayOfStrings";
import addListTagToStartAndEndOfString from "./helpers/addListTagToStartAndEndOfString";
import Tabs from "../components/tabs";

export default class CodeFormatter extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.findAndReplace = this.findAndReplace.bind(this);
        this.handleAddColor = this.handleAddColor.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        // this.handleReset = this.handleReset.bind(this);

        this.displayCodeString = "";

        this.state = {
            value: '',
            elementList: [],

            radioFormat: 'Color',
            radioJSX: '',
            radioStyle: 'Style',

            formatedString: '',
            isReadOnly: false,
            activeTab: 'Start'

        };
    }

    handleSetActiveTab = (event) => {
        this.setState({
            activeTab: event.target.value
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit() {
        this.findAndReplace();
    }
    handleReset = () => {
        this.displayCodeString = ""
        this.setState(() => {
            return {
                isReadOnly: true,
                value: '',
                activeTab: 'Start'

            }
        })

    }

    findAndReplace = () => {
        const lessThan = "&#60;";
        const slash = "&#47;";
        let formatedStrings = [];
        let selectedString = "";
        let rowStartWith = "";
        let rowEndWith = ""
        const stringToBeModified = this.state.value;
        const arrayOfStrings = splitStringIntoArrayOfStrings(stringToBeModified);
        const numberOfLinesToFormat = arrayOfStrings.length;

        if (this.state.value) {
            this.setState(() => {
                return {
                    isReadOnly: true,
                    activeTab: 'Format'
                }
            })

            for (let index = 0; index < numberOfLinesToFormat; index++) {

                selectedString = arrayOfStrings[index].trim();
                const replaceSlashes = selectedString.replace(/\//g, slash);
                selectedString = replaceSlashes.replace(/</g, lessThan);

                switch (true) {
                    case selectedString.startsWith("}") || selectedString.startsWith(")"):
                        // } , )
                        rowStartWith = "</ul>\n";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.startsWith(lessThan + slash) && selectedString.endsWith(">") && (selectedString.split(lessThan).length - 1) < 2:
                        // </ tag >
                        rowStartWith = "</ul>\n";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.startsWith(lessThan) && selectedString.endsWith(">") && (selectedString.split(lessThan).length - 1) > 1:
                        // <tag> text </tag>
                        rowStartWith = "\n<li>";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.startsWith(lessThan) && selectedString.endsWith(slash + ">") && (selectedString.split(lessThan).length - 1) < 2:
                        // <tag/>
                        rowStartWith = "\n<li>";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.startsWith(lessThan) && !selectedString.endsWith("/>") && selectedString.endsWith(">"):
                        // <tag>
                        rowStartWith = "\n<li>";
                        rowEndWith = "\n<ul>";
                        break;
                    case selectedString.startsWith(lessThan) && !selectedString.endsWith("/>") && !selectedString.endsWith(">") && selectedString.split(" ").length === 1:
                        // <tag
                        rowStartWith = "\n<li>";
                        rowEndWith = "\n<ul>";
                        break;
                    case selectedString.startsWith(slash + ">") && selectedString.endsWith(slash + ">"):
                        // />
                        rowStartWith = "</ul>\n";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.startsWith(slash + slash):
                        // 
                        rowStartWith = "\n<li>";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.endsWith("{") || selectedString.endsWith("("):
                        // text {  or  text (
                        rowStartWith = "\n<li>";
                        rowEndWith = "\n<ul>";
                        break;
                    default:
                        // li
                        rowStartWith = "\n<li>";
                        rowEndWith = "</li>";
                        break;
                }

                let modString = addListTagToStartAndEndOfString(selectedString, rowStartWith, rowEndWith)
                selectedString = modString;

                modString = selectedString.replace("{", "&#123;");
                selectedString = modString;

                formatedStrings[index] = selectedString;
            }

            let joinString = formatedStrings.join(' ');
            const finalFormatedString = `<ul className="list-style-none">${joinString}\n</ul>`

            this.setupDisplay(finalFormatedString);

            this.setState(() => { return { value: finalFormatedString }; });
        }
    }

    setupDisplay = (finalFormatedString) => {
        this.displayCodeString = finalFormatedString;
    }

    handleAddColor = (event, color) => {
        event.preventDefault();
        let selectionReplacement = "";
        // console.log(event.target)
        // console.dir(event.target);

        const txtArea = document.getElementById("codeTextarea");
        const selectedTextStartIndex = txtArea.selectionStart;
        const selectedTextEndIndex = txtArea.selectionEnd;
        const selectedText = txtArea.value.substring(selectedTextStartIndex, selectedTextEndIndex);

        switch (this.state.radioFormat) {
            case 'Color':
                selectionReplacement = `<span style="color:${color}; font-weight: bold"> ${selectedText}</span>`;
                break;
            case 'Border':
                selectionReplacement = `<span style="border: solid ${color}; padding: 0 2px; font-weight: bold"> ${selectedText}</span>`;
                break;

            default:
                break;
        }


        // const selectionReplacement = `<span style="background:${color}"> ${selectedText}</span>`;

        const beforeSelectedText = txtArea.value.substring(0, selectedTextStartIndex);;
        const afterSelectedText = txtArea.value.substring(selectedTextEndIndex);;

        // var selectedText = textarea.value.slice(start, end);
        // var before = textarea.value.slice(0, start);
        // var after = textarea.value.slice(end);

        const newText = beforeSelectedText + selectionReplacement + afterSelectedText;
        // textarea.value = text;

        // const newText = this.displayCodeString.replace(selectedText, selectionReplacement);

        document.getElementById("codeTextarea").value = newText;
        // console.log(newText)
        this.displayCodeString = newText;
        // this.setupDisplay(newText);
        this.setState({ value: newText });


    }
    handleRadioChange = (changeEvent) => {
        // console.log(changeEvent.target.name, ' ', changeEvent.target.value)
        let targetValue = changeEvent.target.value;
        if (targetValue === 'JSX' && this.state.radioJSX === 'JSX') {
            targetValue = '';
        }
        console.log(targetValue);
        const stateObject = { [changeEvent.target.name]: targetValue }
        // console.log(stateObject)
        this.setState(stateObject);
    }
    render() {
        return (
            <div className="flexContainer flex-warp">
                <div className="formatter margin-md">
                    <h2 className="">Format Javascript Code Using List</h2>
                    <Tabs
                        handleAddColor={this.handleAddColor}
                        selectedRadio={this.state.selectedRadio}
                        handleRadioChange={this.handleRadioChange}
                        handleSubmit={this.handleSubmit}
                        handleReset={this.handleReset}
                        handleSetActiveTab={this.handleSetActiveTab}
                        activeTab={this.state.activeTab}

                        radioFormat={this.state.radioFormat}
                        radioJSX={this.state.radioJSX}
                        radioStyle={this.state.radioStyle}

                    />
                    <div className="formatter margin-top-sm" >
                        <textarea
                            readOnly={this.state.isReadOnly}
                            name="text" id="codeTextarea"
                            className="texArea-height" placeholder="Paste your code inside"
                            style={{ width: "100%" }} value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <br />
                    </div>
                </div>
                <DisplayFormattedCode displayCodeString={this.displayCodeString} />
            </div>
        );
    }
}



// TO DO:
// ADD SWITCH. (BREAK AND RETURN)
// case selectedString.startsWith("case") && selectedString.endsWith(":"):
// // text {  or  text (
// rowStartWith = "\n<li>";
// rowEndWith = "\n<ul>";
// break;

// for return create a hasCase variable = false,
// change to true if has case,
// change to false after break or return.