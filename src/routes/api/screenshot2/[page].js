import playwright from 'playwright-aws-lambda'

const exePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"

export async function get({url, params, res}) {
    let statut, image, fileData, erreur

    const uri = new URLSearchParams(url.search)
    const isDev = uri.get("isDev") === "1"
    const pause = uri.get("pause") || 0
    const pageToScreenshot = params.page
    let browser = null;
    try {
        if (!pageToScreenshot.includes("https://")) {
            statut = 404;
        }
        browser = await playwright.launchChromium({ headless: true });
        const context = await browser.newContext();

        const page = await context.newPage();
        await page.goto(pageToScreenshot);

        await page.setViewportSize({width: 1200, height: 720});
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(pause * 1000)
        image = await page.screenshot();

        fileData = "data:image/png;base64," + image.toString('base64')

        await browser.close();
        statut = 200;

    } catch (e) {
        statut = 500;
        erreur = e
    }

    //const test1 = new Buffer(params.page);
    //const test = test1.toString('base64')
    return{

        body: { fileData, erreur, statut },
    }
}