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
        this.displayCodeString = "";

        this.state = {
            value: '',

            radioFormat: 'Color',
            radioJSX: '',
            radioStyle: 'Style',

            formatedString: '',
            isReadOnly: false,
            activeTab: 'Start',

            textAreaCode: '',
            codePreviewValue: ''
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
                isReadOnly: false,
                value: '',
                activeTab: 'Start'
            }
        })
    }

    findAndReplace = () => {
        const lessThan = "&#60;";
        const slash = "&#47;";
        const UlTag = `<ul style="list-style-type:none">`;
        let formatedStrings = [];
        let selectedString = "";
        let rowStartWith = "";
        let rowEndWith = ""
        const stringToBeModified = this.state.value;
        const arrayOfStrings = splitStringIntoArrayOfStrings(stringToBeModified);
        const numberOfLinesToFormat = arrayOfStrings.length;

        if (this.state.value) {
            // make read only for security
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
                        rowEndWith = "\n" + UlTag;
                        break;
                    case selectedString.startsWith(lessThan) && !selectedString.endsWith("/>") && !selectedString.endsWith(">") && selectedString.split(" ").length === 1:
                        // <tag
                        rowStartWith = "\n<li>";
                        rowEndWith = "\n" + UlTag;
                        break;
                    case selectedString.startsWith(slash + ">") && selectedString.endsWith(slash + ">"):
                        //   /> 
                        rowStartWith = "</ul>\n";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.startsWith(">") && selectedString.endsWith(">"):
                        //   >
                        rowStartWith = "</ul>\n";
                        rowEndWith = "</li>\n" + UlTag;
                        break;

                    case selectedString.startsWith(slash + slash):
                        // 
                        rowStartWith = "\n<li>";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.endsWith("{") || selectedString.endsWith("("):
                        // text {  or  text (
                        rowStartWith = "\n<li>";
                        rowEndWith = "\n" + UlTag;
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

            // To do: fix style for JSX
            // calculate string length difference between display and textarea value
            // then calculate insert location.
            // or replace all possible combinations
            // const JsxStyle = `<ul style={{listStyleType:'none'}}>${joinString}\n</ul>`;

            const formatedStringTextArea = `<ul style="list-style-type:none">${joinString}\n</ul>`;
            const formatedStringDisplay = `<ul style="list-style-type:none">${joinString}\n</ul>`

            this.setupDisplay(formatedStringDisplay);

            this.setState(() => { return { value: formatedStringTextArea }; });
        }
    }

    setupDisplay = (stringValue) => {
        this.setState({ codePreviewValue: stringValue });
    }

    handleAddColor = (event, color) => {
        // To do: fix style for JSX
        // calculate string length difference between display and textarea value
        // then calculate insert location.
        // or replace all possible combinations
        // const JsxStyle = `<ul style={{listStyleType:'none'}}>${joinString}\n</ul>`;

        event.preventDefault();
        let textAreaReplacement = "";
        // let codePreviewReplacement = "";
        let classNameStyle = 'class';
        const txtArea = document.getElementById("codeTextarea");
        const selectedTextStartIndex = txtArea.selectionStart;
        const selectedTextEndIndex = txtArea.selectionEnd;
        const selectedText = txtArea.value.substring(selectedTextStartIndex, selectedTextEndIndex);
        if (this.state.radioJSX === 'JSX') {
            classNameStyle = 'className';
        }
        if (this.state.radioStyle === 'Style') {
            switch (this.state.radioFormat) {
                case 'Color':
                    textAreaReplacement = `<span style="color:${color}; font-weight: bold"> ${selectedText}</span>`;
                    // codePreviewReplacement = `<span style="color:${color}; font-weight: bold"> ${selectedText}</span>`;
                    break;
                case 'Border':
                    textAreaReplacement = `<span style="border: solid ${color}; padding: 0 1px"> ${selectedText}</span>`;
                    // codePreviewReplacement = `<span style="border: solid ${color}; padding: 0 1px"> ${selectedText}</span>`;
                    break;
                default:
                    break;
            }
        } else {
            switch (this.state.radioFormat) {
                case 'Color':
                    textAreaReplacement = `<span ${classNameStyle}="c-${color} f-bold"> ${selectedText}</span>`;
                    // codePreviewReplacement = `<span class="c-${color} f-bold"> ${selectedText}</span>`;
                    break;
                case 'Border':
                    textAreaReplacement = `<span ${classNameStyle}="bd-color c-${color}"> ${selectedText}</span>`;
                    // codePreviewReplacement = `<span class="bd-color c-${color}"> ${selectedText}</span>`;
                    break;
                default:
                    break;
            }
        }

        const beforeSelectedText = txtArea.value.substring(0, selectedTextStartIndex);;
        const afterSelectedText = txtArea.value.substring(selectedTextEndIndex);;

        const textAreaValue = beforeSelectedText + textAreaReplacement + afterSelectedText;
        let codePreviewValue = "";

        if (this.state.radioJSX === 'JSX') {
            codePreviewValue = textAreaValue.replace(/<span className=/g, "<span class=");
        } else {
            codePreviewValue = textAreaValue;
        }

        this.setState(() => {
            return {
                value: textAreaValue,
                codePreviewValue: codePreviewValue
            }
        });
    }

    handleRadioChange = (changeEvent) => {
        let targetValue = changeEvent.target.value;
        if (targetValue === 'JSX' && this.state.radioJSX === 'JSX') {
            targetValue = '';
        }
        const stateObject = { [changeEvent.target.name]: targetValue }
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
                <DisplayFormattedCode displayCodeString={this.state.codePreviewValue} />
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