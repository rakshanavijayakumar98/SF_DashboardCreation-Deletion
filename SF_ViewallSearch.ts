import { SfHomepage } from "./SF_HomePage";

export class SearchAppLauncher extends SfHomepage{
    async SearchDashboard(SearchDashboard:any){
        await this.page.getByPlaceholder("Search apps or items...").first().fill(SearchDashboard)
    }
    async ClickDashboard(){
        await this.page.locator("//mark[text()='Dashboards']").click()
    }
}