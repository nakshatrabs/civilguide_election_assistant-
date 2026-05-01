document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Timeline Logic
       ========================================================================== */
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const progressFill = document.getElementById('progress-fill');

    function updateTimeline(stepNumber) {
        // Update nodes
        timelineNodes.forEach(node => {
            if (parseInt(node.dataset.step) <= stepNumber) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });

        // Update content steps
        timelineSteps.forEach(step => {
            step.classList.remove('active');
        });
        const currentStep = document.getElementById(`step-${stepNumber}`);
        if (currentStep) {
            currentStep.classList.add('active');
        }

        // Update progress bar
        // Total spaces between nodes is nodes.length - 1
        const percentage = ((stepNumber - 1) / (timelineNodes.length - 1)) * 100;
        progressFill.style.width = `${percentage}%`;
    }

    timelineNodes.forEach(node => {
        node.addEventListener('click', () => {
            const step = parseInt(node.dataset.step);
            updateTimeline(step);
        });
    });

    /* ==========================================================================
       Assistant Chat Logic (Simulated)
       ========================================================================== */
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const quickSuggestions = document.getElementById('quick-suggestions');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // Simple keyword-based responses for the simulation
    const knowledgeBase = [
        {
            keywords: ['what would you like to do', 'options', 'menu'],
            response: "You can choose one of the following options:\n<br><br><ul><li>Check election dates</li><li>Learn how to vote</li><li>Register as a voter</li><li>View required documents</li></ul>"
        },
        {
            keywords: ['18 years', 'older', 'age', 'how old'],
            response: "You must be 18 years or older to vote in elections. If you are not yet 18, you are not eligible to vote."
        },
        {
            keywords: ['state', 'city', 'from', 'where are you'],
            response: "Please select or enter your state/city so I can provide local election details and timelines."
        },
        {
            keywords: ['voter id card', 'already have a voter id'],
            response: "<ul><li>**Yes** → You can proceed to check your name in the voter list.</li><li>**No** → You need to register first to get a voter ID.</li></ul>"
        },
        {
            keywords: ['help registering', 'new voter', 'how to register', 'registering as a new voter'],
            response: "To register as a voter:\n<br><ol><li>Visit the official portal of the Election Commission of India</li><li>Fill out the voter registration form (Form 6)</li><li>Submit required documents</li><li>Wait for verification and approval</li></ol>"
        },
        {
            keywords: ['check your name', 'voter list', 'check name'],
            response: "Yes, you should verify your name in the voter list before election day. You can check it online using your details on the official election website."
        },
        {
            keywords: ['polling booth location', 'where to vote', 'booth'],
            response: "You can find your polling booth location by searching your voter details on the official election portal or voter helpline app."
        },
        {
            keywords: ['step-by-step voting process', 'how to vote', 'voting process'],
            response: "Here’s how to vote:\n<br><ol><li>Go to your polling booth</li><li>Show your voter ID or valid ID proof</li><li>Get your finger inked</li><li>Cast your vote using the EVM machine</li><li>Confirm your vote</li></ol>"
        },
        {
            keywords: ['documents', 'required for voting', 'id proof'],
            response: "You can carry any one of the following:\n<br><ul><li>Voter ID card</li><li>Aadhaar card</li><li>Passport</li><li>Driving license</li></ul>"
        },
        {
            keywords: ['reminder', 'election day reminder', 'set a reminder'],
            response: "Yes, setting a reminder helps ensure you don’t miss voting. You can set it on your phone or through this assistant if supported."
        }
    ];

    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        
        // Find best match in knowledge base
        for (const entry of knowledgeBase) {
            if (entry.keywords.some(keyword => lowerInput.includes(keyword))) {
                return entry.response;
            }
        }
        
        // Default response
        return "That's a great question. While I am a simulated assistant, I recommend checking your local government or official election commission website for the most accurate and legally binding information regarding that specific topic.";
    }

    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        // Basic markdown-like bolding formatting (*text*)
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        contentDiv.innerHTML = formattedText;
        
        messageDiv.appendChild(contentDiv);
        
        // Copy Button for Assistant
        if (sender === 'assistant') {
            const copyBtn = document.createElement('button');
            copyBtn.classList.add('copy-btn');
            copyBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg> Copy
            `;
            copyBtn.addEventListener('click', () => {
                // Remove HTML tags for plain text copying
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = text.replace(/<br>/g, '\n').replace(/<\/li>/g, '\n').replace(/<li>/g, '• ');
                const plainText = tempDiv.textContent || tempDiv.innerText || "";
                navigator.clipboard.writeText(plainText.trim()).then(() => {
                    const originalHtml = copyBtn.innerHTML;
                    copyBtn.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg> Copied!
                    `;
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHtml;
                    }, 2000);
                });
            });
            messageDiv.appendChild(copyBtn);
        }
        
        // Insert before quick suggestions if they exist in the container
        if (quickSuggestions && quickSuggestions.parentNode === chatMessages) {
            chatMessages.insertBefore(messageDiv, quickSuggestions);
        } else {
            chatMessages.appendChild(messageDiv);
        }
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showRecommendations() {
        // Remove existing recommendations if any
        const existingRecs = document.querySelector('.dynamic-recommendations');
        if (existingRecs) {
            existingRecs.remove();
        }

        const recContainer = document.createElement('div');
        recContainer.classList.add('quick-suggestions', 'dynamic-recommendations');
        
        // Pick a few random recommendations or cycle through them
        const recommendations = [
            "What documents are required for voting?",
            "How do I register to vote?",
            "Explain step-by-step voting process",
            "Do I need a voter ID card?",
            "Set a reminder for election day"
        ];
        
        // Select 3 random recommendations
        const shuffled = [...recommendations].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        
        selected.forEach(text => {
            const btn = document.createElement('button');
            btn.classList.add('suggestion-btn');
            btn.textContent = text;
            btn.addEventListener('click', () => {
                handleUserInput(text);
            });
            recContainer.appendChild(btn);
        });

        chatMessages.appendChild(recContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.classList.add('message', 'assistant', 'typing-msg');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        contentDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        indicatorDiv.appendChild(contentDiv);
        chatMessages.appendChild(indicatorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return indicatorDiv;
    }

    function handleUserInput(text) {
        if (!text.trim()) return;

        // Hide suggestions after first interaction
        if (quickSuggestions) {
            quickSuggestions.style.display = 'none';
        }

        // Add User Message
        appendMessage(text, 'user');
        chatInput.value = '';

        // Show typing indicator
        const typingMsg = showTypingIndicator();

        // Simulate thinking delay
        setTimeout(() => {
            // Remove typing indicator
            if (typingMsg && typingMsg.parentNode) {
                typingMsg.parentNode.removeChild(typingMsg);
            }
            
            const response = getBotResponse(text);
            appendMessage(response, 'assistant');
            
            // Show new recommendations after a slight delay
            setTimeout(() => {
                showRecommendations();
            }, 400);
        }, 1200); // 1.2s delay to feel more like AI generating
    }

    sendBtn.addEventListener('click', () => {
        handleUserInput(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput(chatInput.value);
        }
    });

    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleUserInput(btn.textContent);
        });
    });

    // Clear Chat Logic
    const clearChatBtn = document.getElementById('clear-chat-btn');
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            // Reset chat messages to initial state
            chatMessages.innerHTML = `
                <div class="message assistant">
                    <div class="message-content">
                        Hello! I'm here to help you understand the election process. I provide neutral, factual information. How can I assist you today?
                    </div>
                </div>
            `;
            
            // Re-add default quick suggestions
            if (quickSuggestions) {
                quickSuggestions.style.display = 'flex';
                chatMessages.appendChild(quickSuggestions);
            }
            
            chatInput.value = '';
        });
    }
});
