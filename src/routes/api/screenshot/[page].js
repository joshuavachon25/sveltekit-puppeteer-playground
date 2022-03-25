import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda"

const exePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"

async function getOptions(isDev) {
    let options;
    if (isDev) {
        options = {
            args: [],
            executablePath: exePath,
            headless: true,
        };
    } else {
        options = {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
        };
    }
    return options;
}

export async function get({url, params, res}) {
    let statut, file, fileData, erreur

    const uri = new URLSearchParams(url.search)
    const isDev = uri.get("isDev") === "1"
    const pause = uri.get("pause") || 0
    const pageToScreenshot = params.page

    try {
        if (!pageToScreenshot.includes("https://")) {
            statut = 404;
        }

        const options = await getOptions(isDev);

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        await page.goto(pageToScreenshot);
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(pause * 1000)
       file = await page.screenshot({
            type: "png",
        });

        fileData = "data:image/png;base64," + file.toString('base64')
        await browser.close();

        statut = 200;

    } catch (e) {
        statut = 500;
        erreur = e
    }

    //const test1 = new Buffer(params.page);
    //const test = test1.toString('base64')
    return{
        body: { fileData, statut, erreur },

    }
}