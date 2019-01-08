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
            elementList: [],
            selectedRadio: 'Color',
            formatedString: ''
        };
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.findAndReplace();
    }

    findAndReplace = () => {
        let formatedStrings = [];
        let selectedString = "";
        let rowStartWith = "";
        let rowEndWith = ""
        const stringToBeModified = this.state.value;
        const arrayOfStrings = splitStringIntoArrayOfStrings(stringToBeModified);
        const numberOfLinesToFormat = arrayOfStrings.length;

        if (this.state.value) {

            for (let index = 0; index < numberOfLinesToFormat; index++) {

                selectedString = arrayOfStrings[index].trim();
                const replaceSlashes = selectedString.replace(/\//g, "&#47;");
                selectedString = replaceSlashes.replace("<", "&#60;");

                switch (true) {
                    case selectedString.startsWith("//"):
                        rowStartWith = "\n<li>";
                        rowEndWith = "</li>";
                        break;

                    case selectedString.startsWith("}") || selectedString.startsWith(")"):
                        rowStartWith = "</ul>\n";
                        rowEndWith = "</li>";
                        break;
                    case selectedString.startsWith("&#60;") && !selectedString.startsWith("&#60;&#47;") && !selectedString.endsWith("/>") && selectedString.endsWith(">"):
                        // &#60; === <
                        rowStartWith = "\n<li>";
                        rowEndWith = "\n<ul>";
                        break;
                    case selectedString.endsWith("{") || selectedString.endsWith("("):
                        rowStartWith = "\n<li>";
                        rowEndWith = "\n<ul>";
                        break;
                    case selectedString.startsWith("&#60;&#47;") && selectedString.endsWith(">"):
                        rowStartWith = "</ul>\n";
                        rowEndWith = "</li>";
                        break;
                    default:
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

        switch (this.state.selectedRadio) {
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
        this.setState({
            selectedRadio: changeEvent.target.value
        });
    }
    render() {
        return (
            <div className="flexContainer flex-warp">
                <div className="margin-md">
                    <h2 className="">Format Javascript Code Using List</h2>
                    <Tabs
                        handleAddColor={this.handleAddColor}
                        selectedRadio={this.state.selectedRadio}
                        handleRadioChange={this.handleRadioChange}
                    />
                    <form className="formatter margin-top-sm" onSubmit={this.handleSubmit}>
                        <div >
                            <textarea
                                name="text" id="codeTextarea"
                                className="texarea-height" placeholder="Paste your code inside"
                                style={{ width: "100%" }} value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div >
                            <button type="submit" value="Submit" >Convert</button>
                        </div>
                        <br />
                    </form>
                </div>
                <DisplayFormattedCode displayCodeString={this.displayCodeString} />
            </div>
        );
    }
}


// changeSelectedText = () => {
//     console.log("test");

//     // obtain the object reference for the textarea>
//     var txtArea = document.getElementById("codeTextarea");
//     // obtain the index of the first selected character
//     var start = txtArea.selectionStart;
//     // obtain the index of the last selected character
//     var finish = txtArea.selectionEnd;
//     //obtain all Text
//     var allText = txtArea.value;

//     // obtain the selected text
//     var sel = allText.substring(start, finish);
//     //append te text;
//     var newText = allText.substring(0, start) + "<center>" + sel + "</center>" + allText.substring(finish, allText.length);

//     console.log(newText);

//     txtArea.value = newText;
// }