export class Employee {
    _id_news: string;
    title: string;
    news: string;

    constructor(_id_news='', title='', news=''){
        this._id_news = _id_news;
        this.title = title;
        this.news = news;
    }

}
