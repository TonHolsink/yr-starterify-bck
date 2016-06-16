import {isEmpty} from 'lodash/lang';

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
    if (key) key = key.toLowerCase();
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
 * @param [leading] {string} Optional leading in case of key composition (leading + key).
 * @returns {*|string} The message or an empty string
 */
export default function msg(key, leading) {
    let subscriber = window.getSubscriber();
    return (leading ? (isEmpty(key) ? '' : _msg(leading + key, subscriber)) : _msg(key, subscriber));
}

/**
 * The messages
 */
const messages = {
    'default': {
        'item_status_appointment': 'Afspraak',
        'item_status_archived': 'Gearchiveerd',
        'item_status_assigned': 'Toegewezen',
        'item_status_closed': 'Afgehandeld',
        'item_status_inprocess': 'In behandeling',
        'item_status_new': 'Nieuw',
        'item_status_open': 'Open',
        'item_status_problem': 'Niet ok',
        'item_status_ready': 'Gereed',
        'item_status_ready2': 'Gereed (met opmerkingen)',
        'item_status_registered': 'Teruggemeld',
        'item_status_retained': 'Aangehouden',
        'lbl_username': 'Gebruikersnaam',
        'lbl_email': 'E-mail',
        'lbl_age': 'Leeftijd'
    },
    'bouw': {
        'lbl_username': 'Gebruiker'
    }
};
