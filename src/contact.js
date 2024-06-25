import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://qviwhpnmdktfvfztfcpt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2aXdocG5tZGt0ZnZmenRmY3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyNTIxODMsImV4cCI6MjAzNDgyODE4M30.tqkIJml1CmdVow1i5uhmSp9-UDPtFmwZJGWt26-X4ek')
const contactForm = document.getElementById('contact-form');
const feedbackMessageElement = document.getElementById('feedback-message');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = contactForm.elements['name'].value.trim();
    const email = contactForm.elements['email'].value.trim();
    const message = contactForm.elements['message'].value.trim();

    if (!validation(name, email, message)) {
        return;
    }
    
    try {
        await insertRow(name, email, message);
        showFeedbackMessage("Message sent successfully :-)");
        contactForm.reset();
    } catch (error) {
        showFeedbackMessage("An error occurred while sending the message.");
    }
});

function validation(name, email, message) {
    const namePattern = /^[a-zA-Z\s]{2,20}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messagePattern = /^.{1,250}$/;

    if (name === "" || email === "" || message === "") {
        showFeedbackMessage("All fields are required");
        return false;
    }

    if (!namePattern.test(name)) {
        showFeedbackMessage("Invalid name format");
        return false;
    }
    if (!emailPattern.test(email)) {
        showFeedbackMessage("Invalid email format");
        return false;
    }
    if (!messagePattern.test(message)) {
        showFeedbackMessage("Invalid message ");
        return false;
    }

    return true;
}

async function insertRow(name, email, message) {
    const { error } = await supabase
        .from('contact')
        .insert([
            { name: name, email: email, message: message }
        ]);

    if (error) console.log('Error inserting row:', error.message);
}

function showFeedbackMessage(message) {
    feedbackMessageElement.style.display = 'block';
    feedbackMessageElement.textContent = message;
    setTimeout(() => {
        feedbackMessageElement.style.display = 'none';
    }, 3000);
}


  