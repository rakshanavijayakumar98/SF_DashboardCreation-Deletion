import { SfLoginPage } from "./SF_LoginPage";

export class SfHomepage extends SfLoginPage{

    async ClickLeads(){
        await this.page.locator("//span[text()='Leads']").first().click()
    }
    async ClickAccounts(){
        await this.page.locator("//span[text()='Accounts']").first().click()
    }
    async ClickToggle(){
        await this.page.locator("//div[@class='slds-icon-waffle']").click()
        await this.page.waitForTimeout(2000)
    }
    async ClickViewAll(){
        await this.page.locator("//button[text()='View All']").click()
        await this.page.waitForTimeout(2000)
    }

}