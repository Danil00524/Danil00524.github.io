import { NewsService } from './../../services/news.service';

export class NewsComponent {
    constructor() {
        this._newsService = new NewsService();
    }

    async beforeRender() {
        await this._newsService.getNews()
            .then(data => this.data = data)
            .catch(err => console.log(err));
    }


    render() {
        let template = ``;
        
        for (let i=0; i<this.data['news'].length; i++){
            
            template += `<div class="media m-5"; style="display: block; text-align:center;">
            <img style="width: 250px" src=${this.data['news'][i]['pictures'][0]['url']} class="mr-3">
            <div class="media-body">
                <h5 class="mt-0">${this.data['news'][i]['owner']['full_name']}</h5>
                ${this.data['news'][i]['date']}
            </div>
            </div>` 
        }
        
        return `<h1 style="text-align:center;">News page</h1>` + template;
        
    }
}