import { expect } from '@playwright/test'
import { SearchAppLauncher } from "./SF_ViewallSearch";

export class Dashboard extends SearchAppLauncher{
    async ClickNewDashboard(){
        const dashboardLink= this.page.locator(".forceActionLink")
        await expect(dashboardLink).toBeVisible() // dashboard Link is visible
        await dashboardLink.click()
    }
    
}