document.getElementById('admissionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        twelfthMarks: parseInt(document.getElementById('twelfthMarks').value),
        cetScore: parseInt(document.getElementById('cetScore').value),
        email: document.getElementById('email').value
    };

    try {
        // Send data to backend server
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to add student');
        }

        const data = await response.json();
        console.log('Student added:', data);

        // Clear form fields after successful submission
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('twelfthMarks').value = '';
        document.getElementById('cetScore').value = '';
        document.getElementById('email').value = '';
    } catch (error) {
        console.error('Error:', error.message);
    }
});
