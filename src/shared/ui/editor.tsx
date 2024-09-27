import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  theme?: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<TextEditorProps> = ({
  value,
  theme = "snow",
  onChange,
}) => <ReactQuill theme={theme} value={value} onChange={onChange} />;

Editor.displayName = "Editor";

export {Editor};
