import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type TextEditorProps = ReactQuillProps & {
  value: string;
  theme?: string;
  onChange: (content: string) => void;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: ['right', 'center', 'justify'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
  ],
};

const Editor: React.FC<TextEditorProps> = ({ value, theme = 'snow', onChange, ...props }) => (
  <ReactQuill theme={theme} value={value} onChange={onChange} {...props} modules={modules} />
);

Editor.displayName = 'Editor';

export { Editor };
