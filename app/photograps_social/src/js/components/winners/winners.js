import { WinnersService } from './../../services/winners.service';

export class WinnersComponent{
    constructor(){
        this._winnersService = new WinnersService();
    }
    async beforeRender(){
        await this._winnersService.getWinners(1, 15)
            .then(data => this.data = data)
            .catch(err => console.log(err));
    }
    render(){

        let template = ``;
        
        for (let i=0; i<this.data['winners'].length; i++){
            
            template += `<div class="media m-5"; style="display: block; text-align:center;">
            <img style="width: 250px" src=${this.data['winners'][i]['member_id']['user_id']['avatar']} class="mr-3">
            <div class="media-body">
                <h5 class="mt-0">${this.data['winners'][i]['member_id']['user_id']['full_name']}</h5>
            </div>
            </div>` 
        }
        
        return `<h1 style="text-align:center;">Winners</h1>` + template;
    }
}