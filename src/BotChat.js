import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ScrollToBottom from 'react-scroll-to-bottom';
import botAvatar from './assets/botProfile.png';
import userAvatar from './assets/profile.png';
import kinHubLogo from './assets/kinhubLogo.png';

function BotChat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false); // New state variable

  useEffect(() => {
    startConversation();
  },[]);

  async function startConversation() {
    try {
      const response = await axios.post(
        'https://europe.directline.botframework.com/v3/directline/conversations',
        null,
        {
          headers: {
            Authorization: 'Bearer bwYLT-cwA_M.BhtJakrYsUzI3nrfwSslYOjn8WhbQXEO3ppdhWJQ8iw',
            'Content-Type': 'application/json',
          },
        }
      );

      const id = response.data.conversationId;
      console.log('Conversation ID:', id);
      setConversationId(id);

      // Receive messages from the bot
      receiveMessagesFromBot(id);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  }

  async function sendMessageFromUser(conversationId, message) {
    try {
      const url = `https://europe.directline.botframework.com/v3/directline/conversations/${conversationId}/activities`;
      const payload = {
        text: message,
        type: 'message',
        from: {
          id: 'annelast202@gmail.com',
          role: 'user',
        },
      };

      await axios.post(url, payload, {
        headers: {
          Authorization: 'Bearer bwYLT-cwA_M.BhtJakrYsUzI3nrfwSslYOjn8WhbQXEO3ppdhWJQ8iw',
          'Content-Type': 'application/json',
        },
      });

      console.log('Message sent from user:', message);
      setUserInput('');
    } catch (error) {
      console.error('Error sending message from user:', error);
    }
  }

  async function receiveMessagesFromBot(conversationId) {
    try {
      let watermark = '';
      let currentMessage = null;

      const resolve = async (word, currentMessage) => {
        // Delay between each word
        await new Promise(resolve => setTimeout(resolve, 200));

        // Update the current message with the new word
        currentMessage.message += word + ' ';

        // Update the messages state with the modified current message
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          const currentIndex = updatedMessages.findIndex(msg => msg.id === currentMessage.id);
          updatedMessages[currentIndex] = currentMessage;
          return updatedMessages;
        });
      };

      while (true) {
        const response = await axios.get(
          `https://europe.directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
          {
            params: { watermark },
            headers: {
              Authorization: 'Bearer bwYLT-cwA_M.BhtJakrYsUzI3nrfwSslYOjn8WhbQXEO3ppdhWJQ8iw',
              'Content-Type': 'application/json',
            },
          }
        );

        const activities = response.data.activities;

        for (let i = 0; i < activities.length; i++) {
          const activity = activities[i];

          if (activity.type === 'message') {
            if (activity.from.role === 'user') {
              // User message
              const newMessage = {
                id: uuidv4(),
                message: activity.text,
                sender: 'user',
                time: new Date().getHours() + ':' + new Date().getMinutes(),
              };

              setMessages(prevMessages => [...prevMessages, newMessage]);
            } else {
              // Bot message
              setIsBotTyping(true); // Set typing indicator to true

              currentMessage = {
                id: uuidv4(),
                message: '',
                sender: 'bot',
                time: new Date().getHours() + ':' + new Date().getMinutes(),
              };

              setMessages(prevMessages => [...prevMessages, currentMessage]);

              const words = activity.text.split(' ');

              for (let j = 0; j < words.length; j++) {
                const word = words[j];
                await resolve(word, currentMessage);
              }

              setIsBotTyping(false); // Set typing indicator to false
            }
          }
        }

        if (response.data.watermark) {
          watermark = response.data.watermark;
        }

        // Delay before checking for new messages
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error receiving messages from bot:', error);
    }
  }

  const handleMessageChange = event => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessageFromUser(conversationId, userInput);
  };

  return (
    <div>
      
      <div className="chat-window">
        <div className="chat-header">
          <img src={kinHubLogo} className='chatLogo'/>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messages.map(message => (
              <div key={message.id}>
                {message.sender === 'user' ? (
                  <div>
                    <div className="message-user">
                      <div className="message-content-user">
                        <p>{message.message}</p>
                      </div>
                      <div className="user-avatar">
                        <img width={30} height={30} src={userAvatar} alt="User Avatar" />
                      </div>
                    </div>
                    <div className="message-meta-user">
                      <p id="name">User</p>
                      <p id="time">{message.time}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="message-bot">
                      <div className="bot-avatar">
                        <img width={30} height={30} src={botAvatar} alt="Bot Avatar" />
                      </div>
                      <div className="message-content-bot">
                        <p>{message.message}</p>
                      </div>
                    </div>

                    <div className="message-meta-bot">
                      <p id="time">{message.time}</p>
                      <p>Charlie</p>
                    </div>
                    
                  </div>
                )}
              </div>
            ))}
            {isBotTyping && <div className='ticontainer'>
                                      <div className="tiblock">
                                        <div className="tidot"></div>
                                        <div className="tidot"></div>
                                        <div className="tidot"></div>
                                      </div>                 
                                    </div>} {/* Display typing indicator if the bot is typing */}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={userInput}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
            onKeyPress={event => {
              event.key === 'Enter' && handleSendMessage();
            }}
          />
          <button onClick={handleSendMessage}>&#187;</button>
        </div>
      </div>
    </div>
  );
}

export default BotChat;
