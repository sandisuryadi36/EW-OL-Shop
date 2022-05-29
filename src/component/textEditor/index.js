import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = (props) => {
    const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current.getContent());
    //     }
    // };
    return (
        <>
            <Editor
                apiKey='11rbs6t4chrjjyedk86g44q263my31njyysb0mnc89r1gsva'
                onInit={(evt, editor) => editorRef.current = editor}
                textareaName={props.name}
                initialValue={props.value}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            {/* <button onClick={log}>Log editor content</button> */}
        </>
    );
}

export default TextEditor;