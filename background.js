/**
 * Omnidrive
 * Quickly create new Google Drive documents
 */

chrome.omnibox.onInputChanged.addListener (
    (text, suggest) => {
        const suggestions = [
            { content: 'doc', description: 'Create New Google Document' },
            { content: 'sheet', description: 'Create New Google Spreadsheet' },
            { content: 'presentation', description: 'Create New Google Presentation' },
            { content: 'drawing', description: 'Create New Google Drawing' }
        ];

        suggest(suggestions);
    }
);


chrome.omnibox.onInputEntered.addListener (
    (text) => {
        let url = '';

        switch (text) {
            case 'sheet':
                url = 'https://sheets.google.com/create';
                break;
            case 'presentation':
                url = 'https://slides.google.com/create';
                break;
            case 'drawing':
                url = 'https://drawings.google.com/create';
                break;
            case 'doc':
            default:
                url = 'https://docs.google.com/document/create';
                break;
        }

        chrome.tabs.create ({ 'url': url });
    }

);
