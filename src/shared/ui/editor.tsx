import ReactQuill, {ReactQuillProps} from "react-quill";
import "react-quill/dist/quill.snow.css";

type TextEditorProps = ReactQuillProps & {
  value: string;
  theme?: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<TextEditorProps> = ({
  value,
  theme = "snow",
  onChange,
  ...props
}) => <ReactQuill theme={theme} value={value} onChange={onChange} {...props} />;

Editor.displayName = "Editor";

export {Editor};
