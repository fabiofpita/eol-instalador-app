import { User } from './user';
import { Location } from './location';

export class ServiceOrder {
    id: number;
    plan: String;
    status: String;
    creationDate: Date;
    creationDateFormated: string;
    attributionDate: Date;
    endDate: Date;
    client: User;
    installer: User;
    location: Location;
}