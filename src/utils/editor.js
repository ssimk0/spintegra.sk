import htmlToDraft from "html-to-draftjs";
import {ContentState, EditorState} from "draft-js";
import {stateToHTML} from "draft-js-export-html";


export function fromHtmlToDraftState(content) {
    const blocksFromHtml = htmlToDraft(content);
    const {contentBlocks, entityMap} = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
}

export function fromDraftStateToHtml(contentState) {
    return stateToHTML(contentState.getCurrentContent())
}
