# Chatroom Project Plan

## Overview
This document outlines the features and implementation details for a chatroom application where users can join, create chatrooms, and interact with questions.

## Features

### User Management
- **Username Selection**: Users choose their own username upon joining.
- **Join Chatroom**: Users can join existing chatrooms.

### Chatroom Features
- **Create Chatroom**: Users can create new chatrooms.
- **Question Input**: Users can input their own questions in the chatroom.
- **Voting System**: Users can vote on questions. If more than half of the participants dislike a question, it will be removed.
- **Chatroom Title**: The chatroom title is based on the current question.

### Message Display
- **Firestore Integration**: Display messages from Firestore.
- **Latest Messages**: Show the latest messages in the chatroom.
- **Question Display**: Display the current question prominently.
- **Question Rotation**: Change the question every 15 minutes.

## Implementation Details

### Firestore Integration
- Use Firestore to store and retrieve messages and questions.
- Implement real-time updates to display the latest messages.

### Voting System
- Implement a voting mechanism to allow users to vote on questions.
- Calculate votes and remove questions if necessary.

### Testing
- Generate tests to ensure the functionality of user management, chatroom features, and message display.

## Future Enhancements
- Consider adding user authentication for enhanced security.
- Implement additional moderation tools for chatroom management.

This document serves as a starting point for the development of the chatroom application. As the project progresses, this plan can be updated to reflect new features and changes.