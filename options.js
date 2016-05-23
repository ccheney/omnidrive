const appDomainInputElement = document.querySelector('#appDomain');

function save () {
    const appDomainValue = appDomainInputElement.value;

    chrome.storage.sync.set({ 'appDomain': appDomainValue });

    chrome.extension.getBackgroundPage().window.location.reload()
}

function restore () {
    chrome.storage.sync.get('appDomain', (response) => {
        if (response.appDomain != null) {
            appDomainInputElement.value = response.appDomain;
        }
    });
}

document.addEventListener('DOMContentLoaded', restore);

document.getElementById('save').addEventListener('click', save);
