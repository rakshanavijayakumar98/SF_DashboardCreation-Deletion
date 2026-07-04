import test,{ expect } from '@playwright/test'
import { Dashboard } from '../Pages/SF_Dashboardpage'


test.use({storageState:"Data/SFLogin.json"})

let accToken:any
let tokenType1:any
let instanceUrl1:any
let dashboardId:any

test("Creating Dashboard in Salesforce",async({page})=>{
    const cd=new Dashboard(page)
    await page.goto("https://orgfarm-c072b0ad98-dev-ed.develop.lightning.force.com/lightning/page/home")//used storage state to save the login
    await cd.ClickToggle() //click on app launcher
    await page.waitForTimeout(2000)
    const AppLauncher= page.locator("//div[@class='container']")
    await expect(AppLauncher).toBeVisible() //App launcher is visible

    await cd.ClickViewAll() //click on view all
    await cd.SearchDashboard("dashboards") //search Dashboard

    await cd.ClickDashboard() //click dashboard option
    await page.waitForTimeout(2000)
    const DashboardList=page.locator("//th[@class='fix-safari_perf']").first() //dashboard list
    expect(DashboardList).toBeVisible() //check dashboard list is visible

    await cd.ClickNewDashboard() //click New option
    await page.waitForTimeout(5000)
    const frame = page.frameLocator("iframe[name^='sfxdash-']"); 
    await frame.getByRole('button', { name: 'Close' }).click()
    await frame.locator("#dashboardNameInput").fill("Salesforce Automation by Raks Dashboard") //enter dashboard name
    await frame.locator("//button[text()='Create']").click() //click on create
    await page.waitForTimeout(10000)

    const DashboardName=await page.title()
    expect(DashboardName).toBe("Salesforce Automation by Raks Dashboard | Salesforce") //check dashboard is created with Salesforce Automation by Raks Dashboard
    await page.waitForTimeout(2000)
})
//Api for generate the token to access the Salesforce application
test("Generate the SalesForce token",async({request})=>{
    let sfToken=await request.post("https://login.salesforce.com/services/oauth2/token",{
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Connection":"keep-alive"
        },
        form:{
            "grant_type":"password",
            "username":"rakshanaabinesh.de5abe8db387@agentforce.com",
            "password":"Siddarth@98yqa3QWSBKkP5gKvF1VCDldrqu",
        }
    }
)
let genRes=await sfToken.json()
//console.log(genRes)
accToken=genRes.access_token
instanceUrl1=genRes.instance_url
tokenType1=genRes.token_type
})
//Retrive the dashboard list using GET api
test("Retrive the Dashboard list",async({request})=>{
    let dashboardGetList=await request.get(`${instanceUrl1}/services/data/v64.0/analytics/dashboards`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`${tokenType1} ${accToken}`
        }
    })
let dashboardList1=await dashboardGetList.json()
//console.log(dashboardList1)
expect(dashboardGetList.status()).toBe(200)
dashboardId=dashboardList1[0].id //deleting first record in the list which is created
console.log(dashboardId)
})
//Delete the created dashboard
test("Delete dashboard",async({request})=>{
    let deleteDashboard=await request.delete(`${instanceUrl1}/services/data/v64.0/sobjects/Dashboard/${dashboardId}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`${tokenType1} ${accToken}`
        }
    })
expect(deleteDashboard.status()).toBe(204)
})
