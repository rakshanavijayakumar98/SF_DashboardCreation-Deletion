import test from '@playwright/test'

test("SF Storage Set",async({page})=>{
    await page.goto("https://orgfarm-c072b0ad98-dev-ed.develop.my.salesforce.com/")
    await page.locator("#username").fill("rakshanaabinesh.de5abe8db387@agentforce.com") 
    await page.locator("#password").fill("Siddarth@98") 
    await page.locator("//input[@class='button r4 wide primary']").click()
    await page.waitForTimeout(20000)
    await page.context().storageState({path:"Data/SFLogin.json"})
})
