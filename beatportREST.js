const puppeteer = require('puppeteer');
const axios = require('axios');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.beatport.com/account/login');
    const USERNAME_SELECTOR = '#username';
    const PASSWORD_SELECTOR = '#password';
    const BUTTON_SELECTOR = 'button.login-page-form-button';
    const CREDS = require('./creds');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);
    
    //await page.waitFor(2000);
    await page.click(BUTTON_SELECTOR)
    await page.waitFor(10000);
    await page.goto('https://www.beatport.com/my-beatport/artists');
    await page.waitFor(2000);
    const artistData = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('li.bucket-item.artist.mybeatport-artist');
        for (var element of elements){
            let name = element.querySelector('span.mybeatport-name-text').innerText;
            data.push({name});
        }
        return data;
    });
    await page.waitFor(2000);
    await page.goto('https://www.beatport.com/my-beatport/labels');
    await page.waitFor(2000);
    const labels = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('li.bucket-item.label.mybeatport-label');
        for (var element of elements){
            let label = element.querySelector('span.mybeatport-name-text').innerText;
            data.push({label});
        }
        return data;
    });
    await page.waitFor(3000);
    await page.click('#pjax-inner-wrapper > section > main > div.full-col > div.bucket.labels.mybeatport-labels.mybeatport-page-content > ul > li > a.mybeatport-item-link');
    await page.waitFor(3000);
    await page.click('#pjax-inner-wrapper > section > main > div.left-col > div.interior-top-container > div.interior-top > ul > li:nth-child(2) > a')
    await page.waitFor(7000);
    const tracks = await page.evaluate(() => {
        return document.querySelector('//*[@id="data-objects"]');
        //let data = [];
        //let elements = document.querySelectorAll('li.bucket-item.ec-item.track');
        //for (var element of elements){
            //let Track = element.querySelector('span.buk-track-primary-title').innerText;
            //let Artist = element.querySelector('p.buk-track-artists').innerText;
            //let Genre = element.querySelector('p.buk-track-genre').innerText;
            //let Released = element.querySelector('p.buk-track-released').innerText;
            //data.push({Track, Artist, Genre, Released});
        //}
        //return data;
    });
    browser.close();
    return {artistData, labels, tracks};
};

scrape().then((value) => {
    console.log(value);
});