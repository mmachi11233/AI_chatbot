import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import CMSInterface from './components/CMSInterface';
import { Content } from './types/Content';
import { CSSProperties } from 'react'; 

const App: React.FC = () => {
  const [showCMS, setShowCMS] = useState(false);


  const BACKEND_URL = 'http://localhost:3333';

  const handleSendMessage = async (message: string): Promise<string> => {
    try {
      const response = await fetch(`${BACKEND_URL}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.response; // Expect 'response' key in the JSON response
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      return 'Sorry, I encountered an error.';
    }
  };

  const fetchContent = async (): Promise<Content[]> => {
    const response = await fetch(`${BACKEND_URL}/contents`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  const addContent = async (newContent: Omit<Content, '_id' | 'createdAt' | 'updatedAt'>): Promise<Content> => {
    const response = await fetch(`${BACKEND_URL}/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContent),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  const updateContent = async (id: string, updatedContent: Omit<Content, 'createdAt' | 'updatedAt'>): Promise<Content> => {
    const response = await fetch(`${BACKEND_URL}/contents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContent),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  const deleteContent = async (id: string): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/contents/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  };

  const stylesApp: { [key: string]: CSSProperties } = {
    appContainer: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    toggleButton: {
      padding: '10px 15px',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '20px',
    },
  };

  return (
    <div style={stylesApp.appContainer}>
      <h1>Chatbot Application</h1>
      <button onClick={() => setShowCMS(!showCMS)} style={stylesApp.toggleButton}>
        {showCMS ? 'Hide CMS' : 'Show CMS'}
      </button>

      <ChatInterface onSendMessage={handleSendMessage} />

      {showCMS && (
        <CMSInterface
          fetchContent={fetchContent}
          addContent={addContent}
          updateContent={updateContent}
          deleteContent={deleteContent}
        />
      )}
    </div>
  );
};

export default App;
export{};
