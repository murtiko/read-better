chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
  console.log("INITIALIZED TO OFF");
});

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  console.log("Clicked on " + tab.url);

  // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  });

  if (nextState === 'ON') {

    // Insert the script file when the user turns the extension on
    console.log("Adding script");
    await chrome.scripting.executeScript({
      files : [ "process.js" ],
      target : {tabId : tab.id, allFrames : true}
    });

    // Insert the CSS file when the user turns the extension on
    console.log("Adding CSS");
    await chrome.scripting.insertCSS({
      files: ['readbetter.css'],
      target: { tabId: tab.id }
    });

  } else if (nextState === 'OFF') {

    // Remove the script file when the user turns the extension on
    console.log("Removing script");
    await unregisterAllDynamicContentScripts();

    // Remove the CSS file when the user turns the extension off
    console.log("Removing CSS");
    await chrome.scripting.removeCSS({
      files: ['readbetter.css'],
      target: { tabId: tab.id }
    });
  }
});

async function unregisterAllDynamicContentScripts() {
  try {
    return chrome.scripting.unregisterContentScripts();
  } catch (error) {
    console.log("Error:" + error);
    const message = [
      "An unexpected error occurred while",
      "unregistering dynamic content scripts.",
    ].join(" ");
    throw new Error(message, {cause : error});
  }
};
