/**
 * Omnidrive
 * Quickly create new Google Drive documents
 */



chrome.storage.sync.get('appDomain', cb );

function cb (response) {
    let appDomain;

    if (response.appDomain != null && response.appDomain.length > 0) {
        appDomain = response.appDomain;
    } else {
        appDomain = '';
    }

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
                    if (appDomain.length > 0) {
                        url = `https://docs.google.com/a/${appDomain}/spreadsheet/ccc?new`;
                    } else {
                        url = 'https://sheets.google.com/create';
                    }
                    break;
                case 'presentation':
                    if (appDomain.length > 0) {
                        url = `https://docs.google.com/a/${appDomain}/presentation/create`;
                    } else {
                        url = 'https://slides.google.com/create';
                    }
                    break;
                case 'drawing':
                    if (appDomain.length > 0) {
                        url = `https://drawings.google.com/a/${appDomain}/create`;
                    } else {
                        url = 'https://drawings.google.com/create';
                    }
                    break;
                case 'doc':
                default:
                    if (appDomain.length > 0) {
                        url = `https://docs.google.com/a/${appDomain}/document/create`;
                    } else {
                        url = 'https://docs.google.com/document/create';
                    }
                    break;
            }

            chrome.tabs.create ({ 'url': url });
        }
    );
}
