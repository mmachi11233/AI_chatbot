import React, { useState, useEffect, CSSProperties } from 'react';
import { Content } from '../types/Content';

interface CMSInterfaceProps {
  fetchContent: () => Promise<Content[]>;
  addContent: (newContent: Omit<Content, '_id' | 'createdAt' | 'updatedAt'>) => Promise<Content>;
  updateContent: (id: string, updatedContent: Omit<Content, 'createdAt' | 'updatedAt'>) => Promise<Content>;
  deleteContent: (id: string) => Promise<void>;
}

const CMSInterface: React.FC<CMSInterfaceProps> = ({
  fetchContent,
  addContent,
  updateContent,
  deleteContent,
}) => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editTitle, setEditTitle] = useState('');

  
  const BACKEND_URL = 'http://localhost:3333';

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/contents`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setContentList(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleAddContent = async () => {
    if (newTitle.trim() && newText.trim()) {
      try {
        const response = await fetch(`${BACKEND_URL}/contents`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTitle, text: newText }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const newContent = await response.json();
        setContentList((prevList) => [...prevList, newContent]);
        setNewTitle('');
        setNewText('');
      } catch (error) {
        console.error('Error adding content:', error);
      }
    }
  };

  const handleEdit = (content: Content) => {
    setEditingId(content._id || null);
    setEditTitle(content.title);
    setEditText(content.text);
  };

  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        const response = await fetch(`${BACKEND_URL}/contents/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: editTitle, text: editText }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const updatedContent = await response.json();
        setContentList((prevList) =>
          prevList.map((item) => (item._id === editingId ? { ...item, ...updatedContent } : item))
        );
        setEditingId(null);
      } catch (error) {
        console.error('Error updating content:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/contents/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setContentList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const stylesCMS: { [key: string]: CSSProperties } = {
    cmsContainer: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginTop: '20px',
    },
    input: {
      width: '100%',
      padding: '8px',
      margin: '8px 0',
      borderRadius: '3px',
      border: '1px solid #ddd',
    },
    textarea: {
      width: '100%',
      padding: '8px',
      margin: '8px 0',
      borderRadius: '3px',
      border: '1px solid #ddd',
      minHeight: '100px',
    },
    button: {
      padding: '8px 15px',
      borderRadius: '3px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      marginRight: '10px',
    },
  };

  return (
    <div style={stylesCMS.cmsContainer}>
      <h2>Add New Content</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddContent(); }}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={stylesCMS.input}
          required
        />
        <textarea
          placeholder="Text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          style={stylesCMS.textarea}
          required
        />
        <button type="submit" style={stylesCMS.button}>Add Content</button>
      </form>

      <h2>Existing Content</h2>
      {contentList.length > 0 ? (
        <ul>
          {contentList.map((content) => (
            <li key={content._id}>
              {editingId === content._id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={stylesCMS.input}
                  />
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={stylesCMS.textarea}
                  />
                  <button onClick={handleSaveEdit} style={stylesCMS.button}>Save</button>
                  <button onClick={() => setEditingId(null)} style={stylesCMS.button}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{content.title}</strong>: {content.text.substring(0, 50)}...
                  <button onClick={() => handleEdit(content)} style={stylesCMS.button}>Edit</button>
                  <button onClick={() => handleDelete(content._id!)} style={stylesCMS.button}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

export default CMSInterface;
export{};