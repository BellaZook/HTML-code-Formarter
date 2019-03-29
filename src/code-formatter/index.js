import React, { Component } from "react";
import "./styles/inline-svg.css"
import DisplayFormattedCode from "../components/DisplayCode";
import './styles/styling.css'
import splitStringIntoArrayOfStrings from "./helpers/splitStringIntoArrayOfStrings";
import addListTagToStartAndEndOfString from "./helpers/addListTagToStartAndEndOfString";
import Tabs from "../components/tabs";
import { HTML_LESS_THAN, HTML_SLASH, UL_TAG_JSX, UL_TAG } from "./helpers/constants";
import setRowStartEndTags from "./helpers/setRowStatEndTags";
import getReplacementText from "./helpers/getReplacementText";

export default class CodeFormatter extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.findAndReplace = this.findAndReplace.bind(this);
        this.handleAddColor = this.handleAddColor.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);

        this.state = {
            value: '',
            radioFormat: 'Color',
            radioJSX: '',
            radioStyle: 'Style',

            formatedString: '',
            isReadOnly: false,
            activeTab: 'Start',

            textAreaCode: '',
            codePreview: '',
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
        this.setState(() => {
            return {
                isReadOnly: false,
                value: '',
                activeTab: 'Start',
                codePreview: ""
            }
        })
    }

    findAndReplace = () => {
        let formatedStrings = [];
        let selectedString = "";
        let UlTag = "";
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

            if (this.state.radioJSX === 'JSX') {
                UlTag = UL_TAG_JSX;
            } else {
                UlTag = UL_TAG;
            }

            for (let index = 0; index < numberOfLinesToFormat; index++) {

                selectedString = arrayOfStrings[index].trim();
                const replaceSlashes = selectedString.replace(/\//g, HTML_SLASH);
                selectedString = replaceSlashes.replace(/</g, HTML_LESS_THAN);

                const rowStartEndTags = setRowStartEndTags(selectedString, UlTag);
                let modString = addListTagToStartAndEndOfString(selectedString, rowStartEndTags.rowStartWith, rowStartEndTags.rowEndWith)
                selectedString = modString;

                modString = selectedString.replace("{", "&#123;");
                selectedString = modString;

                formatedStrings[index] = selectedString;
            }

            let joinString = formatedStrings.join(' ');

            const formatedStringTextArea = `${UlTag}${joinString}\n</ul>`;
            const formatedStringDisplay = `<ul style="list-style-type:none">${joinString}\n</ul>`

            this.setupDisplay(formatedStringDisplay);

            this.setState(() => { return { value: formatedStringTextArea }; });
        }
    }

    setupDisplay = (stringValue) => {
        this.setState({ codePreview: stringValue });
    }

    handleAddColor = (event, color) => {
        event.preventDefault();
        const { radioStyle, radioFormat, radioJSX } = this.state
        const txtArea = document.getElementById("codeTextarea");
        const selectedTextStartIndex = txtArea.selectionStart;
        const selectedTextEndIndex = txtArea.selectionEnd;
        const selectedText = txtArea.value.substring(selectedTextStartIndex, selectedTextEndIndex);

        const textAreaReplacement = getReplacementText(radioStyle, radioFormat, radioJSX, selectedText, color);

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
                codePreview: codePreviewValue
            }
        });
    }

    handleRadioChange = (changeEvent) => {
        let targetValue = changeEvent.target.value;
        if (targetValue === 'JSX' && this.state.radioJSX === 'JSX') {
            targetValue = '';
        }
        if (targetValue === 'JSX' && this.state.radioJSX !== 'JSX') {
            this.setState({ radioStyle: "Class" })
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
                            className="texArea-height"
                            placeholder="Paste your code inside"
                            style={{ width: "100%" }} value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <br />
                    </div>
                </div>
                <DisplayFormattedCode displayCodeString={this.state.codePreview} />
            </div>
        );
    }
}

