import { AiOutlineVideoCameraAdd } from 'react-icons/ai';

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'indent',
  'link',
  'image',
  'color',
  'code-block'
];

export const EditorToolbar = () => (
  <div id="quill-toolbar">
    <span className="ql-formats">
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-list" value="ordered" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    {/* Custom Button 추가 */}
    <span className="ql-formats">
      <button className="ql-video-thumbnail !flex !w-auto items-center">
        <AiOutlineVideoCameraAdd />
        <span className="ml-1 text-xs font-bold text-primaryDark underline underline-offset-2 hover:text-indigo-800">
          동영상에서 썸네일 가져오기
        </span>
      </button>
    </span>
  </div>
);
