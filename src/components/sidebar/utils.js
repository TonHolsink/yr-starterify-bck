/**
 * Recalculates the min-height of the #content-placeholder to compensate for the expanded or contracted sidebarmenu
 * and the actual content to be displayed
 */
export function setContentMinHeight() {
    //TODO : Na inloggen of verversen van het scherm staat de footer nog iets te hoog (15px ofzo)
    //Klikken op een link die dezelfde content laat zien plaatst de footer wel goed
    const sh = document.getElementById('main-sidebar-section').clientHeight; //includes padding
    const content = document.getElementById('content-placeholder');
    content.style.minHeight = sh + "px";
}

