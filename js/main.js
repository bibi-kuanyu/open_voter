// Core application logic
document.addEventListener('DOMContentLoaded', () => {
  console.log('Election Pledge Tracker loaded!');
});

// Helper function to load JSON data
async function loadJSON(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading JSON:', error);
    return null;
  }
}
