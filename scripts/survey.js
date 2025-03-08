// user preferences script

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('surveyForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect survey data
        const surveyData = {
            age_group: form.querySelector('input[name="age_group"]:checked')?.value,
            privacy_concern: form.querySelector('input[name="privacy_concern"]:checked')?.value,
            content_creation: form.querySelector('input[name="content_creation"]:checked')?.value,
            litigation_concern: form.querySelector('input[name="litigation_concern"]:checked')?.value,
            security_concern: form.querySelector('input[name="security_concern"]:checked')?.value,
            timestamp: new Date().toISOString() // Add a timestamp for tracking
        };

        // Save to Chrome extension local storage
        chrome.storage.local.set({ surveyResults: surveyData }, () => {
            if (chrome.runtime.lastError) {
                console.error('Error saving survey data:', chrome.runtime.lastError);
                alert('An error occurred while saving your preferences. Please try again.');
            } else {
                alert('Thank you for filling in your preferences! \nYou can now close the tab.');
                form.reset(); // Reset the form after submission
            }
        });
    });
});

document.querySelectorAll('.info-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const tooltip = icon.querySelector('.tooltip');
        tooltip.classList.toggle('active');
    });
});

// Close tooltips when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        tooltip.classList.remove('active');
    });
});

// Close tooltips on ESC press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.classList.remove('active');
        });
    }
});