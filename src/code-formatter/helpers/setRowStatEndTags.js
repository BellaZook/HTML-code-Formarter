import { HTML_LESS_THAN, HTML_SLASH } from "./constants";

const setRowStartEndTags = (selectedString, UlTag) => {
    let rowStartWith = "";
    let rowEndWith = ""

    switch (true) {
        case selectedString.startsWith("}") || selectedString.startsWith(")"):
            // } , )
            rowStartWith = "</ul>\n";
            rowEndWith = "</li>";
            break;
        case selectedString.startsWith(HTML_LESS_THAN + HTML_SLASH) && selectedString.endsWith(">") && (selectedString.split(HTML_LESS_THAN).length - 1) < 2:
            // </ tag >
            rowStartWith = "</ul>\n";
            rowEndWith = "</li>";
            break;
        case selectedString.startsWith(HTML_LESS_THAN) && selectedString.endsWith(">") && (selectedString.split(HTML_LESS_THAN).length - 1) > 1:
            // <tag> text </tag>
            rowStartWith = "\n<li>";
            rowEndWith = "</li>";
            break;
        case selectedString.startsWith(HTML_LESS_THAN) && selectedString.endsWith(HTML_SLASH + ">") && (selectedString.split(HTML_LESS_THAN).length - 1) < 2:
            // <tag/>
            rowStartWith = "\n<li>";
            rowEndWith = "</li>";
            break;
        case selectedString.startsWith(HTML_LESS_THAN) && !selectedString.endsWith("/>") && selectedString.endsWith(">"):
            // <tag>
            rowStartWith = "\n<li>";
            rowEndWith = "\n" + UlTag;
            break;
        case selectedString.startsWith(HTML_LESS_THAN) && !selectedString.endsWith("/>") && !selectedString.endsWith(">") && selectedString.split(" ").length === 1:
            // <tag
            rowStartWith = "\n<li>";
            rowEndWith = "\n" + UlTag;
            break;
        case selectedString.startsWith(HTML_SLASH + ">") && selectedString.endsWith(HTML_SLASH + ">"):
            //   /> 
            rowStartWith = "</ul>\n";
            rowEndWith = "</li>";
            break;
        case selectedString.startsWith(">") && selectedString.endsWith(">"):
            //   >
            rowStartWith = "</ul>\n";
            rowEndWith = "</li>\n" + UlTag;
            break;

        case selectedString.startsWith(HTML_SLASH + HTML_SLASH):
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

    return {
        rowStartWith,
        rowEndWith

    }
}

export default setRowStartEndTags;