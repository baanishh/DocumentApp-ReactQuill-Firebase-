import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const querySnapshot = await getDocs(collection(db, 'documents'));
    const docs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setDocuments(docs);
  };

  const createDocument = async () => {
    const doc = await addDoc(collection(db, 'documents'), {
      title: 'Untitled Document',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    navigate(`/document/${doc.id}`);
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, 'documents', id));
    fetchDocuments();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <button
          onClick={createDocument}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Document
        </button>
      </div>
      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md"
          >
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => navigate(`/document/${doc.id}`)}
            >
              <h2 className="font-semibold">{doc.title}</h2>
              <p className="text-sm text-gray-500">
                Last edited {moment(doc.updatedAt).fromNow()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteDocument(doc.id);
              }}
              className="p-2 text-gray-500 hover:text-red-500"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;