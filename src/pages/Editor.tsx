// import { useRef } from "react";
// import BundledEditor from "../components/BundledEditor";

// const QuestionEditor = () => {
  
//   const editorRef = useRef(null);
  
//   return (
//     <>
//       <BundledEditor
//         onInit={(_evt: never, editor: never) => editorRef.current = editor}
//         initialValue='<p>This is the initial content of the editor.</p>'
//         init={{
//           height: 500,
//           menubar: false,
//           plugins: [
//             'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
//             'searchreplace', 'table', 'wordcount'
//           ],
//           toolbar: 'undo redo | blocks | ' +
//             'bold italic forecolor | alignleft aligncenter ' +
//             'alignright alignjustify | bullist numlist outdent indent | ' +
//             'removeformat | help',
//           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//         }}
//       />
//     </>
//   );
// };

// export default QuestionEditor;