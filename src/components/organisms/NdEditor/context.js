import { createContext } from 'react';
import { EditorState } from 'draft-js';

const NdEditorContext = createContext(EditorState.createEmpty());

export default NdEditorContext;
