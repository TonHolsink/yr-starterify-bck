/**
 * Returns a message for given key and subscriber
 * If the subscriber is not the default and the key is missing for the subscriber,
 * the function tries to find the key in the default messages
 *
 * @param key {string} The message key
 * @param subscriber {string=} The subscriber
 * @returns {*|string} The message or an empty string
 */
function _msg(key, subscriber) {
    const DEFAULT = 'default';
    subscriber = subscriber || DEFAULT;
    const errMsg = 'Message met key = ' + key + ' en subscriber = ' + subscriber + ' niet gevonden!';
    let result = null;

    //Als de subscriber geen entry heeft in messages, val dan terug op default
    if (typeof messages[subscriber] == 'undefined') {
        subscriber = DEFAULT;
    }

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

    return result || '{ ' + key +' }';
}

/**
 * Returns a message for given key
 * It tries to lookup the subscriber in the store
 *
 * @param key {string} The message key
 * @returns {*|string} The message or an empty string
 */
export default function msg(key) {
    let subscriber = window.getSubscriber();
    return _msg(key, subscriber);
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
    'bouw': {
        'lbl_username': 'Gebruiker',
    }
};
