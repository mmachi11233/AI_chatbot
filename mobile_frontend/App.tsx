import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native';
import axios from 'axios';

interface Content {
  _id: string;
  title: string;
  text: string;
}

const backendUrl = 'http://localhost:3333/api';

const App = () => {
  const [query, setQuery] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentText, setNewContentText] = useState('');
  const [contents, setContents] = useState<Content[]>([]);

  const handleChatbotSubmit = async () => {
    try {
      const response = await axios.post(`${backendUrl}/chatbot`, { query });
      setChatbotResponse(response.data.response || 'No response.');
    } catch (error: any) {
      setChatbotResponse(`Error: ${error.message}`);
    }
    setQuery('');
  };

  const handleAddContent = async () => {
    try {
      await axios.post(`${backendUrl}/contents`, { title: newContentTitle, text: newContentText });
      setNewContentTitle('');
      setNewContentText('');
      fetchContents();
    } catch (error: any) {
      console.error('Error adding content:', error);
    }
  };

  const fetchContents = async () => {
    try {
      const response = await axios.get<Content[]>(`${backendUrl}/contents`);
      setContents(response.data);
    } catch (error: any) {
      console.error('Error fetching contents:', error);
    }
  };

  React.useEffect(() => {
    fetchContents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chatbot & CMS</Text>

      <View style={styles.chatbotSection}>
        <Text style={styles.sectionTitle}>Chatbot</Text>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Send" onPress={handleChatbotSubmit} />
        {chatbotResponse && <Text style={styles.response}>Bot: {chatbotResponse}</Text>}
      </View>

      <View style={styles.cmsSection}>
        <Text style={styles.sectionTitle}>Add New Content</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={newContentTitle}
          onChangeText={setNewContentTitle}
        />
        <TextInput
          style={styles.multilineInput}
          placeholder="Text"
          multiline
          value={newContentText}
          onChangeText={setNewContentText}
        />
        <Button title="Add Content" onPress={handleAddContent} />
      </View>

      <View style={styles.cmsSection}>
        <Text style={styles.sectionTitle}>Existing Content</Text>
        <FlatList
          data={contents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Text>{item.title}: {item.text.substring(0, 50)}...</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  multilineInput: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  response: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b2ebf2',
  },
  chatbotSection: {
    marginBottom: 20,
  },
  cmsSection: {
    marginBottom: 20,
  },
});

export default App;
export{};
