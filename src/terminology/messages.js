/**
 * Returns a message for given key and subscriber
 * If the subscriber is not the default and the key is missing for the subscriber,
 * the function tries to find the key in the default messages
 *
 * @param key {string} The message key
 * @param subscriber {string=} The subscriber
 * @returns {*|string} The message or an empty string
 */
export default function msg(key, subscriber) {
    const DEFAULT = 'default';
    subscriber = subscriber || DEFAULT;
    const errMsg = 'Message met key = ' + key + ' en subscriber = ' + subscriber + ' niet gevonden!';
    let result = null;
    try {
        result = messages[subscriber][key];
        if (subscriber !== DEFAULT && typeof result == 'undefined') {
            result = messages[DEFAULT][key];
        }
    } catch (e) {
        //niet bestaande subscriber
        console.log(errMsg)
    }
    if (typeof result == 'undefined') {
        console.log(errMsg)
    }

    return result || '';
}

/**
 * The messages
 */
const messages = {
    'default': {
        'lbl_username': 'Gebruikersnaam',
        'lbl_email': 'E-mail',
        'lbl_age': 'Leeftijd'
    },
    'kastanje': {
        'lbl_adress': 'Adres kastanje'
    }
};
