const puppeteer = require('puppeteer');

//your linkedIn login username/email
const email = "Youremail@gmail.com"
//your linkedIn login password
const pass = "yourPass"
let browser = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
})
let page;
var i = 0;
browser.then(function (browserObj) {

    return browserObj.newPage();
}).then(function (newTab) {
    page = newTab;
    return newTab.goto('https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Ffeed%2F&fromSignIn=true&trk=cold_join_sign_in', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    })

}).then(function () {
    return page.type("input[id='username']", email, { delay: 50 });
}).then(function () {
    return page.type("input[id='password']", pass, { delay: 50 });
}).then(function () {
    return page.click("button[aria-label='Sign in']", { delay: 50 })
}).then(function () {
    return setInterval(() => {
        waitForSelector('.feed-shared-social-actions button[aria-pressed="false"]', page);
        page.reload({ waitUntil: ["networkidle2", "domcontentloaded"] });
    }, Math.ceil(Math.random() * 10) * 1000);

})



function waitForSelector(selector, cpage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cpage.waitForSelector(selector)
        waitForModalPromise.then(function () {
            return cpage.click(selector);
        }).then(() => {
            resolve();
        }).catch(() => {
            reject();
        })
    })

}