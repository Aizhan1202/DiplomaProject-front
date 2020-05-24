import * as moment from "moment";
import _date = moment.unitOfTime._date;

export class Comment {
    id: number; 
    movie: number; 
    reply_to: number; 
    created_by: number;
    content: string;
    like_count: number;
}

