import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    const docRef = doc(db, 'documents', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setTitle(data.title);
      setContent(data.content);
    }
  };

  const saveDocument = async () => {
    setSaving(true);
    const docRef = doc(db, 'documents', id);
    await updateDoc(docRef, {
      title,
      content,
      updatedAt: new Date().toISOString()
    });
    setSaving(false);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveDocument}
            className="flex-1 text-2xl font-bold border-none outline-none"
            placeholder="Untitled Document"
          />
          <div className="text-sm text-gray-500">
            {saving ? 'Saving...' : 'Saved'}
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(value) => {
            setContent(value);
            saveDocument();
          }}
          modules={modules}
          className="h-[calc(100vh-200px)] mb-12"
        />
      </div>
     <div className='flex justify-center items-center '>
     <button
            onClick={() => navigate('/')}
            className="border border-black px-5 py-3 w-full  max-w-3xl  hover:bg-gray-100 "
          >
            Save
      </button>
     </div>
         
    </div>
  );
};

export default DocumentEditor;
