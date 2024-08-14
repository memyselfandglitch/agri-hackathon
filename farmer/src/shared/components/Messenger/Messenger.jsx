import React, { useEffect, useState, useRef } from 'react';

const ChatBox = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Load the Dialogflow Messenger stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
    document.head.appendChild(link);

    // Load the Dialogflow Messenger script
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize SpeechRecognition if supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;

        // Use MutationObserver to wait for the input box to be available
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
          const observer = new MutationObserver(() => {
            const inputBox = dfMessenger.shadowRoot.querySelector('input');
            if (inputBox) {
              inputBox.value = speechToText;
              inputBox.focus();
              observer.disconnect(); // Stop observing after the input is found
            }
          });

          observer.observe(dfMessenger.shadowRoot, { childList: true, subtree: true });
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error('Speech recognition not supported in this browser.');
    }

    // Clean up by removing the stylesheet and script when the component is unmounted
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <>
      <df-messenger
       project-id="maximal-run-432015-n9"
       agent-id="7b4ff456-1303-40cb-819d-6beb3da56ba0"
       language-code="en"
       max-query-length="-1"
      >
        <df-messenger-chat chat-title="Your Chatbot"></df-messenger-chat>
      </df-messenger>
      <style>
        {`
          df-messenger {
            --df-messenger-font-color: #000;
            --df-messenger-font-family: Google Sans;
            --df-messenger-chat-background: #f3f6fc;
            --df-messenger-message-user-background: #d3e3fd;
            --df-messenger-message-bot-background: #fff;
            width: 100%;
            height: 100%;
          }
          .mic-icon {
            cursor: pointer;
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #007bff;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
          }
          .mic-icon.active {
            background-color: #dc3545;
          }
        `}
      </style>
      <div className={`mic-icon ${isListening ? 'active' : ''}`} onClick={handleMicClick}>
        <span role="img" aria-label="microphone">
          🎤
        </span>
      </div>
    </>
  );
};

export default ChatBox;
